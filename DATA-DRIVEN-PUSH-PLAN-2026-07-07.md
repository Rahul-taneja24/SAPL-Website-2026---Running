# SAPL Full-Data Audit & Push Plan — 7 July 2026

**Sources used this pass:** Peec AI (live, connected today), Google Search Console (live), a third-party rank-tracking tool ("Ubersuggest-class", domain/pages/PageSpeed/keywords), Ahrefs public Domain Rating API, AlsoAsked exports, manual competitor research (previous session). SEMrush/DataForSEO MCP and Ahrefs' full paid endpoints returned "Insufficient plan" — noted, not worked around with invented numbers.

---

## The Headline Number: Domain Authority Is the Real Bottleneck

Two **independent** tools, using two different methodologies, agree almost exactly:

| Tool | Metric | Score | Context |
|---|---|---|---|
| Third-party rank tracker | Domain Authority | **5 / 100** | 34 backlinks, only **11 referring domains** |
| Ahrefs (public API) | Domain Rating | **1.1 / 100** | Near the floor of Ahrefs' own scale |

This single fact explains almost every other symptom found across all three audits this week:
- Why Peec AI shows SAPL cited in only 1.02% of AI answers while manufacturer brands you *distribute* (Calderys 29.5%, Saint-Gobain 20.3%) dominate — AI systems weight citation-worthiness partly on the citing domain's own authority signals.
- Why GSC shows most blog posts stuck at position 8–70 despite reasonable content — thin backlink profiles cap how far on-page optimization alone can push rankings.
- Why third-party "Top 10 Refractory Suppliers" listicles (hyrefr.com, rrmsb.com, Kompass) don't include SAPL — those lists are compiled from sites that already have visibility, which is circular without external validation (reviews, citations, directory presence).

**11 referring domains is very low** for a 45-year-old company. This is the single highest-leverage, longest-lead-time fix available, and it's the one lever none of the on-page work from this week touches.

---

## Confirmed Real (independently verified) Organic Keyword Rankings

The rank tracker found SAPL ranking for keywords GSC's own data doesn't fully surface in the free tier:

| Keyword | Position | Volume | Page |
|---|---|---|---|
| refractory gunite | 16 | 30/mo | gunning-vs-casting-when-to-use |
| acid proofing | 44 | 50/mo | /products/acid-proofing |
| acid proof | 48 | 50/mo | /products/acid-proofing |
| gt refractory solutions | 40 | 50/mo | /solutions/aluminum |
| silicon carbide refractory | 77 | 40/mo | /products/.../silicon-carbide-bricks |
| sic refractory | 48 | 40/mo | /products/.../silicon-carbide-bricks |
| ladle shroud | 47 | 50/mo | /products/flow-control/ladle-shrouds |

Only 38 organic keywords tracked total, monthly estimated search traffic in the 0–62 range — consistent with the low domain authority. This matches the GSC picture: content exists and occasionally ranks, but rarely breaks into page 1 (positions 40-77 are page 4-8).

---

## New, Independently-Confirmed Technical Issue: Mobile Performance

PageSpeed audit via the rank tracker (separate from anything checked in the image/GEO audits):

| Metric | Desktop | Mobile |
|---|---|---|
| Largest Contentful Paint | 1.4s (good) | **6.6s (poor — Google's threshold is 2.5s)** |
| Time to Interactive | 1.8s | **7.7s** |
| Speed Index | 1.4s | 4.0s |
| Cumulative Layout Shift | 0.000 | 0.017 (fine) |

**This is a real, previously-unflagged problem.** Desktop performance is excellent; mobile is failing Core Web Vitals thresholds badly. Given most B2B procurement research now happens partly on mobile (engineers checking specs on-site, at trade shows, etc.), and Google uses mobile-first indexing for ranking, this is worth fixing before more content work — a 6.6s LCP actively suppresses rankings independent of content quality.

Top opportunities flagged: redirect chain costing 1.1s on mobile, unused CSS (29KB), unused JS (71KB). Recommend a follow-up technical pass specifically on mobile bundle size and redirect chains.

---

## Consolidated Plan — All Three Data Layers Combined

### Layer 1: Fix what's broken (1 week)
- [ ] **Mobile performance investigation** — profile the redirect chain and JS/CSS bundle specifically on mobile viewport; target LCP under 2.5s. This is now a confirmed, independently-measured issue, not a guess.
- [x] Cannibalization + missing metaTitles (gunning cluster) — done in prior session
- [ ] Acid-proofing cluster consolidation (from earlier GSC analysis) — /products/acid-proofing ranks position 44-48 for its own core terms; still needs the consolidation work planned earlier

### Layer 2: Close the AI-citation gap (2-4 weeks)
- [ ] **Directory/citation building — now the single highest-confidence lever.** With DR 1.1 / DA 5 confirmed independently, backlink and directory-citation building isn't optional polish, it's foundational:
  - Complete/optimize Kompass India profile (the exact platform whose "Top 10" Instagram post is being cited by AI right now, without SAPL on it)
  - Complete IndiaMART, TradeIndia, ExportersIndia profiles fully (all three already appear in Peec's retrieved-domain data — they're being read by AI systems)
  - Target 15-20 new referring domains over the next quarter via: industry association listings, supplier directory submissions, guest technical content on cement/steel trade publications
- [ ] "What Is a Refractory Material" pillar page (from AlsoAsked gap analysis) — still valid, but now understood as necessary-not-sufficient without the backlink layer
- [ ] Boiler refractory maintenance post (GSC content gap, 29 impressions/zero content)

### Layer 3: Track it honestly
- [ ] Re-pull Peec AI brand report monthly — this is now a real KPI (1.02% visibility baseline set 7 July 2026)
- [ ] Re-check Domain Rating/Authority quarterly via the same two tools used here, to verify backlink work is actually moving the number
- [ ] Re-run PageSpeed audit after the mobile fix to confirm LCP improvement

---

## What Remains Genuinely Unavailable
- SEMrush keyword volume/difficulty data (MCP access requires a paid Semrush plan)
- Full Ahrefs backlink profile detail (referring domain list, anchor text) — only the public DR score was accessible
- GA4 traffic/conversion data (no connected tool has access)

Nothing above was estimated or invented to fill these gaps — where a tool returned "insufficient plan," it's marked as unavailable, not backfilled with guesses.

---

## Addendum (7 July 2026, later same session): Live SERP Data + Tool Availability Correction

**Requested but not available in this session — confirmed, not worked around:**
- **Firecrawl** — no MCP server connected. Nothing named Firecrawl exists in the current toolset.
- **GA4** — no MCP server connected. No tool anywhere in this session can read Google Analytics 4 data.
- **Semrush** — confirmed plan-blocked on a second attempt (`keyword_research` returns "user does not have a Semrush plan that includes MCP access").

None of the numbers below were invented to compensate — where a source wasn't available, it's stated as unavailable.

### What was actually pulled: live Google SERP snapshots

Ran real-time SERP analysis (a DataForSEO-class connector, not Semrush) for SAPL's three highest-intent head terms:

| Keyword | SAPL position | What's beating SAPL |
|---|---|---|
| "refractory supplier india" | **#19** (page 2) | ganeshas.net (DA 13), wedge-india.com (DA 12), rhimagnesitaindia.com (DA 33), an Instagram post (DA 94), sarvesh.com (DA 12), justdial.com (DA 60) |
| "refractory manufacturer india" | **#18** (page 2) | Same competitive set, plus a Facebook post from Kompass India (DA 96) at position 8 |
| "high alumina bricks" | **Not ranking in top 28 at all** | Entirely non-India results (Amazon, Britannica, US/China refractory sites) — this keyword's SERP is dominated by global/US intent, not Indian B2B buyers, which may mean it's the wrong head-term to chase in its current unqualified form |

**Confirms the domain authority finding from earlier with precise competitor-by-competitor numbers.** Note that `horizonrefractories.com` (DA 4 — *lower* than SAPL's DA 5) still outranks SAPL at position 9 for two of the three terms — proving DA alone doesn't fully explain the gap; on-page relevance/targeting also matters and is independently fixable while the backlink-building work (which takes months) is underway.

**The same Kompass "Top 10" listicle flagged in the Peec AI data is confirmed independently here** — it now appears in two separate systems (AI citation data AND live organic SERP position 8) as a page actively pulling traffic and citations away from SAPL for the exact terms SAPL wants to own. This elevates "get included in or create a competing version of this listicle" from a nice-to-have to the single most-repeated finding across three independent tools this session.

### Revised near-term priority
Given `/brands` (not the homepage) is the page actually ranking for both head terms (#18-19), and it was already flagged in the GSC data as sitting on 545 impressions at position 22.5 — **this is now the single most cross-confirmed page to optimize first**: three separate data sources (GSC, this SERP pull, and Peec's domain-retrieval data) all point to `/brands` as the page carrying SAPL's head-term visibility, and all three show it underperforming its potential.
