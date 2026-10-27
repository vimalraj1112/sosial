import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { divisions, services } from "@/data/services";
import { media } from "@/data/media";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { ServiceIcon } from "@/components/services/ServiceIcon";

export const metadata: Metadata = buildMetadata({
  title: "Services — Digital marketing, creative and production",
  description:
    "Eight services across two divisions: digital marketing and creative growth, plus video production and photography. Strategy, content, campaigns, websites and shoots, planned as one.",
  path: "/services",
});

const divisionVisuals = [
  {
    src: media.studio.src,
    alt: "Illustrative studio composition in cloud, ink and violet tones",
  },
  {
    src: media.hero.fallbackImage,
    alt: "Abstract aperture artwork representing production and a camera lens",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative py-16 sm:py-20 lg:py-24">
          <SectionLabel index="—" tone="light">
            Services / Two divisions
          </SectionLabel>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h1 className="display max-w-5xl text-[clamp(2.7rem,6.5vw,5.5rem)]">
                Marketing, creative and production,{" "}
                <span className="serif-accent text-coral-soft">working as one</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.06rem]">
                Strategy, social media, advertising, branding, websites and local visibility sit
                alongside video production, photography and post-production. You can start with one
                service, but the work is planned to fit the whole brand.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primaryOnDark" arrow>
                  Start a conversation
                </ButtonLink>
                <ButtonLink href="/work" variant="light">
                  See Selected Work
                </ButtonLink>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-paper/15 pt-6">
                <div>
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-coral-soft">
                    {String(services.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.12em] text-paper/40">
                    Services
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-coral-soft">
                    {String(divisions.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.12em] text-paper/40">
                    Divisions
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-coral-soft">01</p>
                  <p className="mt-1 text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.12em] text-paper/40">
                    Standard
                  </p>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 lg:pt-2">
              <div className="rounded-card border border-paper/20 bg-night-soft/80 p-5 shadow-[5px_5px_0_0_var(--color-coral)] sm:p-6">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/40">
                  Division index
                </p>
                <div className="mt-5 space-y-5">
                  {divisions.map((division, index) => (
                    <div key={division.id} className="border-t border-paper/12 pt-4 first:border-0 first:pt-0">
                      <p className="font-mono text-[0.6rem] tracking-[0.16em] text-coral-soft">
                        0{index + 1}
                      </p>
                      <p className="mt-1 font-display text-[1.08rem] font-semibold leading-snug tracking-[-0.02em]">
                        {division.name}
                      </p>
                      <p className="mt-1 text-[0.78rem] leading-relaxed text-paper/50">
                        {division.serviceSlugs.length} services
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 border-t border-paper/12 pt-4 text-[0.72rem] leading-relaxed text-paper/40">
                  Projects often combine both divisions. The scope is agreed in writing before work
                  begins.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {divisions.map((division, index) => {
        const divisionServices = services.filter((service) => division.serviceSlugs.includes(service.slug));
        const visual = divisionVisuals[index] ?? divisionVisuals[0];

        return (
          <section
            key={division.id}
            id={division.id}
            className={
              index % 2 === 0
                ? "scroll-mt-24 border-b border-ink/10 bg-paper py-20 sm:py-24"
                : "scroll-mt-24 border-b border-ink/10 bg-paper-deep py-20 sm:py-24"
            }
          >
            <div className="container-x">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <SectionLabel index={`0${index + 1}`}>Division</SectionLabel>
                  <h2 className="display mt-5 text-[clamp(2rem,4vw,3.3rem)]">
                    {division.id === "digital" ? (
                      <>
                        Digital marketing &{" "}
                        <span className="serif-accent text-coral">creative growth</span>.
                      </>
                    ) : (
                      <>
                        Video production &{" "}
                        <span className="serif-accent text-coral">photography</span>.
                      </>
                    )}
                  </h2>
                  <p className="mt-5 max-w-md text-[0.94rem] leading-relaxed text-ink/65">
                    {division.summary}
                  </p>

                  <div className="media-frame mt-8 shadow-hard-sm">
                    <Visual
                      src={visual.src}
                      alt={visual.alt}
                      className="aspect-[4/3] w-full"
                      sizes="(min-width: 1024px) 38vw, 100vw"
                    />
                  </div>
                  <p className="mt-3 text-[0.72rem] leading-relaxed text-ink/45">
                    Illustrative studio artwork. Client work will replace this asset.
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {divisionServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group flex h-full flex-col justify-between gap-7 rounded-card border-2 border-ink bg-card p-5 text-ink shadow-hard-xs transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard sm:p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink/15 bg-paper">
                            <ServiceIcon name={service.icon} className="h-5 w-5 text-coral" />
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 text-ink/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                            strokeWidth={1.8}
                          />
                        </div>
                        <div>
                          <h3 className="font-display text-[1.2rem] font-semibold leading-tight tracking-[-0.025em]">
                            {service.shortName}
                          </h3>
                          <p className="mt-2 text-[0.84rem] leading-relaxed text-ink/60">
                            {service.tagline}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-coral">
                            Explore
                          </span>
                        </div>
                      </Link>
                    ))}

                    <Link
                      href="/contact"
                      className="group flex h-full flex-col justify-between gap-7 rounded-card border-2 border-dashed border-ink/25 bg-paper p-5 text-ink transition-colors hover:border-ink hover:bg-card sm:p-6"
                    >
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-coral">
                        Combined brief
                      </span>
                      <div>
                        <h3 className="font-display text-[1.2rem] font-semibold leading-tight tracking-[-0.025em]">
                          Not sure where to start?
                        </h3>
                        <p className="mt-2 text-[0.84rem] leading-relaxed text-ink/60">
                          Tell us the outcome. We will recommend the smallest useful scope.
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-coral">
                          Ask us
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            strokeWidth={2}
                          />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-5 flex items-start gap-2.5 border-t border-ink/12 pt-5 text-[0.78rem] leading-relaxed text-ink/50">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-coral" strokeWidth={2} />
                    Scope, deliverables, timeline and fees are agreed in writing before work begins.
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-paper py-16 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-8">
            <SectionLabel index="—">A combined brief</SectionLabel>
            <h2 className="display mt-5 max-w-2xl text-[clamp(1.8rem,3.6vw,2.8rem)]">
              Most projects need more than one service.
            </h2>
            <p className="mt-4 max-w-2xl text-[0.94rem] leading-relaxed text-ink/60">
              A campaign may need the message, the content and the shoot. A new site may need the
              brand, the build and the local pages. Tell us the outcome you need and we will recommend
              the smallest useful combination, not the longest list.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href="/contact" variant="outline" arrow>
              Share your brief
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
