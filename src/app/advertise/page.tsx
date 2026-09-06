import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import HeraldForm from "@/components/HeraldForm";
import ContactCard from "@/components/ContactCard";
import LegalNoticeEstimator from "@/components/LegalNoticeEstimator";
import AdSizePreviewer from "@/components/AdSizePreviewer";
import { Field, Select, TextArea } from "@/components/Field";
import { legalNoticeRates } from "@/data/rates";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Advertise & Legal Notices",
  description:
    "Display advertising and legal notice publication with the Linden Herald, a newspaper of general circulation in San Joaquin County since 1959. Estimate your notice cost in three questions.",
};

export default function AdvertisePage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="Reach the district"
        title="Advertise & Publish Notices"
        blurb="The Herald reaches households across the Linden school district every week, in print, where readers actually sit down with it. Legal notices are adjudicated, competitively priced, and filed for you."
      />

      <section className="grid gap-6 border-b-[3px] border-ink pb-8 sm:grid-cols-3">
        {[
          { figure: site.reach.districtResidents, label: "Residents in the school district" },
          { figure: site.reach.townResidents, label: "Residents inside town limits" },
          {
            figure: `${new Date().getFullYear() - site.founded}`,
            label: "Years publishing weekly",
          },
        ].map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div>
              <p className="font-display text-5xl font-black leading-none text-herald">
                {stat.figure}
              </p>
              <p className="mt-2 font-label text-[0.78rem] uppercase tracking-[0.16em] text-ink-muted">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Estimator */}
      <section id="legal-notices" className="mt-14 scroll-mt-24">
        <LegalNoticeEstimator />
      </section>

      {/* Full rate reference */}
      <section className="mt-14">
        <div className="rule-double mb-6" />
        <h2 className="font-display text-3xl font-black">Every notice we publish</h2>
        <p className="mt-3 max-w-3xl font-body text-[1.02rem] leading-relaxed text-ink-muted">
          The {site.adjudication.court} issued decree {site.adjudication.decree} in{" "}
          {site.adjudication.date} establishing the Herald as a newspaper of general circulation. We
          file the proof of publication with the county court or recorder at no cost to the
          advertiser, then issue a copy to the petitioner or registrant.
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

      {/* Ad previewer */}
      <section className="mt-14">
        <AdSizePreviewer />
      </section>

      <section className="mt-10">
        <p className="max-w-3xl font-body text-[1.02rem] leading-relaxed text-ink-muted">
          Linden sits fifteen miles east of Stockton, an hour south of Sacramento and two hours east
          of the Bay Area. Readers here shop locally, and they read the paper cover to cover.
        </p>
        <div className="mt-6 grid gap-4 border-t border-rule pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Display deadline", value: site.deadlines.display },
            { label: "Classified deadline", value: site.deadlines.classified },
            { label: "Legal notice deadline", value: site.deadlines.legal },
            { label: "Obituary deadline", value: site.deadlines.obituary },
          ].map((d) => (
            <div key={d.label}>
              <p className="kicker text-cherry">{d.label}</p>
              <p className="mt-1 font-body text-[0.95rem] text-ink-muted">{d.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Request form */}
      <section id="notice-request" className="mt-16 grid gap-12 scroll-mt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rule-double mb-6" />
          <h2 className="font-display text-3xl font-black">Start your notice or ad</h2>
          <p className="mt-3 max-w-xl font-body text-[1rem] leading-relaxed text-ink-muted">
            Tell us what you need and we will confirm the quote and the publication schedule.
          </p>
          <div className="mt-8">
            <HeraldForm subject="Advertising or legal notice request" submitLabel="Send Request">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Your name" required />
                <Field name="business" label="Business or firm" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="phone" label="Phone" type="tel" required />
                <Field name="email" label="Email" type="email" required />
              </div>
              <Select
                name="request_type"
                label="What do you need?"
                required
                options={[
                  ...legalNoticeRates.map((r) => r.type),
                  "Display advertising",
                  "Classified line ad",
                  "Something else",
                ]}
              />
              <TextArea
                name="details"
                label="Details"
                required
                rows={6}
                placeholder="Case number, filing deadline, business names, run dates, or the ad copy you have in mind."
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
        </aside>
      </section>
    </div>
  );
}
