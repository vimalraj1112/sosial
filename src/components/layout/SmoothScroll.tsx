"use client";

import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

/**
 * A medium-weight smooth scroll, close to the pace used by editorial studio
 * portfolios. Native scrolling remains available for touch and keyboard users,
 * and reduced-motion visitors get the browser's own scroll entirely.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
      anchors: false,
    });

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);

    const onLock = (event: Event) => {
      const locked = (event as CustomEvent<{ locked?: boolean }>).detail?.locked;
      if (locked) lenis.stop();
      else lenis.start();
    };

    window.addEventListener("sosial:scroll-lock", onLock);
    if (document.documentElement.style.overflow === "hidden") lenis.stop();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("sosial:scroll-lock", onLock);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
