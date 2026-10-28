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
 * Desktop/tablet selected-work viewer.
 *
 * The outer element is one viewport tall per project; the inner element sticks
 * while the active project changes. This mirrors the reference's
 * scroll-controlled case-study presentation without intercepting the wheel or
 * touch scrolling. Mobile and reduced-motion visitors get the stacked list in
 * WorkShowcase instead.
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
    <div
      ref={wrapperRef}
      data-work-pinned
      className="relative hidden md:block"
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

        <div className="container-x relative flex min-h-0 flex-1 flex-col pb-4 pt-2 lg:pb-5 lg:pt-2">
          <WorkIntro total={projects.length} current={activeIndex} compact />

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Project {activeIndex + 1} of {projects.length}: {active.name},{" "}
            {categoryLabels[active.category]}
          </p>

          <div className="mt-3 flex min-h-0 flex-1 gap-3 lg:mt-4 lg:gap-5">
            <div
              role="group"
              className="hidden w-8 shrink-0 flex-col justify-center gap-2.5 xl:flex"
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
                      <div className="min-w-0">
                        <h3
                          data-work-title
                          className="font-display text-[clamp(1.6rem,2.7vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-paper transition-colors duration-500 group-hover:text-coral-soft"
                        >
                          {active.name}
                        </h3>
                        <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-coral-soft/90">
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
                          sizes="(min-width: 1280px) 70vw, (min-width: 768px) 90vw, 100vw"
                          priority={activeIndex === 0}
                        />

                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-night/0"
                        />

                        <span className="absolute right-4 top-4 inline-flex shrink-0 items-center rounded-full border border-paper/15 bg-night/60 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.14em] text-paper/75 backdrop-blur-sm sm:right-5 sm:top-5">
                          {active.number}
                          <span className="text-paper/35"> / {pad(projects.length)}</span>
                        </span>

                        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-4 text-paper sm:p-5">
                          <span className="line-clamp-2 max-w-2xl text-[0.78rem] leading-relaxed text-paper/70 sm:text-[0.84rem]">
                            {active.summary}
                          </span>
                          <span
                            aria-hidden="true"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/30 bg-night/35 text-paper backdrop-blur-sm transition-[transform,background-color,border-color,color] duration-500 ease-[var(--ease-brand)] group-hover/image:-translate-y-1 group-hover/image:translate-x-1 group-hover/image:border-coral group-hover/image:bg-coral group-hover/image:text-white"
                          >
                            <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-coral transition-transform duration-700 ease-[var(--ease-brand)] group-hover/image:scale-x-100"
                        />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              role="group"
              className="hidden w-[100px] shrink-0 flex-col justify-center gap-2 xl:flex"
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
                      className="aspect-[4/3] w-full rounded-[0.35rem] bg-night-soft"
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

          <div className="mt-2.5 flex items-center justify-between gap-4 border-t border-paper/10 pt-2.5">
            <p className="hidden text-[0.54rem] font-medium uppercase tracking-[0.12em] text-paper/30 sm:block">
              Concept projects / no client results claimed
            </p>
            <div className="flex items-center gap-4">
              <span className="hidden text-[0.54rem] font-medium uppercase tracking-[0.12em] text-paper/30 xl:inline">
                Scroll to explore
              </span>
              <Link
                href="/work"
                className="group inline-flex items-center gap-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-paper/55 transition-colors hover:text-coral-soft lg:hidden"
              >
                View All Case Studies
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
