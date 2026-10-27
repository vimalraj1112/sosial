import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappHref } from "@/data/brand";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-night text-paper"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-light opacity-25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-coral/15 sm:h-[48rem] sm:w-[48rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/10 sm:h-[34rem] sm:w-[34rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-coral/10 blur-[90px] sm:w-[42rem]"
      />

      <div className="container-x relative py-24 text-center sm:py-28 lg:py-36">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-coral-soft">
          Your next big idea starts here
        </p>

        <h2
          id="final-cta-heading"
          className="display mx-auto mt-6 max-w-5xl text-[clamp(3.1rem,8vw,7.4rem)] leading-[0.88]"
        >
          Let&rsquo;s Build <span className="serif-accent text-coral-soft">Together.</span>
        </h2>

        <div aria-hidden="true" className="mx-auto mt-9 h-px w-24 bg-paper/20" />

        <p className="mx-auto mt-8 max-w-xl text-[0.98rem] leading-relaxed text-paper/60 sm:text-[1.04rem]">
          Have a project in mind, or just want to talk through an idea? Tell us what you&rsquo;re
          trying to change&mdash;we&rsquo;ll tell you honestly whether we can help.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="primaryOnDark" size="lg" arrow>
            Start a conversation
          </ButtonLink>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-[3.75rem] items-center justify-center gap-2 rounded-full border-2 border-paper/30 px-7 text-[0.94rem] font-semibold text-paper transition-[transform,background-color,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-paper hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            Chat on WhatsApp
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </div>

        <p className="mt-7 text-[0.72rem] uppercase tracking-[0.13em] text-paper/35">
          No pitch decks. No pressure. Just a useful conversation.
        </p>
      </div>
    </section>
  );
}
