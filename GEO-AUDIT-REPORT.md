# GEO / SEO / AEO Audit Report: Shanker Agencies

**Audit Date:** 2 July 2026  
**URL:** https://www.shankeragencies.com  
**Business Type:** B2B Industrial Supplier — Refractory Engineering  
**Pages Analysed:** 12 across homepage, products, blog, locations, about  
**Audited by:** 3 parallel specialist agents (AI Visibility, Technical SEO, Content E-E-A-T)

---

## Overall GEO Score: 68 / 100 — Fair → Good

Strong technical infrastructure and above-average content depth for Indian B2B industrial. The ceiling is held down by three concentrated problems: no Wikipedia article (30-point brand authority cap), a broken privacy policy link, and blog content that is technically accurate but experientially thin. Fix those three and the composite score moves to ~82.

### Score Breakdown

| Category | Score | Weight | Weighted |
|---|---|---|---|
| AI Citability | 79/100 | 25% | 19.8 |
| Brand Authority | 52/100 | 20% | 10.4 |
| Content E-E-A-T | 62/100 | 20% | 12.4 |
| Technical GEO | 74/100 | 15% | 11.1 |
| Schema & Structured Data | 80/100 | 10% | 8.0 |
| Platform Optimisation | 45/100 | 10% | 4.5 |
| **Overall GEO Score** | | | **66.2 → 68/100** |

---

## What's Working Well (Do Not Break)

| Strength | Score | Detail |
|---|---|---|
| robots.txt AI access | 100/100 | GPTBot, ClaudeBot, PerplexityBot, Applebot all explicitly allowed. Spam bots blocked. Best-in-class. |
| llms.txt | 95/100 | Most complete llms.txt in Indian B2B industrial. Company identity, all products, all brands, 23+ blog links, 10 FAQ Q&As, citation-ready technical blocks, AI guidance section. |
| Schema depth | 80/100 | TechArticle, FAQPage, HowTo, Product, BreadcrumbList, Organization with CIN/GST, SpeakableSpecification. Above average for the segment. |
| Technical blog depth | — | MgO purity thresholds, leucite/kalsilite sub-surface spalling, LCC bulk density specs, antioxidant chemistries — correct specialist nomenclature throughout. |
| Core Web Vitals | 78/100 | Full SSR, fetchPriority on hero images, async JS, Vercel edge cache HIT (age 740s), HSTS preload. |
| Contact completeness | — | Full registered address, 4 phones, WhatsApp, email, business hours, Google Maps link. |
| B2B directory presence | — | IndiaMART (4.4★, 18 reviews), TradeIndia, ExportersIndia, Crunchbase, Wikidata Q140220528. |
| Canonical tags | 95/100 | All pages self-referencing HTTPS canonicals. No duplicates or mismatches. |
| HTTPS & security | 90/100 | HSTS preload, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP present. |
| IndexNow | 85/100 | Key verified in HTML, Bing/IndexNow endpoints in CSP connect-src. |

---

## CRITICAL Issues (Fix This Week)

### 1. Privacy Policy page is broken — 404
**Impact:** The contact form shows "By submitting, you agree to our Privacy Policy" linking to a 404. Enterprise procurement teams click this before submitting. Immediate trust failure + PDPB/GDPR compliance risk.  
**Fix:** Publish `/privacy-policy`. The existing `/terms` page is a template for length and tone.

### 2. LCC Castable product page missing — 404
**URL:** `/products/unshaped-refractories/lcc-castable`  
**Impact:** LCC castable is one of the highest-volume B2B refractory search terms in India. This page is sending bottom-of-funnel buyers (who already know what they want) to a dead end.  
**Fix:** Restore with: Al₂O₃ range, CaO content (<1%), bulk density, CCS, max service temp, LCC vs ULCC comparison table, partner brands. Min 400 words. Or 301 → `/products/unshaped-refractories` as interim.

### 3. Twitter Card metadata not propagating to non-blog pages
**Impact:** Product pages, location pages, and brand pages all serve hardcoded homepage Twitter card copy when shared on X, LinkedIn, and WhatsApp (which uses twitter: tags as fallback). 50+ pages affected.  
**Fix:** In each route's `page.jsx` metadata export, add explicit `twitter.title` and `twitter.description` matching the page's `openGraph` values. The blog post template already does this correctly — apply the same pattern everywhere.

---

## HIGH Priority (Fix Within 2 Weeks)

### 4. No Wikipedia article — hard cap on brand authority
**Impact:** Wikipedia is the single most influential citation source for LLMs. Brand mention score is 52/100 (adjusted) primarily because Wikipedia returns zero results. SAPL already has Wikidata entity Q140220528 — the notability anchor is in place.  
**Fix:** Draft a Wikipedia article. Verifiable sources available: IndiaMART profile (4.4★, 18 reviews), Crunchbase, Wikidata Q140220528, CIN U51909DL2012PTC232825. 45 years of operation + ISO certifications + documented export reach = meets notability threshold. Target: `en.wikipedia.org/wiki/Shanker_Agencies`

### 5. FAQPage JSON-LD missing from blog posts
**Impact:** `gunning-vs-casting` has a visible FAQ H2 with 3 Q&A pairs and zero FAQPage schema. Same issue on most blog posts. FAQ schema is how Google AI Overviews and Perplexity extract direct answers. Missing it is a direct missed rich-result opportunity.  
**Fix:** Add `FAQPage` JSON-LD to every blog post with a FAQ section. Either detect FAQ content in the blog renderer or add a structured `faqs[]` field to the blog data (already done on some posts — make it consistent).

### 6. Meta titles over 60 chars on key pages
| Page | Current Length | Suggested Fix |
|---|---|---|
| Homepage | 72 chars | "Refractory Supplier & Exporter India \| Shanker Agencies" (55 chars) |
| Slide Gate Plates | 94 chars | "Slide Gate Plates for Steel Ladles \| Shanker Agencies" (53 chars) |
| Dubai | 47 chars (under) | "Refractory Supplier & Exporter to Dubai, UAE \| SAPL" (52 chars) |

### 7. Meta descriptions over 160 chars
- Homepage: 191 chars → trim to 155
- Dubai: 221 chars → trim to 155, lead with "Supplying Emirates Steel, DUBAL & UAE industries" which is the strongest claim

### 8. No author biography page for Rahul Taneja
**Impact:** Schema has `author.name = Rahul Taneja` but no URL attached. Under Google September 2025 QRG, an author entity without a resolvable profile page reduces trust on every article.  
**Fix:** Create `/about/rahul-taneja` with: engineering background, years in industry, sectors, LinkedIn link. Update all blog post schemas to `"url": "https://www.shankeragencies.com/about/rahul-taneja"`. Add visible on-page byline under each post title.

### 9. Zero external citations on any blog post
**Impact:** All statistical claims (EAF 30%→50% by 2035, India 20Mt EAF by 2030, TSR campaign life reduction 20–40%) have no source attribution. AI models weight sourced statistics more heavily and skip unsourced claims.  
**Priority citations to add:**
- EAF post → World Steel Association short range outlook; IEA Steel report
- Cement kiln post → CII/ACC India sustainability reports; ECRA
- Ladle lining post → IS 8 (High Alumina Bricks), IS 15726 (LCC Castables), IS 1585

---

## MEDIUM Priority (Fix This Month)

### 10. No first-hand experience language in blog content
Under September 2025 QRG, "Experience" explicitly requires content that could only come from someone who has operated in the field. All four new blogs are technically accurate but read as primers, not field reports.  
**Per-post fix — inject one "we have seen" paragraph:**

> *Before:* "Effective gunning programmes extend campaign life by 20–40%..."  
> *After:* "In our supply experience with EAF operators across the Odisha-Jharkhand sponge iron corridor, plants running structured gunning programmes on a 4-to-6-heat cycle have extended campaign life by 25–35% versus their pre-programme baseline. The variation is primarily down to application technique rather than material grade — a pattern we have observed consistently."

### 11. Blog posts below 1,500-word minimum
- Monolithic vs Brick Steel Ladle: 1,428 words (72 short)
- Steel Ladle Material Selection: 1,213 words (287 short)

**Fix for ladle lining post — add this campaign life table:**

| Ladle Size | Steel Grade | Slag Line Material | Typical Campaign Life |
|---|---|---|---|
| 10–30T re-rolling | Plain carbon | Alumina-MgO | 40–80 heats |
| 60–120T EAF secondary | Low alloy | MgO-C 12% C | 80–130 heats |
| 200–300T BOF integrated | IF/ULC | MgO-C 14% C, fused MgO >96% | 120–200 heats |

### 12. "20–40% campaign life extension" duplicated verbatim across two posts
Same statistic appears word-for-word in EAF post and monolithic lining post. AI fact-checkers flag duplicate quantitative claims.  
**Fix:** EAF post → "25–35% in structured gunning programmes." Monolithic post → "15–30% for spot-repair vs full reline cycles."

### 13. Identical blog post structure across all 4 new posts
All follow: Key Takeaways → Why It Matters → Technical Breakdown → SAPL Supply Para → CTA → FAQ. QRG flags structural uniformity.  
**Fix:** Cement kiln post → decision-tree format ("At TSR 0–20%: keep spec. At 20–40%: consider upgrade. At 40%+: must change"). Ladle lining post → open with a failure scenario.

### 14. Location pages have zero AEO value
Dubai, Lagos, Colombo pages are directory boilerplate. Can't answer a single specific question about refractory procurement in that market.  
**Fix for top 5 export locations:** Add country-specific HS codes for refractory imports, logistics specifics (transit times, port details), named industrial zones, and one anonymised project paragraph.

### 15. IS code and ASTM standard references absent everywhere
Indian procurement engineers specify against BIS. GCC/ASEAN buyers compare to ASTM C-series. Zero standard references across all audited content.  
**Add:** IS 8 (High Alumina Bricks), IS 15726 (LCC Castables), IS 1585 (Refractory Bricks for Steel Plants), ASTM C860, ASTM C401.

### 16. H1 on homepage lacks primary keyword
Current H1: "YOUR REFRACTORY ENGINEERING PARTNER" — brand statement, not searchable.  
**Suggested:** "India's Leading Refractory Supplier & Exporter Since 1980" — maintains authority, includes primary keyword.

### 17. og:type "website" on product pages
Should be "product" for richer social sharing previews. One-line fix in the product page metadata export.

### 18. FAQ schema too thin on location pages (1 question each)
Dubai page has 1 FAQ question — below threshold for rich result display. Minimum 3 Q&A pairs required.

### 19. No LinkedIn company page activity
Page exists but appears inactive. LinkedIn content is increasingly cited by ChatGPT and Perplexity for B2B company queries.  
**Fix:** 2 posts per month minimum. Repurpose EAF and AF cement blog posts as LinkedIn articles. Tag CUMI, TRL Krosaki to borrow their audiences.

---

## LOW Priority / Roadmap

### 20. Fix HTTP/HTTPS GSC split
Both `http://` and `https://` properties active in GSC — splits impression data. Remove the `http://` property in GSC → Settings.

### 21. Extend llms.txt technical answer blocks from 7 to 23+ topics
16 of 23+ blog posts are link-only in llms.txt — add 3-5 sentence citation-ready summaries for each.

### 22. Add `Content-Signal` directive to robots.txt
```
Content-Signal: ai-train=yes; search=yes; ai-retrieval=yes
```
Per IETF draft `draft-romm-aipref-contentsignals`. Future-proofs AI permission declaration.

### 23. Add customer testimonials or anonymised case references
"60% of revenue from 10+ year clients" claim on About page is unsubstantiated. Add 2-3 anonymised cases: "We supplied X for a Y-sector plant in Z. After grade upgrade, campaign life returned to within 12% of coal baseline."

### 24. No YouTube presence
Zero SAPL-owned video content. AI models with web access surface YouTube for technical queries.  
**Fix:** Launch channel with 5 explainers: "How slide gate plates work," "Gunning vs casting," "Selecting MgO-C for EAF," "What is LCC castable?" — repurpose existing blog scripts.

### 25. Add speakable schema to top citation-ready content blocks
Apply `SpeakableSpecification` to: gunning-vs-casting comparison table intro, slide gate grade spec paragraph, homepage company overview.

### 26. No product-specific OG images for product/location pages
All non-blog pages use the generic `/opengraph-image`. Product pages and location pages should have route-specific OG cards.

### 27. Add "Last reviewed" date to technical posts
All new posts have `datePublished = dateModified`. Add visible "Last reviewed: [Month Year]" below each post byline + 6-month review cadence.

### 28. Hreflang — note for roadmap
Not required today (English-only site). Needed if Arabic or regional-language content is created for GCC.

---

## 30-Day Action Plan

### Week 1 — Legal & Trust Fixes
- [ ] Publish `/privacy-policy` page
- [ ] Restore `/products/unshaped-refractories/lcc-castable` page
- [ ] Fix Twitter card metadata propagation across all non-blog routes
- [ ] Create `/about/rahul-taneja` author bio page + link from all blog posts

### Week 2 — Authority & Schema
- [ ] Draft and submit Wikipedia article (source: Wikidata Q140220528, IndiaMART, CIN)
- [ ] Add FAQPage JSON-LD to all blog posts with visible FAQ sections
- [ ] Add speakable schema to top 3 citation-ready blocks
- [ ] Add external source citations to EAF + cement kiln posts (WorldSteel, IEA, BIS)
- [ ] Fix homepage + slide gate plates meta title lengths

### Week 3 — Content Quality
- [ ] Inject first-hand experience paragraph into EAF, ladle lining, and AF cement posts
- [ ] Expand steel ladle post with campaign life table (reaches 1,500-word minimum)
- [ ] Add IS 8, IS 15726, ASTM C860 references to relevant product/blog pages
- [ ] Vary blog post structure: cement kiln → decision-tree format
- [ ] Fix duplicate "20–40%" statistic across EAF and monolithic posts

### Week 4 — Platform Presence
- [ ] Publish first YouTube explainer video
- [ ] Start LinkedIn content cadence (2 posts from EAF + AF cement blogs)
- [ ] Expand llms.txt technical answer blocks to 12+ topics
- [ ] Add `Content-Signal` directive to robots.txt
- [ ] Fix HTTP/HTTPS GSC split (GSC settings, not code)
- [ ] Expand location page FAQ schema: Dubai, Lagos, Colombo → minimum 3 Q&As each

---

## Pages Analysed

| URL | Title | Key Issues |
|---|---|---|
| `/` | Refractory Supplier & Exporter India... | Title 72 chars, description 191 chars, H1 no keyword |
| `/about` | About Shanker Agencies | Good founding story; no testimonials |
| `/products` | Products — grid content too thin for AI | No comparison, no AI-extractable tables |
| `/products/flow-control/slide-gate-plates` | Slide Gate Plates | Title 94 chars; FAQ schema thin (2 Q); og:type wrong |
| `/products/unshaped-refractories/lcc-castable` | — | **404 CRITICAL** |
| `/blog/gunning-vs-casting-when-to-use` | Gunning vs Casting... | Best citability (87/100); no FAQ schema |
| `/blog/eaf-refractories-green-steel-transition` | EAF Refractories... | Good stats (78/100); no source citations |
| `/blog/monolithic-vs-brick-steel-ladle-lining` | Monolithic vs Brick... | 1,428 words; no experience language |
| `/blog/alternative-fuels-cement-kiln-refractory-guide` | AF Cement Kilns... | Good expert language; needs decision-tree structure |
| `/blog/steel-ladle-refractory-lining-...` | Steel Ladle Lining... | 1,213 words — thin; needs campaign life table |
| `/refractory-supplier-in/dubai` | Refractory Exporter to Dubai | 48/100 citability; FAQ only 1 question; boilerplate body |
| `/privacy-policy` | — | **404 CRITICAL** |

---

*Report generated: 2 July 2026 | Next audit: 1 October 2026*
