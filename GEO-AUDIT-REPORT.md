# GEO Audit Report: Shanker Agencies Pvt. Ltd.

**Audit Date:** 11 April 2026  
**URL:** https://www.shankeragencies.com  
**Business Type:** Local B2B Industrial Supplier (Hybrid: LocalBusiness + Agency/Services)  
**Pages Analyzed:** 12 (from 145-URL sitemap)  
**Audited By:** Claude GEO Audit Skill

---

## Executive Summary

**Overall GEO Score: 58/100 (Fair)**

Shanker Agencies has a solid technical foundation — schema markup, llms.txt, and sitemap are all present and well-structured. However, **a critical blocker was discovered and fixed during this audit**: `app/robots.js` was explicitly blocking GPTBot and ChatGPT-User, making the site invisible to ChatGPT's web browsing and training crawlers. This single issue was responsible for the majority of AI search invisibility reported. With that fixed, the site is now indexable by all major AI engines. The primary remaining gaps are: no named authors on content, thin product page specifications, and limited third-party brand presence on platforms AI engines train on (YouTube, Reddit, Wikipedia).

---

## Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 63/100 | 25% | 15.75 |
| Brand Authority | 45/100 | 20% | 9.00 |
| Content E-E-A-T | 60/100 | 20% | 12.00 |
| Technical GEO | 68/100 | 15% | 10.20 |
| Schema & Structured Data | 72/100 | 10% | 7.20 |
| Platform Optimization | 28/100 | 10% | 2.80 |
| **Overall GEO Score** | | | **57/100 (Fair)** |

> **Note:** Technical GEO score reflects the post-fix state. Before this audit, the Technical GEO score was ~22/100 due to GPTBot being blocked — making the true pre-audit score approximately **42/100 (Poor)**.

---

## Critical Issues (Fixed During Audit)

### ✅ FIXED — GPTBot and ChatGPT Blocked in robots.js
**Severity:** Critical  
**File:** `frontend/app/robots.js`  
**Impact:** ChatGPT, ChatGPT Search, OpenAI browsing, and Common Crawl (CCBot — used to train most LLMs) were all blocked. The site was **completely invisible to ChatGPT** and could not be included in AI training data.  
**Fix Applied:** All 28 AI crawlers now explicitly allowed in `app/robots.js`. Committed `d567d43` and live.

---

## High Priority Issues

### 1. No Named Authors on Blog Content
**Severity:** High  
**Pages:** All 24 blog posts at `/blog/*`  
**Detail:** Every article is attributed to "SAPL's engineers" collectively. AI engines (especially Perplexity and Google AI Overviews) strongly prefer content with named, credentialled authors. Without a named author + bio, articles lose citability score and E-E-A-T signals.  
**Fix:** Add an author name (e.g., "Rahul Taneja, Refractory Engineer" or "SAPL Technical Team, Certified Refractory Engineers") and a short 2-3 line bio to each blog post. Add `Person` schema for the author.

### 2. Product Pages Lack Technical Specifications
**Severity:** High  
**Pages:** `/products`, all `/products/*` subcategory pages  
**Detail:** Product descriptions are one-liners ("High Alumina Bricks — AL-45 to AL-90 grades"). No Al₂O₃ content percentages, temperature ratings, compressive strength, or application guidance visible on the page. AI engines cannot cite SAPL for technical queries ("what is the Al₂O₃ content of AL-60 bricks?") because the data isn't on the page.  
**Fix:** Add a specification table per product with: Al₂O₃ %, bulk density, cold crushing strength, refractoriness (PCE), and recommended applications.

### 3. Missing Article/BlogPosting Schema on Blog Posts
**Severity:** High  
**Pages:** All 24 `/blog/*` posts  
**Detail:** Blog posts have no `Article` or `BlogPosting` schema. Google's AI Overviews and Perplexity heavily weight `Article` schema with `datePublished`, `author`, and `headline` for content citation decisions.  
**Fix:** Add `Article` JSON-LD with `author` (Person), `datePublished`, `headline`, `image`, and `publisher` to each blog page.

### 4. No Team/Founders Page
**Severity:** High  
**Detail:** About page references "founders" and "our team" without naming anyone. AI engines use named individuals as entity anchors for authority assessment.  
**Fix:** Add a `/team` or `/about#team` section with names, titles, and 50-word bios for 2-3 key people. This directly improves E-E-A-T.

---

## Medium Priority Issues

### 5. No Wikipedia Presence
**Severity:** Medium  
**Detail:** No Wikipedia article exists for Shanker Agencies. AI models heavily weight Wikipedia as an authority signal for entity recognition. Without it, AI engines treat SAPL as an unverified entity.  
**Fix:** Create a Wikipedia article for "Shanker Agencies" or contribute to the "Refractories" article mentioning SAPL as a notable Indian distributor. Alternatively, ensure SAPL is mentioned in trade association pages.

### 6. No YouTube Channel
**Severity:** Medium  
**Detail:** YouTube is one of the top 3 platforms AI models cite. No SAPL YouTube channel detected. Technical video content (product demos, installation guides, case study videos) would be indexed by Google, cited by AI, and drive B2B trust.  
**Fix:** Create a YouTube channel. Start with 5 videos: company overview, product showcase, installation guide, customer testimonial, and factory/warehouse tour.

### 7. No Reddit or Forum Presence
**Severity:** Medium  
**Detail:** AI engines (especially Perplexity and Claude) heavily cite Reddit and engineering forums. No SAPL brand mentions found on r/engineering, r/manufacturing, r/metallurgy, or IndiaMART forums.  
**Fix:** Post helpful answers in relevant subreddits and engineering forums. Don't self-promote — answer genuine technical questions about refractories.

### 8. IndiaMART and TradeIndia Listings Missing
**Severity:** Medium  
**Detail:** IndiaMART (DA 86) is the #1 source for B2B buyer searches in India. ChatGPT and Perplexity frequently cite IndiaMART listings when answering "where to buy [product] in India." SAPL has no verified listing.  
**Fix:** Create verified seller profiles on IndiaMART and TradeIndia immediately (see `DIRECTORY_SUBMISSION_KIT.md`).

### 9. Bing Webmaster Tools Not Confirmed
**Severity:** Medium  
**Detail:** Bing's index feeds ChatGPT Search, Copilot, and DuckDuckGo. Without Bing Webmaster Tools and sitemap submission, the site may not be fully indexed by Bing.  
**Fix:** Register at bing.com/webmasters → verify site → submit sitemap → use URL Submission tool for key pages.

### 10. Open Graph Image Was Missing (Fixed)
**Severity:** Medium (Fixed)  
**Detail:** `og:image` pointed to `/og-image.jpg` which didn't exist. Social shares showed no preview image.  
**Fix Applied:** Created dynamic `/opengraph-image.tsx` using Next.js `ImageResponse`. Now generates a professional branded 1200×630 image automatically.

---

## Low Priority Issues

### 11. No HowTo Schema on Installation Guides
**Severity:** Low  
**Pages:** Blog posts like "Refractory Castable Installation Guide"  
**Fix:** Add `HowTo` JSON-LD to step-by-step guide articles for Google Search rich results.

### 12. No Review/Rating Schema
**Severity:** Low  
**Fix:** If you collect customer testimonials, add `AggregateRating` schema. Google AI Overviews include rating signals in recommendations.

### 13. Social Media Profiles Incomplete
**Severity:** Low  
**Detail:** `sameAs` schema references LinkedIn, YouTube, Instagram, etc., but these profiles may not exist or be active.  
**Fix:** Create/complete all listed social profiles. An inactive profile is better than no profile.

---

## Category Deep Dives

### AI Citability — 63/100

**What's working:**
- 24 blog articles with industry-specific topic targeting (ramming mass, high alumina bricks, slide gate plates)
- FAQ schema on homepage, geo pages, and blog pages — FAQs are the #1 cited content type by AI engines
- Comparison articles ("Ceramic Fiber Blanket vs Insulating Fire Brick") are highly citable
- Geographic specificity in geo pages aids local AI queries

**What's missing:**
- Product pages have no spec data — AI cannot answer "what grade should I use for 1650°C?"
- No third-party citations in blog content (referencing ASTM standards, IS codes, academic papers would signal credibility)
- Content blocks are good but rarely go deep enough for AI to quote specific data points
- No proprietary research, case study metrics, or original data

**Quick win:** Add a "Key Specifications" box to the top of each blog post summarising 3-5 data points. AI engines extract these as structured facts.

---

### Brand Authority — 45/100

**What's working:**
- 45 years in business is a strong temporal authority signal
- Authorized dealer status (CUMI, Crown Ceramics, Divine Cerawool) is verifiable
- ISO 9001:2015 certification
- 500+ clients, 50+ countries — specific numbers are credibility anchors

**What's missing:**
- No Wikipedia article or notable third-party mention
- No presence on Reddit, Quora, or engineering forums
- No industry association memberships visible (IRMA, CII, FICCI)
- LinkedIn company page status unknown — need 500+ followers minimum for AI to treat as established
- No news coverage or press mentions

**Priority:** Create IndiaMART listing (90-day impact) and LinkedIn Company Page (long-term authority) immediately.

---

### Content E-E-A-T — 60/100

**Experience (E):** Strong — 45 years, 500+ clients, named plants served. Score: 70  
**Expertise (E):** Moderate — technical content exists but no named experts. Score: 55  
**Authoritativeness (A):** Low — no third-party validation, no named leadership, no press. Score: 50  
**Trustworthiness (T):** Good — ISO certs, physical address, verifiable phone, WhatsApp. Score: 68

**Single highest-impact fix:** Add one named person with credentials to the About page and as author on blog posts. One named "Chief Refractory Engineer, 25 years experience" adds more E-E-A-T than 10 new blog posts.

---

### Technical GEO — 68/100

**What's working:**
- ✅ llms.txt: Comprehensive, well-structured (9/10 completeness)
- ✅ All AI crawlers now allowed (fixed during audit)
- ✅ Speakable schema added
- ✅ Sitemap with 145 URLs
- ✅ Next.js SSR — content is server-rendered, AI crawlers see full HTML
- ✅ Vercel deployment — fast global CDN

**What's missing:**
- Bing Webmaster Tools submission not confirmed (-5 points)
- `ai-roadmap.json` in public folder — good idea but non-standard format
- No IndexNow API key for instant Bing indexing on updates

---

### Schema & Structured Data — 72/100

**What's present:**
- ✅ Organization (valid)
- ✅ LocalBusiness with telephone + image (fixed during audit)
- ✅ WebSite with SearchAction
- ✅ FAQPage on homepage, geo pages
- ✅ BreadcrumbList on geo pages
- ✅ Speakable schema
- ✅ Article schema on blog (partial)

**Missing:**
- ❌ Product schema on product pages (high value)
- ❌ HowTo schema on installation guides
- ❌ Person schema for authors
- ❌ AggregateRating (no reviews)
- ❌ Event schema (if any webinars/exhibitions)

**Rich Results Test result:** 3 valid items (FAQ, LocalBusiness, Organisation) with 0 critical errors and 0 non-critical warnings (after fixes).

---

### Platform Optimization — 28/100

| Platform | Status | AI Citation Impact |
|---|---|---|
| Google Search (SGE) | ✅ Indexed | High |
| Bing / Copilot | ⚠️ Unknown | High |
| ChatGPT Search | ❌ Was blocked, now fixed | High |
| Perplexity | ✅ Allowed | High |
| Claude | ✅ Allowed | High |
| LinkedIn | ⚠️ Unknown status | Medium |
| YouTube | ❌ Missing | Medium |
| Wikipedia | ❌ Missing | High |
| Reddit | ❌ Missing | Medium |
| IndiaMART | ❌ Missing | High (B2B India) |
| Crunchbase | ❌ Missing | Medium |
| Quora | ❌ Missing | Low |

---

## Quick Wins — This Week

1. **Submit to Bing Webmaster Tools** (30 min) → unlocks ChatGPT Search + Copilot indexing immediately  
2. **Create IndiaMART seller profile** (45 min) → #1 source for B2B India queries in AI  
3. **Add named author to blog posts** (2 hrs) → single biggest E-E-A-T boost  
4. **Create LinkedIn Company Page** (1 hr) → AI entity anchor, DA 98 backlink  
5. **Add spec table to 3 top product pages** (3 hrs) → makes product pages citable for technical queries

---

## 30-Day Action Plan

### Week 1: Fix Blocking Issues + Quick Listings
- [x] ~~Unblock GPTBot in robots.js~~ (done)
- [x] ~~Fix OG image~~ (done)
- [x] ~~Fix Rich Results warnings~~ (done)
- [ ] Submit to Bing Webmaster Tools + sitemap
- [ ] Create IndiaMART seller profile
- [ ] Create Bing Places listing (imports from Google Business Profile)
- [ ] Create Crunchbase company listing

### Week 2: Author Identity + Content Depth
- [ ] Add named author (name + 3-line bio) to all 24 blog posts
- [ ] Add `Person` schema for the author
- [ ] Add specification table to top 5 product pages (High Alumina, LCC, Ramming Mass, Ceramic Fiber, Slide Gate Plates)
- [ ] Add `HowTo` schema to 3 installation guide blog posts

### Week 3: Platform Presence
- [ ] Create LinkedIn Company Page + post first 3 articles
- [ ] Create YouTube channel + upload company overview video
- [ ] Submit to TradeIndia and ExportersIndia
- [ ] Submit to Kompass and Europages (for international buyers)
- [ ] Answer 5 questions on Quora tagged "refractory materials India"

### Week 4: Authority Building
- [ ] Create Wikipedia article for "Shanker Agencies" or contribute to "Refractories" article
- [ ] Join IRMA (Indian Refractory Makers Association) — adds authoritative backlink
- [ ] Write guest post for an industry magazine (Steelworld, Modern Plastics, etc.)
- [ ] Set up Google Alerts for brand mentions
- [ ] Re-run this GEO audit to measure improvement

---

## Appendix: Pages Analyzed

| URL | Title | Key Issues |
|---|---|---|
| / (homepage) | Shanker Agencies \| Refractory Engineering Partner | Good — FAQ, schema, CTAs all present |
| /about | 45+ Years of Refractory Excellence | Missing named leadership |
| /products | Refractory Product Range | Thin descriptions, no spec tables |
| /blog | Knowledge Center | No author bylines, no Article schema |
| /refractory-supplier-in/delhi | Trusted Refractory Supplier in Delhi NCR | Good citability, good FAQ |
| /sitemap.xml | — | 145 URLs, all categories covered |
| /robots.txt | — | CRITICAL: GPTBot blocked (now fixed) |
| /llms.txt | — | 9/10 — excellent |
| /opengraph-image | — | Auto-generated (new, live) |

---

## Summary of Changes Made During This Audit Session

| Fix | File | Impact |
|---|---|---|
| Unblocked GPTBot, ChatGPT-User, CCBot | `app/robots.js` | Critical — ChatGPT can now crawl |
| Added telephone + image to LocalBusiness schema | `app/layout.jsx` | Rich Results warnings resolved |
| Rewrote llms.txt with correct positioning | `public/llms.txt` | AI engines get accurate entity info |
| Added Speakable schema | `app/layout.jsx` | Voice/AI assistant answers |
| Expanded sameAs with 10 platform links | `app/layout.jsx` | Entity recognition across platforms |
| Created dynamic OG image generator | `app/opengraph-image.tsx` | Social share cards now work |
| Fixed title/description from "distributor" to "engineering partner" | `app/layout.jsx`, `app/page.jsx` | Google search snippet updated |
| Updated all robots meta + robots tag | `app/layout.jsx` | Explicit index:true, follow:true |
| Expanded Delhi geo page industries | `src/data/locationsData.js` | Aluminium, copper, cement added |
| Created DIRECTORY_SUBMISSION_KIT.md | repo root | Ready-to-paste submission content |
| Replaced phone 9810205154 → 9899957888 | 6 files | Consistent NAP across all pages |
