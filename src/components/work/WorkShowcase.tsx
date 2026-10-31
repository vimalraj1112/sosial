"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { Project } from "@/data/work";
import { WorkList } from "@/components/work/WorkList";
import { WorkPinned } from "@/components/work/WorkPinned";

type WorkShowcaseProps = {
  projects: Project[];
  allProjectsCount: number;
};

/**
 * Selected work has two honest presentations:
 *
 * - a pinned, scroll-controlled viewer on wide desktop screens;
 * - a natural, 16:9 case-study list on tablet, mobile and for reduced-motion visitors.
 *
 * Keeping both in one section means the desktop experience can be cinematic
 * without making the projects difficult to reach on a phone or with motion
 * sensitivity.
 */
export function WorkShowcase({ projects, allProjectsCount }: WorkShowcaseProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Hydration-safe switch: server and first client render both use the
    // animated layout, then reduced-motion visitors receive the static list.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const staticMode = mounted && reduced;

  return (
    <section id="selected-work" className="relative bg-night text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-light opacity-20"
      />

      {staticMode ? (
        <WorkList projects={projects} allProjectsCount={allProjectsCount} />
      ) : (
        <>
          <WorkList
            projects={projects}
            allProjectsCount={allProjectsCount}
            className="xl:hidden"
          />
          <WorkPinned projects={projects} />
        </>
      )}
    </section>
  );
}
