# GEO Audit Report — Shanker Agencies Pvt. Ltd.
**Domain:** https://www.shankeragencies.com  
**Audit Date:** April 2026  
**Business Type:** B2B Industrial Supplier — Refractory Engineering (Local + Export)  
**Framework:** Next.js (Vercel SSR/RSC)

---

## Composite GEO Score: 54 / 100 — Fair

> The site has a strong technical foundation and is meaningfully ahead of most Indian B2B industrial suppliers in GEO readiness. The primary drag is brand authority depth — no Wikipedia/Wikidata entity, no third-party press mentions, and anonymous blog authorship. Closing these gaps would push the score into the 70+ range.

### Score Breakdown

| Category | Weight | Score | Weighted | Rating |
|----------|--------|-------|----------|--------|
| AI Citability & Visibility | 25% | 54/100 | 13.5 | Fair |
| Brand Authority Signals | 20% | 38/100 | 7.6 | Weak |
| Content Quality & E-E-A-T | 20% | 58/100 | 11.6 | Fair |
| Technical Foundations | 15% | 62/100 | 9.3 | Fair |
| Structured Data | 10% | 62/100 | 6.2 | Fair |
| Platform Optimization | 10% | 58/100 | 5.8 | Fair |
| **COMPOSITE** | **100%** | **54/100** | **54.0** | **Fair** |

---

## Executive Summary

Shanker Agencies Pvt. Ltd. (SAPL) is one of the more GEO-aware B2B industrial companies in India. It has already deployed `llms.txt`, an `ai-roadmap.json` entity file, explicit AI crawler whitelisting in robots.txt, and a multi-type JSON-LD schema stack. The Next.js / Vercel architecture delivers true server-side rendering — all content is visible to AI crawlers without JavaScript execution.

The two blog guides analyzed (ramming mass selection, castable installation) scored 80–82/100 for AI citability — genuinely citation-worthy technical content with specific chemistry data, lining life figures, and proprietary cost-per-heat analysis. This is the site's single strongest GEO asset.

The critical gaps cluster in three areas:

1. **Brand authority in AI training corpora** — No Wikipedia article, no Wikidata entity, no industry press mentions, no Crunchbase profile. These are the platforms AI models preferentially cite for company entity resolution.
2. **Structural schema errors** — The WebPage schema URL is hardcoded to the homepage on all 156 pages. No `@id` on any entity schema. These prevent cross-page entity graph construction.
3. **72 thin location pages** — The 48 Indian + 24 international city pages are heavily templated with minimal differentiation. These represent significant soft-404 and thin-content risk at scale.

---

## Section 1: AI Citability & Visibility — 54/100

### AI Crawler Access — 95/100 ✅ Excellent
The robots.txt explicitly whitelists 12+ AI crawlers by name:
- GPTBot, OAI-SearchBot, ChatGPT-User ✅
- ClaudeBot, anthropic-ai, Claude-Web ✅
- PerplexityBot ✅
- Google-Extended, Bytespider ✅
- Cohere-ai, DuckAssistBot, Meta-ExternalAgent ✅
- Blocked only: `/admin`, `/api`, `/_next/` (appropriate)

This is exemplary crawler policy — most B2B industrial sites block AI bots by default.

### llms.txt — 5/10 ⚠️ Present but Non-Compliant
The file exists at `/llms.txt` and returns 200. However it is structurally non-compliant:

| Check | Status |
|-------|--------|
| File present at /llms.txt | ✅ |
| Link directory format (## sections + markdown links) | ❌ |
| Links to key pages (/products, /about, /blog) | ❌ |
| Blog article links (23+ articles) | ❌ |
| /llms-full.txt companion file | ❌ |
| FAQ content included | ❌ |
| Content-Type: text/plain | Uncertain |

The `ai-roadmap.json` references `/llm.txt` (missing the "s") — a broken URL. It also reports `blog_posts.count: 0` and `products.count: 0`, both incorrect.

### Page Citability Scores

| Page | Score | Status |
|------|-------|--------|
| Blog: Ramming Mass Guide | 82/100 | ✅ Citation-ready |
| Blog: Castable Installation | 80/100 | ✅ Citation-ready |
| About | 71/100 | ✅ Citation-ready |
| Industries | 66/100 | Moderate |
| Products (category) | 65/100 | Moderate |
| Homepage | 62/100 | Moderate |

**Best citation-ready passage (Ramming Mass Guide):**
> "Silica ramming mass uses SiO₂ >96% as primary aggregate bonded with boric acid at 1.0–2.5% addition. It operates to 1,700°C and delivers 150–350 heats of lining life... Premium-grade silica ramming mass costs 33% more per kg but delivers 31% lower cost per heat."

**Weakest area:** Product pages have no per-product spec tables (Al₂O₃%, bulk density, CCS, MOR). An AI cannot answer "what are the specs for CUMI CA66 castable?" from the current product pages.

---

## Section 2: Brand Authority Signals — 38/100

### Platform Presence Inventory

| Platform | Status | AI Weight | Notes |
|----------|--------|-----------|-------|
| Wikipedia | ❌ Absent | Critical | #1 AI citation source for company entities |
| Wikidata | ❌ Absent | Critical | Self-creatable; feeds AI knowledge graphs |
| Crunchbase | ❌ Blocked/Absent | High | Primary B2B company data source for AI |
| Industry Press | ❌ Absent | High | No mentions in Steel Times, Refractories Worldforum, etc. |
| LinkedIn (Company) | ✅ Present | Medium | Listed in sameAs |
| IndiaMART | ✅ Present | Medium | 4.4★, 18 reviews, 11-year member, GST verified |
| YouTube | Unconfirmed | Medium | Channel exists per social links |
| Google Business Profile | ✅ Likely | Medium | Feeds Google AIO Local Pack |
| TradeIndia / ExportersIndia | ✅ Present | Low | B2B directory presence |
| JustDial | ✅ Likely | Low | Blocks automated fetch |
| Reddit | ❌ Absent | Medium | No SAPL discussion threads found |

**The Wikipedia gap is the single largest drag on the entire GEO score.** Wikipedia is the primary source AI models (ChatGPT, Claude, Perplexity) use for company entity resolution. Without it, SAPL cannot appear as a recognized named entity in AI-generated answers about "refractory dealers in India" or "authorized CUMI distributors."

---

## Section 3: Content Quality & E-E-A-T — 58/100

### E-E-A-T Scores

| Dimension | Score | Evidence |
|-----------|-------|---------|
| Experience | 2.6/5 | 45yr org claim, cost-per-heat table, milestone timeline — but zero named client case studies |
| Expertise | 3.4/5 | Named director (Rahul Taneja) with credentials, correct IS standards, accurate chemistry ranges |
| Authoritativeness | 2.6/5 | ISO 9001/14001/45001, CUMI/TRL/IFGL partnerships — but no media mentions, awards, or industry body memberships |
| Trustworthiness | 2.8/5 | HTTPS, full address, 3 phone numbers, privacy/terms — but anonymous testimonials, zero external citations |

### Content Strengths
- Blog guides are technically accurate at the right depth for engineer/procurement audiences
- Named author (Rahul Taneja) consistently applied to all articles
- Triple ISO certification with specific standard numbers
- Readability appropriate for technical audience (Flesch ~45–55)

### Content Gaps
- **Zero external citations** in any article (no BIS standards links, no manufacturer datasheet references)
- **No named client case studies** — 45 years of experience produces no verifiable project outcomes
- **No author headshot or personal author profile page** for Rahul Taneja
- **No original images** — every article uses a single Unsplash stock photo
- **Content appears AI-assisted** — identical structural template across all 23+ articles, zero outbound citations, uniform prose register

### Missing High-Value Content (AI Citation Targets)
1. Refractory lining thickness calculation guide
2. BIS vs. ASTM vs. DIN: Refractory standards comparison
3. Induction furnace lining failure analysis
4. Total cost of ownership: refractory campaign life modeling
5. Refractory glossary (100+ terms) — no competitor owns this in English for India
6. CUMI Super Refractories product guide (authorized dealer is uniquely positioned)
7. Petrochemical furnace refractories (served industry with zero content)
8. Power generation refractories (served industry with zero content)

---

## Section 4: Technical Foundations — 62/100

### Strengths
- Next.js SSR via Vercel — all content in raw HTML, zero JS rendering risk for AI crawlers
- Sitemap: 156 URLs confirmed, properly structured
- robots.txt: Well-configured (see Section 1)
- HTTPS everywhere, canonical tags present
- Product category pages have correct canonical URLs

### Issues

| Issue | Severity | Description |
|-------|----------|-------------|
| WebPage schema URL hardcoded | Critical | All 156 pages show `url: "https://www.shankeragencies.com"` — every page claims to be the homepage |
| 72 thin location pages | High | 48 Indian + 24 international city pages are heavily templated. Mumbai page analysis confirms minimal unique content — same industry cards, same product grids, FAQ questions use `[location]` variable substitution |
| Logo path inconsistency | Medium | Global schema uses `/images/sapl-logo.png`; location page schema uses `/logo.png` |
| SearchAction targets blog only | Low | WebSite SearchAction urlTemplate points to `/blog?q=` not site-wide search |
| ai-roadmap.json broken URL | Medium | References `/llm.txt` instead of `/llms.txt` |
| ai-roadmap.json stale counts | Medium | `blog_posts.count: 0`, `products.count: 0` — both incorrect |

### Location Pages Risk Assessment
72 city pages (48 India, 24 international) with templated content represent the site's biggest crawl budget risk. Google's guidance is clear: location pages with minimal unique content are thin pages. Recommendations:
- Reduce to 10–15 highest-value cities (Delhi, Mumbai, Jamshedpur, Bhilai, Rourkela, Visakhapatnam, Dubai, Singapore)
- Add genuine city-specific content: named client references (if permitted), local industry context, city-specific delivery logistics, local contact details

---

## Section 5: Structured Data — 62/100

### Schema Inventory

| Schema Type | Pages | Status |
|-------------|-------|--------|
| Organization + LocalBusiness (dual) | All pages | ✅ Present, missing `@id` |
| WebSite + SearchAction | All pages | ✅ Present |
| WebPage + speakable | All pages | ⚠️ URL hardcoded to homepage |
| FAQPage | Homepage + location pages | ✅ Present (restricted for rich results since Aug 2023 but retains AI semantic value) |
| TechArticle | Blog posts | ✅ Present, dateModified = datePublished |
| BreadcrumbList | Blog + location pages only | ⚠️ Missing from /products, /about, /brands |
| Person (Rahul Taneja) | /about only | ⚠️ sameAs points to company LinkedIn, not personal |
| Product / ItemList | Product pages | ❌ Completely absent |
| HowTo | 1 blog post | ❌ Deprecated since Sep 2023 — remove |
| AggregateRating | Nowhere | ❌ Missing |

### Critical Schema Errors

**1. WebPage schema URL hardcoded to homepage (affects all 156 pages)**
Every page carries identical WebPage schema:
```json
{ "url": "https://www.shankeragencies.com", "name": "Shanker Agencies | Refractory Engineering Partner" }
```
This must be rendered dynamically per page from the Next.js layout.

**2. No `@id` on any entity schema**
Without `@id`, AI systems cannot resolve the same entity across 156 URLs. Every page becomes an isolated signal rather than reinforcing one entity graph.

**3. Self-reference in sameAs**
`https://www.shankeragencies.com` is listed as the first `sameAs` entry — an entity cannot be sameAs itself.

**4. Person.sameAs points to wrong LinkedIn**
Rahul Taneja's Person schema links to the company page (`linkedin.com/company/shankeragencies`), not his personal profile.

### sameAs Completeness

| Platform | Linked | Priority |
|----------|--------|----------|
| Wikipedia | ❌ | Critical |
| Wikidata | ❌ | High — self-creatable immediately |
| LinkedIn Company | ✅ | — |
| YouTube | ✅ | — |
| Crunchbase | ✅ (unconfirmed profile) | High — claim/create |
| IndiaMART | ✅ | — |
| TradeIndia | ✅ | — |

---

## Section 6: Platform Optimization — 58/100

### Google AI Overviews (AIO)
**Score: 60/100**
- FAQPage schema present (eligible for semantic AIO even if not rich result)
- SSR ensures Googlebot sees full content
- Industry client count table (200+ steel, 100+ cement) is AIO-eligible structured data
- **Gap:** No structured spec tables on product pages — AIO cannot pull product specs
- **Gap:** 72 thin location pages dilute topical authority for geo-targeted queries

### ChatGPT Web Search
**Score: 55/100**
- Blog content is citation-worthy for technical engineering queries
- ai-roadmap.json demonstrates entity data maturity
- **Gap:** No Wikipedia/Wikidata entity — ChatGPT resolves companies via knowledge graph entities
- **Gap:** No Crunchbase profile (confirmed absent or inaccessible)
- **Gap:** No industry press citations that ChatGPT would discover and attribute

### Perplexity AI
**Score: 62/100**
- Technical blog guides (ramming mass, castable) are Perplexity's preferred citation type: specific, structured, data-dense
- IndiaMART profile with ratings is discoverable by Perplexity
- **Gap:** No comparison pages or buying guides (high-value Perplexity query types)
- **Gap:** No downloadable specification guides (Perplexity indexes PDF content)

### Bing Copilot
**Score: 55/100**
- Open Graph tags present
- SSR ensures Bingbot sees full content
- **Gap:** No Bing Webmaster Tools verification signals detectable
- **Gap:** Author schema links to company LinkedIn (Bing weights individual author authority)

---

## Prioritized Action Plan

### Quick Wins (This Week)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Create Wikidata entity for SAPL** | High | Low (1-2 hrs) |
| 2 | **Fix ai-roadmap.json** — correct `/llm.txt` → `/llms.txt`, update blog/product counts | Medium | Low (30 min) |
| 3 | **Remove self-reference from sameAs** — delete `shankeragencies.com` as first entry | Medium | Low (15 min) |
| 4 | **Remove HowTo schema** from ramming mass article | Low | Low (15 min) |
| 5 | **Fix Rahul Taneja Person.sameAs** — replace company LinkedIn URL with personal LinkedIn | Medium | Low (15 min) |

### Medium-Term (This Month)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 6 | **Rewrite /llms.txt** to compliant link-directory format with all key pages + top 10 blog posts | High | Medium (4-6 hrs) |
| 7 | **Add `@id` to Organization and WebPage schemas** — `"@id": "https://www.shankeragencies.com/#organization"` | High | Medium (2-3 hrs) |
| 8 | **Fix WebPage schema URL** — make dynamic per page in Next.js layout | High | Medium (2-3 hrs) |
| 9 | **Add Product/ItemList schema to all product category pages** | High | Medium (1 day) |
| 10 | **Add BreadcrumbList to /products, /about, /brands** | Medium | Low (2-3 hrs) |
| 11 | **Claim/complete Crunchbase profile** | Medium | Low (2 hrs) |
| 12 | **Add external citations** to all blog articles (BIS standards, CUMI datasheets) | High | Medium (1-2 hrs/article) |
| 13 | **Create /llms-full.txt** with embedded content for About + top product categories + top 5 blog posts | High | Medium (4-6 hrs) |

### Strategic (Next Quarter)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 14 | **Consolidate location pages** — reduce from 72 to 15 high-value cities with genuine local content | High | High (1-2 weeks) |
| 15 | **Create Rahul Taneja author profile page** at `/about/rahul-taneja` with headshot, credentials, LinkedIn | High | Medium (1 day) |
| 16 | **Add per-product technical spec tables** (Al₂O₃%, BD, CCS, MOR, max temp) to all 17 product type pages | Critical | High (1-2 weeks) |
| 17 | **Publish refractory glossary** (100+ terms) — no competitor owns this for India in English | High | High (1 week) |
| 18 | **Earn 2-3 industry press mentions** (Steel 360, Cement Review of India, Refractories Worldforum) as prerequisite for Wikipedia | Critical | Very High (3-6 months) |
| 19 | **Commission 3-5 case studies** with specific before/after performance data | High | High (ongoing) |
| 20 | **Create Wikipedia article** after press citation prerequisite is met | Critical | High |

---

## Score Projection

| Milestone | Estimated GEO Score | Timeline |
|-----------|--------------------|-----------| 
| Current state | 54/100 | — |
| Quick wins complete (items 1-5) | 57/100 | 1 week |
| Medium-term complete (items 6-13) | 66/100 | 1 month |
| Strategic complete (items 14-19) | 74/100 | 3 months |
| With Wikipedia + press coverage (item 20) | 82/100 | 6-12 months |

---

## Appendix: Critical JSON-LD Fixes

### Fix 1: Organization @id + Remove Self-Reference

```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://www.shankeragencies.com/#organization",
  "sameAs": [
    "https://www.linkedin.com/company/shankeragencies",
    "https://www.facebook.com/shankeragencies",
    "https://twitter.com/shankeragencies",
    "https://www.instagram.com/shankeragencies",
    "https://www.youtube.com/@shankeragencies",
    "https://www.crunchbase.com/organization/shanker-agencies",
    "https://www.indiamart.com/shankeragencies/",
    "https://www.tradeindia.com/shanker-agencies-pvt-ltd-2386358/",
    "https://www.exportersindia.com/shanker-agencies-private-limited/",
    "https://www.justdial.com/Delhi/Shanker-Agencies-Pvt-Ltd-Shahdara/011PK010076_BZDET",
    "https://www.wikidata.org/wiki/[ADD AFTER CREATION]"
  ]
}
```

### Fix 2: Dynamic WebPage Schema (Next.js)

In your Next.js layout or per-page metadata, replace the hardcoded block with:

```tsx
// In your schema generation utility
function generateWebPageSchema(url: string, title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    "url": url,
    "name": title,
    "description": description,
    "isPartOf": { "@id": "https://www.shankeragencies.com/#website" },
    "about": { "@id": "https://www.shankeragencies.com/#organization" },
    "inLanguage": "en-IN"
  };
}
```

### Fix 3: Compliant llms.txt Structure

```markdown
# Shanker Agencies Pvt. Ltd.

> India's refractory engineering partner since 1980. Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. Supplying shaped & unshaped refractories, flow control systems, ceramic fiber, and acid-proof materials to steel, cement, aluminum, glass, and petrochemical industries across India, GCC & ASEAN.

## Company

- [About SAPL](https://www.shankeragencies.com/about): Company history, mission, leadership, and ISO certifications
- [Industries Served](https://www.shankeragencies.com/industries): Steel, cement, aluminum, glass, petrochemical, power, foundry, ceramic
- [Brand Partners](https://www.shankeragencies.com/brands): CUMI, Crown Ceramics, Divine Cerawool, TRL Krosaki, IFGL, Calderys, Mahakoshal
- [Company Profile PDF](https://www.shankeragencies.com/company-profile): Downloadable company profile

## Products

- [Shaped Refractories](https://www.shankeragencies.com/products/shaped-refractories): High alumina, fireclay, basic, SiC bricks (1200–1850°C)
- [Unshaped Refractories](https://www.shankeragencies.com/products/unshaped-refractories): LCC castables, ramming mass, gunning materials
- [Flow Control Systems](https://www.shankeragencies.com/products/flow-control): Slide gate plates, ladle shrouds, SEN nozzles
- [Insulation Products](https://www.shankeragencies.com/products/insulation): Ceramic fiber blankets, modules, calcium silicate
- [Acid Proofing](https://www.shankeragencies.com/products/acid-proofing): Acid-proof bricks, tiles, carbon bricks

## Technical Guides

- [Ramming Mass Selection for Induction Furnaces](https://www.shankeragencies.com/blog/how-to-select-ramming-mass-for-induction-furnace): Complete guide with chemistry specs and cost-per-heat analysis
- [Castable Refractory Installation](https://www.shankeragencies.com/blog/refractory-castable-types-installation-guide): LCC vs ULCC comparison with water ratios and curing schedules
- [High Alumina Brick Selection](https://www.shankeragencies.com/blog/high-alumina-refractory-bricks-complete-guide): Grade selection by Al₂O₃% and application
- [Magnesia Carbon Bricks for BOF/EAF](https://www.shankeragencies.com/blog/magnesia-carbon-bricks-bof-eaf-selection-performance): Steel plant selection guide
- [Slide Gate Plate Performance](https://www.shankeragencies.com/blog/slide-gate-plates-selection-performance-guide): Material grades and bore sizing

## Contact

- [Contact & Quote](https://www.shankeragencies.com/contact): +91-9899957888 | info@shankeragencies.com | Delhi 110032, India
- [Downloads](https://www.shankeragencies.com/downloads): Technical datasheets and product catalogues

## Optional

- [Knowledge Hub](https://www.shankeragencies.com/knowledge): Reference materials and technical resources
- [Privacy Policy](https://www.shankeragencies.com/privacy): Privacy policy
```

### Fix 4: Product ItemList Schema for /products/shaped-refractories

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Shaped Refractory Products — Shanker Agencies",
  "url": "https://www.shankeragencies.com/products/shaped-refractories",
  "numberOfItems": 5,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "High Alumina Refractory Bricks",
        "description": "Fired high alumina bricks with 45–90% Al₂O₃ for steel ladles, blast furnaces, cement kilns, and induction furnaces.",
        "brand": { "@type": "Brand", "name": "CUMI Super Refractories" },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Al₂O₃ Content", "value": "45–90%" },
          { "@type": "PropertyValue", "name": "Max Service Temperature", "value": "1850°C" },
          { "@type": "PropertyValue", "name": "Applications", "value": "Steel ladles, blast furnaces, cement kilns, glass furnaces" }
        ],
        "offers": {
          "@type": "Offer",
          "seller": { "@id": "https://www.shankeragencies.com/#organization" },
          "availability": "https://schema.org/InStock",
          "areaServed": "IN"
        },
        "url": "https://www.shankeragencies.com/products/shaped-refractories/high-alumina-bricks"
      }
    }
  ]
}
```

---

*Report generated by GEO Audit Tool | April 2026*  
*Two subagents (platform analysis, technical SEO) hit API rate limits mid-run — scores for those categories estimated from discovery data and page fetches.*
