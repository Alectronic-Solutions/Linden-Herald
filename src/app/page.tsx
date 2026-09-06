import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import ParallaxHero from "@/components/ParallaxHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { articles, articlesBySection, latestArticles } from "@/data/articles";
import { obituaries } from "@/data/obituaries";
import { issues } from "@/data/archive";
import { legalNoticeRates } from "@/data/rates";
import { site } from "@/data/site";
import { formatDate, formatShortDate } from "@/lib/utils";

export default function HomePage() {
  const [lead, ...rest] = latestArticles;
  const secondary = rest.slice(0, 2);
  const moreThisWeek = rest.slice(2, 5);
  const agriculture = articlesBySection("agriculture").slice(0, 2);
  const sports = articlesBySection("sports").slice(0, 1);
  const opinion = articlesBySection("opinion").slice(0, 1);
  const currentIssue = issues[0];
  const ticker = articles.slice(0, 6).map((a) => a.title);

  return (
    <>
      {/* Wire ticker */}
      <div className="no-print overflow-hidden border-b border-rule bg-newsprint-white py-2">
        <div className="flex items-center gap-6">
          <span className="kicker shrink-0 bg-cherry px-3 py-1 text-newsprint-white">
            This Week
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
              {[...ticker, ...ticker].map((t, i) => (
                <span
                  key={i}
                  className="font-body text-[0.9rem] text-ink-muted before:mr-10 before:text-harvest before:content-['\25C6']"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ParallaxHero article={lead} />

      {/* Front page */}
      <section className="wrap pt-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Lead well */}
          <div className="lg:col-span-8 lg:border-r lg:border-rule lg:pr-8">
            <div className="grid gap-8 sm:grid-cols-2 sm:divide-x sm:divide-rule">
              {secondary.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.08} className={i === 1 ? "sm:pl-8" : ""}>
                  <StoryCard article={a} priority={i === 0} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right rail */}
          <aside className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="border border-ink bg-newsprint-white p-6">
                <p className="kicker text-herald">In Print This Week</p>
                <p className="mt-2 font-display text-2xl font-bold leading-tight">
                  {formatDate(currentIssue.date)}
                </p>
                <p className="mt-1 font-label text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">
                  Vol. {currentIssue.volume} &middot; No. {currentIssue.number} &middot;{" "}
                  {currentIssue.pages} pages
                </p>
                <ul className="mt-4 space-y-2 border-t border-rule pt-4 font-body text-[0.95rem] text-ink-muted">
                  {currentIssue.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span aria-hidden className="text-harvest">
                        &#9670;
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <Link href="/archive" className="btn-primary mt-5 w-full text-xs">
                  Read the E-Edition
                </Link>
                <Link href="/subscribe" className="btn-outline mt-2 w-full text-xs">
                  Subscribe &mdash; $42 a year
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8">
                <SectionHeading title="Also This Week" />
                <div className="divide-y divide-rule">
                  {rest.slice(0, 5).map((a) => (
                    <StoryCard key={a.slug} article={a} variant="compact" />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 border-l-4 border-harvest bg-newsprint-white p-5">
                <p className="kicker text-harvest">Legal Notices</p>
                <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-ink-muted">
                  Adjudicated by the {site.adjudication.court} in{" "}
                  {site.adjudication.date}, {site.adjudication.decree}. Fictitious business names
                  from {legalNoticeRates[0].price}, with proof of publication filed at no extra
                  cost.
                </p>
                <Link
                  href="/advertise#legal-notices"
                  className="mt-3 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
                >
                  Place a notice &rarr;
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* More this week */}
      <section className="wrap mt-16">
        <SectionHeading title="More From This Week" href="/news" action="All stories" />
        <div className="grid gap-10 md:grid-cols-3">
          {moreThisWeek.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <StoryCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* E-edition band */}
      <section className="mt-20 border-y-[3px] border-ink bg-herald text-newsprint-white">
        <div className="wrap grid items-center gap-10 py-14 md:grid-cols-2 md:py-18">
          <Reveal>
            <p className="kicker text-harvest-light">New: The Herald E-Edition</p>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-newsprint-white sm:text-[2.6rem]">
              Every issue, searchable, from any device
            </h2>
            <p className="mt-4 max-w-lg font-body text-[1.02rem] leading-relaxed text-newsprint-deep/85">
              The full page-for-page edition, posted the morning it hits mailboxes. Search back
              issues by date, browse by year, and download the pages you want to keep. Bound
              volumes going back to {site.founded} remain available at the Stockton Public Library.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/archive"
                className="btn bg-newsprint-white px-6 py-3 text-ink hover:bg-harvest-light"
              >
                Browse the Archive
              </Link>
              <Link
                href="/subscribe"
                className="btn border border-newsprint-white/40 px-6 py-3 text-newsprint-white hover:bg-newsprint-white hover:text-ink"
              >
                Subscribe
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="grid grid-cols-3 gap-4">
              {issues.slice(0, 3).map((issue) => (
                <div
                  key={issue.date}
                  className="aspect-[3/4] border border-newsprint-white/25 bg-newsprint-white/95 p-3 text-ink shadow-lift transition-transform duration-500 hover:-translate-y-1"
                >
                  <p className="font-display text-[0.62rem] font-black leading-tight">
                    The Linden Herald
                  </p>
                  <div className="mt-1 h-px w-full bg-ink/30" />
                  <p className="mt-1.5 font-label text-[0.55rem] uppercase tracking-wider text-ink-faint">
                    {formatShortDate(issue.date)}
                  </p>
                  <div className="mt-2 space-y-1" aria-hidden>
                    <div className="h-1 w-full bg-ink/20" />
                    <div className="h-1 w-4/5 bg-ink/15" />
                    <div className="mt-2 h-8 w-full bg-ink/10" />
                    <div className="h-1 w-full bg-ink/15" />
                    <div className="h-1 w-3/4 bg-ink/10" />
                    <div className="h-1 w-5/6 bg-ink/10" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section rails */}
      <section className="wrap mt-16 grid gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <SectionHeading
            title="Agriculture"
            href="/news?section=agriculture"
            action="More"
            blurb="Cherries, walnuts, water and the growing season, reported from the orchard rows."
          />
          <div className="space-y-8">
            {agriculture.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <StoryCard article={a} variant="row" />
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading
            title="Sports & Opinion"
            href="/news?section=sports"
            action="More"
            blurb="Friday nights at Linden High, and the editorial page."
          />
          <div className="space-y-8">
            {[...sports, ...opinion].map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <StoryCard article={a} variant="row" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Obituaries */}
      <section className="wrap mt-16">
        <SectionHeading
          title="Obituaries"
          href="/obituaries"
          action="All notices"
          blurb="Notices are published at no charge for families in the district."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {obituaries.map((o, i) => (
            <Reveal key={o.slug} delay={i * 0.08}>
              <article className="h-full border-t-2 border-ink bg-newsprint-white p-5">
                <p className="font-display text-xl font-bold leading-tight">{o.name}</p>
                <p className="mt-1 font-label text-[0.76rem] uppercase tracking-[0.14em] text-ink-faint">
                  {o.years} &middot; {o.town}
                </p>
                <p className="mt-3 font-body text-[0.93rem] leading-relaxed text-ink-muted">
                  {o.summary}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="wrap mt-20">
        <Reveal>
          <div className="border-[3px] border-ink bg-newsprint-white px-6 py-12 text-center sm:px-12">
            <p className="kicker text-cherry">Support Local Reporting</p>
            <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-black leading-tight sm:text-[2.75rem]">
              Fifty-two issues a year, delivered to your mailbox for $42
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-[1.02rem] leading-relaxed text-ink-muted">
              Subscriptions and local advertising are what keep a reporter in the room at the
              school board, the water district and the fire board. Thank you for keeping the
              Herald printing.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/subscribe" className="btn-primary">
                Start a Subscription
              </Link>
              <a href={site.phoneHref} className="btn-outline">
                Call {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
