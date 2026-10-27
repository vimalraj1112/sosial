"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  webm?: string;
  poster: string;
  fallback: string;
  className?: string;
};

/**
 * Video-ready hero background with layered, honest fallbacks:
 * vector artwork -> poster frame -> video (only when allowed and available).
 */
export function VideoBackground({ src, webm, poster, fallback, className }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;

    if (
      reduced ||
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g"
    ) {
      return;
    }

    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const timeout = window.setTimeout(() => {
      if (!ready) setFailed(true);
    }, 7000);
    return () => window.clearTimeout(timeout);
  }, [enabled, ready]);

  return (
    <div ref={wrapRef} className={cn("absolute inset-0 overflow-hidden bg-night", className)}>
      {/* Always-present vector fallback */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallback}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Poster frame improves perceived loading */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        loading="eager"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          ready ? "opacity-0" : "opacity-100",
        )}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      {enabled && !failed ? (
        <video
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
          {webm ? <source src={webm} type="video/webm" /> : null}
        </video>
      ) : null}
    </div>
  );
}
