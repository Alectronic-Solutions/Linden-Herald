import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import HeraldForm from "@/components/HeraldForm";
import ContactCard from "@/components/ContactCard";
import LegalNoticeEstimator from "@/components/LegalNoticeEstimator";
import { Field, Select, TextArea } from "@/components/Field";
import { legalNoticeRates } from "@/data/rates";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Legal Notices",
  description:
    "Publish a legal notice in the Linden Herald, an adjudicated newspaper of general circulation in San Joaquin County since 1960. Fictitious business names from $105. We file the proof of publication at no extra cost.",
  path: "/legal-notices",
  image: "/og/advertise.jpg",
});

export default function LegalNoticesPage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="Newspaper of general circulation"
        title="Legal Notices"
        blurb="We publish most legal notices for San Joaquin County. Our prices are competitive, and we file your proof of publication with the court or the recorder at no extra cost."
      />

      {/* The credential goes first. It is what qualifies us to run the notice at
          all, and it is the first thing an attorney checks. */}
      <section className="border-b-[3px] border-ink pb-10">
        <div className="border-l-4 border-herald bg-newsprint-white p-6 sm:p-8">
          <p className="kicker text-herald">Adjudicated {site.adjudication.date}</p>
          <p className="mt-3 max-w-3xl font-display text-xl leading-relaxed sm:text-2xl">
            The {site.adjudication.court} issued decree {site.adjudication.decree} establishing The
            Linden Herald as a newspaper of general circulation.
          </p>
          <p className="mt-4 max-w-3xl font-body text-[1rem] leading-relaxed text-ink-muted">
            A notice published here satisfies the publication requirement in your filing. We have
            published every week since {site.founded}.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Proof filed for you",
              body: "We file the proof with the San Joaquin County Court or the County Recorder at no extra cost. We then issue another copy to the petitioner or registrant.",
            },
            {
              title: "Competitive rates",
              body: "Every rate we charge is published below. The only exception is trustee sales, which are priced by the column inch.",
            },
            {
              title: `Deadline: ${site.deadlines.legal}`,
              body: "Copy received by the deadline runs in that Thursday's edition. If your court date is tight, call us and we will work backward from it.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="font-display text-lg font-bold leading-tight">{item.title}</h2>
              <p className="mt-2 font-body text-[1rem] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Estimator */}
      <section className="mt-14">
        <LegalNoticeEstimator />
      </section>

      {/* Full rate reference */}
      <section className="mt-14">
        <div className="rule-double mb-6" />
        <h2 className="font-display text-3xl font-black">Every notice we publish</h2>
        <p className="mt-3 max-w-3xl font-body text-[1.05rem] leading-relaxed text-ink-muted">
          If what you need is not listed, call {site.phone}. The phone is{" "}
          {site.phoneNote.toLowerCase()}.
        </p>

        <div className="mt-8 overflow-x-auto border border-ink">
          <table className="w-full min-w-[42rem] border-collapse bg-newsprint-white text-left">
            <caption className="sr-only">Legal notice publication rates</caption>
            <thead>
              <tr className="bg-ink text-newsprint-white">
                {["Notice Type", "Rate", "Runs For", "Detail"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-3 font-label text-[0.8rem] uppercase tracking-[0.16em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {legalNoticeRates.map((r) => (
                <tr key={r.id} className="align-top transition-colors hover:bg-newsprint">
                  <th scope="row" className="px-4 py-4 font-display text-[1.05rem] font-bold">
                    {r.type}
                  </th>
                  <td className="whitespace-nowrap px-4 py-4 font-display text-xl font-black text-herald">
                    {r.price}
                  </td>
                  <td className="px-4 py-4 font-body text-[1rem] leading-snug text-ink-muted">
                    {r.runWeeks}
                  </td>
                  <td className="px-4 py-4 font-body text-[1rem] leading-relaxed text-ink-muted">
                    {r.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-label text-[0.8rem] uppercase tracking-[0.14em] text-ink-faint">
          Additional names $10 each. Call {site.phone} for anything not listed.
        </p>
      </section>

      {/* What to bring. Already in the data, previously never rendered. */}
      <section className="mt-16">
        <div className="rule-double mb-6" />
        <h2 className="font-display text-3xl font-black">What to have in front of you</h2>
        <p className="mt-3 max-w-3xl font-body text-[1.05rem] leading-relaxed text-ink-muted">
          Notices are rejected for small mistakes. A name spelled differently than the filing will
          do it, or a missing case number. Have these ready and we can usually start the run the
          same week.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {legalNoticeRates.map((r) => (
            <div key={r.id} className="h-full border-t-2 border-ink bg-newsprint-white p-5">
              <h3 className="font-display text-lg font-bold leading-tight">{r.type}</h3>
              <p className="mt-1 font-label text-[0.8rem] uppercase tracking-[0.14em] text-ink-faint">
                {r.price} &middot; {r.runWeeks}
              </p>
              <ul className="mt-4 space-y-2 border-t border-rule pt-4 font-body text-[1rem] leading-relaxed text-ink-muted">
                {r.bring.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden className="text-harvest">
                      &#9670;
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Request form */}
      <section id="notice-request" className="mt-16 grid gap-12 scroll-mt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rule-double mb-6" />
          <h2 className="font-display text-3xl font-black">Start a notice</h2>
          <p className="mt-3 max-w-xl font-body text-[1rem] leading-relaxed text-ink-muted">
            Tell us what you are filing and we will confirm the price and the publication dates. If
            you are working against a court date, say so and we will work backward from it.
          </p>
          <div className="mt-8">
            <HeraldForm subject="Legal notice request" submitLabel="Send Request">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" autoComplete="name" label="Your name" required />
                <Field name="business" autoComplete="organization" label="Business or firm" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  label="Phone"
                  type="tel"
                  required
                />
                <Field
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  label="Email"
                  type="email"
                  required
                />
              </div>
              <Select
                name="notice_type"
                label="Type of notice"
                required
                options={[...legalNoticeRates.map((r) => r.type), "Something else"]}
              />
              <Field name="needed_by" label="Court date or filing deadline" type="date" />
              <TextArea
                name="details"
                label="Details"
                required
                rows={6}
                placeholder="Case number, business names exactly as filed, owner names, run dates, or the notice text itself."
              />
            </HeraldForm>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <ContactCard variant="full" heading="Talk to a person" />
          <div className="mt-6 border-l-4 border-harvest bg-newsprint-white p-6">
            <p className="kicker text-harvest">Proof of publication, filed for you</p>
            <p className="mt-2 font-body text-[1rem] leading-relaxed text-ink-muted">
              We file the proof with the San Joaquin County Court or the County Recorder at no extra
              cost, and issue another copy to the petitioner or registrant. That is one less errand
              on a filing deadline.
            </p>
          </div>
          <div className="mt-6 border border-rule bg-newsprint-white p-6">
            <p className="kicker text-cherry">Also advertising?</p>
            <p className="mt-2 font-body text-[1rem] leading-relaxed text-ink-muted">
              Display and classified advertising rates are on the advertising page, along with the
              sizes and the deadlines.
            </p>
            <Link
              href="/advertise"
              className="mt-3 inline-block font-label text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
            >
              Advertise with the Herald &rarr;
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
