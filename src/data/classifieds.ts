export type ClassifiedCategory = {
  slug: string;
  name: string;
  blurb: string;
};

export type Classified = {
  id: string;
  category: string;
  title: string;
  body: string;
  contact: string;
  runsUntil: string;
};

export const classifiedCategories: ClassifiedCategory[] = [
  { slug: "farm", name: "Farm & Equipment", blurb: "Tractors, implements, irrigation pipe, trailers." },
  { slug: "help-wanted", name: "Help Wanted", blurb: "Seasonal crews, drivers, office and trade work." },
  { slug: "services", name: "Services", blurb: "Hauling, welding, tree work, bookkeeping." },
  { slug: "real-estate", name: "Real Estate & Rentals", blurb: "Acreage, houses, shop space and pasture." },
  { slug: "livestock", name: "Livestock & Feed", blurb: "Stock, hay, tack and fair projects." },
  { slug: "for-sale", name: "For Sale", blurb: "Household, vehicles, tools and everything else." },
];

/**
 * Sample listings written for this redesign demonstration.
 * Replace with the Herald's own classified copy before launch.
 */
export const classifieds: Classified[] = [
  {
    id: "c1",
    category: "farm",
    title: "Orchard discs, two sets",
    body: "Both in working order, used through last season. Will separate. Available for inspection east of town.",
    contact: "Call the Herald office for the seller",
    runsUntil: "2026-09-24",
  },
  {
    id: "c2",
    category: "help-wanted",
    title: "Seasonal crew, walnut harvest",
    body: "Local ranch seeking experienced crew for the coming harvest. Steady hours through the season.",
    contact: "Call the Herald office for the ranch",
    runsUntil: "2026-09-17",
  },
  {
    id: "c3",
    category: "services",
    title: "Mobile welding and repair",
    body: "On-site repair for implements, gates and trailers across the district. Reasonable rates, references available.",
    contact: "Call the Herald office for details",
    runsUntil: "2026-10-01",
  },
  {
    id: "c4",
    category: "real-estate",
    title: "Shop space for lease",
    body: "Insulated shop with roll-up door and yard space, close to the highway. Available monthly.",
    contact: "Call the Herald office to be connected",
    runsUntil: "2026-09-24",
  },
  {
    id: "c5",
    category: "livestock",
    title: "Alfalfa hay, second cutting",
    body: "Barn stored, no rain. Priced by the ton, delivery available within the district.",
    contact: "Call the Herald office for the grower",
    runsUntil: "2026-09-17",
  },
  {
    id: "c6",
    category: "for-sale",
    title: "Utility trailer, tandem axle",
    body: "Lights and brakes in order, spare included. Ready to tow.",
    contact: "Call the Herald office for the seller",
    runsUntil: "2026-09-10",
  },
];

export const classifiedRates = [
  { lines: "Up to 4 lines", price: "$12", detail: "One week, in print and posted here." },
  { lines: "Each additional line", price: "$2", detail: "About seven words to a line." },
  { lines: "Four weeks, up to 4 lines", price: "$40", detail: "The run most sellers choose." },
  { lines: "Bold heading", price: "$3", detail: "Sets your first line apart on the page." },
];
