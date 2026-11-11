"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]";
/** Gap between consecutive reveals that enter the viewport together. */
const STAGGER = 0.09;
/** No element waits longer than this for its turn in a cascade. */
const MAX_QUEUE = 0.45;
/** Elements whose tops share a band of this height count as one row. */
const ROW_BAND = 24;

/**
 * One controller for every scroll reveal on the site.
 *
 * Markup carries `data-reveal="<variant>"`; the CSS in globals.css defines the
 * motion. Content is only hidden once this effect has armed the page, so with
 * JavaScript disabled, or before hydration, everything is plainly visible.
 *
 * - A single shared IntersectionObserver; no scroll listeners.
 * - Reveals replay on every downward pass; scrolling up never hides content.
 * - Elements entering together cascade in reading order (top, then left).
 * - Keyboard focus reveals a hidden element immediately.
 * - Reduced-motion visitors never get anything hidden.
 * - New markup from client-side navigation is picked up automatically.
 */
export function RevealController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || !("IntersectionObserver" in window)) return;

    let nextSlot = 0;

    const reveal = (el: HTMLElement, animate: boolean) => {
      if (el.dataset.revealed) return;

      if (!animate) {
        el.dataset.revealed = "static";
        return;
      }

      const now = performance.now() / 1000;
      const queued = Math.min(MAX_QUEUE, Math.max(0, nextSlot - now));
      const minimum = Number.parseFloat(el.dataset.revealDelay ?? "") || 0;
      nextSlot = now + queued + STAGGER;
      el.style.setProperty("--reveal-delay", `${Math.max(queued, minimum).toFixed(3)}s`);
      el.dataset.revealed = "in";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const rowA = Math.round(a.boundingClientRect.top / ROW_BAND);
            const rowB = Math.round(b.boundingClientRect.top / ROW_BAND);
            return rowA - rowB || a.boundingClientRect.left - b.boundingClientRect.left;
          })
          .forEach((entry) => reveal(entry.target as HTMLElement, true));
      },
      // Start just inside the bottom edge so the motion is seen, not missed.
      { rootMargin: "0px 0px -7% 0px", threshold: 0 },
    );

    // Replay on every downward pass: once an element has dropped fully below
    // the viewport (the visitor scrolled back up past it), it is re-armed and
    // plays its entrance again the next time it scrolls into view. Elements
    // leaving through the top stay revealed, so scrolling up never blinks
    // content out while it is being read.
    const rearm = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting || !el.dataset.revealed) continue;
        const below = entry.boundingClientRect.top >= (entry.rootBounds?.bottom ?? window.innerHeight);
        if (!below || el.contains(document.activeElement)) continue;
        delete el.dataset.revealed;
        el.style.removeProperty("--reveal-delay");
      }
    });

    const track = (el: HTMLElement) => {
      observer.observe(el);
      rearm.observe(el);
    };

    const collect = (node: Node): HTMLElement[] => {
      if (!(node instanceof HTMLElement)) return [];
      const found = Array.from(node.querySelectorAll<HTMLElement>(SELECTOR));
      return node.matches(SELECTOR) ? [node, ...found] : found;
    };

    // Anything already on screen (or scrolled past) when the page arms is shown
    // as-is: it was visible before hydration and must not blink out.
    const viewportBottom = window.innerHeight;
    for (const el of collect(document.body)) {
      if (el.dataset.revealed) continue;
      if (el.getBoundingClientRect().top < viewportBottom) reveal(el, false);
      track(el);
    }
    root.classList.add("reveal-armed");

    // Route changes and client-rendered lists insert fresh markup. It is hidden
    // by CSS from the first paint and animates as it enters the viewport.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          for (const el of collect(node)) if (!el.dataset.revealed) track(el);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const onFocus = (event: FocusEvent) => {
      let el = (event.target as Element | null)?.closest<HTMLElement>(SELECTOR) ?? null;
      while (el) {
        reveal(el, false);
        el = el.parentElement?.closest<HTMLElement>(SELECTOR) ?? null;
      }
    };
    document.addEventListener("focusin", onFocus);

    // Switching reduced motion on mid-visit shows everything at once.
    const onReduceChange = () => {
      if (reduce.matches) for (const el of collect(document.body)) reveal(el, false);
    };
    reduce.addEventListener("change", onReduceChange);

    return () => {
      observer.disconnect();
      rearm.disconnect();
      mutations.disconnect();
      document.removeEventListener("focusin", onFocus);
      reduce.removeEventListener("change", onReduceChange);
      root.classList.remove("reveal-armed");
    };
  }, []);

  return null;
}
