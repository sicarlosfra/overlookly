import InstallCommand from "@/components/InstallCommand";
import SectionHeading from "@/components/SectionHeading";
import ArrowLink from "@/components/ArrowLink";

export default function OverviewPage() {
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h1 className="text-h1 max-w-[420px]">
          Accessibility feedback, structured for agents.
        </h1>
        <InstallCommand command="npm install overlookly-a11y" />
      </div>

      <p className="text-body mt-3.5 mb-3.5">
        overlookly turns UI elements into structured accessibility findings
        that AI coding agents can understand and act on. Click any element,
        run the check, and paste the output into Claude Code, Codex, or any
        AI tool.
      </p>

      <SectionHeading>Try out</SectionHeading>
      <div className="bg-[#f7f6f2] rounded-lg p-5">
        <div className="bg-white border border-[#eee] rounded-lg p-5 flex flex-col gap-4">
          <p className="text-caption m-0">
            The toggle bottom-right is already active. Click each broken
            element below.
          </p>

          <div>
            <p className="text-caption mb-1.5">Low-contrast button</p>
            <button className="bg-white text-[#999] border-none px-4 py-2.5 rounded-md text-[15px]">
              Get started
            </button>
          </div>

          <div>
            <p className="text-caption mb-1.5">Unlabeled input</p>
            <input
              type="email"
              placeholder="you@example.com"
              className="border border-[#ddd] rounded-md px-3 py-2 text-[14px] w-full max-w-[240px]"
            />
          </div>

          <div>
            <p className="text-caption mb-1.5">Invalid ARIA role</p>
            <div role="buton" className="inline-block bg-[#121212] text-white px-4 py-2.5 rounded-md text-[15px] cursor-pointer">
              Submit
            </div>
          </div>
        </div>
      </div>

      <SectionHeading>How you use it</SectionHeading>
      <ol className="pl-5 text-body list-decimal marker:text-[#121212]/40">
        <li className="mb-2 flex items-start gap-1.5">
          <span>
            Click the{" "}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline align-[-2px]">
              <path d="M2 4H12M2 7H9M2 10H6" stroke="#121212" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="10" cy="4" r="1.5" fill="#121212" />
            </svg>{" "}
            icon in the bottom-right corner to activate
          </span>
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
        Source-file-path lookup isn&apos;t built yet — today findings include a
        CSS selector, not a file path. Tracked on the{" "}
        <a href="/changelog">Changelog</a>.
      </p>

      <SectionHeading>Agents talk back</SectionHeading>
      <p className="text-body mb-2">
        With <a href="/mcp">MCP</a> running, agents don&apos;t just read
        findings — they respond to them:
      </p>
      <ul className="pl-5 text-body list-disc">
        <li className="mb-1.5">&quot;What issues do I have on this page?&quot; — lists every open finding</li>
        <li className="mb-1.5">&quot;Fixed the contrast on the hero button&quot; — agent resolves with a summary</li>
        <li className="mb-1.5">&quot;Mark finding 3 as won&apos;t-fix, it&apos;s a false positive&quot; — agent updates the status with your reason</li>
        <li className="mb-1.5">&quot;Clear everything already resolved&quot; — dismiss in bulk</li>
      </ul>

      <SectionHeading>Licensing</SectionHeading>
      <p className="text-body mb-3.5">
        MIT licensed. Free to use, modify, and redistribute — no restrictions,
        no commercial tier.
      </p>

      <div className="mt-10 pt-6 border-t border-[#eee] flex flex-col gap-2">
        <ArrowLink href="/mcp">Set up real-time sync with MCP</ArrowLink>
        <ArrowLink href="/claude-skill">Install the Claude Code skill</ArrowLink>
        <ArrowLink href="/schema">See the full finding schema</ArrowLink>
      </div>
    </div>
  );
}
