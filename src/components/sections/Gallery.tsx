import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryLabels, projectBySlug } from "@/data/work";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";

const galleryPicks = [
  { slug: "northwind", index: 0 },
  { slug: "halcyon", index: 1 },
  { slug: "tessellate", index: 0 },
  { slug: "orbit", index: 1 },
  { slug: "fieldnote", index: 0 },
  { slug: "kite", index: 1 },
];

export function Gallery() {
  const items = galleryPicks.flatMap(({ slug, index }) => {
    const project = projectBySlug(slug);
    const visual = project?.gallery[index];
    return project && visual ? [{ project, visual }] : [];
  });

  return (
    <section className="border-b border-ink/10 bg-paper py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel index="06">Visual gallery</SectionLabel>
            <h2 className="display mt-5 max-w-xl text-[clamp(1.9rem,3.6vw,2.9rem)]">
              The work, up close.
            </h2>
          </div>
          <p className="max-w-xs text-[0.85rem] leading-relaxed text-ink/55">
            Identity boards, campaign systems and digital design from the concept portfolio. Every
            visual is an original, illustrative mockup.
          </p>
        </div>
      </div>

      <div className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 scroll-pl-5 sm:px-8 sm:scroll-pl-8 lg:px-12 lg:scroll-pl-12">
        {items.map(({ project, visual }) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group w-[76vw] shrink-0 snap-start sm:w-[24rem]"
          >
            <div className="media-frame relative shadow-hard-sm transition-[transform,box-shadow] duration-200 group-hover:-translate-y-1 group-hover:shadow-hard">
              <Visual
                src={visual.src}
                alt={visual.alt}
                className="aspect-[4/3] w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(min-width: 640px) 24rem, 76vw"
              />
              <span className="chip absolute right-3 top-3 border-paper/30 bg-night/60 text-paper/85 backdrop-blur-sm">
                Concept
              </span>
              <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full border border-ink/15 bg-paper/90 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/70 backdrop-blur-sm">
                Detail / {project.number}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink/45">
                  {categoryLabels[project.category]}
                </p>
                <p className="mt-1 font-display text-[1.08rem] font-semibold tracking-[-0.02em]">
                  {project.name}
                </p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 transition-colors group-hover:border-ink group-hover:bg-night group-hover:text-paper">
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="container-x mt-4 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.14em] text-ink/35">
        <span aria-hidden="true">←</span>
        Drag or scroll to explore
        <span aria-hidden="true">→</span>
      </div>
    </section>
  );
}
