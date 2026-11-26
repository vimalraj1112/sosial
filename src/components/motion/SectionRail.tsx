"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Entry = { title: string; section: Element };
type Box = { x: number; y: number; w: number; h: number; size: number };
type Point = { x: number; y: number };

/** The move starts when the next section's top is at DEPART and ends at ARRIVE (share of viewport). */
const DEPART = 1;
const ARRIVE = 0.24;
/** Passed sections kept above the current title; the oldest fades out as the next arrives. */
const MAX_PAST = 2;
/** Sections listed at the bottom right; the next one fades in as one leaves. */
const MAX_UPCOMING = 3;
/** Size of the letters while they travel up the edge, relative to the large title. */
const EDGE_SCALE = 0.62;
/** Corner radius of the track, in px: letters turn smoothly around the corners. */
const CORNER = 46;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const dist = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);

const PAPER = "#F6F5F9";
const INK = "#14141C";

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

function letterBoxes(container: Element | null): Box[] {
  if (!container) return [];
  return [...container.querySelectorAll<HTMLElement>("[data-letter]")].map((letter) => {
    const rect = letter.getBoundingClientRect();
    return { x: rect.left, y: rect.top, w: rect.width, h: rect.height, size: parseFloat(getComputedStyle(letter).fontSize) };
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
 * Where a letter is after travelling `d` px along its track: from its place in
 * the bottom list, right to the edge, up the edge, then left into its place in
 * the large title. Returns the point, the rotation and how far along it is.
 */
function onTrack(start: Point, edgeX: number, end: Point, d: number) {
  const a = { x: edgeX, y: start.y };
  const b = { x: edgeX, y: end.y };
  const l1 = dist(start, a);
  const l2 = dist(a, b);
  const l3 = dist(b, end);
  const total = l1 + l2 + l3;
  const s = clamp(d, 0, total);

  let point: Point;
  if (s <= l1) point = { x: lerp(start.x, a.x, l1 ? s / l1 : 1), y: start.y };
  else if (s <= l1 + l2) point = { x: edgeX, y: lerp(a.y, b.y, l2 ? (s - l1) / l2 : 1) };
  else point = { x: lerp(b.x, end.x, l3 ? (s - l1 - l2) / l3 : 1), y: end.y };

  // Upright on the bottom and top runs, turned -90deg (reading upwards) on the
  // edge, blending around each corner.
  const turnIn = clamp((s - (l1 - CORNER)) / (2 * CORNER), 0, 1);
  const turnOut = clamp((s - (l1 + l2 - CORNER)) / (2 * CORNER), 0, 1);
  const angle = -90 * (turnIn - turnOut);
  return { point, angle, progress: total ? s / total : 1, total };
}

/**
 * Pinned section titles on the right, scrubbed by scroll, after FilmCraft.
 * Sections still to come are listed at the bottom right; sections already
 * passed are listed small at the top right, above the large current title.
 * As the next section comes up, its letters leave the bottom list last letter
 * first, run up the right edge as a vertical word, and turn into place below
 * the stack as the new large title, while the old one shrinks into the stack.
 * Scrolling back reverses it. Titles come from elements marked `data-rail`.
 */
export function SectionRail() {
  const pathname = usePathname();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState(-1);
  const [enabled, setEnabled] = useState(false);
  const [tones, setTones] = useState({ top: true, bottom: true });

  const nextRef = useRef<HTMLLIElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLParagraphElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const oldestRef = useRef<HTMLParagraphElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const geometry = useRef<{ from: Box[]; to: Box[]; shrink: number; edgeX: number; line: number; listLine: number }>({
    from: [],
    to: [],
    shrink: 1,
    edgeX: 0,
    line: 0,
    listLine: 0,
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

  // Measure each letter of the next title in the bottom list and in its final
  // place (the ghost copy shows the layout after the move).
  useLayoutEffect(() => {
    if (!enabled) return;
    const measure = () => {
      // Measure the list without its scroll-driven shift; the shift is added per frame.
      const list = listRef.current;
      const saved = list?.style.transform ?? "";
      if (list) list.style.transform = "none";
      const items = list ? [...list.children] as HTMLElement[] : [];
      const listLine = items.length > 1 ? items[1].offsetTop - items[0].offsetTop : 0;
      const listRight = nextRef.current?.getBoundingClientRect().right ?? window.innerWidth - 48;
      const big = currentRef.current ? parseFloat(getComputedStyle(currentRef.current).fontSize) : 1;
      const small = ghostRef.current?.querySelector<HTMLElement>("[data-small]");
      const smallSize = small ? parseFloat(getComputedStyle(small).fontSize) : big;
      geometry.current = {
        from: letterBoxes(nextRef.current),
        to: letterBoxes(ghostRef.current?.querySelector("[data-big]") ?? null),
        shrink: smallSize / big,
        line: small ? small.getBoundingClientRect().height : 0,
        edgeX: Math.min(listRight + 30, window.innerWidth - 22),
        listLine,
      };
      if (list) list.style.transform = saved;
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
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const arrived = entries.reduce(
        (count, entry) => (entry.section.getBoundingClientRect().top <= vh * ARRIVE ? count + 1 : count),
        0,
      );
      const nowActive = arrived - 1;
      setActive((value) => (value === nowActive ? value : nowActive));

      const incoming = entries[nowActive + 1];
      const top = incoming ? incoming.section.getBoundingClientRect().top : Infinity;
      // Start the move at DEPART, or right at the top of the page for a section
      // that already starts inside the first screen (like The Studio), so no
      // letters are caught half-way out of the list before you scroll.
      const departAt = Math.min(vh * DEPART, top + window.scrollY);
      const span = departAt - vh * ARRIVE;
      const t = span > 0 ? clamp((departAt - top) / span, 0, 1) : top <= vh * ARRIVE ? 1 : 0;
      const moving = t > 0 && t < 1;

      const { from, to, shrink, edgeX, line, listLine } = geometry.current;
      // With more sections to come than are listed, the list rests one line low
      // (the extra line hidden below) and slides up as the next title leaves.
      const hasExtra = entries.length - (nowActive + 1) > MAX_UPCOMING;
      const listShift = hasExtra ? listLine * (1 - t) : 0;
      if (listRef.current) listRef.current.style.transform = listShift ? `translateY(${listShift.toFixed(1)}px)` : "";
      const k = clamp(t * 1.4, 0, 1);
      // Hidden on the opening screen; fades in as the first title starts to move.
      // ...and fades out again once the last section has scrolled away, so it
      // never sits over the closing call to action or the footer.
      const lastBottom = entries[entries.length - 1].section.getBoundingClientRect().bottom;
      const fadeOut = clamp((lastBottom - vh * 0.15) / (vh * 0.25), 0, 1);
      if (railRef.current) railRef.current.style.opacity = ((nowActive >= 0 ? 1 : t) * fadeOut).toFixed(3);
      // A full stack slides up one line while its oldest title fades away.
      const full = nowActive - MAX_PAST >= 0;
      if (stackRef.current) stackRef.current.style.transform = full ? `translateY(${(-line * k).toFixed(1)}px)` : "";
      if (oldestRef.current) oldestRef.current.style.opacity = full ? String(0.45 * (1 - k)) : "";
      const fly = flyRef.current;
      if (fly) {
        const letters = [...fly.children] as HTMLElement[];
        const count = letters.length;
        // Gap behind each letter along the track: the widths of the letters
        // after it (the last letter leads), at travelling size.
        const lags: number[] = new Array(count).fill(0);
        for (let i = count - 2; i >= 0; i -= 1) lags[i] = lags[i + 1] + (to[i + 1]?.w ?? 0) * EDGE_SCALE;
        const tracks = letters.map((_, i) => {
          const start = from[i];
          const end = to[i];
          if (!start || !end) return null;
          const s = { x: start.x + start.w / 2, y: start.y + start.h / 2 + listShift };
          const e = { x: end.x + end.w / 2, y: end.y + end.h / 2 };
          return { s, e, total: onTrack(s, edgeX, e, 0).total };
        });
        const longest = tracks.reduce((max, track, i) => (track ? Math.max(max, track.total + lags[i]) : max), 0);
        const head = t * longest;

        letters.forEach((letter, i) => {
          const track = tracks[i];
          const start = from[i];
          const end = to[i];
          if (!track || !start || !end) return;
          const { point, angle, progress } = onTrack(track.s, edgeX, track.e, head - lags[i]);
          // Small in the list, medium on the edge, large at the top.
          const startScale = start.size / end.size;
          const scale =
            progress < 0.5 ? lerp(startScale, EDGE_SCALE, progress / 0.5) : lerp(EDGE_SCALE, 1, (progress - 0.5) / 0.5);
          const x = point.x - end.w / 2;
          const y = point.y - end.h / 2;
          letter.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${angle.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
          letter.style.opacity = moving ? "1" : "0";
          if (moving) letter.style.color = darkAt(point.x, point.y) ? PAPER : INK;
        });
      }

      // The list item hides while its letters are on the move.
      // Only the line whose letters are on the move is hidden; every other line is
      // reset, so nothing stays hidden after scrolling back up.
      railRef.current?.querySelectorAll<HTMLElement>("ul li").forEach((li) => {
        li.style.opacity = moving && li === nextRef.current ? "0" : "";
      });
      // The extra line fades in from below as the list slides up.
      const extra = hasExtra ? (listRef.current?.lastElementChild as HTMLElement | null) : null;
      if (extra) extra.style.opacity = t.toFixed(3);
      // The current title shrinks in place (top edge fixed) into the stack.
      if (currentRef.current) {
        // The 4px gap above the large title (mt-1) closes as it becomes a small line.
        currentRef.current.style.transform = `translateY(${(-4 * k).toFixed(1)}px) scale(${(1 - (1 - shrink) * k).toFixed(3)})`;
        currentRef.current.style.opacity = String(1 - 0.55 * k);
      }

      // Every line takes the colour that reads on the background right behind it,
      // so nothing disappears where a list crosses from a dark section to a light one.
      const paint = (el: HTMLElement, alpha: number) => {
        const r = el.getBoundingClientRect();
        if (!r.width) return;
        const dark = darkAt(r.right - Math.min(r.width / 2, 40), r.top + r.height / 2);
        el.style.color = dark ? `rgba(246, 245, 249, ${alpha})` : `rgba(20, 20, 28, ${alpha})`;
      };
      railRef.current?.querySelectorAll<HTMLElement>("ul li").forEach((li) => paint(li, 0.5));
      stackRef.current?.querySelectorAll<HTMLElement>("p").forEach((p) => paint(p, 1));

      const nextTones = { top: darkAt(vw - 80, 110), bottom: darkAt(vw - 80, vh - 70) };
      setTones((value) => (value.top === nextTones.top && value.bottom === nextTones.bottom ? value : nextTones));
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
  // Like FilmCraft, nothing is dropped: every passed section stays listed above
  // the current title and every section still to come stays listed below.
  const past = entries.slice(Math.max(0, active - MAX_PAST), Math.max(0, active));
  const upcoming = entries.slice(active + 1, active + 2 + MAX_UPCOMING);
  const ghostPast = entries.slice(Math.max(0, active + 1 - MAX_PAST), Math.max(0, active + 1));
  const edge = "right-[max(3rem,calc((100vw-1360px)/2+3rem))]";
  const smallLine = "text-[0.95rem] leading-[1.15]";
  const bigLine = "text-[2.1rem] leading-none";

  return (
    <div
      ref={railRef}
      data-section-rail
      aria-hidden="true"
      style={{ fontFamily: "var(--font-archivo), var(--font-display)", fontStretch: "118%", fontWeight: 620, opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-30 uppercase tracking-[-0.03em]"
    >
      {/* Top right: passed sections (small) above the current one (large). */}
      <div
        ref={stackRef}
        className={cn(
          "absolute top-[5rem] flex flex-col items-end text-right transition-colors duration-500",
          edge,
          tones.top ? "text-paper" : "text-ink",
        )}
      >
        {past.map((entry, index) => (
          <p
            key={entry.title}
            ref={index === 0 && past.length === MAX_PAST ? oldestRef : undefined}
            className={cn(smallLine, "opacity-45")}
          >
            {entry.title.toUpperCase()}
          </p>
        ))}
        <p ref={currentRef} className={cn(bigLine, "mt-1 origin-top-right will-change-transform")}>
          {current ? current.title.toUpperCase() : " "}
        </p>
      </div>

      {/* Invisible copy of the layout after the move, for measuring the landing spots. */}
      <div ref={ghostRef} className={cn("invisible absolute top-[5rem] flex flex-col items-end text-right", edge)}>
        {ghostPast.map((entry) => (
          <p key={entry.title} data-small className={smallLine}>
            {entry.title.toUpperCase()}
          </p>
        ))}
        <p data-big className={cn(bigLine, "mt-1")}>
          {next ? <Letters text={next.title} /> : " "}
        </p>
      </div>

      {/* Bottom right: the sections still to come. */}
      <ul
        ref={listRef}
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

      {/* Letters on the move, positioned every frame from the scroll. */}
      <div ref={flyRef} className="absolute left-0 top-0">
        {next
          ? [...next.title.toUpperCase()].map((letter, index) => (
              <span
                key={`${next.title}-${index}`}
                className={cn("absolute left-0 top-0 origin-center whitespace-pre opacity-0 will-change-transform", bigLine)}
              >
                {letter}
              </span>
            ))
          : null}
      </div>
    </div>
  );
}
