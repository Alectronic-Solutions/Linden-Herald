/**
 * Every route in the export, with the canonical path each page should declare.
 * Kept here rather than derived from src/data so the tests are an independent
 * check rather than a restatement of the same source.
 */
export const PAGES = [
  "/",
  "/about",
  "/accessibility",
  "/advertise",
  "/archive",
  "/calendar",
  "/classifieds",
  "/community",
  "/contact",
  "/corrections",
  "/legal-notices",
  "/obituaries",
  "/privacy",
  "/subscribe",
  "/terms",
] as const;

/** One representative issue page. */
export const ISSUE_PAGE = "/archive/2026-09-03";
