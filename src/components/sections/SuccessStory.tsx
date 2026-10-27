import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { projectBySlug } from "@/data/work";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { Badge } from "@/components/ui/Badge";

const measures = [
  "Qualified applications rather than raw form fills",
  "Cost per qualified lead against an agreed target",
  "Landing page clarity, tested one argument at a time",
];

export function SuccessStory() {
  const project = projectBySlug("orbit") ?? projectBySlug("northwind");

  if (!project) return null;

  return (
    <section className="border-b border-ink/10 bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel index="08">Concept story</SectionLabel>
            <h2 className="display mt-5 max-w-xl text-[clamp(2rem,3.9vw,3.1rem)]">
              From generic traffic to a{" "}
              <span className="serif-accent text-coral">clear argument</span>.
            </h2>
          </div>
          <Badge tone="coral" className="w-fit">Illustrative concept · no verified results</Badge>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <Link href={`/work/${project.slug}`} className="group block">
              <div className="media-frame relative shadow-hard-sm transition-[transform,box-shadow] duration-200 group-hover:-translate-y-1 group-hover:shadow-hard">
                <Visual
                  src={project.image}
                  alt={project.imageAlt}
                  className="aspect-[4/3] w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-paper">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.16em] text-coral-soft">
                      {project.category} · {project.year}
                    </p>
                    <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em]">{project.name}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center border border-paper/30 transition-colors group-hover:border-coral group-hover:text-coral-soft">
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                </div>
              </div>
            </Link>
            <p className="mt-3 text-[0.75rem] leading-relaxed text-ink/55">{project.conceptNote}</p>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ink/45">The problem</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{project.objective}</p>

              <p className="mt-7 text-[0.68rem] uppercase tracking-[0.16em] text-ink/45">
                What success would be measured on
              </p>
              <ul className="mt-3 space-y-3">
                {measures.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.88rem] leading-relaxed text-ink/65">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-coral" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl border-2 border-ink bg-cream p-5 shadow-hard-xs">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-ink/50">Results</p>
                <p className="mt-2 text-[0.87rem] leading-relaxed text-ink/65">
                  No performance data is published for this concept. On a real engagement, results
                  would appear here only after the client has approved the figures and the measurement
                  method.
                </p>
              </div>

              <Link
                href="/work"
                className="group mt-7 inline-flex items-center gap-2 text-[0.82rem] font-medium text-ink transition-colors hover:text-coral"
              >
                See all concept work
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
