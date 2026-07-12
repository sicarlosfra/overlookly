import SectionHeading from "@/components/SectionHeading";

export default function InstallPage() {
  return (
    <div>
      <h1 className="text-h1 mb-3.5">
        Install
      </h1>

      <p className="text-caption mt-6 mb-2">1. Add the package</p>
      <pre className="bg-[#f7f6f2] rounded-md px-4 py-3.5 text-[13px] overflow-x-auto">
        npm install overlookly-a11y
      </pre>

      <p className="text-caption mt-6 mb-2">2. Mount it</p>
      <pre className="bg-[#f7f6f2] rounded-md px-4 py-3.5 text-[13px] overflow-x-auto whitespace-pre-wrap">
{`import { overlookly } from 'overlookly-a11y';
overlookly();`}
      </pre>
      <p className="text-body mb-3.5">
        Call this once, anywhere that runs on every page — your root layout,
        your app entry point. It mounts a small toggle bottom-right.
      </p>

      <SectionHeading>Options</SectionHeading>
      <pre className="bg-[#f7f6f2] rounded-md px-4 py-3.5 text-[13px] overflow-x-auto whitespace-pre-wrap">
{`overlookly({
  endpoint: 'http://localhost:4478/findings',
  position: 'bottom-right',
  autoActivate: false,
  className: '',
  onFindingAdd: (finding) => {},
  onSend: (findings) => {},
});`}
      </pre>
      <table className="w-full text-[13px] border-collapse mt-3">
        <tbody>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top w-32">endpoint</td><td className="py-1.5">MCP bridge URL for &quot;Send to agent&quot;</td></tr>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top">position</td><td className="py-1.5">bottom-right / bottom-left / top-right / top-left</td></tr>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top">autoActivate</td><td className="py-1.5">skip the toggle click, start active</td></tr>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top">className</td><td className="py-1.5">extra class on the toggle, for custom positioning</td></tr>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top">onFindingAdd</td><td className="py-1.5">fired each time a finding is detected</td></tr>
          <tr><td className="py-1.5 pr-4 text-[#121212]/50 align-top">onSend</td><td className="py-1.5">fired when &quot;Send to agent&quot; succeeds</td></tr>
        </tbody>
      </table>

      <SectionHeading>Framework support</SectionHeading>
      <p className="text-body mb-3.5">
        Works with React, Vue, and plain HTML — it&apos;s a vanilla script that
        mounts itself, no framework-specific wiring required.
      </p>

      <SectionHeading>Next steps</SectionHeading>
      <p className="text-body">
        Want your agent to read findings directly instead of copy-paste? See{" "}
        <a href="/mcp">MCP</a>. Using Claude Code? See{" "}
        <a href="/claude-skill">Claude Skill</a> for automatic setup.
      </p>
    </div>
  );
}
