import InstallCommand from "@/components/InstallCommand";

export default function OverviewPage() {
  return (
    <div className="py-10">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <h1 className="text-[32px] font-semibold leading-tight mt-0 mb-3.5 max-w-[420px] text-[#1a1a18]">
          Accessibility feedback, structured for agents.
        </h1>
        <InstallCommand command="npm install overlookly-a11y" />
      </div>

      <p className="text-[#3a3a36] mb-3.5">
        overlookly turns UI elements into structured accessibility findings
        that AI coding agents can understand and act on. Click any element,
        run the check, and paste the output into Claude Code, Codex, or any
        AI tool.
      </p>

      <div className="bg-[#f7f6f2] rounded-lg p-5 my-6">
        <div className="bg-white border border-[#eee] rounded-lg p-5 flex flex-col gap-4">
          <p className="text-[13px] text-[#8a887f] m-0">
            Try it — the toggle bottom-right is already active. Click each
            broken element below.
          </p>

          <div>
            <p className="text-[12px] text-[#a8a69d] mb-1.5">Low-contrast button</p>
            <button className="bg-white text-[#999] border-none px-4 py-2.5 rounded-md text-[15px]">
              Get started
            </button>
          </div>

          <div>
            <p className="text-[12px] text-[#a8a69d] mb-1.5">Unlabeled input</p>
            <input
              type="email"
              placeholder="you@example.com"
              className="border border-[#ddd] rounded-md px-3 py-2 text-[14px] w-full max-w-[240px]"
            />
          </div>

          <div>
            <p className="text-[12px] text-[#a8a69d] mb-1.5">Invalid ARIA role</p>
            <div role="buton" className="inline-block bg-[#1a1a18] text-white px-4 py-2.5 rounded-md text-[15px] cursor-pointer">
              Submit
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-2.5 text-[#1a1a18]">Features</h2>
      <ul className="pl-5 text-[#3a3a36] list-disc">
        <li className="mb-1.5">Click the icon in the bottom-right corner to activate</li>
        <li className="mb-1.5">Hover over elements to see what&apos;s checkable</li>
        <li className="mb-1.5">Click any element to run the check</li>
        <li className="mb-1.5">Get the issue, the WCAG criterion, and a suggested fix</li>
        <li className="mb-1.5">Click to copy formatted markdown</li>
        <li className="mb-1.5">Paste into your agent</li>
      </ul>
      <p className="text-[13px] text-[#3a3a36] mt-3">
        See the full breakdown on <a href="/features">Features</a>, including{" "}
        <a href="/schema">how agents use it</a>.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2.5 text-[#1a1a18]">Licensing</h2>
      <p className="text-[#3a3a36] mb-3.5">
        MIT licensed. Free to use, modify, and redistribute — no restrictions,
        no commercial tier.
      </p>
    </div>
  );
}
