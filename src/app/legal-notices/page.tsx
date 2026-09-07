import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import HeraldForm from "@/components/HeraldForm";
import ContactCard from "@/components/ContactCard";
import LegalNoticeEstimator from "@/components/LegalNoticeEstimator";
import { Field, Select, TextArea } from "@/components/Field";
import { legalNoticeRates } from "@/data/rates";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Legal Notices",
  description:
    "Publish legal notices in the Linden Herald, an adjudicated newspaper of general circulation in San Joaquin County since 1960. Fictitious business names, name changes, summons, family law and trustee sales. Proof of publication filed at no extra cost.",
  alternates: { canonical: "/legal-notices" },
  openGraph: {
    images: [{ url: "/og/advertise.jpg", width: 1200, height: 630 }],
  },
};

export default function LegalNoticesPage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="Newspaper of general circulation"
        title="Legal Notices"
        blurb="We publish most legal notices for San Joaquin County at competitive rates, and file your proof of publication with the court or recorder at no additional cost."
      />

      {/* The credential, stated first — it is the thing that qualifies us to
          run the notice at all, and the first thing an attorney checks. */}
      <section className="border-b-[3px] border-ink pb-10">
        <Reveal>
          <div className="border-l-4 border-herald bg-newsprint-white p-6 sm:p-8">
            <p className="kicker text-herald">Adjudicated {site.adjudication.date}</p>
            <p className="mt-3 max-w-3xl font-display text-xl leading-relaxed sm:text-2xl">
              The {site.adjudication.court} issued decree {site.adjudication.decree} establishing
              The Linden Herald as a newspaper of general circulation.
            </p>
            <p className="mt-4 max-w-3xl font-body text-[1rem] leading-relaxed text-ink-muted">
              That decree is what allows a notice published here to satisfy the publication
              requirement in your filing. We have been publishing weekly, without interruption,
              since {site.founded}.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Proof filed for you",
              body: "We file the proof of publication with the San Joaquin County Court or the County Recorder at no additional cost, then issue another copy to the petitioner or registrant.",
            },
            {
              title: "Competitive rates",
              body: "Every rate we charge is published below. Nothing is quoted only on request except trustee sales, which are priced by column inch.",
            },
            {
              title: `Deadline: ${site.deadlines.legal}`,
              body: "Copy received by the deadline runs in that Thursday's edition. Call if your court date is tight and we will work backward from it.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <h2 className="font-display text-lg font-bold leading-tight">{item.title}</h2>
              <p className="mt-2 font-body text-[0.94rem] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </Reveal>
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
        <p className="mt-3 max-w-3xl font-body text-[1.02rem] leading-relaxed text-ink-muted">
          If what you need is not listed, call {site.phone} &mdash; the phone is answered{" "}
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
                    className="px-4 py-3 font-label text-[0.76rem] uppercase tracking-[0.16em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {legalNoticeRates.map((r) => (
                <tr key={r.id} className="align-top transition-colors hover:bg-newsprint">
                  <th scope="row" className="px-4 py-4 font-display text-[1.02rem] font-bold">
                    {r.type}
                  </th>
                  <td className="whitespace-nowrap px-4 py-4 font-display text-xl font-black text-herald">
                    {r.price}
                  </td>
                  <td className="px-4 py-4 font-body text-[0.9rem] leading-snug text-ink-muted">
                    {r.runWeeks}
                  </td>
                  <td className="px-4 py-4 font-body text-[0.94rem] leading-relaxed text-ink-muted">
                    {r.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-label text-[0.74rem] uppercase tracking-[0.14em] text-ink-faint">
          Additional names $10 each. Call {site.phone} for anything not listed.
        </p>
      </section>

      {/* What to bring — already in the data, previously never rendered. */}
      <section className="mt-16">
        <div className="rule-double mb-6" />
        <h2 className="font-display text-3xl font-black">What to have in front of you</h2>
        <p className="mt-3 max-w-3xl font-body text-[1.02rem] leading-relaxed text-ink-muted">
          Notices get rejected over small mismatches &mdash; a name spelled differently than the
          filing, a missing case number. Have these ready and we can usually start the run the same
          week.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {legalNoticeRates.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.08}>
              <div className="h-full border-t-2 border-ink bg-newsprint-white p-5">
                <h3 className="font-display text-lg font-bold leading-tight">{r.type}</h3>
                <p className="mt-1 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
                  {r.price} &middot; {r.runWeeks}
                </p>
                <ul className="mt-4 space-y-2 border-t border-rule pt-4 font-body text-[0.92rem] leading-relaxed text-ink-muted">
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* Request form */}
      <section id="notice-request" className="mt-16 grid gap-12 scroll-mt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rule-double mb-6" />
          <h2 className="font-display text-3xl font-black">Start a notice</h2>
          <p className="mt-3 max-w-xl font-body text-[1rem] leading-relaxed text-ink-muted">
            Tell us what you are filing and we will confirm the quote and the publication schedule.
            If you are working against a court date, say so and we will work backward from it.
          </p>
          <div className="mt-8">
            <HeraldForm subject="Legal notice request" submitLabel="Send Request">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Your name" required />
                <Field name="business" label="Business or firm" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="phone" label="Phone" type="tel" required />
                <Field name="email" label="Email" type="email" required />
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
            <p className="mt-2 font-body text-[0.96rem] leading-relaxed text-ink-muted">
              We file the proof with the San Joaquin County Court or the County Recorder at no
              additional cost, and issue another copy to the petitioner or registrant. One less
              errand on a filing deadline.
            </p>
          </div>
          <div className="mt-6 border border-rule bg-newsprint-white p-6">
            <p className="kicker text-cherry">Also advertising?</p>
            <p className="mt-2 font-body text-[0.96rem] leading-relaxed text-ink-muted">
              Display and classified advertising rates, sizes and deadlines are on the advertising
              page.
            </p>
            <Link
              href="/advertise"
              className="mt-3 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
            >
              Advertise with the Herald &rarr;
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
