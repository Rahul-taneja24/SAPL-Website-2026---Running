# Unified `rfq_submit` GA4 Event Schema

Status date: 2026-08-11
Scope: standardize the `rfq_submit` event fired by the two separate RFQ-style forms (`RfqForm.jsx` and `Contact.jsx`) so both emit the same parameter shape. No third form created. Other events (`datasheet_request`, `whatsapp_click`, `phone_click`, `email_click`) are unchanged — this schema applies to `rfq_submit` only.

## The schema

| Parameter | Type | Meaning |
|---|---|---|
| `form_variant` | string | Which UI fired the event: `rfq_form` \| `contact_general` \| `contact_quote` |
| `product_family` | string \| omitted | Product category/family selected |
| `product` | string \| omitted | Single specific product, if the form ever collects one distinct from family (neither current form does — reserved) |
| `grade` | string \| omitted | Grade/specification text |
| `application` | string \| omitted | Application/equipment context |
| `market` | string \| omitted | Free-text delivery location (city/country combined), used when the form doesn't collect a strict country field |
| `destination_country` | string \| omitted | Strict destination country, used when the form has a dedicated country field |
| `destination_port` | string \| omitted | Destination port/city for shipping |
| `intent` | string | Buyer intent: `quote` for both RFQ-style submissions, or the Contact form's own `inquiry_type` value (`general` \| `technical` \| `partnership`) for its general-inquiry path |
| `quantity_unit` | — | **Reserved, not currently populated by either form.** Both forms only collect quantity as unstructured free text (e.g. "40 tonnes", "50 MT, 1000 pcs") — there's no clean way to extract just a unit without regex-guessing at free text, which risks producing garbage values or partially echoing the raw entry under a different-looking field. Per your instruction ("if a parameter isn't available in one form, use null/omit it rather than inventing it"), this is omitted from both forms today. Populate it once a form collects quantity as a structured number+unit pair (see the enhanced RFQ field model in `reports/rfq-funnel-recommendation.md`). |
| `page_path` | string | `window.location.pathname` at submit time |

`market` and `destination_country` are intentionally two different fields, not duplicates — `market` is used when the source form only has a free-text "delivery location" input (could be "Dubai, UAE" or just "UAE"), `destination_country` is used when the form has a dedicated, structured country field. A single submission only ever populates one of the two, never both.

## Per-form field mapping

**`RfqForm.jsx`** ([frontend/src/sections/RfqForm.jsx:45](frontend/src/sections/RfqForm.jsx:45)):

| Schema param | Source field | Notes |
|---|---|---|
| `form_variant` | `'rfq_form'` (literal) | — |
| `product_family` | `product_category` | — |
| `grade` | `grade_specification` | Optional field, often empty → stripped by `trackEvent`'s undefined/empty filter |
| `application` | `application` | Optional field |
| `destination_country` | `destination_country` | Required field on this form |
| `destination_port` | `destination_port` | Optional field |
| `intent` | `'quote'` (literal) | This form only ever represents a quote request |
| `page_path` | `window.location.pathname` | — |
| `product`, `market`, `quantity_unit` | omitted | Not collected by this form |

**`Contact.jsx`** ([frontend/src/sections/Contact.jsx:147](frontend/src/sections/Contact.jsx:147)), both `formType` branches now share one `trackEvent` call:

| Schema param | Source (quote path) | Source (general path) |
|---|---|---|
| `form_variant` | `'contact_quote'` | `'contact_general'` |
| `product_family` | `formData.products.join(', ')` | omitted (general form doesn't collect products) |
| `application` | `formData.application` | omitted (field not shown in general form UI) |
| `market` | `formData.delivery_location` | omitted (field not shown in general form UI) |
| `intent` | `'quote'` (literal) | `formData.inquiry_type` (`general` \| `technical` \| `partnership`) |
| `page_path` | `window.location.pathname` | `window.location.pathname` |
| `product`, `grade`, `destination_country`, `destination_port`, `quantity_unit` | omitted | omitted |

## PII exclusion — explicit, unchanged from the prior GA4 pass

Confirmed **not sent**, per your standing instruction: `name`, `email`, `phone`, `company`, `message`, RFQ free-text notes, uploaded files, or any customer specification text. Every field in both forms that could carry PII (`name`, `email`, `phone`, `company`, `notes`/`message`) is read by the Web3Forms payload construction but never referenced in either `trackEvent()` call — verified by direct inspection of both call sites above, and re-verified in the local test pass (see `reports/ga4-event-implementation.md`, updated test log).

## What changed from the previous (pre-unification) schema

The prior implementation used `cta_type` (`rfq_form` / `contact_quote` / `contact_general`) and also sent `industry` from the Contact form. Both are dropped in favor of this unified schema: `cta_type` is superseded by `form_variant` (same information, standardized name shared across both forms), and `industry` is dropped because it wasn't part of the approved parameter list for this unified schema — it can be re-added later as an explicit, approved addition if needed, but isn't invented here.

## Not done

- No third RFQ form created.
- No UI changes to either form — this is a parameter-naming/structure change inside the existing `trackEvent()` calls only.
- `quantity_unit` and `product` remain unpopulated until a form actually collects structured data for them.
