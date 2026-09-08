---
name: update-rates
description: Apply a confirmed price, deadline or ad-size change from the Linden Herald. Use when the client sends a rate card, quotes a subscription or legal notice price, corrects a deadline, or confirms anything currently listed in VERIFY.md. Covers rates.ts, site.ts and striking the VERIFY entry.
---

# Update rates and deadlines

Prices on this site are load-bearing. The legal notice estimator quotes a real
number a customer can act on, and the ad previewer draws each size to scale, so
a wrong dimension is visibly wrong. Most of what is on the site today is an
assumption — `VERIFY.md` section 1 lists every one of them.

## Where each thing lives

| What changed | File | Export |
| --- | --- | --- |
| Subscription prices, tiers | `src/data/rates.ts` | `subscriptionRates` |
| Legal notice prices, requirements, checklists | `src/data/rates.ts` | `legalNoticeRates` |
| Display ad names, sizes in inches | `src/data/rates.ts` | `displayAdSizes` |
| The printed page size | `src/data/rates.ts` | `PAGE_WIDTH_IN`, `PAGE_HEIGHT_IN` |
| Classified line rates | `src/data/classifieds.ts` | `classifiedRates` |
| Copy deadlines | `src/data/site.ts` | `site.deadlines` |
| Phone, address, email, adjudication, reach | `src/data/site.ts` | `site` |

## Steps

**1. Change the data file. Only the data file.** Every page, the estimator and
the previewer derive from these. If a price appears hard-coded in a component,
that is a bug — replace it with the import rather than editing it twice.

**2. Strike the matching `VERIFY.md` entry in the same change.** This is the
point of the file: it is the list of everything on the site the client has not
confirmed, and it only works if it shrinks when something *is* confirmed. Move
the item out, or delete its section if that was the last one.

**3. Check what else the number feeds.** The high-traffic couplings:

- `subscriptionRates[0].price` is quoted on the home page, `/about`,
  `/archive`, the issue page and in `site.description`. Grep for the old figure
  before you finish.
- `legalNoticeRates` drives `LegalNoticeEstimator` — the price, the document
  checklist and the run length all come from the same entry.
- `site.deadlines.legal` is described in prose on `/legal-notices`, and the
  estimator separately encodes "the Monday before" as an offset. Both have to
  agree.
- `displayAdSizes` dimensions are drawn to scale by `AdSizePreviewer` against
  `PAGE_WIDTH_IN` x `PAGE_HEIGHT_IN`.

**4. Verify:**

```bash
npm run check
npm run build
```

Then read the affected page and confirm the number reads correctly in prose as
well as in the table — several rates appear in a sentence somewhere.

## The one to be careful about

`fbn-entity` in `legalNoticeRates`. The Herald's own copy reads *"$105 single
owner/one business name, $145 more for corp., LLC, partnerships"*, and "$145
more" can mean $145 total or $105 + $145 = $250. The site currently shows $145
as a flat total and the estimator quotes it. If the client is clarifying this
one, get an unambiguous answer before changing it, and say in your summary which
reading you applied.
