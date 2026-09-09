# The Linden Herald

A proposed redesign of [lindenherald.com](https://www.lindenherald.com/) for the Linden Herald,
a weekly newspaper published in Linden, California since 1959.

Built by [Alectronic Solutions](https://alectronicsolutions.com).

---

## What this is

A complete, static site built to replace the current PHP site.

**It is not a news website, on purpose.** The Herald's own About page says it plainly: *"We are a
print-only newspaper written and reported in the traditional journalism manner."* Stories run in
the weekly edition and nowhere else. So this site does the five things the Herald's site actually
does for the business. It sells subscriptions, sells legal notices, sells advertising, hands out
issue PDFs, and says who and where the paper is.

The **issue** is the primary entity here, not the article. The site lists what ran in each
edition, as a table of contents, and points readers at the PDF or a subscription. It never carries
story text.

| Page | Route | What it does |
| --- | --- | --- |
| Home | `/` | This week's issue and its contents, the three services, community submissions, recent issues |
| Past Issues | `/archive` | Searchable back-issue archive with year filtering and cover thumbnails |
| Issue | `/archive/[date]` | One edition: cover, PDF download, full table of contents, neighbouring issues |
| Legal Notices | `/legal-notices` | Adjudication credentials, cost estimator, full rate table, per-notice document checklists, request form |
| Subscribe | `/subscribe` | Rate cards, a printable mail-in order form, and an online request form |
| Advertise | `/advertise` | Reach figures, display ad sizes at true proportion, deadlines, request form |
| Community | `/community` | Hub for the three reader submission routes |
| Obituaries | `/obituaries` | Published notices plus a family submission form |
| Calendar | `/calendar` | Filterable community events with a free submission form |
| Classifieds | `/classifieds` | Categorised listings set in newspaper columns, plus rates and a submission form |
| About | `/about` | The paper's history, masthead, coverage and adjudication |
| Contact | `/contact` | News tip form, deadlines, corrections policy |

## The three interactive pieces

These are the features that separate this from a brochure site, and the ones worth
demonstrating live:

**On This Date** (`/archive`). generates every Thursday publication date from 1959 to today,
roughly 3,500 of them, and finds the issue nearest any date a reader picks. Issues with a scanned
PDF open directly; the rest are shown as held in the bound volumes with a request prompt. The
decade chart underneath shows exactly how much of the back catalogue is online, which doubles as
the case for a digitisation project.

**Legal notice estimator** (`/legal-notices`). three questions to a price, the copy deadline, the
first publication date and a document checklist. Deadlines are computed from the real Thursday
publication schedule rather than hard-coded. Rates and requirements live in `src/data/rates.ts`.

**Ad size previewer** (`/advertise`). drops each ad size onto a scaled 10 x 13 inch page at true
proportion, with its share of the page. Sizes are defined in inches in `src/data/rates.ts`, so
changing one updates the preview automatically.

## Stack

- **Next.js 14** (App Router) with **static export**. No server, no database, no PHP
- **TypeScript**
- **Tailwind CSS** with a custom heritage-broadsheet design system
- No animation library. Motion is CSS transitions; Framer Motion was removed
  because importing it in `SiteHeader` and `BackToTop` put it in the root layout
  chunk, so all twenty routes paid 37 KB gzipped for it
- **FormSubmit** for all six forms, so submissions arrive by email with nothing to maintain

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # lint + typecheck + src/data validation
npm run build    # static export to ./out (validates first)
npm run test:e2e # axe, no-JavaScript and metadata checks against the export
```

### Checks

`npm run validate` (`scripts/validate-data.ts`) is the one worth knowing about.
`src/data` is the whole newsroom interface and nothing used to check it, so a
wrong PDF filename still built a page and a 404 download, and a non-Thursday
date made an issue invisible to On This Date while it still listed on
`/archive`. It enforces PDF existence, real file sizes, Thursday-only dates,
unique and descending dates, the four fields derivable from the cover date, page
numbers within the page count, and category and id integrity across classifieds,
events and obituaries. It runs as a `prebuild` step, so a bad edit cannot reach
a deploy.

`npm run budget` fails if the JavaScript shared by every route grows past
105 KB gzipped. It is 101.7 KB today and was 139 KB before Framer Motion came
out.

The build writes a fully static site to `out/`. Nothing in it requires a runtime.

## Deploying

### GitHub Pages (project site)

GitHub serves project pages from a subpath, so the build needs a base path:

```bash
npm run build:ghpages   # sets NEXT_PUBLIC_BASE_PATH=/linden-herald
```

Publish the contents of `out/`. `public/.nojekyll` is already in place so GitHub does not strip
the `_next` directory.

### Cloudflare Pages (production)

Cloudflare serves from the domain root, so no base path is needed:

- **Build command:** `npm run build`
- **Output directory:** `out`
- **Node version:** 20 or later

Point `lindenherald.com` and `www.lindenherald.com` at the Pages project once the client is ready
to move the DNS.

## Editing content

Everything the newsroom would change lives in `src/data/`. No component edits required.

- `site.ts`: phone, mailing address, navigation, deadlines, section list, form endpoint
- `archive.ts`: **the spine of the site.** One entry per printed issue, each with a `contents`
  array listing what ran in it. Add an entry, drop the PDF into `public/issues/`, and the front
  page, the archive, the issue page, the sitemap and the RSS feed all pick it up automatically
- `obituaries.ts`: notices
- `rates.ts`: subscription rates, legal notice pricing and requirements, display ad sizes in inches
- `classifieds.ts`: classified categories, listings and rates
- `events.ts`: community calendar entries
- `staff.ts`: the masthead

## Before launch

**See [VERIFY.md](VERIFY.md)** for the full list of everything on this site that is not confirmed
from lindenherald.com or the paper itself, sorted by consequence. Several items there are prices a
customer could act on. The fictitious business name entity rate is the one to check first. It is
genuinely ambiguous in the Herald's published copy, and it drives the on-site estimator.

The short version:

1. **Rates.** Only the $42 in-county subscription and the legal notice prices come from the
   Herald. Display advertising, classified rates, out-of-county postage and every deadline are
   assumptions.
2. **Form endpoint.** `site.formEndpoint` points at FormSubmit with a guessed address. Confirm it
   and activate it once, then the forms are live.
3. **Issue data.** Only the seven most recent issues mirror the Herald's real archive. The other
   25, and every `contents` list, are sample data. `public/issues/` holds generated placeholder
   PDFs, marked as such; `scripts/build_issue_pdfs.py` regenerates them.
4. **The masthead.** `src/data/staff.ts` reads "Name to come" for all four roles. For a paper whose
   product is credibility, an unnamed newsroom is a missed trust signal.
5. **Sample notices.** Obituaries, calendar entries and classifieds are all invented.
6. **Policy pages.** Privacy, terms, accessibility and corrections were drafted for this build and
   should be reviewed by the Herald before publishing.

## Migration and syndication

`public/_redirects` maps the old PHP URLs (`/about.php`, `/archive.php` and the rest) to their new
homes, plus the shapes readers guess at, like `/obits` and `/legals`. Cloudflare Pages reads this
file directly. GitHub Pages has no server-side redirects, so these only take effect after the move.

`public/_headers` sets security headers and long cache lifetimes for immutable assets, also read by
Cloudflare Pages.

An RSS feed is generated at `/feed.xml`, and is declared in the document head so feed readers and
aggregators find it. Because the paper is print-only, the feed announces **issues** rather than
stories: one item per edition, with its table of contents in the description and the PDF attached
as an enclosure.

`/news`, `/news/*` and `/section/*` from the earlier draft of this site redirect to the archive.

## Accessibility and performance

Built to WCAG 2.2 AA, the standard the ADA is measured against. `tests/a11y.spec.ts` runs
axe-core over every route with the `wcag22aa` tags and fails on any violation.

- One `h1` per page, ordered headings, skip-to-content link
- Visible focus rings, `aria-pressed` on all filter controls, labelled form fields,
  `aria-current` on the navigation
- **A reader text size control** in the folio line — Normal, Larger, Largest — set on `<html>`
  as `data-text-size` and remembered in `localStorage`. Every size on this site is in `rem`, so
  the whole paper moves together. `layout.tsx` restores the choice before first paint
- Nothing below 16px in reading copy, and nothing below 12.5px anywhere except the two scale
  drawings (the miniature front page, the ad-size page mock), whose information is repeated at
  full size beside them
- Reduced-motion support. Nothing is hidden behind an entry animation, so every
  page renders its content with JavaScript unavailable — enforced by a Playwright
  project that runs the whole suite with scripting disabled
- No horizontal overflow at 1280, 1024, 390 or 320px, at any text size. 320px is the width
  SC 1.4.10 asks about, and what a 1280px window looks like at 400% zoom
- Mobile navigation is a real dialog: focus moves into it, Tab is trapped, Escape closes and
  restores focus to the toggle, and the page behind it is scroll-locked
- Every interactive target is at least 44px, against the 24px SC 2.5.8 asks for
- `scroll-margin` on every focusable element, so the sticky nav never hides what has focus
  (SC 2.4.11)
- The primary nav is a sibling of the masthead rather than a child of it. A sticky element can
  only stick inside its parent's box, so nesting it in `<header>` gave it no sticky range at all.
- Fonts self-hosted at build time via `next/font`, no third-party font requests at runtime
- `NewsMediaOrganization`, `WebSite` and `PublicationIssue` structured data
- Asset paths routed through `asset()` in `src/lib/utils.ts`, because `next/image` does not apply
  `basePath` when `images.unoptimized` is set. Anything added under `public/` must use it.
