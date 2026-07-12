"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";

type FaqItem = { q: string; a: React.ReactNode };
type FaqGroup = { title: string; items: FaqItem[] };

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
    >
      <path d="M3 5L7 9L11 5" stroke="#121212" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  // First item open by default, matching the reference — everything else starts collapsed.
  const [openKey, setOpenKey] = useState<string | null>(`${groups[0]?.title}-0`);

  return (
    <>
      {groups.map((group) => (
        <div key={group.title}>
          <SectionHeading>{group.title}</SectionHeading>
          <div className="flex flex-col">
            {group.items.map((item, i) => {
              const key = `${group.title}-${i}`;
              const isOpen = openKey === key;
              return (
                <div key={key} className="border-t border-[#eee] last:border-b">
                  <button
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left text-body"
                  >
                    <span>{item.q}</span>
                    <Chevron open={isOpen} />
                  </button>
                  {isOpen && (
                    <div className="text-body text-[#121212]/70 pb-4 -mt-1">{item.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
