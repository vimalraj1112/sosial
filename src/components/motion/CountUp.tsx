"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a configured figure up each time it scrolls into view from below.
 *
 * The real value is server-rendered, so it is correct without JavaScript, for
 * screen readers (the animated digits are aria-hidden) and with reduced
 * motion. Formatting is preserved: leading zeros ("08"), decimals ("4.9")
 * and any prefix or suffix ("120+", "3x", "£2m").
 */
export function CountUp({
  value,
  duration = 1.4,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number.parseFloat(digits);
    const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
    const width = digits.split(".")[0].length;
    const format = (n: number) => {
      const [whole, frac] = n.toFixed(decimals).split(".");
      return `${prefix}${whole.padStart(width, "0")}${frac ? `.${frac}` : ""}${suffix}`;
    };

    // Already on screen at mount: show the real value; it replays on later
    // downward passes like everything else.
    let armed = el.getBoundingClientRect().top >= window.innerHeight;
    if (armed) el.textContent = format(0);

    let frame = 0;
    const play = () => {
      cancelAnimationFrame(frame);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = format(target * eased);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const enter = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || !armed) return;
        armed = false;
        play();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    // Re-arm once the figure has dropped fully below the viewport.
    const leave = new IntersectionObserver(([entry]) => {
      if (!entry || entry.isIntersecting || armed) return;
      if (entry.boundingClientRect.top < (entry.rootBounds?.bottom ?? window.innerHeight)) return;
      cancelAnimationFrame(frame);
      armed = true;
      el.textContent = format(0);
    });
    enter.observe(el);
    leave.observe(el);

    return () => {
      enter.disconnect();
      leave.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {value}
      </span>
    </span>
  );
}
