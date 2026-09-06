import type { SectionSlug } from "./site";

export type Article = {
  slug: string;
  section: SectionSlug;
  kicker: string;
  title: string;
  deck: string;
  byline: string;
  date: string;
  readMinutes: number;
  image?: string;
  imageAlt?: string;
  credit?: string;
  featured?: boolean;
  body: string[];
};

/**
 * Sample editorial content written for this redesign demonstration.
 * Replace with the Herald's own reporting before launch.
 */
export const articles: Article[] = [
  {
    slug: "cherry-harvest-comes-early",
    section: "agriculture",
    kicker: "Growing Season",
    title: "Warm spring pulls cherry harvest forward by nearly two weeks",
    deck: "Packing sheds along Highway 26 opened ahead of schedule, and growers say the crop is smaller but sweeter than last season.",
    byline: "Herald Staff",
    date: "2026-09-03",
    readMinutes: 4,
    image: "/images/cherry-harvest.svg",
    imageAlt: "Ripe cherries on the branch in an orchard at first light",
    credit: "Herald file photo",
    featured: true,
    body: [
      "The first bins came off the trees east of town in the second week of May, roughly twelve days ahead of a normal season, and the packing sheds along the highway have been running long shifts ever since.",
      "Growers around Linden describe the same pattern: a mild, dry spring that pushed bloom early and never gave the trees a cold snap to slow them down. The result is a crop that arrived in a hurry.",
      "Volume is down from last year, several growers estimated, but size and sugar are up. Fruit that sizes well tends to move well, and early indications from buyers have been encouraging.",
      "The compressed window puts pressure on labor. Crews that would ordinarily rotate through several ranches over a month are being asked to cover the same ground in half the time, and a few operations have brought on additional help from outside the district.",
      "For families who have farmed this ground for three generations, the early season is not unfamiliar. The valley has a long memory for weather, and most growers can name the last few years the harvest came in ahead of the calendar.",
      "Whether the trees carry the pattern into next season is the open question. For now the bins keep moving, and the sheds keep the lights on late.",
    ],
  },
  {
    slug: "school-board-weighs-bond-measure",
    section: "schools",
    kicker: "Linden Unified",
    title: "Trustees weigh a facilities bond for the November ballot",
    deck: "A packed board room heard three hours of public comment on classroom repairs, a new gymnasium roof and the cost of putting it before voters.",
    byline: "Herald Staff",
    date: "2026-09-03",
    readMinutes: 5,
    image: "/images/school-board.svg",
    imageAlt: "Empty classroom with desks arranged in rows",
    credit: "Herald file photo",
    featured: true,
    body: [
      "Trustees spent the better part of Tuesday evening working through a facilities assessment that runs to more than sixty pages, and by the end of it the board had narrowed its options to two.",
      "The district's oldest buildings need roof work, electrical upgrades and heating and cooling systems that can survive a valley summer. The assessment puts the highest priority items well beyond what the general fund can absorb.",
      "Public comment ran long. Parents raised classroom temperatures, coaches raised the gymnasium, and several longtime residents raised the tax rate and asked the board to say plainly what a bond would cost a typical parcel.",
      "Board members were careful not to commit to a figure. Any measure would need to be finalized well ahead of the county filing deadline, and the board asked staff to return with two scenarios at the next regular meeting.",
      "The district last went to voters more than a decade ago. Several trustees noted that construction costs have moved considerably since then, and that deferring the work does not make it cheaper.",
      "A decision is expected before the end of the month.",
    ],
  },
  {
    slug: "linden-lions-open-season-at-home",
    section: "sports",
    kicker: "Friday Night",
    title: "Lions open the season at home with a new backfield and a familiar defense",
    deck: "A young offense showed flashes in the opener while the defensive line, returning nearly intact, set the tone from the first series.",
    byline: "Herald Staff",
    date: "2026-09-03",
    readMinutes: 3,
    image: "/images/football.svg",
    imageAlt: "High school football under stadium lights on a Friday evening",
    credit: "Herald file photo",
    featured: true,
    body: [
      "The stands filled early, the way they do for a home opener, and the noise carried out past the parking lot every time the defense got off the field.",
      "That happened often. The line returns nearly everyone from last season and spent the evening living in the backfield, forcing throws before the routes had time to develop.",
      "The offense is younger. A first-year starter under center took a few series to settle in, and the run game leaned on a rotation rather than a workhorse, but the drives got longer as the night went on.",
      "Coaches were measured afterward, pointing to penalties and a handful of missed assignments that will get cleaned up in practice this week.",
      "The Lions travel next Friday before returning home the following week for the league opener.",
    ],
  },
  {
    slug: "irrigation-district-sets-fall-allocation",
    section: "news",
    kicker: "Water",
    title: "Irrigation district sets fall allocation after a middling snowpack year",
    deck: "Directors approved a schedule that holds allocations flat while reserving room to adjust if late-season demand runs high.",
    byline: "Herald Staff",
    date: "2026-08-27",
    readMinutes: 4,
    image: "/images/canal.svg",
    imageAlt: "Irrigation canal running between farm fields",
    credit: "Herald file photo",
    body: [
      "Directors approved the fall allocation schedule at their regular meeting, holding deliveries at roughly the same level as last year while keeping a reserve in place for the end of the season.",
      "Staff walked the board through storage figures, carryover and the runoff picture, and made the case that a flat allocation is the responsible position given an average year rather than a generous one.",
      "Growers in the room pressed for clarity on timing more than volume. For orchard crops, when the water arrives can matter as much as how much of it there is.",
      "The district agreed to publish the delivery calendar earlier this year and to give notice ahead of any mid-season adjustment.",
      "The full schedule is available at the district office and will be printed in next week's edition.",
    ],
  },
  {
    slug: "county-fair-returns-to-the-fairgrounds",
    section: "news",
    kicker: "Community",
    title: "Fair week returns with a full livestock barn and a rebuilt grandstand",
    deck: "Organizers report entries up across junior livestock, and the grandstand reopens after two seasons of repairs.",
    byline: "Herald Staff",
    date: "2026-08-27",
    readMinutes: 3,
    image: "/images/fair.svg",
    imageAlt: "Evening lights at a county fair midway",
    credit: "Herald file photo",
    body: [
      "Entries in the junior livestock program are up again this year, organizers said, continuing a run that has now lasted several seasons.",
      "The grandstand reopens for the first time since repairs began, with new seating and improved access at both ends.",
      "The schedule follows the familiar shape: showmanship early in the week, the auction on Saturday, and the awards on Sunday afternoon.",
      "Volunteers are still needed for the gate and the barns. The fair office is taking names by phone.",
    ],
  },
  {
    slug: "district-fire-crews-report-quiet-summer",
    section: "public-safety",
    kicker: "Sheriff & Fire",
    title: "Fire district closes out a quieter summer, credits fuel reduction work",
    deck: "Call volume finished below the five-year average, and the chief points to spring clearing along the district's east edge.",
    byline: "Herald Staff",
    date: "2026-08-20",
    readMinutes: 3,
    image: "/images/fire.svg",
    imageAlt: "Firefighter turnout gear and equipment staged beside an engine",
    credit: "Herald file photo",
    body: [
      "Call volume for the season finished below the district's five-year average, according to figures presented at the most recent board meeting.",
      "The chief credited fuel reduction work carried out in the spring along the eastern edge of the district, where grass fires have historically started and spread toward the orchards.",
      "Medical aid calls continue to make up the large majority of the district's workload, a pattern that holds across rural departments statewide.",
      "The district reminded residents that burn permits are required and that the seasonal restrictions remain in effect until further notice.",
    ],
  },
  {
    slug: "in-defense-of-the-weekly-paper",
    section: "opinion",
    kicker: "Editorial",
    title: "A town that reads about itself is a town that shows up",
    deck: "Sixty-seven years on, the argument for a weekly paper has not changed much. It has only gotten more urgent.",
    byline: "The Editorial Board",
    date: "2026-08-20",
    readMinutes: 3,
    body: [
      "There is no algorithm that will tell you the water board changed its delivery schedule, or that your neighbor's granddaughter took reserve champion at the fair.",
      "Somebody has to sit in the room, take the notes, and write it down. That has been the job here since 1959, and it remains the job.",
      "A weekly paper is not fast. It was never meant to be. What it offers instead is a record, published on a schedule, that a community can hold in its hands and keep.",
      "That record has value beyond the week it is printed. Ask anyone who has gone looking for a photograph of a parent at a fair fifty years ago.",
      "We intend to keep printing it. We are grateful to the subscribers and advertisers who make that possible.",
    ],
  },
  {
    slug: "walnut-growers-face-a-thin-market",
    section: "agriculture",
    kicker: "Markets",
    title: "Walnut growers head into harvest facing another thin market",
    deck: "Carryover from last season and soft export demand have kept prices well below where growers need them to be.",
    byline: "Herald Staff",
    date: "2026-08-13",
    readMinutes: 4,
    image: "/images/walnut-orchard.svg",
    imageAlt: "Rows of walnut trees in an orchard",
    credit: "Herald file photo",
    body: [
      "Growers heading into this year's walnut harvest are looking at a market that has not meaningfully recovered from the last two seasons.",
      "Carryover inventory remains high and export demand has been slow to return, leaving handlers cautious about what they are willing to commit to early in the season.",
      "Several growers around the district said they have deferred replanting and cut back on inputs where they can, which is not a strategy anyone wants to run for a third consecutive year.",
      "The picture is not uniform. Ranches with strong quality histories and established handler relationships have fared better than the average.",
      "Harvest is expected to begin in earnest later this month.",
    ],
  },
  {
    slug: "from-the-morgue-main-street-1962",
    section: "history",
    kicker: "From the Herald Morgue",
    title: "From the morgue: Main Street, before the highway was widened",
    deck: "A photograph from the Herald's early files shows a business district most residents would still recognize, and a few storefronts they would not.",
    byline: "Herald Staff",
    date: "2026-08-13",
    readMinutes: 2,
    image: "/images/main-street.svg",
    imageAlt: "Small town main street with storefronts along a two lane road",
    credit: "Herald archive",
    body: [
      "The photograph turned up in a folder of prints that had not been opened in some years, filed under a heading that gave no indication of what was inside.",
      "The buildings are mostly still there. The signage is not, and neither is the row of elms that once ran the length of the block.",
      "Readers who can identify the storefronts or the people on the sidewalk are encouraged to call the office. We will run the corrections and the names in a future edition.",
      "The Herald's bound volumes going back to 1959 remain available for review at the Stockton Public Library.",
    ],
  },
  {
    slug: "road-work-scheduled-east-of-town",
    section: "news",
    kicker: "Public Works",
    title: "County schedules road work east of town through October",
    deck: "Expect one-way traffic control on weekdays and occasional full closures during paving.",
    byline: "Herald Staff",
    date: "2026-08-06",
    readMinutes: 2,
    body: [
      "The county public works department has scheduled resurfacing east of town beginning this month and continuing through the middle of October, weather permitting.",
      "Crews will work weekdays during daylight hours. Drivers should expect one-way traffic control and short delays, with occasional full closures on paving days.",
      "Detour routes will be signed. The department asked that agricultural traffic plan for additional time during harvest.",
      "A full schedule of affected segments is posted at the county office and will run in the Herald as it is updated.",
    ],
  },
];

export const featuredArticles = articles.filter((a) => a.featured);

export function articlesBySection(section: string) {
  return articles.filter((a) => a.section === section);
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export const latestArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));
