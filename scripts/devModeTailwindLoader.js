const path = require('path');

// This loader runs before TS/JS compilation and rewrites JSX/TSX tags that opt into
// dev-mode via `dev-mode="tailwind"`. It injects a `dev-mode-container` class and a
// `--label` style so Tailwind can show the className tooltip in developer mode.
// Notes:
// - It only touches tags with the dev-mode attribute.
// - Supports both string and template literal `className` values (e.g. "foo" or {`foo ${bar}`}).
// - Leaves tags without className untouched to avoid accidental mutations.
// - Keeps cacheable and no-ops when no changes are needed.
const tagPattern = /<([A-Za-z][\w.:$-]*)([^>]*?)\sdev-mode=(["'])tailwind\3([^>]*?)>/gs;
const classStringRegex = /\bclassName=(["'])(.*?)\1/;
const classTemplateRegex = /\bclassName=\{\s*`([^`]*?)`\s*\}/;
const styleRegex = /\bstyle=\{\{[^}]*\}\}/;

const transform = (content) =>
  content.replace(tagPattern, (match, tag, beforeAttrs, _quote, afterAttrs) => {
    const attrsRaw = `${beforeAttrs}${afterAttrs}`
      .replace(/\s*dev-mode=(["'])tailwind\1\s*/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    const stringMatch = attrsRaw.match(classStringRegex);
    const templateMatch = attrsRaw.match(classTemplateRegex);
    const classValue = stringMatch?.[2] ?? templateMatch?.[1];
    if (!classValue) return match;

    const classWithDev = classValue.includes('dev-mode-container')
      ? classValue
      : `${classValue} dev-mode-container`.trim();
    const classAttr = stringMatch
      ? `className="${classWithDev}"`
      : `className={\`${classWithDev}\`}`;
    const attrsWithClass = attrsRaw.replace(stringMatch ? stringMatch[0] : templateMatch[0], classAttr);

    const styleAttr = `style={{ "--label": ${"`"}"${classValue}"${"`"} }}`;
    const hasStyle = styleRegex.test(attrsWithClass);
    const finalAttrs = `${attrsWithClass}${hasStyle ? '' : ` ${styleAttr}`}`
      .replace(/\s{2,}/g, ' ')
      .trim();

    const selfClosing = /\/\s*>$/.test(match);
    return `<${tag}${finalAttrs ? ` ${finalAttrs}` : ''}${selfClosing ? ' />' : '>'}`;
  });

module.exports = function devModeTailwindLoader(source) {
  this.cacheable?.();
  if (typeof source !== 'string') return source;
  if (!source.includes('dev-mode="tailwind"')) return source;

  const transformed = transform(source);
  if (transformed === source) return source;

  const filename = this.resourcePath ? path.relative(process.cwd(), this.resourcePath) : '';
  this._compilation?.logger?.log?.(`dev-mode tailwind transform applied: ${filename}`);

  return transformed;
};
