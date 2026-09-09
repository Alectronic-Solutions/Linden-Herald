import Link from "next/link";
import Logo from "@/components/Logo";
import { site } from "@/data/site";
import { policyList } from "@/data/policies";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-[3px] border-ink bg-ink text-newsprint-deep">
      <div className="wrap py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Logo size={44} bg="#FAF7F0" fg="#14110F" />
              <p className="font-display text-3xl font-black leading-none text-newsprint-white">
                The Linden Herald
              </p>
            </div>
            <p className="mt-3 font-display text-sm italic text-newsprint-deep/70">
              {site.tagline}
            </p>
            <p className="mt-6 max-w-sm font-body text-[1rem] leading-relaxed text-newsprint-deep/80">
              A weekly newspaper written and reported in Linden, California, and a newspaper of
              general circulation adjudicated by the {site.adjudication.court},{" "}
              {site.adjudication.decree}.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="kicker text-harvest-light">Services</h2>
            <ul className="mt-3 font-body text-[1.05rem]">
              {[
                { label: "Subscribe", href: "/subscribe" },
                { label: "Legal Notices", href: "/legal-notices" },
                { label: "Advertise", href: "/advertise" },
                { label: "Past Issues", href: "/archive" },
                { label: "Obituaries", href: "/obituaries" },
                { label: "Community Calendar", href: "/calendar" },
                { label: "Classifieds", href: "/classifieds" },
              ].map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="flex min-h-[2.5rem] items-center text-newsprint-deep/80 transition-colors hover:text-newsprint-white hover:underline"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="kicker text-harvest-light">Reach the Newsroom</h2>
            <address className="mt-4 space-y-3 font-body text-[1rem] not-italic text-newsprint-deep/80">
              <p>
                <a
                  href={site.phoneHref}
                  className="font-display text-2xl text-newsprint-white transition-colors hover:text-harvest-light"
                >
                  {site.phone}
                </a>
                <br />
                <span className="font-label text-[0.8rem] uppercase tracking-[0.14em] text-newsprint-deep/60">
                  {site.phoneNote}
                </span>
              </p>
              <p>
                {site.name}
                <br />
                {site.mailing.line1}
                <br />
                {site.mailing.city}, {site.mailing.state} {site.mailing.zip}
              </p>
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/subscribe" className="btn-primary bg-herald px-5 py-2.5">
                Subscribe
              </Link>
              <Link
                href="/advertise"
                className="btn border border-newsprint-deep/40 px-5 py-2.5 text-newsprint-deep hover:bg-newsprint-white hover:text-ink"
              >
                Place a Notice
              </Link>
            </div>
          </div>
        </div>

        <nav
          aria-label="Policies"
          className="mt-12 flex flex-wrap gap-x-6 border-t border-newsprint-deep/15 pt-4"
        >
          {policyList.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="flex min-h-[2.5rem] items-center font-label text-[0.86rem] uppercase tracking-[0.12em] text-newsprint-deep/75 transition-colors hover:text-harvest-light hover:underline"
            >
              {p.title}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col gap-3 border-t border-newsprint-deep/15 pt-6 font-label text-[0.84rem] uppercase tracking-[0.12em] text-newsprint-deep/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>
            Design concept by{" "}
            <a
              href="https://alectronicsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-newsprint-white"
            >
              Alectronic Solutions
            </a>
          </p>
        </div>

        <p className="mt-5 font-body text-[1rem] leading-relaxed text-newsprint-deep/75">
          Preview build. Stories, photographs, notices and listings shown here are samples for
          design purposes and are not the Herald&apos;s own reporting.
        </p>
      </div>
    </footer>
  );
}
