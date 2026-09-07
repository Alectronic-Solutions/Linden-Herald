import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoryCard from "@/components/StoryCard";
import SectionHeading from "@/components/SectionHeading";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { articlesBySection, latestArticles } from "@/data/articles";
import { sections, SITE_URL } from "@/data/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const section = sections.find((s) => s.slug === params.slug);
  if (!section) return { title: "Section not found" };
  return {
    title: section.name,
    description: section.blurb,
    alternates: { canonical: `/section/${section.slug}` },
    openGraph: { title: `${section.name} | The Linden Herald`, description: section.blurb },
  };
}

export default function SectionPage({ params }: Params) {
  const section = sections.find((s) => s.slug === params.slug);
  if (!section) notFound();

  const stories = articlesBySection(section.slug).sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = stories;
  const elsewhere = latestArticles.filter((a) => a.section !== section.slug).slice(0, 4);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: section.name,
    description: section.blurb,
    url: `${SITE_URL}/section/${section.slug}`,
  };

  return (
    <div className="wrap py-10">
      <PageHeader kicker="Section" title={section.name} blurb={section.blurb} />

      {stories.length === 0 ? (
        <p className="border border-rule bg-newsprint-white p-8 font-body text-ink-muted">
          Nothing filed in this section yet this week. The printed edition carries the full report.
        </p>
      ) : (
        <>
          <Reveal>
            <article className="grid gap-8 border-b border-rule pb-10 lg:grid-cols-12">
              <div className={lead.image ? "lg:col-span-7" : "lg:col-span-12"}>
                <p className="kicker text-cherry">{lead.kicker}</p>
                <h2 className="mt-2 font-display text-[2rem] font-black leading-[1.06] sm:text-[2.6rem]">
                  <Link href={`/news/${lead.slug}`} className="headline-link">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-2xl font-display text-lg leading-relaxed text-ink-muted">
                  {lead.deck}
                </p>
                <p className="mt-4 font-label text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
                  {lead.byline} &middot; {lead.readMinutes} min read
                </p>
              </div>
              {lead.image && (
                <div className="lg:col-span-5">
                  <StoryCard article={lead} priority className="[&>p]:hidden [&>h3]:hidden" />
                </div>
              )}
            </article>
          </Reveal>

          {rest.length > 0 && (
            <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, i) => (
                <Reveal key={a.slug} delay={(i % 3) * 0.07}>
                  <StoryCard article={a} />
                </Reveal>
              ))}
            </div>
          )}
        </>
      )}

      <section className="mt-20">
        <SectionHeading title="Elsewhere in the Herald" href="/news" action="All sections" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {elsewhere.map((a) => (
            <StoryCard key={a.slug} article={a} variant="compact" />
          ))}
        </div>
      </section>

      <nav aria-label="Sections" className="mt-16 border-t-[3px] border-ink pt-6">
        <h2 className="kicker text-herald">Every section</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {sections.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/section/${s.slug}`}
                aria-current={s.slug === section.slug ? "page" : undefined}
                className={
                  s.slug === section.slug
                    ? "font-label text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-herald"
                    : "font-label text-[0.8rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
                }
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
