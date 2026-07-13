import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";

type FaqItemType = { q: string; a: React.ReactNode };
type FaqGroup = { title: string; items: FaqItemType[] };

export default function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <div key={group.title}>
          <SectionHeading>{group.title}</SectionHeading>
          <Accordion type="single" collapsible defaultValue={`${group.title}-0`}>
            {group.items.map((item, i) => {
              const key = `${group.title}-${i}`;
              return (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      ))}
    </>
  );
}
