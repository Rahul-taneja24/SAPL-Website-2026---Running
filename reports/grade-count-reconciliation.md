# Grade-Count Reconciliation: "200+ grades" vs. "118"

Investigation only. No production changes made.

---

## 1. What does "118 grade rows" represent?

Every count of "118" in this session's prior work is the sum of `specs[]` array rows
across all 32 products in `frontend/src/data/productCatalogData.js`. Recomputed fresh for
this report, product by product:

| Product | Grade rows |
|---|---|
| mullite-bricks | 3 |
| andalusite-bricks | 2 |
| fused-cast-azs-blocks | 3 |
| zircon-bricks | 2 |
| alumina-carbon-bricks | 3 |
| magnesia-carbon-bricks | 3 |
| high-alumina-bricks | 6 |
| fireclay-bricks | 5 |
| insulating-fire-bricks | 5 |
| basic-bricks | 5 |
| silicon-carbide-bricks | 4 |
| plastic-refractories | 3 |
| low-cement-castables | 4 |
| ultra-low-cement-castables | 4 |
| ramming-masses | 4 |
| gunning-materials | 3 |
| refractory-mortars | 7 |
| conventional-castables | 5 |
| monoblock-stoppers | 2 |
| tundish-nozzles | 2 |
| well-blocks | 3 |
| slide-gate-plates | 4 |
| ladle-shrouds | 3 |
| subentry-nozzles | 3 |
| porous-plugs | 3 |
| microporous-insulation | 3 |
| ceramic-fiber-products | 6 |
| calcium-silicate | 3 |
| carbon-bricks | 3 |
| acid-proof-cement | 3 |
| acid-proof-bricks | 5 |
| acid-resistant-tiles | 4 |
| **Total (32 products, all with specs)** | **118** |

This is SAPL's own **normalized grade ladder** per product (e.g. HA-45 through HA-90 for
high alumina bricks), each row backed by a real spec table (Al₂O₃%, density, CCS, AP,
PCE, temp) already used to generate the [now-held] grade detail pages.

## 2. What does "200+ grades" claim to represent?

Found in exactly one place in the source content, duplicated in two files:

- `src/sections/Products.jsx:882` (live, public page)
- `src/admin/pages/Products.jsx:1492` (near-identical text, in an internal admin route
  at `app/admin`, confirmed to exist as a real Next.js route; whether it's indexable
  wasn't confirmed, see open item below)

Both instances are unsourced marketing copy on a "can't find what you need" CTA block,
not a computed or footnoted figure. No file, spreadsheet, comment, or data structure in
the repository enumerates 200 (or any number near it) of anything.

## 3. Are there duplicate grades?

Checked every grade label across all 32 products' `specs[]` arrays for exact-string
duplication: **116 unique labels out of 118 rows.** Two labels repeat:
- `Al₂O₃-ZrO₂-C` (appears in 2 different products)
- `Fused Silica` (appears in 2 different products)

Both look like a shared generic material-type label reused across two related product
families (not the same grade double-counted within one product), plausible and likely
intentional, but worth a human check since it wasn't possible to confirm intent from
the data alone.

## 4. Are sizes/variants counted as separate grades?

No. Each `specs[]` row is one chemistry/property grade (e.g. `HA-45`, `HA-70`). Sizes and
shapes are handled separately (dimensions, custom shapes to drawing) and don't appear as
additional rows anywhere in the catalog structure. The 118 count is not inflated by
size/shape variants, nor could it be deflated by merging them, they were never counted.

## 5. Are manufacturer grades being mixed with SAPL's catalogue grades?

No, and this is the most likely source of the discrepancy. SAPL's own catalog
deliberately **normalizes** to one representative grade ladder per product family. But
FAQ and product content elsewhere in the repo references real, additional
**manufacturer-specific** grade series that are not reflected as rows in
`productCatalogData.js` at all:

- CUMILITE (CUMI's mullite/andalusite brand): "M-60 to M-72 grades"
- Calderys castables: "ACCMON, ULTRACASTING, KERAFLEX series... each manufacturer has
  4-6 grades" (`productFaqsData.js:205`)
- Fireclay: STD-30, STD-40, HFK series (`Downloads.jsx:19`)
- IFB: K-23, K-26, K-28, K-30, K-32 (`productFaqsData.js`, `productsSeoData.js`)

None of these manufacturer-series grades are counted in the 118. If someone mentally
totaled "every grade across every brand partner SAPL can source" rather than "every grade
in SAPL's own normalized catalog," a number well above 118 is plausible, this is almost
certainly where "200+" originated. But nowhere in the repo is that total actually
enumerated or added up. It's a directionally plausible mental estimate, not a documented
figure.

## 6. Are some grades hidden from the structured catalogue?

Yes, per finding 5. The manufacturer-series names above exist only as prose mentions in
FAQ/downloads content, not as structured, filterable, individually-specified catalog
entries. They are real (verified against your own brand-partner FAQ content) but not
currently backed by individual spec data (Al₂O₃%, CCS, etc.) the way the 118 documented
grades are.

## 7. Are some grades present only in TDS/product data?

`productDatasheetData.js` was checked, it provides **family-level** typical-value ranges
(e.g. "45-90% Al₂O₃" as one range for the whole high-alumina family), not additional
per-grade rows beyond what's in `productCatalogData.js`. It doesn't add to the 118, it
corroborates the same 32 product families from a different angle.

## 8. Is "200+" supported by any source?

**No.** Not by the structured catalog, not by the datasheet file, not by any comment,
spreadsheet, or external document found in the repository. It is unsourced copy. The
closest thing to a rationale is the manufacturer-series aggregation logic in finding 5,
which is plausible but not documented or totaled anywhere.

## 9. What is the defensible number we can publicly claim today?

**118 documented grades across 32 refractory products**, each backed by a real spec
table, is fully defensible right now.

Applying a safety margin (so the claim doesn't go stale the next time a grade is
added or removed, the same logic implicit in any "X+" framing): **"100+ documented
grades across 30+ refractory products"** is directly supportable, 118 ≥ 100 and 32 ≥ 30,
both true today with headroom. This mirrors the phrasing pattern you asked about, and
it's arrived at from the actual verified counts above, not copied from your example.

**"200+" is not currently defensible** and should not be used until either (a) the
manufacturer-series grades are formally enumerated and added to a real count, or (b) a
lower, sourced number replaces it.

## 10. What additional source/data would be required to legitimately use "200+"?

A real enumeration of manufacturer-specific grade series, e.g.:
- Full CUMILITE grade list (not just "M-60 to M-72" as a range descriptor)
- Full Calderys ACCMON/ULTRACASTING/KERAFLEX grade counts per series
- Full TRL Krosaki, Mahakoshal, Divine Cerawool, Crown Ceramics, Saint-Gobain grade
  lists where SAPL resells their branded grades under license/dealership

If those five to seven manufacturer partners' catalogs were tallied and genuinely sum to
200+, that number becomes defensible, but as a claim about the **combined sourcing
network**, not about SAPL's own normalized product catalog. The copy would need to say
so explicitly ("200+ grades across our manufacturer partner network") rather than
implying it's all in one browsable catalog, which is what the current placement (a "how
many can we show you" CTA on the product hub) currently implies.

---

## Open items, not resolved here

- Whether `src/admin/pages/Products.jsx` (with the same "200+" text) is a live,
  crawlable, or indexed route wasn't confirmed, flagged separately in the conflicts
  register.
- Whether the two duplicate grade labels (`Al₂O₃-ZrO₂-C`, `Fused Silica`) are intentional
  shared terminology or a data-entry oversight needs a human check, low severity either
  way since they don't affect the count's validity.
