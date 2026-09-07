import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import HeraldForm from "@/components/HeraldForm";
import ContactCard from "@/components/ContactCard";
import AdSizePreviewer from "@/components/AdSizePreviewer";
import { Field, Select, TextArea } from "@/components/Field";
import { displayAdSizes, legalNoticeRates } from "@/data/rates";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Advertise",
  description:
    "Display and classified advertising in the Linden Herald, a weekly print newspaper reaching the Linden school district across eastern San Joaquin County since 1959. See ad sizes at true proportion.",
  alternates: { canonical: "/advertise" },
  openGraph: {
    images: [{ url: "/og/advertise.jpg", width: 1200, height: 630 }],
  },
};

export default function AdvertisePage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="Reach the district"
        title="Advertise in the Herald"
        blurb="The Herald goes to households across the Linden school district every week. Pick a size below and we will help you fill it."
      />

      <section className="grid gap-6 border-b-[3px] border-ink pb-8 sm:grid-cols-3">
        {[
          {
            figure: site.reach.districtResidents,
            label: "Residents in the school district",
          },
          {
            figure: site.reach.townResidents,
            label: "Residents inside town limits",
          },
          {
            figure: `${new Date().getFullYear() - site.founded}`,
            label: "Years publishing weekly",
          },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-5xl font-black leading-none text-herald">
              {stat.figure}
            </p>
            <p className="mt-2 font-label text-[0.78rem] uppercase tracking-[0.16em] text-ink-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Legal notices moved to their own page. It is a distinct service with its
          own audience, and burying it in an anchor here hid it. */}
      <section className="mt-14">
        <div className="border-l-4 border-herald bg-newsprint-white p-6 sm:p-8">
          <p className="kicker text-herald">Looking to publish a legal notice?</p>
          <p className="mt-3 max-w-3xl font-display text-xl leading-relaxed sm:text-2xl">
            We are an adjudicated newspaper of general circulation, and we file your proof of
            publication at no extra cost.
          </p>
          <p className="mt-4 max-w-3xl font-body text-[1rem] leading-relaxed text-ink-muted">
            Fictitious business names from {legalNoticeRates[0].price}. Name changes, summons,
            family law and bulk sale transfers all have published rates, and there is a cost
            estimator that works out your deadline and first publication date.
          </p>
          <Link href="/legal-notices" className="btn-primary mt-6 text-xs">
            Legal Notice Rates &amp; Estimator
          </Link>
        </div>
      </section>

      {/* Ad previewer */}
      <section className="mt-14">
        <AdSizePreviewer />
      </section>

      <section className="mt-10">
        <p className="max-w-3xl font-body text-[1.02rem] leading-relaxed text-ink-muted">
          Linden sits fifteen miles east of Stockton, an hour south of Sacramento and two hours east
          of the Bay Area. Most of what our readers buy, they buy close to home.
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
          <h2 className="font-display text-3xl font-black">Start an ad</h2>
          <p className="mt-3 max-w-xl font-body text-[1rem] leading-relaxed text-ink-muted">
            Tell us what you need and we will confirm the quote and the publication schedule.
          </p>
          <div className="mt-8">
            <HeraldForm subject="Advertising request" submitLabel="Send Request">
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
                  ...displayAdSizes.map((a) => `${a.name} (${a.size})`),
                  "Insert or flyer",
                  "Not sure yet",
                ]}
              />
              <TextArea
                name="details"
                label="Details"
                required
                rows={6}
                placeholder="Run dates, the ad copy you have in mind, or just tell us what you are promoting and we will help size it."
              />
            </HeraldForm>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <ContactCard variant="full" heading="Talk to a person" />
          <div className="mt-6 border-l-4 border-harvest bg-newsprint-white p-6">
            <p className="kicker text-harvest">We can build the ad</p>
            <p className="mt-2 font-body text-[0.96rem] leading-relaxed text-ink-muted">
              Send a logo and the details and we will set the ad for you at no charge. Camera-ready
              artwork is welcome too. Send a PDF or a high-resolution JPEG at the size you booked.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
