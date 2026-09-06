import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <p className="kicker text-cherry">Page Not Found</p>
      <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-black leading-tight sm:text-6xl">
        That page is not in this edition
      </h1>
      <p className="mx-auto mt-5 max-w-xl font-body text-[1.05rem] leading-relaxed text-ink-muted">
        It may have moved, or it may be waiting in the archive. Try the front page, search the back
        issues, or call the newsroom at {site.phone} and we will find it for you.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Front Page
        </Link>
        <Link href="/archive" className="btn-outline">
          Search the Archive
        </Link>
      </div>
    </div>
  );
}
