import { defineConfig, devices } from "@playwright/test";

/**
 * Tests run against the static export in ./out, served by `npx serve`, because
 * that is the artefact that actually ships. Running them against `next dev`
 * would test a different build with different hydration behaviour, and the
 * no-JavaScript test in particular only means anything against the export.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://127.0.0.1:4321",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      // The archive, classifieds and calendar are all client-filtered. This
      // project proves the content is in the HTML regardless.
      name: "no-javascript",
      use: { ...devices["Desktop Chrome"], javaScriptEnabled: false },
      testMatch: /no-js\.spec\.ts/,
    },
  ],
  webServer: {
    command: "npx --yes serve out -l 4321 --no-clipboard",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
