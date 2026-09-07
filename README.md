# The Linden Herald

A proposed redesign of [lindenherald.com](https://www.lindenherald.com/) for the Linden Herald,
a weekly newspaper published in Linden, California since 1959.

Built by [Alectronic Solutions](https://alectronicsolutions.com).

---

## What this is

A complete, static, eight-page site built to replace the current PHP site. It keeps everything the
Herald already has (history, legal notice authority, subscription and advertising information) and
adds the things a weekly paper needs online in 2026:

| Page | Route | What it does |
| --- | --- | --- |
| Front Page | `/` | Lead well, section rails, print-edition callout, obituaries, subscribe CTA |
| News | `/news` | Filterable, searchable index across all stories |
| Section | `/section/[slug]` | A landing page per section with its own lead story and grid |
| Article | `/news/[slug]` | Long-form template with drop cap, credits, related stories, article schema |
| Obituaries | `/obituaries` | Published notices plus a family submission form |
| E-Edition | `/archive` | Searchable back-issue archive with year filtering and cover thumbnails |
| Subscribe | `/subscribe` | Rate cards plus an online subscription request form |
| Advertise | `/advertise` | Legal notice rate table, display ad sizes, deadlines, request form |
| Calendar | `/calendar` | Filterable community events with a free submission form |
| Classifieds | `/classifieds` | Categorised listings set in newspaper columns, plus rates and a submission form |
| About | `/about` | The paper's history, named masthead, coverage and adjudication |
| Contact | `/contact` | News tip form, deadlines, corrections policy |

## The three interactive pieces

These are the features that separate this from a brochure site, and the ones worth
demonstrating live:

**On This Date** (`/archive`). generates every Thursday publication date from 1959 to today,
roughly 3,500 of them, and finds the issue nearest any date a reader picks. Issues with a scanned
PDF open directly; the rest are shown as held in the bound volumes with a request prompt. The
decade chart underneath shows exactly how much of the back catalogue is online, which doubles as
the case for a digitisation project.

**Legal notice estimator** (`/advertise`). three questions to a price, the copy deadline, the
first publication date and a document checklist. Deadlines are computed from the real Thursday
publication schedule rather than hard-coded. Rates and requirements live in `src/data/rates.ts`.

**Ad size previewer** (`/advertise`). drops each ad size onto a scaled 10 x 13 inch page at true
proportion, with its share of the page. Sizes are defined in inches in `src/data/rates.ts`, so
changing one updates the preview automatically.

## Stack

- **Next.js 14** (App Router) with **static export**. No server, no database, no PHP
- **TypeScript**
- **Tailwind CSS** with a custom heritage-broadsheet design system
- **Framer Motion** for scroll reveals and layout transitions
- **FormSubmit** for all four forms, so submissions arrive by email with nothing to maintain

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

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
- `articles.ts`: stories. Add an object to the array and the front page, section rails, news index
  and article page all pick it up automatically
- `archive.ts`: back issues. Add an entry per week and drop the PDF into `public/images/issues/`
- `obituaries.ts`: notices
- `rates.ts`: subscription rates, legal notice pricing and requirements, display ad sizes in inches
- `classifieds.ts`: classified categories, listings and rates
- `events.ts`: community calendar entries
- `staff.ts`: the masthead

## Before launch

These are the deliberate placeholders in this preview build:

1. **Photography. This is the single biggest gap.** `public/images/*.svg` are rendered editorial
   plates, not photographs. The front page hero, the article headers and every story card are
   built to carry real images and are visibly held back without them.

   To swap them in, drop eight files into `public/images/` using these exact names, then change
   the `.svg` extensions to `.jpg` in `src/data/articles.ts`. Nothing else needs to change.

   | File | Subject | Where it appears |
   | --- | --- | --- |
   | `cherry-harvest.jpg` | Cherry orchard, ideally low sun | Front page hero, landscape, wide crop |
   | `school-board.jpg` | Classroom or a public meeting room | Front page, article header |
   | `football.jpg` | High school football under lights | Front page, article header |
   | `canal.jpg` | Irrigation canal or farm field | Section rail, article header |
   | `fair.jpg` | County fair, livestock barn or midway | Section rail, article header |
   | `fire.jpg` | Fire crew or engine, no identifiable faces | Section rail, article header |
   | `walnut-orchard.jpg` | Walnut trees in rows | Agriculture rail |
   | `main-street.jpg` | Small town street with storefronts | History section |

   Landscape, at least 1600px wide. The hero crops to roughly 16:9 at full bleed, so leave
   headroom at the bottom of that frame: the headline sits over the lower third.

   Best long-term answer is the Herald's own archive rather than stock. Sixty-seven years of
   local photography is the one thing a competitor cannot copy.
2. **Story content.** Everything in `articles.ts` is sample copy written for this demonstration.
   Attribution is deliberately by role rather than by invented name, and no quotation is put in a
   named person's mouth, so nothing reads as the record of a real local official.
3. **Obituary notices.** `obituaries.ts` contains sample entries, not real notices.
4. **Issue PDFs.** `public/issues/` holds a generated sample edition for each entry in
   `archive.ts`, so the archive is clickable end to end. Each one is plainly marked a placeholder.
   Replace them with the Herald's real scans, keeping the same filenames, and nothing else changes.
   `scripts/build_issue_pdfs.py` regenerates them if the issue list grows.
5. **Form endpoint.** `site.formEndpoint` points at FormSubmit. Confirm the receiving address and
   activate it once, then the forms are live.
6. **Design preview banner.** Remove `<DemoBadge />` from `src/app/layout.tsx` before launch.
7. **Out-of-county subscription rate.** Listed at $52 as a placeholder. Confirm current postage.
8. **The masthead.** `src/data/staff.ts` reads "Name to come" for all four roles. Real names and
   beats are the single highest-value edit on this list: for a paper whose product is credibility,
   an unnamed newsroom is a missed trust signal.
9. **Classifieds and calendar entries.** `src/data/classifieds.ts` and `src/data/events.ts` hold
   sample listings, not real ones.
10. **Classified rates.** Priced as a placeholder. Confirm against what the Herald charges today.

## Migration and syndication

`public/_redirects` maps the old PHP URLs (`/about.php`, `/archive.php` and the rest) to their new
homes, plus the shapes readers guess at, like `/obits` and `/legals`. Cloudflare Pages reads this
file directly. GitHub Pages has no server-side redirects, so these only take effect after the move.

`public/_headers` sets security headers and long cache lifetimes for immutable assets, also read by
Cloudflare Pages.

An RSS feed is generated at `/feed.xml` from the same article data, and is declared in the document
head so feed readers and aggregators find it.

## Accessibility and performance

- One `h1` per page, ordered headings, skip-to-content link
- Visible focus rings, `aria-pressed` on all filter controls, labelled form fields
- Reduced-motion support, and a no-JavaScript fallback so scroll-revealed content stays visible
- No horizontal overflow at 390px
- Mobile navigation is a real dialog: focus moves into it, Tab is trapped, Escape closes and
  restores focus to the toggle, and the page behind it is scroll-locked
- Every interactive target on mobile is at least 44px tall
- The primary nav is a sibling of the masthead rather than a child of it. A sticky element can
  only stick inside its parent's box, so nesting it in `<header>` gave it no sticky range at all.
- Fonts self-hosted at build time via `next/font`, no third-party font requests at runtime
- `NewsMediaOrganization` and `NewsArticle` structured data
- Asset paths routed through `asset()` in `src/lib/utils.ts`, because `next/image` does not apply
  `basePath` when `images.unoptimized` is set. Anything added under `public/` must use it.
