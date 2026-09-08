---
name: add-issue
description: Add a printed edition to the Linden Herald archive. Use when someone says a new issue is out, gives a cover date and a PDF, asks to add or backfill an edition, or wants the front page to show a newer paper. Covers archive.ts, the PDF, the contents list and validation.
---

# Add an issue to the archive

`src/data/archive.ts` is the spine of this site. One entry per printed edition
drives the front page, `/archive`, the issue page, the sitemap and the RSS feed.
Adding one wrongly fails silently in about ten different ways, which is why the
last step here is not optional.

## What you need

- The **cover date** (a Thursday).
- The **PDF**, named `linden-herald-YYYY-MM-DD.pdf`.
- The **page count**.
- The **table of contents**: for each item a title, a section, optionally a
  one-line deck and a page number.

If you only have some of these, add what you have and ask for the rest. Do not
invent a contents list — see `VERIFY.md`; sample data on this site is already a
standing risk.

## Steps

**1. Put the PDF in `public/issues/`** as `linden-herald-YYYY-MM-DD.pdf`. The
filename must match the date exactly; the validator derives it and will reject
anything else.

**2. Add the entry at the top of `issues` in `src/data/archive.ts`.** The array
is newest-first and the validator enforces it.

```ts
{
  date: "2026-09-10",
  label: "September 10, 2026",   // derived: "%B %-d, %Y" of date
  volume: 68,                    // derived: year - 1958
  number: 37,                    // derived: which Thursday of the year
  sizeBytes: 0,                  // put 0; validate:fix fills in the real size
  pages: 12,
  file: "/issues/linden-herald-2026-09-10.pdf",
  contents: [
    {
      title: "Headline as it ran in the paper",
      section: "news",
      deck: "One line. Never a full story: this paper is print-only.",
      page: 1,
    },
  ],
}
```

`section` must be one of the slugs in `sections` in `src/data/site.ts` —
`news`, `agriculture`, `sports`, `schools`, `public-safety`, `opinion`,
`history`. This is the one field TypeScript already checks.

**3. Fill in the real file size:**

```bash
npm run validate:fix
```

**4. Validate, and fix whatever it reports:**

```bash
npm run validate
```

**5. Build, and confirm the issue is the one on the front page:**

```bash
npm run build
```

## What the validator is protecting you from

Each of these builds cleanly and ships broken without it:

- A **filename typo** — the page generates, the download 404s.
- A **wrong `sizeBytes`** — it is user-facing in five places and is published as
  the RSS `<enclosure length>`, which feed readers pre-allocate against.
- A **non-Thursday date** — the publication calendar only emits Thursdays, so
  the issue becomes invisible to On This Date while still listing on `/archive`.
- A **duplicate date** — one of the two becomes unreachable and its neighbour
  links point at the wrong week.
- **`volume` / `number` / `label` out of step with `date`** — they are repeated
  in the heading, the meta description, the JSON-LD and the feed.
- A **future date** — it becomes `currentIssue`, and the home page announces it
  as being in mailboxes this week.
- A **page number past the page count**, or two contents entries with the same
  title in one issue (they are React keys).

## Notes

- Do not touch the sitemap, the feed or the front page. They all derive.
- `IssueCover` draws a procedural stand-in from the date; there are no real
  cover images yet.
- If the client sends several issues at once, add them all, then run
  `validate:fix` and `validate` once.
