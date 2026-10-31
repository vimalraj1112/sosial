"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { categoryLabels, type Project } from "@/data/work";
import { Visual } from "@/components/ui/Visual";
import { WorkIntro } from "@/components/work/WorkIntro";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const pad = (value: number) => String(value).padStart(2, "0");

type WorkPinnedProps = {
  projects: Project[];
};

/**
 * Wide-desktop selected-work viewer.
 *
 * The outer element is one viewport tall per project; the inner element sticks
 * while the active project changes. This mirrors the reference's
 * scroll-controlled case-study presentation without intercepting the wheel or
 * touch scrolling. Tablet, mobile and reduced-motion visitors get the stacked
 * 16:9 case-study list in WorkShowcase instead.
 */
export function WorkPinned({ projects }: WorkPinnedProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      projects.length - 1,
      Math.max(0, Math.floor(value * projects.length)),
    );

    if (next !== activeIndexRef.current) {
      activeIndexRef.current = next;
      setActiveIndex(next);
    }
  });

  const active = projects[activeIndex] ?? projects[0];

  const goToSlide = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const top = window.scrollY + wrapper.getBoundingClientRect().top;
    const range = Math.max(0, wrapper.offsetHeight - window.innerHeight);
    const target = top + (index / Math.max(projects.length, 1)) * range + 2;

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  if (!active) return null;

  return (
    <div className="hidden min-[1100px]:block">
      <div className="container-x pb-10 pt-24 sm:pt-28 lg:pt-28 min-[1100px]:max-w-none min-[1100px]:pl-[9.5rem] min-[1100px]:pr-[13.25rem]">
        <WorkIntro total={projects.length} plain showCta={false} />
      </div>

      <div
        ref={wrapperRef}
        data-work-pinned
        className="relative"
        style={{ height: `calc(${projects.length} * 100svh)` }}
      >
        <div
          data-work-sticky
          className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-night pt-[4.75rem] lg:pt-[5.25rem]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid-light opacity-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-coral/10 blur-[140px]"
          />

          <div className="container-x relative flex min-h-0 flex-1 flex-col pb-4 pt-2 min-[1100px]:max-w-none min-[1100px]:pb-0 min-[1100px]:pl-[3rem] min-[1100px]:pr-[7.875rem] min-[1100px]:pt-0">
            <WorkIntro total={projects.length} current={activeIndex} bare />

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Project {activeIndex + 1} of {projects.length}: {active.name},{" "}
              {categoryLabels[active.category]}
            </p>

            <div className="mt-3 flex min-h-0 flex-1 gap-3 min-[1100px]:mt-[calc(1.5rem_+_(100vw_-_80rem)_*_0.025)] min-[1100px]:gap-6">
              <div
                role="group"
                className="hidden w-8 shrink-0 flex-col justify-center gap-2.5 min-[1100px]:flex min-[1100px]:w-[80px]"
                aria-label="Project index"
              >
                {projects.map((project, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={project.slug}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to ${project.name}`}
                      aria-current={isActive ? "true" : undefined}
                      className="group/index flex items-center gap-2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-px transition-all duration-300",
                          isActive
                            ? "w-4 bg-coral"
                            : "w-2 bg-paper/20 group-hover/index:w-3 group-hover/index:bg-paper/40",
                        )}
                      />
                      <span
                        className={cn(
                          "font-mono text-[0.62rem] tracking-[0.12em] transition-colors duration-300",
                          isActive
                            ? "text-paper"
                            : "text-paper/30 group-hover/index:text-paper/60",
                        )}
                      >
                        {project.number}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-0 min-w-0 flex-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.slug}
                    data-work-slide={active.slug}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18, transition: { duration: 0.22 } }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="group flex h-full min-h-0 flex-col"
                  >
                    <motion.div
                      initial={{ filter: "blur(14px)" }}
                      animate={{ filter: "blur(0px)" }}
                      exit={{ filter: "blur(14px)", transition: { duration: 0.22 } }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="shrink-0"
                    >
                      <div className="flex items-end justify-between gap-4 pb-2.5">
                        <div className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h3
                            data-work-title
                            className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-paper transition-colors duration-500 group-hover:text-coral-soft"
                          >
                            {active.name}
                          </h3>
                          <p className="font-display text-[clamp(1.15rem,2.4vw,2.4rem)] font-semibold leading-none tracking-[-0.03em] text-paper/35">
                            {categoryLabels[active.category]}
                          </p>
                        </div>

                        <Link
                          href={`/work/${active.slug}`}
                          aria-label={`View ${active.name} project`}
                          className="group/view hidden shrink-0 items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-paper/55 transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral sm:inline-flex"
                        >
                          View project
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 transition-[transform,background-color,border-color,color] duration-300 group-hover/view:-translate-y-0.5 group-hover/view:translate-x-0.5 group-hover/view:border-coral group-hover/view:bg-coral group-hover/view:text-white">
                            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </span>
                        </Link>
                      </div>

                      <ul className="flex flex-wrap gap-1.5 pb-2.5" aria-label="Project tags">
                        {active.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-paper/15 bg-night/45 px-2.5 py-1 text-[0.52rem] font-medium uppercase tracking-[0.1em] text-paper/55"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.35rem] border border-paper/15 bg-night-soft shadow-[0_30px_90px_-45px_rgb(0_0_0/0.9)]">
                      <motion.div
                        initial={{ scale: 1.04, filter: "blur(12px)" }}
                        animate={{ scale: 1, filter: "blur(0px)" }}
                        exit={{
                          scale: 0.97,
                          filter: "blur(12px)",
                          transition: { duration: 0.22 },
                        }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="absolute inset-0 will-change-transform"
                      >
                        <Link
                          href={`/work/${active.slug}`}
                          aria-label={`View ${active.name} — ${categoryLabels[active.category]} concept`}
                          className="group/image relative block h-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-coral"
                        >
                          <Visual
                            src={active.image}
                            alt={active.imageAlt}
                            className="h-full w-full bg-night-soft"
                            imgClassName="transition-[transform,filter] duration-[1200ms] ease-[var(--ease-brand)] group-hover/image:scale-[1.018] group-hover/image:brightness-105"
                            sizes="(min-width: 1100px) 76vw, 100vw"
                            priority={activeIndex === 0}
                          />

                          <span className="absolute right-4 top-4 inline-flex shrink-0 items-center rounded-full border border-paper/15 bg-night/60 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.14em] text-paper/75 backdrop-blur-sm sm:right-5 sm:top-5">
                            {active.number}
                            <span className="text-paper/35"> / {pad(projects.length)}</span>
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div
                role="group"
                className="hidden w-[100px] shrink-0 flex-col justify-center gap-2 min-[1100px]:flex min-[1100px]:w-[62px]"
                aria-label="Project thumbnails"
              >
                {projects.map((project, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={project.slug}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to ${project.name}`}
                      aria-current={isActive ? "true" : undefined}
                      title={project.name}
                      className={cn(
                        "group/thumb relative overflow-hidden rounded-lg border p-0.5 transition-[border-color,opacity,transform,filter] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral",
                        isActive
                          ? "border-coral opacity-100"
                          : "border-paper/10 opacity-45 grayscale hover:-translate-x-0.5 hover:opacity-80 hover:grayscale-0",
                      )}
                    >
                      <Visual
                        src={project.image}
                        alt=""
                        className="aspect-[4/3] w-full rounded-[0.35rem] bg-night-soft min-[1100px]:aspect-[31/20]"
                        imgClassName="object-cover"
                      />
                      <span className="absolute inset-x-1 bottom-1 rounded bg-night/75 px-1 py-0.5 text-left font-mono text-[0.48rem] tracking-[0.1em] text-paper/70 backdrop-blur-sm">
                        {project.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
