import { runChecks } from './checks.js';

// Brand: red #E5484D for all hover/highlight states, corner radius 6-8px throughout.
const STYLE = `
  .ovlk-toggle {
    position: fixed; bottom: 20px; right: 20px; z-index: 999999;
    width: 44px; height: 44px; border-radius: 50%; border: none;
    background: #1a1a18; color: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-family: -apple-system, sans-serif; font-size: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.25);
    transition: background 0.15s ease;
  }
  .ovlk-toggle:hover { background: #E5484D; }
  .ovlk-toggle.ovlk-active { background: #E5484D; }
  .ovlk-highlight {
    outline: 2px solid #E5484D !important;
    outline-offset: 2px !important;
    border-radius: 6px !important;
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
  toggle.textContent = '◎';
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
    if (e.target === toggle || panel.contains(e.target)) return;
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
