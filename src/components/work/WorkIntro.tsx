import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const pad = (value: number) => String(value).padStart(2, "0");

type WorkIntroProps = {
  total: number;
  current?: number;
  compact?: boolean;
  bare?: boolean;
  plain?: boolean;
  showCta?: boolean;
};

/**
 * Shared introduction for the selected-work section. The stacked
 * mobile/reduced-motion view uses the full header; the pinned viewer keeps a
 * bare label/counter row so the artwork can fill the stage. `plain` renders
 * only the editorial heading above the pinned stage, avoiding a second label.
 */
export function WorkIntro({
  total,
  current,
  compact = false,
  bare = false,
  plain = false,
  showCta = true,
}: WorkIntroProps) {
  const counter =
    typeof current === "number" ? (
      <span
        data-work-counter
        className="font-mono text-[0.66rem] tracking-[0.18em] text-paper/55"
      >
        {pad(current + 1)}
        <span className="mx-1.5 text-paper/25">/</span>
        {pad(total)}
      </span>
    ) : null;

  if (bare) {
    return (
      <div className="flex items-center justify-between gap-4">
        <SectionLabel index="05" tone="light">
          Selected work
        </SectionLabel>

        <div className="flex items-center gap-4">
          <Link
            href="/work"
            className="group hidden items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-paper/55 transition-colors hover:text-coral-soft lg:inline-flex"
          >
            View All Case Studies
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
          {counter}
        </div>
      </div>
    );
  }

  const heading = (
    <div
      className={cn(
        "grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)] lg:items-end lg:gap-8",
        !plain && "mt-4",
      )}
    >
      <h2
        className={cn(
          "display max-w-3xl text-paper",
          compact
            ? "text-[clamp(1.85rem,3.4vw,3.1rem)]"
            : "text-[clamp(2.1rem,4.5vw,3.7rem)]",
        )}
      >
        Ideas made to make an{" "}
        <span className="serif-accent text-coral-soft">impact.</span>
      </h2>

      {compact ? (
        <p className="mt-2 max-w-xl text-[0.76rem] leading-relaxed text-paper/50 lg:hidden">
          A selection of creative work, digital experiences, and campaigns designed to help
          brands stand out.
        </p>
      ) : null}

      <div className={cn("max-w-md", compact && "hidden lg:block")}>
        <p className="text-[0.82rem] leading-relaxed text-paper/55 lg:text-[0.88rem]">
          A selection of creative work, digital experiences, and campaigns designed to help
          brands stand out.
        </p>
        <p className="mt-2 text-[0.56rem] font-medium uppercase leading-relaxed tracking-[0.12em] text-paper/30">
          Illustrative concept projects. The thinking is real; the briefs are speculative.
        </p>
        {showCta ? (
          <ButtonLink
            href="/work"
            variant="light"
            size="sm"
            className={cn("mt-4", compact && "hidden lg:inline-flex")}
            arrow
          >
            View All Case Studies
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );

  if (plain) return heading;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <SectionLabel index="05" tone="light">
          Selected work
        </SectionLabel>

        {counter ?? (
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-paper/55 transition-colors hover:text-coral-soft"
          >
            All work
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
        )}
      </div>

      {heading}
    </div>
  );
}
