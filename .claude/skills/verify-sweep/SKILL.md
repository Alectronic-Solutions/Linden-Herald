---
name: verify-sweep
description: Audit VERIFY.md against the current code and report what is still unconfirmed before launch. Use when asked whether the Linden Herald site is ready to go live, what still needs client sign-off, whether VERIFY.md is current, or to prepare a list of questions for the Herald.
---

# Pre-launch verification sweep

`VERIFY.md` is the list of everything on this site that is not confirmed from
lindenherald.com or the paper itself, sorted by consequence. It was written by
hand and drifts as the code changes. This sweep re-grounds it.

## What to do

**1. Read `VERIFY.md` end to end.** Every entry names a file and usually an
export.

**2. For each entry, check the code still matches.** Entries go stale in three
ways:

- The value changed but the entry still quotes the old one.
- The export was renamed or removed, so the entry points at nothing.
- The concern was resolved and nobody struck the entry.

**3. Look for unconfirmed values that are *not* in the file.** Anything that
reads like a fact about the Herald's business — a price, a deadline, a
circulation figure, a court decree number, a staff name, a publication day —
should either be sourced or listed. Places to check:

```bash
grep -rn "VERIFY" src/          # in-code markers
grep -rn "\$[0-9]" src/data/    # prices
```

Compare against `src/data/site.ts`, `rates.ts`, `classifieds.ts` and `staff.ts`.

**4. Run the checks.** `npm run check` covers structural integrity, not
truthfulness — a price can be perfectly well-formed and wrong.

## Report

Produce two lists.

**Blocking.** Anything a customer could act on and be given a wrong number, or
anything that misrepresents the paper. Today that is the whole of `VERIFY.md`
section 1, plus:

- `src/data/staff.ts` reads "Name to come" for all four masthead roles. For a
  paper whose product is credibility, an unnamed newsroom is a worse trust
  signal than no masthead at all — get names or remove the section.
- `site.email` is a guess, and every form on the site posts to it through
  FormSubmit. FormSubmit also needs a one-time confirmation click on the first
  submission before it delivers anything. Until both are done, the forms are
  decorative.
- The policy pages in `src/data/policies.ts` are legal-adjacent and were drafted
  for this build. The corrections policy in particular describes a process the
  paper may not actually follow.

**Non-blocking.** Sample content that should be replaced but is not dangerous:
the 25 invented issues, the invented contents lists, the six "Sample Notice"
obituaries, the 24 invented events and 24 invented classifieds, and the
placeholder PDFs in `public/issues/`.

For each blocking item, write the actual question to put to the Herald, phrased
so it can be sent as-is. Ambiguous items need the ambiguity spelled out — see
the `fbn-entity` entry, where "$145 more" could mean $145 or $250 and the
estimator has to pick one.

## Also check before launch

- `NEXT_PUBLIC_ALLOW_INDEXING` is still `false` everywhere but production, so
  the demo cannot compete with the real lindenherald.com in search.
- `NEXT_PUBLIC_SITE_URL` is set for whatever host is being deployed to, or the
  sitemap and feed emit wrong absolute URLs.
- `public/_redirects` and `public/_headers` are Cloudflare formats and do
  nothing on GitHub Pages. The `.php` migration redirects only take effect once
  DNS moves.
