"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { intro } from "@/data/brand";
import { cn } from "@/lib/utils";

type Phase = "idle" | "playing" | "done";

/**
 * The splash runs once per full document load. A client-side route change does
 * not replay it, but an ordinary browser refresh always does.
 */
let hasStartedThisDocument = false;

function lockScroll(lock: boolean) {
  const root = document.documentElement;
  const target = document.getElementById("site-content");
  root.style.overflow = lock ? "hidden" : "";
  if (target) {
    (target as HTMLElement & { inert: boolean }).inert = lock;
  }
  window.dispatchEvent(new CustomEvent("sosial:scroll-lock", { detail: { locked: lock } }));
}

/**
 * SOSIAL splash intro.
 *
 * - Mounts client-side only, so server-rendered HTML is never blocked.
 * - Skips on click, Escape, Enter or Space.
 * - Always exits on its own (hard fallback), even if an animation fails.
 * - Replays on every full page refresh; the footer can also replay it.
 */
export function SplashIntro() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("done");
  const [step, setStep] = useState(0);
  const skipRef = useRef<HTMLButtonElement | null>(null);
  const startedRef = useRef(false);
  const wasPlaying = useRef(false);

  // Reduced-motion visitors see the final composition immediately, with no
  // staggered reveal, then the overlay exits quickly.
  const shownStep = reduced ? 3 : step;

  const finish = useCallback(() => {
    setPhase("done");
  }, []);

  const start = useCallback(() => {
    setStep(0);
    setPhase("playing");
  }, []);

  /**
   * Timeline lives in an effect (not a mount callback) so Strict Mode's
   * double-invocation can safely clear and rebuild the timers.
   */
  useEffect(() => {
    if (phase !== "playing") return;

    if (reduced) {
      // shownStep already renders the final composition for this visitor.
      const id = window.setTimeout(finish, 450);
      return () => window.clearTimeout(id);
    }

    const ids = [
      window.setTimeout(() => setStep(1), intro.timeline.symbol),
      window.setTimeout(() => setStep(2), intro.timeline.wordmark),
      window.setTimeout(() => setStep(3), intro.timeline.tagline),
      window.setTimeout(finish, intro.timeline.exit),
      // Hard safety net: never trap a visitor on the intro.
      window.setTimeout(finish, intro.fallbackExit),
    ];
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [phase, reduced, finish]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (!intro.enabled || hasStartedThisDocument) {
      return;
    }
    hasStartedThisDocument = true;

    try {
      const params = new URLSearchParams(window.location.search);
      // `?intro=0` is an explicit test/preview bypass. Ordinary refreshes and
      // first visits still play the intro.
      if (params.get("intro") === "0") {
        window.history.replaceState(null, "", window.location.pathname);
        return;
      }
      if (params.get("intro") === "1") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch {
      // The intro still works if history is unavailable.
    }

    // The intro is a mount-only spectacle; starting it from the effect keeps
    // SSR markup empty and lets Strict Mode re-run safely.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    start();
    // Intentionally run once: client-side route changes should not replay it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, finish]);

  useEffect(() => {
    if (phase === "playing") {
      wasPlaying.current = true;
      lockScroll(true);
      return;
    }
    if (phase === "done" && wasPlaying.current) {
      lockScroll(false);
      const main = document.getElementById("main-content");
      const active = document.activeElement;
      if (main && (!active || active === document.body || active.closest("[data-splash]"))) {
        main.focus({ preventScroll: true });
      }
    }
  }, [phase]);

  useEffect(() => () => lockScroll(false), []);

  useEffect(() => {
    const replay = () => {
      lockScroll(true);
      start();
      window.setTimeout(() => skipRef.current?.focus({ preventScroll: true }), 60);
    };
    window.addEventListener("sosial:replay-intro", replay);
    return () => window.removeEventListener("sosial:replay-intro", replay);
  }, [start]);

  useEffect(() => {
    if (phase === "playing" && !reduced) {
      const id = window.setTimeout(() => skipRef.current?.focus({ preventScroll: true }), 80);
      return () => window.clearTimeout(id);
    }
  }, [phase, reduced]);

  const visible = phase !== "idle" && phase !== "done";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="splash"
          data-splash="true"
          role="dialog"
          aria-modal="true"
          aria-label="SOSIAL introduction"
          className="grain fixed inset-0 z-[90] flex flex-col overflow-hidden bg-night text-paper"
          initial={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
          transition={{ duration: reduced ? 0.35 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => finish()}
        >
          {/* Ambient field */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid-light opacity-70" />
            <motion.div
              className="absolute -left-[10%] top-[55%] h-[46rem] w-[46rem] rounded-full bg-coral opacity-[0.11] blur-[120px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.11 }}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute -right-[15%] top-[-15%] h-[42rem] w-[42rem] rounded-full bg-violet opacity-[0.08] blur-[130px]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.08 }}
              transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.svg
              className="absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2"
              viewBox="0 0 100 100"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgb(246 245 249 / 0.14)" strokeWidth="0.12" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(246 245 249 / 0.09)" strokeWidth="0.1" />
              <circle cx="50" cy="50" r="24" fill="none" stroke="rgb(130 33 252 / 0.35)" strokeWidth="0.16" strokeDasharray="0.6 2.2" />
            </motion.svg>
          </div>

          <div className="relative z-10 flex items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
            <motion.p
              className="eyebrow text-paper/45"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {intro.kicker}
            </motion.p>
            <motion.p
              className="hidden font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/35 sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Bengaluru
            </motion.p>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
            <div className="relative flex h-32 w-full items-center justify-center sm:h-40">
              <motion.div
                className="absolute"
                initial={reduced ? false : { opacity: 0, scale: 0.86, y: 8 }}
                animate={
                  shownStep === 1
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.9, y: -6 }
                }
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              >
                <Image
                  src="/assets/brand/sosial-mark-light.png"
                  alt=""
                  width={512}
                  height={501}
                  priority
                  sizes="96px"
                  className="h-20 w-auto sm:h-24"
                />
              </motion.div>

              <motion.div
                className="absolute"
                initial={reduced ? false : { opacity: 0, y: 22 }}
                animate={
                  shownStep >= 2
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 22 }
                }
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="/assets/brand/sosial-logo-reversed.png"
                  alt="SOSIAL"
                  width={1200}
                  height={399}
                  priority
                  sizes="(min-width: 768px) 416px, 272px"
                  className="h-auto w-[17rem] sm:w-[22rem] md:w-[26rem]"
                />
              </motion.div>
            </div>

            <motion.p
              className="mt-6 max-w-md font-serif text-xl italic text-paper/70 sm:mt-8 sm:text-2xl"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={shownStep >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {intro.tagline}
            </motion.p>
          </div>

          <div className="relative z-10 flex items-center justify-between px-5 pb-6 sm:px-8 sm:pb-8">
            <motion.p
              className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: shownStep >= 3 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              Digital / Creative / Production
            </motion.p>
            <motion.button
              ref={skipRef}
              type="button"
              data-skip-intro="true"
              onClick={(event) => {
                event.stopPropagation();
                finish();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border-2 border-paper/40 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-paper/80 transition-colors hover:border-paper hover:bg-paper hover:text-ink",
              )}
            >
              Skip intro
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Footer control that replays the intro without a full reload. */
export function ReplayIntroLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn("text-left transition-colors hover:text-coral-soft", className)}
      onClick={() => {
        window.dispatchEvent(new Event("sosial:replay-intro"));
      }}
    >
      Replay intro
    </button>
  );
}
