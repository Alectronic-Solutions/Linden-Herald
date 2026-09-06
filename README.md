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
| News | `/news` | Filterable, searchable story index across seven sections |
| Article | `/news/[slug]` | Long-form template with drop cap, credits, related stories, article schema |
| Obituaries | `/obituaries` | Published notices plus a family submission form |
| E-Edition | `/archive` | Searchable back-issue archive with year filtering and cover thumbnails |
| Subscribe | `/subscribe` | Rate cards plus an online subscription request form |
| Advertise | `/advertise` | Legal notice rate table, display ad sizes, deadlines, request form |
| About | `/about` | The paper's history, coverage and adjudication |
| Contact | `/contact` | News tip form, deadlines, corrections policy |

## Stack

- **Next.js 14** (App Router) with **static export** — no server, no database, no PHP
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

- `site.ts` — phone, mailing address, navigation, deadlines, section list, form endpoint
- `articles.ts` — stories. Add an object to the array and the front page, section rails, news index
  and article page all pick it up automatically
- `archive.ts` — back issues. Add an entry per week and drop the PDF into `public/images/issues/`
- `obituaries.ts` — notices
- `rates.ts` — subscription rates, legal notice pricing, display ad sizes

## Before launch

These are the deliberate placeholders in this preview build:

1. **Photography.** `public/images/*.svg` are rendered editorial plates in the Herald's palette,
   standing in for the paper's own photographs. Replace them with real images and update the
   `image` paths in `src/data/articles.ts`. `scripts/generate-art.mjs` regenerates the plates.
2. **Story content.** Everything in `articles.ts` is sample copy written for this demonstration.
3. **Obituary notices.** `obituaries.ts` contains sample entries, not real notices.
4. **Issue PDFs.** `archive.ts` points at `/issues/*.pdf`. Drop the real files in and the archive
   works as-is.
5. **Form endpoint.** `site.formEndpoint` points at FormSubmit. Confirm the receiving address and
   activate it once, then the forms are live.
6. **Design preview banner.** Remove `<DemoBadge />` from `src/app/layout.tsx` before launch.
7. **Out-of-county subscription rate.** Listed at $52 as a placeholder. Confirm current postage.

## Accessibility and performance

- One `h1` per page, ordered headings, skip-to-content link
- Visible focus rings, `aria-pressed` on all filter controls, labelled form fields
- Reduced-motion support, and a no-JavaScript fallback so scroll-revealed content stays visible
- No horizontal overflow at 390px
- Fonts self-hosted at build time via `next/font`, no third-party font requests at runtime
- `NewsMediaOrganization` and `NewsArticle` structured data
