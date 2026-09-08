import { test, expect } from "@playwright/test";
import { PAGES, ISSUE_PAGE } from "./routes";

/**
 * Metadata regressions are invisible in a browser and expensive in search.
 *
 * The root layout set `alternates.canonical` to "/", and because Next merges
 * metadata shallowly per top-level key, /about, /contact, /calendar,
 * /classifieds and /obituaries each inherited it and declared themselves
 * duplicates of the front page. Pages that set only `openGraph.images` lost
 * og:url the same way, and pages that set `alternates.canonical` dropped the
 * RSS feed declaration.
 */

for (const path of [...PAGES, ISSUE_PAGE]) {
  test(`${path} declares its own canonical`, async ({ page }) => {
    await page.goto(path === "/" ? "/" : `${path}/`);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical, `${path} has no canonical`).toBeTruthy();

    const expected = path === "/" ? "/" : `${path}/`;
    expect(new URL(canonical!).pathname).toBe(expected);
  });

  test(`${path} has a matching og:url and its own og:title`, async ({ page }) => {
    await page.goto(path === "/" ? "/" : `${path}/`);

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(ogUrl, `${path} has no og:url`).toBeTruthy();

    const expected = path === "/" ? "/" : `${path}/`;
    expect(new URL(ogUrl!).pathname).toBe(expected);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle).toBeTruthy();
    if (path !== "/") {
      // Every non-home page used to share the site-wide title.
      expect(ogTitle).not.toBe("The Linden Herald | Serving San Joaquin County since 1959");
    }
  });

  test(`${path} declares the RSS feed`, async ({ page }) => {
    await page.goto(path === "/" ? "/" : `${path}/`);
    await expect(page.locator('link[type="application/rss+xml"]')).toHaveCount(1);
  });
}

test("the 404 page does not claim to be the home page", async ({ page }) => {
  const response = await page.goto("/404.html");
  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle(/Page Not Found/);
});
