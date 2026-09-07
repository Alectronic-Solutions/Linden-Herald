// VERIFY: only the in-county $42 rate is published by the Herald. The
// out-of-county and gift tiers below are invented. See VERIFY.md.
export const subscriptionRates = [
  {
    name: "In-County Annual",
    price: 42,
    unit: "per year",
    detail: "52 issues delivered weekly within San Joaquin County.",
    note: "Rate effective January 1, 2023.",
    featured: true,
  },
  {
    name: "Out-of-County Annual",
    price: 52,
    unit: "per year",
    detail: "52 issues mailed anywhere in the United States outside the county.",
    note: "Call the office to confirm current postage.",
    featured: false,
  },
  {
    name: "Gift Subscription",
    price: 42,
    unit: "per year",
    detail: "Send the Herald to a family member who moved away. We mail a card with the first issue.",
    note: "Popular with graduating seniors and grandparents.",
    featured: false,
  },
];

export type LegalNotice = {
  id: string;
  type: string;
  price: string;
  numericPrice: number | null;
  detail: string;
  runWeeks: string;
  filedFor: boolean;
  bring: string[];
};

export const legalNoticeRates: LegalNotice[] = [
  {
    id: "fbn-single",
    type: "Fictitious Business Name",
    price: "$105",
    numericPrice: 105,
    detail: "Single owner, one business name. Proof of publication filed at no additional cost.",
    runWeeks: "Four consecutive weeks",
    filedFor: true,
    bring: [
      "Your stamped FBN statement from the County Clerk",
      "The exact business name as filed",
      "Owner name and mailing address",
    ],
  },
  {
    id: "fbn-entity",
    type: "Fictitious Business Name, additional entities",
    price: "$145",
    numericPrice: 145,
    // VERIFY: their page reads "$145 more for corp., LLC, partnerships" — that
    // may mean $145 total (as shown) or $105 + $145. This drives the estimator.
    detail: "Corporations, LLCs, partnerships, husband and wife. Additional names $10 each.",
    runWeeks: "Four consecutive weeks",
    filedFor: true,
    bring: [
      "Your stamped FBN statement from the County Clerk",
      "Entity name and registration details",
      "Every additional business name you are registering",
    ],
  },
  {
    id: "name-change",
    type: "Change of Name Petition",
    price: "$425",
    numericPrice: 425,
    detail: "Four-week publication as required by the court.",
    runWeeks: "Four consecutive weeks",
    filedFor: true,
    bring: [
      "The signed Order to Show Cause from the court",
      "Case number and assigned hearing date",
      "Current and proposed names, spelled exactly as filed",
    ],
  },
  {
    id: "family-law",
    type: "Family Law (Dissolution)",
    price: "$425",
    numericPrice: 425,
    detail: "Summons publication for dissolution proceedings.",
    runWeeks: "Four consecutive weeks",
    filedFor: true,
    bring: [
      "The court order permitting service by publication",
      "Case number and the filed summons",
      "Names of both parties as they appear on the filing",
    ],
  },
  {
    id: "summons",
    type: "Summons",
    price: "$425",
    numericPrice: 425,
    detail: "Civil summons publication, four consecutive weeks.",
    runWeeks: "Four consecutive weeks",
    filedFor: true,
    bring: [
      "The court order for service by publication",
      "The filed summons and complaint caption",
      "Case number and court branch",
    ],
  },
  {
    id: "bulk-sale",
    type: "Bulk Sale Transfer",
    price: "$425",
    numericPrice: 425,
    detail: "Notice to creditors of bulk sale and intent to transfer.",
    runWeeks: "Once, at least twelve business days before transfer",
    filedFor: true,
    bring: [
      "Names and addresses of seller and buyer",
      "Address of the business assets being transferred",
      "The anticipated transfer date and escrow holder",
    ],
  },
  {
    id: "trustee-sale",
    type: "Trustee Sale",
    price: "Call for quote",
    numericPrice: null,
    // VERIFY: the Herald publishes no trustee sale rate or run length.
    detail: "Priced by column inch. Competitive with the county's larger papers.",
    runWeeks: "Three consecutive weeks",
    filedFor: true,
    bring: [
      "The notice of sale as prepared by the trustee",
      "Trustee sale number and property address",
      "The scheduled sale date",
    ],
  },
];

export type AdSize = {
  id: string;
  name: string;
  size: string;
  widthIn: number;
  heightIn: number;
  best: string;
  /** Where the ad typically sits on the page, for the preview. */
  placement: "top" | "fill" | "block";
};

/**
 * VERIFY: the Herald publishes no display rate card — every size, dimension and
 * the page size itself are assumptions. AdSizePreviewer draws these to scale,
 * so wrong numbers are visibly wrong. See VERIFY.md.
 *
 * The Herald prints a 10 x 13 inch page.
 */
export const PAGE_WIDTH_IN = 10;
export const PAGE_HEIGHT_IN = 13;

export const displayAdSizes: AdSize[] = [
  {
    id: "business-card",
    name: "Business Card",
    size: '3.25" x 2"',
    widthIn: 3.25,
    heightIn: 2,
    best: "Ongoing local presence",
    placement: "block",
  },
  {
    id: "quarter",
    name: "Quarter Page",
    size: '5" x 6.5"',
    widthIn: 5,
    heightIn: 6.5,
    best: "Sales, events, seasonal promotions",
    placement: "block",
  },
  {
    id: "half",
    name: "Half Page",
    size: '10" x 6.5"',
    widthIn: 10,
    heightIn: 6.5,
    best: "Grand openings and anniversaries",
    placement: "block",
  },
  {
    id: "full",
    name: "Full Page",
    size: '10" x 13"',
    widthIn: 10,
    heightIn: 13,
    best: "Special sections and holiday editions",
    placement: "fill",
  },
  {
    id: "banner",
    name: "Front Page Banner",
    size: '10" x 2"',
    widthIn: 10,
    heightIn: 2,
    best: "Maximum visibility, limited inventory",
    placement: "top",
  },
  {
    id: "classified",
    name: "Classified Line Ad",
    size: "Per line",
    widthIn: 2.4,
    heightIn: 1.1,
    best: "Equipment, services, help wanted",
    placement: "block",
  },
];
