import InstallCommand from "@/components/InstallCommand";
import SectionHeading from "@/components/SectionHeading";
import ArrowLink from "@/components/ArrowLink";
import TryOutCarousel from "@/components/TryOutCarousel";
import { Copy } from "lucide-react";
import LogoIcon from "@/components/LogoIcon";

const tryOutItems = [
  {
    label: "Low-contrast text",
    content: (
      <p className="text-[#999] text-[15px] max-w-[280px] text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    ),
  },
  {
    label: "Unlabeled input",
    content: (
      <input
        type="email"
        placeholder="you@example.com"
        className="border border-[#00000014] rounded-[14px] px-5 py-3.5 text-[14px] w-full max-w-[240px] outline-none focus:ring-[4px] focus:ring-[#0000000A]"
      />
    ),
  },
  {
    label: "Invalid ARIA role",
    content: (
      <div
        role="buton"
        className="inline-block bg-[#121212] text-white px-5 py-3.5 rounded-[14px] text-[15px] cursor-pointer transition-all hover:ring-[4px] hover:ring-[#0000000A] active:scale-95"
      >
        Submit
      </div>
    ),
  },
];

export default function OverviewPage() {
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h1 className="text-h1 max-w-[480px]">
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
      <TryOutCarousel items={tryOutItems} />

      <SectionHeading>How you use it</SectionHeading>
      <ol className="pl-5 text-body list-decimal marker:text-[#121212]/40">
        <li className="mb-2">
          <span className="inline-flex items-start gap-1.5">
            Click the{" "}
            <LogoIcon className="inline size-3.5 align-middle" />{" "}
            icon in the bottom-right corner to activate
          </span>
        </li>
        <li className="mb-2"><strong>Hover</strong> over elements to see what&apos;s checkable</li>
        <li className="mb-2"><strong>Click</strong> any element to run the check</li>
        <li className="mb-2">Get the issue, the WCAG criterion, and a suggested fix</li>
        <li className="mb-2">
          Click{" "}
          <Copy className="inline size-3.5 align-middle" />{" "}
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
