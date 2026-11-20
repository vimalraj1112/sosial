"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { isIntroComplete, subscribeIntroComplete } from "@/lib/intro-state";
import { cn } from "@/lib/utils";

const TYPE_MS = 60;
const DELETE_MS = 30;
const HOLD_MS = 1900;
const GAP_MS = 380;

/**
 * Types a phrase, holds it, deletes it and moves to the next, forever. The
 * widest phrase is kept invisibly underneath so the headline never reflows.
 * Decorative only: the parent heading carries the full text for screen
 * readers. Reduced-motion visitors see the first phrase, still.
 */
export function RotatingWords({ phrases, className }: { phrases: string[]; className?: string }) {
  const reduced = useReducedMotion();
  const subscribe = useCallback((listener: () => void) => subscribeIntroComplete(listener), []);
  // Wait for the splash to lift so the first glyphs paint on a clear page.
  const ready = useSyncExternalStore(subscribe, isIntroComplete, () => false);
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!ready || reduced) return;
    const phrase = phrases[index];
    let delay: number;
    let step: () => void;

    if (!deleting && chars < phrase.length) {
      delay = chars === 0 ? GAP_MS : TYPE_MS;
      step = () => setChars((c) => c + 1);
    } else if (!deleting) {
      delay = HOLD_MS;
      step = () => setDeleting(true);
    } else if (chars > 0) {
      delay = DELETE_MS;
      step = () => setChars((c) => c - 1);
    } else {
      delay = 0;
      step = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      };
    }

    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [ready, reduced, phrases, index, chars, deleting]);

  const text = reduced ? phrases[0] : phrases[index].slice(0, chars);
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span aria-hidden="true" className="inline-grid max-w-full whitespace-nowrap text-left align-top">
      <span className="invisible [grid-area:1/1]">{longest}</span>
      <span className={cn("[grid-area:1/1]", className)}>
        {text}
        {reduced ? null : (
          <span className="caret-blink ml-[0.06em] inline-block h-[0.8em] w-[0.05em] translate-y-[0.06em] bg-current align-baseline" />
        )}
      </span>
    </span>
  );
}
