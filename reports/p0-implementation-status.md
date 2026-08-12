# P0 Implementation Status

Status date: 2026-08-11
Final wrap-up for the controlled-implementation phase (13-item instruction set). Categorized as requested: COMPLETED / WAITING FOR MY DECISION / WAITING FOR SAPL DATA / READY FOR IMPLEMENTATION / BLOCKED.

---

## COMPLETED

**Item 6 — GA4 conversion-event instrumentation.** The only category explicitly approved for code changes this pass. 5 of 8 events wired, tested locally (7 test runs, all passed), zero PII confirmed in every fired event. 3 events (`technical_recommendation_submit`, `material_comparison_request`, `rfq_upload`) have no UI to attach to — documented as not-implemented rather than fabricated. **Not committed, not deployed** — this is prepared and ready, sitting in the working tree pending your review. Full detail: `reports/ga4-event-implementation.md`.

**All 7 investigation/recommendation reports** (items 1, 2, 3, 5, 7, 8, 9, 10, 11 — presented in chat and/or written to `reports/`):
- Grade count: confirmed exactly 2 occurrences, both "200+ grades" claim.
- Factory-direct pricing: confirmed 6 occurrences (2 more than previously logged), 3 replacement wording options proposed.
- "500+ clients": reconfirmed HUMAN VERIFICATION REQUIRED, not touched.
- `DIRECTORY_SUBMISSION_KIT.md`: investigated fully, archiving recommended (not deletion).
- `reports/se-ranking-country-configuration.md`: written.
- `reports/market-page-recommendations.md`: written.
- `reports/rfq-funnel-recommendation.md`: written.
- `reports/technical-html-priority.md`: written.
- `reports/product-data-architecture.md`: written.

---

## WAITING FOR MY DECISION (yours to make, nothing I can resolve from code)

| # | Decision needed | Where the options are |
|---|---|---|
| 1 | Approve applying "100+ documented grades across 30+ refractory products" to the 2 files that say "200+ grades" | `reports/grade-count-reconciliation.md` (prior phase), findings restated in chat this pass |
| 2 | Pick one of 3 factory-direct-pricing replacement wording options (or a variant), to apply across all 6 occurrences | Presented in chat this pass (item 2) |
| 4 | Approve the single-line Delhi address fix in `locationsData.js:21` | Presented in chat this pass (item 4), before/after text shown |
| 5 | Approve archiving `DIRECTORY_SUBMISSION_KIT.md` (move, don't delete) | Presented in chat this pass (item 5) |
| 8 | Approve building Jubail → Dammam → Sohar pages (or reject/reorder) | `reports/market-page-recommendations.md` |
| — | Whether to commit the tested-and-passing GA4 code (item 6) | `reports/ga4-event-implementation.md` |
| — | New finding this pass: `admin/pages/Products.jsx` is dead code containing its own stale "200+ grades" and unverified IFGL-partner claims — worth a decision on removing it separately, not blocking anything today since nothing renders it | Item 1/5 findings above |

---

## WAITING FOR SAPL DATA (I cannot resolve this from the repo or public sources)

| # | What's needed |
|---|---|
| 3 | The real client count, to confirm or replace "500+ clients" (6 occurrences across the codebase) |
| 2, 8 | Whether SAPL has actual commercial history (enquiries/quotes/shipments) in Jubail, Dammam, Yanbu, Sohar, Salalah — gates any content written for new market pages |
| 7 | Confirmation of which SE Ranking account/plan the earlier PDF report came from, and whether Qatar/Kuwait/Bahrain/South Africa/Nigeria/Kenya are genuinely active target markets (several have no dedicated location page today) |
| 9 | Whether adding a file-upload field to the RFQ form is viable on your current Web3Forms plan tier |

---

## READY FOR IMPLEMENTATION (mechanical, low-risk, blocked only on your go-ahead)

- Delhi NAP fix (item 4) — one-line string replacement, exact before/after already shown.
- GA4 event code (item 6) — tested, passing, just needs a commit + deploy decision.
- Grade-count wording (item 1) — 2-file replacement, exact wording already approved by you in the prior phase, just not yet applied.

## BLOCKED

- **Item 12, dashboard**: explicitly deferred per your instruction until GSC + GA4 events + URL registry + keyword mapping + product data + RFQ data are all real. GA4 events are now tested but not deployed (no real data flowing yet); GSC is live and working; the rest (URL registry, keyword mapping formalized) hasn't been built. Still blocked, correctly, not started.
- **Factory-direct pricing / grade-count / 500-clients edits**: technically "ready" mechanically, but correctly blocked on your decisions above, not a technical blocker.

---

## Exact files changed this session (not committed)

```
 M frontend/src/components/Footer.jsx          (GA4 phone/email click events)
 M frontend/src/components/Navbar.jsx          (GA4 phone/email click events)
 M frontend/src/components/WhatsAppButton.jsx  (GA4 whatsapp_click event)
 M frontend/src/sections/Contact.jsx           (GA4 rfq_submit event, both form paths)
 M frontend/src/sections/Downloads.jsx         (GA4 datasheet_request event + a pre-existing
                                                 field-mismatch bug fixed transparently in passing)
 M frontend/src/sections/RfqForm.jsx           (GA4 rfq_submit event)
?? frontend/src/lib/analytics.js               (new — shared trackEvent() helper)
?? reports/                                     (new — all reports listed above)
```

**Pre-existing, not touched by this pass** (present in git status from before this session started, per the initial repo snapshot — flagging so you don't mistake these for my work):
```
 M frontend/app/api/indexnow/route.js
 M frontend/app/sitemap.js
?? DIRECTORY-SUBMISSION-2026-08.md
?? FREE-DA20-DIRECTORIES-2026-08.md
?? SAPL-GRADE-TAXONOMY-RESEARCH.md
?? frontend/app/products/[categorySlug]/[productId]/[grade]/   (grade-detail route, prior session)
?? frontend/src/data/gradeAliasData.js                          (SK-grade equivalence data, prior session)
```

**Nothing has been committed. Nothing has been deployed.** Everything above is prepared for your review, per your original instruction.
