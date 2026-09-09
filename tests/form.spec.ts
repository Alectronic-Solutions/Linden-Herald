import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * The submit path, with FormSubmit stubbed so no test ever posts to a real
 * inbox. The endpoint matters: the site used to post to FormSubmit's non-AJAX
 * URL, which answers without a CORS header, so fetch rejected and every visitor
 * was told their message had failed even when it had gone through.
 */

const OK = { success: "true", message: "The form was submitted successfully." };

async function stubFormSubmit(page: Page, body: unknown = OK) {
  await page.route("https://formsubmit.co/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(body),
    }),
  );
}

async function fillContactForm(page: Page) {
  await page.goto("/contact/");
  await page.fill('input[name="name"]', "Ada Lovelace");
  await page.fill('input[name="phone"]', "209-555-0100");
  await page.fill('input[name="email"]', "ada@example.com");
  await page.selectOption('select[name="topic"]', { index: 1 });
  await page.fill('textarea[name="message"]', "There is a water main open on Front Street.");
}

test("submitting posts to the AJAX endpoint", async ({ page }) => {
  const posted: string[] = [];
  await page.route("https://formsubmit.co/**", (route) => {
    posted.push(route.request().url());
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(OK),
    });
  });

  await fillContactForm(page);
  await page.getByRole("button", { name: /send message/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  expect(posted).toHaveLength(1);
  // The plain /<email> endpoint is the no-JavaScript fallback only.
  expect(posted[0]).toContain("/ajax/");
});

test("a successful submit opens the thank-you card", async ({ page }) => {
  await stubFormSubmit(page);
  await fillContactForm(page);
  await page.getByRole("button", { name: /send message/i }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(/thank you for submitting/i);

  // The form is cleared behind it, which is why the confirmation is a card and
  // not a line of text next to the button.
  await expect(page.locator('input[name="name"]')).toHaveValue("");
});

test("the thank-you card behaves like a modal dialog", async ({ page }) => {
  await stubFormSubmit(page);
  await fillContactForm(page);

  const submit = page.getByRole("button", { name: /send message/i });
  await submit.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");

  // It is named, so a screen reader announces what opened.
  await expect(dialog).toHaveAttribute("aria-labelledby", /.+/);

  // Focus is inside it, not stranded on the form behind.
  await expect(page.getByRole("button", { name: "Close" })).toBeFocused();

  // The page behind cannot scroll while it is open.
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

  // Tab stays inside: the only focusable child is the close button.
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Close" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  // Scroll is released and focus comes back to the form.
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await expect(submit).toBeFocused();
});

test("the thank-you card has no axe violations", async ({ page }) => {
  await stubFormSubmit(page);
  await fillContactForm(page);
  await page.getByRole("button", { name: /send message/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});

test("a failed submit stays inline with the answers intact", async ({ page }) => {
  // FormSubmit answers 200 with success:"false" for an address that has not
  // been confirmed yet, which is exactly the state this site is in today.
  await stubFormSubmit(page, { success: "false", message: "not activated" });
  await fillContactForm(page);
  await page.getByRole("button", { name: /send message/i }).click();

  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("status")).toContainText(/did not go through/i);
  // Nothing the reader typed is thrown away on a failure.
  await expect(page.locator('input[name="name"]')).toHaveValue("Ada Lovelace");
});
