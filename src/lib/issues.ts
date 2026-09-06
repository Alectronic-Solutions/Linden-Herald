import { issues, type Issue } from "@/data/archive";

/**
 * The Herald has published on Thursdays since 1959. Rather than invent records
 * for issues nobody has scanned, we generate the real publication calendar and
 * mark each date as digitized (a PDF exists) or held only in the bound volumes.
 */
export const FOUNDED_YEAR = 1959;
const FIRST_ISSUE = "1959-01-01";

export type PublicationDate = {
  iso: string;
  volume: number;
  digitized: boolean;
  issue?: Issue;
};

function toISO(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Every Thursday from the founding year through today. */
export function publicationDates(): PublicationDate[] {
  const digitized = new Map(issues.map((i) => [i.date, i]));
  const out: PublicationDate[] = [];

  const cursor = new Date(`${FIRST_ISSUE}T12:00:00Z`);
  // Advance to the first Thursday (4 = Thursday)
  while (cursor.getUTCDay() !== 4) cursor.setUTCDate(cursor.getUTCDate() + 1);

  const end = new Date();
  while (cursor <= end) {
    const iso = toISO(cursor);
    const issue = digitized.get(iso);
    out.push({
      iso,
      volume: cursor.getUTCFullYear() - FOUNDED_YEAR + 1,
      digitized: Boolean(issue),
      issue,
    });
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }
  return out;
}

/** The published issue closest to an arbitrary date. */
export function nearestIssue(target: string, dates: PublicationDate[]) {
  if (!dates.length) return null;
  const t = new Date(`${target}T12:00:00Z`).getTime();
  if (Number.isNaN(t)) return null;

  let best = dates[0];
  let bestDelta = Infinity;
  for (const d of dates) {
    const delta = Math.abs(new Date(`${d.iso}T12:00:00Z`).getTime() - t);
    if (delta < bestDelta) {
      bestDelta = delta;
      best = d;
    }
  }
  return { match: best, daysAway: Math.round(bestDelta / 86_400_000) };
}

/** Count of issues per decade, and how many of them are scanned. */
export function digitizationByDecade(dates: PublicationDate[]) {
  const buckets = new Map<number, { total: number; digitized: number }>();
  for (const d of dates) {
    const decade = Math.floor(Number(d.iso.slice(0, 4)) / 10) * 10;
    const b = buckets.get(decade) ?? { total: 0, digitized: 0 };
    b.total += 1;
    if (d.digitized) b.digitized += 1;
    buckets.set(decade, b);
  }
  return Array.from(buckets.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([decade, counts]) => ({ decade, ...counts }));
}

export const EARLIEST_DATE = FIRST_ISSUE;
