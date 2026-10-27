import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const models = [
  {
    name: "Project sprint",
    bestFor: "A defined outcome: a rebrand, a website, a launch campaign.",
    includes: "Discovery, strategy, design, build and handover, in one scoped engagement.",
    timeline: "Timeline agreed in the proposal",
    accent: false,
  },
  {
    name: "Monthly retainer",
    bestFor: "Businesses that need consistent strategy, creative and optimisation.",
    includes: "A defined team, monthly production capacity and a rolling roadmap.",
    timeline: "Rolling monthly, terms in writing",
    accent: true,
  },
  {
    name: "Advisory",
    bestFor: "In-house teams that need a strategy partner, not another supplier.",
    includes: "Strategy sessions, measurement reviews and a second opinion on big calls.",
    timeline: "Monthly or quarterly cadence",
    accent: false,
  },
];

export function EngagementModels() {
  return (
    <section className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="04">Ways to work together</SectionLabel>
            <h2 className="display mt-5 max-w-xl text-[clamp(2rem,3.8vw,3.1rem)]">
              Three ways in, one{" "}
              <span className="serif-accent text-coral">standard</span> of work.
            </h2>
          </div>
          <p className="max-w-sm text-[0.9rem] leading-relaxed text-ink/55">
            Every engagement starts with a short discovery conversation. Fees are scoped and agreed in
            writing before any work begins.
          </p>
        </div>

        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {models.map((model, index) => (
            <Reveal key={model.name} delay={index * 0.06}>
              <div
                className={
                  model.accent
                    ? "flex h-full flex-col rounded-card border-2 border-ink bg-night p-7 text-paper shadow-[5px_5px_0_0_var(--color-coral)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_0_var(--color-coral)]"
                    : "flex h-full flex-col rounded-card border-2 border-ink bg-card p-7 text-ink shadow-hard-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard"
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={
                      model.accent
                        ? "text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-coral-soft"
                        : "text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/40"
                    }
                  >
                    0{index + 1}
                  </span>
                  {model.accent ? (
                    <span className="rounded-full border border-ink bg-coral px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-white">
                      Most common
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-6 font-display text-[1.6rem] font-semibold tracking-[-0.03em]">{model.name}</h3>
                <p className={model.accent ? "mt-3 text-[0.88rem] leading-relaxed text-paper/70" : "mt-3 text-[0.88rem] leading-relaxed text-ink/60"}>
                  {model.bestFor}
                </p>

                <div className={model.accent ? "mt-6 border-t border-paper/15 pt-5" : "mt-6 border-t border-ink/12 pt-5"}>
                  <p className={model.accent ? "text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-paper/45" : "text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/45"}>
                    Includes
                  </p>
                  <p className={model.accent ? "mt-2 text-[0.88rem] leading-relaxed text-paper/75" : "mt-2 text-[0.88rem] leading-relaxed text-ink/65"}>
                    {model.includes}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <span className={model.accent ? "text-[0.74rem] font-medium text-paper/55" : "text-[0.74rem] font-medium text-ink/50"}>
                    {model.timeline}
                  </span>
                  <Link
                    href="/contact"
                    aria-label={`Enquire about ${model.name}`}
                    className={
                      model.accent
                        ? "flex h-10 w-10 items-center justify-center rounded-full border-2 border-paper/40 text-paper transition-colors hover:border-coral hover:bg-coral hover:text-white"
                        : "flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/20 text-ink transition-colors hover:border-ink hover:bg-night hover:text-paper"
                    }
                  >
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-5 text-[0.7rem] leading-relaxed text-ink/40">
          No published package prices: scope drives cost. Ask for a written proposal with a defined
          scope, fee and a clear list of deliverables.
        </p>
      </div>
    </section>
  );
}
