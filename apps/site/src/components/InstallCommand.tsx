"use client";

import { useState } from "react";

export default function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-mono text-[#121212] whitespace-nowrap hover:bg-[#1212120D] transition-colors"
    >
      {copied ? "Copied" : command}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 9.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H9.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </button>
  );
}
