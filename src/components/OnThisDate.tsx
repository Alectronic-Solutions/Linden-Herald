"use client";

import { useEffect, useMemo, useState } from "react";
import IssueCover from "@/components/IssueCover";
import {
  publicationDates,
  nearestIssue,
  digitizationByDecade,
  EARLIEST_DATE,
  type PublicationDate,
} from "@/lib/issues";
import { issueHeadlines } from "@/data/archive";
import { site } from "@/data/site";
import { asset, formatDate, formatFileSize } from "@/lib/utils";

type Result = { match: PublicationDate; daysAway: number };

export default function OnThisDate() {
  // Computed after mount so the publication calendar always ends at the
  // reader's today rather than the date the site was last built.
  const [dates, setDates] = useState<PublicationDate[] | null>(null);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setDates(publicationDates());
  }, []);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const decades = useMemo(() => (dates ? digitizationByDecade(dates) : []), [dates]);
  const totalIssues = dates?.length ?? 0;
  const totalDigitized = dates?.filter((d) => d.digitized).length ?? 0;

  function look(up: string) {
    if (!dates || !up) return;
    setValue(up);
    setTouched(true);
    setResult(nearestIssue(up, dates));
  }

  function surprise() {
    if (!dates) return;
    const pick = dates[Math.floor(Math.random() * dates.length)];
    look(pick.iso);
  }

  return (
    <section aria-labelledby="on-this-date" className="border-[3px] border-ink bg-newsprint-white">
      <div className="border-b border-rule bg-ink px-6 py-4 text-newsprint-white sm:px-8">
        <p className="kicker text-harvest-light">Search 67 years</p>
        <h2
          id="on-this-date"
          className="mt-1 font-display text-3xl font-black text-newsprint-white sm:text-4xl"
        >
          On This Date
        </h2>
        <p className="mt-2 max-w-2xl font-body text-[0.98rem] leading-relaxed text-newsprint-deep/80">
          The Herald has come out every Thursday since 1959. Pick any date and we will find the
          issue closest to it. The week you were born, the week you were married, the week the Lions
          finally won league.
        </p>
      </div>

      <div className="px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="sm:max-w-xs sm:flex-1">
            <label htmlFor="otd-date" className="field-label">
              Pick a date
            </label>
            <input
              id="otd-date"
              type="date"
              min={EARLIEST_DATE}
              max={today}
              value={value}
              disabled={!dates}
              onChange={(e) => look(e.target.value)}
              className="field disabled:bg-newsprint-deep disabled:text-ink-muted"
            />
          </div>
          <button
            type="button"
            onClick={surprise}
            disabled={!dates}
            className="btn-outline py-2.5 text-xs disabled:border-rule-strong disabled:text-ink-faint"
          >
            Surprise me
          </button>
        </div>

        {/* The matched issue appears with no other feedback, so announce it. */}
        <div aria-live="polite" aria-atomic="true">
          {result && (
            <div className="mt-7 border-t-2 border-ink pt-7">
              <div className="grid gap-7 sm:grid-cols-[10rem_1fr]">
                <div className="w-40 shadow-page">
                  <IssueCover
                    date={result.match.iso}
                    volume={result.match.volume}
                    number={result.match.issue?.number ?? 1}
                  />
                </div>
                <div>
                  <p className="kicker text-cherry">
                    {result.daysAway === 0
                      ? "Published that very day"
                      : `Closest issue, ${result.daysAway} ${result.daysAway === 1 ? "day" : "days"} away`}
                  </p>
                  <p className="mt-2 font-display text-3xl font-black leading-tight">
                    {formatDate(result.match.iso)}
                  </p>
                  <p className="mt-1 font-label text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">
                    Volume {result.match.volume}
                  </p>

                  {result.match.digitized && result.match.issue ? (
                    <>
                      <ul className="mt-4 space-y-1.5 font-body text-[0.96rem] text-ink-muted">
                        {issueHeadlines(result.match.issue).map((h: string) => (
                          <li key={h} className="flex gap-2">
                            <span aria-hidden className="text-harvest">
                              &#9670;
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <a href={asset(result.match.issue.file)} className="btn-primary mt-5 text-xs">
                        Read this issue &middot; PDF {formatFileSize(result.match.issue.sizeBytes)}
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="mt-4 max-w-lg font-body text-[0.98rem] leading-relaxed text-ink-muted">
                        This issue has not been scanned yet. It exists in the Herald&apos;s bound
                        volumes, and copies from {EARLIEST_DATE.slice(0, 4)} onward are available
                        for review at the Stockton Public Library. Call the office and we will pull
                        the page for you.
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <a href={site.phoneHref} className="btn-primary text-xs">
                          Request this issue
                        </a>
                        <a href="/contact" className="btn-outline text-xs">
                          Send a note
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {touched && !result && (
            <p className="mt-6 font-body text-ink-muted">
              No issue found for that date. Try another.
            </p>
          )}
        </div>

        {/* Coverage by decade. Also shows how much of the back catalogue is scanned. */}
        {dates && (
          <div className="mt-9 border-t border-rule pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-bold">What is online so far</h3>
              <p className="font-label text-[0.76rem] uppercase tracking-[0.14em] text-ink-faint">
                {totalDigitized.toLocaleString()} of {totalIssues.toLocaleString()} issues scanned
              </p>
            </div>
            <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {decades.map((d) => {
                const pct = d.total ? (d.digitized / d.total) * 100 : 0;
                return (
                  <li key={d.decade}>
                    <div
                      className="relative h-20 w-full overflow-hidden border border-rule-strong bg-newsprint"
                      role="img"
                      aria-label={`${d.decade}s: ${d.digitized} of ${d.total} issues scanned`}
                    >
                      {/* Unscanned issues read as waiting, not as missing */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, rgba(20,17,15,0.10) 0 2px, transparent 2px 6px)",
                        }}
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 bg-herald transition-[height] duration-700"
                        style={{ height: `${pct > 0 ? Math.max(pct, 8) : 0}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-center font-label text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink">
                      {String(d.decade).slice(2)}s
                    </p>
                    <p className="text-center font-label text-[0.64rem] uppercase tracking-[0.06em] text-ink-faint">
                      {d.digitized}/{d.total}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 max-w-2xl font-body text-[0.92rem] leading-relaxed text-ink-muted">
              Every Thursday since 1959 is accounted for above. Solid green is what a reader can
              open right now. The hatched area is the Herald&apos;s back catalogue, waiting in the
              bound volumes for someone to scan it.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
