import Link from "next/link";
import { categoryLabels, type Project } from "@/data/work";
import { Visual } from "@/components/ui/Visual";

const pad = (value: number) => String(value).padStart(2, "0");

type CaseStudyCardProps = {
  project: Project;
  total: number;
  priority?: boolean;
};

/**
 * The natural-scroll case-study block. It keeps the same 16:9 artwork frame as
 * the reference at every width below the pinned desktop viewer, with the
 * editorial title and tags sitting outside the image rather than over it.
 */
export function CaseStudyCard({ project, total, priority = false }: CaseStudyCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.name} — ${categoryLabels[project.category]} concept`}
      className="group block h-full rounded-[1.25rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
    >
      <article className="flex h-full flex-col">
        <div className="order-2 pb-4 sm:order-1 sm:pb-5">
          <h3 className="font-display text-[clamp(1.8rem,4.6vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-paper transition-colors duration-500 group-hover:text-coral-soft">
            {project.name}
          </h3>
          <p className="mt-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coral-soft/90">
            {categoryLabels[project.category]}
          </p>
        </div>

        <div className="relative order-1 aspect-video overflow-hidden rounded-[1.25rem] border border-paper/15 bg-night-soft shadow-[0_30px_90px_-50px_rgb(0_0_0/0.9)] sm:order-2">
          <Visual
            src={project.image}
            alt={project.imageAlt}
            className="h-full w-full bg-night-soft"
            imgClassName="transition-[transform,filter] duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.018] group-hover:brightness-105"
            sizes="(min-width: 1280px) 50vw, 100vw"
            priority={priority}
          />

          <span className="absolute left-4 top-4 inline-flex min-w-0 items-center gap-1.5 rounded-full border border-paper/15 bg-night/60 px-2.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-paper/80 backdrop-blur-sm sm:left-5 sm:top-5">
            <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-coral" />
            <span className="shrink-0">Concept</span>
            <span aria-hidden="true" className="text-paper/30">/</span>
            <span className="truncate text-paper/65">
              {categoryLabels[project.category]}
            </span>
          </span>

          <span className="absolute right-4 top-4 inline-flex shrink-0 items-center rounded-full border border-paper/15 bg-night/60 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.14em] text-paper/75 backdrop-blur-sm sm:right-5 sm:top-5">
            {project.number}
            <span className="text-paper/35"> / {pad(total)}</span>
          </span>
        </div>

        <ul className="order-3 mt-4 flex flex-wrap gap-1.5" aria-label="Project tags">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-paper/15 bg-night/40 px-2.5 py-1 text-[0.54rem] font-medium uppercase tracking-[0.09em] text-paper/60"
            >
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </Link>
  );
}
