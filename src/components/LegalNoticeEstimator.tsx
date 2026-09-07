"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { legalNoticeRates } from "@/data/rates";
import { site } from "@/data/site";
import { cn, formatDate } from "@/lib/utils";

/** Next Thursday on or after a date, plus the Monday noon deadline before it. */
function schedule(from: string) {
  const start = new Date(`${from}T12:00:00Z`);
  if (Number.isNaN(start.getTime())) return null;

  const firstRun = new Date(start);
  while (firstRun.getUTCDay() !== 4) firstRun.setUTCDate(firstRun.getUTCDate() + 1);

  const deadline = new Date(firstRun);
  deadline.setUTCDate(deadline.getUTCDate() - 3); // Monday before

  return {
    firstRun: firstRun.toISOString().slice(0, 10),
    deadline: deadline.toISOString().slice(0, 10),
    passed: deadline.getTime() < Date.now(),
  };
}

export default function LegalNoticeEstimator() {
  const [noticeId, setNoticeId] = useState("");
  const [extraNames, setExtraNames] = useState(0);
  const [needBy, setNeedBy] = useState("");

  const notice = legalNoticeRates.find((n) => n.id === noticeId);
  const isFbn = notice?.id.startsWith("fbn") ?? false;
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const plan = needBy ? schedule(needBy) : null;

  const total =
    notice?.numericPrice === null || !notice
      ? null
      : notice.numericPrice + (isFbn ? extraNames * 10 : 0);

  const complete = Boolean(notice && needBy);

  return (
    <section
      aria-labelledby="estimator"
      className="border-[3px] border-ink bg-newsprint-white"
    >
      <div className="border-b border-rule bg-herald px-6 py-4 text-newsprint-white sm:px-8">
        <p className="kicker text-harvest-light">No phone call required</p>
        <h2 id="estimator" className="mt-1 font-display text-3xl font-black text-newsprint-white sm:text-4xl">
          What will my notice cost?
        </h2>
        <p className="mt-2 max-w-2xl font-body text-[0.98rem] leading-relaxed text-newsprint-deep/85">
          Answer three questions and you will have the price, the dates it runs, and the documents
          to bring.
        </p>
      </div>

      <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-2">
        <div className="space-y-6">
          <fieldset>
            <legend className="field-label mb-2">
              <span className="mr-2 inline-block bg-ink px-1.5 text-newsprint-white">1</span>
              What are you filing?
            </legend>
            <div className="space-y-1.5">
              {legalNoticeRates.map((n) => (
                <label
                  key={n.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 border px-3.5 py-2.5 transition-colors",
                    noticeId === n.id
                      ? "border-ink bg-newsprint"
                      : "border-rule-strong hover:border-ink",
                  )}
                >
                  <input
                    type="radio"
                    name="notice-type"
                    value={n.id}
                    checked={noticeId === n.id}
                    onChange={() => {
                      setNoticeId(n.id);
                      setExtraNames(0);
                    }}
                    className="mt-1 accent-[#1B4D3E]"
                  />
                  <span>
                    <span className="block font-display text-[1rem] font-bold leading-snug">
                      {n.type}
                    </span>
                    <span className="block font-label text-[0.74rem] uppercase tracking-[0.12em] text-ink-faint">
                      {n.price}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <AnimatePresence>
            {isFbn && (
              <motion.fieldset
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <legend className="field-label mb-2">
                  <span className="mr-2 inline-block bg-ink px-1.5 text-newsprint-white">2</span>
                  Additional business names
                </legend>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={extraNames}
                    onChange={(e) =>
                      setExtraNames(Math.max(0, Math.min(20, Number(e.target.value) || 0)))
                    }
                    className="field w-24"
                    aria-describedby="extra-names-help"
                  />
                  <p id="extra-names-help" className="font-body text-[0.9rem] text-ink-muted">
                    Beyond the first. $10 each.
                  </p>
                </div>
              </motion.fieldset>
            )}
          </AnimatePresence>

          <div>
            <label htmlFor="need-by" className="field-label mb-2 block">
              <span className="mr-2 inline-block bg-ink px-1.5 text-newsprint-white">
                {isFbn ? 3 : 2}
              </span>
              When do you need it running by?
            </label>
            <input
              id="need-by"
              type="date"
              min={today}
              value={needBy}
              onChange={(e) => setNeedBy(e.target.value)}
              className="field sm:max-w-xs"
            />
          </div>
        </div>

        {/* Result */}
        <div>
          <AnimatePresence mode="wait">
            {complete && notice ? (
              <motion.div
                key={`${notice.id}-${extraNames}-${needBy}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="border-2 border-ink bg-newsprint p-6"
              >
                <p className="kicker text-cherry">Your estimate</p>
                <p className="mt-2 font-display text-6xl font-black leading-none">
                  {total === null ? "Quote" : `$${total}`}
                </p>
                <p className="mt-2 font-body text-[0.95rem] text-ink-muted">
                  {notice.type}
                  {isFbn && extraNames > 0
                    ? ` plus ${extraNames} additional ${extraNames === 1 ? "name" : "names"}`
                    : ""}
                  .{" "}
                  {total === null
                    ? "Trustee sales are priced by the column inch. Call and we will quote it the same day."
                    : notice.runWeeks + "."}
                </p>

                {plan && (
                  <dl className="mt-5 divide-y divide-rule border-y border-rule">
                    <div className="flex justify-between gap-4 py-2.5">
                      <dt className="font-label text-[0.74rem] uppercase tracking-[0.12em] text-ink-faint">
                        Copy deadline
                      </dt>
                      <dd className="text-right font-body text-[0.95rem] font-semibold">
                        {formatDate(plan.deadline)}, noon
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 py-2.5">
                      <dt className="font-label text-[0.74rem] uppercase tracking-[0.12em] text-ink-faint">
                        First publication
                      </dt>
                      <dd className="text-right font-body text-[0.95rem] font-semibold">
                        {formatDate(plan.firstRun)}
                      </dd>
                    </div>
                    {notice.filedFor && (
                      <div className="flex justify-between gap-4 py-2.5">
                        <dt className="font-label text-[0.74rem] uppercase tracking-[0.12em] text-ink-faint">
                          Proof of publication
                        </dt>
                        <dd className="text-right font-body text-[0.95rem] font-semibold text-herald">
                          Filed for you, no charge
                        </dd>
                      </div>
                    )}
                  </dl>
                )}

                <h3 className="mt-5 font-display text-lg font-bold">What to bring</h3>
                <ul className="mt-2 space-y-1.5">
                  {notice.bring.map((b) => (
                    <li key={b} className="flex gap-2 font-body text-[0.93rem] text-ink-muted">
                      <span aria-hidden className="text-harvest">
                        &#9670;
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="#notice-request" className="btn-primary text-xs">
                    Start this notice
                  </Link>
                  <a href={site.phoneHref} className="btn-outline text-xs">
                    Call {site.phone}
                  </a>
                </div>
                <p className="mt-4 font-label text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
                  Estimate only. We confirm every notice against the court&apos;s requirements
                  before it runs.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[16rem] items-center justify-center border-2 border-dashed border-rule-strong p-8 text-center"
              >
                <p className="max-w-xs font-body text-[0.96rem] leading-relaxed text-ink-faint">
                  Choose a notice type and a date, and your price and schedule will appear here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
