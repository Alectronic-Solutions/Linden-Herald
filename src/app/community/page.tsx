import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ContactCard from "@/components/ContactCard";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Submit an obituary, list a community event, or place a classified ad in the Linden Herald. Obituaries and calendar listings are published at no charge.",
  alternates: { canonical: "/community" },
};

const columns = "grid gap-8 divide-y divide-rule sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-y-0";
const column = "sm:px-6 sm:first:pl-0 sm:last:pr-0 pt-8 first:pt-0 sm:pt-0";

const services = [
  {
    title: "Obituaries",
    href: "/obituaries",
    action: "Submit a notice",
    cost: "No charge",
    body: "There is no charge for a standard notice. Send what you have and we will help shape it. Photographs are welcome. We will call to confirm the details before anything is printed.",
    deadline: site.deadlines.obituary,
  },
  {
    title: "Community calendar",
    href: "/calendar",
    action: "List an event",
    cost: "No charge",
    body: "If it is open to the public and happening in the district, we will list it. Send the date, the place, and who to call for more information. We may edit for length.",
    deadline: site.deadlines.classified,
  },
  {
    title: "Classifieds",
    href: "/classifieds",
    action: "Place a listing",
    cost: "Priced by the line",
    body: "Equipment, livestock, services, help wanted and rentals. About seven words to a line. Write it however it comes and we will set it.",
    deadline: site.deadlines.classified,
  },
];

export default function CommunityPage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="Put it in the paper"
        title="Community Notices"
        blurb="Anyone who lives or works in the district can put a notice in the paper. Obituaries and calendar listings are free. Classified ads are priced by the line."
      />

      <div className={columns}>
        {services.map((s) => (
          <div key={s.href} className={column}>
            <h2 className="font-display text-xl font-bold">{s.title}</h2>
            <p className="mt-1 font-label text-[0.72rem] uppercase tracking-[0.14em] text-cherry">
              {s.cost}
            </p>
            <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-ink-muted">{s.body}</p>
            <p className="mt-3 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
              Deadline: {s.deadline}
            </p>
            <Link
              href={s.href}
              className="mt-3 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
            >
              {s.action} &rarr;
            </Link>
          </div>
        ))}
      </div>

      <section className="mt-16 grid gap-10 border-t-[3px] border-ink pt-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl font-black">Have a news tip?</h2>
          <p className="mt-3 max-w-xl font-body text-[1.02rem] leading-relaxed text-ink-muted">
            Call us. Our correspondents live and work in Linden, and the phone is{" "}
            {site.phoneNote.toLowerCase()}. If we miss you, we return calls as soon as we are back.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Send a News Tip
            </Link>
            <Link href="/corrections" className="btn-outline">
              Request a Correction
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <ContactCard variant="full" heading="Reach the newsroom" />
        </div>
      </section>
    </div>
  );
}
