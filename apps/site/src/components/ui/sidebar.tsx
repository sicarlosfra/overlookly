import * as React from "react";
import { cn } from "@/lib/utils";

function Sidebar({ className, style, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="sidebar"
      className={cn("hidden md:flex md:flex-col", className)}
      style={{
        // overlookly-specific: fixed positioning that respects the centered
        // 1040px-max layout, instead of shadcn's default left-0 edge pin.
        position: "fixed",
        top: "60px",
        left: "max(60px, calc(50vw - 460px))",
        height: "calc(100vh - 60px)",
        width: "112px",
        ...style,
      }}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("mb-8", className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex flex-1 flex-col gap-4 overflow-y-auto", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("mt-20 text-[10px] text-[#121212]/30", className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="sidebar-group-label"
      className={cn("text-[10px] text-[#121212]/30 tracking-[-0.08px] leading-[140%]", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("flex flex-col gap-3", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" className={cn("list-none", className)} {...props} />;
}

function SidebarMenuButton({
  className,
  isActive,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { isActive?: boolean; asChild?: boolean }) {
  const activeClass = isActive
    ? "text-[12px] text-[#121212] tracking-[-0.08px] leading-[140%] no-underline"
    : "text-[12px] text-[#121212]/50 hover:text-[#121212]/70 tracking-[-0.08px] leading-[140%] no-underline transition-colors";
  return (
    <span
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(activeClass, "block", className)}
      {...props}
    />
  );
}

// Sub-menu — for anchor links to H2 sections within a page (Features,
// Schema, MCP, Claude Skill will get these once those pages have more
// than one section). Empty/unused today, ready for that content later.
function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn("flex flex-col gap-2 border-l border-[#eee] pl-3 py-1", className)}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-sub-item" className={cn("list-none", className)} {...props} />;
}

function SidebarMenuSubButton({
  className,
  isActive,
  ...props
}: React.ComponentProps<"a"> & { isActive?: boolean }) {
  return (
    <a
      data-slot="sidebar-menu-sub-button"
      data-active={isActive}
      className={cn(
        "relative block text-[12px] tracking-[-0.08px] leading-[140%] no-underline transition-colors",
        isActive
          ? "text-[#121212] font-medium before:content-[''] before:absolute before:-left-3 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#121212]"
          : "text-[#121212]/50 hover:text-[#121212]/70",
        className
      )}
      {...props}
    />
  );
}

export {
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
};
