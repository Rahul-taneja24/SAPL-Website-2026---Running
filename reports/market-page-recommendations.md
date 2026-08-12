# Market Page Recommendations: Saudi Arabia & Oman

Status date: 2026-08-11
Scope: item 8 — proposed information architecture only. **No pages created, moved, or deleted this pass.** Builds directly on the investigation already done in `reports/market-location-reconciliation.md`; this report adds the cannibalization-risk and page-type-recommendation columns requested, plus a concrete IA proposal.

## Current architecture (repo-verified)

- `/refractory-supplier-in` — one index page, cities grouped by region (`India`, `GCC`, `ASEAN`, `Africa`, `Europe`) via `REGION_META` in [`app/refractory-supplier-in/page.jsx`](frontend/app/refractory-supplier-in/page.jsx).
- `/refractory-supplier-in/[citySlug]` — flat city pages, one level deep. **There is no intermediate country-hub page** (no `/refractory-supplier-in/saudi-arabia` or `/markets/saudi-arabia`) — Riyadh and Jeddah sit as siblings directly under the GCC region grouping on the index page.
- Saudi Arabia currently has 2 city pages (`riyadh`, `jeddah`). Oman has 1 (`muscat`).

This matters for "country page stays primary unless evidence says otherwise": there currently is no country page to be primary — the de facto "primary" surface for Saudi/Oman today is the GCC section of the shared index page. Any recommendation below has to either (a) keep that as the primary surface and add city pages under it, or (b) explicitly propose introducing a country-hub layer, which is a bigger IA change than instructed to make in this pass. I'm recommending (a).

## Per-city recommendation table

| City | Existing coverage | GSC data (last 30d) | Rankings | Industrial/procurement relevance | SAPL commercial relevance | Cannibalization risk | Should a dedicated page exist? | Recommended page type |
|---|---|---|---|---|---|---|---|---|
| Riyadh | Live page (`/refractory-supplier-in/riyadh`) | 8 clicks, 140 impressions, avg. position 5.8 | Ranking, modest but real | Low — administrative/commercial capital, not a heavy-industry corridor | Unknown, needs your input | Low today (only Saudi city page with real traffic) | Yes — keep, it has proven traction | Keep as-is; reposition copy toward commercial/logistics-intent buyers rather than heavy-industry, since that's what the traffic profile suggests it's actually capturing |
| Jeddah | Live page | Not in top 100 rows pulled — effectively invisible | Unranked / no signal | Moderate — major port, general commercial | Unknown | Low (no traffic to cannibalize) | Keep, but low priority for further investment until it shows signal | Keep as-is, no new investment until GSC shows movement |
| **Jubail** | **No page exists** | No data (nothing to measure) | Unranked | **High** — ~7% of Saudi GDP, steel/petrochemical/aluminium heartland, independently verified | Unknown, needs your input | **Medium** — a new Jubail page and the existing Riyadh page could both compete for the head term "refractory supplier Saudi Arabia" if not differentiated; needs distinct on-page intent (Jubail = heavy industry/plant-direct, Riyadh = commercial/logistics) to avoid self-competition | **Yes — real gap, build first** | New city page, `/refractory-supplier-in/jubail`, following the existing template but written for heavy-industry procurement intent (steel/petrochemical/aluminium), not the generic template |
| **Dammam** | **No page exists** | No data | Unranked | **High** — industrial + port + logistics core, adjacent to Jubail | Unknown | **Medium**, same reasoning as Jubail — Dammam and Jubail are geographically adjacent and could cannibalize each other if content isn't differentiated (Jubail = manufacturing plants, Dammam = port/logistics/steel) | **Yes — real gap, build alongside Jubail** | New city page, differentiated from Jubail on port/logistics angle vs. Jubail's plant-direct angle |
| Yanbu | No page exists | No data | Unranked | High — second refining/petrochemical hub, west coast | Unknown | Low (geographically distinct from Jubail/Dammam/Riyadh, west vs. east coast) | Worth doing, but after Jubail/Dammam prove out | New city page, phase 2 |
| Muscat | Live page | 10 clicks, 138 impressions, avg. position 11.5 | Ranking, modest | Low-moderate — secondary/finishing steel only | Unknown | Low | Yes — keep, has real traction | Keep as-is, reposition toward commercial-intent, same logic as Riyadh |
| **Sohar** | **No page exists** | No data | Unranked | **High** — Oman's only primary aluminium smelter + steel EAF + port | Unknown, needs your input | Low (no existing Oman page competes on heavy-industry terms today) | **Yes — real gap, build first (alongside Jubail/Dammam)** | New city page, `/refractory-supplier-in/sohar`, heavy-industry intent (aluminium smelting, steel EAF) |
| Salalah | No page exists | No data | Unranked | Moderate — secondary port/freezone | Unknown | Low | Lower priority — build only if demand is confirmed later | Not recommended yet |

## Proposed IA (not implemented)

1. **Keep the flat city-page structure** — do not introduce a country-hub layer (`/markets/saudi-arabia`) in this phase. That's a bigger architectural change (also flagged as Phase 5 in the existing roadmap) and isn't justified yet by the data — the region-grouped index page already serves that aggregation role reasonably well.
2. **Build 3 new city pages in this order**: Jubail → Dammam → Sohar. These are the only 3 with independently verified heavy-industry relevance and zero current coverage. Yanbu next, Salalah only if demand later confirmed.
3. **Differentiate new pages from existing ones on intent, not just geography**, specifically to manage the cannibalization risk flagged above:
   - Riyadh / Muscat → commercial, logistics, general-procurement framing (matches what their existing modest traffic appears to be capturing).
   - Jubail / Dammam / Sohar → plant-direct, heavy-industry framing (steel/petrochemical/aluminium furnace linings, EAF, smelter-grade materials) — distinct search intent, distinct content, minimal head-term overlap.
4. **Do not write "SAPL serves Jubail/Dammam/Sohar" as an established fact** until you confirm actual commercial history there (existing enquiries, quotes, shipments). This is the same unsubstantiated-claim risk already flagged for the grade-count and factory-direct-pricing items — a new market page making an unverifiable service claim is the same category of problem, just in a new location.

## Still blocked on your input (unchanged from the prior investigation)

- SAPL's actual commercial relevance to Jubail, Dammam, Yanbu, Sohar, Salalah — no CRM/RFQ export was available to check this from the repo. This is the single biggest gate before writing content for any of the 3 recommended new pages.
- Whether Qatar, Kuwait, Bahrain fit into this same city-level expansion — out of scope for this report (Saudi/Oman only, per your original instruction), but worth the same treatment once Saudi/Oman are resolved.

No pages have been created. This is a recommendation for your review and approval before any build work starts.
