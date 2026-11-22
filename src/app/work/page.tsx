import type { Metadata } from "next";
import { projects } from "@/data/work";
import { buildMetadata } from "@/lib/seo";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { PortfolioCta } from "@/components/work/PortfolioCta";
import { WorkBrowser } from "@/components/work/WorkBrowser";
import { Typewriter, type TypewriterPart } from "@/components/ui/Typewriter";

export const metadata: Metadata = buildMetadata({
  title: "Our work",
  description:
    "Explore SOSIAL's concept portfolio: brand identities, websites, social systems, performance thinking and search programmes. Every project is an illustrative concept; no client results are claimed.",
  path: "/work",
});

const headline: TypewriterPart[][] = [
  [{ text: "Ideas built to" }],
  [{ text: "make an impact.", className: "text-[#9C57FD]" }],
];

export default function WorkPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative flex min-h-[70svh] flex-col items-center justify-center pb-16 pt-20 text-center sm:pt-24 lg:pb-20 lg:pt-28">
          <h1 className="max-w-6xl font-display text-[clamp(2.3rem,6vw,5rem)] font-bold leading-[1.08] tracking-[-0.04em]">
            <Typewriter lines={headline} speed={45} startDelay={140} trigger="mount" />
          </h1>
          <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.1rem]">
            A selection of campaigns, websites and content that shows how we think, plan and create.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" variant="primary" size="lg" arrow>
              Start a conversation
            </ButtonLink>
            <ButtonLink href="/services" variant="light" size="lg">
              Explore Services
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-night pb-20 text-paper sm:pb-24 lg:pb-28">
        <div className="container-x">
          <div data-reveal="fade" className="mb-4 flex flex-wrap items-end justify-between gap-3">
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
