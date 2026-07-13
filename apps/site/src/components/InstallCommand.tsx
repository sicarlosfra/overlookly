"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Button variant="installCommand" size="sm" onClick={onClick} className="text-[13px] rounded-lg px-3 py-1.5 h-auto">
      {copied ? "Copied" : command}
      <Copy className="size-3.5" />
    </Button>
  );
}
