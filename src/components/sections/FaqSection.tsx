import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { faqs } from "@/data/faqs";
import { brand, mailHref, whatsappHref } from "@/data/brand";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-ink/10 bg-paper-deep py-20 sm:py-24 lg:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="13">Questions</SectionLabel>
            <h2 className="display mt-5 text-[clamp(2rem,3.8vw,3.1rem)]">
              Things worth asking{" "}
              <span className="serif-accent text-coral">before</span> you hire anyone.
            </h2>
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-ink/65">
              If your question is not here, ask it directly. We would rather have an honest
              conversation now than a difficult one later.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-ink bg-night px-5 text-[0.8rem] font-semibold text-paper shadow-hard-xs transition-[transform,box-shadow,background-color,color] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-coral hover:text-white hover:shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Ask a question
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-ink/20 bg-card px-5 text-[0.8rem] font-semibold text-ink transition-[transform,box-shadow,border-color] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-ink hover:shadow-hard-xs active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                WhatsApp
              </a>
            </div>

            <div className="mt-8 max-w-sm rounded-2xl border-2 border-ink bg-card p-5 shadow-hard-xs">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
                How we reply
              </p>
              <p className="mt-2 text-[0.9rem] font-medium leading-relaxed text-ink/75">
                {brand.responsePromise}
              </p>
              <a
                href={mailHref}
                className="mt-3 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-coral underline-offset-4 hover:underline"
              >
                {brand.email}
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="rounded-card border-2 border-ink bg-card px-5 py-2 shadow-hard-xs sm:px-7">
              <Accordion items={faqs} defaultOpen={0} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
