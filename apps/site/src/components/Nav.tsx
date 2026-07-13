"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

const groupLabelClass = "text-[10px] text-[#121212]/30 tracking-[-0.08px] leading-[140%] mt-4 mb-1";

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={
        isActive
          ? "text-[12px] text-[#121212] tracking-[-0.08px] leading-[140%] no-underline"
          : "text-[12px] text-[#121212]/50 hover:text-[#121212]/70 tracking-[-0.08px] leading-[140%] no-underline transition-colors"
      }
    >
      {label}
    </Link>
  );
}

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
        <NavLink key={link.href} href={link.href} label={link.label} onNavigate={onNavigate} />
      ))}
    </>
  );
}

export default function Nav({ variant }: { variant: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);

  if (variant === "desktop") {
    return (
      <aside
        className="hidden md:flex md:flex-col md:fixed md:top-[60px] md:w-28"
        style={{
          left: "max(60px, calc(50vw - 460px))",
          height: "calc(100vh - 60px)",
        }}
      >
        <Link href="/" className="mb-8 inline-block">
          <Image src="/logo.svg" alt="overlookly" width={71} height={16} />
        </Link>
        <nav className="flex flex-col gap-3">
          <LinkGroup links={TOP_LINKS} />
          <p className={groupLabelClass}>Tools</p>
          <LinkGroup links={TOOLS_LINKS} />
          <p className={groupLabelClass}>Resources</p>
          <LinkGroup links={RESOURCES_LINKS} />
        </nav>
        <div className="mt-20 text-[10px] text-[#121212]/30">v0.1</div>
      </aside>
    );
  }

  return (
    <div className="border-b border-[#e4e2da]">
      <div className="flex items-center justify-between p-3">
        <Link href="/">
          <Image src="/logo.svg" alt="overlookly" width={71} height={16} />
        </Link>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#f7f6f2]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open ? (
              <path d="M5 5L15 15M15 5L5 15" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              // Two lines only, per spec (not the standard three-line hamburger)
              <path d="M3 7H17M3 13H17" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 p-3 pt-0">
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
