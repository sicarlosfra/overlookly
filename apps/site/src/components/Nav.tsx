"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useActiveSection } from "@/hooks/useActiveSection";

type SubLink = { href: string; label: string };
type NavLinkType = { href: string; label: string; subItems?: SubLink[] };

// subItems are empty for now — Features, Schema, MCP, and Claude Skill
// will get real H2 sub-sections later. The structure is ready; nothing
// invented here, these arrays just stay empty until that content exists.
const TOP_LINKS: NavLinkType[] = [
  { href: "/", label: "Overview" },
  { href: "/install", label: "Install" },
  {
    href: "/features",
    label: "Features",
    subItems: [
      { href: "#how-you-use-it", label: "How you use it" },
      { href: "#how-agents-use-it", label: "How agents use it" },
      { href: "#best-practices", label: "Best practices" },
    ],
  },
  { href: "/schema", label: "Schema", subItems: [] },
];

const TOOLS_LINKS: NavLinkType[] = [
  { href: "/mcp", label: "MCP", subItems: [] },
  { href: "/claude-skill", label: "Claude Skill", subItems: [] },
];

const RESOURCES_LINKS: NavLinkType[] = [
  { href: "/changelog", label: "Changelog" },
  { href: "/faq", label: "FAQ" },
];

const groupLabelClass = "mt-4 mb-1";

function CollapsibleNavLink({ link, isActive }: { link: NavLinkType; isActive: boolean }) {
  const subIds = link.subItems?.map((s) => s.href.replace("#", "")) ?? [];
  const activeSection = useActiveSection(isActive ? subIds : []);

  return (
    <Collapsible defaultOpen={isActive}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <Link href={link.href}>
            <SidebarMenuButton isActive={isActive}>{link.label}</SidebarMenuButton>
          </Link>
        </CollapsibleTrigger>
        {link.subItems!.length > 0 && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {link.subItems!.map((sub) => (
                <SidebarMenuSubItem key={sub.href}>
                  <SidebarMenuSubButton
                    href={sub.href}
                    isActive={isActive && activeSection === sub.href.replace("#", "")}
                  >
                    {sub.label}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}

function DesktopLinkGroup({ links }: { links: NavLinkType[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        const hasSubItems = !!link.subItems;

        if (hasSubItems) {
          return <CollapsibleNavLink key={link.href} link={link} isActive={isActive} />;
        }

        return (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href}>
              <SidebarMenuButton isActive={isActive}>{link.label}</SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </>
  );
}

function MobileLinkGroup({
  links,
  onNavigate,
}: {
  links: NavLinkType[];
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={
              isActive
                ? "text-[12px] text-[#121212] tracking-[-0.08px] leading-[140%] no-underline"
                : "text-[12px] text-[#121212]/50 hover:text-[#121212]/70 tracking-[-0.08px] leading-[140%] no-underline transition-colors"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

export default function Nav({ variant }: { variant: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);

  if (variant === "desktop") {
    return (
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="inline-block">
            <Image src="/logo.svg" alt="overlookly" width={71} height={16} />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <DesktopLinkGroup links={TOP_LINKS} />
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className={groupLabelClass}>Tools</SidebarGroupLabel>
            <SidebarMenu>
              <DesktopLinkGroup links={TOOLS_LINKS} />
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className={groupLabelClass}>Resources</SidebarGroupLabel>
            <SidebarMenu>
              <DesktopLinkGroup links={RESOURCES_LINKS} />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>v0.1</SidebarFooter>
      </Sidebar>
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
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 p-3 pt-0">
          <MobileLinkGroup links={TOP_LINKS} onNavigate={() => setOpen(false)} />
          <p className="text-[10px] text-[#121212]/30 tracking-[-0.08px] leading-[140%] mt-4 mb-1">Tools</p>
          <MobileLinkGroup links={TOOLS_LINKS} onNavigate={() => setOpen(false)} />
          <p className="text-[10px] text-[#121212]/30 tracking-[-0.08px] leading-[140%] mt-4 mb-1">Resources</p>
          <MobileLinkGroup links={RESOURCES_LINKS} onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </div>
  );
}
