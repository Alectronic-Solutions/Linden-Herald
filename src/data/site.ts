export const site = {
  name: "The Linden Herald",
  shortName: "Linden Herald",
  tagline: "Serving San Joaquin County since 1959",
  founded: 1959,
  domain: "lindenherald.com",
  description:
    "The Linden Herald is a weekly newspaper published in Linden, California, covering local news, sports, agriculture, schools, public safety and legal notices across eastern San Joaquin County.",
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
  deadlines: {
    display: "Friday at 5 p.m. for the following Thursday edition",
    classified: "Monday at noon",
    legal: "Monday at noon",
    obituary: "Monday at noon",
  },
  nav: [
    { label: "Front Page", href: "/" },
    { label: "News", href: "/news" },
    { label: "Obituaries", href: "/obituaries" },
    { label: "Calendar", href: "/calendar" },
    { label: "Classifieds", href: "/classifieds" },
    { label: "E-Edition", href: "/archive" },
    { label: "Advertise", href: "/advertise" },
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
