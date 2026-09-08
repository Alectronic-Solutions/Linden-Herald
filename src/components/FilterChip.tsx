import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The filter control shared by the archive, calendar, classifieds and ad size
 * previewer. All four had their own copy of this class list.
 */
export function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3 py-1.5 font-label text-[0.76rem] font-semibold uppercase tracking-[0.14em] transition-colors",
        active
          ? "border-ink bg-ink text-newsprint-white"
          : "border-rule-strong text-ink-muted hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

/**
 * Wraps a row of chips so assistive technology announces what the buttons
 * filter. Without it the chips are an unlabelled run of toggles.
 */
export function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {children}
    </div>
  );
}

/**
 * The result count. It is the only feedback a filter gives, so it has to be a
 * live region or a screen-reader user gets no confirmation anything happened.
 */
export function ResultCount({ children }: { children: ReactNode }) {
  return (
    <p
      aria-live="polite"
      aria-atomic="true"
      className="mt-5 font-label text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint"
    >
      {children}
    </p>
  );
}
