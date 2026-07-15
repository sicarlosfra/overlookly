"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type DemoItem = { label: string; content: React.ReactNode };

export default function TryOutCarousel({ items }: { items: DemoItem[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-[#E5484D0D] rounded-[26px] p-[10px]">
      <div className="bg-white rounded-[16px] shadow-[0_0_4px_rgba(0,0,0,0.05)] p-6 min-h-[420px] flex flex-col">
        <p className="text-caption">{items[index].label}</p>

        <div className="flex-1 flex items-center justify-center">
          {items[index].content}
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous example"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            disabled={index === items.length - 1}
            aria-label="Next example"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
