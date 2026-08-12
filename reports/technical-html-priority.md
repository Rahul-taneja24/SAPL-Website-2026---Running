# Technical HTML / TDS Priority Ranking

Status date: 2026-08-11
Scope: item 10 — rank the top 20 highest-value product pages for crawlable technical-datasheet HTML, using real GSC data plus product-importance/completeness signals. **No page rewrites made.**

## Method and a real limitation, stated up front

Pulled live GSC page-level data (last 30 days, `dimensions=page`, 100-row cap — this is the free-tier ceiling, not a choice). Cross-referenced against `PRODUCT_DATASHEETS` in `productDatasheetData.js` to see which of the 32 catalog products already have structured technical HTML and which don't.

**Real constraint**: the GSC free-tier 100-row cap means most individual `/products/[category]/[productId]` pages simply don't appear in the pull — either because they truly have near-zero impressions, or because they're outside the top 100 rows sorted by clicks. I cannot tell those two cases apart on this plan. So for products with no GSC row, the ranking below falls back to product-category reasoning (flow control and furnace-critical categories are inherently higher commercial value per inquiry even at lower search volume, since these are recurring plant-consumable purchases, not one-off retail items) rather than fabricating traffic numbers. This is flagged per row.

## Current technical HTML coverage (verified in code)

**10 of 32 products already have a structured, indexable `PRODUCT_DATASHEETS` entry**: `high-alumina-bricks`, `fireclay-bricks`, `insulating-fire-bricks`, `mullite-bricks`, `magnesia-carbon-bricks`, `low-cement-castables`, `ultra-low-cement-castables`, `ramming-masses`, `ceramic-fiber-products`, `slide-gate-plates`.

**22 have none**: `andalusite-bricks`, `fused-cast-azs-blocks`, `zircon-bricks`, `alumina-carbon-bricks`, `basic-bricks`, `silicon-carbide-bricks`, `plastic-refractories`, `gunning-materials`, `refractory-mortars`, `conventional-castables`, `monoblock-stoppers`, `tundish-nozzles`, `well-blocks`, `ladle-shrouds`, `subentry-nozzles`, `porous-plugs`, `microporous-insulation`, `calcium-silicate`, `carbon-bricks`, `acid-proof-cement`, `acid-proof-bricks`, `acid-resistant-tiles`.

## GSC evidence for pages already indexed (last 30 days)

| Page | Clicks | Impressions | Position | Has datasheet today? |
|---|---|---|---|---|
| `/products/unshaped-refractories/ramming-masses` | 5 | 400 | 10.1 | Yes |
| `/products/unshaped-refractories/ultra-low-cement-castables` | 1 | 97 | 7.3 | Yes |
| `/products/acid-proofing` (category page) | 2 | 102 | 26.9 | N/A — category, not product |
| `/products/flow-control` (category page) | 1 | 55 | 17.2 | N/A — category |
| `/products/flow-control/ladle-shrouds` | 1 | 21 | 7.2 | **No** — decent position (7.2) with no datasheet, real gap |
| `/products/shaped-refractories/insulating-fire-bricks` | 1 | 16 | 3.9 | Yes — already ranking well, datasheet likely helping |
| `/products/shaped-refractories/magnesia-carbon-bricks` | 1 | 15 | 9.3 | Yes |
| `/products/unshaped-refractories/low-cement-castables` | 1 | 10 | 6.7 | Yes |
| `/products/acid-proofing/acid-proof-bricks` | 1 | 3 | 46.0 | **No** — weak position, and no datasheet |

Every other one of the 32 product-detail URLs did not appear in the 100-row pull at all.

## Top 20 priority ranking

Ranked by: (1) confirmed GSC signal where it exists, (2) commercial value per category — flow control and furnace-critical consumables are recurring, high-margin, technically-differentiated purchases even at low search volume, (3) international opportunity — categories that already show up in blog content targeting GCC/export buyers (aluminium smelters, EAF, steel ladles), (4) technical completeness gap — products with real GSC presence but no datasheet outrank products with neither.

| Rank | Product | Category | Why it's ranked here |
|---|---|---|---|
| 1 | `ladle-shrouds` | Flow Control | **Only product with confirmed real GSC position (7.2) and zero datasheet.** Highest-confidence quick win in the whole list. |
| 2 | `acid-proof-bricks` | Acid Proofing | Confirmed GSC row, but weak position (46.0) — a real technical datasheet is a plausible lever to move this, unlike products with no signal at all |
| 3 | `subentry-nozzles` | Flow Control | No GSC row, but same high-value flow-control category as the confirmed `slide-gate-plates`/`ladle-shrouds` cluster — steel-plant continuous casting consumable, recurring order pattern, technical spec is the actual purchase decision driver for this category |
| 4 | `tundish-nozzles` | Flow Control | Same reasoning as above — completes the flow-control technical cluster alongside slide-gate-plates (has datasheet) and ladle-shrouds/subentry-nozzles |
| 5 | `well-blocks` | Flow Control | Same flow-control cluster, rounds out the continuous-casting consumable family |
| 6 | `porous-plugs` | Flow Control | Same cluster — ladle metallurgy consumable, technical spec (gas permeability, brick grade) is a common buyer search pattern in this category based on the blog's steel-ladle content already ranking |
| 7 | `conventional-castables` | Unshaped | Direct sibling of `low-cement-castables`/`ultra-low-cement-castables`, both of which already have datasheets and real GSC traffic — closing this gap completes the castable family |
| 8 | `gunning-materials` | Unshaped | The blog post "gunning-vs-casting-when-to-use" is already a top-3 traffic page (13 clicks, 1132 impressions) — there's proven query demand for this topic with no corresponding product-level technical page to capture the commercial-intent portion of that traffic |
| 9 | `microporous-insulation` | Insulation | `ceramic-fiber-products` already has a datasheet and real query interest (the "ceramic-fiber-blanket-vs-insulating-fire-brick" blog post gets 688 impressions) — microporous is the premium-tier sibling product, same buyer research journey |
| 10 | `calcium-silicate` | Insulation | Same insulation cluster, rounds out the family alongside ceramic fiber and microporous |
| 11 | `basic-bricks` | Shaped | Core steel/cement furnace lining category, sibling to `magnesia-carbon-bricks` (has datasheet, real GSC position 9.3) — same buyer segment |
| 12 | `silicon-carbide-bricks` | Shaped | High-temperature specialty product (kiln/incinerator linings) — technical spec (thermal shock resistance, SiC content) is the primary differentiator buyers search for; no current datasheet |
| 13 | `alumina-carbon-bricks` | Shaped | Steel-industry lining product, adjacent to the already-covered `magnesia-carbon-bricks` |
| 14 | `carbon-bricks` | Shaped | Blast-furnace-specific application — directly relevant to the "india-blast-furnace-wave-2026-refractory-demand" news page already getting impressions, no product-level technical page to capture that demand |
| 15 | `plastic-refractories` | Unshaped | Furnace-repair/patching product, common technical-spec search pattern (plasticity, ramming behaviour), no datasheet today |
| 16 | `refractory-mortars` | Unshaped | High-frequency, lower-value-per-order product but very high query volume category generally (installation/jointing material) — worth a lightweight datasheet even if individually lower priority than the flow-control/insulation items above |
| 17 | `fused-cast-azs-blocks` | Shaped | Glass-industry-specific (AZS = alumina-zirconia-silica, used in glass furnace linings) — narrow but high-value niche, international opportunity given glass manufacturing is a named target industry in `Footer.jsx`'s industry list |
| 18 | `zircon-bricks` | Shaped | Same glass-industry niche as AZS blocks, often searched together |
| 19 | `andalusite-bricks` | Shaped | Specialty high-alumina alternative, lower search volume expected but completes technical coverage for the shaped-refractories category |
| 20 | `acid-proof-cement` / `acid-resistant-tiles` | Acid Proofing | Rounds out the acid-proofing family alongside `acid-proof-bricks` (already ranked #2) — chemical-industry buyers researching one acid-proofing product typically need the whole system (bricks + cement + tiles), so technical completeness across the family matters even though individual query volume is likely low (`acid-proof-bricks` itself only shows 3 impressions/30 days) |

`monoblock-stoppers` is the one remaining product without a datasheet and not in the top 20 — flow-control category but a narrower/lower-frequency purchase than the other 5 flow-control items already ranked; worth doing after the top 20, not before.

## What this report does NOT do

- No product page has been rewritten or had a datasheet added.
- No claim about actual search volume for products with zero GSC rows — ranked on category/commercial reasoning instead, explicitly labeled as such above, not presented as measured data.
- No recommendation on datasheet content itself (property values, test standards) — that would require the same "typical, widely-published industry values, not copied from a manufacturer PDF" sourcing discipline used for the existing 10, which is real content work, not a mechanical task.
