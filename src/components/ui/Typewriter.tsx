"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { isIntroComplete, subscribeIntroComplete } from "@/lib/intro-state";
import { cn } from "@/lib/utils";

export type TypewriterPart = {
  text: string;
  className?: string;
};

/**
 * A headline that types itself out, one character at a time, each time it
 * scrolls into view. The finished text is kept in the DOM (invisible) so the
 * layout never shifts while the characters arrive.
 */
export function Typewriter({
  lines,
  speed = 55,
  startDelay = 300,
  replay = true,
  trigger = "view",
  className,
  caretClassName,
}: {
  /** One entry per line, each line made of styled parts. */
  lines: TypewriterPart[][];
  /** Milliseconds between characters. */
  speed?: number;
  /** Pause before the first character. */
  startDelay?: number;
  /** Type again every time the block scrolls back into view. */
  replay?: boolean;
  /** "mount" types as soon as the page loads; "view" waits for the scroll. */
  trigger?: "mount" | "view";
  className?: string;
  caretClassName?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const hasTyped = useRef(false);
  const begun = useRef(false);
  const [inView, setInView] = useState(trigger === "mount");
  const [revealed, setRevealed] = useState(0);
  // On a first visit the splash covers the page while the hero would type.
  // Hold the characters back until it is gone, so the glyphs are first painted
  // on a clear page rather than behind the overlay.
  const subscribe = useCallback((listener: () => void) => subscribeIntroComplete(listener), []);
  const introDone = useSyncExternalStore(
    subscribe,
    () => trigger !== "mount" || isIntroComplete(),
    () => trigger !== "mount",
  );

  const plainText = useMemo(() => lines.map((line) => line.map((part) => part.text).join("")).join(" "), [lines]);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.reduce((count, part) => count + part.text.length, 0), 0),
    [lines],
  );

  // Character offsets, so each part knows how much of itself to show.
  const partStarts = useMemo(() => {
    const lineLengths = lines.map((line) => line.reduce((count, part) => count + part.text.length, 0));
    return lines.map((line, lineIndex) => {
      const lineStart = lineLengths.slice(0, lineIndex).reduce((sum, length) => sum + length, 0);
      return line.map(
        (_, partIndex) =>
          lineStart + line.slice(0, partIndex).reduce((sum, part) => sum + part.text.length, 0),
      );
    });
  }, [lines]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          return;
        }

        setInView(false);
        if (replay) setRevealed(0);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [replay]);

  useEffect(() => {
    if (!introDone || reduced) return;
    // The hero types as soon as the splash lifts, even if the observer has not
    // reported it visible yet. Once it has begun, the observer decides again
    // (so scrolling away pauses it and scrolling back replays it).
    if (!inView && (trigger === "view" || begun.current)) return;
    if (!replay && hasTyped.current) return;

    begun.current = true;

    let index = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const start = setTimeout(() => {
      timer = setInterval(() => {
        index += 1;
        setRevealed(index);

        if (index >= total) {
          clearInterval(timer);
          hasTyped.current = true;
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [introDone, inView, reduced, replay, total, speed, startDelay, trigger]);

  const shown = reduced ? (introDone ? total : 0) : revealed;
  const complete = shown >= total;

  const renderLines = (limit: number, withCaret: boolean) =>
    lines.map((line, lineIndex) => (
      <span key={lineIndex} className="block pb-[0.04em]">
        {line.map((part, partIndex) => {
          const start = partStarts[lineIndex][partIndex];
          const end = start + part.text.length;
          const visible = part.text.slice(0, Math.max(0, Math.min(limit - start, part.text.length)));
          const isCurrent = limit === 0 ? lineIndex === 0 && partIndex === 0 : limit - 1 >= start && limit - 1 < end;

          return (
            <span key={partIndex} className={part.className}>
              {visible}
              {withCaret && !reduced && isCurrent ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "ml-[0.08em] inline-block h-[0.82em] w-[0.055em] translate-y-[0.04em] bg-current align-baseline",
                    complete ? "opacity-0" : "caret-blink",
                    caretClassName,
                  )}
                />
              ) : null}
            </span>
          );
        })}
      </span>
    ));

  return (
    <span ref={ref} className={cn("grid", className)}>
      {/* Reserves the final layout so typing never shifts the page. */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none opacity-0 [grid-area:1/1]"
      >
        {renderLines(total, false)}
      </span>

      {/* Fresh nodes once the intro lifts, so the first glyphs are painted on
          the unobstructed page. */}
      <span key={introDone ? "ready" : "pending"} aria-hidden="true" className="[grid-area:1/1]">
        {renderLines(shown, true)}
      </span>

      <span className="sr-only [grid-area:1/1]">{plainText}</span>
    </span>
  );
}
