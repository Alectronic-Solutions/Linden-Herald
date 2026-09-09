---
name: cutover
description: Move the Linden Herald site from the GitHub Pages demo to Cloudflare Pages on lindenherald.com. Use when asked to go live, launch, move DNS, set up Cloudflare, turn on indexing, or make the .php redirects work. Covers env vars, base path, _headers, _redirects and the post-move verification.
---

# Cutover to Cloudflare Pages

The demo lives on GitHub Pages, which serves from `/<repo>` and has no
server-side anything. Production is Cloudflare Pages at the domain root. Several
things on this site are currently inert *because* of that, and they all switch
on together.

Run `verify-sweep` first. Do not put unconfirmed prices on the Herald's own
domain.

## What changes

| | GitHub Pages (today) | Cloudflare Pages |
| --- | --- | --- |
| Base path | `/Linden-Herald` | none, domain root |
| `public/_redirects` | ignored | active — the `.php` migration URLs start working |
| `public/_headers` | ignored | active — security headers and cache lifetimes apply |
| `robots.txt` | disallow everything | allow, once the Herald says go |

## Cloudflare Pages project

- **Build command:** `npm run build`
- **Output directory:** `out`
- **Node version:** 20 (matches `.nvmrc` and CI)
- **Environment variables:**
  - `NEXT_PUBLIC_BASE_PATH` — **leave unset.** Cloudflare serves from the root.
  - `NEXT_PUBLIC_SITE_URL` — `https://www.lindenherald.com`
  - `NEXT_PUBLIC_ALLOW_INDEXING` — `true` **only when the client has approved
    the content.** Until then the demo and the real site would compete in search.

The `cloudflare` skill covers the Pages and DNS mechanics. This file covers what
is specific to this repository.

## The base path trap

`SITE_URL` and `asset()` must never both be applied to the same URL. On a
GitHub project site `SITE_URL` already contains `/Linden-Herald`, so combining
them double-prefixes and 404s — that was a real bug in the RSS enclosures.

- `sitemap.ts` and `feed.xml/route.ts` use `SITE_URL` alone.
- `manifest.ts` and every in-page asset use `asset()` alone.

On Cloudflare both reduce to the same thing, which is exactly why a mistake here
is invisible until someone deploys to Pages again. Leave the split as it is.

## Steps

1. `npm run check && npm run build && npm run test:e2e` — all green.
2. Create the Pages project against `Alectronic-Solutions/Linden-Herald`, with
   the settings above. Deploy on a `*.pages.dev` URL first.
3. Verify against the preview URL (below) **before** touching DNS.
4. Point `lindenherald.com` and `www.lindenherald.com` at the project.
5. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` and redeploy.
6. Submit `https://www.lindenherald.com/sitemap.xml` to Google Search Console.
7. Turn off the GitHub Pages deployment, or leave `deploy.yml` publishing a
   staging copy that stays `noindex`.

## Verify after the move

The redirects and headers have never run anywhere, so this is their first real
test.

```bash
# The .php migration URLs. Each should 301 to its new home.
for p in about archive advertise contact subscribe legals; do
  curl -sI "https://www.lindenherald.com/$p.php" | head -2
done

# Guessed shapes readers type.
curl -sI https://www.lindenherald.com/obits
curl -sI https://www.lindenherald.com/rss

# Security headers, which do nothing on GitHub Pages.
curl -sI https://www.lindenherald.com/ | grep -iE 'x-content-type|x-frame|referrer-policy|strict-transport'

# Indexing is on, and the feed and sitemap carry absolute URLs at the real host.
curl -s https://www.lindenherald.com/robots.txt
curl -s https://www.lindenherald.com/feed.xml | grep -o '<enclosure url="[^"]*"' | head -2
```

Then re-run the browser suite against the live site by pointing
`playwright.config.ts`'s `baseURL` at it, and confirm a form submission actually
lands in the newsroom inbox — FormSubmit needs a one-time confirmation click on
the very first submission before it delivers anything, and until that is done
every form on the site fails.

## Still missing at cutover

- `public/_headers` has no `Content-Security-Policy`. Adding one means
  accounting for the two inline `<script>` blocks in `layout.tsx` (the JSON-LD
  and the no-js flag) with a hash or a nonce.
- There is no `CNAME` file and no `wrangler.toml` in the repo; the Pages project
  is configured through the dashboard.
