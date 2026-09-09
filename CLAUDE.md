# The Linden Herald

A static Next.js 14 site for a weekly print newspaper in Linden, California,
published since 1959. It replaces the Herald's PHP site. Built by Alectronic
Solutions; currently a pitch demo on GitHub Pages, headed for Cloudflare Pages
on the Herald's own domain.

Read `README.md` for what the site is and `VERIFY.md` for what in it is not yet
confirmed by the client. Both are current; keep them that way.

## Commands

```bash
npm run dev        # localhost:3000
npm run check      # lint + typecheck + validate. Run this before you claim done.
npm run build      # static export to ./out (runs validate first, via prebuild)
npm run validate   # src/data integrity; --fix rewrites derivable fields
npm run format     # prettier
npm run test:e2e   # playwright
```

## The two rules that matter most

**1. `src/data/` is the source of truth. Components read it; they never restate
it.** There is no CMS and no database. Everything the newsroom would change
lives in one of eight data files, and every page derives from them. If you find
yourself typing "$42", "1959", a phone number or a deadline into a component,
stop and import it instead. `site.ts` holds the paper's own facts, `rates.ts`
every price, `archive.ts` the issue spine.

**2. Anything under `public/` must go through `asset()`** (`src/lib/utils.ts`).
`next/image` does not apply `basePath` when `images.unoptimized` is set, and
plain anchors never do, so a raw `/issues/foo.pdf` 404s on the GitHub Pages
project site. The one exception is a URL that already carries `SITE_URL`, which
on a project site *includes* the base path — combining both double-prefixes it.
`sitemap.ts` and `feed.xml` use `SITE_URL` alone; `manifest.ts` uses `asset()`
alone. Do not mix them.

## Static export constraints

`output: "export"` with `trailingSlash: true`. No server, no runtime, no API
routes, no middleware, no ISR. `next start` does not apply and the script has
been removed. Forms post to FormSubmit from the browser; there is nothing else
server-side on this site.

`public/_headers` and `public/_redirects` are Cloudflare Pages formats. They are
inert on GitHub Pages, which is where the demo currently lives — do not assume a
redirect or a security header is in effect today.

## Dates

Every ISO date in `src/data` is a bare `YYYY-MM-DD`. Parsing one with
`new Date(iso)` treats it as UTC midnight and then renders it in the reader's own
zone, which lands on the previous day for anyone west of Greenwich. Always parse
at noon. The codebase does this in ten places with two different conventions
(`T12:00:00` local, `T12:00:00Z` UTC); prefer UTC noon for anything derived from
the publication calendar, and match the surrounding file otherwise.

Never compute "today" during render in a component that is statically exported.
It bakes the build date into the HTML and then disagrees with the browser at
hydration. `SiteHeader`'s folio line and `OnThisDate` both show the correct
pattern: hold it in state, fill it in after mount.

## Adding an issue

`src/data/archive.ts` is the spine — the front page, the archive, the issue
page, the sitemap and the RSS feed all derive from it. Four of its fields
(`label`, `volume`, `number`, `file`) are pure functions of `date`, and
`sizeBytes` must match the real PDF. `npm run validate` enforces all of that,
plus Thursday-only dates, unique dates, descending order, page numbers within
the page count, and PDF existence. Run it. There is a `add-issue` skill in
`.claude/skills/` that walks the whole procedure.

## Dialogs

Modal dialogs go through `Modal` (`src/components/Modal.tsx`) or, for something
that is not a centred card, the `useDialog` hook it is built on
(`src/lib/useDialog.ts`). The hook owns scroll lock, the Tab trap, Escape, and
returning focus on close. Pass `returnFocusRef` whenever the control that opened
the dialog might have lost focus in the meantime — a submit button disabled while
its request is in flight has already handed focus to the body by the time the
dialog mounts.

Form success opens a confirmation card; form failure stays inline beside the
button, because on a failure the reader's answers are still in the fields and
that is where they need to be.

## Facts that are not confirmed

Most prices, all deadlines, the Thursday publication day, the volume numbering
scheme, the newsroom email address and every obituary, event and classified are
assumptions or sample data. They are catalogued in `VERIFY.md`, sorted by
consequence. **When you learn a real value, update the data file and strike the
matching VERIFY.md entry in the same change. When you need a value nobody has
confirmed, add it to VERIFY.md rather than quietly inventing one.** For a paper
whose product is credibility, a wrong price on the site is the worst bug
available.

## Conventions

- TypeScript strict. `npm run typecheck` must pass; `next build` typechecks too.
- Tailwind only, with the tokens in `tailwind.config.ts`. No inline styles, no
  new colour literals — `ink`, `newsprint`, `herald`, `cherry`, `harvest`,
  `rule` cover the whole design.
- Server components by default. `"use client"` only for something that genuinely
  needs the browser, and never in the root layout's tree without checking what
  it drags into the shared bundle — framer-motion cost every one of the twenty
  routes 37 KB gzipped that way.
- One `<h1>` per page.
- Page metadata goes through `pageMetadata()` in `src/lib/metadata.ts`, which
  derives the canonical, the Open Graph URL and the feed link from one path.
  Setting them by hand is how five pages ended up declaring the home page as
  their canonical.
