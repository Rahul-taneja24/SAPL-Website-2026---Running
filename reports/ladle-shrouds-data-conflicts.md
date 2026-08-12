# Ladle Shrouds — Data Conflict Trace

Status date: 2026-08-12
Scope: trace the two contradictions flagged in `reports/ladle-shrouds-page-plan.md` back to every source in the repository. **No value is chosen. No page content written.** This report is an input to your decision, not a decision.

## Sources checked

| Source | Result |
|---|---|
| `productCatalogData.js` (`specs`, `keyProperties`, `whyChoose` fields for `ladle-shrouds`) | Contains data for both conflicts |
| `productDatasheetData.js` | **No entry exists for `ladle-shrouds`** — confirmed empty, this is exactly the gap the original page plan identified |
| `productFaqsData.js` (`ladle-shrouds` FAQ array) | Contains data for both conflicts |
| Page copy (`app/products/[categorySlug]/[productId]/page.jsx`) | No independent figures — pulls directly from the above 3 files, doesn't introduce new numbers |
| `productsData.js` (chemistry fallback) | Has an `al2o3`/`density` entry for "Ladle Shroud" but **no heat-life or dimension data at all** — doesn't participate in either conflict, though it does add a third, different Al₂O₃ range (70-85%) not asked about in this report but noted below for completeness |
| Manufacturer/TDS source | **None exists anywhere in the repository.** No citation, external reference, or sourced TDS document is attached to either figure in either file. Both are plain hardcoded values with no traceable origin. |

## Conflict 1: Heat life

| | Value | Source | Exact text |
|---|---|---|---|
| **Value A** | 1 heat (Std Pressed / Fused Silica grades), 1–3 heats (Iso Al₂O₃-C grade) | `productCatalogData.js:1023-1027` (`specs` array) | `{ grade: 'Iso Al₂O₃-C', ..., life: '1–3 heats' }`, `{ grade: 'Std Pressed', ..., life: '1 heat' }`, `{ grade: 'Fused Silica', ..., life: '1 heat' }` |
| **Value A (internally consistent)** | "1 heat (standard) or sequence" | `productCatalogData.js:1020` (`keyProperties`) | `{ label: 'Service Life', value: '1 heat (standard) or sequence' }` |
| **Value B** | 4–8 heats (standard Al₂O₃-C), 8–14 heats (ZrO₂-C reinforced) | `productFaqsData.js:355` | "A standard Al₂O₃-C shroud handles 4–8 heats in carbon steel sequence casting. ZrO₂-C reinforced slag-line shrouds extend life to 8–14 heats." |

**The two catalog fields (`specs` and `keyProperties`) agree with each other** — both describe roughly 1 heat as standard, with sequence casting extending life somewhat (the `specs` table's "1–3 heats" for the Iso grade is the catalog's own version of "or sequence"). The FAQ's figures are **2-4x higher** than the catalog's own numbers, and it's off by a similar order of magnitude for the higher-life scenario (8-14 vs 1-3).

**A partial explanation exists in the FAQ text itself, but it doesn't fully resolve the conflict**: the FAQ attributes its higher numbers to a "ZrO₂-C reinforced slag-line" variant — but **no such variant appears in the catalog's `grades` list** (`['Isostatically Pressed Al₂O₃-C', 'Standard Pressed', 'Fused Silica Shroud']`) or its `specs` table. So either (a) SAPL offers a ZrO₂-C reinforced grade that simply isn't listed in the catalog data, or (b) the FAQ is describing general industry-typical figures for a product tier that isn't actually part of SAPL's current lineup, or (c) one of the two files' baseline numbers is simply wrong.

**Which source is more authoritative, and why** (assessment only, not a chosen value): the `specs` table has the shape of data transcribed from a real product/grade breakdown (specific grade names, specific Al₂O₃/carbon percentages, specific application notes per grade) — that structure is consistent with the 10 products that already have real `PRODUCT_DATASHEETS` entries sourced from "typical, widely-published industry values" (per that file's own header comment). The FAQ, by contrast, reads like a general technical explainer written to answer a common buyer question, plausibly from general refractory-industry knowledge rather than SAPL's specific product line — its mention of a grade absent from the catalog supports this reading. That said, this is a structural/stylistic observation about how each was likely written, **not proof that one is factually correct** — either could still be the accurate figure for SAPL's actual product.

**What SAPL needs to verify**: does SAPL's actual ladle shroud product line include a ZrO₂-C reinforced slag-line variant? If yes, what is its real service life, and what is the real service life of the standard Al₂O₃-C grade — ideally against the manufacturer's (TRL Krosaki's) own TDS, which isn't present anywhere in this repository.

## Conflict 2: Dimensions

| | Value | Source | Exact text |
|---|---|---|---|
| **Value A** | 200–250 mm **OD** (outer diameter), lengths 700–900 mm | `productCatalogData.js:1034` (`whyChoose`) | "We stock ladle shrouds in standard ISO sizes (200–250 mm OD, lengths 700–900 mm) with 48-hour availability for custom sizes." |
| **Value B** | 60–110 mm **bore diameter** (inner), lengths 800–1800 mm | `productFaqsData.js:367` | "We supply alumina-graphite ladle shrouds with bore diameters 60–110 mm and lengths 800–1800 mm to match standard caster geometries." |

**This one is more nuanced than a simple contradiction, but doesn't fully resolve either.** OD (outside diameter, the full tube including refractory wall thickness) and bore diameter (the inner steel-contact bore) are genuinely different measurements on the same physical part — a shroud can legitimately have a ~200-250mm OD and a much smaller ~60-110mm bore, since the difference is wall thickness (roughly 45-70mm per side at the stated figures, which is a plausible, if thick, refractory wall). **So the diameter figures are not necessarily contradictory** — they may be describing two different dimensions of the same product.

**The length figures are harder to reconcile**: catalog says 700-900mm, FAQ says 800-1800mm. These overlap (800-900mm is common to both), but the FAQ's range extends to roughly double the catalog's stated maximum (1800mm vs 900mm) — a shroud twice as long is a materially different product, not just a different way of describing the same one.

**Which source is more authoritative, and why** (assessment only): same reasoning as Conflict 1 — the catalog's `whyChoose` line reads as an operational/stocking statement (specific ISO sizes, specific lead time for custom sizes), which suggests it may reflect what SAPL actually keeps in stock. The FAQ's range reads as broader industry-standard sizing ("to match standard caster geometries"), which could be describing the full range of what's theoretically available/producible rather than what SAPL specifically stocks. Again, this is a stylistic read, not a factual determination.

**What SAPL needs to verify**: (1) confirm whether "200-250mm" and "60-110mm" are indeed OD vs. bore of the same parts, or whether they describe genuinely different product lines; (2) confirm the real maximum length SAPL stocks/supplies — 900mm, 1800mm, or something else entirely.

## Additional data point found (not one of the two requested conflicts, noted for completeness)

`productsData.js` (the chemistry-fallback file) lists Al₂O₃ content as **70-85%** for "Ladle Shroud" — a third figure, different from both catalog `specs` grades (65-70% Iso, 60-65% Std). This wasn't part of the two contradictions you asked me to trace, but it's the same underlying pattern (multiple uncoordinated data sources with different numbers for the same product) and is worth resolving alongside the two above, at your discretion — flagged here rather than silently ignored, not expanded into a full trace since it's outside this report's requested scope.

## What this report does NOT do

- No value chosen for either conflict.
- No page content written.
- No assumption that either source is correct — the "which is more authoritative" analysis above is about the likely provenance/writing context of each source, not a factual verdict.
