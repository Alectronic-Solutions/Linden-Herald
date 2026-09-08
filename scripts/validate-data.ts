/**
 * Integrity checks for src/data.
 *
 * The site has no CMS and no database: src/data is the newsroom's whole
 * interface. Everything here was reachable by hand-editing a TypeScript file
 * and shipping, with nothing to catch a mistake. A wrong PDF filename still
 * builds a page and a 404 download; a non-Thursday date makes an issue
 * invisible to the On This Date calendar while it still lists on /archive; a
 * duplicate date makes one issue unreachable and points its neighbour links at
 * the wrong week.
 *
 *   npm run validate        report problems, exit non-zero
 *   npm run validate:fix    additionally rewrite derivable fields in place
 *
 * Runs as a prebuild step, so a bad edit cannot reach the deploy.
 */
import { readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { issues } from "../src/data/archive";
import { classifieds, classifiedCategories } from "../src/data/classifieds";
import { events } from "../src/data/events";
import { obituaries } from "../src/data/obituaries";
import { site } from "../src/data/site";

const ROOT = process.cwd();
const FIX = process.argv.includes("--fix");

/**
 * scripts/build_issue_pdfs.py used to regex-parse this TypeScript by hand,
 * which coupled it to two-space indentation and to a `highlights` key that was
 * renamed to `contents` two commits before this. It now reads this instead.
 */
if (process.argv.includes("--json")) {
  console.log(
    JSON.stringify(
      issues.map((i) => ({
        date: i.date,
        label: i.label,
        volume: i.volume,
        number: i.number,
        pages: i.pages,
        file: i.file,
        headlines: i.contents.map((c) => c.title),
      })),
      null,
      2,
    ),
  );
  process.exit(0);
}

const problems: string[] = [];
const fixes: string[] = [];
const fail = (message: string) => problems.push(message);

/* ------------------------------------------------------------------ helpers */

/**
 * Parse an ISO date at UTC noon. Midnight parses as UTC and then renders in the
 * viewer's own zone, which lands on the previous day anywhere west of Greenwich.
 */
const at = (iso: string) => new Date(`${iso}T12:00:00Z`);

const isIso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(at(s).getTime());

/** The Herald prints Thursdays. VERIFY.md flags this as unconfirmed. */
const isThursday = (iso: string) => at(iso).getUTCDay() === 4;

/** Which Thursday of its own calendar year a date is: the printed issue number. */
function thursdayOfYear(iso: string) {
  const d = at(iso);
  const jan1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const offset = (4 - jan1.getUTCDay() + 7) % 7;
  const firstThursday = Date.UTC(d.getUTCFullYear(), 0, 1 + offset);
  return Math.round((d.getTime() - firstThursday) / 604_800_000) + 1;
}

const coverLabel = (iso: string) =>
  at(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

/** The four fields that are pure functions of the cover date. */
const derive = (iso: string) => ({
  label: coverLabel(iso),
  volume: at(iso).getUTCFullYear() - site.founded + 1,
  number: thursdayOfYear(iso),
  file: `/issues/linden-herald-${iso}.pdf`,
});

function duplicates<T>(list: readonly T[], key: (item: T) => string) {
  const seen = new Map<string, number>();
  for (const item of list) {
    const k = key(item);
    seen.set(k, (seen.get(k) ?? 0) + 1);
  }
  return [...seen.entries()].filter(([, n]) => n > 1).map(([k]) => k);
}

/* ------------------------------------------------------------------- issues */

const sizeCorrections = new Map<string, number>();

for (const issue of issues) {
  const where = `archive.ts ${issue.date}`;

  if (!isIso(issue.date)) {
    fail(`${where}: not an ISO date`);
    continue;
  }

  if (!isThursday(issue.date)) {
    fail(
      `${where}: not a Thursday. The publication calendar only emits Thursdays, so this ` +
        `issue is invisible to On This Date while still listing on /archive.`,
    );
  }

  const want = derive(issue.date);
  for (const key of ["label", "volume", "number", "file"] as const) {
    if (issue[key] !== want[key]) {
      fail(
        `${where}: ${key} is ${JSON.stringify(issue[key])}, derives to ${JSON.stringify(want[key])}`,
      );
    }
  }

  const pdf = join(ROOT, "public", issue.file.replace(/^\//, ""));
  if (!existsSync(pdf)) {
    fail(
      `${where}: ${issue.file} is missing from public/issues/. The page still builds and the ` +
        `download 404s.`,
    );
  } else {
    const actual = statSync(pdf).size;
    if (actual !== issue.sizeBytes) {
      // The size is user-facing in five places and is published as the RSS
      // enclosure length, which feed readers pre-allocate against.
      if (FIX) {
        sizeCorrections.set(issue.date, actual);
        fixes.push(`${where}: sizeBytes ${issue.sizeBytes} -> ${actual}`);
      } else {
        fail(
          `${where}: sizeBytes says ${issue.sizeBytes}, the file on disk is ${actual}. ` +
            `This number is published as the RSS enclosure length.`,
        );
      }
    }
  }

  if (issue.pages <= 0) fail(`${where}: pages must be positive`);

  for (const item of issue.contents) {
    if (item.page !== undefined && item.page > issue.pages) {
      fail(`${where}: "${item.title}" is on p. ${item.page} of a ${issue.pages}-page issue`);
    }
  }

  // The contents lists are keyed on the title string in four components.
  for (const dupe of duplicates(issue.contents, (c) => c.title)) {
    fail(`${where}: duplicate contents title "${dupe}", which is used as a React key`);
  }
}

for (const dupe of duplicates(issues, (i) => i.date)) {
  fail(
    `archive.ts: duplicate date ${dupe}. One of the two becomes unreachable and its ` +
      `neighbour links misdirect.`,
  );
}

const dates = issues.map((i) => i.date);
const descending = [...dates].sort((a, b) => (a < b ? 1 : -1));
if (dates.join() !== descending.join()) {
  fail("archive.ts: issues are not in descending date order. Newest first.");
}

const today = new Date().toISOString().slice(0, 10);
for (const issue of issues) {
  if (issue.date > today) {
    fail(
      `archive.ts ${issue.date}: dated in the future. It becomes currentIssue, and the home ` +
        `page announces it as being in mailboxes this week.`,
    );
  }
}

/* ------------------------------------------- classifieds, events, obituaries */

const categorySlugs = new Set(classifiedCategories.map((c) => c.slug));
for (const c of classifieds) {
  if (!categorySlugs.has(c.category)) {
    // Classified.category is typed `string`, so a typo compiles, drops the
    // listing out of every filter and renders an empty kicker.
    fail(`classifieds.ts ${c.id}: category "${c.category}" is not in classifiedCategories`);
  }
  if (!isIso(c.runsUntil)) {
    fail(`classifieds.ts ${c.id}: runsUntil "${c.runsUntil}" is not an ISO date`);
  }
}

for (const dupe of duplicates(classifieds, (c) => c.id)) {
  fail(`classifieds.ts: duplicate id "${dupe}", which is used as a React key`);
}

for (const dupe of duplicates(events, (e) => e.id)) {
  fail(`events.ts: duplicate id "${dupe}", which is used as a React key`);
}

for (const e of events) {
  if (!isIso(e.date)) fail(`events.ts ${e.id}: date "${e.date}" is not an ISO date`);
  if (e.endDate && !isIso(e.endDate)) {
    fail(`events.ts ${e.id}: endDate "${e.endDate}" is not an ISO date`);
  }
  if (e.endDate && e.endDate < e.date) fail(`events.ts ${e.id}: endDate is before date`);
}

for (const o of obituaries) {
  if (!isIso(o.published)) {
    fail(`obituaries.ts: published "${o.published}" is not an ISO date`);
  }
}

/* -------------------------------------------------------------------- --fix */

if (FIX && sizeCorrections.size > 0) {
  const path = join(ROOT, "src", "data", "archive.ts");
  let source = readFileSync(path, "utf8");
  for (const [date, actual] of sizeCorrections) {
    // Rewrite only the sizeMb belonging to the block that opens with this date.
    const block = new RegExp(`(date: "${date}",[\\s\\S]{0,400}?sizeMb: )([\\d.]+)`);
    if (!block.test(source)) {
      fail(`--fix: could not locate the sizeBytes line for ${date}`);
      continue;
    }
    source = source.replace(block, `$1${actual}`);
  }
  writeFileSync(path, source);
}

/* ------------------------------------------------------------------- report */

const counts =
  `${issues.length} issues, ${classifieds.length} classifieds, ` +
  `${events.length} events, ${obituaries.length} obituaries`;

for (const f of fixes) console.log(`  fixed  ${f}`);

if (problems.length > 0) {
  const n = problems.length;
  console.error(`\nsrc/data: ${n} problem${n === 1 ? "" : "s"} (${counts})\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error("");
  process.exit(1);
}

console.log(`src/data: all checks pass (${counts})`);
