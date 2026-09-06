import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import HeraldForm from "@/components/HeraldForm";
import { Field, Select, TextArea } from "@/components/Field";
import ContactCard from "@/components/ContactCard";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Linden Herald newsroom with a news tip, a photograph, a correction, a legal notice or a subscription.",
};

export default function ContactPage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="We answer the phone"
        title="Contact the Herald"
        blurb="Call any hour with a news tip, a comment, a correction, a legal notice or a subscription. If we miss you, we return calls as soon as we are back."
      />

      <div className="grid gap-12 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="rule-double mb-6" />
          <h2 className="font-display text-3xl font-black">Send a message</h2>
          <p className="mt-3 max-w-xl font-body text-[1rem] leading-relaxed text-ink-muted">
            Tips, photographs, calendar items, letters to the editor and corrections all land in
            the same inbox, and a person reads every one.
          </p>
          <div className="mt-8">
            <HeraldForm subject="Message from lindenherald.com" submitLabel="Send Message">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Name" required />
                <Field name="phone" label="Phone" type="tel" placeholder="209-555-0100" />
              </div>
              <Field name="email" label="Email" type="email" required />
              <Select
                name="topic"
                label="What is this about?"
                required
                options={[
                  "News tip",
                  "Photograph or calendar item",
                  "Letter to the editor",
                  "Correction",
                  "Subscription",
                  "Advertising",
                  "Legal notice",
                  "Something else",
                ]}
              />
              <TextArea name="message" label="Message" required rows={7} />
            </HeraldForm>
          </div>
        </section>

        <aside className="lg:col-span-5">
          <Reveal>
            <ContactCard variant="full" heading="By phone, 24 hours" />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 border border-rule-strong bg-newsprint-white p-6">
              <p className="kicker text-cherry">Weekly deadlines</p>
              <dl className="mt-4 divide-y divide-rule">
                {[
                  ["Display advertising", site.deadlines.display],
                  ["Classified ads", site.deadlines.classified],
                  ["Legal notices", site.deadlines.legal],
                  ["Obituaries", site.deadlines.obituary],
                ].map(([term, value]) => (
                  <div key={term} className="py-3">
                    <dt className="font-label text-[0.76rem] uppercase tracking-[0.14em] text-ink-faint">
                      {term}
                    </dt>
                    <dd className="mt-0.5 font-body text-[0.95rem] text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6 border-l-4 border-harvest bg-newsprint-white p-6">
              <p className="kicker text-harvest">Corrections</p>
              <p className="mt-2 font-body text-[0.96rem] leading-relaxed text-ink-muted">
                The Herald corrects errors of fact promptly and in print. If we got something
                wrong, call and tell us.
              </p>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
