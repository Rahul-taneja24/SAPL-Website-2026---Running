# Integration Roadmap (revised, post-P0 investigation)

Supersedes the first draft of this file. Rebuilt from the actual findings in
`grade-count-reconciliation.md`, `market-location-reconciliation.md`,
`analytics-status.md`, and `data-conflicts.md`, not from the handoff's assumptions.
No production changes made.

---

## Execution backlog

| Priority | Task | URL/file | Why it matters | Dependency | Expected outcome | Effort | Risk | Status |
|---|---|---|---|---|---|---|---|---|
| P0 | Fix "200+ grades" claim | `Products.jsx:882`, `admin/pages/Products.jsx:1492` | Live, public, unsupported number (CONFLICT-001) | Your decision on which replacement wording | Defensible, sourced claim | 15 min | Low | Awaiting your go-ahead |
| P0 | Fix Delhi page address | `locationsData.js:21` | Live NAP inconsistency on the site itself (CONFLICT-003), separate from the directory-listing fix already done | None | Consistent NAP across every page | 5 min | Very low | Awaiting your go-ahead |
| P0 | Confirm admin route indexability | `src/admin/pages/Products.jsx` | CONFLICT-001's fix is incomplete if a public, indexable duplicate remains | None | Know whether admin route needs noindex too | 10 min investigation | Low | Not started |
| P1 | Review "factory-direct pricing" wording | `page.jsx:154` (template, 56 pages) + 3 location entries | Unsubstantiated positioning claim in a high-blast-radius template (CONFLICT-004) | Your input on actual supply-chain structure | Either substantiated or reworded claim | 30-60 min | Medium (reputational if left as-is) | Awaiting your input |
| P1 | Verify "500+ industrial clients" | 4 files, consistent but unverified (CONFLICT-005) | Same category of risk as the grade count | Your input (only you can confirm this number) | Either confirmed or requalified | N/A, needs your data | Low urgency, same class of issue | Awaiting your input |
| P1 | Wire GA4 conversion events | `RfqForm.jsx`, `Contact.jsx`, `WhatsAppButton.jsx` | Currently zero conversion visibility, only pageviews (analytics-status.md) | Confirm event-naming convention against GA4 dashboard config | RFQ/WhatsApp/phone clicks become measurable | 2-3 hrs | Low | Not started |
| P1 | Build Jubail, Dammam, Sohar location pages | new, under `refractory-supplier-in/` or a new `/markets/` structure (architecture TBD) | Confirmed real industrial hubs with zero current coverage (market-location-reconciliation.md) | Your input on actual SAPL commercial history in these locations, architecture decision (city page vs. country hub) | Closes a real, externally-verified coverage gap | Content: 1-2 days once unblocked | Medium if written without real commercial-relevance input | Blocked on your input |
| P2 | ~~Deprecate/delete stale `DIRECTORY_SUBMISSION_KIT.md`~~ | Archived to `_archive/DIRECTORY_SUBMISSION_KIT.md` | Contains the unverified IFGL partnership claim (CONFLICT-007), superseded but still readable/reusable | — | Removed a live footgun without deleting history | 2 min | Very low | **DONE (archived 2026-08-11)** |
| P2 | Check duplicate grade labels | `productCatalogData.js` (Al₂O₃-ZrO₂-C, Fused Silica) | Low-severity data-quality check (CONFLICT-006) | None | Confirms intentional vs. accidental | 10 min | Very low | Not started |
| P2 | ISO certificate scans/numbers | site-wide claim, no backing docs (CONFLICT-009) | E-E-A-T/trust gap, flagged twice now (trust-score review + this pass) | You supplying the actual certificates | Verifiable, not just claimed, certification | N/A, needs your documents | Low | Blocked on your input |
| P2 | Yanbu, Salalah location pages | new | Lower-tier version of the P1 market gap | Same as Jubail/Dammam/Sohar, do after | Rounds out GCC industrial coverage | 1 day once unblocked | Low | Blocked, sequenced after P1 item |
| P2 | Crawlable HTML technical summaries | product pages, ungates data already in `productDatasheetData.js` | Addresses expertise/E-E-A-T gap with data that already exists | None, purely a presentation change | Public, indexable spec data instead of WhatsApp-gated | 1-2 days for top products | Low | Not started |
| P2 | RFQ form field expansion | `RfqForm.jsx`/`Contact.jsx` | Better lead qualification (product/grade/application/destination/Incoterm) | None | Higher-quality RFQs | 1 day | Low | Not started |
| P3 | `/markets/[country]/` hub architecture decision | new | Needs a decision before Jubail/Dammam/Sohar content is placed permanently | P1 location-page work | Clear, non-cannibalizing URL structure | Decision + 1 day build | Medium (SEO architecture change) | Not started |
| P3 | `/procurement/`, `/engineering/` hub pages | new | Needs content to populate (P2 items above) before the hub is worth building | P2 technical-summary and RFQ work | Real, substantive hub pages, not thin shells | 2-3 days once unblocked | Low | Deferred |
| P3 | Real case studies | `caseStudiesData.js` | Blocked entirely on external input | Your real client data | Genuine proof instead of illustrative scenarios | N/A | Low (as long as illustrative framing stays until then) | Blocked on your input |
| P3 | GEO/AEO recurring tracking log | new `reports/geo-tracking.md` | Extends the one-off baseline already run this session | None | Monthly signal on AI-citation status | 1-2 hrs/month ongoing | Low | Not started |
| P3 | Competitor benchmark refresh | research task | CUMI/RHI/Vesuvius/TRL/Calderys/Saint-Gobain + the Oman competitor surfaced in this pass (Industrial Technologies and Energy, Sohar) | None | Sharper positioning | 1 day | Low | Not started |
| P3 | Second internal-linking pass | blog content | 1.47 links/post is still below the 3-8 best-practice range | None | Continued CTR/ranking improvement on page-2 content | 2-3 hrs | Low | Not started |
| P3 | GA4/GSC recurring snapshot pipeline | new | Only worth automating once event tracking (P1) exists to snapshot | P1 GA4 event wiring | Historical trend data beyond GSC's 30-day free-tier cap | Half day | Low | Deferred |
| P3 | Dashboard build | none exists yet, mockup rejected | Only worth building once P0-P2 data is real | Most items above | A dashboard with real data instead of "Connect GSC" placeholders | Multi-day | Low, but low priority | Deferred |

---

## Next 10 actions, exact execution order

1. **Show you this full reconciliation package** (this step, now).
2. **Get your decision on CONFLICT-001** (grade count wording), the one item explicitly
   deferred back to you per your own instruction not to guess.
3. **Get your input on CONFLICT-004** ("factory-direct pricing"), needs to know the real
   supply-chain structure before rewording.
4. **Get your input on CONFLICT-005** (500+ clients), same category, only you can verify.
5. **Get your approval to fix CONFLICT-003** (Delhi address typo), this one's mechanical
   and low-risk, likely fine to just approve and ship.
6. **Get your approval to delete/deprecate the stale `DIRECTORY_SUBMISSION_KIT.md`**
   (CONFLICT-007), a destructive action per your own safety rules, needs explicit sign-off.
7. **Confirm the admin-route indexability question** (CONFLICT-008), I can investigate
   further without your input if you want it resolved before touching CONFLICT-001.
8. **Decide on GA4 event-wiring priority**, low-risk, high-value, purely additive code,
   good candidate for a "yes, go ahead" once you've reviewed the analytics-status report.
9. **Decide on Jubail/Dammam/Sohar**, the biggest strategic item: do you have real
   commercial history in these locations? This determines whether that content work is
   safe to start or needs to wait.
10. **Once 2-9 are resolved, I'll re-sequence the P1/P2 backlog into a concrete next
    sprint**, rather than working further ahead of your decisions.

No content, schema, or production changes have been made. Everything above is queued,
not executed.
