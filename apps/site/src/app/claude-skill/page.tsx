import SectionHeading from "@/components/SectionHeading";

export default function ClaudeSkillPage() {
  return (
    <div>
      <h1 className="text-h1 mb-3.5">
        Claude Skill
      </h1>
      <p className="text-body mb-3.5">
        A skill that lets Claude Code set up overlookly for you — detects
        your framework, installs the package, finds the right entry file,
        and asks whether you want the MCP server too.
      </p>

      <p className="text-caption mt-6 mb-2">Install the skill</p>
      <pre className="bg-[#f7f6f2] rounded-md px-4 py-3.5 text-[13px] overflow-x-auto">
        cp -r skills/overlookly-a11y-setup ~/.claude/skills/
      </pre>
      <p className="text-body mb-3.5">
        Copies the skill definition into Claude Code&apos;s skills folder. It
        triggers automatically the next time you ask Claude Code to set up
        overlookly in a project.
      </p>

      <SectionHeading>What it does</SectionHeading>
      <ul className="pl-5 text-body list-disc">
        <li className="mb-1.5">Checks package.json to detect React, Vue, or plain HTML</li>
        <li className="mb-1.5">Runs the install command</li>
        <li className="mb-1.5">Finds the right entry file for your framework and adds the mount call</li>
        <li className="mb-1.5">Adds a dev-only guard so it doesn&apos;t ship to production by accident</li>
        <li className="mb-1.5">Asks whether you want the MCP server set up too</li>
      </ul>

      <SectionHeading>Not built yet</SectionHeading>
      <p className="text-body">
        A one-line install via a community skills CLI (the way some tools
        distribute skills straight from a GitHub repo) isn&apos;t set up for this
        project — the manual copy above is the current way to install it.
      </p>
    </div>
  );
}
