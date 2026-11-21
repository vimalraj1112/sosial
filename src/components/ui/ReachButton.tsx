"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/** How close (px from the button's edge) the pointer must come to wake the arm. */
const REACH = 240;
const STRANDS = 7;
/** Strand colours, light to deep, so the bundle reads on dark and light sections. */
const STRAND_COLOURS = ["#E4D4FF", "#B58CFD", "#9C57FD", "#8221FC", "#B58CFD", "#6A0FD6", "#D2BBFF"];
/** Fingertip of the hand glyph at 30px (9,1 in its 24px grid). */
const TIP = { x: 11.25, y: 1.25 };

const query = "(any-pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * A glossy violet pill that reaches for the visitor's pointer: when the mouse
 * comes near, a bundle of thin cables grows out of the button and follows it,
 * ending in a pointing hand that stands in for the cursor. Touch devices and
 * reduced-motion visitors get the plain button.
 */
export function ReachButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const strandRefs = useRef<(SVGPathElement | null)[]>([]);
  const handRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    const target = { x: -999, y: -999 };
    const tip = { x: -999, y: -999 };
    let active = false;
    let progress = 0;
    let frame = 0;

    const draw = (time: number) => {
      const button = buttonRef.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();

      progress += ((active ? 1 : 0) - progress) * 0.16;
      tip.x += (target.x - tip.x) * 0.3;
      tip.y += (target.y - tip.y) * 0.3;

      // Root the arm on the button's edge, on the side facing the pointer.
      const half = rect.height / 2;
      const anchor = {
        x: clamp(tip.x, rect.left + half, rect.right - half),
        y: clamp(tip.y, rect.top + half * 0.45, rect.bottom - half * 0.45),
      };
      const end = {
        x: anchor.x + (tip.x - anchor.x) * progress,
        y: anchor.y + (tip.y - anchor.y) * progress,
      };
      const dx = end.x - anchor.x;
      const dy = end.y - anchor.y;
      const length = Math.hypot(dx, dy) || 1;
      const perp = { x: -dy / length, y: dx / length };
      const sag = Math.min(length * 0.1, 26);
      const t = time / 1000;

      strandRefs.current.forEach((path, index) => {
        if (!path) return;
        const spread = index - (STRANDS - 1) / 2;
        const start = { x: anchor.x + perp.x * spread * 3.2, y: anchor.y + perp.y * spread * 3.2 };
        const finish = { x: end.x + perp.x * spread * 0.9, y: end.y + perp.y * spread * 0.9 };
        const wobbleA = Math.sin(t * 3.1 + index * 0.9) * 5 + spread * 2.4;
        const wobbleB = Math.cos(t * 2.3 + index * 1.4) * 6 + spread * 1.2;
        const c1 = {
          x: start.x + dx * 0.33 + perp.x * wobbleA,
          y: start.y + dy * 0.33 + perp.y * wobbleA + sag,
        };
        const c2 = {
          x: start.x + dx * 0.7 + perp.x * wobbleB,
          y: start.y + dy * 0.7 + perp.y * wobbleB + sag * 0.6,
        };
        path.setAttribute(
          "d",
          `M${start.x.toFixed(1)} ${start.y.toFixed(1)} C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${finish.x.toFixed(1)} ${finish.y.toFixed(1)}`,
        );
        path.style.opacity = String(Math.min(progress * 1.4, 1));
      });

      const hand = handRef.current;
      if (hand) {
        hand.style.opacity = String(progress);
        hand.style.transform = `translate3d(${(end.x - TIP.x).toFixed(1)}px, ${(end.y - TIP.y).toFixed(1)}px, 0)`;
      }

      // The hand replaces the site cursor while the arm is out.
      root.toggleAttribute("data-reach-active", progress > 0.08);

      if (active || progress > 0.01) {
        frame = requestAnimationFrame(draw);
      } else {
        frame = 0;
        strandRefs.current.forEach((path) => path?.setAttribute("d", ""));
        if (hand) hand.style.opacity = "0";
        root.removeAttribute("data-reach-active");
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const button = buttonRef.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const gapX = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
      const gapY = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
      const gap = Math.hypot(gapX, gapY);
      // Inside the button the normal hover takes over, so the arm retracts. It
      // also stays back over any other control, so it never covers a link.
      const overControl =
        event.target instanceof Element &&
        event.target.closest("a, button, input, select, textarea, label, [role='button']") !== null;
      const next = gap > 0 && gap < REACH && !overControl;
      if (next && !active && progress < 0.02) {
        // Start the tip at the button so the arm grows out rather than jumping.
        tip.x = clamp(event.clientX, rect.left, rect.right);
        tip.y = clamp(event.clientY, rect.top, rect.bottom);
      }
      target.x = event.clientX;
      target.y = event.clientY;
      active = next;
      if (active || progress > 0.01) wake();
    };

    const sleep = () => {
      active = false;
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    document.documentElement.addEventListener("pointerleave", sleep);
    window.addEventListener("blur", sleep);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", wake);
      document.documentElement.removeEventListener("pointerleave", sleep);
      window.removeEventListener("blur", sleep);
      cancelAnimationFrame(frame);
      root.removeAttribute("data-reach-active");
    };
  }, [enabled]);

  return (
    <>
      <Link
        ref={buttonRef}
        href={href}
        className={cn(
          "group relative inline-flex h-[3.75rem] select-none items-center justify-center overflow-hidden rounded-full px-9 text-[1.02rem] font-bold tracking-[-0.01em] text-white",
          "bg-[linear-gradient(180deg,#A46BFF_0%,#8221FC_48%,#5A0BC0_100%)]",
          "shadow-[inset_0_2px_0_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(20,0,60,0.45),0_14px_34px_-10px_rgba(130,33,252,0.85)]",
          "transition-transform duration-200 ease-out hover:scale-[1.04] active:scale-[0.97]",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral",
          className,
        )}
      >
        {/* Gloss highlight across the top half of the pill. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-[3px] h-[45%] rounded-full bg-gradient-to-b from-white/40 to-white/0"
        />
        <span className="relative drop-shadow-[0_1px_1px_rgba(20,0,60,0.45)]">{children}</span>
      </Link>

      {enabled
        ? createPortal(
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[119]">
              <svg className="absolute inset-0 h-full w-full overflow-visible">
                {Array.from({ length: STRANDS }, (_, index) => (
                  <path
                    key={index}
                    ref={(node) => {
                      strandRefs.current[index] = node;
                    }}
                    fill="none"
                    stroke={STRAND_COLOURS[index % STRAND_COLOURS.length]}
                    strokeWidth={index % 3 === 0 ? 2.2 : index % 2 === 0 ? 1.6 : 1.1}
                    strokeLinecap="round"
                    style={{ opacity: 0 }}
                  />
                ))}
              </svg>
              <div
                ref={handRef}
                className="absolute left-0 top-0 opacity-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] will-change-transform"
              >
                <svg viewBox="0 0 24 24" className="h-[30px] w-[30px]">
                  {/* Pointing hand, index finger up: the arm's "cursor". */}
                  <path
                    d="M7.2 2.8a1.8 1.8 0 0 1 3.6 0V9.2a1.6 1.6 0 0 1 3.2 0V10a1.6 1.6 0 0 1 3.2 0v.8a1.6 1.6 0 0 1 3.2 0V15c0 4-2.6 7-6.6 7h-2.4c-2 0-3.2-.8-4.4-2.2L3.4 16a1.6 1.6 0 0 1 2.3-2.2l1.5 1.4Z"
                    fill="#ffffff"
                    stroke="#14141C"
                    strokeWidth={1.3}
                    strokeLinejoin="round"
                  />
                  <path d="M10.8 9.2v3.4M14 10v2.8M17.2 10.8v2.2" stroke="#14141C" strokeWidth={1.1} strokeLinecap="round" />
                </svg>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
