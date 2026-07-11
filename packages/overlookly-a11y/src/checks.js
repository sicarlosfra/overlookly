// overlookly-a11y — accessibility checks
// Each check takes a clicked DOM element and returns a finding object, or null if no issue.

function relativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function parseColor(str) {
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(...fg);
  const l2 = relativeLuminance(...bg);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

function getEffectiveBackground(el) {
  let node = el;
  while (node && node !== document.documentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    const parsed = parseColor(bg);
    if (parsed && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return parsed;
    node = node.parentElement;
  }
  return [255, 255, 255];
}

function cssSelector(el) {
  if (el.id) return `#${el.id}`;
  let path = el.tagName.toLowerCase();
  if (el.className && typeof el.className === 'string') {
    path += '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
  }
  return path;
}

function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function darkenToRatio(fg, bg, target) {
  let [r, g, b] = fg;
  for (let i = 0; i < 40; i++) {
    if (contrastRatio([r, g, b], bg) >= target) break;
    r = Math.max(0, r - 10);
    g = Math.max(0, g - 10);
    b = Math.max(0, b - 10);
  }
  return [r, g, b];
}

export function checkContrast(el) {
  const style = getComputedStyle(el);
  const text = (el.textContent || '').trim();
  if (!text) return null;

  const fg = parseColor(style.color);
  const bg = getEffectiveBackground(el);
  if (!fg) return null;

  const ratio = contrastRatio(fg, bg);
  const fontSize = parseFloat(style.fontSize);
  const isBold = parseInt(style.fontWeight) >= 700;
  const isLarge = fontSize >= 24 || (fontSize >= 18.66 && isBold);
  const threshold = isLarge ? 3 : 4.5;

  if (ratio >= threshold) return null;

  const suggestedFg = darkenToRatio(fg, bg, threshold);

  return {
    selector: cssSelector(el),
    issue: 'Insufficient color contrast',
    criterion: 'WCAG 1.4.3',
    severity: 'serious',
    detail: `Contrast ratio ${ratio.toFixed(2)}:1, needs ${threshold}:1`,
    fix: `Change text color to ${rgbToHex(suggestedFg)} (meets ${threshold}:1 against current background)`,
  };
}

export function checkAltText(el) {
  if (el.tagName !== 'IMG') return null;
  const alt = el.getAttribute('alt');
  if (alt !== null && alt.trim() !== '') return null;
  if (alt === '' && el.getAttribute('role') === 'presentation') return null;

  return {
    selector: cssSelector(el),
    issue: alt === null ? 'Missing alt attribute' : 'Empty alt text on non-decorative image',
    criterion: 'WCAG 1.1.1',
    severity: 'serious',
    detail: `src: ${(el.getAttribute('src') || '').slice(0, 60)}`,
    fix: 'Add a concise alt attribute describing the image\'s purpose, or alt="" if purely decorative',
  };
}

export function checkFormLabel(el) {
  const labelable = ['INPUT', 'SELECT', 'TEXTAREA'];
  if (!labelable.includes(el.tagName)) return null;
  if (el.type === 'hidden' || el.type === 'submit' || el.type === 'button') return null;

  const hasAriaLabel = el.getAttribute('aria-label');
  const hasAriaLabelledby = el.getAttribute('aria-labelledby');
  const id = el.id;
  const hasLabelFor = id && document.querySelector(`label[for="${id}"]`);
  const isWrappedInLabel = el.closest('label');

  if (hasAriaLabel || hasAriaLabelledby || hasLabelFor || isWrappedInLabel) return null;

  return {
    selector: cssSelector(el),
    issue: 'Form input has no accessible label',
    criterion: 'WCAG 1.3.1 / 4.1.2',
    severity: 'serious',
    detail: `<${el.tagName.toLowerCase()}> type="${el.type || 'n/a'}"`,
    fix: id
      ? `Add <label for="${id}">...</label>, or an aria-label attribute`
      : 'Wrap in a <label>, or add an id plus a matching <label for>, or an aria-label attribute',
  };
}

const VALID_ARIA_ROLES = new Set([
  'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
  'cell', 'checkbox', 'columnheader', 'combobox', 'complementary',
  'contentinfo', 'definition', 'dialog', 'directory', 'document',
  'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading',
  'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main',
  'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox',
  'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation',
  'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup',
  'rowheader', 'scrollbar', 'search', 'searchbox', 'separator', 'slider',
  'spinbutton', 'status', 'switch', 'tab', 'table', 'tablist', 'tabpanel',
  'term', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid',
  'treeitem',
]);

const REDUNDANT_ROLE_PAIRS = {
  BUTTON: 'button',
  A: 'link',
  NAV: 'navigation',
  MAIN: 'main',
  FORM: 'form',
  IMG: 'img',
};

export function checkAriaRole(el) {
  const role = el.getAttribute('role');
  if (!role) return null;
  const roles = role.trim().split(/\s+/);
  const invalid = roles.filter((r) => !VALID_ARIA_ROLES.has(r));

  if (invalid.length > 0) {
    return {
      selector: cssSelector(el),
      issue: `Invalid ARIA role: "${invalid.join(', ')}"`,
      criterion: 'WCAG 4.1.2',
      severity: 'moderate',
      detail: `role="${role}" is not a recognized ARIA role`,
      fix: `Remove the invalid role, or replace it with a valid one (e.g. "button", "navigation", "dialog")`,
    };
  }

  const redundant = REDUNDANT_ROLE_PAIRS[el.tagName];
  if (redundant && roles.includes(redundant)) {
    return {
      selector: cssSelector(el),
      issue: `Redundant ARIA role`,
      criterion: 'WCAG 4.1.2',
      severity: 'minor',
      detail: `<${el.tagName.toLowerCase()}> already has implicit role="${redundant}"`,
      fix: `Remove role="${redundant}" — it duplicates the element's native semantics`,
    };
  }

  return null;
}

export function checkFocusable(el) {
  const nativelyFocusable = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  const interactiveRoles = ['button', 'link', 'checkbox', 'menuitem', 'tab', 'switch'];
  const role = el.getAttribute('role');
  const hasClickHandler = el.hasAttribute('onclick');
  const looksInteractive = (role && interactiveRoles.includes(role)) || hasClickHandler;

  if (!looksInteractive || nativelyFocusable.includes(el.tagName)) return null;

  const tabindex = el.getAttribute('tabindex');
  if (tabindex !== null && parseInt(tabindex) >= 0) return null;

  return {
    selector: cssSelector(el),
    issue: 'Interactive element is not keyboard-focusable',
    criterion: 'WCAG 2.1.1',
    severity: 'serious',
    detail: role
      ? `role="${role}" on a non-focusable <${el.tagName.toLowerCase()}>`
      : `has a click handler but no way to reach it by keyboard`,
    fix: `Add tabindex="0" and a keydown handler for Enter/Space, or use a native <button> instead`,
  };
}

export function checkHeadingHierarchy(el) {
  if (!/^H[1-6]$/.test(el.tagName)) return null;

  const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
  const index = headings.indexOf(el);
  if (index <= 0) return null;

  const level = parseInt(el.tagName[1]);
  const prevLevel = parseInt(headings[index - 1].tagName[1]);

  if (level - prevLevel <= 1) return null;

  return {
    selector: cssSelector(el),
    issue: `Heading level skipped`,
    criterion: 'WCAG 1.3.1',
    severity: 'moderate',
    detail: `<${el.tagName.toLowerCase()}> follows <h${prevLevel}> — jumps ${level - prevLevel} levels`,
    fix: `Use <h${prevLevel + 1}> here, or restructure so headings step down one level at a time`,
  };
}

export const CHECKS = [
  checkContrast,
  checkAltText,
  checkFormLabel,
  checkAriaRole,
  checkFocusable,
  checkHeadingHierarchy,
];

export function runChecks(el) {
  const findings = [];
  for (const check of CHECKS) {
    const result = check(el);
    if (result) findings.push(result);
  }
  return findings;
}
