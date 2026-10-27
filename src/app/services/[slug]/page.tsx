import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { siteUrl } from "@/data/brand";
import { divisions, serviceBySlug, services } from "@/data/services";
import { projectBySlug } from "@/data/work";
import { buildMetadata } from "@/lib/seo";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ServiceIcon } from "@/components/services/ServiceIcon";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  if (!service) {
    return {
      title: "Service not found",
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: `${service.name} — ${service.tagline}`,
    description: service.summary,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  if (!service) notFound();

  const division = divisions.find((item) => item.id === service.division);
  const relatedProjects = service.relatedWork
    .map((projectSlug) => projectBySlug(projectSlug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const otherServices = services
    .filter((item) => item.slug !== service.slug && item.division === service.division)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: `${siteUrl}/services/${service.slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: "SOSIAL",
      url: siteUrl,
      email: "sosial.solutions@gmail.com",
      telephone: "+91 91104 80590",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    areaServed: "Bengaluru, India",
    category: division?.shortName ?? "Marketing services",
    // No offers, prices, ratings or performance claims: scope is agreed per project.
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative pb-14 pt-8 sm:pt-10 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.12em]">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-paper/55 transition-colors hover:text-coral-soft"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                strokeWidth={1.8}
              />
              All services
            </Link>
            <span aria-hidden="true" className="text-paper/20">/</span>
            <span className="text-paper/35" aria-current="page">
              {division?.shortName ?? "Service"}
            </span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/45">
                <span className="inline-flex items-center gap-2 text-coral-soft">
                  <ServiceIcon name={service.icon} className="h-4 w-4" />
                  {division?.shortName ?? "Service"}
                </span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-paper/25" />
                <span>Scope agreed in writing</span>
              </div>

              <h1 className="display mt-5 max-w-3xl text-[clamp(2.6rem,6.4vw,5.2rem)]">
                {service.name}
              </h1>
              <p className="mt-4 max-w-2xl font-display text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-coral-soft sm:text-[1.3rem]">
                {service.tagline}
              </p>
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-paper/65 sm:text-[1.04rem]">
                {service.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primaryOnDark" arrow>
                  Discuss This Service
                </ButtonLink>
                <ButtonLink href="/work" variant="light">
                  See the Work
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-card border border-paper/20 shadow-[7px_7px_0_0_var(--color-coral)]">
                <Visual
                  src={service.image}
                  alt={service.imageAlt}
                  className="aspect-[4/3] w-full rounded-[1.1rem]"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  priority
                />
              </div>
              <p className="mt-3 text-[0.7rem] leading-relaxed text-paper/35">
                Illustrative artwork, not a client photograph. Project imagery is labelled separately.
              </p>
            </div>
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
                {[
                  { id: "problem", label: "The problem" },
                  { id: "approach", label: "Approach" },
                  { id: "deliverables", label: "Deliverables" },
                  { id: "faqs", label: "Questions" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center justify-between gap-4 border-b border-ink/10 py-2.5 text-[0.82rem] text-ink/60 transition-colors hover:text-ink"
                  >
                    {item.label}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-ink/25" strokeWidth={1.8} />
                  </a>
                ))}
              </nav>

              <div className="mt-8 border-t border-ink/12 pt-6">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Division
                </p>
                <p className="mt-2 text-[0.9rem] font-medium leading-snug text-ink/70">
                  {division?.name ?? "Sosial services"}
                </p>
                <Link
                  href={`/services#${service.division}`}
                  className="mt-2 inline-flex items-center gap-1.5 text-[0.76rem] font-semibold text-coral hover:underline"
                >
                  Explore the division
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
              </div>

              <div className="mt-8 rounded-2xl border-2 border-ink bg-card p-4 shadow-hard-xs">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink/40">
                  Not sure where to start?
                </p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/60">
                  Tell us the outcome. We will recommend the smallest useful scope.
                </p>
                <ButtonLink href="/contact" variant="dark" size="sm" className="mt-4" arrow>
                  Start a conversation
                </ButtonLink>
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8">
            <section id="problem" className="scroll-mt-28">
              <SectionLabel index="01">The problem</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)]">
                Where the work usually{" "}
                <span className="serif-accent text-coral">breaks</span>.
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink/68">
                {service.problem}
              </p>
              <ul className="mt-8 grid gap-2.5 sm:grid-cols-3">
                {service.problemPoints.map((point, index) => (
                  <li
                    key={point}
                    className="rounded-xl border border-ink/12 bg-card p-4 text-[0.84rem] leading-relaxed text-ink/65"
                  >
                    <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 font-mono text-[0.6rem] text-coral">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            <section id="approach" className="mt-14 scroll-mt-28 border-t border-ink/12 pt-10">
              <SectionLabel index="02">Approach</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)]">
                How we would{" "}
                <span className="serif-accent text-coral">approach it</span>.
              </h2>
              <div className="mt-8 space-y-3">
                {service.approach.map((step, index) => (
                  <div
                    key={step.title}
                    className="grid gap-4 rounded-card border border-ink/12 bg-card p-5 shadow-[2px_2px_0_0_rgba(20,20,28,0.12)] sm:grid-cols-[auto_1fr] sm:p-6"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper font-mono text-[0.68rem] text-coral">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.12rem] font-semibold tracking-[-0.02em]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink/62">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="deliverables" className="mt-14 scroll-mt-28 border-t border-ink/12 pt-10">
              <SectionLabel index="03">Deliverables</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)]">
                What the scope can{" "}
                <span className="serif-accent text-coral">include</span>.
              </h2>
              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-ink/10 bg-card px-4 py-3 text-[0.86rem] leading-relaxed text-ink/68"
                  >
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-coral" strokeWidth={2.2} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-2xl text-[0.76rem] leading-relaxed text-ink/45">
                Final deliverables, number of rounds and timing are confirmed in the written scope.
                Not every bullet is included in every engagement.
              </p>
            </section>

            <section id="faqs" className="mt-14 scroll-mt-28 border-t border-ink/12 pt-10">
              <SectionLabel index="04">Questions</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)]">
                Worth asking before you{" "}
                <span className="serif-accent text-coral">commit</span>.
              </h2>
              <div className="mt-8 rounded-card border-2 border-ink bg-card px-5 py-2 shadow-hard-xs sm:px-7">
                <Accordion items={service.faqs} defaultOpen={0} />
              </div>
            </section>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="relative overflow-hidden bg-night py-20 text-paper sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-light opacity-20" />
          <div className="container-x relative">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel index="—" tone="light">
                  Related concepts
                </SectionLabel>
                <h2 className="display mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.4rem)]">
                  How this thinking shows up in the{" "}
                  <span className="serif-accent text-coral-soft">work</span>.
                </h2>
              </div>
              <ButtonLink href="/work" variant="light" size="sm" arrow>
                View All Work
              </ButtonLink>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} total={relatedProjects.length} />
              ))}
            </div>
            <p className="mt-5 text-[0.7rem] uppercase tracking-[0.12em] text-paper/35">
              Illustrative concepts only. No client names or performance results are claimed.
            </p>
          </div>
        </section>
      ) : null}

      {otherServices.length > 0 ? (
        <section className="bg-paper py-20 sm:py-24">
          <div className="container-x">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel index="—">Same division</SectionLabel>
                <h2 className="display mt-5 max-w-xl text-[clamp(1.8rem,3.6vw,2.8rem)]">
                  Services that often work{" "}
                  <span className="serif-accent text-coral">together</span>.
                </h2>
              </div>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold text-ink/65 transition-colors hover:text-coral"
              >
                All services
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {otherServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-card border-2 border-ink bg-card p-5 text-ink shadow-hard-xs transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/15 bg-paper">
                      <ServiceIcon name={item.icon} className="h-4 w-4 text-coral" />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-ink/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.06rem] font-semibold leading-snug tracking-[-0.02em]">
                      {item.shortName}
                    </h3>
                    <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink/55">{item.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
