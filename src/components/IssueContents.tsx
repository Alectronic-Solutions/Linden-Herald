import { sectionName } from "@/data/site";
import type { IssueItem } from "@/data/archive";

/**
 * The table of contents for one printed issue. This is as far as the site goes
 * into a story: headline, section, page number and at most a one-line summary.
 * The text itself only exists in the paper.
 */
export default function IssueContents({
  contents,
  variant = "full",
}: {
  contents: IssueItem[];
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <ul className="space-y-2 font-body text-[1rem] text-ink-muted">
        {contents.map((item) => (
          <li key={item.title} className="flex gap-2">
            <span aria-hidden className="text-harvest">
              &#9670;
            </span>
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {contents.map((item) => (
        <li key={item.title} className="flex gap-4 py-4">
          <span
            aria-hidden
            className="mt-1 w-10 shrink-0 font-label text-[0.78rem] uppercase tracking-[0.12em] text-ink-faint"
          >
            {item.page ? `p. ${item.page}` : ""}
          </span>
          <div className="min-w-0">
            <p className="font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald">
              {sectionName(item.section)}
              {item.page && <span className="sr-only">, page {item.page}</span>}
            </p>
            <p className="mt-1 font-display text-lg font-bold leading-snug">{item.title}</p>
            {item.deck && (
              <p className="mt-1.5 font-body text-[1rem] leading-relaxed text-ink-muted">
                {item.deck}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
