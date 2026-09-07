import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import IssueContents from "@/components/IssueContents";
import IssueCover from "@/components/IssueCover";
import SectionHeading from "@/components/SectionHeading";
import { getIssue, issueNeighbors, issues } from "@/data/archive";
import { site, SITE_URL } from "@/data/site";
import { subscriptionRates } from "@/data/rates";
import { asset, formatDate } from "@/lib/utils";

type Params = { params: { date: string } };

export function generateStaticParams() {
  return issues.map((issue) => ({ date: issue.date }));
}

export function generateMetadata({ params }: Params): Metadata {
  const issue = getIssue(params.date);
  if (!issue) return {};

  const headlines = issue.contents
    .map((c) => c.title)
    .slice(0, 3)
    .join(" · ");
  return {
    title: `${issue.label} Issue`,
    description: `The Linden Herald for ${issue.label}: Vol. ${issue.volume}, No. ${issue.number}, ${issue.pages} pages. ${headlines}`,
    alternates: { canonical: `/archive/${issue.date}` },
  };
}

export default function IssuePage({ params }: Params) {
  const issue = getIssue(params.date);
  if (!issue) notFound();

  const { newer, older } = issueNeighbors(issue.date);
  const inCounty = subscriptionRates[0];

  return (
    <div className="wrap py-10">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
          <li>
            <Link href="/" className="hover:text-herald">
              Home
            </Link>
          </li>
          <li aria-hidden>&rsaquo;</li>
          <li>
            <Link href="/archive" className="hover:text-herald">
              Past Issues
            </Link>
          </li>
          <li aria-hidden>&rsaquo;</li>
          <li className="text-ink">{issue.label}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="shadow-lift">
            <IssueCover date={issue.date} volume={issue.volume} number={issue.number} />
          </div>
          <a href={asset(issue.file)} className="btn-primary mt-5 w-full text-xs" download>
            Download the PDF ({issue.sizeMb} MB)
          </a>
          <p className="mt-3 font-body text-[0.85rem] leading-relaxed text-ink-faint">
            The full page-for-page edition. These are large files. On a phone, downloading over
            wi-fi works better than opening them in the browser.
          </p>

          <dl className="mt-6 divide-y divide-rule border-y border-rule font-body text-[0.9rem]">
            {[
              ["Published", formatDate(issue.date)],
              ["Volume", `${issue.volume}`],
              ["Number", `${issue.number}`],
              ["Pages", `${issue.pages}`],
              ["File size", `${issue.sizeMb} MB`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-2.5">
                <dt className="font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
                  {label}
                </dt>
                <dd className="text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-8">
          <p className="kicker text-cherry">The Linden Herald</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] sm:text-[3.4rem]">
            {issue.label}
          </h1>
          <p className="mt-3 font-label text-[0.8rem] uppercase tracking-[0.14em] text-ink-faint">
            Vol. {issue.volume} &middot; No. {issue.number} &middot; {issue.pages} pages
          </p>
          <div className="rule-double mt-8" />

          <h2 className="mt-8 font-label text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            What ran in this issue
          </h2>
          <div className="mt-3">
            <IssueContents contents={issue.contents} />
          </div>

          <p className="mt-5 font-body text-[0.92rem] italic text-ink-muted">
            {site.printOnly} The headlines above are a table of contents. The reporting itself is in
            the pages.
          </p>

          <div className="mt-10 border-l-4 border-harvest bg-newsprint-white p-6">
            <p className="kicker text-harvest">Never miss an issue</p>
            <p className="mt-2 font-body text-[0.98rem] leading-relaxed text-ink-muted">
              {inCounty.detail} {inCounty.note}
            </p>
            <Link href="/subscribe" className="btn-primary mt-4 text-xs">
              Subscribe, ${inCounty.price} a year
            </Link>
          </div>
        </div>
      </div>

      {/* Nearby issues */}
      <nav aria-label="Nearby issues" className="mt-16 border-t-[3px] border-ink pt-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {older ? (
            <Link href={`/archive/${older.date}`} className="group block">
              <p className="font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
                &larr; Previous issue
              </p>
              <p className="mt-1 font-display text-xl font-bold group-hover:text-herald">
                {older.label}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/archive/${newer.date}`} className="group block sm:text-right">
              <p className="font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
                Next issue &rarr;
              </p>
              <p className="mt-1 font-display text-xl font-bold group-hover:text-herald">
                {newer.label}
              </p>
            </Link>
          )}
        </div>
      </nav>

      <section className="mt-16">
        <SectionHeading title="Looking for another week?" href="/archive" action="All issues" />
        <p className="max-w-2xl font-body text-[0.98rem] leading-relaxed text-ink-muted">
          Copies going back to {site.founded} can be reviewed at the Stockton Public Library. If you
          need a week that is not posted here, call the office at{" "}
          <a href={site.phoneHref} className="link-underline underline">
            {site.phone}
          </a>{" "}
          and we will pull it.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PublicationIssue",
            issueNumber: issue.number,
            datePublished: issue.date,
            name: `The Linden Herald, ${issue.label}`,
            url: `${SITE_URL}/archive/${issue.date}`,
            isPartOf: {
              "@type": "Periodical",
              name: site.name,
              issn: undefined,
            },
          }),
        }}
      />
    </div>
  );
}
