import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articleCategories, articles, featuredArticles, formatDate } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";

export const metadata: Metadata = buildMetadata({
  title: "Insights — Notes on marketing, creative and production",
  description:
    "Practical notes from Sosial on attention, brand, search, performance, content and production. Written for people who have to make the work happen.",
  path: "/insights",
});

export default function InsightsPage() {
  const featured = featuredArticles[0] ?? articles[0];
  const rest = featured ? articles.filter((article) => article.slug !== featured.slug) : articles;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative py-16 sm:py-20 lg:py-24">
          <SectionLabel index="—" tone="light">
            Insights / Field notes
          </SectionLabel>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <h1 className="display max-w-4xl text-[clamp(2.8rem,6.8vw,5.8rem)]">
                Thinking we would{" "}
                <span className="serif-accent text-coral-soft">defend</span> in a meeting.
              </h1>
              <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.06rem]">
                Notes on attention, brand, search, performance, content and production. Written for
                people who have to make the work happen, not just approve it.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="grid grid-cols-2 gap-6 border-t border-paper/15 pt-5 sm:max-w-xs">
                <div>
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-coral-soft">
                    {String(articles.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
                    Notes
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-coral-soft">
                    {String(articleCategories.length - 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-paper/40">
                    Topics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-center gap-2 border-b border-ink/12 pb-5">
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
              <div className="lg:col-span-7">
                <Link href={`/insights/${featured.slug}`} className="group block">
                  <div className="media-frame shadow-hard-sm transition-[transform,box-shadow] duration-200 group-hover:-translate-y-1 group-hover:shadow-hard">
                    <Visual
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
              <div className="lg:col-span-5">
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
                <SectionLabel index="—">All notes</SectionLabel>
                <h2 className="display mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)]">
                  More from the studio.
                </h2>
              </div>
              <p className="max-w-xs text-[0.82rem] leading-relaxed text-ink/50">
                No newsletter, no content treadmill. Just the notes we would send to a client.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, index) => (
                <ArticleCard key={article.slug} article={article} priority={index === 0} />
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.8rem] leading-relaxed text-ink/50">
              Have a question the notes do not answer? Ask it directly.
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
