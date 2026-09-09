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
        "flex min-h-[2.75rem] items-center border px-4 font-label text-[0.86rem] font-semibold uppercase tracking-[0.12em] transition-colors",
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
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
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
      className="mt-5 font-label text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-ink-muted"
    >
      {children}
    </p>
  );
}
