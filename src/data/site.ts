/**
 * Where this build is deployed. The demo sits on a github.io project page; the
 * real launch sets NEXT_PUBLIC_SITE_URL to the Herald's own domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.lindenherald.com"
).replace(/\/$/, "");

/**
 * Search engines are kept out until this is on the Herald's real domain. A
 * second copy of a real newspaper ranking in search would confuse their readers
 * and split their own SEO. CI sets this to "true" for the production build.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const site = {
  name: "The Linden Herald",
  shortName: "Linden Herald",
  tagline: "Serving San Joaquin County since 1959",
  founded: 1959,
  domain: "lindenherald.com",
  description:
    "The Linden Herald is a weekly print newspaper published in Linden, California since 1959. Subscribe for $42 a year, publish a legal notice in an adjudicated newspaper of general circulation, advertise to the Linden school district, or download past issues as PDFs.",
  /**
   * The Herald does not publish stories online and never has. Every page that
   * could be mistaken for a newsroom should say so.
   */
  printOnly: "The Herald is a print newspaper. We don't publish our stories online.",
  printOnlyLong:
    "The Linden Herald is written, edited and printed for the page. Stories run in the weekly edition and nowhere else — subscribe to get it in your mailbox, or download a past issue as a PDF.",
  phone: "(209) 772-8854",
  phoneHref: "tel:+12097728854",
  phoneNote: "Answered 24 hours a day, seven days a week",
  mailing: {
    line1: "PO Box 929",
    city: "Linden",
    state: "CA",
    zip: "95236",
  },
  // Routed through FormSubmit so the paper receives submissions by email with no server to run.
  // VERIFY: this address is a guess — the Herald publishes only a phone number
  // and a PO Box. Every form on the site fails silently if it is wrong.
  formEndpoint: "https://formsubmit.co/news@lindenherald.com",
  // Court decree establishing the paper as a newspaper of general circulation.
  adjudication: {
    court: "San Joaquin County Superior Court",
    decree: "No. 72641",
    date: "September 1960",
  },
  reach: {
    districtResidents: "5,000",
    townResidents: "1,200",
    combinedExperience: "57",
  },
  // VERIFY: none of these deadlines are published by the Herald. The legal
  // deadline feeds the notice estimator's first-publication-date maths.
  deadlines: {
    display: "Friday at 5 p.m. for the following Thursday edition",
    classified: "Monday at noon",
    legal: "Monday at noon",
    obituary: "Monday at noon",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Past Issues", href: "/archive" },
    { label: "Legal Notices", href: "/legal-notices" },
    { label: "Advertise", href: "/advertise" },
    { label: "Community", href: "/community" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const mailingAddressLines = [
  site.name,
  site.mailing.line1,
  `${site.mailing.city}, ${site.mailing.state} ${site.mailing.zip}`,
];

export const sections = [
  {
    slug: "news",
    name: "Local News",
    blurb: "City council, water districts, roads and the decisions that shape the valley floor.",
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    blurb: "Cherries, walnuts, water and the growing season, reported from the orchard rows.",
  },
  {
    slug: "sports",
    name: "Sports",
    blurb: "Linden High athletics, youth leagues and the scores that fill the back page.",
  },
  {
    slug: "schools",
    name: "Schools",
    blurb: "Board meetings, bond measures, honor rolls and classroom milestones.",
  },
  {
    slug: "public-safety",
    name: "Sheriff & Fire",
    blurb: "Calls for service, road closures and public safety notices across the district.",
  },
  {
    slug: "opinion",
    name: "Opinion",
    blurb: "Editorials, letters to the editor and columns from your neighbors.",
  },
  {
    slug: "history",
    name: "History",
    blurb: "Photographs and stories from the Herald morgue, going back to 1959.",
  },
] as const;

export type SectionSlug = (typeof sections)[number]["slug"];

export function sectionName(slug: string) {
  return sections.find((s) => s.slug === slug)?.name ?? "News";
}
