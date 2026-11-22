"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Entry = { title: string; section: Element };
type Box = { x: number; y: number; size: number };

/** A section counts as "arrived" once its top passes this share of the viewport. */
const ARRIVE = 0.4;
/** The next title starts lifting off when its section's top reaches this share. */
const DEPART = 0.95;
/** Each letter leaves a little after the one before it. */
const STAGGER = 0.07;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/** Is the first opaque background under a screen point dark? */
function darkAt(x: number, y: number): boolean {
  for (const element of document.elementsFromPoint(x, y)) {
    if (element.closest("[data-section-rail]")) continue;
    const match = getComputedStyle(element).backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (!match) continue;
    const [r, g, b, a = "1"] = match[1].split(",").map((part) => part.trim());
    if (Number(a) < 0.5) continue;
    return (0.299 * Number(r) + 0.587 * Number(g) + 0.114 * Number(b)) / 255 < 0.45;
  }
  return false;
}

function cubic(p0: number, p1: number, p2: number, p3: number, t: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function letterBoxes(container: Element | null): Box[] {
  if (!container) return [];
  return [...container.querySelectorAll<HTMLElement>("[data-letter]")].map((letter) => {
    const rect = letter.getBoundingClientRect();
    return { x: rect.left, y: rect.top, size: parseFloat(getComputedStyle(letter).fontSize) };
  });
}

function Letters({ text }: { text: string }) {
  return (
    <>
      {[...text.toUpperCase()].map((letter, index) => (
        <span key={index} data-letter className="inline-block whitespace-pre">
          {letter}
        </span>
      ))}
    </>
  );
}

/**
 * Pinned section titles on the right, scrubbed by scroll. The current section
 * sits large at the top right with the previous one small above it, and the
 * sections still to come are stacked at the bottom right. As the next section
 * comes up, its letters lift off the bottom stack one by one, travel up the
 * right edge turning sideways, and settle as the new large title; the old one
 * shrinks into the small line. Scrolling back reverses it. Titles come from any
 * element marked `data-rail` (every SectionLabel sets it), so each page works.
 */
export function SectionRail() {
  const pathname = usePathname();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState(-1);
  const [enabled, setEnabled] = useState(false);
  const [tones, setTones] = useState({ top: true, bottom: true });

  const nextRef = useRef<HTMLLIElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLParagraphElement>(null);
  const previousRef = useRef<HTMLParagraphElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const geometry = useRef<{ from: Box[]; to: Box[]; shrink: { dy: number; scale: number } }>({
    from: [],
    to: [],
    shrink: { dy: 0, scale: 1 },
  });

  // Desktop with motion allowed only: the rail needs the empty right edge.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Collect this page's sections once it has rendered.
  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const seen = new Set<Element>();
        const found: Entry[] = [];
        document.querySelectorAll<HTMLElement>("main [data-rail]").forEach((label) => {
          const section = label.closest("section");
          const title = label.dataset.rail?.trim();
          if (!section || !title || seen.has(section)) return;
          seen.add(section);
          found.push({ title, section });
        });
        setEntries(found);
        setActive(-1);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const next = entries[active + 1];

  // Measure where each letter of the next title starts (bottom stack) and ends
  // (large slot), and how far the current title must move to become "previous".
  useLayoutEffect(() => {
    if (!enabled) return;
    const measure = () => {
      const current = currentRef.current?.getBoundingClientRect();
      const previous = previousRef.current?.getBoundingClientRect();
      const currentSize = currentRef.current ? parseFloat(getComputedStyle(currentRef.current).fontSize) : 1;
      const previousSize = previousRef.current ? parseFloat(getComputedStyle(previousRef.current).fontSize) : 1;
      geometry.current = {
        from: letterBoxes(nextRef.current),
        to: letterBoxes(ghostRef.current),
        shrink: {
          dy: current && previous ? previous.bottom - current.bottom : 0,
          scale: previousSize / currentSize,
        },
      };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [enabled, active, next?.title]);

  // Scrub everything from the scroll position.
  useEffect(() => {
    if (!enabled || !entries.length) return;
    let frame = 0;

    const render = () => {
      frame = 0;
      const vh = window.innerHeight;
      const arrived = entries.reduce(
        (count, entry) => (entry.section.getBoundingClientRect().top <= vh * ARRIVE ? count + 1 : count),
        0,
      );
      const nowActive = arrived - 1;
      setActive((value) => (value === nowActive ? value : nowActive));

      const incoming = entries[nowActive + 1];
      const t = incoming
        ? clamp01((vh * DEPART - incoming.section.getBoundingClientRect().top) / (vh * (DEPART - ARRIVE)))
        : 0;

      const { from, to, shrink } = geometry.current;
      const fly = flyRef.current;
      if (fly) {
        const letters = [...fly.children] as HTMLElement[];
        const edgeX = window.innerWidth - 34;
        const span = 1 + STAGGER * Math.max(letters.length - 1, 0);
        letters.forEach((letter, index) => {
          const start = from[index];
          const end = to[index];
          if (!start || !end) return;
          const local = ease(clamp01(t * span - index * STAGGER));
          // Up the right edge: leave the stack, hug the edge, swing into place.
          const x = cubic(start.x, edgeX, edgeX, end.x, local);
          const y = cubic(start.y, start.y - (start.y - end.y) * 0.25, end.y + (start.y - end.y) * 0.3, end.y, local);
          const scale = (start.size + (end.size - start.size) * local) / end.size;
          const turn = -90 * Math.sin(Math.PI * local);
          letter.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${turn.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
          letter.style.opacity = local > 0 && local < 1 ? "1" : "0";
        });
      }

      // The bottom item hides while its letters are in flight.
      if (nextRef.current) nextRef.current.style.opacity = t > 0 && t < 1 ? "0" : "";
      // The current title shrinks into the "previous" slot; the old previous fades.
      if (currentRef.current) {
        currentRef.current.style.transform = `translateY(${(shrink.dy * ease(t)).toFixed(1)}px) scale(${(1 - (1 - shrink.scale) * ease(t)).toFixed(3)})`;
      }
      if (previousRef.current) previousRef.current.style.opacity = String(0.45 * (1 - ease(t)));

      const top = darkAt(window.innerWidth - 80, 120);
      const bottom = darkAt(window.innerWidth - 80, vh - 70);
      setTones((value) => (value.top === top && value.bottom === bottom ? value : { top, bottom }));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [enabled, entries]);

  // Re-run one frame after the active section changes so the new geometry applies.
  useEffect(() => {
    if (!enabled) return;
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
    return () => cancelAnimationFrame(id);
  }, [enabled, active]);

  if (!enabled || !entries.length) return null;

  const current = entries[active];
  const previous = entries[active - 1];
  const upcoming = entries.slice(active + 1, active + 5);
  const edge = "right-[max(3rem,calc((100vw-1360px)/2+3rem))]";

  return (
    <div
      data-section-rail
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 font-display font-extrabold uppercase tracking-[-0.01em]"
    >
      {/* Top right: previous (small) above current (large). */}
      <div
        className={cn(
          "absolute top-[5.25rem] flex flex-col items-end text-right transition-colors duration-500",
          edge,
          tones.top ? "text-paper" : "text-ink",
        )}
      >
        <p ref={previousRef} className="text-[0.95rem] leading-none opacity-45">
          {previous ? previous.title.toUpperCase() : " "}
        </p>
        <p ref={currentRef} className="mt-2 origin-bottom-right text-[2.1rem] leading-none will-change-transform">
          {current ? current.title.toUpperCase() : " "}
        </p>
      </div>

      {/* Invisible copy of the incoming title in the large slot, for measuring. */}
      <div
        ref={ghostRef}
        className={cn("invisible absolute top-[5.25rem] flex flex-col items-end text-right", edge)}
      >
        <p className="text-[0.95rem] leading-none">{" "}</p>
        <p className="mt-2 text-[2.1rem] leading-none">{next ? <Letters text={next.title} /> : " "}</p>
      </div>

      {/* Bottom right: the sections still to come. */}
      <ul
        className={cn(
          "absolute bottom-7 flex flex-col items-end gap-0.5 text-right text-[1.05rem] leading-[1.15] transition-colors duration-500",
          edge,
          tones.bottom ? "text-paper/45" : "text-ink/40",
        )}
      >
        {upcoming.map((entry, index) => (
          <li key={entry.title} ref={index === 0 ? nextRef : undefined}>
            <Letters text={entry.title} />
          </li>
        ))}
      </ul>

      {/* Letters in flight, positioned every frame from the scroll. */}
      <div
        ref={flyRef}
        className={cn("absolute left-0 top-0 transition-colors duration-500", tones.top ? "text-paper" : "text-ink")}
      >
        {next
          ? [...next.title.toUpperCase()].map((letter, index) => (
              <span
                key={`${next.title}-${index}`}
                className="absolute left-0 top-0 origin-center whitespace-pre text-[2.1rem] leading-none opacity-0 will-change-transform"
              >
                {letter}
              </span>
            ))
          : null}
      </div>
    </div>
  );
}
