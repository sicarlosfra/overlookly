export default function ChangelogPage() {
  return (
    <div className="py-10">
      <h1 className="text-[32px] font-semibold leading-tight mt-0 mb-3.5 text-[#1a1a18]">
        Changelog
      </h1>

      <h2 className="text-lg font-semibold mt-8 mb-2.5 text-[#1a1a18]">v0.1.0</h2>
      <ul className="pl-5 text-[#3a3a36] list-disc">
        <li className="mb-1.5">Initial release</li>
        <li className="mb-1.5">Six checks: color contrast, alt text, form labels, ARIA roles, keyboard focus, heading hierarchy</li>
        <li className="mb-1.5">Toggle toolbar with hover-to-highlight, click-to-check</li>
        <li className="mb-1.5">&quot;Copy as markdown&quot; and &quot;Send to agent&quot; (via MCP)</li>
        <li className="mb-1.5">MCP server for direct agent access to findings</li>
        <li className="mb-1.5">Claude Code setup skill</li>
      </ul>
    </div>
  );
}
