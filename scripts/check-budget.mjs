/**
 * Budget for the JavaScript every route pays for.
 *
 * SiteHeader and BackToTop both imported framer-motion, which put the library
 * in the root layout's chunk group and therefore on all twenty routes —
 * 37.7 KB gzipped, on pages like /about whose own route chunk is 243 bytes.
 * Nothing would have told us. This is that tripwire.
 *
 *   node scripts/check-budget.mjs
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

// 101.7 KB today. Before framer-motion was removed from SiteHeader and
// BackToTop this was ~139 KB, so anything of that scale re-entering the layout
// chunk group trips this with room to spare.
const BUDGET_BYTES = 105_000;

const manifestPath = join(process.cwd(), ".next", "app-build-manifest.json");
if (!existsSync(manifestPath)) {
  console.error("No .next/app-build-manifest.json. Run `npm run build` first.");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const layoutChunks = manifest.pages["/layout"] ?? [];

let total = 0;
const rows = [];
for (const chunk of layoutChunks) {
  if (!chunk.endsWith(".js")) continue;
  const file = join(process.cwd(), ".next", chunk);
  if (!existsSync(file)) continue;
  const gzipped = gzipSync(readFileSync(file)).length;
  total += gzipped;
  rows.push([chunk.replace(/^static\/chunks\//, ""), statSync(file).size, gzipped]);
}

rows.sort((a, b) => b[2] - a[2]);
for (const [name, raw, gz] of rows) {
  console.log(`  ${String(gz).padStart(7)} gz  ${String(raw).padStart(8)} raw  ${name}`);
}

console.log(`\nshared by every route: ${total} bytes gzipped (budget ${BUDGET_BYTES})`);

if (total > BUDGET_BYTES) {
  console.error(
    `\nOver budget by ${total - BUDGET_BYTES} bytes. Something new is being pulled into ` +
      `the root layout's chunk group, so every page on the site is paying for it.`,
  );
  process.exit(1);
}
