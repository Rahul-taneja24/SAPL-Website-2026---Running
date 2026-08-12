# RFQ Funnel Recommendation

Status date: 2026-08-11
Scope: item 9 — inspect the current RFQ/lead-capture implementation, propose an enhanced field model mapped to buyer intent. **No UI changes made.** This is a proposal for review.

## Current implementation (repo-verified)

There are **two separate, overlapping RFQ-style forms**, both posting to the same Web3Forms endpoint, with different field sets:

**1. Dedicated RFQ form** — [`frontend/src/sections/RfqForm.jsx`](frontend/src/sections/RfqForm.jsx), presumably on `/rfq`.

| Field | Name attr | Required? |
|---|---|---|
| Product Category | `product_category` | Yes |
| Grade / Specification | `grade_specification` | No |
| Quantity | `quantity` | Yes |
| Application / Equipment | `application` | No |
| Destination Country | `destination_country` | Yes |
| Port / City | `destination_port` | No |
| Incoterm | `incoterm` | No (defaults to "Not sure") |
| Target Delivery Month | `target_delivery` | No |
| Company Name | `company` | Yes |
| Contact Person | `name` | Yes |
| Email | `email` | Yes |
| Phone/WhatsApp | `phone` | No |
| Notes | `notes` | No |

**2. Contact page "Request a Quote" form** — [`frontend/src/sections/Contact.jsx`](frontend/src/sections/Contact.jsx), a second, independent field set on the same conceptual task:

| Field | Name attr | Required? |
|---|---|---|
| Name | `name` | Yes |
| Email | `email` | Yes |
| Phone | `phone` | Yes |
| Company | `company` | No |
| Industry | `industry` | Yes |
| Products (multi-select, not in the field dump above but present in code) | `products` | — |
| Quantity | `quantity` | No |
| Delivery Location | `delivery_location` | No |
| Application | `application` | No |
| Inquiry Type | `inquiry_type` | No |
| Message | `message` | — |

**Observation, not yet acted on**: having two structurally different forms for the same underlying task (get a quote) means GA4's `rfq_submit` event — correctly, per your instruction — fires from both with different parameter shapes (`product_family` is a single category string from one form, a joined multi-select string from the other). This isn't a bug, but it means any funnel analysis has to account for two different data shapes feeding one event name. Flagging for awareness, not proposing a merge — that's a bigger decision than this report's scope.

## Requested enhanced field model, mapped to buyer intent

You asked for these fields — Product family, Product, Grade, Application, Equipment, Dimensions, Quantity, Current material, Current supplier, Destination country, Destination port, Incoterm, Required documentation, Required date, Upload — mapped to the intents: Price / Equivalent grade / Technical recommendation / TDS / Sample / Complete package / Engineering review.

| Field | Price | Equivalent grade | Technical recommendation | TDS request | Sample request | Complete package | Engineering review |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Product family | Required | Required | Required | Required | Required | Required | Required |
| Product | Required | Optional | Optional | Required | Required | Required | Optional |
| Grade | Optional | **Required if known** | Optional (this is what they're asking you to determine) | Required | Optional | Required | Optional |
| Application / Equipment | Optional | Required | **Required** — this is the core input for a recommendation | Optional | Optional | Required | **Required** |
| Dimensions | Optional | Optional | Optional | — | Optional (affects sample feasibility) | Required | Optional |
| Quantity | **Required** | Optional | Optional | — | N/A (samples are typically fixed small qty) | Required | Optional |
| Current material in use | Optional | **Required** | **Required** | — | Optional | Optional | **Required** |
| Current supplier | Optional | Optional (useful competitive signal, never required) | Optional | — | Optional | Optional | Optional |
| Destination country | Required | Optional | Optional | — | Required (shipping) | Required | Optional |
| Destination port | Optional | — | — | — | Optional | Required | — |
| Incoterm | Required | — | — | — | — | Required | — |
| Required documentation (MTC, TDS, COA, etc.) | Optional | — | — | Auto-implied by intent | — | Required | Optional |
| Required date | Optional | Optional | Optional | — | Optional | **Required** (drives lead time planning) | Optional |
| Upload (drawing, spec sheet, sample photo, competitor TDS) | — | Helpful (photo of existing part) | **Helpful** (drawing/spec accelerates the recommendation) | — | — | Optional | **Helpful** (failure photos, drawings) |

Key design point: **the intent should be selected first** (a single "What do you need?" field with these 7 options), and the field set shown should adapt to that selection — not one giant form with everything visible for every inquiry. This is a UX/conversion recommendation, not a technical constraint; both current forms already show/hide some fields conditionally (`Contact.jsx`'s `inquiry_type` state), so the pattern exists in the codebase already and can be extended.

## The 3 currently-unimplemented GA4 events map directly onto this gap

From `reports/ga4-event-implementation.md`: `technical_recommendation_submit`, `material_comparison_request` (maps to "Equivalent grade" above), and `rfq_upload` all have no UI to attach to today. If the enhanced field model above is built, wiring those 3 events becomes a mechanical follow-up (same `trackEvent()` pattern as the other 5), not a new design problem.

## What this report does NOT do

- No UI changes to `RfqForm.jsx` or `Contact.jsx`.
- No decision on merging the two existing forms into one.
- No file-upload backend — Web3Forms supports file attachments on paid plans; confirming current plan tier and attachment size limits is a prerequisite before adding an "Upload" field, not something I can verify from the repo.
- No decision on whether "intent-first, adaptive fields" is worth the engineering effort vs. the current fixed-field forms — that's a product decision for you, this report just lays out the field/intent mapping you asked for.
