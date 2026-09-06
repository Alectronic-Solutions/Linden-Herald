export type Issue = {
  date: string; // ISO
  label: string; // Printed cover date
  volume: number;
  number: number;
  sizeMb: number;
  pages: number;
  file: string;
  cover?: string;
  highlights: string[];
};

/**
 * The seven most recent entries mirror the issues currently posted on the
 * Herald's existing archive page. Earlier entries are included to demonstrate
 * year filtering and will be replaced by the real back catalogue.
 */
export const issues: Issue[] = [
  {
    date: "2026-09-03",
    label: "September 3, 2026",
    volume: 68,
    number: 36,
    sizeMb: 13.6,
    pages: 12,
    file: "/issues/linden-herald-2026-09-03.pdf",
    highlights: ["Cherry harvest arrives early", "Lions open at home", "Fair week schedule"],
  },
  {
    date: "2026-08-06",
    label: "August 6, 2026",
    volume: 68,
    number: 32,
    sizeMb: 19.1,
    pages: 16,
    file: "/issues/linden-herald-2026-08-06.pdf",
    highlights: ["County road work east of town", "Junior livestock entries up"],
  },
  {
    date: "2026-07-30",
    label: "July 30, 2026",
    volume: 68,
    number: 31,
    sizeMb: 19.4,
    pages: 16,
    file: "/issues/linden-herald-2026-07-30.pdf",
    highlights: ["Water board sets fall calendar", "Summer reading program wraps"],
  },
  {
    date: "2026-07-23",
    label: "July 23, 2026",
    volume: 68,
    number: 30,
    sizeMb: 14.4,
    pages: 12,
    file: "/issues/linden-herald-2026-07-23.pdf",
    highlights: ["Fire district budget hearing", "Legal notices"],
  },
  {
    date: "2026-07-09",
    label: "July 9, 2026",
    volume: 68,
    number: 28,
    sizeMb: 17.2,
    pages: 14,
    file: "/issues/linden-herald-2026-07-09.pdf",
    highlights: ["Fourth of July in pictures", "Walnut market outlook"],
  },
  {
    date: "2026-07-02",
    label: "July 2, 2026",
    volume: 68,
    number: 27,
    sizeMb: 15.4,
    pages: 12,
    file: "/issues/linden-herald-2026-07-02.pdf",
    highlights: ["School board facilities report", "Sheriff and fire calls"],
  },
  {
    date: "2026-06-18",
    label: "June 18, 2026",
    volume: 68,
    number: 25,
    sizeMb: 23.3,
    pages: 20,
    file: "/issues/linden-herald-2026-06-18.pdf",
    highlights: ["Graduation edition", "Class of 2026 portraits"],
  },
  {
    date: "2026-05-21",
    label: "May 21, 2026",
    volume: 68,
    number: 21,
    sizeMb: 16.8,
    pages: 14,
    file: "/issues/linden-herald-2026-05-21.pdf",
    highlights: ["Bloom report", "Track and field results"],
  },
  {
    date: "2026-04-16",
    label: "April 16, 2026",
    volume: 68,
    number: 16,
    sizeMb: 15.2,
    pages: 12,
    file: "/issues/linden-herald-2026-04-16.pdf",
    highlights: ["Spring planting", "City council notes"],
  },
  {
    date: "2025-11-13",
    label: "November 13, 2025",
    volume: 67,
    number: 46,
    sizeMb: 18.4,
    pages: 16,
    file: "/issues/linden-herald-2025-11-13.pdf",
    highlights: ["Election results", "Harvest wrap-up"],
  },
  {
    date: "2025-09-04",
    label: "September 4, 2025",
    volume: 67,
    number: 36,
    sizeMb: 14.9,
    pages: 12,
    file: "/issues/linden-herald-2025-09-04.pdf",
    highlights: ["Back to school", "Fall sports preview"],
  },
  {
    date: "2025-06-19",
    label: "June 19, 2025",
    volume: 67,
    number: 25,
    sizeMb: 21.7,
    pages: 20,
    file: "/issues/linden-herald-2025-06-19.pdf",
    highlights: ["Graduation edition", "Cherry season review"],
  },
];

export const archiveYears = Array.from(new Set(issues.map((i) => i.date.slice(0, 4)))).sort(
  (a, b) => Number(b) - Number(a),
);
