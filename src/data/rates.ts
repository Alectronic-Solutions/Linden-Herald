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

export const legalNoticeRates = [
  {
    type: "Fictitious Business Name",
    price: "$105",
    detail: "Single owner, one business name. Proof of publication filed at no additional cost.",
  },
  {
    type: "Fictitious Business Name, additional entities",
    price: "$145",
    detail:
      "Corporations, LLCs, partnerships, husband and wife. Additional names $10 each.",
  },
  {
    type: "Change of Name Petition",
    price: "$425",
    detail: "Four-week publication as required by the court.",
  },
  {
    type: "Family Law (Dissolution)",
    price: "$425",
    detail: "Summons publication for dissolution proceedings.",
  },
  {
    type: "Summons",
    price: "$425",
    detail: "Civil summons publication, four consecutive weeks.",
  },
  {
    type: "Bulk Sale Transfer",
    price: "$425",
    detail: "Notice to creditors of bulk sale and intent to transfer.",
  },
  {
    type: "Trustee Sales",
    price: "Call for quote",
    detail: "Priced by column inch. Competitive with the county's larger papers.",
  },
];

export const displayAdSizes = [
  { name: "Business Card", size: '3.25" x 2"', best: "Ongoing local presence" },
  { name: "Quarter Page", size: '5" x 6.5"', best: "Sales, events, seasonal promotions" },
  { name: "Half Page", size: '10" x 6.5"', best: "Grand openings and anniversaries" },
  { name: "Full Page", size: '10" x 13"', best: "Special sections and holiday editions" },
  { name: "Front Page Banner", size: '10" x 2"', best: "Maximum visibility, limited inventory" },
  { name: "Classified Line Ad", size: "Per line", best: "Equipment, services, help wanted" },
];
