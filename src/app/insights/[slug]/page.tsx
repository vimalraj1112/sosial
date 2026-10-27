import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { siteUrl } from "@/data/brand";
import { articleBySlug, articles, formatDate, type ArticleBlock } from "@/data/insights";
import { buildMetadata } from "@/lib/seo";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);

  if (!article) {
    return {
      title: "Insight not found",
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    image: article.image,
  });
}

function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function ArticleBlockView({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 id={headingId(block.text)}>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "p":
      return <p>{block.text}</p>;
    default:
      return null;
  }
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = articleBySlug(slug);

  if (!article) notFound();

  const sections = article.content.filter(
    (block): block is { type: "h2"; text: string } => block.type === "h2",
  );
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: article.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "SOSIAL",
      url: siteUrl,
    },
    image: `${siteUrl}${article.image}`,
    mainEntityOfPage: `${siteUrl}/insights/${article.slug}`,
    articleSection: article.category,
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-paper">
        <HeroBackdrop />

        <div className="container-x relative pb-14 pt-8 sm:pt-10 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.12em]">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-paper/55 transition-colors hover:text-coral-soft"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                strokeWidth={1.8}
              />
              All insights
            </Link>
            <span aria-hidden="true" className="text-paper/20">/</span>
            <span className="text-paper/35" aria-current="page">
              {article.category}
            </span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-paper/45">
                <span className="text-coral-soft">{article.category}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-paper/25" />
                <span>{article.readingTime}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-paper/25" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </div>

              <h1 className="display mt-5 max-w-4xl text-[clamp(2.5rem,5.6vw,4.8rem)]">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-paper/65 sm:text-[1.06rem]">
                {article.excerpt}
              </p>
              <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-paper/35">
                {article.author}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-card border border-paper/20 shadow-[6px_6px_0_0_var(--color-coral)]">
                <Visual
                  src={article.image}
                  alt={article.imageAlt}
                  className="aspect-[4/3] w-full rounded-[1.1rem]"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  priority
                />
              </div>
              <p className="mt-3 text-[0.7rem] leading-relaxed text-paper/35">
                Illustrative editorial artwork.
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
                In this note
              </p>
              <nav aria-label="In this note" className="mt-4 border-t border-ink/12">
                {sections.map((section) => (
                  <a
                    key={section.text}
                    href={`#${headingId(section.text)}`}
                    className="flex items-start gap-3 border-b border-ink/10 py-2.5 text-[0.8rem] leading-snug text-ink/60 transition-colors hover:text-ink"
                  >
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral" />
                    {section.text}
                  </a>
                ))}
              </nav>

              <div className="mt-8 rounded-2xl border-2 border-ink bg-card p-4 shadow-hard-xs">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink/40">
                  Put it to work
                </p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/60">
                  If this raises a question about your own marketing, ask it directly.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.76rem] font-semibold text-coral hover:underline"
                >
                  Start a conversation
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8">
            <article className="prose-sosial max-w-3xl">
              {article.content.map((block, index) => (
                <ArticleBlockView key={`${block.type}-${index}`} block={block} />
              ))}
            </article>

            <div className="mt-12 flex flex-col gap-4 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold text-ink/60 transition-colors hover:text-coral"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                  strokeWidth={1.8}
                />
                Back to all insights
              </Link>
              <p className="text-[0.7rem] uppercase tracking-[0.12em] text-ink/35">
                {article.category} / {formatDate(article.date)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-deep py-20 sm:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="—">Keep reading</SectionLabel>
              <h2 className="display mt-5 max-w-xl text-[clamp(1.9rem,3.8vw,3rem)]">
                More notes from the{" "}
                <span className="serif-accent text-coral">studio</span>.
              </h2>
            </div>
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold text-ink/65 transition-colors hover:text-coral"
            >
              All insights
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
