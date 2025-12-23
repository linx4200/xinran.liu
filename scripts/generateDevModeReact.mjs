import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import chalk from 'chalk';

const SRC_DIR = path.join(process.cwd(), 'src');
const OUTPUT_FILE = path.join(SRC_DIR, 'data', 'dev-mode-react-components.js');

// Helper to recursively find all .tsx files in a directory
function getAllTsxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsxFiles(file));
    } else {
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

// Check if file starts with 'use devModeReact'
function hasUseDevModeReactDirective(sourceFile) {
  // Check the first few statements for the string literal 'use devModeReact'
  for (const stmt of sourceFile.statements) {
    if (ts.isExpressionStatement(stmt) && ts.isStringLiteral(stmt.expression)) {
      if (stmt.expression.text === 'use devModeReact') {
        return true;
      }
    } else {
      // If we encounter a non-string-literal expression (and it's not a comment, but AST handles comments differently),
      // we can stop checking because directives must be at the top.
      if (!ts.isImportDeclaration(stmt)) {
        // Directives usually come first.
      }
    }
  }
  return false;
}

function getComponentInfo(sourceFile, checker) {
  // 1. Find the exported component.
  let componentSymbol;
  let componentName;

  // Try default export first
  const exportAssignment = sourceFile.statements.find(ts.isExportAssignment);
  if (exportAssignment) {
    // Logic for export default ComponentName;
    if (ts.isIdentifier(exportAssignment.expression)) {
      componentName = exportAssignment.expression.text;
      const localSymbol = checker.getSymbolAtLocation(exportAssignment.expression);
      // resolve alias
      componentSymbol = localSymbol ? (localSymbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(localSymbol) : localSymbol) : undefined;
    }
  } else {
    // Look for Named exports
    for (const stmt of sourceFile.statements) {
      if (ts.isFunctionDeclaration(stmt) && stmt.name && /^[A-Z]/.test(stmt.name.text)) {
        if (stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
          componentName = stmt.name.text;
          componentSymbol = checker.getSymbolAtLocation(stmt.name);
          break;
        }
      }
      if (ts.isVariableStatement(stmt) && stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
        for (const decl of stmt.declarationList.declarations) {
          if (ts.isIdentifier(decl.name) && /^[A-Z]/.test(decl.name.text)) {
            componentName = decl.name.text;
            componentSymbol = checker.getSymbolAtLocation(decl.name);
            break;
          }
        }
      }
      if (componentName) break;
    }
  }

  if (!componentSymbol || !componentName) {
    console.log(chalk.yellow(`SKIP (Exported component not found)`));
    return null;
  }

  // Check for displayName assignment
  let hasDisplayName = false;
  for (const stmt of sourceFile.statements) {
    if (ts.isExpressionStatement(stmt) && ts.isBinaryExpression(stmt.expression)) {
      const { left, operatorToken } = stmt.expression;
      if (operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isPropertyAccessExpression(left)) {
        if (ts.isIdentifier(left.expression) && left.expression.text === componentName && left.name.text === 'displayName') {
          hasDisplayName = true;
          break;
        }
      }
    }
  }

  if (!hasDisplayName) {
    console.log(chalk.yellow(`SKIP (Component "${componentName}" missing "displayName" assignment)`));
    return null;
  }

  // 2. Get Props Type
  const declaration = componentSymbol.valueDeclaration || componentSymbol.declarations?.[0];

  if (!declaration) {
    console.log(chalk.yellow(`SKIP (Declaration not found for "${componentName}")`));
    return null;
  }

  let signature;
  if (ts.isFunctionDeclaration(declaration) || ts.isMethodDeclaration(declaration) || ts.isArrowFunction(declaration) || ts.isFunctionExpression(declaration)) {
    signature = checker.getSignatureFromDeclaration(declaration);
  } else if (ts.isVariableDeclaration(declaration) && declaration.initializer) {
    // handle const Component = ...
    if (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer)) {
      signature = checker.getSignatureFromDeclaration(declaration.initializer);
    }
  }

  if (!signature) return null;

  const parameters = signature.getParameters();
  if (parameters.length > 0) {
    const propParam = parameters[0];
    const propType = checker.getTypeOfSymbolAtLocation(propParam, declaration);

    const props = propType.getProperties();
    const propList = [];

    props.forEach(prop => {
      const decls = prop.getDeclarations();
      if (!decls || decls.length === 0) return;

      const inNodeModules = decls.every(d => d.getSourceFile().fileName.includes('node_modules'));
      if (inNodeModules) return;

      const propName = prop.getName();
      const typeOfProp = checker.getTypeOfSymbolAtLocation(prop, declaration);
      const typeString = checker.typeToString(typeOfProp);

      propList.push({ key: propName, value: typeString });
    });

    return {
      name: componentName,
      propList
    };

  } else {
    // No props
    return {
      name: componentName,
      propList: []
    };
  }
}

function generate() {
  const files = getAllTsxFiles(SRC_DIR);
  const candidateFiles = [];

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('use devModeReact')) {
      candidateFiles.push(file);
    }
  });

  if (!candidateFiles.length) {
    console.log(chalk.yellow('No files with "use devModeReact" found.'));
    fs.writeFileSync(OUTPUT_FILE, 'module.exports = {};');
    return;
  }

  const program = ts.createProgram(candidateFiles, {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ESNext,
    strict: true,
    esModuleInterop: true
  });

  const checker = program.getTypeChecker();
  const resultData = {};

  for (const file of candidateFiles) {
    const filename = path.relative(process.cwd(), file);
    process.stdout.write(`Processing: ${filename} ... `);
    const sourceFile = program.getSourceFile(file);
    if (!sourceFile) {
      console.log(chalk.red('FAILED (SourceFile not found)'));
      continue;
    }

    if (!hasUseDevModeReactDirective(sourceFile)) {
      console.log(chalk.gray('SKIPPED (Directive missing)'));
      continue;
    }

    const info = getComponentInfo(sourceFile, checker);
    if (info) {
      console.log(chalk.green('OK'));
      resultData[info.name] = info;
    }
  }

  const outputContent = `export const data = ${JSON.stringify(resultData, null, 2)};`;
  fs.writeFileSync(OUTPUT_FILE, outputContent);
  console.log(`\n✅ Generated dev mode data of react components at ${OUTPUT_FILE} \n`);
}

generate();
