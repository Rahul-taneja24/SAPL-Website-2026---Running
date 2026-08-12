# Already Built vs. Missing

Quick-reference companion to the reconciliation report. Verified against the actual repo
on 2026-08-10, not assumed from the handoff's own claims.

## Already built (don't recreate)

| System | Real file/location | Notes |
|---|---|---|
| Product data model | `frontend/src/data/productCatalogData.js` | 32 products, 118 grade rows, 5 categories |
| Grade datasheets | `frontend/src/data/productDatasheetData.js` | |
| Product FAQs | `frontend/src/data/productFaqsData.js` | |
| Grade alias/equivalence system | `frontend/src/data/gradeAliasData.js` | Built this session, held pending manufacturer verification, NOT committed |
| Grade detail pages | `frontend/app/products/[categorySlug]/[productId]/[grade]/` | 512 static paths, working, NOT committed, on hold |
| Industry/solutions pages | `frontend/app/solutions/[industrySlug]/` | 8 industries incl. foundry |
| Location/market pages | `frontend/src/data/locationsData.js` + `frontend/app/refractory-supplier-in/` | 56 locations |
| Brand partnership pages | `frontend/app/brands/` | 7 verified brands |
| Blog/knowledge content | `frontend/src/data/blogPostsData.js` | 62 posts (post-consolidation) |
| Case studies (illustrative, labeled) | `frontend/src/data/caseStudiesData.js` | Explicitly non-claims, `TechArticle` schema |
| News content | `frontend/src/data/newsData.js` | 4 articles |
| Organization/LocalBusiness schema | `frontend/app/layout.jsx` | `sameAs` actively maintained this session |
| llms.txt (GEO citability file) | `frontend/public/llms.txt` | Actively maintained |
| Sitemap | `frontend/app/sitemap.js` | Includes grade URLs (uncommitted addition) |
| IndexNow automation | `frontend/scripts/submit-indexnow.js` + postbuild hook | Live, verified working |
| GSC integration | Live connector, used throughout session | Free tier, 30-day/100-row cap |
| Semrush/SE Ranking access | Live connector | SE Ranking confirmed Google-USA-only |
| Directory citations | GetListedUAE, FreeListingIndia, TuffClassified | Live, dofollow status checked |

## Partially built

| System | What exists | What's missing |
|---|---|---|
| RFQ/contact funnel | Working contact form | Not structured around product/grade/application/destination fields |
| Technical datasheets | Full data in `productDatasheetData.js` | Gated entirely behind WhatsApp request, no crawlable HTML summary |
| GEO/AEO monitoring | One-off WebSearch-proxy baseline (this session) | No recurring tracking |
| Certifications | ISO 9001/14001/45001 claimed in text | No certificate scans/numbers published |
| Internal linking | Fixed to 1.47 links/post this session | Best practice is 3-8/post, still room |

## Genuinely missing (confirmed, not just unverified)

- `/procurement/` page
- `/engineering/` page
- `/applications/[name]/` page type
- `/markets/[country]/` hub pages (only city-level exists)
- Data-conflicts register (this reconciliation is effectively the first entry)
- Recurring GSC/GA4 snapshot pipeline
- GA4 access (unconfirmed in this session, GSC yes)
- Weekly automation cadence of any kind

## Do NOT create (would duplicate or regress existing work)

- `/data/product_master.json` as literal new file, `productCatalogData.js` is richer
- `/data/claims_master.json`, `/data/content_registry.json`, `/data/market_registry.json`
  as empty schema files, no value until populated, and existing data files already cover
  most of this ground informally
- A second dashboard (`SEO_CONTROL_TOWER.html` is an unwired mockup, not worth committing)
- A parallel case-study system, the illustrative-scenario approach is correct and
  deliberate
