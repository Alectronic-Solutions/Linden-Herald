"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import IssueCover from "@/components/IssueCover";
import { FilterChip, FilterGroup, ResultCount } from "@/components/FilterChip";
import { sortedIssues as issues, archiveYears, issueHeadlines } from "@/data/archive";
import { asset, formatDate, formatFileSize } from "@/lib/utils";

export default function ArchiveBrowser() {
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return issues
      .filter((i) => (year === "all" ? true : i.date.startsWith(year)))
      .filter((i) =>
        q ? `${i.label} ${issueHeadlines(i).join(" ")}`.toLowerCase().includes(q) : true,
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
          <span className="field-label" aria-hidden="true">
            Filter by year
          </span>
          <FilterGroup label="Filter by year">
            <FilterChip active={year === "all"} onClick={() => setYear("all")}>
              All years
            </FilterChip>
            {archiveYears.map((y) => (
              <FilterChip key={y} active={year === y} onClick={() => setYear(y)}>
                {y}
              </FilterChip>
            ))}
          </FilterGroup>
        </div>
      </div>

      <ResultCount>
        {results.length} {results.length === 1 ? "issue" : "issues"} available
      </ResultCount>

      {/*
        These cards carried a framer-motion entry animation, which wrote
        style="opacity:0" into the exported HTML. With JavaScript unavailable, or
        before hydration, the whole archive rendered blank. The cards are the
        same elements on every filter change, so the fade bought nothing and cost
        a layout measure pass per keystroke.
      */}
      <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((issue) => (
          <article key={issue.date} className="group">
            <Link
              href={`/archive/${issue.date}`}
              className="block transition-transform duration-500 group-hover:-translate-y-1.5"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="shadow-page transition-shadow duration-500 group-hover:shadow-lift">
                <IssueCover date={issue.date} volume={issue.volume} number={issue.number} />
              </div>
            </Link>
            <h3 className="mt-3 font-display text-lg font-bold leading-tight">
              <Link href={`/archive/${issue.date}`} className="headline-link">
                {formatDate(issue.date)}
              </Link>
            </h3>
            <p className="mt-1 font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
              {issue.pages} pages &middot;{" "}
              <a
                href={asset(issue.file)}
                className="underline decoration-dotted underline-offset-2 hover:text-herald"
                download
              >
                PDF {formatFileSize(issue.sizeBytes)}
              </a>
            </p>
            <ul className="mt-2 space-y-1 font-body text-[0.88rem] leading-snug text-ink-muted">
              {issueHeadlines(issue, 2).map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </article>
        ))}
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
