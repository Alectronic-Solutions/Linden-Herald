import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StoryCard from "@/components/StoryCard";
import ReadingProgress from "@/components/ReadingProgress";
import { articles, getArticle } from "@/data/articles";
import { sectionName, site, SITE_URL } from "@/data/site";
import { asset, formatDate } from "@/lib/utils";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: "Story not found" };
  return {
    title: article.title,
    description: article.deck,
    openGraph: { title: article.title, description: article.deck, type: "article" },
  };
}

export default function ArticlePage({ params }: Params) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  // Prefer stories from the same section, then top up to three with the latest.
  const sameSection = articles.filter(
    (a) => a.slug !== article.slug && a.section === article.section,
  );
  const others = articles.filter(
    (a) => a.slug !== article.slug && a.section !== article.section,
  );
  const more = [...sameSection, ...others].slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.deck,
    datePublished: article.date,
    author: { "@type": "Organization", name: article.byline },
    publisher: { "@type": "NewsMediaOrganization", name: site.name },
    articleSection: sectionName(article.section),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Front Page", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: sectionName(article.section),
        item: `${SITE_URL}/news`,
      },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  };

  return (
    <article className="wrap py-10">
      <ReadingProgress />
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          href={`/news?section=${article.section}`}
          className="font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
        >
          &larr; {sectionName(article.section)}
        </Link>
      </nav>

      <header className="mx-auto max-w-3xl text-center">
        <p className="kicker text-cherry">{article.kicker}</p>
        <h1 className="mt-3 font-display text-[2.3rem] font-black leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">
          {article.title}
        </h1>
        <p className="mt-5 font-display text-lg italic leading-relaxed text-ink-muted sm:text-xl">
          {article.deck}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-y border-rule py-3 font-label text-[0.76rem] uppercase tracking-[0.16em] text-ink-faint">
          <span>By {article.byline}</span>
          <span aria-hidden>&middot;</span>
          <span>{formatDate(article.date)}</span>
          <span aria-hidden>&middot;</span>
          <span>{article.readMinutes} min read</span>
        </div>
      </header>

      {article.image && (
        <figure className="mx-auto mt-10 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden bg-newsprint-deep">
            <Image
              src={asset(article.image)}
              alt={article.imageAlt ?? ""}
              fill
              priority
              sizes="(min-width: 1024px) 60rem, 96vw"
              className="object-cover"
            />
          </div>
          {article.credit && (
            <figcaption className="mt-2 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
              {article.credit}
            </figcaption>
          )}
        </figure>
      )}

      <div className="prose-herald mx-auto mt-12 max-w-column">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <aside className="mx-auto mt-12 max-w-column border-l-4 border-harvest bg-newsprint-white p-6">
        <p className="kicker text-harvest">From the Newsroom</p>
        <p className="mt-2 font-body text-[0.98rem] leading-relaxed text-ink-muted">
          Have a correction, a photograph or a tip on this story? The Herald&apos;s correspondents
          live and work in Linden. Call {site.phone} any hour, or{" "}
          <Link href="/contact" className="underline link-underline">
            send a note
          </Link>
          .
        </p>
      </aside>

      <section className="mt-20">
        <div className="rule-double mb-6" />
        <h2 className="mb-8 font-display text-2xl font-black uppercase tracking-[0.06em]">
          More From the Herald
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {more.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </article>
  );
}
