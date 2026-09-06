"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IssueCover from "@/components/IssueCover";
import { issues, archiveYears } from "@/data/archive";
import { asset, cn, formatDate } from "@/lib/utils";

export default function ArchiveBrowser() {
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return issues
      .filter((i) => (year === "all" ? true : i.date.startsWith(year)))
      .filter((i) =>
        q ? `${i.label} ${i.highlights.join(" ")}`.toLowerCase().includes(q) : true,
      );
  }, [year, query]);

  return (
    <>
      <div className="flex flex-col gap-4 border border-ink bg-newsprint-white p-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="lg:max-w-sm lg:flex-1">
          <label htmlFor="archive-search" className="field-label">
            Search back issues
          </label>
          <input
            id="archive-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try graduation, harvest, water board"
            className="field"
          />
        </div>
        <div>
          <span className="field-label">Filter by year</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setYear("all")}
              aria-pressed={year === "all"}
              className={cn(
                "border px-3 py-1.5 font-label text-[0.76rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                year === "all"
                  ? "border-ink bg-ink text-newsprint-white"
                  : "border-rule-strong text-ink-muted hover:border-ink hover:text-ink",
              )}
            >
              All years
            </button>
            {archiveYears.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                aria-pressed={year === y}
                className={cn(
                  "border px-3 py-1.5 font-label text-[0.76rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                  year === y
                    ? "border-ink bg-ink text-newsprint-white"
                    : "border-rule-strong text-ink-muted hover:border-ink hover:text-ink",
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 font-label text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
        {results.length} {results.length === 1 ? "issue" : "issues"} available
      </p>

      <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {results.map((issue) => (
            <motion.article
              key={issue.date}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <a
                href={asset(issue.file)}
                className="block transition-transform duration-500 group-hover:-translate-y-1.5"
                aria-label={`Download the ${issue.label} edition, PDF, ${issue.sizeMb} megabytes`}
              >
                <div className="shadow-page transition-shadow duration-500 group-hover:shadow-lift">
                  <IssueCover date={issue.date} volume={issue.volume} number={issue.number} />
                </div>
              </a>
              <h3 className="mt-3 font-display text-lg font-bold leading-tight">
                <a href={asset(issue.file)} className="headline-link">
                  {formatDate(issue.date)}
                </a>
              </h3>
              <p className="mt-1 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
                {issue.pages} pages &middot; PDF {issue.sizeMb} MB
              </p>
              <ul className="mt-2 space-y-1 font-body text-[0.88rem] leading-snug text-ink-muted">
                {issue.highlights.slice(0, 2).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {results.length === 0 && (
        <p className="mt-10 border border-rule bg-newsprint-white p-8 text-center font-body text-ink-muted">
          No issues match that search yet. Copies dating to 1959 are available for review at the
          Stockton Public Library.
        </p>
      )}
    </>
  );
}
