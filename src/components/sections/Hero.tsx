"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { brand, whatsappHref } from "@/data/brand";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const lines = ["Attention is", "earned,", "not bought."];

const indicators = [
  { value: "08", label: "Integrated services" },
  { value: "02", label: "Divisions, one direction" },
  { value: "01", label: "Standard, brief to delivery" },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-paper/10 bg-night text-paper">
      <HeroBackdrop />

      <div className="container-x relative flex flex-col pb-12 pt-14 lg:pb-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-7 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-paper/30 bg-night/30 px-3.5 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.14em] text-paper/80 backdrop-blur-sm">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
                Digital marketing, creative &amp; production
              </span>
              <span className="hidden text-[0.7rem] uppercase tracking-[0.14em] text-paper/40 sm:inline">
                Digital / Creative / Production
              </span>
            </motion.div>

            <h1 className="display display-heavy mt-7 text-[clamp(2.9rem,7.2vw,5.5rem)]">
              {lines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className={cn(
                      "block",
                      index === 1 && "serif-accent pr-2 text-coral-soft",
                    )}
                    initial={{ y: "112%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: reduced ? 0 : 0.95,
                      delay: reduced ? 0 : 0.2 + index * 0.1,
                      ease: EASE,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.55, ease: EASE }}
              className="mt-6 max-w-lg text-[1rem] leading-relaxed text-paper/70 sm:text-[1.08rem]"
            >
              Sosial brings digital marketing, creative content and production together, so your
              message, your visuals and your channels work as one. One direction from strategy to
              delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.68, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="#enquiry" variant="primary" size="lg" arrow>
                Start a conversation
              </ButtonLink>
              <ButtonLink href="/work" variant="light" size="lg">
                See our work
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.85 }}
              className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-paper/15 border-y border-paper/15"
            >
              {indicators.map((item) => (
                <div key={item.label} className="px-4 py-4 first:pl-0 last:pr-0">
                  <p className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{item.value}</p>
                  <p className="mt-1 text-[0.68rem] leading-snug text-paper/50">{item.label}</p>
                </div>
              ))}
            </motion.div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] text-paper/55">
              <span className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-coral-soft" strokeWidth={2} />
                Scope agreed in writing
              </span>
              <span className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-coral-soft" strokeWidth={2} />
                Clear deliverables and timelines
              </span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-paper/60 underline underline-offset-4 transition-colors hover:text-coral-soft"
              >
                Prefer WhatsApp?
                <ArrowUpRight aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
              </a>
            </div>

            <div className="mt-12 hidden items-center gap-3 text-[0.66rem] uppercase tracking-[0.2em] text-paper/35 lg:flex">
              <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.6} />
              Scroll to explore
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-5">
            <motion.div
              id="enquiry"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.85, delay: reduced ? 0 : 0.35, ease: EASE }}
              className="scroll-mt-28 rounded-card border-2 border-ink bg-card p-6 text-ink shadow-[6px_6px_0_0_var(--color-coral)] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">
                    Tell us what you&rsquo;re building.
                  </h2>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/60">
                    A short note is enough. If it looks like a fit, we reply with a clear next step.
                  </p>
                </div>
                <span className="mt-1 hidden shrink-0 items-center gap-1.5 rounded-full border border-ink/20 bg-paper px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-ink/60 sm:inline-flex">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
                  Short conversation
                </span>
              </div>

              <div className="mt-6">
                <EnquiryForm variant="compact" tone="light" />
              </div>

              <p className="mt-4 border-t border-ink/10 pt-4 text-[0.72rem] leading-relaxed text-ink/55">
                Prefer email?{" "}
                <a href={`mailto:${brand.email}`} className="text-ink/70 underline underline-offset-4">
                  {brand.email}
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
