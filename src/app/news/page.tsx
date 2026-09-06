import { Suspense } from "react";
import type { Metadata } from "next";
import NewsBrowser from "@/components/NewsBrowser";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "News",
  description:
    "Local news, agriculture, sports, schools and public safety reporting from the Linden Herald.",
};

export default function NewsPage() {
  return (
    <div className="wrap py-10">
      <PageHeader
        kicker="The Newsroom"
        title="News"
        blurb="Everything the Herald has published recently, filed by section. The printed edition carries the full report each week."
      />
      <Suspense fallback={<p className="font-body text-ink-muted">Loading stories...</p>}>
        <NewsBrowser />
      </Suspense>
    </div>
  );
}
