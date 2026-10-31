import type { Project } from "@/data/work";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { WorkIntro } from "@/components/work/WorkIntro";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const pad = (value: number) => String(value).padStart(2, "0");

type WorkListProps = {
  projects: Project[];
  allProjectsCount: number;
  className?: string;
};

/**
 * The stacked, natural-scroll version of selected work. It is used below the
 * pinned desktop breakpoint and whenever a visitor asks for reduced motion, so
 * every project stays directly accessible without a pinned scroll sequence.
 * The artwork keeps the reference's 16:9 frame at these widths.
 */
export function WorkList({ projects, allProjectsCount, className }: WorkListProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="container-x pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-6 lg:pb-24 lg:pt-28">
        <WorkIntro total={projects.length} />

        <div className="mt-10 grid gap-10 min-[1100px]:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.07, 0.2)} className="h-full">
              <CaseStudyCard
                project={project}
                total={projects.length}
                priority={index === 0}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 border-t border-paper/12 pt-5">
          <p className="text-[0.66rem] uppercase tracking-[0.14em] text-paper/35">
            Showing {pad(projects.length)} of {pad(allProjectsCount)} concept projects
          </p>
        </div>
      </div>
    </div>
  );
}
