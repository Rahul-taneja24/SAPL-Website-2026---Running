# GEO Audit Report: Shanker Agencies Private Limited (SAPL)

**Audit Date:** 2026-08-18
**URL:** https://www.shankeragencies.com
**Business Type:** Agency/Services (B2B industrial supplier + technical services hybrid — closest fit is Agency/Services given case-study-style content depth and named-expert positioning, not e-commerce despite a product catalog, since there is no cart/checkout and pricing is enquiry-only)
**Pages Analyzed:** Homepage, About, Contact, Brands (hub + 7 detail), Products (hub + 5 category + representative product + grade pages), Solutions (hub + 8 industry), Knowledge, 6 representative blog posts, News, Engineering References, `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `ai-roadmap.json`
**Method note:** This audit draws on source-level repository access (not only rendered-HTML scraping) plus live production checks and external web search for off-site presence, carried over from prior work this session on the same site. Core Web Vitals field data was not measured this pass and is explicitly marked not-measured rather than estimated.

---

## Executive Summary

**Overall GEO Score: 71/100 (Fair — bordering Good)**

SAPL's technical GEO foundation is unusually strong for a company this size: an AI-crawler-aware `robots.txt` with an explicit IETF `Content-Signal` directive, a live `llms.txt`/`llms-full.txt` pair, a `TechArticle`-typed blog (not generic `Article`), and a comprehensive `Organization` `@graph` carrying verifiable CIN/GST identifiers. The two things holding the score out of "Good" are structural, not cosmetic: **Brand Authority is nearly absent off-site** (no LinkedIn company page found, no Reddit/YouTube/Wikipedia presence, and a conflicting founding-year listed on IndiaMART), and **Content E-E-A-T is capped by anonymous authorship** — every technical article is bylined to a generic "Engineering Team" with no individual credentials, on a site whose entire competitive advantage is claimed to be engineering judgment.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 78/100 | 25% | 19.5 |
| Brand Authority | 42/100 | 20% | 8.4 |
| Content E-E-A-T | 68/100 | 20% | 13.6 |
| Technical GEO | 85/100 | 15% | 12.75 |
| Schema & Structured Data | 76/100 | 10% | 7.6 |
| Platform Optimization | 72/100 | 10% | 7.2 |
| **Overall GEO Score** | | | **71/100 (Fair)** |

---

## Critical Issues (Fix Immediately)

**1. ~~False ISO certification claim embedded in machine-readable, AI-facing data~~ — RESOLVED 2026-08-25**
`frontend/app/layout.jsx` (Organization JSON-LD, site-wide) contained a `hasCredential` claim for "ISO 9001 Quality Management System" — a certification the company does not hold. Removed sitewide: the JSON-LD `hasCredential` block, 15+ visible-copy locations (Home, Footer, About — including a fabricated "2005 ISO certification completed" timeline entry — Contact, CompanyProfile, the Arabic homepage), and, caught in a follow-up pass prompted by this report, the same claim in all three AI-facing manifest files this audit flagged as live: `frontend/public/llms.txt`, `frontend/public/llms-full.txt`, and `frontend/public/ai-roadmap.json`. No ISO certification claim remains anywhere in the codebase as of this fix; a `hasCredential` field should not be re-added until the certification is actually held.

**2. Conflicting founding-year on a major indexed third-party directory**
IndiaMART lists SAPL as "established in 1990"; the site states "founded 1980" in 86+ locations including the `Organization` schema's `foundingDate` and the `disambiguatingDescription` written specifically to prevent AI/search entity confusion with similarly-named firms. An LLM trained on both sources has no way to resolve which is correct, and the disambiguation effort is partially undermined by the very kind of conflict it was built to prevent. This is external and cannot be fixed in the repository — flagging as critical because it directly contradicts a schema field the site treats as authoritative.

---

## High Priority Issues

**3. No LinkedIn company page found**
Targeted search (`"Shanker Agencies" refractory site:linkedin.com`) returned zero matches for the actual company — only unrelated firms sharing the "Shanker" surname. For a B2B industrial supplier, LinkedIn is typically the single highest-value entity-verification and citation source AI systems draw on for company recognition. This is the largest single gap in Brand Authority.

**4. No individual author attribution on technical content**
Every blog post (`app/blog/[articleSlug]/page.jsx:71-73`) bylines to `post.author?.name || 'Shanker Agencies Engineering Team'` — in practice almost always the fallback. There is no author page, no credentials, no linked bio. The site's own positioning (verified in a prior brand-analysis pass this session) is that Mohan Taneja's plant-floor diagnostic experience is the actual differentiator — that expertise is present in the About page narrative but completely absent from the 60+ `TechArticle`-schema pages that are the site's actual AI-citation surface.

**5. No Reddit, YouTube, or Wikipedia presence**
Confirmed via targeted search — no results on any of the three platforms AI systems most commonly cite for independent brand verification and community sentiment. `ai-roadmap.json`'s own `trust_signals` block does not list any of these either, meaning the site's own AI-facing manifest correctly reflects that this presence doesn't exist (no false claim here — just an absence).

---

## Medium Priority Issues

**6. FAQPage schema is present but earns no Google rich-result benefit**
FAQPage JSON-LD is implemented across 15 route templates (`app/page.jsx`, `app/about/page.jsx`, `app/blog/[articleSlug]/page.jsx`, category/product/solution/location pages, etc.). Since Google restricted FAQ rich results to government and healthcare sites in August 2023, this schema provides **no SERP benefit** for SAPL. Its value is real but narrower than it appears: AI/LLM systems can still use FAQPage markup as a citability signal for direct question-answering, which is worth keeping — but it should not be counted as an SEO win, only a GEO one.

**7. ~~IndexNow route exists but its correctness is unverified this pass~~ — SHIPPED 2026-08-25**
`frontend/app/api/indexnow/route.js` now includes all 118 grade pages in its submission set, verified against the live `PRODUCT_CATALOG`/`gradeAliasData` exports before committing. Still not reflected in the Technical GEO score above, since a full re-score wasn't run after this fix — worth a re-audit pass once these pages have had time to be crawled.

**8. `llms.txt` and site copy disagree on years in business by rounding**
`ai-roadmap.json` states `"years_in_business": 46`; the visible site says "45+" in 86 places. Both are internally consistent with a 1980 founding date and today's date, so this is minor — but it's exactly the kind of small numeric drift that compounds with issue #2 above when an AI system is trying to state a single confident fact about company age.

---

## Low Priority Issues

**9. `hreflang`/Arabic content parity not audited this pass** — `app/ar/*` exists with real translated content, but full parity against the English site (which pages exist in both, which don't) wasn't checked in this audit.
**10. Image alt-text coverage not systematically audited this pass** — spot checks (grade page hero images, product images) showed descriptive alt text; a full sweep wasn't performed.
**11. Core Web Vitals field data not measured this pass** — flagged as not-measured rather than scored, per this audit's own quality gate against inventing numbers.

---

## Category Deep Dives

### AI Citability (78/100)

**Strength:** The grade-page system (118 canonical pages) is the standout citability asset on the site. Each page's `generateMetadata` produces a description packing grade code, alumina%, CCS, service temperature and known aliases into one dense, extractable sentence — close to an ideal passage for a RAG system answering "what is the alumina content of HA-70?" The `Product` schema mirrors this in `description` and `additionalProperty`.

**Weakness:** That citability strength is undercut by discovery, not quality — a prior GSC pull this session found **zero grade-page URLs** appearing in 90 days of impressions data, while a single blog post (`refractory-anchors-fastening-systems-types-selection-installation`) alone pulled 2,589 impressions. The best-structured content for AI citation is the least-discovered content on the site; the blog content that IS being discovered uses looser prose without the same spec-extraction density.

**Example of strong citability** (grade page, data-driven, not hardcoded):
> "HA-70 is the 68–72% Al₂O₃ grade in Shanker Agencies' high alumina bricks range, rated for continuous service to 1750°C."

**Example of a citability gap:** the homepage hero leads with an unverifiable superlative ("India's premier refractory engineering partner") rather than a directly quotable, falsifiable fact — AI systems are measurably more likely to cite specific, checkable claims (CIN, founding year, named brand partnerships, named founder) than marketing superlatives, and the homepage under-uses the verifiable facts it already has in schema.

### Brand Authority (42/100)

This is the weakest pillar and the main reason the composite score sits at 71 rather than 80+.

| Signal | Status |
|---|---|
| LinkedIn company page | **Not found** |
| Reddit presence | Not found |
| YouTube presence | Not found |
| Wikipedia presence | Not found (expected for a company this size, not penalized heavily) |
| IndiaMART profile | **Found** — 4.4/5 from 18 reviews, genuine third-party signal |
| Founding-year consistency across directories | **Conflict** — IndiaMART says 1990, site says 1980 |
| `sameAs` array in Organization schema | Present (per earlier schema audit this session) but cannot compensate for the underlying platform absences |

The `Organization` schema's `disambiguatingDescription` is genuinely sophisticated defensive entity work — it explicitly separates SAPL from "Shankar Agencies" (misspelled variant), and GSC data confirms this confusion is real and current (the misspelled query gets ~6× the impressions of the correct spelling). But schema-level disambiguation cannot substitute for third-party corroboration; AI entity-recognition systems weight independent platform presence heavily, and right now SAPL is asserting its own identity almost entirely through channels it controls.

### Content E-E-A-T (68/100)

**Experience:** Strong in narrative (About page's account of Mohan Taneja diagnosing furnace conditions in-plant before recommending materials) but this experience signal doesn't propagate to the content that actually demonstrates it — the 60+ technical articles.

**Expertise:** The content itself is genuinely deep and technically specific (grade comparison tables, SK-equivalence mapping, installation sequencing) — this is not thin or generic content. The gap is attribution, not substance.

**Authoritativeness:** CIN/GST publication, named founder + second-generation director, 7 named and verifiable brand partnerships (CUMI, Crown Ceramics, Divine Cerawool, Calderys, TRL Krosaki, Mahakoshal, Saint-Gobain) are all real authority signals correctly present in schema and copy.

**Trustworthiness:** Undermined by the ISO claim (Critical #1) and the homepage/About inconsistency between "we manufacture the full spectrum" and the more accurate "authorised dealer... supply partner... also manufacture custom shapes" framing (flagged in the prior brand-positioning pass this session). E-E-A-T's trust component specifically penalizes exactly this kind of overstatement.

**Freshness:** `dateModified`/`datePublished` present on blog posts; sitemap uses per-URL realistic `lastModified` rather than a single deploy-time blanket (a deliberate, correct choice per the code's own comments) — this is good practice, above average for the sector.

### Technical GEO (85/100)

The strongest category. `robots.txt` (`frontend/app/robots.txt/route.js`) explicitly allows GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, GoogleOther, Bingbot, Applebot-Extended, CCBot, cohere-ai, DuckAssistBot, Diffbot, Amazonbot, and Meta-ExternalAgent, while deliberately disallowing high-volume/low-value scrapers (AhrefsBot, SemrushBot, MJ12bot, DotBot) — this is unusually deliberate, sector-uncommon GEO hygiene. It also emits the IETF draft `Content-Signal: ai-train=yes, search=yes, ai-retrieval=yes` directive, which almost no comparable site in this vertical implements.

`llms.txt` and `llms-full.txt` are both live, well-structured, and content-rich (company facts, brand partnerships, geographic reach, incoterms) — confirmed HTTP 200 on production. Server-side rendering via Next.js App Router means content is present in initial HTML, not JS-dependent (verified via direct `curl` earlier this session, not just inference).

**Deduction:** Core Web Vitals unmeasured (can't score what wasn't tested); the ISO claim also technically belongs here as a "technical infrastructure carries false data" issue but is scored once, under E-E-A-T/Critical, to avoid double-penalizing.

### Schema & Structured Data (76/100)

`Organization` + `LocalBusiness` + `WebSite` `@graph` on every page is comprehensive: real `identifier` (CIN, GST) as `PropertyValue`, `PostalAddress`, two `ContactPoint`s, 15-country `areaServed`, `numberOfEmployees` as a defensible `QuantitativeValue` range rather than an invented exact figure, named `founder`, and brand relationships. Grade pages carry `Product` + `BreadcrumbList` with disciplined conditional logic — brands are only asserted when the catalog actually records them (`...(catalogEntry.brands?.length ? {brand:...} : {})`), a direct, code-level enforcement against inventing manufacturer relationships. `TechArticle` on blog content is the correct, more specific type rather than generic `Article`.

**Deductions:** the `hasCredential` false-ISO node (already counted under Critical, but it is a schema defect specifically); FAQPage implemented broadly but its Google rich-result value is gone since Aug 2023 (its remaining GEO value is real but should be understood, not oversold); no `Review`/`AggregateRating` schema despite the IndiaMART reviews existing off-site — that third-party validation isn't reflected anywhere in the site's own structured data.

### Platform Optimization (72/100)

**Google AI Overviews:** Strong candidate pages exist (grade pages, TechArticle blog content) but discovery lag (per GSC data) means most haven't accumulated the signal AI Overviews typically draws from yet.
**ChatGPT web search / OAI-SearchBot:** Explicitly allowed in robots.txt; `llms.txt` gives it a structured entry point.
**Perplexity:** Explicitly allowed (`PerplexityBot`, `Perplexity-User`); Perplexity is known to weight recency and directory/citation-style content highly — the location pages (`refractory-supplier-in/*`) and comparison-style blog content are reasonably well suited to this.
**Gemini:** `Google-Extended` explicitly allowed; Organization schema depth should help Gemini's Knowledge Graph-adjacent grounding.
**Bing Copilot:** `Bingbot` allowed; sitemap submitted per `robots.txt`'s `Sitemap:` directive.

No platform is technically blocked. The gap here is not access, it's that content freshness/authority signals (Brand Authority pillar) are what most platforms weight alongside access, and that pillar is the site's weakest.

---

## Quick Wins (Implement This Week)

1. **Create and verify a LinkedIn Company Page** for Shanker Agencies Private Limited, linked from the site's `sameAs` schema array. Single highest-leverage fix for the weakest pillar.
2. **Add named author attribution with a short credentials line** to at least the top 5-10 highest-traffic `TechArticle` pages (start with the anchors guide — 2,589 impressions per the earlier GSC pull). Doesn't require a new author-bio system, just a one-line credential under the existing byline.
3. **Contact IndiaMART to correct the 1990 founding-year listing** to match the verifiable 1980 CIN-registered date — resolves the one active external fact conflict found.
4. **Add `Review`/`AggregateRating` schema** reflecting the real, existing IndiaMART rating (4.4/5, 18 reviews) rather than leaving genuine third-party validation absent from structured data.
5. **Reconcile the 45/46-year figure** between `ai-roadmap.json` and site copy — a one-line edit.

## 30-Day Action Plan

### Week 1: Off-site entity foundation
- [ ] Create/claim LinkedIn Company Page; link in `sameAs`
- [ ] Reconcile founding-year discrepancy with IndiaMART
- [ ] Fix `ai-roadmap.json` years-in-business rounding

### Week 2: Authorship & E-E-A-T
- [ ] Add named-author credential lines to top 10 `TechArticle` pages by impressions
- [ ] Scope (don't yet build) a lightweight author-bio pattern reusable across the blog template

### Week 3: Structured data completeness
- [ ] Add `AggregateRating`/`Review` schema sourced from the real IndiaMART rating
- [ ] Re-verify `app/api/indexnow/route.js` correctness and confirm it fires on grade-page publish

### Week 4: Verification
- [ ] Re-run `inspect_url_enhanced` (GSC) on a sample of grade pages to check for early impression movement
- [ ] Confirm no new false-claim regressions were introduced by any of the above (ISO remediation remains explicitly out of scope for this plan, per prior direction)

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| `/` | Refractory Supplier & Exporter India, CUMI Dealer \| Shanker Agencies | 1 (ISO claim in schema) |
| `/about` | About Us \| 45 Years of Refractory Excellence \| Shanker Agencies | 2 (ISO claim; manufacturer/dealer framing inconsistency) |
| `/blog/refractory-anchors-fastening-systems-types-selection-installation` | (TechArticle) | 1 (no named author) |
| `/products/[categorySlug]/[productId]/[grade]` (118 pages, sampled HA-70) | `{grade} {product} | Specifications` | 1 (high citability, low current discovery) |
| `/products/[categorySlug]` (5 category pages) | — | 1 (FAQPage present, no Google rich-result value) |
| `/refractory-supplier-in/[locationSlug]` (52 pages) | — | 0 critical; not deeply re-audited this pass |
| `robots.txt` | — | 0 (best-in-class AI crawler config) |
| `sitemap.xml` | — | 0 (per-URL realistic lastmod, correct grade-page inclusion) |
| `llms.txt` / `llms-full.txt` | — | 1 shared (ISO claim present in both) |
| `ai-roadmap.json` | — | 2 (ISO claim; years-in-business rounding) |

**Fetch failures:** none. **Pages skipped:** full 52-location and 118-grade sets were not individually re-fetched this pass (sampled); Arabic (`/ar/*`) route parity not audited this pass.
