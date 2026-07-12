export default function FeaturesPage() {
  return (
    <div className="py-10">
      <h1 className="text-[32px] font-semibold leading-tight mt-0 mb-3.5 text-[#1a1a18]">
        Features
      </h1>

      <h2 className="text-lg font-semibold mt-6 mb-2.5 text-[#1a1a18]">How you use it</h2>
      <ul className="pl-5 text-[#3a3a36] list-disc">
        <li className="mb-1.5">Click the icon in the bottom-right corner to activate</li>
        <li className="mb-1.5">Hover over elements to see what&apos;s checkable</li>
        <li className="mb-1.5">Click any element to run the check</li>
        <li className="mb-1.5">Get the issue, the WCAG criterion, and a suggested fix</li>
        <li className="mb-1.5">Click to copy formatted markdown</li>
        <li className="mb-1.5">Paste into your agent</li>
      </ul>
      <p className="text-[13px] text-[#3a3a36] mt-3">
        <strong>Note:</strong> with <a href="/mcp">MCP</a>, skip the
        copy-paste — your agent already sees what&apos;s flagged. Just say
        &quot;fix the contrast issues&quot; or &quot;resolve finding 3.&quot;
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2.5 text-[#1a1a18]">How agents use it</h2>
      <p className="text-[#3a3a36] mb-2">
        overlookly works best with tools that have access to your codebase
        (Claude Code, Cursor, etc). When you send findings, agents get:
      </p>
      <ul className="pl-5 text-[#3a3a36] list-disc">
        <li className="mb-1.5">CSS selectors to grep your codebase</li>
        <li className="mb-1.5">WCAG criterion so the fix is grounded in an actual standard, not a guess</li>
        <li className="mb-1.5">Computed styles — contrast ratio, focus state, ARIA attributes as they actually render</li>
        <li className="mb-1.5">Suggested fix with the exact change, not just a description of the problem</li>
      </ul>
      <p className="text-[13px] text-[#8a887f] mt-3">
        Note: source-file-path lookup (jumping straight to the line in your
        codebase) isn&apos;t built yet — today findings include a CSS selector,
        not a file path. That&apos;s the next planned check, tracked on the{" "}
        <a href="/changelog">Changelog</a>.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2.5 text-[#1a1a18]">Best practices</h2>
      <ul className="pl-5 text-[#3a3a36] list-disc">
        <li className="mb-1.5">Check while you build, not after — the earlier the cheaper the fix</li>
        <li className="mb-1.5">One issue per finding — easier for the agent to address individually</li>
        <li className="mb-1.5">Use it alongside a full audit, not instead of one</li>
      </ul>
    </div>
  );
}
