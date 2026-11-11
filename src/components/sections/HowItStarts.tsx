import { ArrowUpRight } from "lucide-react";
import { brand, whatsappHref } from "@/data/brand";
import { Reveal, reveal } from "@/components/ui/Reveal";
import { Conversation } from "@/components/sections/HowItStartsConversation";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";

const steps = [
  {
    number: "1",
    title: "Say hi",
    body: "WhatsApp or call. One sentence is enough.",
  },
  {
    number: "2",
    title: "Get the plan",
    body: "Ideas, scope and timeline, in writing.",
  },
  {
    number: "3",
    title: "Approve and go",
    body: "We create. You review and refine.",
  },
] as const;

export function HowItStarts() {
  return (
    <section id="how-it-starts" className="scroll-mt-24 bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p {...reveal("left")} className="eyebrow inline-flex items-center gap-2.5 text-coral">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
            How it starts
          </p>
          <h2 {...reveal("rise")} className="display mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
            A first chat goes <span className="serif-accent text-coral">like this.</span>
          </h2>
          <Reveal>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ink/65">
              No brief document, no pitch deck. One message is enough for us to understand the goal
              and tell you what happens next.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Example conversation */}
          <Reveal className="lg:col-span-7" variant="left">
            <div className="overflow-hidden rounded-card border-2 border-ink bg-card shadow-hard-sm">
              <div className="flex items-center justify-between gap-3 border-b border-ink/12 bg-paper px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral font-display text-[0.82rem] font-bold text-white">
                    S
                  </span>
                  <div>
                    <p className="font-display text-[0.9rem] font-semibold leading-tight tracking-[-0.01em]">
                      Sosial
                    </p>
                    <p className="text-[0.66rem] font-medium leading-tight text-ink/50">
                      A real person reads these
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
                  <WhatsAppIcon className="h-3 w-3" />
                  WhatsApp
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <Conversation />
              </div>
            </div>
          </Reveal>

          {/* What happens next */}
          <div className="lg:col-span-5">
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
