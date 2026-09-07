import Link from "next/link";
import IssueContents from "@/components/IssueContents";
import IssueCover from "@/components/IssueCover";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { currentIssue, sortedIssues } from "@/data/archive";
import { legalNoticeRates, subscriptionRates } from "@/data/rates";
import { site } from "@/data/site";
import { asset, formatDate } from "@/lib/utils";

const inCounty = subscriptionRates[0];

export default function HomePage() {
  const recent = sortedIssues.slice(1, 5);

  return (
    <>
      {/* What this paper is. Stated before anything else, because the rest of
          the site only makes sense once a reader knows there are no stories
          to read here. */}
      <section className="border-b border-rule bg-newsprint-white">
        <div className="wrap py-8 text-center">
          <p className="kicker text-cherry">Print Only, Since {site.founded}</p>
          <p className="mx-auto mt-3 max-w-3xl font-display text-xl leading-relaxed sm:text-2xl">
            {site.printOnlyLong}
          </p>
        </div>
      </section>

      {/* This week's issue */}
      <section className="wrap pt-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Link
                href={`/archive/${currentIssue.date}`}
                className="block shadow-lift transition-transform duration-500 hover:-translate-y-1"
                aria-label={`This week's issue, ${currentIssue.label}`}
              >
                <IssueCover
                  date={currentIssue.date}
                  volume={currentIssue.volume}
                  number={currentIssue.number}
                />
              </Link>
              <div className="mt-5 space-y-2">
                <a href={asset(currentIssue.file)} className="btn-primary w-full text-xs" download>
                  Download the PDF ({currentIssue.sizeMb} MB)
                </a>
                <Link href="/subscribe" className="btn-outline w-full text-xs">
                  Subscribe &mdash; ${inCounty.price} a year
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <p className="kicker text-herald">In Mailboxes This Week</p>
              <h1 className="mt-2 font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">
                {formatDate(currentIssue.date)}
              </h1>
              <p className="mt-2 font-label text-[0.8rem] uppercase tracking-[0.14em] text-ink-faint">
                Vol. {currentIssue.volume} &middot; No. {currentIssue.number} &middot;{" "}
                {currentIssue.pages} pages
              </p>

              <div className="mt-8">
                <p className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  What&rsquo;s inside
                </p>
                <div className="mt-3">
                  <IssueContents contents={currentIssue.contents} />
                </div>
              </div>

              <p className="mt-5 font-body text-[0.92rem] italic text-ink-muted">
                {site.printOnly} Pick up a copy, subscribe, or download the edition as a PDF.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The three things the site is for */}
      <section className="wrap mt-20">
        <SectionHeading
          title="How We Can Help"
          blurb="Subscriptions, legal notices and local advertising are what keep a reporter in the room at the school board, the water district and the fire board."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal>
            <ServiceCard
              kicker="Subscribe"
              title="The paper, by mail, every week"
              price={`$${inCounty.price}`}
              blurb={`${inCounty.detail} Send a check to the PO Box, or start the order online and we will follow up.`}
              href="/subscribe"
              action="Start a Subscription"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ServiceCard
              kicker="Legal Notices"
              title="An adjudicated paper of general circulation"
              price={`From ${legalNoticeRates[0].price}`}
              blurb={`Adjudicated by the ${site.adjudication.court} in ${site.adjudication.date}, ${site.adjudication.decree}. We file your proof of publication at no extra cost.`}
              href="/legal-notices"
              action="Place a Notice"
            />
          </Reveal>
          <Reveal delay={0.16}>
            <ServiceCard
              kicker="Advertise"
              title="Reach the whole district in one place"
              price="Call for rates"
              blurb={`About ${site.reach.districtResidents} residents inside the school district, ${site.reach.townResidents} inside the town limits. Display, classified and insert advertising.`}
              href="/advertise"
              action="See Ad Sizes"
            />
          </Reveal>
        </div>
      </section>

      {/* Reader services */}
      <section className="mt-20 border-y-[3px] border-ink bg-herald text-newsprint-white">
        <div className="wrap py-14">
          <p className="kicker text-harvest-light">Submit to the Paper</p>
          <h2 className="mt-3 font-display text-3xl font-black leading-tight text-newsprint-white sm:text-[2.4rem]">
            Anyone in the district can put something in the Herald
          </h2>
          <div className="mt-9 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "Obituaries",
                href: "/obituaries",
                blurb: "Published at no charge for families in the district.",
                deadline: site.deadlines.obituary,
              },
              {
                title: "Community Calendar",
                href: "/calendar",
                blurb: "Meetings, fundraisers, school events and club nights. Free to list.",
                deadline: site.deadlines.classified,
              },
              {
                title: "Classifieds",
                href: "/classifieds",
                blurb: "Equipment, services, help wanted and things for sale.",
                deadline: site.deadlines.classified,
              },
            ].map((item, i) => (
              <Reveal key={item.href} delay={i * 0.08}>
                <h3 className="font-display text-xl font-bold text-newsprint-white">{item.title}</h3>
                <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-newsprint-deep/85">
                  {item.blurb}
                </p>
                <p className="mt-2 font-label text-[0.72rem] uppercase tracking-[0.14em] text-harvest-light">
                  Deadline: {item.deadline}
                </p>
                <Link
                  href={item.href}
                  className="mt-3 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-newsprint-white underline-offset-4 hover:underline"
                >
                  Submit &rarr;
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Past issues */}
      <section className="wrap mt-16">
        <SectionHeading
          title="Past Issues"
          href="/archive"
          action="Browse the archive"
          blurb="Recent editions are posted here as PDFs, free to download. Bound volumes of every issue since 1959 remain available for review at the Stockton Public Library."
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {recent.map((issue, i) => (
            <Reveal key={issue.date} delay={i * 0.06}>
              <Link
                href={`/archive/${issue.date}`}
                className="group block transition-transform duration-500 hover:-translate-y-1"
              >
                <IssueCover date={issue.date} volume={issue.volume} number={issue.number} />
                <p className="mt-3 font-display text-[0.95rem] font-bold leading-tight group-hover:text-herald">
                  {issue.label}
                </p>
                <p className="mt-0.5 font-label text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
                  {issue.pages} pages &middot; {issue.sizeMb} MB
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="wrap mt-20">
        <Reveal>
          <div className="border-[3px] border-ink bg-newsprint-white px-6 py-12 text-center sm:px-12">
            <p className="kicker text-cherry">Since {site.founded}</p>
            <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-black leading-tight sm:text-[2.6rem]">
              A weekly paper, written by people who live here
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-[1.02rem] leading-relaxed text-ink-muted">
              Our correspondents live and work in Linden. The phone is answered{" "}
              {site.phoneNote.toLowerCase()} &mdash; call us with a tip, a correction, or a notice
              you need published.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={site.phoneHref} className="btn-primary">
                Call {site.phone}
              </a>
              <Link href="/about" className="btn-outline">
                About the Herald
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
