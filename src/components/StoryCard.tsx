import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { sectionName } from "@/data/site";
import { formatShortDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  article: Article;
  variant?: "stacked" | "row" | "compact";
  priority?: boolean;
  className?: string;
};

export default function StoryCard({
  article,
  variant = "stacked",
  priority = false,
  className,
}: Props) {
  const href = `/news/${article.slug}`;

  if (variant === "compact") {
    return (
      <article className={cn("group py-4", className)}>
        <p className="kicker text-cherry">{article.kicker}</p>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug">
          <Link href={href} className="headline-link">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 font-label text-[0.75rem] uppercase tracking-[0.14em] text-ink-faint">
          {formatShortDate(article.date)} &middot; {article.readMinutes} min read
        </p>
      </article>
    );
  }

  if (variant === "row") {
    return (
      <article
        className={cn(
          "group grid gap-4",
          article.image && "sm:grid-cols-[9rem_1fr]",
          className,
        )}
      >
        {article.image && (
          <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-newsprint-deep">
            <Image
              src={article.image}
              alt={article.imageAlt ?? ""}
              fill
              sizes="144px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </Link>
        )}
        <div>
          <p className="kicker text-herald">{sectionName(article.section)}</p>
          <h3 className="mt-1.5 font-display text-xl font-bold leading-snug">
            <Link href={href} className="headline-link">
              {article.title}
            </Link>
          </h3>
          <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-ink-muted">
            {article.deck}
          </p>
          <p className="mt-2.5 font-label text-[0.75rem] uppercase tracking-[0.14em] text-ink-faint">
            {article.byline} &middot; {formatShortDate(article.date)}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group flex h-full flex-col", className)}>
      {article.image && (
        <Link
          href={href}
          className="relative mb-4 block aspect-[16/10] overflow-hidden bg-newsprint-deep"
        >
          <Image
            src={article.image}
            alt={article.imageAlt ?? ""}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </Link>
      )}
      <p className="kicker text-cherry">{article.kicker}</p>
      <h3 className="mt-2 font-display text-2xl font-bold leading-[1.15]">
        <Link href={href} className="headline-link">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 font-body text-[0.98rem] leading-relaxed text-ink-muted">
        {article.deck}
      </p>
      <p className="mt-auto pt-4 font-label text-[0.75rem] uppercase tracking-[0.14em] text-ink-faint">
        {article.byline} &middot; {formatShortDate(article.date)}
      </p>
    </article>
  );
}
