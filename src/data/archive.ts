import type { SectionSlug } from "@/data/site";

/**
 * One line in a printed issue's table of contents.
 *
 * The Herald is a print-only paper, so the site never carries story text. It
 * lists what ran, in which section and on which page, and points readers at the
 * PDF or a subscription.
 */
export type IssueItem = {
  title: string;
  section: SectionSlug;
  /** One-line summary. Deliberately never a full story. */
  deck?: string;
  page?: number;
};

export type Issue = {
  date: string; // ISO
  label: string; // Printed cover date
  volume: number;
  number: number;
  sizeMb: number;
  pages: number;
  file: string;
  cover?: string;
  contents: IssueItem[];
};

/**
 * The seven most recent entries mirror the issues currently posted on the
 * Herald's existing archive page. Earlier entries are included to demonstrate
 * year filtering and will be replaced by the real back catalogue.
 *
 * VERIFY: volume numbers, issue numbers, page counts and every contents line
 * below are sample data. See VERIFY.md.
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
    contents: [
      {
        title: "Warm spring pulls cherry harvest forward by nearly two weeks",
        section: "agriculture",
        deck: "Packing sheds along Highway 26 opened ahead of schedule, and growers say the crop is smaller but sweeter than last season.",
        page: 1,
      },
      {
        title: "Trustees weigh a facilities bond for the November ballot",
        section: "schools",
        deck: "A packed board room heard three hours of public comment on classroom repairs, a new gymnasium roof and the cost of putting it before voters.",
        page: 1,
      },
      {
        title: "Striping crews finish ahead of the harvest traffic",
        section: "news",
        deck: "The resurfacing project east of town wrapped two weeks early, in time for the equipment moves that come with the season.",
        page: 3,
      },
      {
        title: "Lions open the season at home with a new backfield and a familiar defense",
        section: "sports",
        deck: "A young offense showed flashes in the opener while the defensive line, returning nearly intact, set the tone from the first series.",
        page: 8,
      },
      {
        title: "Volleyball opens with a sweep and a deep bench",
        section: "sports",
        deck: "A young roster took the opener in three sets, and the coach got everybody into the match.",
        page: 9,
      },
      { title: "Fair week schedule", section: "news", page: 5 },
    ],
  },
  {
    date: "2026-08-27",
    label: "August 27, 2026",
    volume: 68,
    number: 35,
    sizeMb: 15.8,
    pages: 14,
    file: "/issues/linden-herald-2026-08-27.pdf",
    contents: [
      {
        title: "Irrigation district sets fall allocation after a middling snowpack year",
        section: "news",
        deck: "Directors approved a schedule that holds allocations flat while reserving room to adjust if late-season demand runs high.",
        page: 1,
      },
      {
        title: "Fair week returns with a full livestock barn and a rebuilt grandstand",
        section: "news",
        deck: "Organizers report entries up across junior livestock, and the grandstand reopens after two seasons of repairs.",
        page: 1,
      },
      {
        title: "Post office trims window hours, and the line gets longer",
        section: "news",
        deck: "Counter service now closes an hour earlier on weekdays, a change residents say lands hardest on people who work in Stockton.",
        page: 3,
      },
      {
        title: "Some growers are pulling almonds, and not replanting them",
        section: "agriculture",
        deck: "Water cost and a soft market have made marginal blocks hard to justify, and a few ranches are going back to row crops.",
        page: 6,
      },
      {
        title: "State scores come back mixed, with gains in the early grades",
        section: "schools",
        deck: "Elementary reading improved for a third year while middle school math stayed flat.",
        page: 4,
      },
      {
        title: "Runners open the season on a hot course",
        section: "sports",
        deck: "Times were slower across the field at the season's first invitational, held in triple-digit heat.",
        page: 10,
      },
    ],
  },
  {
    date: "2026-08-20",
    label: "August 20, 2026",
    volume: 68,
    number: 34,
    sizeMb: 17.6,
    pages: 16,
    file: "/issues/linden-herald-2026-08-20.pdf",
    contents: [
      {
        title: "Fire district closes out a quieter summer, credits fuel reduction work",
        section: "public-safety",
        deck: "Call volume finished below the five-year average, and the chief points to spring clearing along the district's east edge.",
        page: 1,
      },
      {
        title: "County pursues grant money for broadband east of town",
        section: "news",
        deck: "Households past the school district line still have no wired option, and the application would fund a fiber run along the main county road.",
        page: 1,
      },
      {
        title: "Grass fire east of town contained at eleven acres",
        section: "public-safety",
        deck: "Crews from three districts held the fire short of an orchard, with no structures lost.",
        page: 3,
      },
      {
        title: "A town that reads about itself is a town that shows up",
        section: "opinion",
        deck: "Sixty-seven years on, the argument for a weekly paper has not changed much. It has only gotten more urgent.",
        page: 4,
      },
      {
        title: "Publish the water numbers before the hearing, not at it",
        section: "opinion",
        deck: "Ratepayers cannot comment usefully on a proposal they see for the first time in the room.",
        page: 4,
      },
      {
        title: "Basketball returns most of a rotation that got hot late",
        section: "sports",
        deck: "Four starters are back from a team that won five of its last seven, and the schedule opens at home.",
        page: 11,
      },
    ],
  },
  {
    date: "2026-08-13",
    label: "August 13, 2026",
    volume: 68,
    number: 33,
    sizeMb: 14.9,
    pages: 12,
    file: "/issues/linden-herald-2026-08-13.pdf",
    contents: [
      {
        title: "Water district sets a hearing on rates for the first time in six years",
        section: "news",
        deck: "Directors will take public comment before voting on a schedule that staff say reflects the cost of deferred maintenance.",
        page: 1,
      },
      {
        title: "Walnut growers head into harvest facing another thin market",
        section: "agriculture",
        deck: "Carryover from last season and soft export demand have kept prices well below where growers need them to be.",
        page: 1,
      },
      {
        title: "District fills every classroom before the first bell",
        section: "schools",
        deck: "A full slate of hires, including two positions that went unfilled last year.",
        page: 3,
      },
      {
        title: "Letters: the road project, the fair, and a word about the band drive",
        section: "opinion",
        deck: "Readers on the county's paving schedule, the junior livestock auction, and the instruments that turned up.",
        page: 4,
      },
      {
        title: "From the morgue: Main Street, before the highway was widened",
        section: "history",
        deck: "A photograph from the Herald's early files shows a business district most residents would still recognize, and a few storefronts they would not.",
        page: 7,
      },
    ],
  },
  {
    date: "2026-08-06",
    label: "August 6, 2026",
    volume: 68,
    number: 32,
    sizeMb: 19.1,
    pages: 16,
    file: "/issues/linden-herald-2026-08-06.pdf",
    contents: [
      {
        title: "County schedules road work east of town through October",
        section: "news",
        deck: "Expect one-way traffic control on weekdays and occasional full closures during paving.",
        page: 1,
      },
      {
        title: "Another dairy sells, and the herd moves south",
        section: "agriculture",
        deck: "The count of working dairies in the area is down again, continuing a consolidation that has run for two decades.",
        page: 6,
      },
      {
        title: "From the morgue: fair week, somewhere in the middle sixties",
        section: "history",
        deck: "A folder of livestock barn photographs with no names attached, and a request for help.",
        page: 7,
      },
      { title: "Junior livestock entries up", section: "agriculture", page: 5 },
    ],
  },
  {
    date: "2026-07-30",
    label: "July 30, 2026",
    volume: 68,
    number: 31,
    sizeMb: 19.4,
    pages: 16,
    file: "/issues/linden-herald-2026-07-30.pdf",
    contents: [
      {
        title: "State puts the district's population close to flat",
        section: "news",
        deck: "New estimates show the area holding steady, with a slight shift toward older households.",
        page: 1,
      },
      {
        title: "Quarterly report shows property crime down, calls up",
        section: "public-safety",
        deck: "Reported thefts fell against last year while total calls for service rose, most of them non-criminal.",
        page: 3,
      },
      {
        title: "The ones who come back",
        section: "opinion",
        deck: "Two of this year's new teachers grew up here. That is a longer story than a staffing note.",
        page: 4,
      },
      { title: "Summer reading program wraps", section: "schools", page: 5 },
    ],
  },
  {
    date: "2026-07-23",
    label: "July 23, 2026",
    volume: 68,
    number: 30,
    sizeMb: 14.4,
    pages: 12,
    file: "/issues/linden-herald-2026-07-23.pdf",
    contents: [
      {
        title: "Crews are harder to find, and the season is compressed",
        section: "agriculture",
        deck: "Growers report scrambling for labor as an early harvest concentrated demand into a few weeks.",
        page: 1,
      },
      {
        title: "Local exhibitors take a share of the ribbons at the junior show",
        section: "sports",
        deck: "Showmanship results were strong across several species, and the auction cleared well.",
        page: 8,
      },
      { title: "Fire district budget hearing", section: "public-safety", page: 3 },
      { title: "Legal notices", section: "news", page: 11 },
    ],
  },
  {
    date: "2026-07-16",
    label: "July 16, 2026",
    volume: 68,
    number: 29,
    sizeMb: 16.1,
    pages: 14,
    file: "/issues/linden-herald-2026-07-16.pdf",
    contents: [
      {
        title: "Ag program adds a mechanics section after years on a waiting list",
        section: "schools",
        deck: "Enough students have been turned away that the district found room for a second period.",
        page: 1,
      },
      {
        title: "Volunteers finish resetting stones at the old cemetery",
        section: "history",
        deck: "Two seasons of weekend work have straightened markers that had been leaning for decades.",
        page: 7,
      },
      { title: "Junior show results", section: "sports", page: 9 },
    ],
  },
  {
    date: "2026-07-09",
    label: "July 9, 2026",
    volume: 68,
    number: 28,
    sizeMb: 17.2,
    pages: 14,
    file: "/issues/linden-herald-2026-07-09.pdf",
    contents: [
      {
        title: "Cherry prices hold up despite the rush to pick",
        section: "agriculture",
        deck: "A smaller crop with good size found buyers, and growers report a season that finished better than it started.",
        page: 1,
      },
      { title: "Fourth of July in pictures", section: "news", page: 6 },
      { title: "Walnut market outlook", section: "agriculture", page: 7 },
    ],
  },
  {
    date: "2026-07-02",
    label: "July 2, 2026",
    volume: 68,
    number: 27,
    sizeMb: 15.4,
    pages: 12,
    file: "/issues/linden-herald-2026-07-02.pdf",
    contents: [
      { title: "School board facilities report", section: "schools", page: 1 },
      { title: "Sheriff and fire calls", section: "public-safety", page: 3 },
    ],
  },
  {
    date: "2026-06-25",
    label: "June 25, 2026",
    volume: 68,
    number: 26,
    sizeMb: 15.7,
    pages: 14,
    file: "/issues/linden-herald-2026-06-25.pdf",
    contents: [
      {
        title: "Extension office schedules a farm succession workshop",
        section: "agriculture",
        deck: "Two evening sessions on transferring an operation to the next generation, or deciding not to.",
        page: 1,
      },
      {
        title: "Instrument drive puts horns back in the band room",
        section: "schools",
        deck: "Donated instruments, most of them repaired locally, filled a shortfall the budget did not cover.",
        page: 3,
      },
      {
        title: "Then and now: the block that mostly stayed",
        section: "history",
        deck: "A comparison of the business district across sixty years shows more continuity than change, and one significant loss.",
        page: 7,
      },
    ],
  },
  {
    date: "2026-06-18",
    label: "June 18, 2026",
    volume: 68,
    number: 25,
    sizeMb: 23.3,
    pages: 20,
    file: "/issues/linden-herald-2026-06-18.pdf",
    contents: [
      { title: "Graduation edition", section: "schools", page: 1 },
      { title: "Class of 2026 portraits", section: "schools", page: 8 },
      {
        title: "Senior night set for the last home game",
        section: "sports",
        deck: "Families will be recognised before kickoff, and the boosters are running a barbecue beforehand.",
        page: 14,
      },
      {
        title: "Fire district offers a free CPR class, and it usually fills",
        section: "public-safety",
        deck: "Two sessions this month, open to anyone in the district, with certification available.",
        page: 5,
      },
    ],
  },
  {
    date: "2026-06-11",
    label: "June 11, 2026",
    volume: 68,
    number: 24,
    sizeMb: 18.9,
    pages: 16,
    file: "/issues/linden-herald-2026-06-11.pdf",
    contents: [
      { title: "Graduation preview", section: "schools", page: 1 },
      { title: "Spring sports wrap", section: "sports", page: 10 },
      { title: "Fair entries open", section: "agriculture", page: 5 },
    ],
  },
  {
    date: "2026-05-21",
    label: "May 21, 2026",
    volume: 68,
    number: 21,
    sizeMb: 16.8,
    pages: 14,
    file: "/issues/linden-herald-2026-05-21.pdf",
    contents: [
      { title: "Bloom report", section: "agriculture", page: 1 },
      { title: "Track and field results", section: "sports", page: 9 },
    ],
  },
  {
    date: "2026-05-07",
    label: "May 7, 2026",
    volume: 68,
    number: 19,
    sizeMb: 14.2,
    pages: 12,
    file: "/issues/linden-herald-2026-05-07.pdf",
    contents: [
      { title: "Bloom report", section: "agriculture", page: 1 },
      { title: "Track results", section: "sports", page: 8 },
      { title: "Council notes", section: "news", page: 3 },
    ],
  },
  {
    date: "2026-04-16",
    label: "April 16, 2026",
    volume: 68,
    number: 16,
    sizeMb: 15.2,
    pages: 12,
    file: "/issues/linden-herald-2026-04-16.pdf",
    contents: [
      { title: "Spring planting", section: "agriculture", page: 1 },
      { title: "City council notes", section: "news", page: 3 },
    ],
  },
  {
    date: "2026-03-19",
    label: "March 19, 2026",
    volume: 68,
    number: 12,
    sizeMb: 15.5,
    pages: 12,
    file: "/issues/linden-herald-2026-03-19.pdf",
    contents: [
      { title: "Spring planting", section: "agriculture", page: 1 },
      { title: "Basketball season ends", section: "sports", page: 8 },
      { title: "Water outlook", section: "news", page: 3 },
    ],
  },
  {
    date: "2026-02-12",
    label: "February 12, 2026",
    volume: 68,
    number: 7,
    sizeMb: 13.9,
    pages: 12,
    file: "/issues/linden-herald-2026-02-12.pdf",
    contents: [
      { title: "Pruning season", section: "agriculture", page: 1 },
      { title: "FFA speaking contest", section: "schools", page: 5 },
      { title: "Board vacancy", section: "news", page: 3 },
    ],
  },
  {
    date: "2026-01-15",
    label: "January 15, 2026",
    volume: 68,
    number: 3,
    sizeMb: 14.6,
    pages: 12,
    file: "/issues/linden-herald-2026-01-15.pdf",
    contents: [
      { title: "Year in review", section: "news", page: 1 },
      { title: "Fog and freeze", section: "agriculture", page: 6 },
      { title: "New year at the school", section: "schools", page: 4 },
    ],
  },
  {
    date: "2025-11-13",
    label: "November 13, 2025",
    volume: 67,
    number: 46,
    sizeMb: 18.4,
    pages: 16,
    file: "/issues/linden-herald-2025-11-13.pdf",
    contents: [
      { title: "Election results", section: "news", page: 1 },
      { title: "Harvest wrap-up", section: "agriculture", page: 6 },
    ],
  },
  {
    date: "2025-10-16",
    label: "October 16, 2025",
    volume: 67,
    number: 42,
    sizeMb: 17.1,
    pages: 14,
    file: "/issues/linden-herald-2025-10-16.pdf",
    contents: [
      { title: "Walnut harvest", section: "agriculture", page: 1 },
      { title: "Homecoming", section: "sports", page: 9 },
      { title: "Fire district budget", section: "public-safety", page: 3 },
    ],
  },
  {
    date: "2025-09-04",
    label: "September 4, 2025",
    volume: 67,
    number: 36,
    sizeMb: 14.9,
    pages: 12,
    file: "/issues/linden-herald-2025-09-04.pdf",
    contents: [
      { title: "Back to school", section: "schools", page: 1 },
      { title: "Fall sports preview", section: "sports", page: 8 },
    ],
  },
  {
    date: "2025-08-14",
    label: "August 14, 2025",
    volume: 67,
    number: 33,
    sizeMb: 15.2,
    pages: 12,
    file: "/issues/linden-herald-2025-08-14.pdf",
    contents: [
      { title: "Back to school", section: "schools", page: 1 },
      { title: "Almond outlook", section: "agriculture", page: 6 },
      { title: "Sheriff report", section: "public-safety", page: 3 },
    ],
  },
  {
    date: "2025-06-19",
    label: "June 19, 2025",
    volume: 67,
    number: 25,
    sizeMb: 21.7,
    pages: 20,
    file: "/issues/linden-herald-2025-06-19.pdf",
    contents: [
      { title: "Graduation edition", section: "schools", page: 1 },
      { title: "Cherry season review", section: "agriculture", page: 6 },
    ],
  },
  {
    date: "2025-05-15",
    label: "May 15, 2025",
    volume: 67,
    number: 20,
    sizeMb: 16.4,
    pages: 14,
    file: "/issues/linden-herald-2025-05-15.pdf",
    contents: [
      { title: "Cherry harvest begins", section: "agriculture", page: 1 },
      { title: "Track and field", section: "sports", page: 9 },
      { title: "Graduation preview", section: "schools", page: 4 },
    ],
  },
  {
    date: "2025-03-13",
    label: "March 13, 2025",
    volume: 67,
    number: 11,
    sizeMb: 14.8,
    pages: 12,
    file: "/issues/linden-herald-2025-03-13.pdf",
    contents: [
      { title: "Spring rain", section: "agriculture", page: 1 },
      { title: "Basketball wrap", section: "sports", page: 8 },
      { title: "Water board", section: "news", page: 3 },
    ],
  },
  {
    date: "2024-11-14",
    label: "November 14, 2024",
    volume: 66,
    number: 46,
    sizeMb: 18.2,
    pages: 16,
    file: "/issues/linden-herald-2024-11-14.pdf",
    contents: [
      { title: "Election results", section: "news", page: 1 },
      { title: "Harvest wrap", section: "agriculture", page: 6 },
      { title: "Veterans Day", section: "news", page: 4 },
    ],
  },
  {
    date: "2024-09-12",
    label: "September 12, 2024",
    volume: 66,
    number: 37,
    sizeMb: 15.9,
    pages: 14,
    file: "/issues/linden-herald-2024-09-12.pdf",
    contents: [
      { title: "Fall sports open", section: "sports", page: 8 },
      { title: "Fair review", section: "agriculture", page: 5 },
      { title: "School board", section: "schools", page: 3 },
    ],
  },
  {
    date: "2024-06-13",
    label: "June 13, 2024",
    volume: 66,
    number: 24,
    sizeMb: 20.4,
    pages: 18,
    file: "/issues/linden-herald-2024-06-13.pdf",
    contents: [
      { title: "Graduation edition", section: "schools", page: 1 },
      { title: "Class of 2024", section: "schools", page: 8 },
      { title: "Summer programs", section: "news", page: 5 },
    ],
  },
  {
    date: "2024-02-15",
    label: "February 15, 2024",
    volume: 66,
    number: 7,
    sizeMb: 13.4,
    pages: 12,
    file: "/issues/linden-herald-2024-02-15.pdf",
    contents: [
      { title: "Winter storms", section: "news", page: 1 },
      { title: "Pruning", section: "agriculture", page: 6 },
      { title: "Board meeting", section: "schools", page: 3 },
    ],
  },
  {
    date: "2023-10-12",
    label: "October 12, 2023",
    volume: 65,
    number: 41,
    sizeMb: 16.8,
    pages: 14,
    file: "/issues/linden-herald-2023-10-12.pdf",
    contents: [
      { title: "Harvest season", section: "agriculture", page: 1 },
      { title: "Homecoming", section: "sports", page: 9 },
      { title: "Fire district", section: "public-safety", page: 3 },
    ],
  },
  {
    date: "2023-06-15",
    label: "June 15, 2023",
    volume: 65,
    number: 24,
    sizeMb: 19.6,
    pages: 18,
    file: "/issues/linden-herald-2023-06-15.pdf",
    contents: [
      { title: "Graduation edition", section: "schools", page: 1 },
      { title: "Cherry season review", section: "agriculture", page: 6 },
      { title: "Fair entries", section: "agriculture", page: 5 },
    ],
  },
];

export const sortedIssues = [...issues].sort((a, b) => b.date.localeCompare(a.date));

/** The issue currently in mailboxes. */
export const currentIssue = sortedIssues[0];

export const archiveYears = Array.from(new Set(issues.map((i) => i.date.slice(0, 4)))).sort(
  (a, b) => Number(b) - Number(a),
);

export function getIssue(date: string) {
  return issues.find((i) => i.date === date);
}

/**
 * The issues either side of one, in print order. `newer` is the following
 * week's edition, `older` the preceding one.
 */
export function issueNeighbors(date: string) {
  const index = sortedIssues.findIndex((i) => i.date === date);
  if (index === -1) return { newer: undefined, older: undefined };
  return {
    newer: index > 0 ? sortedIssues[index - 1] : undefined,
    older: index < sortedIssues.length - 1 ? sortedIssues[index + 1] : undefined,
  };
}

/** Headline lines only, for compact contents lists. */
export function issueHeadlines(issue: Issue, limit?: number) {
  const titles = issue.contents.map((c) => c.title);
  return typeof limit === "number" ? titles.slice(0, limit) : titles;
}
