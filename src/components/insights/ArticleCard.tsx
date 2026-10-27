import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type Article } from "@/data/insights";
import { Visual } from "@/components/ui/Visual";
import { cn } from "@/lib/utils";

export function ArticleCard({
  article,
  priority = false,
  className,
}: {
  article: Article;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-card border-2 border-ink bg-card p-4 text-ink shadow-hard-xs transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard",
        className,
      )}
    >
      <Visual
        src={article.image}
        alt={article.imageAlt}
        className="aspect-[4/3] w-full rounded-xl"
        imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        priority={priority}
      />
      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink/45">
          <span className="text-coral">{article.category}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-night/20" />
          <span>{article.readingTime}</span>
        </div>
        <h3 className="mt-3 font-display text-[1.22rem] font-semibold leading-snug tracking-[-0.025em] transition-colors group-hover:text-coral">
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
  );
}
