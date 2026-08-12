# Commercial Market Evidence: Saudi Arabia & Oman

Status date: 2026-08-12
Scope: search the repository for actual evidence that SAPL has supplied, quoted, or received enquiries from 8 named locations. **No pages created or modified.** This report also surfaces a finding beyond its original scope — flagged prominently below because it changes the risk profile of the decision this report is meant to inform.

## Method

Searched the full repository for: quotation references, customer references, shipment references, destination references, enquiry records, case studies, PDFs, and RFQ data. Specifically checked:
- `frontend/src/data/caseStudiesData.js` — the only "project record"-shaped content in the repo
- `frontend/src/admin/pages/Leads.jsx` and the backend leads API it calls — the only lead/enquiry-record-shaped code in the repo
- Full-repo grep for each city name and for every specific company name that appears attached to a location claim
- `find` across the entire repo for any `.pdf` file — **zero exist**
- `backend/` (confirmed dormant/never deployed, per the earlier security audit) for any seeded customer data — none found

## ⚠ Finding that goes beyond the requested evidence search

While searching for evidence, I found the opposite of what the request anticipated: **the live, published site already makes specific, named-customer commercial claims for these exact markets, with zero supporting evidence anywhere in the repository.** This is more serious than "no evidence exists" — it's "no evidence exists, and the site asserts specific claims as fact anyway." Examples, all currently live:

- `locationsData.js` (Riyadh entry, `content.intro`): *"Shanker Agencies has been exporting Indian-made refractories to Riyadh, Jeddah, Dammam and Jubail for years"* — a direct claim of an export history to Dammam and Jubail specifically.
- `locationsData.js` (Riyadh entry, `content.whyUs`): *"We provide CIF pricing to Jeddah Islamic Port, King Abdulaziz Port (Dammam), and Jubail Commercial Port"* — implies actual shipping operations through these three ports.
- `locationsData.js` (Muscat entry, `content.intro`): *"Shanker Agencies exports refractory products to Oman, serving Jindal Shadeed Iron & Steel, Sohar Aluminium, Oman Cement, and refinery operations"* — names 3 specific, large, identifiable real companies as if they are SAPL customers.
- `locationsData.js` (Jeddah/Yanbu entry, `content.intro`): *"Shanker Agencies exports high-quality Indian refractories to this region"* — this region being where "SABIC petrochemical complexes and Saudi Aramco refining operations" are located, worded to imply SAPL supplies those specific operations.
- `locationsData.js` (Doha entry, `content.whyUs`, found while searching): *"SAPL's export experience to Qatar spans multiple successful shipments to Qatar Steel and other industrial buyers"* — names Qatar Steel specifically, with "multiple successful shipments" as a factual-sounding claim.

**Every one of these named companies** (Jindal Shadeed Iron & Steel, Sohar Aluminium, Qatar Steel, SABIC, Saudi Aramco) **appears nowhere else in the repository** — not in `caseStudiesData.js`, not in any RFQ or lead record, not in any PDF (none exist), not in any other data file. Full-repo grep for each name returns only the single `locationsData.js` hit.

For contrast: `caseStudiesData.js` carries an explicit, prominent disclaimer that its content is "illustrative engineering scenarios... NOT records of specific SAPL project deliveries," with instructions for replacing it once real signed-off case studies exist. **The location-page claims above carry no equivalent disclaimer** — they read as plain factual assertions, unlike the case studies which are honest about being illustrative. This inconsistency in how the codebase treats unverified content is worth your attention independent of the market-page decision this report was requested for.

This is not something I'm asking you to fix in this pass — it's outside the approved scope (you asked for evidence research only, and separately said "Do not change... the IFGL claim" and other content changes need your explicit sign-off). I'm surfacing it because continuing to build new market pages using the same unverified-claim pattern would compound the issue, and because the existing claims may warrant their own review regardless of the Jubail/Dammam/Sohar page decision.

## Per-location evidence table

Per your instruction, evidence is **not** inferred from industrial importance — "no dedicated page for a city" and "no proof of business there" are treated as two separate, unrelated facts below.

| Location | Evidence found | Evidence type | Product | Customer/enquiry documented | Date | Confidence | SEO priority* |
|---|---|---|---|---|---|---|---|
| **Jubail** (Saudi) | Named in Riyadh page's export-history claim and port-pricing claim (see above) — **not independent evidence**, it's the unverified claim itself | Marketing copy only | — | None named specifically for Jubail | None | **NO SAPL COMMERCIAL EVIDENCE FOUND IN REPOSITORY** — the only "mention" is the unverified claim itself, not corroborating evidence | High (per `market-page-recommendations.md`'s industrial-importance analysis — a separate, legitimate basis, not evidence of past business) |
| **Dammam** (Saudi) | Same as Jubail — named in the same unverified Riyadh-page claim | Marketing copy only | — | None | None | **NO SAPL COMMERCIAL EVIDENCE FOUND IN REPOSITORY** | High (same basis as Jubail) |
| **Yanbu** (Saudi) | Named in the Jeddah/Yanbu page's intro, associated with SABIC and Saudi Aramco operations there | Marketing copy only | — | SABIC Yanbu, Saudi Aramco Yanbu named, but only in this one unverified location — no corroboration | None | **NO SAPL COMMERCIAL EVIDENCE FOUND IN REPOSITORY** | Medium (per prior report, second-priority after Jubail/Dammam/Sohar) |
| **Jeddah** (Saudi) | A dedicated page exists (`slug: "jeddah"`) with real GSC traffic history (see `market-location-reconciliation.md`: near-zero clicks in the last 30 days, but the page itself is established and indexed) | Live page + GSC indexation | High alumina bricks, LCC castables, ceramic fiber, magnesia spinel bricks (per page's `products` field — itself unverified as to whether these specific shipments occurred) | No named customer for Jeddah specifically (SABIC/Aramco claims are attributed to Yanbu, not Jeddah, in this same page) | None | **NO SAPL COMMERCIAL EVIDENCE FOUND IN REPOSITORY** for actual transactions — the page's existence and GSC indexation are not evidence of a customer relationship, only of the page being published and crawled | Low priority for new investment (page already exists, low current traffic) |
| **Riyadh** (Saudi) | A dedicated page exists (`slug: "riyadh"`) with real GSC traffic (154 impressions/30d per earlier pull, best-performing Saudi page) | Live page + real GSC traffic | High alumina bricks, magnesia bricks, castables, ceramic fiber, acid proof products (per page's `products` field) | SABIC, "Saudi Steel", named in the page's `majorPlants`/`industries` fields as market context, not as documented customers | None | **NO SAPL COMMERCIAL EVIDENCE FOUND IN REPOSITORY** for a customer relationship — GSC traffic proves the page gets found and clicked, not that a transaction occurred | Already covered; no new page needed |
| **Sohar** (Oman) | Named extensively in the Muscat page (Jindal Shadeed, Sohar Aluminium claims above) | Marketing copy only | — | Jindal Shadeed Iron & Steel, Sohar Aluminium, Oman Cement all named as if customers | None | **NO SAPL COMMERCIAL EVIDENCE FOUND IN REPOSITORY** | High (per prior report's industrial-importance analysis) |
| **Muscat** (Oman) | Dedicated page exists (`slug: "muscat"`) with real GSC traffic (138 impressions/30d, best-performing Oman page) | Live page + real GSC traffic | High alumina bricks, magnesia carbon bricks, castables, ramming mass (per page's `products` field) | Same named companies as Sohar above — attributed to "Oman" broadly in this page, not distinguished by city | None | **NO SAPL COMMERCIAL EVIDENCE FOUND IN REPOSITORY** for a customer relationship | Already covered; no new page needed |
| **Salalah** (Oman) | One passing mention in the Muscat page's intro ("Oman's industrial sector at Sohar, Salalah, and the greater Muscat region...") — no specific claim of serving Salalah businesses | Marketing copy, passing geographic mention only | — | None | None | **NO SAPL COMMERCIAL EVIDENCE FOUND IN REPOSITORY** | Lower priority (per prior report — no independently verified industrial significance comparable to Jubail/Dammam/Sohar) |

\* SEO priority reproduces the industrial-importance-based ranking from `reports/market-page-recommendations.md` for reference only — it is explicitly **not** a substitute for or inference of commercial evidence, per your instruction. The two columns should be read independently: a location can have high SEO priority (real industrial significance, real search demand) with simultaneously zero commercial evidence in this repository. That combination is exactly the situation for Jubail, Dammam, and Sohar.

## What this means for the market-page decision

This report was requested as an input to whether to build Jubail/Dammam/Sohar pages. The honest answer it provides: **the repository contains no evidence either way** — not evidence of business, and not evidence of its absence. Per your explicit instruction, absence of evidence in this repository is not being treated as proof no business ever occurred; SAPL's real commercial history simply isn't captured anywhere in this codebase (no CRM export, no invoice archive, no signed case studies). The only way to resolve this is your own knowledge or records outside this repository — which is exactly the gate already identified in `market-page-recommendations.md`.

What's new in this pass is the discovery that **the decision isn't only "should we build new pages for these cities" — it's also "should the existing Riyadh/Muscat/Jeddah pages keep making specific named-customer claims for Jubail/Dammam/Sohar/Yanbu/Qatar that this search couldn't verify."** That's a separate, arguably more urgent question, since those claims are live right now, not proposed.

## Not done in this pass

- No pages created, moved, or edited.
- No claims removed from the existing Riyadh/Muscat/Jeddah/Doha pages — flagged above for your awareness and decision, not acted on, since it wasn't in this pass's approved scope.
- No inference of "no business ever occurred" from the absence of repository evidence, per your explicit instruction.
