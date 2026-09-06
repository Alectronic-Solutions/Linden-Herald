"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  displayAdSizes,
  PAGE_WIDTH_IN,
  PAGE_HEIGHT_IN,
  type AdSize,
} from "@/data/rates";
import { cn } from "@/lib/utils";

/** Filler column lines so the ad reads against something page-like. */
function PageFill() {
  return (
    <div className="absolute inset-0 flex gap-[3%] p-[4%]" aria-hidden>
      {[0, 1, 2, 3].map((col) => (
        <div key={col} className="flex flex-1 flex-col gap-[3px]">
          {col === 0 && <div className="mb-1 h-[6px] w-full bg-ink/60" />}
          {Array.from({ length: 34 }).map((_, i) => (
            <div
              key={i}
              className="h-[2px] bg-ink/20"
              style={{ width: `${88 + ((i * 7 + col * 13) % 12)}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function AdSizePreviewer() {
  const [selected, setSelected] = useState<AdSize>(displayAdSizes[1]);

  const wPct = (selected.widthIn / PAGE_WIDTH_IN) * 100;
  const hPct = (selected.heightIn / PAGE_HEIGHT_IN) * 100;
  const coverage = ((selected.widthIn * selected.heightIn) /
    (PAGE_WIDTH_IN * PAGE_HEIGHT_IN)) * 100;

  const position =
    selected.placement === "top"
      ? { top: "0%", left: "0%" }
      : selected.placement === "fill"
        ? { top: "0%", left: "0%" }
        : { bottom: "0%", right: "0%" };

  return (
    <section aria-labelledby="ad-preview" className="border-[3px] border-ink bg-newsprint-white">
      <div className="border-b border-rule bg-ink px-6 py-4 text-newsprint-white sm:px-8">
        <p className="kicker text-harvest-light">See it before you buy it</p>
        <h2 id="ad-preview" className="mt-1 font-display text-3xl font-black text-newsprint-white sm:text-4xl">
          How big is my ad, really?
        </h2>
        <p className="mt-2 max-w-2xl font-body text-[0.98rem] leading-relaxed text-newsprint-deep/80">
          Nobody pictures three and a quarter inches. Pick a size and see it land on the page at
          true proportion.
        </p>
      </div>

      <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Advertisement sizes">
            {displayAdSizes.map((ad) => (
              <button
                key={ad.id}
                type="button"
                onClick={() => setSelected(ad)}
                aria-pressed={selected.id === ad.id}
                className={cn(
                  "border px-3 py-2 font-label text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition-colors",
                  selected.id === ad.id
                    ? "border-ink bg-ink text-newsprint-white"
                    : "border-rule-strong text-ink-muted hover:border-ink hover:text-ink",
                )}
              >
                {ad.name}
              </button>
            ))}
          </div>

          {/* Scaled page. The aspect ratio matches the printed 10 x 13 page. */}
          <div className="mt-6 flex justify-center">
            <div
              className="relative w-full max-w-[26rem] bg-newsprint-white shadow-lift ring-1 ring-rule-strong"
              style={{ aspectRatio: `${PAGE_WIDTH_IN} / ${PAGE_HEIGHT_IN}` }}
            >
              <div className="absolute inset-x-0 top-0 border-b border-ink/40 px-[4%] py-[2%] text-center">
                <p className="font-display text-[0.7rem] font-black leading-none">
                  The Linden Herald
                </p>
              </div>
              <div className="absolute inset-0 top-[7%]">
                <PageFill />
              </div>

              <motion.div
                layout
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className="absolute flex items-center justify-center border-2 border-cherry bg-cherry/12 backdrop-blur-[1px]"
                style={{ width: `${wPct}%`, height: `${hPct}%`, ...position }}
              >
                <span className="px-2 text-center font-label text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.12em] text-cherry">
                  Your ad
                  <br />
                  {selected.size}
                </span>
              </motion.div>
            </div>
          </div>
          <p className="mt-3 text-center font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
            Shown against a full {PAGE_WIDTH_IN}&quot; x {PAGE_HEIGHT_IN}&quot; page
          </p>
        </div>

        <aside>
          <div className="border-2 border-ink bg-newsprint p-6">
            <p className="kicker text-cherry">{selected.name}</p>
            <p className="mt-2 font-display text-4xl font-black leading-none">{selected.size}</p>
            <p className="mt-4 font-body text-[0.96rem] leading-relaxed text-ink-muted">
              Best for: {selected.best}
            </p>

            <div className="mt-5 border-t border-rule pt-4">
              <p className="font-label text-[0.74rem] uppercase tracking-[0.12em] text-ink-faint">
                Share of the page
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-2.5 flex-1 overflow-hidden bg-rule">
                  <motion.div
                    className="h-full bg-herald"
                    initial={false}
                    animate={{ width: `${coverage}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="font-display text-lg font-bold">{Math.round(coverage)}%</span>
              </div>
            </div>

            <p className="mt-5 font-body text-[0.92rem] leading-relaxed text-ink-muted">
              We build the artwork at no charge. Send a logo and the details and we will lay it out
              for your approval before it runs.
            </p>
            <a href="#notice-request" className="btn-primary mt-5 w-full text-xs">
              Ask about this size
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
