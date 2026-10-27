import { ArrowField } from "@/components/media/ArrowField";
import { cn } from "@/lib/utils";

/**
 * Shared dark-page backdrop: the cursor-reactive arrow field plus the
 * contrast gradients that keep headings and forms readable.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <ArrowField />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(130,33,252,0.18),transparent_44%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/10 to-night/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/55 via-night/15 to-transparent" />
    </div>
  );
}
