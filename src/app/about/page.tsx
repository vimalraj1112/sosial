import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { divisions, services } from "@/data/services";
import { processSteps } from "@/data/faqs";
import { media } from "@/data/media";
import { brand } from "@/data/brand";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";

export const metadata: Metadata = buildMetadata({
  title: "About — A marketing and creative brand in Bengaluru",
  description:
    "Sosial brings digital marketing, branding, websites and visual production together. Based in Bengaluru, built around one clear direction from strategy to delivery.",
  path: "/about",
});

const beliefs = [
  {
    title: "Clarity",
    body: "Communicate objectives, scope, creative direction and expectations clearly. A written brief and scope come before work starts.",
  },
  {
    title: "Craft",
    body: "Approach strategy, creative development, production and delivery with care and attention to detail. Proof every piece before it leaves the studio.",
  },
  {
    title: "Consistency",
    body: "Maintain a coherent identity, message and standard of execution across channels and deliverables. The work should look and sound like the same brand.",
  },
  {
    title: "Accountability",
    body: "Communicate honestly, follow the agreed scope and timelines, and evaluate work against appropriate objectives. Say only what we can support.",
  },
];

const expectations = [
  "Access to the people who can make decisions",
  "A willingness to share what is actually happening",
  "A realistic view of timing, budget and internal capacity",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative py-16 sm:py-20 lg:py-24">
          <SectionLabel index="—" tone="light">
            About / Sosial
          </SectionLabel>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <h1 className="display max-w-5xl text-[clamp(2.7rem,6.5vw,5.5rem)]">
                A marketing and creative brand, built for the{" "}
                <span className="serif-accent text-coral-soft">whole story</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.06rem]">
                Sosial brings digital marketing, creative content and production together, so your
                message, your visuals and your channels work as one. Based in Bengaluru, with a clear
                plan, careful work and honest communication from the first conversation to final
                delivery.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primaryOnDark" arrow>
                  Start a Project
                </ButtonLink>
                <ButtonLink href="/services" variant="light">
                  Explore Services
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-card border border-paper/20 bg-night-soft/80 p-5 shadow-[5px_5px_0_0_var(--color-coral)] sm:p-6">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/40">
                  The short version
                </p>
                <dl className="mt-5 space-y-4">
                  <div className="flex items-end justify-between gap-4 border-b border-paper/12 pb-4">
                    <dt className="text-[0.78rem] text-paper/55">Based in</dt>
                    <dd className="text-[0.86rem] font-medium text-paper/85">{brand.location}</dd>
                  </div>
                  <div className="flex items-end justify-between gap-4 border-b border-paper/12 pb-4">
                    <dt className="text-[0.78rem] text-paper/55">Divisions</dt>
                    <dd className="text-[0.86rem] font-medium text-paper/85">02</dd>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <dt className="text-[0.78rem] text-paper/55">Services</dt>
                    <dd className="text-[0.86rem] font-medium text-paper/85">
                      {String(services.length).padStart(2, "0")}
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 border-t border-paper/12 pt-4 text-[0.72rem] leading-relaxed text-paper/40">
                  Marketing, creative and production, working as one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="container-x">
          <SectionLabel index="01">The belief</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="display max-w-3xl text-[clamp(2.2rem,4.8vw,4.1rem)]">
                Attention is earned, not{" "}
                <span className="serif-accent text-coral">bought</span>.
              </h2>
              <p className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-ink/70">
                Good marketing comes from clarity, consistency and a genuine understanding of people.
                A brand does not become memorable because it is louder. It becomes memorable because
                it says something specific, looks like itself and keeps showing up with a reason.
              </p>
              <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink/70">
                That is why we do not separate the message from the channel, the campaign from the
                content, or the brand from the production. The more connected the work is, the less
                it has to shout.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/work" variant="outline" arrow>
                  See the Work
                </ButtonLink>
                <Link
                  href="/insights"
                  className="group inline-flex items-center gap-2 px-1 py-3 text-[0.82rem] font-medium text-ink/65 transition-colors hover:text-coral"
                >
                  Read our thinking
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                Four values, applied daily
              </p>
              <div className="grid gap-3">
                {beliefs.map((belief, index) => (
                  <div
                    key={belief.title}
                    className="rounded-card border-2 border-ink bg-card p-5 shadow-hard-xs sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 font-mono text-[0.62rem] text-coral">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.08rem] font-semibold tracking-[-0.02em]">
                          {belief.title}
                        </h3>
                        <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/60">
                          {belief.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper-deep py-20 sm:py-24 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="02">Two divisions</SectionLabel>
              <h2 className="display mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.4rem)]">
                One direction, two{" "}
                <span className="serif-accent text-coral">disciplines</span>.
              </h2>
            </div>
            <p className="max-w-sm text-[0.9rem] leading-relaxed text-ink/60">
              Strategy and production sit under the same roof, so the idea survives the shoot, the
              build and the campaign.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {divisions.map((division, index) => (
              <div
                key={division.id}
                className="flex h-full flex-col rounded-card border-2 border-ink bg-card p-6 shadow-hard-sm sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-coral font-mono text-[0.66rem] text-white">
                    0{index + 1}
                  </span>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    {division.serviceSlugs.length} services
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[1.55rem] font-semibold leading-tight tracking-[-0.03em]">
                  {division.name}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/65">{division.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {services
                    .filter((service) => division.serviceSlugs.includes(service.slug))
                    .map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex rounded-full border border-ink/20 bg-paper px-3 py-1.5 text-[0.66rem] font-medium text-ink/65 transition-colors hover:border-ink hover:text-ink"
                        >
                          {service.shortName}
                        </Link>
                      </li>
                    ))}
                </ul>
                <div className="mt-auto pt-7">
                  <Link
                    href={`/services#${division.id}`}
                    className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold text-coral hover:underline"
                  >
                    Explore the division
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="container-x">
          <SectionLabel index="03">The process</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="display max-w-xl text-[clamp(2rem,4vw,3.2rem)]">
                A process that removes{" "}
                <span className="serif-accent text-coral">surprises</span>.
              </h2>
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
                Four phases, each with a clear output and a decision point. You always know what is
                happening, what is next and what we need from you.
              </p>
              <div className="media-frame mt-8 max-w-md shadow-hard-sm">
                <Visual
                  src={media.contact.src}
                  alt={media.contact.alt}
                  className="aspect-[16/10] w-full"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-card border-2 border-ink bg-card p-5 shadow-hard-xs sm:p-6"
                  >
                    <p className="font-mono text-[0.66rem] tracking-[0.14em] text-coral">{step.number}</p>
                    <h3 className="mt-6 font-display text-[1.25rem] font-semibold tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/60">{step.body}</p>
                    <p className="mt-4 border-t border-ink/10 pt-3 text-[0.72rem] leading-relaxed text-ink/45">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-deep py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel index="04">The working relationship</SectionLabel>
            <h2 className="display mt-5 max-w-xl text-[clamp(1.9rem,3.8vw,3rem)]">
              Good work needs a{" "}
              <span className="serif-accent text-coral">good brief</span>.
            </h2>
            <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-ink/65">
              We do not need a finished brief to start, but we do need an honest view of the business.
              The best outcomes come from clients who are close to the work and clear about what they
              can decide.
            </p>
            <ul className="mt-7 space-y-3">
              {expectations.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9rem] leading-relaxed text-ink/70">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-coral" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-lg text-[0.78rem] leading-relaxed text-ink/45">
              {brand.location}. Named team profiles, biographies and client logos will
              be added when supplied and approved.
            </p>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <div className="rounded-card border-2 border-ink bg-card p-6 shadow-hard-sm sm:p-8">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                Capabilities
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="inline-flex rounded-full border border-ink/20 bg-paper px-3 py-1.5 text-[0.7rem] font-medium text-ink/65 transition-colors hover:border-ink hover:text-ink"
                  >
                    {service.shortName}
                  </Link>
                ))}
              </div>
              <div className="mt-8 border-t border-ink/10 pt-5">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                  Start here
                </p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/65">
                  Tell us what you are trying to change. A short note is enough.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" variant="primary" size="sm" arrow>
                    Start a conversation
                  </ButtonLink>
                  <ButtonLink href="/services" variant="outline" size="sm">
                    All services
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
