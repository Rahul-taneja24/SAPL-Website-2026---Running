# SAPL Website Review & Organic Growth Strategy

**Date:** 3 July 2026
**Scope:** Full site review (text, images, blogs), SEO/GEO/AEO compliance, analytics assessment, marketing strategy
**Mission:** Organic B2B market traction for shankeragencies.com

---

## Part 1 — Analytics & Data Channels: Status

| Channel | Status | Action Needed |
|---|---|---|
| Google Search Console | **Connection expired** — the AdvancedGSC MCP connector returned "No GSC connection found" | Re-authenticate at https://advancedgsc.com/mcp/app (property `sc-domain:shankeragencies.com` was previously pinned) |
| Google Analytics 4 | Installed on site (G-TJJH0RD6ZC, verified firing) but **not accessible via any connected tool** (requires PRO plan on the connector) | Review directly at analytics.google.com, or upgrade connector |
| Microsoft Clarity | Installed (wbg3h1cw3f) and loading | Review session recordings at clarity.microsoft.com |
| Bing Webmaster | IndexNow key verified on site; **no Webmaster Tools connector available** | Review at bing.com/webmasters; keep pinging /api/indexnow after deploys |
| Ahrefs/keyword tools | Connected but **plan-blocked** ("Insufficient plan") | Optional |

**Bottom line:** this audit could not pull fresh query/click data. The strategy below uses the last known GSC signals (GCC + Lagos/Durgapur/Bellary/Hyderabad/Colombo clicking; 4 high-impression blog posts identified earlier) plus on-site evidence. **First action for you: re-connect GSC** so the next review runs on live data.

---

## Part 1b — LIVE Google Search Console Data (retrieved 3 July 2026, last 28-30 days)

Connector re-activated on the `https://www.shankeragencies.com/` property. Headline numbers:

| Metric | Last 30 days |
|---|---|
| Clicks | 173 |
| Impressions | 8,309 |
| Avg CTR | 2.08% |
| Avg Position | 12.1 |
| Trend | Rising — best days (11-13 clicks) all in the final week of June |
| June 2026 spam update (Jun 24-26) | No negative impact; clicks rose after it |

### What's actually working: the location-page template
Location pages are the site's best-performing asset — ~50 clicks/28 days across the cluster with CTRs far above site average: Bangkok 9 clicks (5.6% CTR), Manama 6, Dubai 5, Riyadh 5, Muscat 4, **Hyderabad 4 (13.3% CTR)**, Bellary, Lagos, Singapore, Colombo, Doha, Durgapur, Jeddah, Ludhiana, Raipur all clicking. This validates doubling down on the geo cluster (the Nigeria/West-Africa post shipped this week is exactly this play).

### Striking-distance opportunities (high impressions, page 1-2 boundary)
| Page / Query | Impressions | Position | Action |
|---|---|---|---|
| `/brands` | 545 | 22.5 | Biggest untapped pool after homepage. Rewrite title/intro for "refractory brands India" intent, add internal links from blog posts |
| Steel ladle lining post | 438 | 11.3 | Expanded to 1,500+ words this week — monitor; add internal links from location pages |
| Ceramic fiber vs IFB post | 388 | 8.4 | Page 1 but 1.03% CTR — title/description not compelling enough |
| Maintenance scheduling post | 210 | 19.3 | Page 2 — needs internal links + content refresh |
| "castable & guniting" | 37 | 11.8 | One nudge from page 1; gunning cluster already strong |
| "acid proofing" (clicked, pos 13) + ~50 impressions across acid-proof variants | ~90 | 8-60 | Acid cluster is quietly in demand — strengthen /products/acid-proofing page, interlink the 2 acid blog posts |
| "bottom pouring set" family | ~30 | 58-63 | New page (Jun 29) still settling — add internal links from ladle/flow-control posts |
| "boiler refractory maintenance" | 29 | 64.5 | **Content gap: no boiler-specific post exists.** Write one — 29 impressions on a single query with zero targeting |
| "calcium silicate" cluster | ~13 | 50-69 | Product page too thin to rank — enrich with specs table |

### Geography
India 76 clicks (3.05% CTR) dominates; GCC healthy (Saudi 7, Bahrain 4, UAE 3 + 182 impressions); surprising interest from China (10 clicks, 12.7% CTR) and Hong Kong. **USA anomaly: 2,781 impressions but 0.25% CTR** — mostly name-collision noise ("shanker joshi", scraper-style queries) plus research queries; not a real market signal, ignore.

### Data limits
Free connector tier: 30-day window, 100 rows, no GA4. For 16-month history and query-page pairs, either upgrade the connector or export from GSC directly.

---

## Part 2 — Image Audit (the big finding) ✅ FIXED

Every one of the site's 52 unique stock images was downloaded and visually inspected, plus all partner-hosted and self-hosted images. This was the single worst quality problem on the site.

### What was found

**Dead images (HTTP 404) being served:**
- 3 images on the **acid-proofing product pages** (hero + 2 product shots) — a revenue category showing broken images
- All **15 product images in productsData.js** (`/uploads/careerimg/*` — the old website's upload folder, which no longer exists). These fed the Product JSON-LD schema on every product page → broken image URLs in structured data
- 2 homepage image slots + 1 admin image

**CSP-blocked images (broken for every visitor):**
- 2 Pexels images (Tundish and FBC Boilers industry cards) — `images.pexels.com` is not in the site's Content-Security-Policy

**Absurdly irrelevant stock photos (verified visually):**
| Image actually showed | Where it was used |
|---|---|
| Construction site with rebar workers | 6 blog covers + Brands, Contact, Solutions pages, "Burning Zone" card |
| Cardboard-box warehouse | 3 blog covers + castable/LCC/ramming/gunning product slots |
| **Alpine meadow with wildflowers** | High Alumina Bricks specification guide cover |
| **Antelopes in a savanna** | "Fired Heaters" card + Insulation product family |
| **Strawberry pickers in a field** | "Glass Melting Tank" + "Reformers" cards |
| Bookshelf with a novel | Glass furnace refractories blog cover |
| Computer circuit board | Castable installation guide cover |
| Apartment building | Castable Delhi buyers guide cover |
| Woodworking lathe | Slide gate posts, acid proofing, aluminum smelter card |
| Derelict abandoned factory | Cement industry hero |
| Electricity pylons | Cement kiln blog covers |
| Light bulb | Ramming mass product + inline blog figure captioned "molten metal in an induction furnace" |

**Tiny unusable images:** 3 Mahakoshal PNGs used as product heroes/covers were 64×64px icons.

**Missing:** 10 blog posts had no cover image at all; 2 used the generic brand OG banner.

### What was fixed (all committed in this session's work)

- **All 43 blog posts** now have topic-matched, visually verified covers (molten ladle pours for slide gate/MgO-C posts, rotary kiln photo for cement kiln guide, glass furnace for AZS post, container port for import/export posts, real CUMI product photos for product guides, etc.), with max 2 uses per image and no duplicates within a topic cluster
- **All dead URLs replaced** (acid-proofing pages, product schema images, homepage slots)
- **CSP-blocked Pexels images replaced** with whitelisted equivalents
- **All absurd images replaced** across Solutions, Industries, product families, homepage, Brands/Contact backgrounds
- **64px icons replaced** with real 540×332 product photography
- Admin-panel images (internal only) were left as-is

### Remaining image recommendation (high value, needs you)

Stock photos are now *relevant*, but the real upgrade is **self-hosted original photography**: your warehouse, stacked branded inventory, containers being loaded, team at plant sites. 10–15 real photos would (a) eliminate hotlink fragility — partner sites can kill URLs exactly like your old careerimg folder did, (b) give Google Image search unique content, (c) massively boost E-E-A-T ("real business" signals). This is the #1 thing only you can do.

---

## Part 3 — Text, Blog & Compliance Review

### Healthy (verified this session)
- 43 blog posts, all with valid metadata, FAQ schema on 43/43 where FAQs exist, TechArticle + Breadcrumb schema sitewide
- robots.txt: all major AI crawlers allowed, Content-Signal directive present
- llms.txt: 12 citation-ready technical answer blocks + full company/product data (updated with new post)
- Sitemap auto-generates from data files (new content flows in automatically)
- Canonicals, HSTS, CSP, security headers all correct
- OG image: your branded 1200×630 design serving on all 189 pages
- External citations (WorldSteel, IEA, Ministry of Steel, ECRA/CII) + IS/ASTM references on key posts
- First-hand experience language on the 4 newest technical posts

### Gaps that remain (prioritised)
1. **GSC re-connection** (blocks all data-driven iteration)
2. **Wikipedia article** — biggest brand-authority lever for AI citation; Wikidata Q140220528 already exists as the anchor
3. **Author bio page** — built, sitting uncommitted awaiting your review (`frontend/app/about/rahul-taneja/`)
4. **Self-hosted photography** (above)
5. **Internal linking** — older posts rarely link to the new GCC/export posts
6. **Location page depth** — Dubai/Lagos/Colombo pages are still template-thin vs. the new Nigeria blog post's depth
7. **No video presence** — YouTube is increasingly cited by AI engines

---

## Part 4 — Organic Growth Marketing Strategy (B2B)

### Positioning insight
SAPL's realistic organic wins are NOT head-terms like "refractory supplier" (dominated by manufacturers). They are:
1. **Buyer-journey long-tail:** "how to import refractories from India to X", "LCC vs ULCC for ladle", "gunning vs casting" — engineers research these before procurement shortlists exist
2. **Geo-specific supply queries:** "refractory supplier Nigeria/Dubai/Durgapur" — low volume, extreme intent, weak competition
3. **AI-engine answers (GEO/AEO):** when a plant engineer asks ChatGPT/Perplexity "who supplies MgO-C bricks from India to the GCC", SAPL's llms.txt + FAQ schema + citable answer blocks are built to win that

### The 90-day plan

**Month 1 — Data + Authority foundations**
- Re-connect GSC; export 90-day query data; identify pages ranking 8–20 (striking distance) and add internal links + content depth to push them to page 1
- Draft + submit the **Wikipedia article** (sources: Wikidata, IndiaMART, CIN registry, 45-year history)
- Publish the author bio page once you approve it; add visible bylines site-wide
- Shoot and upload 10–15 **real photos** (warehouse, products, loading) — replace top-10 page images

**Month 2 — Content cluster completion (1 post/week)**
Written to match markets already clicking:
1. "Refractory Supplier for Sri Lanka & Colombo: Import Guide" (Colombo clicks, no content)
2. "Refractory Procurement for Durgapur–Asansol Steel Belt" (Durgapur clicks)
3. "Induction Furnace Refractories for Bellary–Hospet Sponge Iron Cluster" (Bellary clicks)
4. "Refractory Cost per Tonne of Steel: 2026 Benchmarks India" (linkable-asset play — this is the kind of data page other sites cite, earning backlinks passively)

**Month 3 — Distribution + AEO harvest**
- **LinkedIn cadence (2/month):** repost each blog as a LinkedIn article from the company page; tag CUMI/TRL Krosaki/Calderys to borrow their audiences. B2B refractory buyers live on LinkedIn, not Instagram
- **IndiaMART/TradeIndia enrichment:** paste blog FAQ answers into product listings (these marketplaces rank for your commercial terms — occupy them)
- **YouTube minimum viable channel:** 5 phone-shot videos ("What is LCC?", "How slide gate plates work", warehouse tour). AI engines cite YouTube heavily for technical queries
- **Email capture:** add a "Get the campaign planning checklist (PDF)" lead magnet to the downloads hub — converts anonymous blog traffic into a contactable list

### Measurement (monthly)
- GSC: clicks, impressions, avg position on the 5 target geo clusters
- AI visibility: monthly manual test — ask ChatGPT/Perplexity/Gemini 5 standard buyer questions ("best refractory exporter India to Nigeria" etc.), log whether SAPL is cited
- Clarity: watch recordings of blog→contact journeys; fix drop-off points
- Leads: tag enquiry-form submissions by source page

### What was shipped today (aligned to this strategy)
✅ New blog post: **"Refractory Supplier for Nigeria & West Africa: The Complete Import Guide from India"** — targets the Lagos/West-Africa gap: 4 FAQ schema blocks, HS-code table, Form M/PAAR documentation detail, first-hand experience language, internal links to the Lagos location page and import guide, added to llms.txt. This is post #1 of the geo-cluster series above.

---

*Report generated 3 July 2026. Next review: after GSC re-connection (target: within 1 week).*
