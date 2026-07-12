import FaqAccordion from "@/components/FaqAccordion";

const groups = [
  {
    title: "Basics",
    items: [
      {
        q: "Is this a replacement for a full audit?",
        a: "No. It's prevention, not remediation. Catch what you can while you build. Bring in a full audit for what's left.",
      },
      {
        q: "Does it cover every WCAG criterion?",
        a: "Not yet — six checks today, covering what's reliably detectable from the DOM at the point you click.",
      },
      {
        q: "Why not just use axe or Lighthouse?",
        a: "Those tell you something's wrong. This tells your agent what to do about it, with a selector and a suggested fix it can act on directly.",
      },
    ],
  },
  {
    title: "Usage",
    items: [
      {
        q: "Does the contrast check work on any background?",
        a: "It walks up the DOM looking for the nearest solid background color. It doesn't yet handle text over images or gradients — a known gap.",
      },
      {
        q: "Do I need the MCP server?",
        a: "No. Copy as markdown works without it. The MCP server just removes the copy-paste step so your agent can read findings directly.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div>
      <h1 className="text-h1 mb-3.5">FAQ</h1>
      <FaqAccordion groups={groups} />
    </div>
  );
}
