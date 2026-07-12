"use client";

import { useState } from "react";
import Link from "next/link";

const TOP_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/install", label: "Install" },
  { href: "/features", label: "Features" },
  { href: "/schema", label: "Schema" },
];

const TOOLS_LINKS = [
  { href: "/mcp", label: "MCP" },
  { href: "/claude-skill", label: "Claude Skill" },
];

const RESOURCES_LINKS = [
  { href: "/changelog", label: "Changelog" },
  { href: "/faq", label: "FAQ" },
];

const linkClass =
  "text-[#2480ED] no-underline hover:text-[#E5484D] transition-colors text-[14px]";
const groupLabelClass = "text-[12px] text-[#a8a69d] mt-5 mb-1";

function LinkGroup({
  links,
  onNavigate,
}: {
  links: { href: string; label: string }[];
  onNavigate?: () => void;
}) {
  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass} onClick={onNavigate}>
          {link.label}
        </Link>
      ))}
    </>
  );
}

export default function Nav({ variant }: { variant: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);

  if (variant === "desktop") {
    return (
      <aside className="flex flex-col h-screen sticky top-0 px-6 py-8">
        <Link href="/" className="text-[#E5484D] font-semibold text-[17px] no-underline mb-8">
          overlookly
        </Link>
        <nav className="flex flex-col gap-2.5">
          <LinkGroup links={TOP_LINKS} />
          <p className={groupLabelClass}>Tools</p>
          <LinkGroup links={TOOLS_LINKS} />
          <p className={groupLabelClass}>Resources</p>
          <LinkGroup links={RESOURCES_LINKS} />
        </nav>
        <div className="mt-auto pt-6 text-[12px] text-[#a8a69d]">v0.1</div>
      </aside>
    );
  }

  return (
    <div className="border-b border-[#e4e2da]">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-[#E5484D] font-semibold text-[15px] no-underline">
          overlookly
        </Link>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#f7f6f2]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open ? (
              <path d="M5 5L15 15M15 5L5 15" stroke="#1a1a18" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 6H17M3 10H17M3 14H17" stroke="#1a1a18" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 px-5 pb-5">
          <LinkGroup links={TOP_LINKS} onNavigate={() => setOpen(false)} />
          <p className={groupLabelClass}>Tools</p>
          <LinkGroup links={TOOLS_LINKS} onNavigate={() => setOpen(false)} />
          <p className={groupLabelClass}>Resources</p>
          <LinkGroup links={RESOURCES_LINKS} onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </div>
  );
}
