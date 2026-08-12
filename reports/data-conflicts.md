# Data Conflicts & Unverified Claims Register

Living document. Every entry below is evidence-backed (file + line, or explicit "no
evidence found"). Nothing here has been auto-fixed. Update `status` as items are
resolved; do not delete resolved entries, mark them `resolved` with a date.

Severity: **P0** = live, public, factually wrong or high-risk. **P1** = live, unverified
but plausible. **P2** = internal/low-visibility. **P3** = cosmetic/minor.

---

### CONFLICT-001
- **Severity**: P0
- **File**: `frontend/src/sections/Products.jsx:882`, `frontend/src/admin/pages/Products.jsx:1492`
- **Claim**: "We carry 200+ grades"
- **Conflicting value**: 118 documented grade rows across 32 products in `productCatalogData.js`, the only structured source of truth for grades
- **Evidence**: `reports/grade-count-reconciliation.md`
- **Status**: open
- **Required action**: Replace with "100+ documented grades across 30+ refractory products" (defensible today) unless/until manufacturer-partner grade series (CUMILITE, ACCMON/ULTRACASTING/KERAFLEX, STD/HFK, K-series) are formally enumerated to support 200+ as a sourcing-network claim.
- **Owner**: unassigned, awaiting your decision

### CONFLICT-002
- **Severity**: P1 (was P0 until partially mitigated)
- **File**: `frontend/src/data/productCatalogData.js` (high-alumina-bricks `specs[]`, `pce` field), fixed in held/uncommitted `gradeAliasData.js`
- **Claim**: HA-70 (68-72% Al₂O₃) listed with `pce: 'SK 36'`
- **Conflicting value**: Cross-checked against two independent published SK-series references: 68-72% Al₂O₃ corresponds to SK 37-38, not SK 36
- **Evidence**: SK-series equivalence table built this session, sourced from published Seger-cone/alumina-content references, not from SAPL's own PCE field
- **Status**: mitigated in code (uncommitted, held pending your approval), NOT fixed in the live `productCatalogData.js` source field itself
- **Required action**: Decide whether to correct the underlying `pce` value in `productCatalogData.js` or leave it and rely on the separate alumina-content-based SK mapping (current approach in the held code)
- **Owner**: unassigned

### CONFLICT-003
- **Severity**: P0
- **File**: `frontend/src/data/locationsData.js:21` (Delhi location page intro)
- **Claim**: "553 Main G.T. Road, Shahdara, Delhi" (short form, no "Grand Trunk", no "East Ram Nagar", no postal code)
- **Conflicting value**: Every other instance on the live site (`Contact.jsx`, `About.jsx`, `Footer.jsx`, `app/layout.jsx` schema x2, `refractory-supplier-in/[locationSlug]/page.jsx` schema) uses "553, Main Grand Trunk Road, East Ram Nagar, Shahdara, Delhi 110032"
- **Evidence**: grep across `frontend/src` and `frontend/app`, single outlier confirmed at the line above
- **Status**: open, newly found this pass, not previously caught this session
- **Required action**: Fix the one line in `locationsData.js` to match the canonical address. Small, safe, high-value NAP-consistency fix.
- **Owner**: unassigned

### CONFLICT-004
- **Severity**: P1
- **File**: `frontend/app/refractory-supplier-in/[locationSlug]/page.jsx:154` (shared FAQ template, propagates to all 56 location pages), `frontend/src/data/locationsData.js:24,105,540` (Delhi, Visakhapatnam, Faridabad)
- **Claim**: "factory-direct pricing"
- **Conflicting value**: SAPL is an authorized dealer/distributor, not a manufacturer. The handoff's own Procurement Messaging doc explicitly lists "factory-direct unless verified" and "direct manufacturer unless verified" under "Do not say." "Factory-direct pricing" as phrased could reasonably be read by a buyer as manufacturer-direct pricing bypassing SAPL's own margin, which isn't the actual commercial relationship (SAPL buys from the manufacturer and resells).
- **Evidence**: grep confirms the phrase in the shared template plus 3 location-specific instances; `02_STRATEGY/PROCUREMENT_MESSAGING.md` from the handoff package independently flags this exact phrase category
- **Status**: open
- **Required action**: Either substantiate what "factory-direct" specifically means in SAPL's supply chain (e.g., no additional distributor tier between manufacturer and SAPL), or reword to something defensible like "authorized-dealer pricing" or "direct-from-partner pricing." High blast radius since it's in the shared template used by every location page.
- **Owner**: unassigned

### CONFLICT-005
- **Severity**: P2
- **File**: `frontend/src/sections/CompanyProfile.jsx:317`, `About.jsx:19`, `Contact.jsx:271`, `imagesData.js:69`
- **Claim**: "500+ industrial clients"
- **Conflicting value**: none found, this figure is used **consistently** everywhere it appears (not an internal contradiction)
- **Evidence**: grep across all data/section files, all instances say "500+"
- **Status**: open, different category than the other entries, flagged as unverified rather than inconsistent
- **Required action**: No internal fix needed for consistency. Confirm whether "500+" is a real, countable figure (CRM record count, cumulative historical clients, etc.) or a rounded marketing estimate. The handoff's own procurement-messaging draft independently flagged this exact figure with "*Only use verified figures after claim governance review."
- **Owner**: unassigned, needs your input (this is exactly the kind of fact only you can verify)

### CONFLICT-006
- **Severity**: P2
- **File**: `frontend/src/data/productCatalogData.js` (`specs[]` grade labels)
- **Claim**: grade label `Al₂O₃-ZrO₂-C` used in 2 different products; `Fused Silica` used in 2 different products
- **Conflicting value**: none confirmed, likely intentional shared terminology for related material types, but not verified
- **Evidence**: `reports/grade-count-reconciliation.md`, section 3
- **Status**: open, low severity
- **Required action**: Quick human check that this is intentional, not a copy-paste artifact
- **Owner**: unassigned

### CONFLICT-007
- **Severity**: P2
- **File**: `_archive/DIRECTORY_SUBMISSION_KIT.md` (archived 2026-08-11, previously repo root)
- **Claim**: "SUPPLY PARTNER of TRL Krosaki, IFGL Refractories, and Calderys" (lines 44, 51)
- **Conflicting value**: IFGL is not a verified SAPL partner. `/brands/ifgl` was removed from the live site; `llms.txt` only says SAPL's flow-control products are compatible with IFGL/RHI/Vesuvius/Krosaki gate systems, not that IFGL is a supply partner. This was already caught and corrected in `DIRECTORY-SUBMISSION-2026-08.md` (the replacement kit), but the **original file with the false claim was still present in the repo**.
- **Evidence**: earlier this session, cross-checked against `llms.txt` and the live `/brands` route
- **Status**: **RESOLVED (archived, not deleted)**. Moved to `_archive/DIRECTORY_SUBMISSION_KIT.md` on 2026-08-11 per user approval — no build/production/package.json reference existed, so the move is zero-risk. The IFGL claim itself remains unverified and is explicitly NOT to be changed or published anywhere — flagged for verification, per standing instruction.
- **Owner**: unassigned

### CONFLICT-008
- **Severity**: P3
- **File**: `frontend/src/admin/pages/Products.jsx:1492`
- **Claim**: unclear whether this internal admin route is indexable/public
- **Conflicting value**: n/a
- **Evidence**: `app/admin` confirmed to exist as a real Next.js route; no `noindex` meta or robots-disallow rule was found for it in the files checked, but auth/middleware gating wasn't fully traced
- **Status**: open, informational
- **Required action**: Confirm the admin route is either auth-gated or noindexed before treating CONFLICT-001's fix as complete (fixing the public page but leaving an indexable admin duplicate with the same wrong "200+" claim would be a partial fix)
- **Owner**: unassigned

### CONFLICT-009
- **Severity**: P2
- **Claim**: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 certifications, stated in text (`llms.txt`, `About.jsx`) across the site
- **Conflicting value**: no certificate numbers, issuing body, or scanned documents published anywhere on-site
- **Evidence**: raised in the E-E-A-T/trust-score review earlier this session; independently consistent with the handoff's technical-content governance rules ("every claim needs a source")
- **Status**: open, unchanged since earlier this session
- **Required action**: Publish certificate numbers/scans if available, or soften the claim until they are
- **Owner**: needs your input (you'd need to supply the actual certificates)

### CONFLICT-010
- **Severity**: P2
- **Claim**: illustrative economic/performance figures in `caseStudiesData.js` (campaign-life %, ₹/USD savings)
- **Conflicting value**: none, this is a deliberately, correctly labeled non-claim (banner + `TechArticle` schema), included here only as a standing tracked item, not a defect
- **Evidence**: file header comment in `caseStudiesData.js`, reviewed earlier this session
- **Status**: by design, tracked for eventual replacement with real data, not for "resolution" in the conflict-fixing sense
- **Required action**: Replace with real project data only if/when supplied (per standing instruction from the E-E-A-T review conversation)
- **Owner**: needs your input (real client data)

---

## Summary

| Severity | Count | Status |
|---|---|---|
| P0 | 2 (001, 003) | both open |
| P1 | 2 (002, 004) | 002 partially mitigated in held code; 004 open |
| P2 | 5 (005, 006, 007, 008, 009) | all open |
| P3 | 1 (010) | tracked by design, not a defect |

Two of these ten entries (003, 004) were **not previously identified** in this session,
found only through this reconciliation pass. That's the value of doing this systematically
rather than continuing ad hoc.
