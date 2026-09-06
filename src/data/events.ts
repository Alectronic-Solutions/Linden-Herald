export type CommunityEvent = {
  id: string;
  date: string;
  endDate?: string;
  time?: string;
  title: string;
  location: string;
  category: "school" | "government" | "community" | "sports" | "agriculture";
  detail: string;
};

export const eventCategories = [
  { slug: "school", name: "Schools" },
  { slug: "government", name: "Public Meetings" },
  { slug: "community", name: "Community" },
  { slug: "sports", name: "Sports" },
  { slug: "agriculture", name: "Agriculture" },
] as const;

/**
 * Sample calendar entries written for this redesign demonstration.
 * The newsroom would keep these current alongside the weekly edition.
 */
export const events: CommunityEvent[] = [
  {
    id: "e1",
    date: "2026-09-08",
    time: "7:00 p.m.",
    title: "Linden Unified board meeting",
    location: "District office board room",
    category: "government",
    detail: "Facilities bond discussion continues. Agenda posted 72 hours ahead at the district office.",
  },
  {
    id: "e2",
    date: "2026-09-11",
    time: "7:00 p.m.",
    title: "Lions football, league opener at home",
    location: "Linden High School",
    category: "sports",
    detail: "Gates open at 5:30. Boosters running the snack bar.",
  },
  {
    id: "e3",
    date: "2026-09-12",
    time: "8:00 a.m.",
    title: "Fire district pancake breakfast",
    location: "Station 1",
    category: "community",
    detail: "Annual fundraiser for equipment. Everyone welcome, donations at the door.",
  },
  {
    id: "e4",
    date: "2026-09-15",
    time: "6:30 p.m.",
    title: "Irrigation district directors meeting",
    location: "District office",
    category: "government",
    detail: "Fall delivery calendar and end-of-season reserve on the agenda.",
  },
  {
    id: "e5",
    date: "2026-09-19",
    endDate: "2026-09-21",
    title: "Junior livestock show and auction",
    location: "County fairgrounds",
    category: "agriculture",
    detail: "Showmanship Friday, auction Saturday, awards Sunday afternoon.",
  },
  {
    id: "e6",
    date: "2026-09-24",
    time: "3:30 p.m.",
    title: "Back to school night",
    location: "Linden Elementary",
    category: "school",
    detail: "Classroom visits and a look at the year ahead.",
  },
  {
    id: "e7",
    date: "2026-10-03",
    time: "9:00 a.m.",
    title: "Community cleanup day",
    location: "Meet at the town park",
    category: "community",
    detail: "Bags and gloves provided. Volunteers of every age welcome.",
  },
  {
    id: "e8",
    date: "2026-10-10",
    time: "10:00 a.m.",
    title: "Harvest festival and street fair",
    location: "Main Street",
    category: "community",
    detail: "Vendor booths, the fire district engine display, and music through the afternoon.",
  },
];
