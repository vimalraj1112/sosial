"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ParallaxMediaProps = {
  children: ReactNode;
  className?: string;
  /** Maximum vertical travel, as a percentage of the media height. */
  strength?: number;
};

/**
 * A deliberately slow, scroll-linked drift behind a fixed media frame.
 *
 * The image is oversized inside an overflow-hidden frame, so the movement
 * never exposes an edge. Reduced-motion users get the static framing only.
 */
export function ParallaxMedia({ children, className, strength = 5 }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative h-full w-full overflow-hidden", className)}>
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-[-8%] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
