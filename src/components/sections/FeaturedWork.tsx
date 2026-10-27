import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, projects } from "@/data/work";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";

export function FeaturedWork() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section className="relative overflow-hidden bg-night py-20 text-paper sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-light opacity-25" />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="05" tone="light">
              Selected work
            </SectionLabel>
            <h2 className="display mt-5 max-w-2xl text-[clamp(2.1rem,4.5vw,3.7rem)]">
              Ideas made to make an{" "}
              <span className="serif-accent text-coral-soft">impact.</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-[0.88rem] leading-relaxed text-paper/55">
              A curated selection of concept work, each built around a different business problem.
              The thinking is real; the briefs are illustrative.
            </p>
            <ButtonLink href="/work" variant="light" size="sm" className="mt-5" arrow>
              View All Case Studies
            </ButtonLink>
          </div>
        </div>

        {lead ? (
          <Reveal className="mt-11">
            <ProjectCard project={lead} total={projects.length} variant="wide" priority />
          </Reveal>
        ) : null}

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.07, 0.2)} className="h-full">
              <ProjectCard project={project} total={projects.length} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.66rem] uppercase tracking-[0.14em] text-paper/35">
            Showing {String(featuredProjects.length).padStart(2, "0")} of{" "}
            {String(projects.length).padStart(2, "0")} concept projects
          </p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold text-paper/65 transition-colors hover:text-coral-soft"
          >
            View All Case Studies
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
