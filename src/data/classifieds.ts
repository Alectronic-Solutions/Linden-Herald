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
  {
    slug: "farm",
    name: "Farm & Equipment",
    blurb: "Tractors, implements, irrigation pipe, trailers.",
  },
  {
    slug: "help-wanted",
    name: "Help Wanted",
    blurb: "Seasonal crews, drivers, office and trade work.",
  },
  { slug: "services", name: "Services", blurb: "Hauling, welding, tree work, bookkeeping." },
  {
    slug: "real-estate",
    name: "Real Estate & Rentals",
    blurb: "Acreage, houses, shop space and pasture.",
  },
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
  {
    id: "c7",
    category: "farm",
    title: "Walnut shaker, field ready",
    body: "Serviced at the end of last season, hoses and clamps replaced. Available after the first week of October.",
    contact: "Call the Herald office for the seller",
    runsUntil: "2026-10-08",
  },
  {
    id: "c8",
    category: "farm",
    title: "Irrigation pipe, assorted lengths",
    body: "Aluminium hand line, roughly four hundred feet total with fittings. Sold as a lot.",
    contact: "Call the Herald office for the seller",
    runsUntil: "2026-09-24",
  },
  {
    id: "c9",
    category: "help-wanted",
    title: "Part-time office help",
    body: "Local business seeking three days a week, bookkeeping and phones. Experience preferred, training available.",
    contact: "Call the Herald office to be connected",
    runsUntil: "2026-10-01",
  },
  {
    id: "c10",
    category: "help-wanted",
    title: "Class A driver, seasonal",
    body: "Hauling within the county through harvest. Clean record required. Competitive hourly rate.",
    contact: "Call the Herald office for the employer",
    runsUntil: "2026-09-17",
  },
  {
    id: "c11",
    category: "help-wanted",
    title: "School district substitute pool",
    body: "The district is accepting applications for substitute teaching and classified positions. Credential assistance available.",
    contact: "Apply at the district office",
    runsUntil: "2026-11-05",
  },
  {
    id: "c12",
    category: "services",
    title: "Orchard discing and mowing",
    body: "Discing, mowing and firebreak work by the acre. Insured, references from ranches in the district.",
    contact: "Call the Herald office for details",
    runsUntil: "2026-10-15",
  },
  {
    id: "c13",
    category: "services",
    title: "Tree removal and stump grinding",
    body: "Removals, trimming and stump grinding. Free estimates within the district, licensed and insured.",
    contact: "Call the Herald office for details",
    runsUntil: "2026-10-08",
  },
  {
    id: "c14",
    category: "services",
    title: "Bookkeeping for small operations",
    body: "Monthly books, payroll and quarterly filings for farms and small businesses. Twenty years local.",
    contact: "Call the Herald office for details",
    runsUntil: "2026-11-12",
  },
  {
    id: "c15",
    category: "services",
    title: "Well pump service",
    body: "Domestic and agricultural pump repair and replacement. Emergency calls taken.",
    contact: "Call the Herald office for details",
    runsUntil: "2026-10-22",
  },
  {
    id: "c16",
    category: "real-estate",
    title: "Twenty acres with well",
    body: "Level ground with an existing well and power at the road. No structures. Suited to planting or pasture.",
    contact: "Call the Herald office to be connected",
    runsUntil: "2026-10-15",
  },
  {
    id: "c17",
    category: "real-estate",
    title: "Three bedroom house in town",
    body: "Single story on a large lot, detached garage, mature shade. Available for a September start.",
    contact: "Call the Herald office to be connected",
    runsUntil: "2026-09-24",
  },
  {
    id: "c18",
    category: "real-estate",
    title: "Pasture wanted, will lease",
    body: "Local family seeking irrigated pasture to lease for a small herd. Long term preferred.",
    contact: "Call the Herald office to be connected",
    runsUntil: "2026-10-29",
  },
  {
    id: "c19",
    category: "livestock",
    title: "Bred heifers, small group",
    body: "Six head, bred and vaccinated, records available. Will sell as a group or split.",
    contact: "Call the Herald office for the seller",
    runsUntil: "2026-10-01",
  },
  {
    id: "c20",
    category: "livestock",
    title: "Show lambs available",
    body: "Suited to fair projects. Available for viewing by appointment, will hold for a deposit.",
    contact: "Call the Herald office for the seller",
    runsUntil: "2026-11-05",
  },
  {
    id: "c21",
    category: "livestock",
    title: "Oat hay, barn stored",
    body: "Good color, no rain. Priced by the ton. Delivery available inside the district.",
    contact: "Call the Herald office for the grower",
    runsUntil: "2026-10-08",
  },
  {
    id: "c22",
    category: "for-sale",
    title: "Chest freezer, works well",
    body: "Upgrading to a larger unit. Clean, runs cold, buyer hauls.",
    contact: "Call the Herald office for the seller",
    runsUntil: "2026-09-17",
  },
  {
    id: "c23",
    category: "for-sale",
    title: "Shop tools, estate lot",
    body: "Hand tools, a drill press and assorted hardware. Sold as one lot, viewing by appointment.",
    contact: "Call the Herald office for the family",
    runsUntil: "2026-09-24",
  },
  {
    id: "c24",
    category: "for-sale",
    title: "Half-ton pickup, high miles",
    body: "Runs and drives, new tires last year. Honest truck, priced accordingly.",
    contact: "Call the Herald office for the seller",
    runsUntil: "2026-10-01",
  },
];

export const classifiedRates = [
  { lines: "Up to 4 lines", price: "$12", detail: "One week, in print and posted here." },
  { lines: "Each additional line", price: "$2", detail: "About seven words to a line." },
  { lines: "Four weeks, up to 4 lines", price: "$40", detail: "The run most sellers choose." },
  { lines: "Bold heading", price: "$3", detail: "Sets your first line apart on the page." },
];
