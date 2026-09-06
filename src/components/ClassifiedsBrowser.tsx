"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { classifieds, classifiedCategories } from "@/data/classifieds";
import { cn, formatShortDate } from "@/lib/utils";

export default function ClassifiedsBrowser() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return classifieds
      .filter((c) => (active === "all" ? true : c.category === active))
      .filter((c) => (q ? `${c.title} ${c.body}`.toLowerCase().includes(q) : true));
  }, [active, query]);

  const filters = [{ slug: "all", name: "All Listings" }, ...classifiedCategories];

  return (
    <>
      <div className="flex flex-col gap-4 border-y border-ink py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.slug}
              type="button"
              onClick={() => setActive(f.slug)}
              aria-pressed={active === f.slug}
              className={cn(
                "border px-3 py-1.5 font-label text-[0.76rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                active === f.slug
                  ? "border-ink bg-ink text-newsprint-white"
                  : "border-rule-strong text-ink-muted hover:border-ink hover:text-ink",
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
        <div className="lg:w-64">
          <label htmlFor="classified-search" className="sr-only">
            Search listings
          </label>
          <input
            id="classified-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search listings"
            className="field py-2"
          />
        </div>
      </div>

      <p className="mt-4 font-label text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
        {results.length} {results.length === 1 ? "listing" : "listings"}
      </p>

      {/* Set in narrow measures, the way classifieds actually run. */}
      <div className="mt-5 gap-x-8 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {results.map((c) => {
            const category = classifiedCategories.find((k) => k.slug === c.category);
            return (
              <motion.article
                key={c.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 break-inside-avoid border-t-2 border-ink pt-3"
              >
                <p className="kicker text-cherry">{category?.name}</p>
                <h3 className="mt-1 font-display text-lg font-bold leading-snug">{c.title}</h3>
                <p className="mt-1.5 font-body text-[0.92rem] leading-relaxed text-ink-muted">
                  {c.body}
                </p>
                <p className="mt-2 font-body text-[0.88rem] italic text-ink-faint">{c.contact}</p>
                <p className="mt-1 font-label text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint">
                  Runs through {formatShortDate(c.runsUntil)}
                </p>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {results.length === 0 && (
        <p className="mt-8 border border-rule bg-newsprint-white p-8 text-center font-body text-ink-muted">
          Nothing in that category this week. New listings go in every Thursday.
        </p>
      )}
    </>
  );
}
