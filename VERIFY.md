# Verify before launch

Everything on this site that is **not** confirmed from lindenherald.com or the
paper itself. Sample data is realistic on purpose so the site can be demoed, but
none of it should go live unchecked. Several items below are prices.

Sorted by consequence. Anything in the first section is a number a customer
could act on.

---

## 1. Prices and legal claims, all of which must be confirmed

### Fictitious business name, additional entities. Genuinely ambiguous
`src/data/rates.ts` (`fbn-entity`)

The Herald's advertise page reads:

> "$105 single owner/one business name, ,$145 more for corp., LLC, partnerships,
> husband and wife (extra names $10 each)"

"$145 **more**" can mean either **$145 total** or **$105 + $145 = $250**. We
currently show **$145 as a flat total**. This drives the on-site estimator, so
if it is wrong every quote for an entity filing is wrong. **Ask directly.**

### Out-of-county subscription rate. Not published anywhere
`src/data/rates.ts` (`subscriptionRates[1]`)

We show **$52/year**. The Herald's subscribe page states only the in-county rate
($42 for 52 issues, effective Jan 1 2023) and says nothing about out-of-county.
This figure is invented.

### Gift subscription tier. Invented
`src/data/rates.ts` (`subscriptionRates[2]`)

We show a $42 gift subscription with a card mailed alongside the first issue.
The Herald does not advertise this. Confirm they offer it before it stays.

### Trustee sale pricing
`src/data/rates.ts` (`trustee-sale`)

We say "priced by column inch, competitive with the county's larger papers" and
list a three-week run. The Herald lists trustee sales as something they publish
but gives no rate or run length. Confirm both.

### Display advertising. Entirely invented
`src/data/rates.ts` (`displayAdSizes`, `PAGE_WIDTH_IN`, `PAGE_HEIGHT_IN`)

Ad names, dimensions, the 10 × 13 inch page, and which sizes exist are all
assumptions. The Herald publishes no display rate card. Their page says only
"please contact us for competitive advertising rates." The `AdSizePreviewer` draws these to scale,
so wrong dimensions are visibly wrong. **Get the real rate card.**

### Deadlines. Invented
`src/data/site.ts` (`deadlines`)

Display "Friday at 5 p.m. for the following Thursday edition"; classified, legal
and obituary all "Monday at noon." None of these appear on their site. The legal
deadline feeds the estimator's first-publication-date calculation.

### Obituaries published free
`src/data/site.ts`, `/obituaries`, `/community`

We state obituaries run at no charge for families in the district. Unconfirmed.

### Classified line rates
`src/data/classifieds.ts` (`classifiedRates`)

Invented.

---

## 2. Facts about the paper

### Publication day
`src/lib/issues.ts` (`FOUNDED_YEAR`, the Thursday schedule)

We assume the Herald prints **Thursdays**, and generate ~3,500 publication dates
from 1959 on that basis. This drives `OnThisDate` and the legal notice
estimator's deadline maths. Their archive PDFs are dated Thursdays, which
supports it, but confirm it. Confirm also whether the run has ever been
interrupted.

### Volume numbering
`src/data/archive.ts`, `src/lib/utils.ts` (`volumeFor`)

We compute volume as `year - 1959 + 1`, giving Vol. 68 in 2026. The real paper's
volume numbering is not published. Issue numbers (No. 36 etc.) are likewise
derived from week-of-year and unverified.

### Staff
`src/data/staff.ts`

All four entries are literally `"Name to come"`. The About page says the team has
"a combined total of more than 57 years of experience" but names nobody. Needs
real names and roles, or the masthead section should be removed.

### Email address
`src/data/site.ts` (`site.email`)

All seven forms post to `https://formsubmit.co/ajax/news@lindenherald.com`. **That
address is a guess.** The Herald publishes a phone number and a PO Box, no
email. Every form on the site silently fails if it is wrong. FormSubmit also
requires a one-time email confirmation before it will deliver.

---

## 3. Sample content, to replace or remove

### Issue archive
`src/data/archive.ts`

32 issues. **Only the 7 most recent mirror the Herald's real archive**
(2026-09-03, 08-06, 07-30, 07-23, 07-09, 07-02, 06-18). Those dates and file
sizes came from their site. The other 25 issues are invented to demonstrate year
filtering.

Page counts and `contents` for **every** issue are invented, including the seven
real ones. The contents lists were adapted from the sample articles written for
the earlier draft of this site.

The PDFs in `public/issues/` are generated placeholders
(`scripts/build_issue_pdfs.py`), not real scans.

### Obituaries
`src/data/obituaries.ts` holds six entries, all named "Sample Notice."

### Community calendar
`src/data/events.ts` holds 24 invented events.

### Classifieds
`src/data/classifieds.ts` holds 24 invented listings.

### Policy pages
`src/data/policies.ts` holds the privacy, terms, accessibility and corrections
policies, all written for this build. **These are legal-adjacent and should be reviewed
by the Herald before publishing**, particularly the corrections policy, which
describes a process the paper may not follow.

---

## 3a. Fixed since this file was written

These were wrong rather than unconfirmed, and have been corrected:

- **File sizes.** `archive.ts` claimed 13.4-23.3 MB per issue while the
  placeholder PDFs are around 8 KB, and that figure was published as the RSS
  `<enclosure length>`. The field is now `sizeBytes`, taken from the file on
  disk and enforced by `npm run validate`. It follows that the demo now shows
  honest, very small file sizes; regenerate fuller placeholders with
  `scripts/build_issue_pdfs.py` if that matters for a demo.
- **The forms all reported failure.** They posted to FormSubmit’s non-AJAX
  endpoint, which sends no CORS header, so `fetch` rejected and every visitor
  was told their message had not gone through. Still blocked on the address
  below being confirmed and activated.
- **The folio date was the build date**, baked into all twenty pages.

## 4. Deployment

- `NEXT_PUBLIC_ALLOW_INDEXING` is `false` everywhere except the production
  build. While this demo is public, `robots.txt` disallows everything so it
  cannot compete with the real lindenherald.com in search.
- `public/_redirects` is Cloudflare-format and does nothing on GitHub Pages. The
  `.php` migration redirects only take effect once DNS moves to Cloudflare.
- `SITE_URL` defaults to `https://www.lindenherald.com`; set
  `NEXT_PUBLIC_SITE_URL` for any other host or the sitemap and RSS emit wrong
  absolute URLs.
