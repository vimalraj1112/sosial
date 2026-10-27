import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  tone = "dark",
}: {
  items: string[];
  className?: string;
  tone?: "dark" | "light";
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("mask-fade-x flex overflow-hidden", className)} aria-label="Capabilities">
      <div className="marquee-track flex w-max shrink-0 items-center">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "flex items-center whitespace-nowrap px-6 font-display text-lg font-semibold tracking-[-0.02em] sm:text-xl",
              tone === "light" ? "text-paper/80" : "text-ink/80",
            )}
            aria-hidden={index >= items.length ? true : undefined}
          >
            {item}
            <span aria-hidden="true" className="ml-12 h-1.5 w-1.5 rounded-full bg-coral" />
          </span>
        ))}
      </div>
    </div>
  );
}
