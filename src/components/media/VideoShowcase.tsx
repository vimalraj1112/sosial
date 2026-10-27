"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Visual } from "@/components/ui/Visual";
import { cn } from "@/lib/utils";

type Props = {
  poster: string;
  src: string;
  alt: string;
  label?: string;
  className?: string;
};

/**
 * Video showcase with an accessible lightbox. If the video file is missing the
 * dialog explains it rather than pretending to play something.
 */
export function VideoShowcase({ poster, src, alt, label = "Play showreel", className }: Props) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <div className={cn("group relative overflow-hidden bg-night", className)}>
        <Visual
          src={poster}
          alt={alt}
          className="h-full w-full"
          imgClassName="transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-paper"
          aria-label={label}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-paper/50 bg-night/40 shadow-[3px_3px_0_0_rgba(246,245,249,0.35)] backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-ink group-hover:bg-coral group-hover:text-white group-hover:shadow-none">
            <Play aria-hidden="true" className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={0} />
          </span>
          <span className="eyebrow text-paper/70">{label}</span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-night/95 p-4 backdrop-blur-sm sm:p-8"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="SOSIAL showreel"
            onClick={() => setOpen(false)}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close showreel"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-paper/30 text-paper transition-colors hover:border-coral hover:bg-coral hover:text-white sm:right-8 sm:top-8"
            >
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
            </button>

            <div
              className="w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              {failed ? (
                <div className="border border-paper/20 bg-night-soft p-8 text-center text-paper">
                  <p className="font-display text-2xl font-semibold tracking-[-0.02em]">Showreel coming soon</p>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-paper/60">
                    The final film has not been supplied yet. This preview ships with the player and
                    poster frame ready, so replacing the file is all that is needed.
                  </p>
                </div>
              ) : (
                <video
                  className="max-h-[78vh] w-full bg-night"
                  controls
                  autoPlay
                  playsInline
                  poster={poster}
                  onError={() => setFailed(true)}
                >
                  <source src={src} type="video/mp4" />
                </video>
              )}
              <p className="mt-4 text-center text-[0.7rem] uppercase tracking-[0.16em] text-paper/40">
                Placeholder footage · final brand film pending
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
