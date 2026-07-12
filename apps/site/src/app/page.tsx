import InstallCommand from "@/components/InstallCommand";

export default function OverviewPage() {
  return (
    <div>
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <h1 className="text-h1 max-w-[420px] mb-3.5">
          Accessibility feedback, structured for agents.
        </h1>
        <InstallCommand command="npm install overlookly-a11y" />
      </div>

      <p className="text-body mb-3.5">
        overlookly turns UI elements into structured accessibility findings
        that AI coding agents can understand and act on. Click any element,
        run the check, and paste the output into Claude Code, Codex, or any
        AI tool.
      </p>

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">Try out</h2>
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

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">Features</h2>
      <ul className="pl-5 text-body list-disc">
        <li className="mb-1.5">Click the icon in the bottom-right corner to activate</li>
        <li className="mb-1.5">Hover over elements to see what&apos;s checkable</li>
        <li className="mb-1.5">Click any element to run the check</li>
        <li className="mb-1.5">Get the issue, the WCAG criterion, and a suggested fix</li>
        <li className="mb-1.5">Click to copy formatted markdown</li>
        <li className="mb-1.5">Paste into your agent</li>
      </ul>

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">How agents use it</h2>
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

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">Agents talk back</h2>
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

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">Licensing</h2>
      <p className="text-body mb-3.5">
        MIT licensed. Free to use, modify, and redistribute — no restrictions,
        no commercial tier.
      </p>

      <div className="mt-10 pt-6 border-t border-[#eee] flex flex-col gap-1.5">
        <a href="/mcp" className="text-body">Set up real-time sync with MCP →</a>
        <a href="/claude-skill" className="text-body">Install the Claude Code skill →</a>
        <a href="/schema" className="text-body">See the full finding schema →</a>
      </div>
    </div>
  );
}
