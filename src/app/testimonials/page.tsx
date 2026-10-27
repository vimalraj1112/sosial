import type { Metadata } from "next";
import { Check, Quote } from "lucide-react";
import { testimonials, testimonialDisclaimer } from "@/data/testimonials";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials — Client feedback, with permission",
  description:
    "Real client feedback will be published here with written permission. The current cards are layout placeholders, clearly labelled as samples.",
  path: "/testimonials",
  noIndex: true,
});

const publishingRules = [
  "Written approval from the client before anything is published.",
  "The quote appears in context, not edited to change its meaning.",
  "The work behind the quote is linked so the claim can be judged.",
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative py-16 sm:py-20 lg:py-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionLabel index="—" tone="light">
              Testimonials / Client feedback
            </SectionLabel>
            <Badge tone="light">Placeholder page</Badge>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <h1 className="display max-w-4xl text-[clamp(2.8rem,6.8vw,5.8rem)]">
                In their{" "}
                <span className="serif-accent text-coral-soft">words</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.06rem]">
                Real feedback, published with written permission and linked to the work it describes.
                The cards below are layout samples while approved client quotes are collected.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <ButtonLink href="/contact" variant="primaryOnDark" arrow>
                Start a conversation
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-4 border-b border-ink/12 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel index="01">Sample layouts</SectionLabel>
              <h2 className="display mt-4 max-w-xl text-[clamp(1.9rem,3.8vw,3rem)]">
                What a testimonial will{" "}
                <span className="serif-accent text-coral">look like</span>.
              </h2>
            </div>
            <p className="max-w-xs text-[0.8rem] leading-relaxed text-ink/50">
              Quotes, names and companies below are placeholders. They are not real endorsements.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure
                key={item.image}
                className="flex h-full flex-col justify-between gap-8 rounded-card border-2 border-ink bg-card p-6 text-ink shadow-[5px_5px_0_0_var(--color-coral)] sm:p-7"
              >
                <Quote aria-hidden="true" className="h-7 w-7 text-coral" strokeWidth={1.8} />
                <blockquote className="text-[1rem] font-medium leading-relaxed text-ink/80">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-ink/10 pt-4">
                  <p className="font-display text-[1rem] font-semibold tracking-[-0.01em]">{item.name}</p>
                  <p className="mt-1 text-[0.74rem] text-ink/55">
                    {item.role}, {item.company}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-coral/40 bg-coral/10 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-coral">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-coral" />
                    Sample layout
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-[0.78rem] leading-relaxed text-ink/50">
            {testimonialDisclaimer}
          </p>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper-deep py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="02">Publishing rules</SectionLabel>
            <h2 className="display mt-5 max-w-md text-[clamp(1.9rem,3.8vw,3rem)]">
              Permission before{" "}
              <span className="serif-accent text-coral">publication</span>.
            </h2>
            <p className="mt-5 max-w-md text-[0.94rem] leading-relaxed text-ink/65">
              A testimonial is evidence, not decoration. We would rather publish three useful,
              approved quotes than a wall of anonymous praise.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-3">
              {publishingRules.map((rule, index) => (
                <div
                  key={rule}
                  className="flex items-start gap-4 rounded-card border-2 border-ink bg-card p-5 shadow-hard-xs sm:p-6"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper font-mono text-[0.62rem] text-coral">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="flex items-start gap-2 pt-1 text-[0.9rem] leading-relaxed text-ink/70">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-coral" strokeWidth={2} />
                    {rule}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-ink/15 bg-card p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink/40">
                For current clients
              </p>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/60">
                If we have worked together and you would like to approve a quote, send it to us in
                writing. We will not publish your name or company without permission.
              </p>
              <ButtonLink href="/contact" variant="outline" size="sm" className="mt-4" arrow>
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
