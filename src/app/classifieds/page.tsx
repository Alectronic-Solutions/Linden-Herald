import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/PageHeader";
import ClassifiedsBrowser from "@/components/ClassifiedsBrowser";
import HeraldForm from "@/components/HeraldForm";
import ContactCard from "@/components/ContactCard";
import { Field, Select, TextArea } from "@/components/Field";
import { classifiedRates, classifiedCategories } from "@/data/classifieds";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Classifieds",
  description:
    "Classified listings from around the Linden district, published weekly in the Linden Herald. Equipment, help wanted, services, rentals and livestock.",
  path: "/classifieds",
});

export default function ClassifiedsPage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="Bought and sold locally"
        title="Classifieds"
        blurb="Equipment, work, services and stock. In print every Thursday, and posted here the same morning."
      />

      <ClassifiedsBrowser />

      <section className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rule-double mb-6" />
          <h2 className="font-display text-3xl font-black">Place a listing</h2>
          <p className="mt-3 max-w-xl font-body text-[1rem] leading-relaxed text-ink-muted">
            Deadline is {site.deadlines.classified} for that week&apos;s edition. We will call to
            confirm wording and take payment.
          </p>
          <div className="mt-8">
            <HeraldForm subject="Classified listing" submitLabel="Submit Listing">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" autoComplete="name" label="Your name" required />
                <Field
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  label="Phone"
                  type="tel"
                  required
                />
              </div>
              <Field
                name="email"
                autoComplete="email"
                inputMode="email"
                label="Email"
                type="email"
              />
              <Select
                name="category"
                label="Category"
                required
                options={classifiedCategories.map((c) => c.name)}
              />
              <TextArea
                name="listing"
                label="Your listing"
                required
                rows={5}
                placeholder="Write it however it comes. About seven words to a line."
              />
              <Select
                name="run_length"
                label="How long should it run?"
                required
                options={["One week", "Two weeks", "Four weeks", "Until it sells, call me"]}
              />
            </HeraldForm>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-ink bg-newsprint-white p-7">
            <p className="kicker text-herald">Classified rates</p>
            <dl className="mt-4 divide-y divide-rule">
              {classifiedRates.map((r) => (
                <div
                  key={r.lines}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 py-3"
                >
                  <dt className="font-display text-[1rem] font-bold">{r.lines}</dt>
                  <dd className="font-display text-xl font-black text-herald">{r.price}</dd>
                  <dd className="mt-1 w-full font-body text-[1rem] text-ink-muted">{r.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ContactCard variant="compact" heading="Rather call it in?" className="mt-6" />
        </aside>
      </section>
    </div>
  );
}
