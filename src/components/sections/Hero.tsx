"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { RotatingWords } from "@/components/ui/RotatingWords";
import { EASE } from "@/lib/motion";

/** What earns the attention: one phrase per service, cycled in the headline. */
const phrases = [
  "standout content.",
  "performance ads.",
  "brand films.",
  "sharp websites.",
  "personal branding.",
];

export function Hero() {
  const reduced = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: EASE },
  });

  return (
    <section className="relative isolate overflow-hidden border-b border-paper/10 bg-night text-paper">
      <HeroBackdrop />

      <div className="container-x relative flex min-h-[78svh] flex-col items-center justify-center pb-16 pt-20 text-center sm:pt-24 lg:pb-20 lg:pt-28">
        <motion.h1
          {...fade(0.1)}
          className="max-w-6xl font-display text-[clamp(2.3rem,6vw,5rem)] font-bold leading-[1.08] tracking-[-0.04em]"
        >
          <span className="sr-only">
            Attention, earned through standout content, performance ads, brand films, sharp
            websites and personal branding.
          </span>
          <span aria-hidden="true" className="block">
            Attention, earned
          </span>
          <span aria-hidden="true" className="block">
            through <RotatingWords phrases={phrases} className="text-[#9C57FD]" />
          </span>
        </motion.h1>

        <motion.p
          {...fade(0.4)}
          className="mt-7 max-w-xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.1rem]"
        >
          Strategy, content and production under one roof, built to turn attention into enquiries.
        </motion.p>

        <motion.div {...fade(0.55)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="#contact" variant="primary" size="lg" arrow>
            Start a conversation
          </ButtonLink>
          <ButtonLink href="/work" variant="light" size="lg">
            See our work
          </ButtonLink>
        </motion.div>

        <div className="mt-14 hidden items-center gap-3 text-[0.66rem] uppercase tracking-[0.2em] text-paper/35 lg:flex">
          <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.6} />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
