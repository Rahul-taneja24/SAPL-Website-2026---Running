# SE Ranking Country Configuration Requirements

Status date: 2026-08-11
Scope: item 7 — document exact SE Ranking configuration needed to track shankeragencies.com correctly across India + 10 export markets, without replacing existing GSC work or producing misleading blended/global averages. Documentation only — no SE Ranking project has been created or modified.

## Current state (checked this session)

- **No SE Ranking projects exist for this domain via API.** I have live, authenticated access to an SE Ranking-compatible MCP connector (account: `info@shankeragencies.com`) and tried 3 read-only calls (`subscription-info-limits-and-usage`, `management-projects`, `management-locations`) — all 3 returned `"Insufficient plan"`. This means either the account has no active paid SE Ranking subscription, or the current plan tier excludes API access. **I cannot confirm or inspect any existing SE Ranking project configuration from here** — everything below is a specification of what needs to be set up, not a report of what's already set up.
- Earlier in this engagement you supplied a PDF export of an SE Ranking project report (`shankeragencies.com-Project-Report_2026_08_09.pdf`), which confirms an SE Ranking project does exist somewhere with dashboard/UI access — just not reachable via this API connection. Reconcile which SE Ranking login/plan that PDF came from before assuming the API-blocked account above is the same one.
- **Do not touch or replace the existing GSC connection.** GSC is free-tier-capped (30 days / 100 rows per your existing setup) but is the authoritative source for actual click/impression/query data. SE Ranking's role here is different and complementary: GSC tells you what's already happening; SE Ranking rank tracking tells you position for keywords GSC doesn't yet have volume on, and lets you track competitor positions GSC can't show at all.

## The core configuration problem

SE Ranking (like most rank trackers) defaults new projects to a **single target search engine + single location + single language**, usually whatever the account's home market is (India, `google.co.in`, English). If the 10 export markets are added to that single India-configured project, you get exactly the failure mode you asked me to avoid: **a blended average that looks like real performance data but is actually India rankings diluted by, or confused with, GCC/Africa/Indonesia rankings that were never actually measured there.**

SE Ranking's actual mechanism to avoid this is **per-keyword location targeting inside one project** (not one project per country) — each tracked keyword can be assigned its own search engine + location + language + device combination. The project itself stays singular (`shankeragencies.com`), but the keyword list is segmented by market.

## Required configuration, market by market

| Market | Search engine | Location granularity | Language | Priority keyword themes | Why this granularity |
|---|---|---|---|---|---|
| **India** (primary/home) | `google.co.in` | National, plus Delhi-NCR/Mumbai/Chennai/Ahmedabad city-level for the location pages already live | English | Existing core term set (already tracked — do not touch) | Already your best-covered market; only action is not letting it get overwritten when the others are added |
| **Saudi Arabia** | `google.com.sa` | National (Riyadh vs. Jubail/Dammam split once those pages exist — see `market-location-reconciliation.md`) | English (B2B procurement language; Arabic only if/when Arabic pages are built for this market) | "refractory supplier Saudi Arabia", "refractory Jubail/Dammam", grade-specific export terms | Riyadh/Jeddah are your only current pages; Jubail/Dammam tracking should exist *before* those pages are built, to measure baseline |
| **UAE** | `google.ae` | National | English | "refractory supplier UAE", "refractory Dubai/Abu Dhabi/Sharjah" | GetListedUAE + FreeListingIndia listings already point here — rank tracking should confirm those backlinks move anything |
| **Oman** | `google.com.om` | National (Muscat is the only current page; Sohar flagged as a build candidate) | English | "refractory supplier Oman", "refractory Sohar/Muscat" | Same logic as Saudi — track Sohar before deciding to build |
| **Qatar** | `google.com.qa` | National | English | "refractory supplier Qatar", industry-specific (LNG/petrochemical — Qatar's dominant industrial sector) | No current dedicated page found in `locationsData.js` — confirm before assuming coverage |
| **Kuwait** | `google.com.kw` | National | English | "refractory supplier Kuwait" | Same — verify current page coverage first |
| **Bahrain** | `google.com.bh` | National | English | "refractory supplier Bahrain" | Same |
| **Indonesia** | `google.co.id` | National | English (Bahasa Indonesia only if content is later localized) | "refractory supplier Indonesia" | Listed in footer's `internationalRegions` array but depth of dedicated content unverified — check before assuming parity with GCC pages |
| **South Africa** | `google.co.za` | National | English | "refractory supplier South Africa" | Not in the original P0 handoff's GCC/Oman focus — confirm this is an active target market before spending tracking budget on it |
| **Nigeria** | `google.com.ng` | National | English | "refractory supplier Nigeria" | Same caveat |
| **Kenya** | `google.co.ke` | National | English | "refractory supplier Kenya" | Same caveat |

## What "no misleading global averages" means concretely in the SE Ranking UI

1. **Never view the project's default "Overview" tab as a single number** once multi-market keywords are added — that tab blends all tracked keywords/locations into one average position, which is meaningless across 11 different search markets with different competitive density.
2. **Build a saved filter/tag per market** (SE Ranking supports keyword tagging) — tag every keyword with its market at creation time (`in`, `sa`, `ae`, `om`, `qa`, `kw`, `bh`, `id`, `za`, `ng`, `ke`), then always report using per-tag filtered views, never the unfiltered project average.
3. **Report position trends per market, not one blended trend line.** A rising India average and a flat/absent Saudi presence should never be allowed to net out to "SEO is improving" in a summary.

## Open items before this can move from spec to setup

- Confirm which SE Ranking account/plan the earlier PDF export came from, and whether it has API access or dashboard-only access.
- Confirm whether Qatar, Kuwait, Bahrain, South Africa, Nigeria, Kenya are genuinely active target markets (they appear in the footer's region list and blog content, but I did not find dedicated location pages for most of them in `locationsData.js` during this session — worth reconciling against your actual sales priorities before paying to track 11 markets' worth of keywords on a rank-tracking plan).
- Decide the keyword volume budget: SE Ranking bills per tracked keyword, so tracking ~5-10 keywords × 11 markets (55-110 keywords minimum) has a real cost implication I can't quote without knowing your current plan tier.

No SE Ranking configuration has been created or changed. This is a specification for your review only.
