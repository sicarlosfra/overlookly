import { runChecks } from './checks.js';

// Brand: red #E5484D for all hover/highlight states, corner radius 6-8px throughout.
const STYLE = `
  .ovlk-toggle {
    position: fixed; bottom: 20px; right: 20px; z-index: 999999;
    width: 44px; height: 44px; border-radius: 50%; border: none;
    background: #121212; color: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-family: -apple-system, sans-serif; font-size: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.25);
    transition: background 0.15s ease;
  }
  .ovlk-toggle:hover { background: #A03236; }
  .ovlk-toggle.ovlk-active { background: #E5484D; }
  .ovlk-highlight {
    outline: 2px solid #E5484D !important;
    outline-offset: 2px !important;
    border-radius: 6px !important;
    background-color: #E5484D0D !important;
    cursor: crosshair !important;
  }
  .ovlk-panel {
    position: fixed; bottom: 76px; right: 20px; z-index: 999999;
    width: 340px; max-height: 70vh; overflow-y: auto;
    background: #fff; border: 1px solid #e4e2da; border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.18);
    font-family: -apple-system, sans-serif; font-size: 13px; color: #1a1a18;
  }
  .ovlk-panel-header {
    padding: 12px 14px; border-bottom: 1px solid #eee;
    display: flex; justify-content: space-between; align-items: center; font-weight: 600;
  }
  .ovlk-finding {
    padding: 12px 14px; border-bottom: 1px solid #f0f0ec;
  }
  .ovlk-finding-issue { font-weight: 600; margin-bottom: 2px; }
  .ovlk-finding-meta { color: #8a887f; font-size: 12px; margin-bottom: 6px; }
  .ovlk-finding-fix {
    font-family: ui-monospace, monospace; font-size: 11.5px;
    background: #f7f6f2; padding: 6px 8px; border-radius: 6px; line-height: 1.5;
  }
  .ovlk-empty { padding: 20px 14px; color: #8a887f; text-align: center; }
  .ovlk-copy-btn {
    padding: 6px 12px; font-size: 12px;
    border: 1px solid #ddd; border-radius: 6px; background: #fff; cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease;
  }
  .ovlk-copy-btn:hover { border-color: #E5484D; color: #E5484D; }
`;

export function initToolbar(options = {}) {
  if (document.getElementById('ovlk-style')) return;

  const {
    endpoint = 'http://localhost:4478/findings',
    position = 'bottom-right',
    autoActivate = false,
    className = '',
    onFindingAdd = null,
    onSend = null,
  } = options;

  const TOGGLE_POSITIONS = {
    'bottom-right': 'bottom: 20px; right: 20px;',
    'bottom-left': 'bottom: 20px; left: 20px;',
    'top-right': 'top: 20px; right: 20px;',
    'top-left': 'top: 20px; left: 20px;',
  };
  const PANEL_POSITIONS = {
    'bottom-right': 'bottom: 76px; right: 20px;',
    'bottom-left': 'bottom: 76px; left: 20px;',
    'top-right': 'top: 76px; right: 20px;',
    'top-left': 'top: 76px; left: 20px;',
  };

  const style = document.createElement('style');
  style.id = 'ovlk-style';
  style.textContent = STYLE
    .replace(
      '.ovlk-toggle {\n    position: fixed; bottom: 20px; right: 20px;',
      `.ovlk-toggle {\n    position: fixed; ${TOGGLE_POSITIONS[position] || TOGGLE_POSITIONS['bottom-right']}`
    )
    .replace(
      '.ovlk-panel {\n    position: fixed; bottom: 76px; right: 20px;',
      `.ovlk-panel {\n    position: fixed; ${PANEL_POSITIONS[position] || PANEL_POSITIONS['bottom-right']}`
    );
  document.head.appendChild(style);

  const toggle = document.createElement('button');
  toggle.className = `ovlk-toggle ${className}`.trim();
  toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" style="display:block"><g clip-path="url(#ovlk-logo-clip)"><path d="M15.2115 7.20642C15.4769 7.2696 15.7431 7.10009 15.8061 6.82781C15.8691 6.55553 15.7051 6.28358 15.4398 6.2204L15.3257 6.71341L15.2115 7.20642ZM11.5757 3.10406C11.7915 2.93189 11.8311 2.61382 11.6642 2.39362C11.4973 2.17342 11.1872 2.13449 10.9715 2.30665L11.2736 2.70536L11.5757 3.10406ZM9.60091 15.4618C9.48049 15.7132 9.58123 16.016 9.82592 16.1381C10.0706 16.2603 10.3666 16.1554 10.487 15.904L10.044 15.6829L9.60091 15.4618ZM3.02873 8.02251C2.81772 7.84656 2.50659 7.87998 2.33381 8.09717C2.16103 8.31435 2.19202 8.63306 2.40303 8.80901L2.71588 8.41576L3.02873 8.02251ZM4.55186 13.34C4.28475 13.3978 4.11287 13.6664 4.16794 13.9399C4.22302 14.2134 4.4842 14.3881 4.75131 14.3302L4.65159 13.8351L4.55186 13.34ZM6.1826 3.44574C6.18823 3.16626 5.97176 2.9362 5.69909 2.93188C5.42642 2.92757 5.20081 3.15063 5.19517 3.43011L5.68888 3.43793L6.1826 3.44574ZM14.3179 12.737C14.4322 12.9902 14.7256 13.0995 14.9732 12.981C15.2208 12.8626 15.329 12.5613 15.2147 12.3082L14.7663 12.5226L14.3179 12.737ZM9.92185 11.1011L10.2356 11.4903L9.92185 11.1011ZM7.6962 7.53934L7.24663 7.33235L7.6962 7.53934ZM11.1984 9.81843L11.6921 9.80492L11.1984 9.81843ZM8.01859 10.8751L8.12107 10.3795C6.62297 10.0618 4.63583 9.36257 3.02873 8.02251L2.71588 8.41576L2.40303 8.80901C4.17459 10.2862 6.328 11.034 7.9161 11.3708L8.01859 10.8751ZM9.92185 11.1011L9.60811 10.712C8.42354 11.7171 6.61479 12.893 4.55186 13.34L4.65159 13.8351L4.75131 14.3302C7.02651 13.8373 8.97936 12.5562 10.2356 11.4903L9.92185 11.1011ZM7.6962 7.53934L8.14577 7.74632C8.78117 6.30999 9.9072 4.4357 11.5757 3.10406L11.2736 2.70536L10.9715 2.30665C9.13103 3.77549 7.92034 5.80943 7.24663 7.33235L7.6962 7.53934ZM11.1984 9.81843L10.7047 9.83194C10.7376 11.4018 10.5169 13.5494 9.60091 15.4618L10.044 15.6829L10.487 15.904C11.4974 13.7946 11.7269 11.4688 11.6921 9.80492L11.1984 9.81843ZM10.9799 7.86567L10.6791 8.26866C11.9006 9.22361 13.4297 10.7689 14.3179 12.737L14.7663 12.5226L15.2147 12.3082C14.2359 10.1393 12.5754 8.47482 11.2807 7.46268L10.9799 7.86567ZM9.4927 6.892L9.61291 7.38224C11.0969 6.99259 13.1884 6.72466 15.2115 7.20642L15.3257 6.71341L15.4398 6.2204C13.2089 5.68918 10.9461 5.9886 9.37249 6.40177L9.4927 6.892ZM9.4927 6.892L9.2761 7.34798C9.76355 7.58921 10.2221 7.91137 10.6791 8.26866L10.9799 7.86567L11.2807 7.46268C10.8026 7.08893 10.2836 6.72023 9.7093 6.43603L9.4927 6.892ZM10.9799 7.86567L10.5018 7.99488C10.6479 8.57326 10.6912 9.18804 10.7047 9.83194L11.1984 9.81843L11.6921 9.80492C11.6781 9.13696 11.633 8.42917 11.458 7.73646L10.9799 7.86567ZM11.1984 9.81843L10.8125 9.50464C10.473 9.94203 10.0575 10.3306 9.60811 10.712L9.92185 11.1011L10.2356 11.4903C10.7034 11.0933 11.1809 10.6519 11.5842 10.1322L11.1984 9.81843ZM9.92185 11.1011L9.92391 10.595C9.32855 10.5956 8.72962 10.5086 8.12107 10.3795L8.01859 10.8751L7.9161 11.3708C8.56102 11.5076 9.23216 11.608 9.91979 11.6072L9.92185 11.1011ZM8.01859 10.8751L8.40617 10.5595C8.07033 10.1253 7.79694 9.6278 7.53829 9.09845L7.09651 9.32696L6.65474 9.55547C6.92424 10.107 7.23303 10.6763 7.631 11.1908L8.01859 10.8751ZM7.09651 9.32696L7.53855 9.09898C6.68275 7.34236 6.14347 5.38641 6.1826 3.44574L5.68888 3.43793L5.19517 3.43011C5.15198 5.57227 5.74601 7.69021 6.65448 9.55494L7.09651 9.32696ZM7.09651 9.32696L7.53829 9.09845C7.57907 9.18189 7.54213 9.20371 7.57707 9.05356C7.60438 8.93616 7.6587 8.78469 7.73166 8.61359C7.8032 8.44582 7.88515 8.27641 7.96031 8.12505C8.02976 7.98517 8.10567 7.83698 8.14577 7.74632L7.6962 7.53934L7.24663 7.33235C7.21885 7.39515 7.16383 7.50204 7.08056 7.66974C7.003 7.82595 6.91046 8.01661 6.82701 8.21229C6.74499 8.40463 6.66382 8.61998 6.61643 8.82363C6.57667 8.99453 6.52582 9.29163 6.65474 9.55547L7.09651 9.32696ZM9.4927 6.892L9.37249 6.40177C8.73642 6.56878 8.09742 6.78093 7.48395 7.08351L7.6962 7.53934L7.90845 7.99517C8.44384 7.7311 9.0158 7.53901 9.61291 7.38224L9.4927 6.892Z" fill="white"/><circle cx="9" cy="9" r="6.75" stroke="white"/></g><defs><clipPath id="ovlk-logo-clip"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>';
  toggle.title = 'Activate overlookly';
  document.body.appendChild(toggle);

  let active = false;
  let hovered = null;
  const findings = [];

  const panel = document.createElement('div');
  panel.className = 'ovlk-panel';
  panel.style.display = 'none';
  document.body.appendChild(panel);

  function renderPanel() {
    panel.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'ovlk-panel-header';
    header.innerHTML = `<span>Findings (${findings.length})</span>`;
    panel.appendChild(header);

    if (findings.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'ovlk-empty';
      empty.textContent = 'Click an element to check it.';
      panel.appendChild(empty);
      return;
    }

    findings.forEach((f) => {
      const row = document.createElement('div');
      row.className = 'ovlk-finding';
      row.innerHTML = `
        <div class="ovlk-finding-issue">${f.issue}</div>
        <div class="ovlk-finding-meta">${f.selector} · ${f.criterion}</div>
        <div class="ovlk-finding-fix">${f.fix}</div>
      `;
      panel.appendChild(row);
    });

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex; gap:8px; margin: 10px 14px;';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'ovlk-copy-btn';
    copyBtn.textContent = 'Copy as markdown';
    copyBtn.onclick = () => {
      const md = findings
        .map((f) => `- **${f.issue}** (${f.criterion})\n  \`${f.selector}\`\n  ${f.fix}`)
        .join('\n\n');
      navigator.clipboard.writeText(md);
      copyBtn.textContent = 'Copied';
      setTimeout(() => (copyBtn.textContent = 'Copy as markdown'), 1200);
    };

    const sendBtn = document.createElement('button');
    sendBtn.className = 'ovlk-copy-btn';
    sendBtn.textContent = 'Send to agent';
    sendBtn.title = `Requires overlookly-mcp running locally (${endpoint})`;
    sendBtn.onclick = async () => {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(findings),
        });
        if (!res.ok) throw new Error('bad response');
        sendBtn.textContent = 'Sent';
        if (onSend) onSend(findings);
      } catch {
        sendBtn.textContent = 'MCP not running';
      }
      setTimeout(() => (sendBtn.textContent = 'Send to agent'), 1500);
    };

    btnRow.appendChild(copyBtn);
    btnRow.appendChild(sendBtn);
    panel.appendChild(btnRow);
  }

  function onMouseOver(e) {
    if (!active) return;
    if (hovered) hovered.classList.remove('ovlk-highlight');
    hovered = e.target;
    if (hovered !== toggle && hovered !== panel && !panel.contains(hovered)) {
      hovered.classList.add('ovlk-highlight');
    }
  }

  function onClick(e) {
    if (!active) return;
    if (toggle.contains(e.target) || panel.contains(e.target)) return;
    e.preventDefault();
    e.stopPropagation();

    const results = runChecks(e.target);
    if (results.length === 0) {
      const row = document.createElement('div');
      row.className = 'ovlk-finding';
      row.innerHTML = `<div class="ovlk-finding-meta">No issues found on this element.</div>`;
      panel.insertBefore(row, panel.children[1] || null);
      setTimeout(() => row.remove(), 1500);
      return;
    }
    findings.push(...results);
    if (onFindingAdd) results.forEach((f) => onFindingAdd(f));
    renderPanel();
  }

  toggle.addEventListener('click', () => {
    active = !active;
    toggle.classList.toggle('ovlk-active', active);
    panel.style.display = active ? 'block' : 'none';
    if (active) renderPanel();
    if (!active && hovered) {
      hovered.classList.remove('ovlk-highlight');
      hovered = null;
    }
  });

  document.addEventListener('mouseover', onMouseOver, true);
  document.addEventListener('click', onClick, true);

  if (autoActivate) toggle.click();
}
