import type { ReactNode } from "react";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Typewriter } from "@/components/ui/Typewriter";
import { reveal } from "@/components/ui/Reveal";

type LegalSection = {
  heading: string;
  body: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, intro, updated, sections }: LegalPageProps) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative py-14 sm:py-16 lg:py-20">
          <SectionLabel tone="light">
            {eyebrow}
          </SectionLabel>

          <div className="mt-7 max-w-4xl">
            <h1 className="display text-[clamp(2.5rem,5vw,4.2rem)]">
              <Typewriter lines={[[{ text: title }]]} speed={45} startDelay={140} trigger="mount" />
            </h1>
            <p {...reveal("up")} className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-paper/65">{intro}</p>
            <p {...reveal("fade")} className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-paper/35">
              Last updated: {updated}
            </p>
            <div {...reveal("up")}>
              <ButtonLink href="/contact" variant="primaryOnDark" size="sm" className="mt-7" arrow>
                Ask a question
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-card border-2 border-ink bg-card p-6 shadow-hard-sm sm:p-8">
              <div className="space-y-8">
                {sections.map((section) => (
                  <div key={section.heading} {...reveal("up")}>
                    <h2 className="font-display text-[1.12rem] font-semibold tracking-[-0.02em]">
                      {section.heading}
                    </h2>
                    <div className="mt-2 text-[0.92rem] leading-relaxed text-ink/65">
                      {section.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p {...reveal("fade")} className="mt-5 text-[0.74rem] leading-relaxed text-ink/45">
              This is an interim notice, not a substitute for a complete legal policy. The full
              document will be published when it has been reviewed by the client.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
