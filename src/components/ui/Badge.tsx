import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light" | "coral";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em]",
        tone === "dark" && "border-ink/25 bg-night/[0.04] text-ink/70",
        tone === "light" && "border-paper/30 bg-paper/10 text-paper/80",
        tone === "coral" && "border-ink bg-coral text-white shadow-[2px_2px_0_0_var(--color-ink)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Dot({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-coral", className)} />;
}
