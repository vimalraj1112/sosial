import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

type PortfolioCtaProps = {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  buttonLabel?: string;
};

/**
 * The closing statement for the portfolio. It uses the same Night surface as
 * the work grid so the page resolves as one composition rather than handing
 * the visitor back to a generic light CTA.
 */
export function PortfolioCta({
  eyebrow = "Next project",
  title,
  description,
  buttonLabel = "Start a Project",
}: PortfolioCtaProps) {
  return (
    <section className="relative overflow-hidden border-t border-paper/10 bg-night text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-light opacity-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-48 h-[28rem] w-[28rem] rounded-full border border-coral/20 sm:h-[42rem] sm:w-[42rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-28 h-[22rem] w-[22rem] rounded-full bg-coral/10 blur-[100px] sm:h-[32rem] sm:w-[32rem]"
      />

      <div className="container-x relative py-20 sm:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <SectionLabel index="—" tone="light">
              {eyebrow}
            </SectionLabel>
            <h2 className="display mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.92]">
              {title}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-1">
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-paper/55">{description}</p>
            <ButtonLink
              href="/contact"
              variant="primaryOnDark"
              size="lg"
              className="mt-7"
              arrow
            >
              {buttonLabel}
            </ButtonLink>
            <p className="mt-7 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-paper/30">
              Bengaluru · India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
