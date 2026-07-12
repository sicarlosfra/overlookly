import Link from "next/link";

export default function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-[14px] tracking-[-0.08px] leading-[140%] no-underline w-fit"
    >
      {children}
      <span className="inline-block transition-transform duration-150 group-hover:translate-x-[3px]">
        →
      </span>
    </Link>
  );
}
