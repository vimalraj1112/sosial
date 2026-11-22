import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  children,
  tone = "dark",
  className,
  reveal = true,
}: {
  /** Section number, e.g. "01". Leave out for a plain label. */
  index?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  /** Eyebrow labels slide in on scroll unless switched off. */
  reveal?: boolean;
}) {
  return (
    <div
      data-reveal={reveal ? "left" : undefined}
      data-rail={typeof children === "string" ? children : undefined}
      className={cn(
        "flex items-center gap-3",
        tone === "light" ? "text-paper/65" : "text-ink/60",
        className,
      )}
    >
      {index ? (
        <>
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-current px-1.5 text-[0.58rem] font-semibold tracking-[0.08em]">
            {index}
          </span>
          <span
            aria-hidden="true"
            className={cn("h-px w-7", tone === "light" ? "bg-paper/30" : "bg-night/25")}
          />
        </>
      ) : null}
      <span className="eyebrow">{children}</span>
    </div>
  );
}
