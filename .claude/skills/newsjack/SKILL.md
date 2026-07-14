---
name: newsjack
description: SAPL industrial newsjacking engine — monitor refractory/steel/cement/energy news each morning, score stories 0–100, draft a /news article with full GEO+AEO schema, run the editorial QA gate, and open a PR (never auto-publish). Use when the user says "newsjack", "news engine", "run the daily news scan", "draft a news article", or when the sapl-newsjack-daily routine fires.
---

# SAPL Newsjacking Engine

Turn breaking industrial news into fast-ranking, AI-citable `/news` articles that build topical
authority for Shanker Agencies Pvt. Ltd. (SAPL) — **without** becoming a news publisher and
**without** ever inventing facts.

SAPL manufactures/supplies refractories, insulation, industrial ceramics, kiln solutions and
thermal-engineering products. News is a **wedge to capture fresh search intent and earn AI
citations**, then connect the engineering/procurement implications back to SAPL expertise.

## Hard guardrails (never violate)
1. **Never invent facts, figures, dates, or quotes.** Every number and claim must trace to a cited
   source URL captured during research. If you cannot cite it, cut it.
2. **Never auto-publish.** Output is a Markdown draft + a data entry that opens a **PR/draft**. A
   human merges to go live. (This is a fixed decision — do not add auto-publish.)
3. **Do not rewrite the news.** Summarize the event in 2–4 sentences, then add original analysis:
   engineering, procurement, maintenance, thermal, materials implications.
4. **No clickbait, no hype, no fluff, no AI-tells.** Write like a refractory engineer with 45 years
   on the shop floor. Concise technical English. No "In today's fast-paced world…", no em-dash
   padding, no "it's important to note".
5. **Publish under `/news`, never `/blog`.** Different route, different schema (`NewsArticle`).
6. **Do not touch existing site pages, SEO, or analytics.** Only add `/news` data + routes.
7. **SAPL mention is engineering context, not a sales pitch.** Only where it genuinely adds value.

## Daily workflow (search → select → generate → QA → output)

### 1. SEARCH — gather candidates
Every run, sweep for stories from the last ~48h across these tools (already connected):
- `firecrawl_search` (source_type: news) and `WebSearch` — primary discovery.
- Trends: `trends_research`, `keywords-explorer-*` for fresh-demand signals.
- Optional deep read: `firecrawl_scrape` on the original source to capture exact figures.

**Beats to monitor** (see `references/beats.md`): steel, iron, foundry, aluminium, cement, glass,
petrochemical, power/boilers, waste-to-energy, incinerators, hydrogen, battery mfg, mining,
ceramics, refractory mfg, thermal engineering, furnaces/kilns, decarbonization, carbon capture,
green steel, industrial automation/safety, heat recovery, high-temperature & advanced ceramics,
IS/ASTM/ISO standards, manufacturing policy, import duties, export policy, and raw-material prices
(bauxite, calcined/brown-fused alumina, silicon carbide, graphite, magnesia, chrome ore, zircon,
mullite, kaolin) plus China production / India manufacturing.

**Ignore:** celebrity, unrelated politics, general finance, crypto, consumer products.
**Keep only** stories that could affect industrial plants, procurement, maintenance, shutdowns,
capex, raw-material availability, energy cost, refractory consumption, furnace design, plant
upgrades, efficiency, or regulation.

Produce a shortlist of 5–20 candidates with: headline, source URL, date, one-line "why it matters".

### 2. SELECT — score 0–100 (see `references/scoring.md`)
Score each candidate. **Publish threshold = 62.** Below that, skip (log why).
Weighted model:
| Factor | Weight |
|---|---|
| Search demand (fresh volume/trend slope) | 20 |
| Industry relevance to SAPL buyers | 20 |
| Buyer intent (procurement/maintenance trigger) | 18 |
| Likelihood of AI citation (clear factual Q&A shape) | 15 |
| News freshness (recency + rising) | 12 |
| Backlink potential (data/analysis others cite) | 8 |
| Competitive difficulty (inverse — easier = higher) | 7 |

Publish cadence: **max ~1–2 articles/day.** Quality over volume. Skip days with nothing ≥ 62 —
an empty, high-signal `/news` beats a padded one for E-E-A-T and Google spam policy.

### 3. GENERATE — build the article
Fill `templates/article.template.md` (every section required). Then convert to a `newsData.js`
entry using `templates/newsData.entry.template.js`. Content HTML mirrors the blog's allowed tags
(h2/h3/h4, p, ul/li, strong, sub/sup, table, blockquote, a). Answer-first: lead each section with
the direct answer so AI engines can lift it. Include the GEO question set (see below).

**GEO/AEO question set — every article must answer, in prose or FAQ:**
Why does this matter? · What caused it? · Who is affected? · Which industries/materials are
involved? · What should buyers do? · What alternatives exist? · What long-term trend does this
signal? · What could happen next?

**Cluster linking (topical authority):** link each article to ≥2 evergreen cornerstone pages and
≥1 related news item. Cornerstone map in `references/clusters.md` (e.g. High Alumina Bricks,
Ceramic Fibre, Boiler Refractory, Castables, MgO-C Bricks).

### 4. QA — editorial gate (see `checklists/qa.md`)
Block the draft if any fail: uncited claim/number; source not reputable; duplicates an existing
`/news` or `/blog` post; clickbait/hype; AI-tells; missing schema; SAPL pitch reads salesy; thin
(<700 words of real analysis); no cornerstone links; canonical/OG/JSON-LD missing. Flag factual
uncertainty explicitly in the PR body.

### 5. OUTPUT — open a PR draft
- Add the entry to `frontend/src/data/newsData.js`.
- Save the human-readable draft to `content/news-drafts/<slug>.md`.
- Create a branch `news/<slug>`, commit, and open a **draft PR** summarizing: score breakdown,
  sources, cornerstone links, and any uncertainty flags. **Do not merge.**

## Files in this skill
- `references/beats.md` — full beat list + trusted-source seeds.
- `references/scoring.md` — the 0–100 algorithm with worked example.
- `references/clusters.md` — cornerstone pages + product URLs for internal linking.
- `templates/article.template.md` — the full article skeleton (all required sections).
- `templates/newsData.entry.template.js` — the JS object shape for `newsData.js`.
- `checklists/qa.md` — the editorial/compliance gate.
- `prompts/` — the prompt library (select, write, social, QA).

## Success metrics to report monthly (see `checklists/metrics.md`)
Indexing speed (submit→indexed), AI Overview / ChatGPT / Perplexity citation appearances, organic
sessions to `/news`, backlinks earned, internal-link growth to cornerstones, and click-through from
`/news` to product/RFQ pages.
