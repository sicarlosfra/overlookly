export default function McpPage() {
  return (
    <div className="py-10">
      <h1 className="text-[32px] font-semibold leading-tight mt-0 mb-3.5 text-[#1a1a18]">
        MCP
      </h1>
      <p className="text-[#3a3a36] mb-3.5">
        The MCP server bridges the browser toolbar to any MCP-compatible
        agent, so it reads findings directly instead of you copy-pasting
        them.
      </p>

      <p className="text-[13px] text-[#8a887f] mt-6 mb-2">1. Run the server</p>
      <pre className="bg-[#f7f6f2] rounded-md px-4 py-3.5 text-[13px] overflow-x-auto">
        node packages/overlookly-mcp/server.js
      </pre>
      <p className="text-[#3a3a36] mb-3.5">
        Starts a local bridge on{" "}
        <code className="bg-[#f7f6f2] px-1.5 py-0.5 rounded text-[13px]">localhost:4478</code>{" "}
        that the toolbar&apos;s &quot;Send to agent&quot; button talks to. Leave this
        running in its own terminal window while you work.
      </p>

      <p className="text-[13px] text-[#8a887f] mt-6 mb-2">2. Connect your agent</p>
      <pre className="bg-[#f7f6f2] rounded-md px-4 py-3.5 text-[13px] overflow-x-auto whitespace-pre-wrap">
        claude mcp add --scope project overlookly-mcp -- node packages/overlookly-mcp/server.js
      </pre>
      <p className="text-[#3a3a36] mb-3.5">
        This is the Claude Code syntax specifically — other agents configure
        MCP servers differently, check that agent&apos;s current docs for the
        exact command.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2.5 text-[#1a1a18]">Tools exposed</h2>
      <table className="w-full text-[13px] border-collapse mt-3">
        <tbody>
          <tr className="border-b border-[#eee]">
            <td className="py-1.5 pr-4 text-[#8a887f] align-top w-40 font-mono">list_findings</td>
            <td className="py-1.5">List findings, optionally filtered by status</td>
          </tr>
          <tr className="border-b border-[#eee]">
            <td className="py-1.5 pr-4 text-[#8a887f] align-top font-mono">resolve_finding</td>
            <td className="py-1.5">Mark a finding resolved or won&apos;t-fix, with an optional note</td>
          </tr>
          <tr>
            <td className="py-1.5 pr-4 text-[#8a887f] align-top font-mono">clear_findings</td>
            <td className="py-1.5">Delete all findings with a given status</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mt-8 mb-2.5 text-[#1a1a18]">Security</h2>
      <ul className="pl-5 text-[#3a3a36] list-disc">
        <li className="mb-1.5">No external requests — everything stays on localhost</li>
        <li className="mb-1.5">The HTTP bridge only accepts connections from your own machine</li>
        <li className="mb-1.5">No data collection, nothing sent anywhere remotely</li>
      </ul>
    </div>
  );
}
