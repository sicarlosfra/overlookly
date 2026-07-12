export default function SchemaPage() {
  return (
    <div>
      <h1 className="text-h1 mb-3.5">
        Schema
      </h1>
      <p className="text-body mb-3.5">
        Every finding overlookly reports follows this exact shape — whether
        it comes back via &quot;Copy as markdown&quot; or through the MCP server.
      </p>

      <pre className="bg-[#f7f6f2] rounded-md px-4 py-3.5 text-[13px] overflow-x-auto whitespace-pre-wrap">
{`{
  "selector": "button.cta",
  "issue": "Insufficient color contrast",
  "criterion": "WCAG 1.4.3",
  "severity": "serious",
  "detail": "Contrast ratio 2.85:1, needs 4.5:1",
  "fix": "Change text color to #595959 (meets 4.5:1 against current background)"
}`}
      </pre>

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">Fields</h2>
      <table className="w-full text-[13px] border-collapse mt-3">
        <tbody>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top w-32">selector</td><td className="py-1.5">CSS selector for the flagged element</td></tr>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top">issue</td><td className="py-1.5">Short description of what&apos;s wrong</td></tr>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top">criterion</td><td className="py-1.5">The WCAG success criterion this maps to</td></tr>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top">severity</td><td className="py-1.5">serious, moderate, or minor</td></tr>
          <tr className="border-b border-[#eee]"><td className="py-1.5 pr-4 text-[#121212]/50 align-top">detail</td><td className="py-1.5">The specific measured value</td></tr>
          <tr><td className="py-1.5 pr-4 text-[#121212]/50 align-top">fix</td><td className="py-1.5">A concrete suggested change</td></tr>
        </tbody>
      </table>

      <p className="text-caption mt-6">
        Once a finding is sent via MCP, it also gets an <code className="bg-[#f7f6f2] px-1.5 py-0.5 rounded">id</code> and{" "}
        <code className="bg-[#f7f6f2] px-1.5 py-0.5 rounded">status</code> (open / resolved / wont_fix), assigned by the server.
      </p>
    </div>
  );
}
