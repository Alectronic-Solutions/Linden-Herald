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
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"])
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

test("every control clears the WCAG 2.2 minimum target size", async ({ page }) => {
  // SC 2.5.8 asks for 24 x 24 CSS pixels. The site aims at 44, the comfortable
  // size, because its readers are largely over sixty. Inline links inside a
  // sentence are exempt from the criterion and are not measured here.
  for (const path of ["/", "/archive/", "/calendar/", "/classifieds/", "/subscribe/"]) {
    await page.goto(path);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll("button")]
        .filter((el) => el.offsetParent !== null && !el.hasAttribute("aria-hidden"))
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width < 24 || r.height < 24)
        .map((r) => `${Math.round(r.width)}x${Math.round(r.height)}`),
    );
    expect(small, `${path} has undersized controls`).toEqual([]);
  }
});

test("the desktop navigation marks the current page", async ({ page }) => {
  // It used to say where you were with a colour and an underline and nothing
  // else, so a screen reader had no way to know.
  await page.goto("/archive/");
  await expect(
    page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Past Issues", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test.describe("reader text size", () => {
  test("scales the page and is remembered", async ({ page }) => {
    await page.goto("/");
    const root = page.locator("html");
    const size = () => page.evaluate(() => getComputedStyle(document.documentElement).fontSize);

    expect(await size()).toBe("16px");
    await page.getByRole("button", { name: "Largest" }).click();
    expect(await size()).toBe("20px");
    await expect(root).toHaveAttribute("data-text-size", "largest");

    // It has to survive the next page, or it is not a setting.
    await page.getByRole("link", { name: "Past Issues", exact: true }).first().click();
    await expect(page).toHaveURL(/archive/);
    expect(await size()).toBe("20px");
    await expect(page.getByRole("button", { name: "Largest" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("does not push the page sideways at its largest", async ({ page }) => {
    // Everything is sized in rem, so the largest setting is the layout's
    // hardest case. The nav bar used to shoulder Subscribe off the right edge.
    await page.goto("/");
    await page.getByRole("button", { name: "Largest" }).click();
    // 320px is the width SC 1.4.10 Reflow asks about, and what a 1280px
    // window looks like at 400% browser zoom.
    for (const width of [1280, 1024, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal scrollbar at ${width}px`).toBeLessThanOrEqual(1);
    }
  });
});
