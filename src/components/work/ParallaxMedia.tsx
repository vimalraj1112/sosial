"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  useEffect(() => {
    // Keep the first client render identical to the server render; the
    // reduced-motion check is applied after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const still = mounted && reduced;

  return (
    <div ref={ref} className={cn("relative h-full w-full overflow-hidden", className)}>
      <motion.div
        style={still ? undefined : { y }}
        className="absolute inset-[-8%] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
