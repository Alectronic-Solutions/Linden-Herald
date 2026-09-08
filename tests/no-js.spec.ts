import { test, expect } from "@playwright/test";
import { PAGES, ISSUE_PAGE } from "./routes";

/**
 * The archive and classifieds used to be blank without JavaScript.
 *
 * Every card was a framer-motion element whose `initial={{ opacity: 0 }}` was
 * written into the exported HTML as an inline style: 32 of them on /archive, 24
 * on /classifieds. globals.css carried a `.no-js [data-reveal]` rescue rule,
 * but nothing in the source ever set `data-reveal`, so it matched nothing and
 * the README's claim of a no-JavaScript fallback was not true.
 *
 * This project runs with JavaScript disabled, so it fails if that comes back.
 */

test("the archive lists its issues without JavaScript", async ({ page }) => {
  await page.goto("/archive/");

  const links = page.locator('a[href^="/archive/20"]');
  expect(await links.count()).toBeGreaterThanOrEqual(30);

  // Present in the DOM is not enough: they have to be visible.
  await expect(links.first()).toBeVisible();
});

test("classifieds render without JavaScript", async ({ page }) => {
  await page.goto("/classifieds/");
  const listings = page.locator("article");
  expect(await listings.count()).toBeGreaterThanOrEqual(20);
  await expect(listings.first()).toBeVisible();
});

test("the calendar renders without JavaScript", async ({ page }) => {
  await page.goto("/calendar/");
  await expect(page.locator("li h3").first()).toBeVisible();
});

test("no page ships content hidden by an inline opacity", async ({ page }) => {
  // This was true of /archive, /classifieds, /calendar and the legal notice
  // estimator. Check every route so it cannot come back anywhere.
  for (const path of PAGES.map((p) => (p === "/" ? "/" : p + "/")).concat(ISSUE_PAGE + "/")) {
    await page.goto(path);
    const html = await page.content();
    expect(html, `${path} ships an inline opacity:0`).not.toContain("opacity:0");
  }
});

test("forms still submit without JavaScript", async ({ page }) => {
  await page.goto("/contact/");
  const form = page.locator("form").first();
  // The submit handler is intercepted when JS is available; the action and
  // method are the fallback for when it is not.
  await expect(form).toHaveAttribute("action", /formsubmit\.co/);
  await expect(form).toHaveAttribute("method", /post/i);
});
