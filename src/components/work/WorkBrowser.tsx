"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { workFilters, type Project, type ProjectCategory } from "@/data/work";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type FilterValue = ProjectCategory | "all";

export function WorkBrowser({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<FilterValue>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects],
  );

  return (
    <div>
      <div className="border-y border-paper/12 py-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
          >
            {workFilters.map((filter) => {
              const isActive = filter.value === active;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(filter.value)}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[0.72rem] font-semibold tracking-[-0.005em] sm:h-11 sm:px-4 sm:text-[0.76rem]",
                    "transition-[background-color,color,border-color] duration-300 ease-[var(--ease-brand)]",
                    isActive
                      ? "border-coral bg-coral text-white"
                      : "border-paper/20 bg-paper/[0.035] text-paper/60 hover:border-paper/40 hover:bg-paper/[0.07] hover:text-paper",
                  )}
                >
                  {filter.label}
                  <span
                    className={cn(
                      "font-mono text-[0.56rem] tracking-[0.04em]",
                      isActive ? "text-white/70" : "text-paper/30",
                    )}
                  >
                    {String(filter.count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          <p
            className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper/35"
            aria-live="polite"
            aria-atomic="true"
          >
            {String(filtered.length).padStart(2, "0")} of{" "}
            {String(projects.length).padStart(2, "0")} concepts
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {filtered.map((project, index) => (
          <Reveal key={project.slug} delay={Math.min(index * 0.04, 0.2)} className="h-full">
            <ProjectCard project={project} total={projects.length} />
          </Reveal>
        ))}

        {active === "all" ? (
          <Reveal delay={0.12} className="h-full lg:col-span-2">
            <Link
              href="/contact"
              aria-label="Start a project with SOSIAL"
              className="group relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[1.4rem] border border-coral bg-coral p-6 text-white transition-colors duration-500 hover:bg-violet-deep"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/20 transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-night/20 blur-2xl"
              />

              <div className="relative flex items-start justify-between gap-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/65">
                  Your project next
                </p>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-coral">
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </div>

              <div className="relative mt-10">
                <h3 className="display max-w-xl text-[clamp(1.8rem,2.7vw,2.6rem)] leading-[0.96]">
                  Make the next one{" "}
                  <span className="serif-accent text-paper/80">yours.</span>
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.78rem] font-semibold text-white">
                  Start a project
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-paper/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-[0.72rem] leading-relaxed text-paper/40">
          Every project shown is an illustrative concept, not a client engagement. We publish results
          only when a client has approved the numbers.
        </p>
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-paper/25">
          Concept portfolio / 2026
        </p>
      </div>
    </div>
  );
}
