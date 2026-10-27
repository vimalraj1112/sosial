import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import { brand, mailHref, telHref, whatsappHref } from "@/data/brand";
import { buildMetadata } from "@/lib/seo";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { SectionLabel } from "@/components/ui/SectionLabel";

const nextSteps = [
  "We read your note and reply with a clear next step.",
  "If it looks like a fit, we agree a written scope and timeline.",
  "You receive a proposal covering deliverables, responsibilities and fees.",
];

export const metadata: Metadata = buildMetadata({
  title: "Contact — Start a project",
  description:
    "Tell Sosial what you are trying to change. A short note about the business, the goal and any timing is enough to start a useful conversation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-paper">
      <HeroBackdrop />

      <div className="container-x relative py-16 sm:py-20 lg:py-24">
        <SectionLabel index="—" tone="light">
          Start here
        </SectionLabel>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h1 className="display text-[clamp(2.7rem,5.7vw,4.9rem)]">
              Tell us what you want to{" "}
              <span className="serif-accent text-coral-soft">change</span>.
            </h1>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-paper/65">
              A short note about the business, the goal and any timing is enough to start. No brief
              required, no obligation, no sales sequence.
            </p>

            <p className="mt-9 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/35">
              What happens next
            </p>
            <ul className="mt-4 space-y-3">
              {nextSteps.map((step) => (
                <li key={step} className="flex gap-3 text-[0.87rem] leading-relaxed text-paper/65">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-coral-soft" strokeWidth={2.2} />
                  {step}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-paper/12 pt-6">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/35">
                Direct lines
              </p>
              <div className="mt-4 flex flex-col items-start gap-3 text-[0.9rem]">
                <a href={mailHref} className="inline-flex items-center gap-2.5 break-all text-paper/70 transition-colors hover:text-coral-soft">
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                  {brand.email}
                </a>
                <a href={telHref} className="inline-flex items-center gap-2.5 text-paper/70 transition-colors hover:text-coral-soft">
                  <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                  {brand.phoneLabel}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-paper/70 transition-colors hover:text-coral-soft"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                  Message on WhatsApp
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
                </a>
              </div>
              <p className="mt-6 text-[0.72rem] leading-relaxed text-paper/35">
                {brand.location}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-card border-2 border-ink bg-card p-5 text-ink shadow-[8px_8px_0_0_var(--color-coral)] sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/12 pb-5">
                <div>
                  <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.03em]">
                    Project enquiry
                  </h2>
                  <p className="mt-1 text-[0.82rem] text-ink/55">
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
                <Link href="/privacy" className="underline underline-offset-4 hover:text-ink/75">
                  privacy policy
                </Link>
                . We never sell contact details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
