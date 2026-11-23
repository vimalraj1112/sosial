import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { divisions, services } from "@/data/services";
import { processSteps } from "@/data/faqs";
import { media } from "@/data/media";
import { brand } from "@/data/brand";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { Typewriter, type TypewriterPart } from "@/components/ui/Typewriter";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "About us",
  description:
    "SOSIAL is a digital marketing and video production brand in India: one creative partner for digital marketing, content and video production.",
  path: "/about",
});

const headline: TypewriterPart[][] = [
  [{ text: "One studio, built for" }],
  [{ text: "the whole story.", className: "text-[#9C57FD]" }],
];

const beliefs = [
  {
    title: "Clarity",
    body: "Clear goals, clear scope and clear communication. You always know what we are doing and why.",
  },
  {
    title: "Craft",
    body: "Care and attention to detail in every design, video and campaign, from the first idea to the final file.",
  },
  {
    title: "Consistency",
    body: "One message and one standard across every channel, so your brand looks and sounds like itself everywhere.",
  },
  {
    title: "Accountability",
    body: "We follow the agreed scope and timelines, report honestly and only promise what we can deliver.",
  },
];

const clients = [
  "Startups and entrepreneurs",
  "Small and medium-sized businesses",
  "Established companies",
  "Consultants, professionals and personal brands",
  "Educational institutions",
  "Healthcare and wellness businesses",
  "Hospitality and lifestyle brands",
  "Retail and e-commerce businesses",
];

const promises = [
  {
    title: "Quality over quantity",
    body: "We would rather do fewer things well than fill your calendar with content that does not move the business.",
  },
  {
    title: "Honest from day one",
    body: "We never make up results, reviews or credentials. If something is not the right fit, we will tell you.",
  },
  {
    title: "Your brief comes first",
    body: "Your approved brief and brand guidelines guide the work. We will not change direction without talking to you.",
  },
  {
    title: "In it for the long term",
    body: "We care about building lasting relationships, not one-off projects. Your growth is how we measure our work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative flex min-h-[70svh] flex-col items-center justify-center pb-16 pt-20 text-center sm:pt-24 lg:pb-20 lg:pt-28">
          <h1 className="max-w-6xl font-display text-[clamp(2.3rem,6vw,5rem)] font-bold leading-[1.08] tracking-[-0.04em]">
            <Typewriter lines={headline} speed={45} startDelay={140} trigger="mount" />
          </h1>
          <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.1rem]">
            {brand.positioning} Clear plans, careful work and honest communication from the first
            chat to final delivery.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" variant="primary" size="lg" arrow>
              Start a conversation
            </ButtonLink>
            <ButtonLink href="/services" variant="light" size="lg">
              Explore Services
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="container-x">
          <SectionLabel index="01">Who we are</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 {...reveal("rise")} className="display max-w-3xl text-[clamp(2.2rem,4.8vw,4.1rem)]">
                One creative partner for your{" "}
                <span className="serif-accent text-coral">whole brand</span>.
              </h2>
              <p {...reveal("up")} className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-ink/70">
                SOSIAL is a digital marketing and video production brand based in India. We bring
                digital marketing, creative content and video production together to help businesses
                build their presence, communicate their value and connect with their audiences.
              </p>
              <p {...reveal("up")} className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink/70">
                We work as your creative and marketing partner, not as a freelancer and not as a
                traditional agency. One team plans the strategy, creates the content and delivers the
                work, so everything fits together.
              </p>
              <div {...reveal("up")} className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/services" variant="outline" arrow>
                  Explore Services
                </ButtonLink>
                <Link
                  href="/insights"
                  className="group inline-flex items-center gap-2 px-1 py-3 text-[0.82rem] font-medium text-ink/65 transition-colors hover:text-coral"
                >
                  Read our insights
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <p {...reveal("fade")} className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                Our values
              </p>
              <div className="grid gap-3">
                {beliefs.map((belief, index) => (
                  <div
                    key={belief.title}
                    {...reveal("right")}
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
              <SectionLabel index="02">What we do</SectionLabel>
              <h2 {...reveal("rise")} className="display mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.4rem)]">
                Two divisions,{" "}
                <span className="serif-accent text-coral">one team</span>.
              </h2>
            </div>
            <p {...reveal("up")} className="max-w-sm text-[0.9rem] leading-relaxed text-ink/60">
              Digital marketing and video production work side by side, so your strategy, content
              and campaigns all point in the same direction.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {divisions.map((division, index) => (
              <div
                key={division.id}
                {...reveal(index === 0 ? "left" : "right")}
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
                          className="inline-flex rounded-full border border-ink/20 bg-paper px-3 py-1.5 text-[0.66rem] font-medium text-ink/65 transition-colors"
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
              <h2 {...reveal("rise")} className="display max-w-xl text-[clamp(2rem,4vw,3.2rem)]">
                Four simple steps, from idea to{" "}
                <span className="serif-accent text-coral">launch</span>.
              </h2>
              <p {...reveal("up")} className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
                Each step has a clear outcome, so you always know where your project stands and
                what we need from you.
              </p>
              <div className="media-frame mt-8 max-w-md shadow-hard-sm">
                <Visual
                  reveal="mask-left"
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
                    {...reveal("scale")}
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
            <SectionLabel index="04">Who we work with</SectionLabel>
            <h2 {...reveal("rise")} className="display mt-5 max-w-xl text-[clamp(1.9rem,3.8vw,3rem)]">
              Built for businesses of{" "}
              <span className="serif-accent text-coral">every size</span>.
            </h2>
            <p {...reveal("up")} className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-ink/65">
              We are India-first and work with clients across different industries and locations.
              Every plan is built around your business, your audience and your goals.
            </p>
            <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {clients.map((item) => (
                <li key={item} {...reveal("left")} className="flex gap-3 text-[0.9rem] leading-relaxed text-ink/70">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <div {...reveal("right")} className="rounded-card border-2 border-ink bg-card p-6 shadow-hard-sm sm:p-8">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                Capabilities
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="inline-flex rounded-full border border-ink/20 bg-paper px-3 py-1.5 text-[0.7rem] font-medium text-ink/65 transition-colors"
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

      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="05">What you can expect</SectionLabel>
              <h2 {...reveal("rise")} className="display mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.4rem)]">
                How we work{" "}
                <span className="serif-accent text-coral">with you</span>.
              </h2>
            </div>
            <p {...reveal("up")} className="max-w-sm text-[0.9rem] leading-relaxed text-ink/60">
              We are not just about creating content or running ads. We help businesses communicate
              better, build stronger brands and grow through the right mix of strategy, creativity,
              technology and execution.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((item, index) => (
              <div
                key={item.title}
                {...reveal("up")}
                className="rounded-card border-2 border-ink bg-card p-6 shadow-hard-xs"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-[0.64rem] font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[1.12rem] font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/60">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
