import { ArrowUpRight } from "lucide-react";
import { brand, whatsappHref } from "@/data/brand";
import { Reveal, reveal } from "@/components/ui/Reveal";
import { Conversation } from "@/components/sections/HowItStartsConversation";

const steps = [
  {
    number: "01",
    title: "Say hello",
    body: "Tell us about your business and what you’re looking for.",
  },
  {
    number: "02",
    title: "We’ll take a look",
    body: "We’ll review your current online presence and share our initial feedback.",
  },
  {
    number: "03",
    title: "Let’s connect",
    body: "We’ll discuss your requirements, recommendations and the way forward.",
  },
] as const;

export function HowItStarts() {
  return (
    <section id="how-it-starts" className="scroll-mt-24 bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p {...reveal("left")} data-rail="How it starts" className="eyebrow inline-flex items-center gap-2.5 text-coral">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
            How it starts
          </p>
          <h2 {...reveal("rise")} className="display mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
            It all starts with a <span className="serif-accent text-coral">simple hello.</span>
          </h2>
          <Reveal>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ink/65">
              You don&rsquo;t need a detailed brief to get started. Just tell us what you&rsquo;re
              looking for, and we&rsquo;ll help you figure out the next step.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Example conversation */}
          <Reveal className="min-w-0 lg:col-span-7" variant="left">
            <div className="overflow-hidden rounded-card border-2 border-ink bg-card shadow-hard-sm">
              <Conversation />
            </div>
          </Reveal>

          {/* What happens next */}
          <div className="min-w-0 lg:col-span-5">
            <Reveal variant="fade">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink/45">
                What happens next
              </p>
            </Reveal>

            <ol className="mt-4 flex flex-col gap-3">
              {steps.map((step) => (
                <Reveal as="li" key={step.number} variant="right">
                  <div className="group flex items-start gap-4 rounded-card border border-ink/12 bg-card px-5 py-4 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-coral/40 hover:shadow-soft">
                    <span className="font-display text-[1.85rem] font-extrabold leading-none tracking-[-0.04em] text-coral">
                      {step.number}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="font-display text-[1.08rem] font-semibold tracking-[-0.02em]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[0.86rem] leading-relaxed text-ink/60">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[0.86rem] font-semibold text-coral transition-colors hover:text-violet-deep"
                >
                  Start with a message
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </a>
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="text-[0.86rem] font-medium text-ink/55 underline underline-offset-4 transition-colors hover:text-coral"
                >
                  Or call {brand.phoneLabel}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
