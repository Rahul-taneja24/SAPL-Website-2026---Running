# AEO/GEO Keyword & Content Rewrite Strategy

**Date:** 7 July 2026 (updated same day — Peec AI connected mid-session)
**Inputs:** 2 AlsoAsked CSV exports, live GSC query/page data (28 days), competitor AI-Overview citation research, **live Peec AI brand-visibility data (50 tracked prompts, 8 brands, 30-day window)**
**Goal:** Beat competitors in AI answer engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) and traditional SERPs

---

## 0. Tool Availability — Be Clear About What's Real

| Tool | Status |
|---|---|
| Peec AI | **Connected 7 July 2026.** Project "Shanker Agencies Pvt Ltd" already set up with 50 tracked prompts, 7 competitor brands, 10 topics. Real visibility/citation data pulled below in Section 5 — this is measured, not estimated. |
| Ahrefs Brand Radar (AI citation tracking) | **Plan-blocked** — "Insufficient plan" on every call. |
| Google Search Console | Connected, live data pulled below. |
| AlsoAsked exports | Mostly paywalled (only 1 of ~50 answers unlocked per file) — question *text* is free and usable as a keyword/topic bank; the People-Also-Ask hierarchy tells us the exact phrasing searchers use. |

Everything in Sections 1-4 below was written before Peec AI connected, using AlsoAsked + GSC + manual competitor research. **Section 5 has the real AI-visibility numbers and supersedes some of the assumptions below** — read it, it changes the priority order.

---

## 1. What the AlsoAsked Data Actually Tells Us

Two question banks, India/English, from real People-Also-Ask data:

**"Refractory material" cluster (30 unique questions)** — top volume-signal questions: *What is a refractory material?* (rank 1, AI Overview triggered), *What are the 12 refractory metals?*, *Why is it called refractory?*, *Is cement a refractory material?*, *What is the difference between refractory and concrete?*, *What are basic refractories?*, *Is stainless steel a refractory material?*

**"Refractory for steel manufacturing plant" cluster (28 unique questions)** — *What are the refractories used in steel industry?* (rank 1, AI Overview triggered), *What is the refractory consumption per ton of steel?*, *What is the size of refractory market in India?*, *What is the world's largest refractory company?*, *What is the difference between BOF and EAF?*

**Key finding: SAPL's site currently answers almost none of these directly.** These are foundational, top-of-funnel definitional questions — exactly the kind AI engines use to build their "knowledge" of a topic before deciding who to cite as an authority deeper in the funnel. Right now Wikipedia, Refractories Institute, MMP Refratech and Metalshub own this layer. SAPL's content starts one level down (product selection guides) without a definitional foundation page underneath it.

---

## 2. What's Winning AI Overview Citations (competitor research findings)

Analyzed the actual top-cited pages (MMP Refratech, Refractories Institute, alfran.com, metals-hub.com, firebirdref.com):

1. **Crisp definitional opener, zero throat-clearing.** Every citable page answers the query in sentence one: *"A refractory material is one capable of withstanding extremely high temperatures without losing its physical and chemical properties."* No "In today's industrial world..." preamble.
2. **Numbered, exhaustive lists beat prose.** The two most-cited pages use fixed-count taxonomies (MMP: 13 application areas; metals-hub: 10 raw materials). AI Overviews extract these directly as structured answers.
3. **Length tracks classification breadth, not padding.** Short pages (~280 words) get cited for one sentence. Long pages (2,800–4,000 words) get cited because AI pulls different snippets from different sections for different sub-questions.
4. **FAQ sections are rare and effective where present** — only 1 of 6 analyzed competitor pages has one, and it's the most-cited/longest page.
5. **Zero competitors use real comparison tables** for "types of X" content — this is a genuine content-format gap SAPL can own.
6. **No schema markup detected on any competitor page** — SAPL's existing FAQPage/TechArticle schema is already ahead structurally; the content format is what needs to catch up.

**New competitors surfaced (not previously tracked):** RHI Magnesita India, IFGL Refractories (corporate catalog style, not blogging), Gupta Refractories Delhi (local directory listing, zero educational content — an open gap for "refractory supplier Delhi" AEO queries specifically).

---

## 3. Live GSC Findings This Session

### Fixed today
- **`gunning-castable-complete-guide` and `porous-plug-refractory-selection-guide` had no `metaTitle` field at all** — their browser tab / SERP title was rendering blank (`{ absolute: undefined }`). This is a real, mechanical bug independent of content quality; fixed both.
- **Keyword cannibalization confirmed and addressed:** the query *"castable & guniting"* was splitting between two pages — `gunning-castable-complete-guide` (position 1.3, 12 impressions) and `gunning-vs-casting-when-to-use` (position 22.0, **29 impressions** — the page getting more search visibility was ranking 20 spots worse). Added an explicit disambiguation sentence + cross-link in both directions so Google and AI crawlers can tell them apart: one is the *grade selection* guide, the other is the *installation method decision* guide.

### High-impression, near-zero-click clusters (content exists, isn't converting impressions to clicks)
| Cluster | Total impressions (sample) | Position range | Diagnosis |
|---|---|---|---|
| Gunning/guniting (13+ query variants) | 200+ | 1.3–62 | Wide position spread across 2 pages — volatile rankings, exactly what cannibalization causes. Should stabilize after today's fix; re-check in 2 weeks. |
| Acid-proofing (8+ query variants across 2 pages) | ~90 | 8–71 | Real demand, thin/scattered targeting. Needs consolidation — see backlog. |
| Ceramic fiber blanket / IFB | ~20 | 9.7–20.7 | Ranks reasonably, literally zero clicks — title/meta not compelling enough for the SERP snippet to earn the click. |
| "Boiler refractory maintenance" | 29 | 64.5 | **Zero content targets this exact phrase.** Straightforward net-new post opportunity. |
| "Bottom pouring set" family | ~30 | 57–63 | New page (published Jun 29), still settling in the index — needs internal links, not a rewrite yet. |

### Noise to ignore
Large volumes of impressions for company-name-collision queries (*shankar foundry*, *shanker forge pvt ltd*, *sankhla brothers*, etc.) — these are Google matching on "Shanker/Shankar" as a common Indian surname/business name fragment, not real demand for SAPL. Not actionable.

---

## 4. Prioritized Action Plan

### Done this session
- [x] Fixed 2 missing `metaTitle` fields (gunning castable guide, porous plug guide)
- [x] Resolved gunning-cluster cannibalization with disambiguation + bidirectional internal links

### Next 2 weeks (content rewrites, ranked by expected impact)
1. **Write a new pillar page: "What Is a Refractory Material? Types, Properties & Applications."** This directly targets the highest-volume AlsoAsked cluster where SAPL has zero presence. Structure per the winning pattern: one-sentence definition in paragraph 1, a numbered list of refractory classifications (acidic/basic/neutral — already in the AlsoAsked answer data), a comparison table (type × max temp × chemistry × typical industry), then a 5-question FAQ block covering: *What are the 12 refractory metals?*, *Why is it called "refractory"?*, *Is cement a refractory material?*, *What's the difference between refractory and concrete?*, *What are basic refractories?* Target 1,800–2,200 words. This is the single highest-leverage new asset — it's the exact question format AI Overviews are already citing competitors for, and SAPL currently has nothing there.
2. **Rewrite `ceramic-fiber-blanket-vs-insulating-fire-brick` title/meta.** Ranks position 9–20 across 4+ queries with zero clicks — a title/CTR problem, not a ranking problem. Needs a sharper, benefit-led title.
3. **Consolidate the acid-proofing cluster.** `acid-proofing` and `acid-proof-brick-lining-chemical-plants-guide` are splitting ~90 impressions across overlapping queries at weak positions (8–71). Pick one as the primary target for "acid proof brick lining" head terms, retarget the other to a clearly different angle (e.g. installation procedure vs. material selection), cross-link both ways like the gunning fix.
4. **Write the "boiler refractory maintenance" post.** 29 impressions on a single unaddressed query at position 64 — a content gap, not a competition problem.
5. **Add a real comparison table** (material × max temp × chemistry × Indian industry use) to the new pillar page and to at least 2 existing high-traffic posts (steel ladle lining, cement kiln zones) — this is the concrete format gap the competitor research found; nobody else in this niche does it.

### Ongoing measurement
- Re-pull GSC data in 2 weeks to confirm the gunning cluster's position volatility resolves post-cannibalization-fix.
- Manually test the AlsoAsked question list against ChatGPT/Perplexity monthly (documented as the honest substitute for the unavailable AI-visibility tool) — log whether SAPL is cited, and for which questions.
- Once the new pillar page is live, re-check GSC after 3–4 weeks for impression pickup on the "refractory material" definitional cluster.

---

*Full AlsoAsked question lists (58 unique questions across both exports) available on request — the free/unlocked question text from both CSVs was extracted for planning above; the paid answer/citation data beyond the two unlocked rows was not accessible on the current AlsoAsked plan.*

---

## 5. Peec AI — Real AI Visibility Data (connected 7 July 2026)

The Peec AI MCP is now live, tracking project "Shanker Agencies Pvt Ltd" against 50 real buyer-intent prompts across ChatGPT, Gemini, and Google AI Overviews, and 7 named competitor brands. This is genuine measured data, not an estimate.

### Brand visibility, last 30 days (586 total AI response opportunities)

| Brand | Visibility | Share of Voice | Avg Position | Mentions |
|---|---|---|---|---|
| Calderys | 29.5% | 44.0% | 3.8 | 292 |
| Saint-Gobain | 20.3% | 23.8% | 4.7 | 158 |
| TRL Krosaki | 15.5% | 18.4% | 3.8 | 122 |
| CUMI | 6.5% | 7.5% | 5.0 | 50 |
| Mahakoshal Refractories | 4.4% | 4.4% | 3.9 | 29 |
| **Shanker Agencies (SAPL)** | **1.02%** | **1.21%** | 5.0 | **8** |
| Divine Cerawool | 0.34% | 0.3% | — | 2 |
| Crown Ceramics | 0.34% | 0.3% | — | 2 |

**SAPL is dead last among its own supply partners in AI answer-engine visibility.** This isn't necessarily a content-quality problem — it's a structural distributor-vs-manufacturer issue, and the domain-level data proves it:

### The real mechanism (this is the important finding)

`shankeragencies.com` is actually the **4th most-retrieved domain of 100 tracked** (20.14% retrieval rate) — AI systems pull SAPL's pages for background information constantly. The homepage alone was retrieved 31 times and cited 28 times in 30 days; the High Alumina Bricks product page was retrieved 21 times. **SAPL's content is being read. It's just not being cited as the answer.**

I checked the actual copy on the High Alumina Bricks page expecting a weak-binding problem (brand names listed separately from "Shanker Agencies supplies X") — that turned out to be wrong. The copy already reads *"Shanker Agencies stocks all six HA grades... We supply CUMI, Calderys and TRL Krosaki variants"* — properly bound in one sentence. **The content isn't the bottleneck.**

The actual bottleneck: **AI systems default to citing manufacturer-brand names or third-party listicles for "who supplies X" queries, not regional distributors** — and SAPL currently has zero presence in the listicle-style content that dominates citations in this niche.

### Proof: the exact competitive content beating SAPL

The top-cited URLs in the entire dataset are almost all **"Top N Suppliers" listicles**, not product pages:
- `hyrefr.com/top-5-refractory-manufacturers-in-the-world` — 202 citations, 106 retrievals (**the single most-cited URL in the whole tracked ecosystem**)
- `rrmsb.com/post/best-refractory-suppliers-in-the-world` — 96 citations
- `verityrank.com/.../refractory...suppliers` — "Top 10 Refractory Manufacturers & Suppliers" — 47 citations
- An **Instagram post from Kompass India** — "Top 10 Refractory Manufacturers in India" — 18 citations, naming RHI Magnesita, TRL Krosaki, Vesuvius, IFGL, Calderys, CUMI, Sarvesh Refractories, SAIL Refractory Unit, Orient Ceratech, Mahakoshal. **SAPL is not on this list, and this exact post is being fed into AI answers about Indian refractory suppliers right now.**

**New competitor surfaced by this data, previously untracked:** `highlandrefractory.com` — the single highest-retrieved domain overall (20.82%), with multiple individual pages (castable guides, aluminum furnace lining guides) each pulling 10-12 retrievals. Worth a follow-up content-pattern review, same as the earlier MMP/Refractories Institute research.

### What this actually means for strategy

1. **A self-published "Best Refractory Suppliers" blog post ranking yourself #1 will not get cited the way a neutral third-party listicle does.** SAPL already has `best-refractory-suppliers-in-india` as a blog post — it is not showing up anywhere in this competitive citation dataset. AI systems appear to discount self-interested rankings in favor of neutral third-party comparison content.
2. **Directory/listicle placement is now a measurable, higher-leverage lever than on-page copy for the "who do I buy from" layer of intent.** Concrete actions: get listed/updated on Kompass India's B2B directory profile (the exact post cited above is a Kompass share), pursue inclusion in comparison articles similar to hyrefr.com/rrmsb.com/verityrank.com (via outreach, guest content, or directory profile completion), and ensure IndiaMART/TradeIndia/ExportersIndia profiles are maximally complete (indiamart.com and tradeindia.com already appear in the domain report as retrieved sources).
3. **The technical/definitional content strategy from Section 2 still stands** — that's a different intent layer (informed shopper / evaluative researcher, per Peec's own audience distribution: 50% + 30% of your tracked audience) and it's where SAPL's own site *should* be the cited source, since manufacturer sites don't blog at that depth.

### Tracked topics (10) — for reference, this is what the 50 prompts group into
High Temperature Thermal Insulation · Refractory Engineering Solutions · Flow Control Refractory Systems · Steel Plant Refractory Materials · Industrial Refractory Manufacturers · High Alumina Bricks for Copper Manufacturing · Basic Refractory · Refractory for Aluminium Manufacturing Plants · High Alumina Refractory · Castables for Rotary Furnaces

### Note on `get_agent_visits`
Returned 0 for the period — this likely means no Peec tracking snippet is installed on the site to log direct AI-crawler hits (separate from the retrieval/citation data above, which comes from Peec's own prompt-testing pipeline, not passive site tracking). Not urgent, but worth asking Peec support whether a site-side snippet is available/recommended for fuller data.

### Updated action priority (supersedes generic Section 4 ranking)
1. **Directory/listicle presence** — complete and optimize Kompass, IndiaMART, TradeIndia, ExportersIndia profiles; this is now proven to be where AI-cited "top supplier" content lives in this niche.
2. Everything in Section 4 (pillar page, cannibalization — already fixed, acid cluster, boiler post) — still valid for the definitional/technical intent layer.
3. Re-pull this Peec AI report monthly to track whether SAPL's visibility % moves as directory/listicle work lands — this is now a real, trackable KPI.
