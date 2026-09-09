import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PAGES, ISSUE_PAGE } from "./routes";

/**
 * The site ships an accessibility statement at /accessibility, so it had better
 * hold up. Before this suite existed the ink-faint token failed AA contrast in
 * 54 places and no page on the site had a single aria-live region.
 */

for (const path of [...PAGES, ISSUE_PAGE]) {
  test(`${path} has no axe violations`, async ({ page }) => {
    await page.goto(path === "/" ? "/" : `${path}/`, { waitUntil: "networkidle" });
    // /archive builds its publication calendar after mount, and its controls
    // are disabled until it lands. Audit the settled page, not a frame of it.
    await expect(page.locator("button:disabled, input:disabled")).toHaveCount(0);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`)).toEqual(
      [],
    );
  });

  test(`${path} has exactly one h1`, async ({ page }) => {
    await page.goto(path === "/" ? "/" : `${path}/`);
    // SiteHeader promoted the masthead to an h1 on the home page while the page
    // rendered its own, so / shipped two.
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test("filter controls are labelled as a group and announce their results", async ({ page }) => {
  await page.goto("/archive/");
  await expect(page.getByRole("group", { name: /filter by year/i })).toBeVisible();

  const count = page.locator("[aria-live]", { hasText: /issues available/i });
  await expect(count).toContainText(/issues available/i);

  // Filtering must update the live region, or a screen-reader user gets no
  // confirmation that pressing a year did anything.
  const before = await count.textContent();
  await page.getByRole("button", { name: "2024" }).click();
  await expect(count).not.toHaveText(before ?? "");
});

test("the subscribe form fields carry autofill hints", async ({ page }) => {
  await page.goto("/subscribe/");
  // There was exactly one autoComplete attribute in the whole source tree
  // before this, and it was on the spam honeypot.
  for (const [name, token] of [
    ["name", "name"],
    ["phone", "tel"],
    ["address", "street-address"],
    ["city", "address-level2"],
    ["zip", "postal-code"],
  ] as const) {
    const value = await page.locator(`input[name="${name}"]`).getAttribute("autocomplete");
    expect(value, `${name} has no autocomplete`).toBe(token);
  }
});

test("a required select does not arrive pre-filled", async ({ page }) => {
  await page.goto("/contact/");
  // Without an empty first option, every unconsidered submission came through
  // tagged as whatever happened to be first in the list.
  await expect(page.locator('select[name="topic"]')).toHaveValue("");
});
