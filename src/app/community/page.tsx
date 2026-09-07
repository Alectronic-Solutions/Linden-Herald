import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactCard from "@/components/ContactCard";
import { site } from "@/data/site";
import { events } from "@/data/events";
import { classifieds } from "@/data/classifieds";
import { obituaries } from "@/data/obituaries";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Submit an obituary, list a community event, or place a classified ad in the Linden Herald. Obituaries and calendar listings are published at no charge for the district.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  const services = [
    {
      title: "Obituaries",
      href: "/obituaries",
      cost: "No charge",
      blurb:
        "Notices for families in the district are published at no charge. Send the details and a photograph and we will set it for the next edition.",
      deadline: site.deadlines.obituary,
      count: `${obituaries.length} recent notices`,
    },
    {
      title: "Community Calendar",
      href: "/calendar",
      cost: "Free to list",
      blurb:
        "Board meetings, fundraisers, club nights, school events and fair dates. If it is open to the public and happening in the district, it belongs here.",
      deadline: site.deadlines.classified,
      count: `${events.length} events listed`,
    },
    {
      title: "Classifieds",
      href: "/classifieds",
      cost: "Priced per line",
      blurb:
        "Equipment, livestock, services, help wanted, rentals and things for sale. The back pages people actually read.",
      deadline: site.deadlines.classified,
      count: `${classifieds.length} current listings`,
    },
  ];

  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="Put it in the paper"
        title="Community Notices"
        blurb="The Herald is where the district keeps track of itself. Anyone who lives or works here can submit an obituary, a calendar listing or a classified ad."
      />

      <div className="grid gap-8 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.href} delay={i * 0.08}>
            <div className="flex h-full flex-col border-t-[3px] border-ink bg-newsprint-white p-6">
              <p className="kicker text-cherry">{s.cost}</p>
              <h2 className="mt-2 font-display text-2xl font-bold leading-tight">{s.title}</h2>
              <p className="mt-3 flex-1 font-body text-[0.95rem] leading-relaxed text-ink-muted">
                {s.blurb}
              </p>
              <dl className="mt-5 space-y-1.5 border-t border-rule pt-4 font-label text-[0.72rem] uppercase tracking-[0.14em]">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-faint">Deadline</dt>
                  <dd className="text-right text-ink">{s.deadline}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-faint">Now showing</dt>
                  <dd className="text-right text-ink">{s.count}</dd>
                </div>
              </dl>
              <Link href={s.href} className="btn-primary mt-5 w-full text-xs">
                Go to {s.title}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-16 grid gap-10 border-t-[3px] border-ink pt-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl font-black">Have a news tip?</h2>
          <p className="mt-3 max-w-xl font-body text-[1.02rem] leading-relaxed text-ink-muted">
            A meeting worth covering, a photograph worth printing, a correction we need to run. Our
            correspondents live and work in Linden, and the phone is answered{" "}
            {site.phoneNote.toLowerCase()}.
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
