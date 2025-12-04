const path = require('path');
const ts = require('typescript');

// 开关类名与作用域目录：只处理 src/components 下的 TSX 组件，并注入统一的容器类
const DEV_CLASS = 'dev-mode-react-container';
const COMPONENT_DIR = path.join(process.cwd(), 'src', 'components') + path.sep;

let parsedTsConfig;

// 读取并缓存 tsconfig，缺失或解析失败时使用保守默认值，保证 transformer 能正常工作
const loadTsConfig = () => {
  if (parsedTsConfig) return parsedTsConfig;
  const configPath = ts.findConfigFile(process.cwd(), ts.sys.fileExists, 'tsconfig.json');
  if (!configPath) {
    parsedTsConfig = { options: { jsx: ts.JsxEmit.Preserve, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext } };
    return parsedTsConfig;
  }

  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) {
    parsedTsConfig = { options: { jsx: ts.JsxEmit.Preserve, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext } };
    return parsedTsConfig;
  }

  parsedTsConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));
  return parsedTsConfig;
};

// 检测文件是否显式导出 devModeReact = true（支持变量导出与 exports 赋值）
const hasDevModeFlag = (sourceFile) => {
  let enabled = false;

  const isTrueLiteral = (expr) => {
    if (!expr) return false;
    if (ts.isParenthesizedExpression(expr)) return isTrueLiteral(expr.expression);
    if (ts.isAsExpression(expr) || ts.isTypeAssertionExpression(expr)) return isTrueLiteral(expr.expression);
    return ts.isBooleanLiteral(expr) && expr.kind === ts.SyntaxKind.TrueKeyword;
  };

  for (const stmt of sourceFile.statements) {
    if (ts.isVariableStatement(stmt) && stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const decl of stmt.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && decl.name.text === 'devModeReact' && isTrueLiteral(decl.initializer)) {
          enabled = true;
          break;
        }
      }
    }

    if (enabled) break;

    if (ts.isExpressionStatement(stmt) && ts.isBinaryExpression(stmt.expression)) {
      const { left, operatorToken, right } = stmt.expression;
      if (
        operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        isTrueLiteral(right) &&
        ts.isPropertyAccessExpression(left) &&
        ((ts.isIdentifier(left.expression) && left.expression.text === 'exports') ||
          (ts.isPropertyAccessExpression(left.expression) && ts.isIdentifier(left.expression.expression) && left.expression.expression.text === 'module' && left.expression.name.text === 'exports')) &&
        left.name.text === 'devModeReact'
      ) {
        enabled = true;
        break;
      }
    }
  }

  return enabled;
};

// 组件命名必须大写开头；属性名需要合法的标识符（避免 data-attr 上的非法命名）
const isUppercaseComponentName = (name) => /^[A-Z]/.test(name);
const isValidIdentifierName = (name) => ts.isIdentifierText(name, ts.ScriptTarget.ESNext);

// 收集所有大写命名的函数/变量函数，找出真正导出的唯一组件
const collectExportedFunctions = (sourceFile) => {
  const exported = new Map();
  const candidates = new Map();

  for (const stmt of sourceFile.statements) {
    if (ts.isFunctionDeclaration(stmt) && stmt.name && isUppercaseComponentName(stmt.name.text)) {
      candidates.set(stmt.name.text, stmt);
    }

    if (ts.isVariableStatement(stmt) && stmt.declarationList) {
      for (const decl of stmt.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && isUppercaseComponentName(decl.name.text) && decl.initializer && (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))) {
          candidates.set(decl.name.text, decl.initializer);
        }
      }
    }
  }

  for (const stmt of sourceFile.statements) {
    if (ts.isFunctionDeclaration(stmt) && stmt.name && stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      exported.set(stmt.name.text, stmt);
    }

    if (ts.isVariableStatement(stmt) && stmt.declarationList && stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const decl of stmt.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && candidates.has(decl.name.text) && decl.initializer && (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))) {
          exported.set(decl.name.text, decl.initializer);
        }
      }
    }

    if (ts.isExportDeclaration(stmt) && stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
      for (const element of stmt.exportClause.elements) {
        const name = (element.propertyName ?? element.name).text;
        if (candidates.has(name)) {
          exported.set(element.name.text, candidates.get(name));
        }
      }
    }

    if (ts.isExportAssignment(stmt) && ts.isIdentifier(stmt.expression)) {
      const name = stmt.expression.text;
      if (candidates.has(name)) {
        exported.set(name, candidates.get(name));
      }
    }
  }

  return exported;
};

// 去掉多层括号，便于识别直接返回的 JSX
const unwrapExpression = (expr) => {
  let current = expr;
  while (ts.isParenthesizedExpression(current)) {
    current = current.expression;
  }
  return current;
};

// 解析组件第一个参数，记录 props 的绑定方式（标识符或解构），方便后续生成 data 属性取值
const buildPropBindings = (parameter) => {
  if (!parameter) return { identifier: null, bindingMap: new Map() };

  if (ts.isIdentifier(parameter.name)) {
    return { identifier: parameter.name.text, bindingMap: new Map() };
  }

  if (ts.isObjectBindingPattern(parameter.name)) {
    const bindingMap = new Map();
    for (const el of parameter.name.elements) {
      if (el.dotDotDotToken) continue;
      const propName = el.propertyName
        ? ts.isIdentifier(el.propertyName)
          ? el.propertyName.text
          : ts.isStringLiteral(el.propertyName)
            ? el.propertyName.text
            : null
        : ts.isIdentifier(el.name)
          ? el.name.text
          : null;
      const bindingName = ts.isIdentifier(el.name) ? el.name.text : null;
      if (propName && bindingName && isValidIdentifierName(propName)) {
        bindingMap.set(propName, bindingName);
      }
    }
    return { identifier: null, bindingMap };
  }

  return { identifier: null, bindingMap: new Map() };
};

// 使用 TS 类型系统获取 Props 的键，过滤掉来自声明文件的 DOM 级别属性
const getPropNames = (checker, componentNode) => {
  const firstParam = componentNode.parameters?.[0];
  if (!firstParam) return [];
  const type = checker.getTypeAtLocation(firstParam);
  if (!type) return [];

  const props = checker.getPropertiesOfType(type);
  const names = new Set();

  for (const prop of props) {
    const declarations = prop.getDeclarations() ?? [];
    if (declarations.length === 0) continue;
    const fromDeclarationFile = declarations.every((d) => d.getSourceFile().isDeclarationFile);
    if (fromDeclarationFile) continue; // avoid exploding DOM props
    const name = prop.getEscapedName().toString();
    if (!isValidIdentifierName(name)) continue;
    names.add(name);
  }

  return [...names];
};

// 根据 props 的绑定方式生成对应的访问表达式
const createPropAccessor = (factory, bindings, propName) => {
  if (bindings.identifier) {
    return factory.createPropertyAccessExpression(factory.createIdentifier(bindings.identifier), factory.createIdentifier(propName));
  }

  if (bindings.bindingMap.has(propName)) {
    return factory.createIdentifier(bindings.bindingMap.get(propName));
  }

  return null;
};

// 处理 className 合并逻辑：支持字符串、模板字符串、表达式，避免重复注入 DEV_CLASS
const appendClassName = (factory, existingAttr, bindings) => {
  const createTemplateWith = (expr) =>
    factory.createJsxExpression(
      undefined,
      factory.createTemplateExpression(
        factory.createTemplateHead('', ''),
        [factory.createTemplateSpan(expr, factory.createTemplateTail(` ${DEV_CLASS}`))]
      )
    );

  const createFromProps = () => {
    const access = bindings.identifier
      ? factory.createPropertyAccessExpression(factory.createIdentifier(bindings.identifier), factory.createIdentifier('className'))
      : null;
    if (!access) return factory.createStringLiteral(DEV_CLASS);
    // 兼容旧版 factory：用二元 ?? 代替 createNullishCoalesce
    const coalesced = factory.createBinaryExpression(
      access,
      factory.createToken(ts.SyntaxKind.QuestionQuestionToken),
      factory.createStringLiteral('')
    );
    return createTemplateWith(coalesced);
  };

  if (!existingAttr) {
    return factory.createJsxAttribute(factory.createIdentifier('className'), createFromProps());
  }

  if (!existingAttr.initializer) return existingAttr;

  const initializer = existingAttr.initializer;

  if (ts.isStringLiteral(initializer)) {
    if (initializer.text.includes(DEV_CLASS)) return existingAttr;
    return factory.updateJsxAttribute(existingAttr, existingAttr.name, factory.createStringLiteral(`${initializer.text} ${DEV_CLASS}`.trim()));
  }

  if (ts.isJsxExpression(initializer)) {
    const expr = initializer.expression;
    if (!expr) return factory.updateJsxAttribute(existingAttr, existingAttr.name, factory.createJsxExpression(undefined, factory.createStringLiteral(DEV_CLASS)));

    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
      if (expr.text.includes(DEV_CLASS)) return existingAttr;
      return factory.updateJsxAttribute(
        existingAttr,
        existingAttr.name,
        factory.createJsxExpression(undefined, factory.createStringLiteral(`${expr.text} ${DEV_CLASS}`.trim()))
      );
    }

    if (ts.isTemplateExpression(expr)) {
      const lastSpan = expr.templateSpans[expr.templateSpans.length - 1];
      const tailText = lastSpan?.literal?.text ?? '';
      if (expr.head.text.includes(DEV_CLASS) || tailText.includes(DEV_CLASS)) return existingAttr;
      const spans = [...expr.templateSpans];
      spans[spans.length - 1] = factory.updateTemplateSpan(lastSpan, lastSpan.expression, factory.createTemplateTail(`${tailText} ${DEV_CLASS}`));
      return factory.updateJsxAttribute(existingAttr, existingAttr.name, factory.createJsxExpression(undefined, factory.updateTemplateExpression(expr, expr.head, spans)));
    }

    return factory.updateJsxAttribute(existingAttr, existingAttr.name, createTemplateWith(expr));
  }

  if (ts.isNoSubstitutionTemplateLiteral(initializer)) {
    if (initializer.text.includes(DEV_CLASS)) return existingAttr;
    return factory.updateJsxAttribute(existingAttr, existingAttr.name, factory.createNoSubstitutionTemplateLiteral(`${initializer.text} ${DEV_CLASS}`));
  }

  return existingAttr;
};

// 构建 data-dev-mode-react-* 属性集合，值来自 props 访问
const buildDataAttributes = (factory, componentName, propNames, bindings) => {
  const attrs = [
    factory.createJsxAttribute(factory.createIdentifier('data-dev-mode-react-name'), factory.createStringLiteral(componentName)),
  ];
  for (const propName of propNames) {
    const accessExpr = createPropAccessor(factory, bindings, propName);
    if (!accessExpr) continue;
    attrs.push(
      factory.createJsxAttribute(
        factory.createIdentifier(`data-dev-mode-react-prop-${propName}`),
        factory.createJsxExpression(undefined, accessExpr)
      )
    );
  }

  return attrs;
};

// 将 className 与 data-* 属性合并到根节点的属性列表中，保持已有属性不被覆盖
const updateJsxAttributes = (factory, attributes, componentName, propNames, bindings) => {
  const props = [...attributes.properties];
  const classIndex = props.findIndex((prop) => ts.isJsxAttribute(prop) && ts.isIdentifier(prop.name) && prop.name.text === 'className');
  const existingClassAttr = classIndex >= 0 ? props[classIndex] : null;
  const updatedClassAttr = appendClassName(factory, existingClassAttr, bindings);

  if (classIndex >= 0) {
    props[classIndex] = updatedClassAttr;
  } else {
    props.push(updatedClassAttr);
  }

  const existingNames = new Set(
    props.filter((p) => ts.isJsxAttribute(p)).map((p) => (ts.isIdentifier(p.name) ? p.name.text : null)).filter(Boolean)
  );

  for (const attr of buildDataAttributes(factory, componentName, propNames, bindings)) {
    if (ts.isIdentifier(attr.name) && existingNames.has(attr.name.text)) continue;
    props.push(attr);
  }

  return factory.createJsxAttributes(props);
};

// 仅处理根层 JSX Element / SelfClosingElement，Fragment 等复杂结构直接跳过
const transformRootJsx = (factory, expr, componentName, propNames, bindings) => {
  const unwrapped = unwrapExpression(expr);
  if (ts.isJsxElement(unwrapped)) {
    const updatedAttrs = updateJsxAttributes(factory, unwrapped.openingElement.attributes, componentName, propNames, bindings);
    const openingElement = factory.updateJsxOpeningElement(unwrapped.openingElement, unwrapped.openingElement.tagName, unwrapped.openingElement.typeArguments, updatedAttrs);
    return factory.updateJsxElement(unwrapped, openingElement, unwrapped.children, unwrapped.closingElement);
  }

  if (ts.isJsxSelfClosingElement(unwrapped)) {
    const updatedAttrs = updateJsxAttributes(factory, unwrapped.attributes, componentName, propNames, bindings);
    return factory.updateJsxSelfClosingElement(unwrapped, unwrapped.tagName, unwrapped.typeArguments, updatedAttrs);
  }

  return null;
};

// 改写函数体：命中返回语句或简写箭头体时替换根 JSX
const updateFunctionBody = (factory, funcNode, componentName, propNames, bindings) => {
  if (ts.isArrowFunction(funcNode) && !ts.isBlock(funcNode.body)) {
    const updated = transformRootJsx(factory, funcNode.body, componentName, propNames, bindings);
    if (!updated) return funcNode;
    return factory.updateArrowFunction(
      funcNode,
      funcNode.modifiers,
      funcNode.typeParameters,
      funcNode.parameters,
      funcNode.type,
      funcNode.equalsGreaterThanToken,
      updated
    );
  }

  const body = funcNode.body;
  if (!body || !ts.isBlock(body)) return funcNode;

  let changed = false;
  const newStatements = body.statements.map((stmt) => {
    if (!changed && ts.isReturnStatement(stmt) && stmt.expression) {
      const updated = transformRootJsx(factory, stmt.expression, componentName, propNames, bindings);
      if (updated) {
        changed = true;
        return factory.updateReturnStatement(stmt, updated);
      }
    }
    return stmt;
  });

  if (!changed) return funcNode;

  if (ts.isFunctionDeclaration(funcNode)) {
    return factory.updateFunctionDeclaration(
      funcNode,
      funcNode.modifiers,
      funcNode.asteriskToken,
      funcNode.name,
      funcNode.typeParameters,
      funcNode.parameters,
      funcNode.type,
      factory.updateBlock(body, newStatements)
    );
  }

  if (ts.isFunctionExpression(funcNode)) {
    return factory.updateFunctionExpression(
      funcNode,
      funcNode.modifiers,
      funcNode.asteriskToken,
      funcNode.name,
      funcNode.typeParameters,
      funcNode.parameters,
      funcNode.type,
      factory.updateBlock(body, newStatements)
    );
  }

  if (ts.isArrowFunction(funcNode)) {
    return factory.updateArrowFunction(
      funcNode,
      funcNode.modifiers,
      funcNode.typeParameters,
      funcNode.parameters,
      funcNode.type,
      funcNode.equalsGreaterThanToken,
      factory.updateBlock(body, newStatements)
    );
  }

  return funcNode;
};

// 自定义 transformer：命中目标组件节点（声明或变量初始化）时应用改写
const createTransformer = (componentNode, componentName, propNames, bindings) => (context) => {
  const { factory } = context;

  const visit = (node) => {
    if (node === componentNode) {
      return updateFunctionBody(factory, node, componentName, propNames, bindings);
    }

    if (ts.isVariableDeclaration(node) && node.initializer && node.initializer === componentNode) {
      const updatedInitializer = updateFunctionBody(factory, node.initializer, componentName, propNames, bindings);
      return factory.updateVariableDeclaration(node, node.name, node.exclamationToken, node.type, updatedInitializer);
    }

    return ts.visitEachChild(node, visit, context);
  };

  return (node) => ts.visitNode(node, visit);
};

module.exports = function devModeReactLoader(source) {
  this.cacheable?.();
  if (typeof source !== 'string') return source;

  const resourcePath = this.resourcePath || '';
  if (!resourcePath.endsWith('.tsx')) return source;
  if (!resourcePath.startsWith(COMPONENT_DIR)) return source;

  const tsConfig = loadTsConfig();
  const program = ts.createProgram([resourcePath], { ...tsConfig.options, noEmit: false, jsx: ts.JsxEmit.Preserve });
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(resourcePath);
  if (!sourceFile) return source;

  if (!hasDevModeFlag(sourceFile)) return source;

  const exportedFunctions = collectExportedFunctions(sourceFile);
  if (exportedFunctions.size !== 1) return source;

  const [[componentName, componentNode]] = exportedFunctions.entries();
  const propNames = getPropNames(checker, componentNode);
  const bindings = buildPropBindings(componentNode.parameters?.[0]);

  const transformer = createTransformer(componentNode, componentName, propNames, bindings);
  const result = ts.transform(sourceFile, [transformer]);
  const transformedSourceFile = result.transformed[0];
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const output = printer.printFile(transformedSourceFile);
  result.dispose();

  if (output === source) return source;
  const filename = this.resourcePath ? path.relative(process.cwd(), this.resourcePath) : '';
  this._compilation?.logger?.log?.(`dev-mode react transform applied: ${filename}`);
  return output;
};
