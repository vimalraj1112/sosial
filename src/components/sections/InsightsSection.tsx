import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles, formatDate } from "@/data/insights";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { ButtonLink } from "@/components/ui/Button";

export function InsightsSection() {
  const latest = articles.slice(0, 3);

  return (
    <section id="insights" className="scroll-mt-24 bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="12">Insights</SectionLabel>
            <h2 className="display mt-5 max-w-xl text-[clamp(1.9rem,3.7vw,2.9rem)]">
              Thinking we would{" "}
              <span className="serif-accent text-coral">defend</span> in a meeting.
            </h2>
          </div>
          <ButtonLink href="/insights" variant="outline" size="sm" arrow>
            All insights
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {latest.map((article, index) => (
            <Reveal key={article.slug} as="article" delay={index * 0.06} className="h-full">
              <Link
                href={`/insights/${article.slug}`}
                className="group flex h-full flex-col rounded-card border-2 border-ink bg-card p-4 shadow-hard-xs transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard"
              >
                <Visual
                  src={article.image}
                  alt={article.imageAlt}
                  className="aspect-[4/3] w-full rounded-xl"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="flex flex-1 flex-col px-1 pt-4">
                  <div className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink/45">
                    <span className="text-coral">{article.category}</span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-night/20" />
                    <span>{article.readingTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-[1.26rem] font-semibold leading-snug tracking-[-0.025em] transition-colors group-hover:text-coral">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[0.85rem] leading-relaxed text-ink/60">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-[0.7rem] font-medium text-ink/40">
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 transition-colors group-hover:border-ink group-hover:bg-night group-hover:text-paper">
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
