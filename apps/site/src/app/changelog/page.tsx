export default function ChangelogPage() {
  return (
    <div>
      <h1 className="text-h1 mb-3.5">
        Changelog
      </h1>

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">v0.1.0</h2>
      <ul className="pl-5 text-body list-disc">
        <li className="mb-1.5">Initial release</li>
        <li className="mb-1.5">Six checks: color contrast, alt text, form labels, ARIA roles, keyboard focus, heading hierarchy</li>
        <li className="mb-1.5">Toggle toolbar with hover-to-highlight, click-to-check</li>
        <li className="mb-1.5">&quot;Copy as markdown&quot; and &quot;Send to agent&quot; (via MCP)</li>
        <li className="mb-1.5">MCP server for direct agent access to findings</li>
        <li className="mb-1.5">Claude Code setup skill</li>
      </ul>

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">Planned</h2>
      <ul className="pl-5 text-body list-disc">
        <li className="mb-1.5">Source-file-path lookup, so findings link straight to the line in your codebase</li>
        <li className="mb-1.5">Focus-order and color-contrast-on-gradient checks</li>
      </ul>
    </div>
  );
}
