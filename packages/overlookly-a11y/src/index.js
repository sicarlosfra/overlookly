import { initToolbar } from './toolbar.js';
export { runChecks, CHECKS } from './checks.js';

export function overlookly(options = {}) {
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initToolbar(options));
  } else {
    initToolbar(options);
  }
}
