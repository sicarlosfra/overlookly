export default function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="flex items-center gap-3 mt-10 mb-4 scroll-mt-8">
      <h2 className="text-h2 shrink-0">{children}</h2>
      <div className="flex-1 h-px bg-[#eee]" />
    </div>
  );
}
