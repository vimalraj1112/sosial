import Link from "next/link";
import { ArrowUpRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import { brand, mailHref, telHref, whatsappHref } from "@/data/brand";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionLabel } from "@/components/ui/SectionLabel";

const nextSteps = [
  "We read your note and reply with a clear next step.",
  "If it looks like a fit, we agree a written scope and timeline.",
  "You receive a proposal covering deliverables, responsibilities and fees.",
];

export function FinalEnquiry() {
  return (
    <section id="contact" className="bg-coral py-20 text-white sm:py-24 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:flex lg:flex-col">
          <SectionLabel index="14" tone="light">
            Start here
          </SectionLabel>
          <h2 className="display mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)]">
            Tell us what you want to{" "}
            <span className="serif-accent">change</span>.
          </h2>
          <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-white/80">
            A short note about the business, the goal and any timing is enough to start. No brief
            required, no obligation, no sales sequence.
          </p>

          <p className="mt-8 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white/60">
            What happens next
          </p>
          <ul className="mt-3 space-y-3">
            {nextSteps.map((step) => (
              <li key={step} className="flex gap-3 text-[0.9rem] leading-relaxed text-white/85">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" strokeWidth={2.2} />
                {step}
              </li>
            ))}
          </ul>

          <div className="mt-9 border-t border-white/30 pt-6 lg:mt-auto">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-white/60">
              Direct lines
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={mailHref}
                className="inline-flex items-center gap-3 break-all text-[0.95rem] font-medium transition-opacity hover:opacity-70"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                {brand.email}
              </a>
              <a
                href={telHref}
                className="inline-flex items-center gap-3 text-[0.95rem] transition-opacity hover:opacity-70"
              >
                <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                {brand.phoneLabel}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[0.95rem] transition-opacity hover:opacity-70"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                Message on WhatsApp
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          <p className="mt-6 text-[0.72rem] leading-relaxed text-white/60">
            {brand.location}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-card border-2 border-ink bg-card p-6 text-ink shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/12 pb-5">
              <div>
                <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.03em]">
                  Project enquiry
                </h3>
                <p className="mt-1 text-[0.84rem] text-ink/55">
                  All fields marked optional can be skipped.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-paper px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-ink/70">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
                Clear next step
              </span>
            </div>
            <div className="mt-6">
              <EnquiryForm variant="full" tone="light" />
            </div>
            <p className="mt-5 border-t border-ink/10 pt-4 text-[0.72rem] leading-relaxed text-ink/55">
              By sending this you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-ink/70">
                privacy policy
              </Link>
              . We never sell contact details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
