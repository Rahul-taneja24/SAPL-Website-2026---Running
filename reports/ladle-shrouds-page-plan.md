# Ladle Shrouds Page Plan

Status date: 2026-08-12
Scope: first technical SEO/content improvement under the approved P0 implementation phase. **Planning only — the page has not been edited.** Covers `/products/flow-control/ladle-shrouds`.

## 1. Current state (as actually rendered, verified in code)

**Title** (`generateMetadata`, from `productsSeoData.js:79-83`): "Ladle Shrouds for Continuous Casting | SAPL"

**Meta description**: "Ladle shrouds (Al₂O₃-C) for continuous casting, prevent steel reoxidation during transfer. Standard ISO sizes stocked. Price on enquiry."

**H1** (`productCatalogData.js:1003`): "Ladle Shrouds for Continuous Casting"

**Current content** (`productCatalogData.js:1001-1035`):
- `shortDesc`: "Shield the steel stream from oxidation during ladle-to-tundish transfer"
- `fullDesc`: one paragraph explaining function and the oxidation/inclusion problem it solves
- `grades`: 3 named grades (Isostatically Pressed Al₂O₃-C, Standard Pressed, Fused Silica Shroud) — but no property values attached, just names
- `applications`: 3 bullet points (ladle-to-tundish transfer, sequence casting, high-grade steel/low inclusion)
- `brands`: ["TRL Krosaki", "Leading Flow-Control Manufacturers"] — the second entry is a vague, non-specific placeholder
- `keyProperties`: 6 label/value pairs (material, manufacturing, thermal shock, argon purging, service life, connection system)
- `specs`: a 3-row table (Iso Al₂O₃-C / Std Pressed / Fused Silica) with al2o3, carbon, application, life — reasonably rich but **no test standard citations** (no IS/ASTM references, unlike the 10 products that have a real `PRODUCT_DATASHEETS` entry)
- `installation`: 4 step bullets (pre-heat, anti-oxidation paste, argon purge rate, bayonet lock check) — genuinely good, plant-practical detail
- `whyChoose`: one line on stocked sizes and lead time

**Current technical data**: **No `PRODUCT_DATASHEETS` entry exists for `ladle-shrouds`** (confirmed by direct lookup in `productDatasheetData.js` — absent from the 10 products that have one). The `specs` array above is the only structured technical data, and it lacks the chemical-analysis/physical-properties/test-standard format used by the 10 datasheet-equipped products (e.g. IS 1528, ASTM C133 style citations).

**Existing FAQ content** (`productFaqsData.js:344-369`): **6 genuinely strong, technically detailed FAQs already exist** — what a ladle shroud is, material composition (Al₂O₃-C body, ZrO₂-C slag-line reinforcement), heat life (4-8 standard, 8-14 for ZrO₂-C reinforced — note this contradicts the catalog's `specs` table, which says "1–3 heats" for the same Iso Al₂O₃-C grade; flagged below as a data inconsistency to resolve, not yet fixed), open vs. submerged shroud distinction, reusability, and size range (60-110mm bore, 800-1800mm length — again note this differs from the catalog's stated "200–250 mm OD, lengths 700–900 mm" in `whyChoose`, a second inconsistency). **Confirmed these FAQs render visibly on the page**, not schema-only: `src/sections/Products.jsx:405` renders `<ProductFAQ faqs={faqs} accent={meta.accent} />` as an accordion, with the component's own comment noting "Answer always in DOM so crawlers read all FAQ content." So this content is already both human-visible and crawlable — good news, one open question resolved, no gap to fix here.

**Existing schema**: Product schema (with `additionalProperty` pulled from `catalogEntry.specs` and `grades`), HowTo schema (from `installation` steps), FAQPage schema (from the 6 FAQs above), BreadcrumbList. This is a solid schema foundation already in place — the plan below adds to it, doesn't replace it.

**Data inconsistencies found while inspecting** (not fixed in this pass, flagged for your decision):
1. Heat life: catalog `specs` says "1–3 heats" for Iso Al₂O₃-C; FAQ says "4–8 heats" standard, "8–14 heats" for ZrO₂-C reinforced. These read as two different claims about the same thing.
2. Dimensions: catalog `whyChoose` says "200–250 mm OD, lengths 700–900 mm"; FAQ says "bore diameters 60–110 mm and lengths 800–1800 mm". OD vs. bore diameter are technically different measurements (outer vs. inner), so this may not be a true contradiction — but as written, a reader can't tell that's the explanation.
3. `productsData.js` fallback entry (id 24) lists Al₂O�3 "70-85%" vs. the catalog `specs` table's 65-70%/60-65% for the two named alumina-carbon grades — a data-quality gap consistent with the "no automated cross-file consistency check" issue flagged in `reports/product-data-architecture.md`.

## 2. Current GSC signal (last 30 days, confirmed live pull)

| Metric | Value |
|---|---|
| Clicks | 1 |
| Impressions | 21 |
| Position | 7.2 |

This was the #1-ranked item in `reports/technical-html-priority.md`'s priority list specifically because it's the only product with a confirmed real GSC position **and** zero technical datasheet — meaning there's already-proven query interest at a page already ranking respectably (position 7.2 is page 1, near the bottom), with no crawlable technical content to strengthen it. Query-level breakdown (which exact search terms drive the 21 impressions) was not retrievable — the free-tier GSC connector's 100-row cap, sorted by clicks, doesn't surface this page's individual queries within that cap; only the page-level aggregate was available.

## 3. Target search intents

Based on the product's role (ladle-to-tundish transfer component) and the existing FAQ content, the realistic buyer/researcher intents are:
1. **What is a ladle shroud** — definitional/educational, already well-served by FAQ #1
2. **Material/composition** — "ladle shroud material", "Al2O3-C shroud composition" — served by FAQ #2, but not by a structured datasheet
3. **Life/consumption** — "how many heats ladle shroud" — served by FAQ #3, but internally inconsistent with catalog data (see above)
4. **Sizing/procurement** — "ladle shroud size", "ladle shroud supplier India" — partially served, inconsistent dimensions
5. **Technical comparison** — "open vs submerged shroud" — served by FAQ #4, good content
6. **International/export** — no current signal, but this is a recurring plant-consumable purchase relevant to the GCC steel plants named elsewhere on the site (worth a light touch, not a rewrite, per the international-opportunity criterion)

## 4. Missing technical information

- No structured chemical-analysis table (Al₂O₃%, C%, SiO₂% etc. with test method citations like the 10 datasheet-equipped products have)
- No physical-properties table (bulk density, apparent porosity, cold crushing strength, thermal shock cycles) — the `keyProperties` array has qualitative values ("Excellent") rather than quantitative ranges
- No resolution of the heat-life and dimension inconsistencies noted above
- `brands` array's second entry ("Leading Flow-Control Manufacturers") is a non-specific placeholder, not a real brand name — should be replaced with an accurate value or removed

## 5. Proposed page structure (not yet applied)

1. Keep existing hero (H1, shortDesc, fullDesc) — no change needed, it's accurate and concise
2. **New**: structured technical datasheet block, matching the format of the 10 existing `PRODUCT_DATASHEETS` entries (chemical analysis + physical properties + applicable test standards), sourced from resolving the two data inconsistencies above — this requires your input on which figure is correct (catalog's 1-3 heats / 200-250mm OD vs. FAQ's 4-14 heats / 60-110mm bore), not something I can resolve by picking one arbitrarily
3. Keep `keyProperties`, `specs`, `installation`, `whyChoose`, and the existing visible FAQ accordion as-is — all good, already-working content, no rewrite needed
4. **New**: the open-vs-submerged-shroud comparison (already covered well in FAQ #4) could be lightly expanded into its own short body-content block rather than staying only inside the FAQ accordion, since it's a genuinely common buyer decision point — optional, not essential

## 6. Proposed FAQ (no new FAQs needed)

The existing 6 FAQs in `productFaqsData.js` are technically sound, buyer-relevant, and already render visibly on the page. No new FAQ writing is needed for this pass — a 7th FAQ ("what's the difference between ladle shroud and SEN") could be added later if you want to strengthen the flow-control cluster's internal linking, but isn't necessary now.

## 7. Proposed comparison content

Ladle shroud vs. subentry nozzle (SEN) — both are flow-control components in the same casting sequence, both have catalog entries, and this is a genuine buyer question (which one do I need, or do I need both). A short comparison table (function, position in the casting line, typical life, material) would serve real search intent without inventing unverifiable claims, since both products' base specs already exist in `productCatalogData.js`.

## 8. Internal links (gap confirmed)

**Zero editorial/contextual internal links point to this page today** — confirmed by grepping the entire `app/` and `src/` tree for the literal path; the only references are the page's own route file and its own data-file entries. The category page (`/products/flow-control`) presumably links to it structurally via the product grid, but no blog post or guide references it by name or link.

Thematically relevant existing blog posts that could reasonably link here (not yet linked, confirmed by content topic match):
- `steel-ladle-refractory-selection-guide`
- `steel-ladle-refractory-lining-material-selection-campaign-life`
- `slide-gate-plate-selection-guide-steel-ladles`
- `slide-gate-flow-control-explained`
- `bottom-pouring-set-refractory-components-guide`
- `monolithic-vs-brick-steel-ladle-lining`

Adding contextual links from these 6 posts to the ladle-shrouds product page would be a safe, mechanical follow-up once the page content itself is approved — not proposed as an action in this report, just identified as the logical next step.

## 9. CTA

Current page's CTA pattern (shared across all product pages, unchanged): "Get Quote" / contact flow via `Products.jsx`. No product-specific CTA change proposed — this is a shared component, and per your no-mass-implementation instruction, changing shared CTA components is out of scope for a single-product plan.

## 10. Schema recommendations

- **Keep** existing Product/HowTo/FAQPage/BreadcrumbList schema — all sound.
- **Extend** `additionalProperty` once the datasheet block is added, to include the resolved chemical/physical values (currently only pulls from `specs` and `grades`, which is thinner than a full datasheet would provide).
- **No new schema types needed** — the existing schema architecture already covers what this page needs; the gap is in the underlying data (missing datasheet), not the schema layer.

## What this report does NOT do

- The page has not been edited.
- The two data inconsistencies (heat life, dimensions) are not resolved — this needs your input on which source is correct before any datasheet content is written, since I won't guess between two conflicting numbers already in your own codebase.
- No internal links added yet.
- No comparison content written yet.

## Next step

This plan is ready for your review. On approval, and once you confirm the correct heat-life and dimension figures, the actual page edit (adding the datasheet block) becomes a scoped, mechanical follow-up — not started yet.
