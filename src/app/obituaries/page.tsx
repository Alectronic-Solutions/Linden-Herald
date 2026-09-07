import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import HeraldForm from "@/components/HeraldForm";
import { Field, TextArea } from "@/components/Field";
import { obituaries } from "@/data/obituaries";
import { site } from "@/data/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Obituaries",
  description:
    "Obituary notices published in the Linden Herald, and how to submit one for a family member.",
};

export default function ObituariesPage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="In Memoriam"
        title="Obituaries"
        blurb="The Herald publishes obituary notices for families in the district. There is no charge for a standard notice."
      />

      <div className="grid gap-12 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="space-y-8">
            {obituaries.map((o) => (
              <article key={o.slug} className="border-t-2 border-ink bg-newsprint-white p-6">
                <h2 className="font-display text-2xl font-bold leading-tight">{o.name}</h2>
                <p className="mt-1 font-label text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
                  {o.years} &middot; {o.town}, California
                </p>
                <p className="mt-4 font-body text-[1rem] leading-relaxed text-ink-muted">
                  {o.summary}
                </p>
                {o.serviceDate && (
                  <div className="mt-5 border-l-4 border-harvest bg-newsprint py-3 pl-4">
                    <p className="kicker text-harvest">Services</p>
                    <p className="mt-1 font-body text-[0.95rem] text-ink-muted">
                      {o.serviceDate}
                      {o.serviceLocation ? `, ${o.serviceLocation}` : ""}
                    </p>
                  </div>
                )}
                <p className="mt-5 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
                  Published {formatDate(o.published)}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 border border-rule bg-newsprint-white p-6 font-body text-[0.95rem] leading-relaxed text-ink-muted">
            Notices published before this year are available in the printed archive. Call{" "}
            <a href={site.phoneHref} className="underline link-underline">
              {site.phone}
            </a>{" "}
            and we will look one up, or review bound volumes at the Stockton Public Library.
          </p>
        </section>

        <aside className="lg:col-span-5">
          <div className="border border-ink bg-newsprint-white p-7">
            <p className="kicker text-cherry">Submit a notice</p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight">
              Tell us about your loved one
            </h2>
            <p className="mt-3 font-body text-[0.96rem] leading-relaxed text-ink-muted">
              Send what you have and we will help shape it. Photographs are welcome. The deadline
              for the Thursday edition is {site.deadlines.obituary}.
            </p>
            <div className="mt-6">
              <HeraldForm
                subject="Obituary submission"
                submitLabel="Send Notice"
                note="We will call to confirm details before anything is printed."
              >
                <Field name="contact_name" label="Your name" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="phone" label="Phone" type="tel" required />
                  <Field name="relationship" label="Relationship" placeholder="Daughter, son" />
                </div>
                <Field name="deceased_name" label="Name of the deceased" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="dob" label="Date of birth" />
                  <Field name="dod" label="Date of passing" />
                </div>
                <Field name="services" label="Service details" placeholder="Date, time, location" />
                <TextArea
                  name="notice"
                  label="The notice"
                  required
                  rows={7}
                  placeholder="Family, work, service, and anything else people should know. Write it however it comes and we will help with the rest."
                />
              </HeraldForm>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
