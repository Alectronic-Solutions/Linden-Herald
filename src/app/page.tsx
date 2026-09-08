import Link from "next/link";
import IssueContents from "@/components/IssueContents";
import IssueCover from "@/components/IssueCover";
import SectionHeading from "@/components/SectionHeading";
import { currentIssue, sortedIssues } from "@/data/archive";
import { legalNoticeRates, subscriptionRates } from "@/data/rates";
import { site } from "@/data/site";
import { asset, formatDate, formatFileSize } from "@/lib/utils";

const inCounty = subscriptionRates[0];

/** Three columns divided by rules, the way a printed page divides them. */
const columns = "grid gap-8 divide-y divide-rule sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-y-0";
const column = "sm:px-6 sm:first:pl-0 sm:last:pr-0 pt-8 first:pt-0 sm:pt-0";

export default function HomePage() {
  const recent = sortedIssues.slice(1, 5);

  return (
    <>
      <section className="wrap pt-10">
        <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">
          Welcome to LindenHerald.com
        </h1>
        <div className="mt-5 max-w-2xl space-y-4 font-body text-[1.05rem] leading-[1.7] text-ink-soft">
          <p>
            The Linden Herald was established in 1959 in the farming community of Linden, in the
            central part of California. We publish every Thursday.
          </p>
          <p>
            We are a print newspaper. Our stories run in the paper and are not posted on this site.
            You can subscribe below, or download a past issue as a PDF.
          </p>
        </div>
        <div className="rule-double mt-8" />
      </section>

      <section className="wrap mt-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Link href={`/archive/${currentIssue.date}`} className="block">
              <IssueCover
                date={currentIssue.date}
                volume={currentIssue.volume}
                number={currentIssue.number}
              />
            </Link>
            <div className="mt-5 space-y-2">
              <a href={asset(currentIssue.file)} className="btn-primary w-full text-xs" download>
                Download the PDF ({formatFileSize(currentIssue.sizeBytes)})
              </a>
              <Link href="/subscribe" className="btn-outline w-full text-xs">
                Subscribe, ${inCounty.price} a year
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="kicker text-cherry">In mailboxes this week</p>
            <h2 className="mt-2 font-display text-3xl font-black leading-tight sm:text-[2.6rem]">
              {formatDate(currentIssue.date)}
            </h2>
            <p className="mt-2 font-label text-[0.8rem] uppercase tracking-[0.14em] text-ink-faint">
              Vol. {currentIssue.volume} &middot; No. {currentIssue.number} &middot;{" "}
              {currentIssue.pages} pages
            </p>

            <h3 className="mt-8 font-label text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              What is in it
            </h3>
            <div className="mt-3">
              <IssueContents contents={currentIssue.contents} />
            </div>

            <p className="mt-5 font-body text-[0.95rem] text-ink-muted">
              The stories themselves are in the paper. Subscribe, or download this issue as a PDF.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap mt-16">
        <SectionHeading title="Services" blurb="Subscriptions and advertising pay for the paper." />
        <div className={columns}>
          <div className={column}>
            <h3 className="font-display text-xl font-bold">Subscribe</h3>
            <p className="mt-2 font-display text-3xl font-black text-herald">
              ${inCounty.price} a year
            </p>
            <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-ink-muted">
              Fifty-two issues, delivered by mail within San Joaquin County. The rate has been $
              {inCounty.price} since January 2023. Send a check, or start the order online.
            </p>
            <Link
              href="/subscribe"
              className="mt-4 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
            >
              Subscribe &rarr;
            </Link>
          </div>

          <div className={column}>
            <h3 className="font-display text-xl font-bold">Legal notices</h3>
            <p className="mt-2 font-display text-3xl font-black text-herald">
              From {legalNoticeRates[0].price}
            </p>
            <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-ink-muted">
              We are a newspaper of general circulation, adjudicated by the{" "}
              {site.adjudication.court} in {site.adjudication.date}. We file your proof of
              publication at no extra cost.
            </p>
            <Link
              href="/legal-notices"
              className="mt-4 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
            >
              Rates and requirements &rarr;
            </Link>
          </div>

          <div className={column}>
            <h3 className="font-display text-xl font-bold">Advertise</h3>
            <p className="mt-2 font-display text-3xl font-black text-herald">Call for rates</p>
            <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-ink-muted">
              About {site.reach.districtResidents} people live inside the school district. About{" "}
              {site.reach.townResidents} live inside the town limits. Display and classified
              advertising are both available.
            </p>
            <Link
              href="/advertise"
              className="mt-4 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
            >
              Ad sizes and deadlines &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap mt-16">
        <SectionHeading
          title="Submitting to the paper"
          blurb="Anyone who lives or works in the district can put a notice in the paper."
        />
        <div className={columns}>
          <div className={column}>
            <h3 className="font-display text-xl font-bold">Obituaries</h3>
            <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-ink-muted">
              There is no charge for a standard notice. Send what you have and we will call to
              confirm the details before anything is printed.
            </p>
            <p className="mt-3 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
              Deadline: {site.deadlines.obituary}
            </p>
            <Link
              href="/obituaries"
              className="mt-3 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
            >
              Submit a notice &rarr;
            </Link>
          </div>

          <div className={column}>
            <h3 className="font-display text-xl font-bold">Community calendar</h3>
            <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-ink-muted">
              No charge for community events. Send the date, the place, and who to call for more
              information.
            </p>
            <p className="mt-3 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
              Deadline: {site.deadlines.classified}
            </p>
            <Link
              href="/calendar"
              className="mt-3 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
            >
              List an event &rarr;
            </Link>
          </div>

          <div className={column}>
            <h3 className="font-display text-xl font-bold">Classifieds</h3>
            <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-ink-muted">
              Priced by the line, about seven words to a line. Write it however it comes and we will
              set it.
            </p>
            <p className="mt-3 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
              Deadline: {site.deadlines.classified}
            </p>
            <Link
              href="/classifieds"
              className="mt-3 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
            >
              Place a listing &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap mt-16 pb-4">
        <SectionHeading
          title="Past issues"
          href="/archive"
          action="Browse the archive"
          blurb="Recent issues are posted here as PDFs. Copies going back to 1959 can be reviewed at the Stockton Public Library."
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {recent.map((issue) => (
            <Link key={issue.date} href={`/archive/${issue.date}`} className="group block">
              <IssueCover date={issue.date} volume={issue.volume} number={issue.number} />
              <p className="mt-3 font-display text-[0.95rem] font-bold leading-tight group-hover:text-herald">
                {issue.label}
              </p>
              <p className="mt-0.5 font-label text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
                {issue.pages} pages &middot; {formatFileSize(issue.sizeBytes)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
