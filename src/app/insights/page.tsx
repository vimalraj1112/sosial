import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articleCategories, articles, featuredArticles, formatDate } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { Typewriter, type TypewriterPart } from "@/components/ui/Typewriter";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Insights on marketing, content and video",
  description:
    "Practical marketing notes from SOSIAL on social media, advertising, branding, websites, video and measuring what works.",
  path: "/insights",
});

const headline: TypewriterPart[][] = [
  [{ text: "Practical ideas to" }],
  [{ text: "grow your brand.", className: "text-[#9C57FD]" }],
];

export default function InsightsPage() {
  const featured = featuredArticles[0] ?? articles[0];
  const rest = featured ? articles.filter((article) => article.slug !== featured.slug) : articles;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative flex min-h-[70svh] flex-col items-center justify-center pb-16 pt-20 text-center sm:pt-24 lg:pb-20 lg:pt-28">
          <h1 className="max-w-6xl font-display text-[clamp(2.3rem,6vw,5rem)] font-bold leading-[1.08] tracking-[-0.04em]">
            <Typewriter lines={headline} speed={45} startDelay={140} trigger="mount" />
          </h1>
          <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.1rem]">
            Simple, practical notes on social media, ads, branding, websites and video, written for business owners and marketing teams.
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
          <div {...reveal("fade")} className="flex flex-wrap items-center gap-2 border-b border-ink/12 pb-5">
            <span className="mr-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink/40">
              Topics
            </span>
            {articleCategories.slice(1).map((category) => (
              <span
                key={category}
                className="rounded-full border border-ink/20 bg-card px-3 py-1.5 text-[0.66rem] font-medium text-ink/60"
              >
                {category}
              </span>
            ))}
          </div>

          {featured ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
              <div {...reveal("left")} className="lg:col-span-7">
                <Link href={`/insights/${featured.slug}`} className="group block">
                  <div className="media-frame shadow-hard-sm transition-[transform,box-shadow] duration-200 group-hover:-translate-y-1 group-hover:shadow-hard">
                    <Visual
                      reveal="mask-left"
                      src={featured.image}
                      alt={featured.imageAlt}
                      className="aspect-[16/10] w-full"
                      imgClassName="transition-transform duration-700 group-hover:scale-[1.025]"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      priority
                    />
                  </div>
                </Link>
              </div>
              <div {...reveal("right")} className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink/45">
                  <span className="text-coral">{featured.category}</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-night/20" />
                  <span>{featured.readingTime}</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-night/20" />
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </div>
                <h2 className="display mt-4 text-[clamp(2rem,4.3vw,3.5rem)]">
                  <Link href={`/insights/${featured.slug}`} className="hover:text-coral">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 text-[0.96rem] leading-relaxed text-ink/65">{featured.excerpt}</p>
                <p className="mt-5 text-[0.74rem] font-medium uppercase tracking-[0.1em] text-ink/40">
                  {featured.author}
                </p>
                <Link
                  href={`/insights/${featured.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-[0.82rem] font-semibold text-coral hover:underline"
                >
                  Read the note
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
          ) : null}

          <div className="mt-16 border-t border-ink/12 pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>All notes</SectionLabel>
                <h2 {...reveal("rise")} className="display mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)]">
                  More from the studio.
                </h2>
              </div>
              <p {...reveal("up")} className="max-w-xs text-[0.82rem] leading-relaxed text-ink/50">
                Practical tips you can use straight away, from the work we do every day.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, index) => (
                <ArticleCard key={article.slug} article={article} priority={index === 0} />
              ))}
            </div>
          </div>

          <div {...reveal("up")} className="mt-12 flex flex-col gap-5 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.8rem] leading-relaxed text-ink/50">
              Have a question these notes do not answer? Ask us directly.
            </p>
            <ButtonLink href="/contact" variant="outline" size="sm" arrow>
              Ask a Question
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
