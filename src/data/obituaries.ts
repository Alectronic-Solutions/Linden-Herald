export type Obituary = {
  slug: string;
  name: string;
  years: string;
  town: string;
  serviceDate?: string;
  serviceLocation?: string;
  summary: string;
  published: string;
};

/**
 * Sample entries written for this redesign demonstration. These are not real
 * notices and must be replaced with the Herald's own submissions before launch.
 */
export const obituaries: Obituary[] = [
  {
    slug: "sample-notice-one",
    name: "Sample Notice",
    years: "1938 - 2026",
    town: "Linden",
    serviceDate: "Saturday, September 12",
    serviceLocation: "Linden Community Church",
    summary:
      "A lifelong resident of the district, remembered by family and neighbors for decades of work in the orchards and a standing seat at every home football game.",
    published: "2026-09-03",
  },
  {
    slug: "sample-notice-two",
    name: "Sample Notice",
    years: "1945 - 2026",
    town: "Waverly",
    serviceDate: "Friday, September 4",
    serviceLocation: "Graveside service, Linden Cemetery",
    summary:
      "Retired after more than thirty years with the school district, and known to several generations of students who passed through the same hallway.",
    published: "2026-08-27",
  },
  {
    slug: "sample-notice-three",
    name: "Sample Notice",
    years: "1951 - 2026",
    town: "Linden",
    summary:
      "A volunteer with the fair board and the fire district auxiliary, and a fixture at the livestock barn every year for as long as anyone can remember.",
    published: "2026-08-20",
  },
  {
    slug: "sample-notice-four",
    name: "Sample Notice",
    years: "1932 - 2026",
    town: "Linden",
    serviceDate: "Saturday, August 22",
    serviceLocation: "Graveside service, Linden Cemetery",
    summary:
      "Farmed the same ground for more than fifty years and served two terms on the water district board. Known for keeping a coffee pot on for anyone who stopped by the shop.",
    published: "2026-08-13",
  },
  {
    slug: "sample-notice-five",
    name: "Sample Notice",
    years: "1949 - 2026",
    town: "Linden",
    serviceDate: "Friday, August 7",
    serviceLocation: "Linden Community Church",
    summary:
      "Taught fourth grade in the district for twenty-six years, and volunteered at the fair every summer for nearly as long.",
    published: "2026-07-30",
  },
  {
    slug: "sample-notice-six",
    name: "Sample Notice",
    years: "1957 - 2026",
    town: "Waverly",
    summary:
      "Drove for a local hauler for three decades and coached youth baseball on the side. Remembered for never missing a game.",
    published: "2026-07-16",
  },
];
