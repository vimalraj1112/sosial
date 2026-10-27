import { Quote } from "lucide-react";
import { testimonials, testimonialDisclaimer } from "@/data/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-night py-20 text-paper sm:py-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-20" />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="11" tone="light">
              In their words
            </SectionLabel>
            <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.8vw,3.1rem)]">
              What it feels like to{" "}
              <span className="serif-accent text-coral-soft">work with us</span>.
            </h2>
          </div>
          <ButtonLink href="/testimonials" variant="light" size="sm" arrow>
            All testimonials
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.image} delay={index * 0.06} className="h-full">
              <figure className="flex h-full flex-col justify-between gap-8 rounded-card border-2 border-ink bg-card p-6 text-ink shadow-[5px_5px_0_0_var(--color-coral)] sm:p-7">
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
            </Reveal>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-[0.78rem] leading-relaxed text-paper/55">
          {testimonialDisclaimer}
        </p>
      </div>
    </section>
  );
}
