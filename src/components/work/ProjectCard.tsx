import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryLabels, type Project } from "@/data/work";
import { ParallaxMedia } from "@/components/work/ParallaxMedia";
import { Visual } from "@/components/ui/Visual";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  total: number;
  variant?: "grid" | "wide";
  priority?: boolean;
  className?: string;
};

/**
 * Editorial project tile: number, artwork, title, summary, tags and a single
 * quiet action. The hover is deliberately restrained — the image drifts, the
 * title lifts and the arrow fills — rather than a card that jumps off the page.
 */
export function ProjectCard({
  project,
  total,
  variant = "grid",
  priority = false,
  className,
}: ProjectCardProps) {
  const wide = variant === "wide";

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.name} — ${categoryLabels[project.category]} concept`}
      className={cn(
        "group block h-full rounded-[1.4rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral",
        className,
      )}
    >
      <article
        className={cn(
          "relative h-full overflow-hidden rounded-[1.4rem] border border-paper/14 bg-night-soft/50",
          "transition-[border-color,background-color] duration-500 ease-[var(--ease-brand)]",
          "group-hover:border-paper/30 group-hover:bg-night-soft/70",
          wide && "border-paper/20",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            wide ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]",
          )}
        >
          <ParallaxMedia strength={wide ? 4 : 5}>
            <Visual
              src={project.image}
              alt={project.imageAlt}
              className="h-full w-full bg-night-soft"
              imgClassName="transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.045]"
              sizes={
                wide
                  ? "(min-width: 1024px) 1200px, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              priority={priority}
            />
          </ParallaxMedia>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/5 transition-opacity duration-500 group-hover:opacity-95"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-5">
            <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-paper/20 bg-night/60 px-2.5 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.1em] text-paper/80 backdrop-blur-sm">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-coral" />
              <span className="shrink-0">Concept</span>
              <span aria-hidden="true" className="text-paper/30">/</span>
              <span className="truncate text-paper/65">{categoryLabels[project.category]}</span>
            </span>
            <span className="inline-flex shrink-0 items-center rounded-full border border-paper/15 bg-night/60 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.14em] text-paper/75 backdrop-blur-sm">
              {project.number}
              <span className="text-paper/35"> / {String(total).padStart(2, "0")}</span>
            </span>
          </div>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 p-5 text-paper sm:p-6",
              wide && "sm:p-8 lg:p-9",
            )}
          >
            <div className="flex items-end justify-between gap-5">
              <div className="min-w-0">
                <h3
                  className={cn(
                    "font-display font-semibold leading-[1.03] tracking-[-0.04em] transition-[color,transform] duration-500 ease-[var(--ease-brand)] group-hover:-translate-y-0.5 group-hover:text-coral-soft",
                    wide
                      ? "text-[clamp(1.9rem,4.2vw,3.55rem)]"
                      : "text-[clamp(1.4rem,2.4vw,1.95rem)]",
                  )}
                >
                  {project.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 line-clamp-2 text-paper/70 transition-colors duration-500 group-hover:text-paper/85",
                    wide
                      ? "max-w-2xl text-[0.88rem] leading-relaxed sm:text-[0.96rem]"
                      : "text-[0.79rem] leading-relaxed",
                  )}
                >
                  {project.summary}
                </p>
              </div>

              <span
                aria-hidden="true"
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full border border-paper/30 bg-night/35 text-paper backdrop-blur-sm",
                  "transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-brand)]",
                  "group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-coral group-hover:bg-coral group-hover:text-white",
                  wide ? "h-12 w-12 sm:h-14 sm:w-14" : "h-10 w-10",
                )}
              >
                <ArrowUpRight className={cn(wide ? "h-5 w-5" : "h-4 w-4")} strokeWidth={1.8} />
              </span>
            </div>

            <ul
              className={cn(
                "mt-4 flex flex-wrap gap-1.5",
                !wide && "min-h-[1.9rem] content-end",
              )}
              aria-label="Project tags"
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-paper/18 bg-night/40 px-2.5 py-1 text-[0.54rem] font-medium uppercase tracking-[0.09em] text-paper/65 backdrop-blur-sm transition-colors duration-500 group-hover:border-paper/30 group-hover:text-paper/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-coral transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-x-100"
          />
        </div>
      </article>
    </Link>
  );
}
