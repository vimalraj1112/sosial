import { ArrowUpRight } from "lucide-react";
import { processSteps } from "@/data/faqs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Accordion } from "@/components/ui/Accordion";

const detailItems = processSteps.map((step) => ({
  q: `${step.number} — ${step.title}`,
  a: `${step.body} Typical outputs: ${step.detail}.`,
}));

export function ProcessSection() {
  return (
    <section className="border-y border-ink/10 bg-paper-deep py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionLabel index="09">The process</SectionLabel>
              <h2 className="display mt-5 text-[clamp(2rem,3.8vw,3.1rem)]">
                A process that removes{" "}
                <span className="serif-accent text-coral">surprises</span>.
              </h2>
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
                Four phases, each with a clear output and a decision point. You always know what is
                happening, what is next and what we need from you.
              </p>
              <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
                Typical timeline: agreed per project
              </p>
              <a
                href="#contact"
                className="group mt-8 flex max-w-md items-center justify-between gap-4 rounded-2xl border-2 border-ink bg-card p-5 shadow-hard-xs transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard-sm"
              >
                <span>
                  <span className="block font-display text-[1rem] font-semibold tracking-[-0.02em]">
                    Not sure where you are?
                  </span>
                  <span className="mt-1 block text-[0.84rem] leading-snug text-ink/60">
                    Map it with us in a short conversation.
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink/20 transition-colors group-hover:border-ink group-hover:bg-coral group-hover:text-white">
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border-2 border-ink bg-card p-4 shadow-hard-xs transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard-sm sm:p-5"
                >
                  <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-coral">{step.number}</p>
                  <p className="mt-6 font-display text-[1.02rem] font-semibold leading-snug tracking-[-0.02em]">{step.title}</p>
                </div>
              ))}
            </div>

            <Reveal className="mt-8">
              <div className="rounded-card border-2 border-ink bg-card px-5 py-2 shadow-hard-xs sm:px-7">
                <Accordion items={detailItems} defaultOpen={0} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
