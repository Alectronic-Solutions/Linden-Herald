"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const TEXT_SIZE_KEY = "lh-text-size";

const OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "large", label: "Larger" },
  { value: "largest", label: "Largest" },
] as const;

type Size = (typeof OPTIONS)[number]["value"];

/**
 * The reader's own text size, kept in the folio line where a newspaper keeps
 * its furniture.
 *
 * Browsers have done this since forever with Ctrl and the plus key, and the
 * accessibility statement says so, but that is a thing you have to already know
 * and it belongs to the browser rather than to the reader — on the shared
 * computer in a farmhouse kitchen, changing it changes it for everyone. A
 * control on the page is the version a reader who needs it can actually find.
 *
 * The work is done by `data-text-size` on <html> and two rules in globals.css.
 * Every size on this site is set in rem, so the whole paper moves together.
 * layout.tsx restores the stored choice before first paint, so a reader who
 * needs the largest setting never sees a flash of the smallest.
 */
export default function TextSize() {
  // Read after mount, not during render: the exported HTML is one file served
  // to every reader and cannot know which of them chose what.
  const [size, setSize] = useState<Size>("normal");

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-text-size");
    if (stored === "large" || stored === "largest") setSize(stored);
  }, []);

  function choose(next: Size) {
    setSize(next);
    const root = document.documentElement;
    if (next === "normal") root.removeAttribute("data-text-size");
    else root.setAttribute("data-text-size", next);
    try {
      localStorage.setItem(TEXT_SIZE_KEY, next);
    } catch {
      // Private browsing, or storage turned off. The choice still applies to
      // this page; it just will not be remembered on the next one.
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span id="text-size-label" className="text-ink-muted">
        Text size
      </span>
      <div role="group" aria-labelledby="text-size-label" className="flex">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => choose(option.value)}
            aria-pressed={size === option.value}
            className={cn(
              "-ml-px min-h-[2.25rem] border px-2.5 font-label font-semibold uppercase tracking-[0.1em] transition-colors first:ml-0",
              size === option.value
                ? "border-ink bg-ink text-newsprint-white"
                : "border-rule-strong text-ink-muted hover:border-ink hover:text-ink",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
