# Product Data Architecture

Status date: 2026-08-11
Scope: item 11 — document the existing product-data architecture as the source of truth. Confirms the earlier `already-built-vs-missing.md` conclusion: **do not create the handoff's proposed `product_master.json`.** No new files created, no data restructured.

## The 6 files that make up the real architecture

| File | Role | Lines | Live-routed? |
|---|---|---|---|
| `productCatalogData.js` | **Primary/rich source.** `PRODUCT_CATALOG`, keyed by category → product, holds applications, specs, installation notes, `whyChoose` copy, brand list, images. This is what the product detail page's own comment calls "the rich data." | 1,424 | Yes — imported directly by both `src/sections/Products.jsx` and `app/products/[categorySlug]/[productId]/page.jsx` |
| `productsData.js` | **Lightweight fallback.** `PRODUCTS_DATA`, a flat array with chemistry fields (`al2o3`, `density`, `temp`) and `brand`. The route code's own comment: "Lightweight DATA entry (chemistry / brand), fallback when catalog missing." Used when a catalog entry is thin or absent, and as the source for some schema.org `additionalProperty` chemistry values. | 76 | Yes — imported by both product route files |
| `productDatasheetData.js` | Structured technical datasheets (`PRODUCT_DATASHEETS`) — chemical analysis, physical properties, test standards. Explicitly documented in its own header comment as SAPL's own editorial compilation, not copied from a manufacturer PDF. Covers 10 of 32 products today (see `reports/technical-html-priority.md`, item 10). | 175 | Yes |
| `productFamiliesData.js` | Category/family-level grouping data | 307 | Not checked in this pass — not relevant to this item's scope |
| `productFaqsData.js` | Per-product FAQ content, `getProductFaqs(productId)` | 838 | Yes — imported by the product detail route |
| `productsSeoData.js` | Per-product SEO metadata (`PRODUCT_SEO`, `getProductSeo`) | 278 | Yes — imported by the product detail route |
| `gradeAliasData.js` | **New this session, uncommitted.** SK-grade (Seger Kegel) equivalence mapping built for the grade-detail-page route (`app/products/[categorySlug]/[productId]/[grade]/`), also uncommitted. Not yet part of the "live" architecture — sitting ready but not shipped. | 229 | No — new, not yet committed |

## Why this is not a mess, even though it's 6+ files

The product detail route (`app/products/[categorySlug]/[productId]/page.jsx`) explicitly documents the layering in its own comments:

```
// Catalog entry has the rich data: applications, specs, installation, etc.
const catalogEntry = PRODUCT_CATALOG[categorySlug]?.products?.find(...)

// Lightweight DATA entry (chemistry / brand), fallback when catalog missing
const product = PRODUCTS_DATA.find(...)
```

Every field pull in the route falls back gracefully: `catalogEntry?.name || seo?.name || product?.name`, `catalogEntry?.images?.[0] || product?.image || <OG fallback>`. This is a deliberate, working fallback chain — not an accidental duplicate-source problem. The separation by concern (catalog = content, productsData = chemistry, datasheetData = technical specs, faqsData = FAQs, seoData = metadata) is a reasonable division of a large dataset across files that would otherwise be one unmanageable multi-thousand-line file.

## Why the handoff's `product_master.json` should not be created

Confirmed again this pass, consistent with `reports/already-built-vs-missing.md`: the handoff package's proposed empty `product_master.json` schema is shallower than what already exists across these 6 files combined (no chemistry fields, no FAQ structure, no datasheet structure, no SEO metadata structure). Creating it would mean either (a) a 7th competing, thinner data source that the live routes don't even read, or (b) a large, risky migration to move 32 products' worth of data from 6 working files into 1 new schema for no functional gain. Neither is justified. **Not created.**

## The one real improvement worth naming (not proposed as action yet)

The dual catalog/productsData fallback pattern works today because product coverage between the two files happens to overlap enough. There's no automated check that a product added to one file also gets a corresponding entry in the other — if a new product is ever added to only `PRODUCT_CATALOG` and never to `PRODUCTS_DATA`, the chemistry-field fallback (`al2o3`, `density`, `temp` in the schema.org `additionalProperty` block) silently goes missing for that product with no error, just less-rich structured data. This isn't a current bug (all present products appear covered), just a latent gap worth a lightweight build-time consistency check at some point — not proposing it as work to do now, flagging it as a future-improvement candidate only, per your instruction to propose improvements "only if needed."
