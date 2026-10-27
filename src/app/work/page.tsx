import type { Metadata } from "next";
import { projects, workStats } from "@/data/work";
import { buildMetadata } from "@/lib/seo";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { PortfolioCta } from "@/components/work/PortfolioCta";
import { WorkBrowser } from "@/components/work/WorkBrowser";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — Selected concept work",
  description:
    "Explore SOSIAL's concept portfolio: brand identities, websites, social systems, performance thinking and search programmes. Every project is an illustrative concept; no client results are claimed.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-12">
          <SectionLabel index="01" tone="light">
            Portfolio / Selected work
          </SectionLabel>

          <div className="mt-6 grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <h1 className="display text-[clamp(3.9rem,10vw,8.6rem)] leading-[0.84]">
                Our <span className="serif-accent text-coral-soft">Work</span>
              </h1>
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-paper/65 sm:text-[1.04rem]">
                Creative campaigns, digital experiences, and strategic work built to help brands
                stand out. Filter by discipline, then go deeper into the thinking.
              </p>
            </div>
            <p className="text-[0.66rem] uppercase leading-relaxed tracking-[0.12em] text-paper/35 lg:col-span-4 lg:text-right">
              Illustrative concepts only.
              <br className="hidden lg:block" /> No client names, results or endorsements are implied.
            </p>
          </div>

          <div className="mt-8 border-y border-paper/15 py-4 sm:py-5">
            <dl className="grid grid-cols-3 gap-3 sm:gap-7">
              {workStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "flex min-w-0 flex-col",
                    index > 0 && "border-l border-paper/12 pl-3 sm:pl-7",
                  )}
                >
                  <dt className="order-2 mt-1.5 text-[0.53rem] font-semibold uppercase leading-snug tracking-[0.13em] text-paper/40 sm:text-[0.6rem]">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-display text-[clamp(1.8rem,3.5vw,2.9rem)] font-semibold leading-none tracking-[-0.045em] text-coral-soft">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-night pb-20 text-paper sm:pb-24 lg:pb-28">
        <div className="container-x">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-paper/40">
              Browse case studies
            </p>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper/30">
              Concept portfolio / 2026
            </p>
          </div>
          <WorkBrowser projects={projects} />
        </div>
      </section>

      <PortfolioCta
        eyebrow="Next chapter"
        title={
          <>
            Ready to create something{" "}
            <span className="serif-accent text-coral-soft">remarkable?</span>
          </>
        }
        description="Let's turn your next big idea into a digital experience that moves your business forward."
        buttonLabel="Start a conversation"
      />
    </>
  );
}
