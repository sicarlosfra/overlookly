import SectionHeading from "@/components/SectionHeading";

export default function FaqPage() {
  return (
    <div>
      <h1 className="text-h1 mb-3.5">FAQ</h1>

      <SectionHeading>Is this a replacement for a full audit?</SectionHeading>
      <p className="text-body mb-3.5">No. It&apos;s prevention, not remediation. Catch what you can while you build. Bring in a full audit for what&apos;s left.</p>

      <SectionHeading>Does it cover every WCAG criterion?</SectionHeading>
      <p className="text-body mb-3.5">Not yet — six checks today, covering what&apos;s reliably detectable from the DOM at the point you click.</p>

      <SectionHeading>Why not just use axe or Lighthouse?</SectionHeading>
      <p className="text-body mb-3.5">Those tell you something&apos;s wrong. This tells your agent what to do about it, with a selector and a suggested fix it can act on directly.</p>

      <SectionHeading>Does the contrast check work on any background?</SectionHeading>
      <p className="text-body mb-3.5">It walks up the DOM looking for the nearest solid background color. It doesn&apos;t yet handle text over images or gradients — a known gap.</p>

      <SectionHeading>Do I need the MCP server?</SectionHeading>
      <p className="text-body mb-3.5">No. Copy as markdown works without it. The MCP server just removes the copy-paste step so your agent can read findings directly.</p>
    </div>
  );
}
