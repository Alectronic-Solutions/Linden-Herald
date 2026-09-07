// VERIFY: every name below is a placeholder. See VERIFY.md.
export type StaffMember = {
  name: string;
  role: string;
  beat: string;
  since?: string;
};

/**
 * PLACEHOLDER. The Herald's own About page states more than 57 years of
 * combined newsroom experience but names nobody. Replace these entries with
 * the real masthead before launch: for a paper whose product is credibility,
 * named bylines are the strongest trust signal on the site.
 */
export const staff: StaffMember[] = [
  {
    name: "Name to come",
    role: "Editor and Publisher",
    beat: "School board, water districts, county government",
  },
  {
    name: "Name to come",
    role: "Reporter",
    beat: "Agriculture, sheriff and fire, features",
  },
  {
    name: "Name to come",
    role: "Sports Correspondent",
    beat: "Linden High athletics and youth leagues",
  },
  {
    name: "Name to come",
    role: "Advertising and Legal Notices",
    beat: "Display advertising, classifieds, notice filing",
  },
];
