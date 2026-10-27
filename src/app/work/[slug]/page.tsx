import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Info } from "lucide-react";
import { siteUrl } from "@/data/brand";
import { services } from "@/data/services";
import {
  categoryLabels,
  projectBySlug,
  projects,
  relatedProjects,
  type ProjectResult,
} from "@/data/work";
import { buildMetadata } from "@/lib/seo";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { ParallaxMedia } from "@/components/work/ParallaxMedia";
import { PortfolioCta } from "@/components/work/PortfolioCta";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const sections = [
  { id: "objective", number: "01", label: "Objective" },
  { id: "context", number: "02", label: "The context" },
  { id: "approach", number: "03", label: "Approach" },
  { id: "deliverables", number: "04", label: "Deliverables" },
  { id: "gallery", number: "05", label: "Gallery" },
  { id: "results", number: "06", label: "Results" },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: `${project.name} — ${categoryLabels[project.category]} concept`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

function ResultGrid({ results }: { results: ProjectResult[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {results.map((result) => (
        <div key={result.label} className="rounded-card border border-ink/12 bg-card p-4">
          <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-coral">
            {result.value}
          </p>
          <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink/45">
            {result.label}
          </p>
          {result.note ? <p className="mt-2 text-[0.75rem] text-ink/50">{result.note}</p> : null}
        </div>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) notFound();

  const related = relatedProjects(project.slug, 3);
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const representedServices = services.filter((service) => project.services.includes(service.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    abstract: project.objective,
    url: `${siteUrl}/work/${project.slug}`,
    image: `${siteUrl}${project.image}`,
    genre: categoryLabels[project.category],
    creator: {
      "@type": "Organization",
      name: "SOSIAL",
      url: siteUrl,
    },
    isPartOf: {
      "@type": "CollectionPage",
      name: "SOSIAL Work",
      url: `${siteUrl}/work`,
    },
    // No aggregateRating, review or result values are included: this is a concept.
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative pt-8 sm:pt-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.12em]">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-paper/55 transition-colors hover:text-coral-soft"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                strokeWidth={1.8}
              />
              All case studies
            </Link>
            <span aria-hidden="true" className="text-paper/20">
              /
            </span>
            <span className="text-paper/35" aria-current="page">
              {project.number}
            </span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-paper/50">
                <span className="text-coral-soft">{project.number}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-paper/25" />
                <span>{categoryLabels[project.category]}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-paper/25" />
                <span>{project.year}</span>
                <span className="rounded-full border border-paper/20 px-2.5 py-1 text-[0.55rem] text-paper/55">
                  Illustrative concept
                </span>
              </div>

              <h1 className="display mt-5 max-w-4xl text-[clamp(3.2rem,8.5vw,7rem)]">
                {project.name}
              </h1>

              <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.08rem]">
                {project.summary}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Project tags">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-paper/20 bg-paper/[0.045] px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-paper/65"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-4 lg:pt-1">
              <div className="rounded-card border border-paper/12 bg-night/80 p-5 backdrop-blur-md">
                <dl className="divide-y divide-paper/10 border-y border-paper/12">
                  <div className="flex gap-6 py-4">
                    <dt className="w-24 shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-paper/35">
                      Discipline
                    </dt>
                    <dd className="text-[0.85rem] leading-relaxed text-paper/70">{project.discipline}</dd>
                  </div>
                  <div className="flex gap-6 py-4">
                    <dt className="w-24 shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-paper/35">
                      Type
                    </dt>
                    <dd className="text-[0.85rem] leading-relaxed text-paper/70">{project.projectType}</dd>
                  </div>
                  <div className="flex gap-6 py-4">
                    <dt className="w-24 shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-paper/35">
                      Year
                    </dt>
                    <dd className="text-[0.85rem] text-paper/70">{project.year}</dd>
                  </div>
                  <div className="flex gap-6 py-4">
                    <dt className="w-24 shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-paper/35">
                      Status
                    </dt>
                    <dd className="text-[0.85rem] text-coral-soft">Concept, no results claimed</dd>
                  </div>
                </dl>
                <p className="mt-5 text-[0.7rem] leading-relaxed text-paper/35">{project.conceptNote}</p>
              </div>
            </aside>
          </div>
        </div>

        <div className="container-x relative pb-14 pt-10 sm:pb-20">
          <div className="relative overflow-hidden rounded-card border border-paper/20 shadow-[8px_8px_0_0_var(--color-coral)]">
            <ParallaxMedia
              strength={4}
              className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            >
              <Visual
                src={project.image}
                alt={project.imageAlt}
                className="h-full w-full bg-night-soft"
                sizes="(min-width: 1024px) 1200px, 100vw"
                priority
              />
            </ParallaxMedia>
            <span className="absolute bottom-4 left-4 rounded-full border border-paper/25 bg-night/55 px-3 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-paper/75 backdrop-blur-sm sm:bottom-6 sm:left-6">
              Concept artwork / {project.year}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/35">
                On this page
              </p>
              <nav aria-label="On this page" className="mt-4 border-t border-ink/12">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-center gap-4 border-b border-ink/10 py-2.5 text-[0.82rem] text-ink/60 transition-colors hover:text-ink"
                  >
                    <span className="font-mono text-[0.6rem] text-ink/30 transition-colors group-hover:text-coral">
                      {section.number}
                    </span>
                    {section.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 border-t border-ink/12 pt-6">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Services represented
                </p>
                <ul className="mt-3 space-y-1.5">
                  {representedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-[0.82rem] text-ink/60 transition-colors hover:text-coral"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-ink/12 pt-6">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Project index
                </p>
                <p className="mt-2 font-mono text-[0.8rem] text-ink/55">
                  {project.number} / {String(projects.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8">
            <section id="objective" className="scroll-mt-28">
              <SectionLabel index="01">Objective</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.4vw,2.9rem)]">
                The job to be done.
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink/68">
                {project.objective}
              </p>
            </section>

            <section id="context" className="mt-14 scroll-mt-28 border-t border-ink/12 pt-10">
              <SectionLabel index="02">The context</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.4vw,2.9rem)]">
                The problem behind the brief.
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink/68">
                {project.challenge}
              </p>
            </section>

            <section id="approach" className="mt-14 scroll-mt-28 border-t border-ink/12 pt-10">
              <SectionLabel index="03">Approach</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.4vw,2.9rem)]">
                How we would solve it.
              </h2>
              <div className="mt-8 space-y-3">
                {project.approach.map((step, stepIndex) => (
                  <div
                    key={step.title}
                    className="grid gap-4 rounded-card border border-ink/12 bg-card p-5 shadow-[2px_2px_0_0_rgba(20,20,28,0.12)] sm:grid-cols-[auto_1fr] sm:p-6"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper font-mono text-[0.68rem] text-coral">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.1rem] font-semibold tracking-[-0.02em]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink/62">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="deliverables" className="mt-14 scroll-mt-28 border-t border-ink/12 pt-10">
              <SectionLabel index="04">Deliverables</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.4vw,2.9rem)]">
                What the engagement includes.
              </h2>
              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-ink/10 bg-card px-4 py-3 text-[0.86rem] leading-relaxed text-ink/68"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-coral"
                      strokeWidth={2.2}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="gallery" className="mt-14 scroll-mt-28 border-t border-ink/12 pt-10">
              <SectionLabel index="05">Gallery</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.4vw,2.9rem)]">
                The work, in detail.
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {project.gallery.map((item, itemIndex) => (
                  <Reveal key={item.src} delay={itemIndex * 0.05} className="h-full">
                    <figure className="h-full overflow-hidden rounded-card border-2 border-ink bg-card shadow-hard-xs">
                      <div className="relative">
                        <Visual
                          src={item.src}
                          alt={item.alt}
                          className="aspect-[4/3] w-full"
                          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                        />
                        <span className="absolute right-3 top-3 rounded-full border border-paper/25 bg-night/65 px-2.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-paper/80 backdrop-blur-sm">
                          Concept 0{itemIndex + 1}
                        </span>
                      </div>
                      <figcaption className="border-t border-ink/10 px-4 py-3 text-[0.76rem] leading-relaxed text-ink/55">
                        {item.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="results" className="mt-14 scroll-mt-28 border-t border-ink/12 pt-10">
              <SectionLabel index="06">Results</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.4vw,2.9rem)]">
                What we can claim.
              </h2>

              {project.verifiedResults && project.verifiedResults.length > 0 ? (
                <ResultGrid results={project.verifiedResults} />
              ) : (
                <div className="mt-6 rounded-card border-2 border-ink bg-card p-5 shadow-hard-xs sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper text-coral">
                      <Info aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.2rem] font-semibold tracking-[-0.02em]">
                        No verified results are published for this concept.
                      </h3>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/62">
                        This is an illustrative project, not a client case study. We do not attach
                        invented metrics, testimonials or performance claims to it. When a client
                        approves real outcomes, they will appear here with context and a source.
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 border-t border-ink/10 pt-4 text-[0.74rem] leading-relaxed text-ink/45">
                    {project.conceptNote}
                  </p>
                </div>
              )}
            </section>

            <nav
              aria-label="Project navigation"
              className={cn(
                "mt-14 flex flex-col gap-4 border-t border-ink/12 pt-6 sm:flex-row sm:items-end sm:justify-between",
              )}
            >
              <Link href={`/work/${previous.slug}`} className="group max-w-xs">
                <span className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink/40">
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                    strokeWidth={1.8}
                  />
                  Previous
                </span>
                <span className="mt-1 block font-display text-[1.05rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-coral">
                  {previous.name}
                </span>
              </Link>
              <Link href={`/work/${next.slug}`} className="group max-w-xs sm:text-right">
                <span className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink/40 sm:justify-end">
                  Next
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </span>
                <span className="mt-1 block font-display text-[1.05rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-coral">
                  {next.name}
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="bg-night py-20 text-paper sm:py-24 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="—" tone="light">
                More concepts
              </SectionLabel>
              <h2 className="display mt-5 max-w-xl text-[clamp(2rem,4.4vw,3.6rem)]">
                Keep <span className="serif-accent text-coral-soft">looking</span>.
              </h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold text-paper/65 transition-colors hover:text-coral-soft"
            >
              View all case studies
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, itemIndex) => (
              <Reveal key={item.slug} delay={itemIndex * 0.06} className="h-full">
                <ProjectCard project={item} total={projects.length} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PortfolioCta
        eyebrow="Your project next"
        title={
          <>
            Have a project like this in{" "}
            <span className="serif-accent text-coral-soft">mind?</span>
          </>
        }
        description="Tell us what you are trying to change. We will tell you honestly whether we can help, and what the next useful step looks like."
        buttonLabel="Start a conversation"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
