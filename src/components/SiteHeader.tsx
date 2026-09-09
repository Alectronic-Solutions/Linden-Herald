"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { site } from "@/data/site";
import { cn, volumeFor } from "@/lib/utils";
import { useDialog } from "@/lib/useDialog";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /**
   * The folio line reports the reader's today. Computing it during render
   * would bake the build date into the exported HTML and then disagree with the
   * browser at hydration, so it stays null until after mount.
   */
  const [folio, setFolio] = useState<{ date: string; volume: number } | null>(null);

  /**
   * The drawer needs to stay in the DOM for the length of its slide-out, so
   * presence and position are tracked separately. This replaces framer-motion's
   * AnimatePresence, which was the only reason the library was in the root
   * layout chunk and therefore on every route.
   */
  const closeDrawer = useCallback(() => setOpen(false), []);

  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerShown, setDrawerShown] = useState(false);

  useEffect(() => {
    if (open) {
      setDrawerMounted(true);
      // Next frame, so the browser has an off-screen position to animate from.
      const frame = requestAnimationFrame(() => setDrawerShown(true));
      return () => cancelAnimationFrame(frame);
    }
    setDrawerShown(false);
    const timer = window.setTimeout(() => setDrawerMounted(false), 250);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const now = new Date();
    setFolio({
      date: now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      volume: volumeFor(now.toISOString().slice(0, 10), site.founded),
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock, Escape to close, Tab kept inside the drawer, and focus
  // returned to the toggle on close. Shared with the form confirmation card.
  useDialog({
    open,
    dialogRef: drawerRef,
    onClose: closeDrawer,
    initialFocusRef: closeRef,
    returnFocusRef: toggleRef,
  });

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="relative z-40">
        {/* Folio line, the way it runs across the top of the printed page */}
        <div className="no-print border-b border-rule bg-newsprint-white/70">
          <div className="wrap flex flex-wrap items-center justify-between gap-y-1 py-2 font-label text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
            <span>{folio?.date ?? " "}</span>
            <span className="hidden sm:inline">
              {folio ? `Vol. ${folio.volume} · Linden, California` : "Linden, California"}
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
            <p className="mt-2 font-display text-[2.6rem] font-black leading-[0.92] tracking-[-0.02em] text-ink transition-colors group-hover:text-herald sm:text-6xl lg:text-[5.2rem]">
              The Linden Herald
            </p>
          </Link>
          <div className="mx-auto mt-4 flex max-w-2xl items-center gap-4">
            <span className="h-px flex-1 bg-rule-strong" />
            <p className="font-display text-[0.95rem] italic text-ink-muted sm:text-base">
              {site.tagline}
            </p>
            <span className="h-px flex-1 bg-rule-strong" />
          </div>
        </div>
      </header>

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
          <div
            className={cn(
              "hidden shrink-0 py-2 transition-all duration-300 motion-reduce:transition-none xl:block",
              condensed
                ? "translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-2 opacity-0",
            )}
            aria-hidden={!condensed}
          >
            <Link
              href="/"
              tabIndex={condensed ? undefined : -1}
              className="flex items-center gap-2 font-display text-lg font-black leading-none tracking-tight transition-colors hover:text-herald"
            >
              <Logo size={26} />
              The Linden Herald
            </Link>
          </div>

          <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative block whitespace-nowrap px-2 py-3 font-label text-[0.78rem] font-semibold uppercase tracking-[0.1em] transition-colors xl:px-3 xl:text-[0.82rem] xl:tracking-[0.14em]",
                    isActive(item.href) ? "text-herald" : "text-ink hover:text-herald",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden className="absolute inset-x-2 bottom-1.5 h-[2px] bg-herald" />
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
                "flex items-center gap-2 font-display text-base font-black tracking-tight transition-opacity duration-300",
                condensed ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={!condensed}
              tabIndex={condensed ? undefined : -1}
            >
              <Logo size={22} />
              The Linden Herald
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex min-h-[44px] items-center gap-2.5 border border-ink px-4 font-label text-[0.8rem] font-semibold uppercase tracking-[0.14em]"
            >
              <span aria-hidden className="flex flex-col gap-[3px]">
                <span className="block h-[2px] w-4 bg-ink" />
                <span className="block h-[2px] w-4 bg-ink" />
                <span className="block h-[2px] w-4 bg-ink" />
              </span>
              Menu
            </button>
          </div>
        </div>
      </nav>

      {drawerMounted && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className={cn(
              "fixed inset-0 z-40 cursor-default bg-ink/55 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none lg:hidden",
              drawerShown ? "opacity-100" : "opacity-0",
            )}
          />

          <div
            ref={drawerRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col overflow-y-auto overscroll-contain border-l-[3px] border-ink bg-newsprint shadow-lift transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden",
              drawerShown ? "translate-x-0" : "translate-x-full",
            )}
          >
            <div className="flex items-center justify-between border-b border-rule px-5 py-4">
              <span className="flex items-center gap-2.5">
                <Logo size={30} />
                <span className="font-display text-lg font-black leading-none">
                  The Linden Herald
                </span>
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-cherry"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden focusable="false">
                  <path
                    d="M5 5l14 14M19 5L5 19"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <ul className="flex-1 divide-y divide-rule px-5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-[52px] items-center font-label text-[0.95rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                      isActive(item.href) ? "text-herald" : "text-ink hover:text-herald",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-rule bg-newsprint-white px-5 py-5">
              <Link href="/subscribe" className="btn-primary w-full">
                Subscribe for $42 a year
              </Link>
              <a
                href={site.phoneHref}
                className="mt-3 flex min-h-[44px] items-center justify-center text-center font-display text-2xl font-black leading-none transition-colors hover:text-herald"
              >
                {site.phone}
              </a>
              <p className="mt-1 text-center font-label text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
                {site.phoneNote}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
