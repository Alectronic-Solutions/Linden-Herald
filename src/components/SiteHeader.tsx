"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const today = new Date();
const dateLine = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
const volume = today.getFullYear() - site.founded + 1;

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const MastheadTag = isHome ? "h1" : "p";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-40">
      {/* Folio line, the way it runs across the top of the printed page */}
      <div className="no-print border-b border-rule bg-newsprint-white/70">
        <div className="wrap flex flex-wrap items-center justify-between gap-y-1 py-2 font-label text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
          <span>{dateLine}</span>
          <span className="hidden sm:inline">
            Vol. {volume} &middot; Linden, California
          </span>
          <a href={site.phoneHref} className="hover:text-herald">
            {site.phone}
          </a>
        </div>
      </div>

      {/* Masthead */}
      <div className="wrap pb-5 pt-7 text-center sm:pb-6 sm:pt-10">
        <Link href="/" className="group inline-block max-w-full">
          <span className="kicker block text-cherry">Established {site.founded}</span>
          <MastheadTag className="mt-2 font-display text-[2.6rem] font-black leading-[0.92] tracking-[-0.02em] text-ink transition-colors group-hover:text-herald sm:text-6xl lg:text-[5.2rem]">
            The Linden Herald
          </MastheadTag>
        </Link>
        <div className="mx-auto mt-4 flex max-w-2xl items-center gap-4">
          <span className="h-px flex-1 bg-rule-strong" />
          <p className="font-display text-[0.95rem] italic text-ink-muted sm:text-base">
            {site.tagline}
          </p>
          <span className="h-px flex-1 bg-rule-strong" />
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Primary"
        className={cn(
          "no-print sticky top-0 z-40 border-y border-ink bg-newsprint/95 backdrop-blur transition-shadow",
          condensed && "shadow-page",
        )}
      >
        <div className="wrap flex items-center justify-between gap-4">
          {/* Condensed masthead appears once the full one scrolls away */}
          <AnimatePresence>
            {condensed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="hidden shrink-0 py-2 xl:block"
              >
                <Link
                  href="/"
                  className="font-display text-lg font-black leading-none tracking-tight hover:text-herald"
                >
                  The Linden Herald
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative block whitespace-nowrap px-2 py-3 font-label text-[0.78rem] font-semibold uppercase tracking-[0.1em] transition-colors xl:px-3 xl:text-[0.82rem] xl:tracking-[0.14em]",
                    isActive(item.href)
                      ? "text-herald"
                      : "text-ink hover:text-herald",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 bottom-1.5 h-[2px] bg-herald"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/subscribe"
            className="hidden shrink-0 whitespace-nowrap bg-cherry px-3 py-1.5 font-label text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-newsprint-white transition-colors hover:bg-ink lg:inline-block xl:px-4 xl:text-[0.78rem] xl:tracking-[0.14em]"
          >
            Subscribe
          </Link>

          {/* Mobile bar */}
          <div className="flex w-full items-center justify-between py-2.5 lg:hidden">
            <Link
              href="/"
              className={cn(
                "font-display text-base font-black tracking-tight transition-opacity duration-300",
                condensed ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={!condensed}
              tabIndex={condensed ? undefined : -1}
            >
              The Linden Herald
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex items-center gap-2 border border-ink px-3 py-1.5 font-label text-[0.78rem] font-semibold uppercase tracking-[0.14em]"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-rule bg-newsprint-white lg:hidden"
            >
              <ul className="wrap divide-y divide-rule py-1">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-3 font-label text-sm font-semibold uppercase tracking-[0.16em]",
                        isActive(item.href) ? "text-herald" : "text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="wrap pb-4">
                <Link href="/subscribe" className="btn-primary w-full">
                  Subscribe for $42 a year
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
