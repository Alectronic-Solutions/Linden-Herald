import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArchiveBrowser from "@/components/ArchiveBrowser";
import OnThisDate from "@/components/OnThisDate";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";
import { issues } from "@/data/archive";

export const metadata: Metadata = pageMetadata({
  title: "Past Issues",
  description:
    "Past issues of the Linden Herald, posted as PDFs and free to download. Search by date or keyword, or filter by year. Copies going back to 1959 are held at the Stockton Public Library.",
  path: "/archive",
  image: "/og/archive.jpg",
});

export default function ArchivePage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="The Archive"
        title="Past Issues"
        blurb="Back issues are posted here as PDFs, free to download, page for page as they were printed. Search by keyword, or filter by year."
      />

      <div className="mb-14">
        <OnThisDate />
      </div>

      <ArchiveBrowser />

      <section className="mt-16 grid gap-6 border-t-[3px] border-ink pt-10 md:grid-cols-3">
        <div>
          <h2 className="font-display text-xl font-bold">Going back to {site.founded}</h2>
          <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-ink-muted">
            {issues.length} issues are posted here so far. Copies going back to {site.founded} can
            be reviewed at the Stockton Public Library.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Looking for a specific week?</h2>
          <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-ink-muted">
            Call the newsroom at{" "}
            <a href={site.phoneHref} className="underline link-underline">
              {site.phone}
            </a>{" "}
            and we will pull it. Photograph reprints are available on request.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Read it first in print</h2>
          <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-ink-muted">
            Subscribers receive the paper by mail every week for $42 a year.
          </p>
          <Link
            href="/subscribe"
            className="mt-3 inline-block font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald hover:text-cherry"
          >
            Subscribe &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
