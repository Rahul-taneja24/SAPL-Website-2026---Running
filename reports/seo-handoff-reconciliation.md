# SEO/GEO/AEO Handoff Reconciliation

Source: `Shanker_Agencies_Claude_Code_SEO_GEO_AEO_Handoff.zip`
Reconciled against: this project's actual repository, live GSC data, and the SEO/GEO/AEO
work already completed in this session.

**Read-only.** No production changes were made producing this report.

---

## 0. Package contents vs. what the handoff prompt claimed

The prompt instructed reading `01_READ_FIRST/CLAUDE.md` and `START_HERE.md`. **Neither file
exists in the zip.** The actual contents are `CLAUDE_FIRST_PROMPT.txt` and
`SAPL_INPUT_CHECKLIST.md`. Noting this because the rest of this reconciliation is based on
what's actually in the package, not what the prompt assumed was in it.

The package is a **strategy and template kit**, not a built system. Every data file is an
empty JSON Schema (structure, no records). The dashboard is a static HTML mockup with
`"Connect GSC"` placeholder strings, wired to nothing. The one genuinely substantive
artifact is the `Page Audit` sheet in the Excel file, a real page-by-page review of the
live site, evidently done by an external AI reviewing shankeragencies.com in August 2026.

---

## A. What this session already discovered (independent of the handoff)

- India: 66 ranking keywords, mostly positions 11-30, 19 est. monthly organic clicks.
  UAE: 1 tracked keyword, 0 traffic.
- Backlink Authority Score flat at 6-7 for 13 months while referring domains grew 58%,
  authority is the bottleneck, not content volume.
- Internal link density was 1.14/post across 64 posts; fixed to 1.47 by adding 14
  contextual links and consolidating 2 genuine duplicate posts (5 pairs were flagged,
  3 turned out not to be duplicates on inspection and were interlinked instead).
- Core Web Vitals fail on LCP (3.16s) but the codebase is already well-optimized
  (`next/font`, preloaded hero, deferred analytics), no quick technical win available.
- FAQ schema is implemented correctly but Google stopped showing FAQ rich results for
  most sites in Aug 2023, explains why PAA/AI Overview appearances (46 and 23 in GSC)
  outperform classic rich-result visibility.
- A prior competitor-gap report (pasted into this session) contained two false claims
  about this site (undercounted location pages 55 vs claimed 2-3; claimed no
  installation content when 7+ posts exist). Corrected before acting.
- A prior E-E-A-T/trust-score report also had false claims (claimed no leadership bios,
  no third-party links, both exist). Corrected before acting.
- Case studies (`caseStudiesData.js`) are deliberately labeled illustrative scenarios,
  not real project records, with an on-page banner and `TechArticle` schema specifically
  to avoid false claims. This was a considered decision, not an oversight.
- A trailing grade-per-page system (`/products/[category]/[product]/[grade]/`) was built
  and verified working (512 paths, SK/AL/alumina% alias resolution), but **held per
  explicit instruction** pending real manufacturer datasheet verification. Not committed.
- Directory submissions in progress: GetListedUAE, FreeListingIndia, TuffClassified live
  and added to `sameAs` schema (2 of 3 confirmed nofollow via live rel-attribute check;
  Sulekha unconfirmed, URL redirects to a login page for unauthenticated visitors).
- SE Ranking project is configured for `Google USA` only, confirmed via a real report PDF,
  explains why that tool's data was told to be disregarded.

## B. What the handoff proposes

A four-layer content/data architecture: `PRODUCT → GRADE → APPLICATION → INDUSTRY →
COUNTRY → PROCUREMENT → RFQ`, backed by seven JSON registries (product master, claims
master, conflicts, keyword map, URL registry, content registry, market registry), a
procurement-first page taxonomy (`/procurement/`, `/engineering/`, `/markets/[country]/`,
`/applications/[name]/`), technical content governance rules (never merge manufacturer
specs, always label typical vs. certified, never invent grades/chemistry/results), a
7-agent weekly automation architecture, and a GEO/AEO monitoring protocol using controlled
prompts across ChatGPT/Gemini/Perplexity.

## C. What is already implemented on this site

| Handoff proposal | Status |
|---|---|
| Product/grade/application data model | `productCatalogData.js`, `productDatasheetData.js`, `productFaqsData.js` exist with real spec tables (118 grade rows, 32 products) |
| Grade equivalence / alias system | Built this session (`gradeAliasData.js`), held pending manufacturer verification, more rigorous than the handoff's schema (which has no equivalence logic at all) |
| Industry pages | `/solutions/[8 industries]` including foundry, live |
| Market/location pages | 56 location pages under `/refractory-supplier-in/`, more than the handoff's 10-country list |
| Multi-brand positioning | `/brands` with 7 real, verified partnerships (dealer vs. supply-partner distinction already correctly maintained, the handoff's exact concern) |
| Technical content governance | This session already enforces "never invent grades/chemistry/results" as a hard rule, independently of the handoff's rules, same conclusions reached separately |
| Illustrative-vs-real content labeling | Case studies already do this (banner + `TechArticle` schema) |
| GSC integration | Live connector used throughout this session, real data pulled repeatedly |
| Directory/citation building | GetListedUAE, FreeListingIndia, TuffClassified live; `sameAs` schema actively maintained |
| Internal linking discipline | Fixed this session based on real GSC cannibalization data |
| IndexNow automation | Live, auto-submits on every production deploy |

## D. What is partially implemented

| Area | State |
|---|---|
| RFQ/procurement funnel | Contact form exists; not structured around the handoff's specific field set (product/grade/application/equipment/dimensions/quantity/current material/destination port/Incoterm) |
| Datasheets | WhatsApp-request only, no crawlable HTML technical summaries, the handoff's TDS strategy is directly actionable here |
| GEO/AEO monitoring | This session ran a one-off "Share of Model Voice" baseline (WebSearch proxy, documented as imperfect); no recurring controlled-prompt tracking system exists |
| Case studies | Framework exists and is honest; zero real, verified case studies are populated yet |
| Certifications | ISO 9001/14001/45001 claimed in text; no certificate scans/numbers published |

## E. What is genuinely missing

- `/procurement/`, `/engineering/`, `/applications/[name]/` page types don't exist
- `/markets/[country]/` hub pages don't exist (only city-level `/refractory-supplier-in/[city]/`)
- No structured `claims_master` / `data_conflicts` register (this reconciliation report is effectively the first entry)
- No recurring GSC/GA4 snapshot pipeline (`/data/gsc/YYYY-MM-DD.json` style)
- No weekly automation cadence
- GA4 connection not confirmed in this session (GSC yes, GA4 unverified)

## F. What conflicts

1. **Positioning language.** The handoff insists on "multi-brand engineering & supply
   partner," explicitly warning against sounding like "a fake manufacturer." The live
   site already does this correctly (dealer vs. supply-partner distinction is accurate
   and was independently verified and corrected once this session, the IFGL false-claim
   fix). No actual conflict, the handoff is describing a state that's already true.
2. **Directory submission**. The handoff's checklist says "SAPL must supply... existing
   backlink export, existing keyword/ranking export" as if starting fresh. This session
   already has live Semrush/SE Ranking/GSC access and has been acting on real data for
   weeks. Treat the checklist as informational, not a blocking prerequisite.
3. **`/refractory-supplier-in/riyadh` and `/muscat`.** The handoff's Page Audit sheet
   claims Riyadh isn't the main Saudi industrial corridor (Jubail/Dammam/Jeddah/Yanbu
   matter more) and Muscat is less relevant than Sohar. **This is a genuinely useful,
   specific, checkable claim** worth verifying against real Saudi/Oman industrial
   geography before acting, it wasn't something this session had surfaced yet.
4. **Foundry claim, disproven.** The handoff's Page Audit sheet says "foundry is missing
   from primary industry hub." **False, verified against source**: `foundry` is already
   in the industries list (`app/sitemap.js:79` includes it alongside steel, cement,
   aluminum, glass, petrochemical, power, ceramic). Same pattern as the two earlier
   third-party reports this session caught with false claims, don't trust this handoff's
   specific factual assertions without checking, even though its *governance principles*
   are sound.
5. **A real, previously-unknown conflict the handoff's methodology would have caught.**
   Verified independently: `src/sections/Products.jsx:882` states on-page **"We carry
   200+ grades"**, but the actual structured data (`productCatalogData.js`) contains
   **118 grade rows across 32 products**. This is a live, real, currently-published
   inconsistency between marketing copy and the source-of-truth data. This is exactly
   the class of problem the handoff's `data_conflicts.json` schema exists to catch, and
   it's correct that the site has this problem, even if the handoff itself never checked
   the actual number.

## G. What should be adopted

- **The data-conflicts register concept**, applied practically (see Finding F.5, a real
  first entry already exists).
- **The technical content governance rules** (never merge manufacturer specs, label
  typical vs. certified, source/date every number). These match this session's existing
  practice but formalizing them as a written, checkable ruleset is worth doing.
- **Crawlable HTML technical summaries before the WhatsApp gate**, directly actionable,
  addresses a real E-E-A-T/expertise gap flagged independently by the trust-score report
  reviewed earlier in this session.
- **The RFQ field taxonomy** (product/grade/application/equipment/destination
  port/Incoterm), more structured than the current contact form and would improve lead
  quality.
- **`/markets/[country]/` hub pages**, but only after checking whether they'd cannibalize
  the existing 56 city pages, needs a content-architecture decision, not a copy-paste.
- **The Riyadh/Muscat industrial-corridor correction**, worth verifying and potentially
  acting on.
- **The GEO/AEO controlled-prompt tracking discipline**, more rigorous than the one-off
  baseline already run this session.

## H. What should NOT be adopted

- **The seven empty JSON schema files as literal new files.** They're thinner than the
  data already live in this repo (`productCatalogData.js` alone has richer structure:
  real spec tables, brands, applications, images, installation steps). Creating
  `/data/product_master.json` as a parallel, weaker copy of what `productCatalogData.js`
  already does well would be a regression, not progress. If a claims/conflicts register
  is built, it should be a new, focused addition (see Finding F.5's use case), not a
  wholesale re-platforming of existing product data.
- **The static HTML dashboard mockup as-is.** It has zero wiring, all placeholder
  strings. Not worth committing; if a real dashboard is wanted later, build it against
  actual GSC/GA4 data from day one rather than starting from an unwired mockup.
- **The 7-agent weekly automation architecture, at least for now.** It assumes
  infrastructure (cron/GitHub Actions, a database, credentialed API access) this project
  doesn't have configured, and this session's actual working model (ad hoc, verified,
  human-approved changes) has caught more real errors (2 false third-party reports, 1
  wrong SK-grade mapping, 1 wrong IFGL claim) than an unattended agent pipeline would
  likely catch on its own. Automate specific, narrow tasks (e.g., the IndexNow postbuild
  hook already does this) rather than standing up the full architecture speculatively.
- **Blind adoption of any specific factual claim in the Page Audit sheet.** Its
  governance principles are sound but at least one concrete claim (foundry missing) is
  independently verified false. Every specific claim needs the same live-check treatment
  applied throughout this session before being acted on.
- **Mass content generation of any kind**, which the handoff itself also warns against
  in its own "Do NOT" sections. Consistent with this session's practice throughout.
