import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import HeraldForm from "@/components/HeraldForm";
import { Field, Select, TextArea } from "@/components/Field";
import ContactCard from "@/components/ContactCard";
import { subscriptionRates } from "@/data/rates";
import { site, mailingAddressLines } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Subscribe to the Linden Herald for $42 a year and receive 52 issues delivered weekly within San Joaquin County.",
  alternates: { canonical: "/subscribe" },
  openGraph: {
    images: [{ url: "/og/subscribe.jpg", width: 1200, height: 630 }],
  },
};

export default function SubscribePage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="Fifty-two issues a year"
        title="Subscribe to the Herald"
        blurb="A subscription is what keeps a reporter in the room at the school board, the water district and the fire board. Start one online, or mail a check the way you always have."
      />

      <section className="grid gap-6 md:grid-cols-3">
        {subscriptionRates.map((rate, i) => (
          <Reveal key={rate.name} delay={i * 0.08}>
            <div
              className={cn(
                "flex h-full flex-col border bg-newsprint-white p-7",
                rate.featured ? "border-[3px] border-ink shadow-page" : "border-rule-strong",
              )}
            >
              {rate.featured && (
                <span className="mb-3 self-start bg-cherry px-2.5 py-1 font-label text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-newsprint-white">
                  Most Subscribers
                </span>
              )}
              <h2 className="font-display text-xl font-bold">{rate.name}</h2>
              <p className="mt-3 font-display text-5xl font-black leading-none">
                ${rate.price}
                <span className="ml-2 font-label text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  {rate.unit}
                </span>
              </p>
              <p className="mt-4 font-body text-[0.98rem] leading-relaxed text-ink-muted">
                {rate.detail}
              </p>
              <p className="mt-auto pt-5 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
                {rate.note}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rule-double mb-6" />
          <h2 className="font-display text-3xl font-black">Start a subscription</h2>
          <p className="mt-3 max-w-xl font-body text-[1rem] leading-relaxed text-ink-muted">
            Fill this out and the office will call you to confirm delivery and take payment. You
            can also mail a check, or call {site.phone} any hour.
          </p>

          <div className="mt-8">
            <HeraldForm
              subject="New subscription request"
              submitLabel="Send Subscription Request"
              note="We never sell or share subscriber information."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Subscriber name" required />
                <Field name="phone" label="Phone" type="tel" required placeholder="209-555-0100" />
              </div>
              <Field name="email" label="Email" type="email" placeholder="Optional" />
              <Field name="address" label="Delivery address" required />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field name="city" label="City" required />
                <Field name="state" label="State" required placeholder="CA" />
                <Field name="zip" label="ZIP" required />
              </div>
              <Select
                name="subscription_type"
                label="Subscription type"
                required
                options={subscriptionRates.map((r) => `${r.name} - $${r.price}`)}
              />
              <TextArea
                name="notes"
                label="Notes"
                rows={3}
                placeholder="Gift subscription, start date, seasonal address, anything else we should know."
              />
            </HeraldForm>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-ink bg-newsprint-white p-7">
            <h2 className="font-display text-2xl font-bold">Prefer to mail a check?</h2>
            <p className="mt-3 font-body text-[0.98rem] leading-relaxed text-ink-muted">
              Send a check along with the delivery address you would like the paper mailed to.
            </p>
            <address className="mt-5 border-l-4 border-harvest bg-newsprint pl-4 py-3 font-body text-[1rem] not-italic leading-relaxed">
              {mailingAddressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-6 border-t border-rule pt-5">
              <ContactCard variant="compact" heading="Or by phone, any hour" showAddress={false} />
            </div>
          </div>

          <div className="mt-6 border-l-4 border-cherry bg-newsprint-white p-6">
            <p className="kicker text-cherry">Why it matters</p>
            <p className="mt-2 font-body text-[0.96rem] leading-relaxed text-ink-muted">
              The Herald has published every week since {site.founded}. There is no wire service
              covering a Linden Unified board meeting or a fire district budget hearing. If the
              Herald does not write it down, it does not get written down.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
