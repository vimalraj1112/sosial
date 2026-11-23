"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { RotatingWords } from "@/components/ui/RotatingWords";
import { EASE } from "@/lib/motion";

/** One service per phrase, cycled in the headline. */
const phrases = [
  "Digital Marketing.",
  "Strategy.",
  "Social Media Marketing.",
  "Branding.",
  "Personal Branding.",
  "Website Design.",
  "Website Development.",
  "Meta Ads.",
  "Google Ads.",
  "Content Creation.",
  "Creative Design.",
  "Video Production.",
  "Video Editing.",
  "Podcast Production.",
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

      <div className="container-x relative flex min-h-[72svh] flex-col items-start justify-start pb-16 pt-12 text-left sm:pt-14 lg:pb-20 lg:pt-16">
        <motion.h1
          {...fade(0.1)}
          className="max-w-6xl font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.08] tracking-[-0.04em]"
        >
          <span className="sr-only">
            Your brand deserves more than just digital marketing, social media, branding, websites,
            ads, content, video production and podcasts.
          </span>
          <span aria-hidden="true" className="block">
            Your brand deserves
          </span>
          <span aria-hidden="true" className="block">
            more than just
          </span>
          <span aria-hidden="true" className="block">
            <RotatingWords phrases={phrases} className="text-[#9C57FD]" />
          </span>
        </motion.h1>

        <motion.p
          {...fade(0.4)}
          className="mt-7 max-w-xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.1rem]"
        >
          Good ideas need the right strategy and execution. We bring marketing and production
          together under one roof to help bring those ideas to life.
        </motion.p>

        <motion.div {...fade(0.55)} className="mt-9 flex flex-wrap items-center justify-start gap-3">
          <ButtonLink href="#contact" variant="primary" size="lg" arrow>
            Start a conversation
          </ButtonLink>
          <ButtonLink href="/services" variant="light" size="lg">
            Explore our services
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
