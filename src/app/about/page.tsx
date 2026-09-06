import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactCard from "@/components/ContactCard";
import { site, sections } from "@/data/site";
import { staff } from "@/data/staff";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Linden Herald has published weekly in the farming community of Linden, California since 1959, reported by correspondents who live and work in the district.",
};

export default function AboutPage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="Since 1959"
        title="About the Herald"
        blurb="A print newspaper, written and reported in the traditional manner, by people who live here."
      />

      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <section>
            <h2 className="font-display text-2xl font-black drop-rule">Who we are</h2>
            <p className="mt-5 font-body text-[1.05rem] leading-[1.75] text-ink-soft">
              We are a team of working journalists with a combined total of more than{" "}
              {site.reach.combinedExperience} years in the community newspaper business. The Herald
              is a print newspaper, written and reported the traditional way: somebody sits in the
              room, takes the notes, and writes it down.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-black drop-rule">The masthead</h2>
            <p className="mt-5 font-body text-[1.05rem] leading-[1.75] text-ink-soft">
              The people who report, edit and sell this paper, and what each of them covers.
            </p>
            <ul className="mt-7 divide-y divide-rule border-y border-rule">
              {staff.map((person) => (
                <li key={person.role} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4">
                  <p className="font-display text-lg font-bold">{person.name}</p>
                  <p className="font-label text-[0.76rem] uppercase tracking-[0.14em] text-herald">
                    {person.role}
                  </p>
                  <p className="w-full font-body text-[0.93rem] text-ink-muted">{person.beat}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-black drop-rule">What we publish</h2>
            <p className="mt-5 font-body text-[1.05rem] leading-[1.75] text-ink-soft">
              The Linden Herald was established in {site.founded} in the central part of California,
              in the farming community of Linden. It is published weekly and carries local news,
              sports, club photographs, agricultural news, regional travel stories, editorials,
              history, school board meetings, water districts, sheriff and fire calls, local
              advertising and legal notices.
            </p>
            <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {sections.map((s) => (
                <li key={s.slug} className="border-t border-rule pt-3">
                  <Link
                    href={`/news?section=${s.slug}`}
                    className="font-display text-lg font-bold headline-link"
                  >
                    {s.name}
                  </Link>
                  <p className="mt-1 font-body text-[0.92rem] leading-relaxed text-ink-muted">
                    {s.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-black drop-rule">A newspaper of general circulation</h2>
            <p className="mt-5 font-body text-[1.05rem] leading-[1.75] text-ink-soft">
              The {site.adjudication.court} issued decree {site.adjudication.decree} in{" "}
              {site.adjudication.date} adjudicating the Linden Herald as a newspaper of general
              circulation. We can publish most legal notices, including fictitious business names,
              change of name petitions, family law matters, trustee sales and court summons, at
              rates that are competitive with the county&apos;s larger papers.
            </p>
            <Link href="/advertise#legal-notices" className="btn-primary mt-6">
              See Legal Notice Rates
            </Link>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-black drop-rule">Where we are</h2>
            <p className="mt-5 font-body text-[1.05rem] leading-[1.75] text-ink-soft">
              Linden sits fifteen miles east of the edge of a major metropolitan area, with
              Stockton, Tracy and Manteca to the west, the state capital an hour north, and the San
              Francisco Bay Area a two hour drive away. About {site.reach.districtResidents}{" "}
              residents live inside the school district, and roughly {site.reach.townResidents} live
              within the town limits. Our correspondents live and work in Linden and are available
              at any time.
            </p>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <Reveal>
            <div className="border border-ink bg-newsprint-white p-7">
              <p className="kicker text-herald">The Herald at a glance</p>
              <dl className="mt-5 divide-y divide-rule">
                {[
                  ["Founded", String(site.founded)],
                  ["Published", "Weekly, Thursdays"],
                  ["Format", "Print, with a digital e-edition"],
                  ["Adjudicated", `${site.adjudication.decree}, ${site.adjudication.date}`],
                  ["Coverage area", "Linden, Waverly and eastern San Joaquin County"],
                  ["Subscription", "$42 a year, 52 issues"],
                ].map(([term, value]) => (
                  <div key={term} className="flex justify-between gap-4 py-3">
                    <dt className="font-label text-[0.76rem] uppercase tracking-[0.14em] text-ink-faint">
                      {term}
                    </dt>
                    <dd className="text-right font-body text-[0.95rem] font-semibold text-ink">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactCard variant="compact" className="mt-6" />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6 border border-rule-strong bg-newsprint-white p-6">
              <p className="kicker text-harvest">The bound volumes</p>
              <p className="mt-2 font-body text-[0.96rem] leading-relaxed text-ink-muted">
                Copies of the Herald dating to {site.founded} are available for review at the
                Stockton Public Library. Recent issues are posted here as PDFs.
              </p>
              <Link
                href="/archive"
                className="mt-3 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
              >
                Browse the archive &rarr;
              </Link>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
