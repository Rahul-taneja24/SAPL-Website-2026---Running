# GEO Audit Report: Shanker Agencies

**Audit Date:** 2026-05-07  
**URL:** https://www.shankeragencies.com  
**Business Type:** B2B Industrial Supplier / Refractory Engineering Agency  
**Pages Analyzed:** 50+ (from 167-URL sitemap)  
**Hosting:** Vercel (Next.js App Router, SSR/SSG)

---

## Executive Summary

**Overall GEO Score: 58/100 (Fair)**

Shanker Agencies has a technically excellent foundation — all AI crawlers are allowed, content is server-side rendered, an llms.txt exists, and the blog contains genuinely citation-ready technical content. However, the site's weakest signal is brand authority: no Wikipedia presence, no LinkedIn company page (only a personal profile), and minimal trade press coverage means AI models cannot reliably recognize Shanker Agencies as an authoritative entity. The biggest quick wins are schema deployment across sub-pages, fixing live placeholder verification codes, and expanding llms.txt with full content links.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 72/100 | 25% | 18.0 |
| Brand Authority | 28/100 | 20% | 5.6 |
| Content E-E-A-T | 61/100 | 20% | 12.2 |
| Technical GEO | 79/100 | 15% | 11.85 |
| Schema & Structured Data | 56/100 | 10% | 5.6 |
| Platform Optimization | 52/100 | 10% | 5.2 |
| **Overall GEO Score** | | | **58/100** |

---

## Critical Issues (Fix Immediately)

### C1 — Live Placeholder Verification Codes in Production HTML
**Affected page:** All pages (in `<head>`)  
```html
<meta name="msvalidate.01" content="REPLACE_WITH_BING_CODE"/>
<meta name="yandex-verification" content="REPLACE_WITH_YANDEX_CODE"/>
```
This exposes unfinished implementation to every crawler and developer. Either register Bing Webmaster Tools (get a real code) or remove both tags. Bing Webmaster Tools registration is also required for Bing Copilot citation eligibility.

### C2 — No Schema on About, Products, Knowledge, or Industry Pages
Homepage has 4 JSON-LD blocks (good). But the 146 other pages — including 17 product type pages, 8 industry pages, 24 blog posts, and the /about page — have zero structured data. AI models cannot extract machine-readable facts from these pages. Blog posts especially need Article schema with author Person to be citable.

**Impact:** All content on sub-pages is effectively invisible to AI entity parsers.

---

## High Priority Issues

### H1 — Brand Not Recognized as an AI Entity
**Score impact:** Brand Authority 28/100 — heaviest suppressor of the overall score.

- No Wikipedia article for Shanker Agencies
- LinkedIn presence is a personal profile (`/in/shankeragencies/`) not a company page
- No trade press mentions in refractory publications (CeramTec, Refractories Worldforum)
- No Reddit presence in r/metallurgy, r/manufacturing, r/steel

Without Wikipedia and a company LinkedIn page, AI models (especially ChatGPT and Gemini) cannot resolve Shanker Agencies as a recognized entity even when the content is excellent.

### H2 — Non-www Redirect is 307 (Temporary) Instead of 301/308 (Permanent)
`shankeragencies.com` → 307 → `www.shankeragencies.com`  
Temporary redirects do not reliably pass PageRank and cause AI crawlers to re-evaluate the redirect on every visit. Fix in `vercel.json`.

### H3 — Homepage Meta Description Over-Length (217 chars, max 160)
The description will be truncated by Google and AI snippet generators. The first 160 characters should carry the complete message.

### H4 — No `llms-full.txt` File
The llms.txt exists and is well-structured (~28,000 chars) but links to no blog posts or technical resources. AI models relying on llms.txt for content ingestion cannot reach the technical specification tables or 24 blog articles. Create `/llms-full.txt` and link it from `llms.txt`.

### H5 — Blog Post Titles Over-Length (87 chars avg, max 60)
Blog post `<title>` tags average 87 characters. SERPs and AI snippets will truncate these. Front-load the key phrase.

### H6 — Duplicate Content Pairs on Blog
Three topic pairs have two competing articles each:
- Two "Cement Kiln" posts
- Two "Ceramic Fiber vs IFB" posts
- Two "Induction Furnace Ramming Mass" posts

These compete with each other and dilute topical authority. Consolidate each pair into one definitive resource with a 301 redirect from the shorter article.

---

## Medium Priority Issues

### M1 — All 21 Homepage Images Missing Explicit `width`/`height` Attributes
Browser cannot reserve layout space before image download → CLS (layout shift) risk. 12 of 21 images are sourced from external Unsplash CDN, amplifying the risk. Migrate to Next.js `<Image>` component.

### M2 — No Content-Security-Policy Header
Only missing security header. HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy are all present. Add CSP to complete the security posture.

### M3 — Blog Posts Have No Machine-Readable Author Attribution
The Rahul Taneja byline exists in page text but not in Article schema (which is absent on most posts). AI models cannot establish the E-E-A-T chain from content claim to credentialed expert without Person schema linking the author to a verified external identity (LinkedIn URL).

### M4 — No External Citations in Any Content
24 technical blog posts cite zero external sources (BIS standards, ASTM C-series, supplier datasheets). AI models strongly prefer sources that cite other sources. One citation per major technical claim would materially improve citability scores.

### M5 — Meta Keywords Tag Stuffed with 109 Terms (3,095 chars)
Google ignores this tag. AI crawlers may use it as a quality signal. 109 keywords reads as spam. Trim to 10–15 or remove entirely.

### M6 — No Google Business Profile Confirmed for Delhi HQ
GBP is the fastest path to Gemini Knowledge Graph inclusion for a B2B entity with a physical address.

### M7 — `fetchpriority` Missing on Logo Preload (LCP Risk)
The logo is preloaded but without `fetchpriority="high"`. Add the attribute to optimize Largest Contentful Paint.

### M8 — Sitemap Trailing Slash Inconsistency
Sitemap lists `https://www.shankeragencies.com/` (trailing slash); canonical omits it. Align both.

---

## Low Priority Issues

### L1 — Bing Webmaster Tools Not Verified / No IndexNow
New blog posts are not pushed to Bing's index, delaying Bing Copilot citation eligibility by weeks.

### L2 — Testimonials Have No Company Attribution
All client testimonials use role + industry only ("Plant Manager, Integrated Steel Plant, India"). Without company names, these are unverifiable and carry minimal trust weight.

### L3 — No Conflict-of-Interest Disclosure on Buyer's Guides
Buyer's Guides recommend products that Shanker Agencies sells. A one-line disclosure satisfies quality rater transparency standards.

### L4 — No `Last Reviewed` Dates on Technical Posts
Refractory grades and pricing change. Visible review dates signal actively maintained content.

### L5 — Stock Photography Only (No Original Installation Photos)
No original plant photos, technical diagrams, or lining cross-section charts. Original visuals are strong Experience signals and uncopyable by competitors.

### L6 — `cache-control: max-age=0` on Static Pages
Zero max-age forces full revalidation on every edge request. `max-age=3600, stale-while-revalidate=86400` would improve TTFB.

---

## Category Deep Dives

### AI Citability — 72/100

**Strongest asset on the site.** Technical blog posts contain verbatim-quotable engineering claims with measurable figures that AI models can extract and cite directly.

**Top citation-ready passages:**
1. **Ramming Mass Family Specifications** (86/100) — Three-family comparison table with SiO₂/Al₂O₃/MgO percentages, temperature ceilings, and heat-count ranges.
2. **AL70 vs AL80 Zone Deployment Map** (84/100) — Ladle zone-by-zone material spec with campaign life data (80–120 vs 100–160 heats) and 30–40% cost premium.
3. **Boric Acid Optimisation Thresholds** (80/100) — Three decision boundaries: <0.8% = weak layer; 1.0–1.8% = optimal; >2.5% = penetration risk.
4. **Cost-Per-Heat Analysis** (78/100) — Rs 24/kg premium vs Rs 18/kg budget → 31% lower cost-per-heat despite 33% higher unit cost.
5. **Thermal Imaging & Patching Thresholds** (73/100) — 40–50°C hot-spot trigger, patch at heat 60 → 40–60 additional heats of life.

**Weakest areas:** Homepage hero scores 22/100 (marketing assertions, uncitable). About page biography scores 26/100 (no structured facts in answer format).

**Top citability improvement:** Add a "Key Engineering Parameters" block immediately after the H1 of every blog post — a definition list of 4–6 specific numeric claims from the article. This converts every blog post from background resource to AI answer candidate.

---

### Brand Authority — 28/100

**The primary suppressor of the overall GEO score.**

| Platform | Status | Authority Signal |
|---|---|---|
| Wikipedia | Absent | 0/30 — highest-weight gap |
| LinkedIn Company Page | Absent (personal profile only) | 2/10 |
| IndiaMART (TrustSEAL, 3.6★) | Present | 12/25 — strongest current signal |
| YouTube (@shankeragencies) | Unverified live | ~5/15 |
| Reddit (r/metallurgy etc.) | Absent | 0/20 |
| Trade Publications | Absent | 0/10 |
| Crunchbase/RocketReach | Minimal (inaccurate auto-data) | 4/10 |

A 45-year-old ISO-certified exporter serving 50+ countries should score 60–70 on brand authority. The gap between what Shanker Agencies is and what AI models can verify is the central GEO problem.

---

### Content E-E-A-T — 61/100

| Dimension | Score | Key Gap |
|---|---|---|
| Experience | 14/25 | Zero named case studies with outcomes |
| Expertise | 17/25 | No Person schema; no external author presence |
| Authoritativeness | 16/25 | Zero external citations in content |
| Trustworthiness | 15/25 | Anonymous testimonials; no schema |

**Strongest signals:** Mohan Taneja (45+ years), Rahul Taneja (Director since 2018), ISO triple certification, authorized dealer for 7 named premium brands (CUMI, TRL Krosaki, Calderys, IFGL, Crown Ceramics, Mahakoshal, Divine Cerawool).

**Biggest E-E-A-T gap:** Zero case studies. Rahul Taneja oversees 300+ industrial plants but not one post cites a real client outcome. Even anonymized: "a 500-tonne EAF operator in the Middle East reduced lining costs 18% over 24 months after switching to Calderys AL70" — this is 10× more citable than any current content.

---

### Technical GEO — 79/100

Next.js on Vercel delivers full SSR: 143KB of content-rich HTML in the initial response. AI crawlers read every page without JavaScript execution.

| Check | Status |
|---|---|
| All major AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, etc.) | ✅ |
| Full server-side rendering confirmed | ✅ |
| llms.txt present, 28,000 chars, well-structured | ✅ |
| `<link rel="alternate" href="/llms.txt">` in every page `<head>` | ✅ |
| sitemap.xml (167 URLs with lastmod timestamps) | ✅ |
| HTTPS + HSTS (2yr + preload) | ✅ |
| X-Frame-Options, XCTO, Referrer-Policy, Permissions-Policy | ✅ |
| Self-referencing canonical on all checked pages | ✅ |
| Content-Security-Policy | ❌ Missing |
| Non-www redirect type | ❌ 307 (should be 301/308) |
| Bing Webmaster Tools | ❌ Placeholder in production HTML |
| Image width/height attributes | ❌ All 21 images missing |

---

### Schema & Structured Data — 56/100

**Homepage: 4 JSON-LD blocks** (unusual strength for a B2B supplier)
- Organization + LocalBusiness (combined — should be split)
- WebSite + SearchAction
- WebPage + speakable CSS selectors
- FAQPage (5 Q&As — strong AI semantic value even without rich result eligibility)

**Blog pages with Article schema: good.**  
**146 other pages: zero structured data.**

Missing across site:
- Standalone Person schema (Rahul Taneja, Mohan Taneja) on /about
- Product/ItemList schema on 17 product type pages
- Service schema on 8 industry pages
- BreadcrumbList on all sub-pages
- `legalName`, 4th phone, ISO `hasCredential` in Organization schema
- Wikipedia + Wikidata `sameAs` links (single most impactful addition)

**speakable note:** CSS selectors are defined (`.speakable`, `[data-speakable="true"]`) — verify these are actually applied to HTML elements.

---

### Platform Optimization — 52/100

| Platform | Score | Primary Gap |
|---|---|---|
| Google AI Overviews | 58/100 | H2s not in question format; HowTo schema missing |
| Perplexity AI | 55/100 | No llms-full.txt; no community/Reddit presence |
| Google Gemini | 51/100 | No Google Business Profile; YouTube unverified |
| ChatGPT Web Search | 48/100 | No Wikipedia entity; no company LinkedIn |
| Bing Copilot | 47/100 | No Bing Webmaster Tools; placeholder in HTML |

**Cross-platform synergies (one action, multiple platforms):**
1. Organization schema with sameAs → ChatGPT, Gemini, Bing, Google AIO
2. Wikipedia article/mention → ChatGPT (strongest), Perplexity, Gemini, Bing
3. FAQPage + Article schema → Google AIO (strongest), Bing, Gemini
4. Confirm Next.js SSR for all pages → Perplexity (strongest), ChatGPT, Bing
5. YouTube technical videos embedded on blog → Gemini (strongest), Google AIO

---

## Quick Wins (Implement This Week)

1. **Fix the Bing verification placeholder** — Register Bing Webmaster Tools, replace `REPLACE_WITH_BING_CODE` with the real code. Also remove the Yandex placeholder or register. Removes an embarrassing signal from production HTML immediately.

2. **Change 307 redirect to 301** in `vercel.json` (code below). 10-minute fix.

3. **Trim meta descriptions to ≤160 chars** on homepage and all blog posts.

4. **Remove/trim `<meta name="keywords">`** from 109 terms to ≤15 or delete entirely.

5. **Add `fetchpriority="high"` to logo `<link rel="preload">`** in `<head>`.

6. **Expand llms.txt** with `## Technical Guides` section listing all 24 blog URLs + one-line descriptions, and a `## Specification Tables` section. llms.txt score: 65 → 85+.

7. **Create LinkedIn Company Page** (distinct from personal profile `/in/shankeragencies/`). Takes 2 hours; delivers immediate brand authority signal.

8. **Claim Google Business Profile** for 553 Main GT Road, Shahdara, Delhi. Takes 2–3 hours; directly improves Gemini Knowledge Graph inclusion.

---

## 30-Day Action Plan

### Week 1: Technical Fixes
- [ ] Register Bing Webmaster Tools + replace `msvalidate.01` placeholder
- [ ] Change non-www redirect: 307 → 301 in `vercel.json`
- [ ] Trim all meta descriptions to ≤160 chars
- [ ] Remove/trim `<meta name="keywords">` to ≤15 terms
- [ ] Add `fetchpriority="high"` to logo preload link
- [ ] Migrate Unsplash images to `next/image` with explicit width/height
- [ ] Add Content-Security-Policy header to `next.config.js`
- [ ] Align sitemap trailing slash with canonical format

### Week 2: Schema Rollout
- [ ] Split Organization+LocalBusiness into two separate JSON-LD blocks on homepage
- [ ] Add `legalName`, 4th phone, ISO `hasCredential` to Organization schema
- [ ] Add standalone Person schema for Rahul & Mohan Taneja to `/about`
- [ ] Deploy Article schema to all 24 blog posts (template below)
- [ ] Add BreadcrumbList to all sub-pages (automate from URL path)
- [ ] Verify `.speakable` CSS class is applied to actual HTML elements
- [ ] Add Product/ItemList schema to 5 product category pages

### Week 3: Content & Brand Authority
- [ ] Create LinkedIn Company Page (separate from personal profile)
- [ ] Claim and optimize Google Business Profile for Delhi HQ
- [ ] Add "Key Engineering Parameters" block to top of all 24 blog posts
- [ ] Consolidate 3 duplicate blog post pairs + 301 redirects
- [ ] Add external citations (BIS/ASTM standards) to top 5 technical posts
- [ ] Add visible author bio block (photo + credentials + LinkedIn link) to blog posts
- [ ] Add conflict-of-interest disclosure to all Buyer's Guides
- [ ] Submit all URLs to Bing via IndexNow

### Week 4: llms.txt + Entity Authority
- [ ] Create `/llms-full.txt` (full blog body text + specification tables)
- [ ] Update `llms.txt` with `## Technical Guides` section + link to llms-full.txt
- [ ] Fully complete IndiaMART profile (certifications, all 17 product types)
- [ ] Update Crunchbase profile with accurate data
- [ ] Write 3–5 anonymized client case studies
- [ ] Begin Wikipedia notability research (gather third-party sources)

---

## Implementation Code Snippets

### 1. Permanent Redirect — vercel.json
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "shankeragencies.com" }],
      "destination": "https://www.shankeragencies.com/:path*",
      "permanent": true
    }
  ]
}
```

### 2. Content-Security-Policy — next.config.js
```js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.unsplash.com https://www.shankeragencies.com",
      "connect-src 'self'",
      "font-src 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};
```

### 3. Next.js Image Component (replaces Unsplash img tags)
```jsx
import Image from 'next/image';

// Before:
<img src="https://images.unsplash.com/photo-xxxx" alt="Shaped Refractories" />

// After:
<Image
  src="https://images.unsplash.com/photo-xxxx"
  alt="Shaped Refractories"
  width={800}
  height={600}
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

### 4. Article Schema Template (add to every blog post)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "{{CANONICAL_URL}}",
  "headline": "{{POST_TITLE}}",
  "description": "{{META_DESCRIPTION}}",
  "image": { "@type": "ImageObject", "url": "{{OG_IMAGE_URL}}", "width": 1200, "height": 630 },
  "datePublished": "{{ISO_DATE_PUBLISHED}}",
  "dateModified": "{{ISO_DATE_MODIFIED}}",
  "author": {
    "@type": "Person",
    "@id": "https://www.shankeragencies.com/about#rahul-taneja",
    "name": "Rahul Taneja",
    "jobTitle": "Director, Refractory Engineering Expert",
    "sameAs": ["https://www.linkedin.com/in/rahultaneja24/"]
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://www.shankeragencies.com/#organization",
    "name": "Shanker Agencies Pvt. Ltd.",
    "logo": { "@type": "ImageObject", "url": "https://www.shankeragencies.com/images/sapl-logo.png" }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "{{CANONICAL_URL}}" },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".article-summary", "[data-speakable='true']"]
  }
}
```

### 5. Person Schema — /about page
```json
[
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.shankeragencies.com/about#rahul-taneja",
    "name": "Rahul Taneja",
    "jobTitle": "Director",
    "worksFor": { "@id": "https://www.shankeragencies.com/#organization" },
    "url": "https://www.shankeragencies.com/about",
    "sameAs": ["https://www.linkedin.com/in/rahultaneja24/"],
    "knowsAbout": ["Refractory Materials", "High Alumina Refractories", "Castable Refractories", "Steel Plant Operations", "Refractory Engineering", "ISO Quality Management"]
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.shankeragencies.com/about#mohan-taneja",
    "name": "Mohan Taneja",
    "jobTitle": "Founder & Managing Director",
    "worksFor": { "@id": "https://www.shankeragencies.com/#organization" },
    "url": "https://www.shankeragencies.com/about",
    "knowsAbout": ["Refractory Materials Supply", "Industrial Distribution", "Steel Industry Materials", "Cement Industry Materials"]
  }
]
```

### 6. BreadcrumbList — auto-generate from URL path in Next.js
```js
// lib/breadcrumbs.js
export function getBreadcrumbs(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs = [{ name: 'Home', url: 'https://www.shankeragencies.com' }];
  let path = '';
  for (const part of parts) {
    path += '/' + part;
    crumbs.push({
      name: part.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      url: 'https://www.shankeragencies.com' + path
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem', position: i + 1, name: c.name, item: c.url
    }))
  };
}
```

### 7. Enhanced llms.txt Structure
```markdown
# Shanker Agencies Pvt. Ltd.

> India's leading refractory engineering partner since 1980. Authorized dealer of CUMI,
> Crown Ceramics, Divine Cerawool, Mahakoshal Refractories, TRL Krosaki, IFGL Refractories,
> and Calderys India. ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 certified.
> 500+ industrial clients across 50+ countries.

## Company
- [About Shanker Agencies](https://www.shankeragencies.com/about)
- [Contact & Quote](https://www.shankeragencies.com/contact)

## Products
- [Shaped Refractories](https://www.shankeragencies.com/products/shaped-refractories)
- [Unshaped Refractories](https://www.shankeragencies.com/products/unshaped-refractories)
- [Flow Control Products](https://www.shankeragencies.com/products/flow-control)
- [Insulation Materials](https://www.shankeragencies.com/products/insulation)
- [Acid Proofing](https://www.shankeragencies.com/products/acid-proofing)

## Technical Guides
- [How to Select Ramming Mass for Induction Furnace](https://www.shankeragencies.com/blog/how-to-select-ramming-mass-for-induction-furnace)
- [Refractory Castable Installation Guide](https://www.shankeragencies.com/blog/refractory-castable-installation-guide)
- [Ceramic Fiber Blanket vs Insulating Fire Brick](https://www.shankeragencies.com/blog/ceramic-fiber-blanket-vs-insulating-fire-brick)
- [Cement Kiln Refractory Zones](https://www.shankeragencies.com/blog/cement-kiln-refractory-zones)
- [Magnesia Carbon Bricks for BOF & EAF](https://www.shankeragencies.com/blog/magnesia-carbon-bricks-bof-eaf)
- [AL70 vs AL80 High Alumina Bricks](https://www.shankeragencies.com/blog/al70-vs-al80-high-alumina-bricks)
- [How to Reduce Refractory Consumption in Steel Plants](https://www.shankeragencies.com/blog/reduce-refractory-consumption-steel-plants)

## Specification Tables
- [Firebrick Grade Comparison AL40–AL90](https://www.shankeragencies.com/knowledge)

## Full Content
- [llms-full.txt](https://www.shankeragencies.com/llms-full.txt)
```

---

## Appendix: Pages Analyzed

| URL | Title | Key GEO Issues |
|---|---|---|
| / | Shanker Agencies \| Refractory Engineering Partner | Meta desc 217 chars; Bing placeholder; 109 keyword meta |
| /about | About Us | No Person schema; no structured data |
| /products | Products | No Product/ItemList schema |
| /knowledge | Refractory Reference | No schema; not linked from llms.txt |
| /blog | Blog & Insights | 3 duplicate topic pairs |
| /blog/how-to-select-ramming-mass-* | How to Select Ramming Mass... | Title 87 chars; no external citations |
| /products/shaped-refractories | Shaped Refractories | No schema; no BreadcrumbList |
| /solutions/steel | Steel Industry Solutions | No Service schema; H2s not question-format |
| /refractory-supplier-in/[city] | Location pages (50+) | No Service/areaServed schema; no BreadcrumbList |
| /brands/cumi | CUMI Refractories | No Brand/Organization schema |
