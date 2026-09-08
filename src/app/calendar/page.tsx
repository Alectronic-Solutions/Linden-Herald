import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/PageHeader";
import CalendarBrowser from "@/components/CalendarBrowser";
import HeraldForm from "@/components/HeraldForm";
import ContactCard from "@/components/ContactCard";
import { Field, Select, TextArea } from "@/components/Field";
import { eventCategories } from "@/data/events";

export const metadata: Metadata = pageMetadata({
  title: "Community Calendar",
  description:
    "Community events around Linden, California. Board meetings, home games, fundraisers and fair week.",
  path: "/calendar",
});

export default function CalendarPage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="What is happening"
        title="Community Calendar"
        blurb="If it is on the calendar here, it is in the paper too. There is no charge to list a community event."
      />

      <CalendarBrowser />

      <section className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rule-double mb-6" />
          <h2 className="font-display text-3xl font-black">Add your event</h2>
          <p className="mt-3 max-w-xl font-body text-[1rem] leading-relaxed text-ink-muted">
            Club meetings, fundraisers, school programs, church suppers. There is no charge to list
            a community event.
          </p>
          <div className="mt-8">
            <HeraldForm
              subject="Community calendar submission"
              submitLabel="Submit Event"
              note="No charge for community events. We may edit for length."
            >
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
              <Field name="event_title" label="Event name" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="event_date" label="Date" type="date" required />
                <Field name="event_time" label="Time" placeholder="7:00 p.m." />
              </div>
              <Field name="location" label="Location" required />
              <Select
                name="category"
                label="Category"
                required
                options={eventCategories.map((c) => c.name)}
              />
              <TextArea
                name="detail"
                label="Details"
                required
                rows={4}
                placeholder="Admission, what to bring, and who to call for more information."
              />
            </HeraldForm>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="border-l-4 border-harvest bg-newsprint-white p-6">
            <p className="kicker text-harvest">Public meeting notices</p>
            <p className="mt-2 font-body text-[0.96rem] leading-relaxed text-ink-muted">
              The Herald carries agendas for the school board, the water district and the fire board
              as they are posted. If your agency needs a meeting noticed, call the office and we
              will make sure it runs on time.
            </p>
          </div>
          <ContactCard variant="compact" heading="Tell us about it" className="mt-6" />
        </aside>
      </section>
    </div>
  );
}
