import SectionHeading from "@/components/SectionHeading";

export default function FeaturesPage() {
  return (
    <div>
      <h1 className="text-h1 mb-3.5">
        Features
      </h1>

      <SectionHeading>How you use it</SectionHeading>
      <ol className="pl-5 text-body list-decimal marker:text-[#121212]/40">
        <li className="mb-2">
          Click the{" "}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline align-[-2px]">
            <path d="M2 4H12M2 7H9M2 10H6" stroke="#121212" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="10" cy="4" r="1.5" fill="#121212" />
          </svg>{" "}
          icon in the bottom-right corner to activate
        </li>
        <li className="mb-2"><strong>Hover</strong> over elements to see what&apos;s checkable</li>
        <li className="mb-2"><strong>Click</strong> any element to run the check</li>
        <li className="mb-2">Get the issue, the WCAG criterion, and a suggested fix</li>
        <li className="mb-2">
          Click{" "}
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="inline align-[-2px]">
            <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="#121212" strokeWidth="1.2" />
            <path d="M1.5 9.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H9.5" stroke="#121212" strokeWidth="1.2" />
          </svg>{" "}
          to copy formatted markdown
        </li>
        <li className="mb-2">Paste into your agent</li>
      </ol>
      <p className="text-[13px] text-body mt-3">
        <strong>Note:</strong> with <a href="/mcp">MCP</a>, skip the
        copy-paste — your agent already sees what&apos;s flagged. Just say
        &quot;fix the contrast issues&quot; or &quot;resolve finding 3.&quot;
      </p>

      <SectionHeading>How agents use it</SectionHeading>
      <p className="text-body mb-2">
        overlookly works best with tools that have access to your codebase
        (Claude Code, Cursor, etc). When you send findings, agents get:
      </p>
      <ul className="pl-5 text-body list-disc">
        <li className="mb-1.5">CSS selectors to grep your codebase</li>
        <li className="mb-1.5">WCAG criterion so the fix is grounded in an actual standard, not a guess</li>
        <li className="mb-1.5">Computed styles — contrast ratio, focus state, ARIA attributes as they actually render</li>
        <li className="mb-1.5">Suggested fix with the exact change, not just a description of the problem</li>
      </ul>
      <p className="text-caption mt-3">
        Note: source-file-path lookup (jumping straight to the line in your
        codebase) isn&apos;t built yet — today findings include a CSS selector,
        not a file path. That&apos;s the next planned check, tracked on the{" "}
        <a href="/changelog">Changelog</a>.
      </p>

      <SectionHeading>Best practices</SectionHeading>
      <ul className="pl-5 text-body list-disc">
        <li className="mb-1.5">Check while you build, not after — the earlier the cheaper the fix</li>
        <li className="mb-1.5">One issue per finding — easier for the agent to address individually</li>
        <li className="mb-1.5">Use it alongside a full audit, not instead of one</li>
      </ul>
    </div>
  );
}
