# GA4 Conversion Event Implementation

Status date: 2026-08-11
Scope: item 6 of the controlled-implementation instruction set (the only category approved for code changes at this stage).

## Summary

8 conversion events were specified. 5 have a real, existing UI trigger point and are now wired, tested locally, and **not committed / not deployed**. 3 have no existing UI flow to attach to and were **not implemented** — inventing a trigger for them would mean inventing UI, which was out of scope.

All events fire through one shared helper, [`frontend/src/lib/analytics.js`](frontend/src/lib/analytics.js), which strips `undefined`/`null`/`''` values and only ever sends: `page_location`, `page_title`, plus the explicitly passed non-identifying params (`cta_type`, `product_family`, `product`, `application`, `market`, `industry`). No form field that could contain a name, email, phone number, company name, RFQ free-text, or file contents is ever passed into `trackEvent()`. Verified by direct inspection of every call site (table below) and by intercepting `window.gtag` during local testing and checking the outbound `params` object on every fire.

## Implemented events

| Event | Trigger | Parameters sent | File / component | Testing method | Status |
|---|---|---|---|---|---|
| `rfq_submit` | RFQ form successful submit | `cta_type: 'rfq_form'`, `product_family` (product category), `application`, `market` (destination country) | [`frontend/src/sections/RfqForm.jsx:45`](frontend/src/sections/RfqForm.jsx:45), inside the `json.success` branch of `handleSubmit` | Local: stubbed `window.fetch` (fake Web3Forms success, no real network call) + stubbed `window.gtag` (recorded to array instead of real GA4); filled and submitted the form, inspected the recorded event | Tested locally, passed. Not committed, not deployed. |
| `rfq_submit` | Contact page — "General Inquiry" form successful submit | `cta_type: 'contact_general'`, `application`, `market` (delivery location), `industry` | [`frontend/src/sections/Contact.jsx:147`](frontend/src/sections/Contact.jsx:147), inside the `result.success` branch of `handleSubmit` | Same stub method; tested the general-inquiry path specifically | Tested locally, passed. Not committed, not deployed. |
| `rfq_submit` | Contact page — "Request a Quote" form successful submit | `cta_type: 'contact_quote'`, `product_family` (joined selected products), `application`, `market`, `industry` | Same file/function, `formType === 'quote'` branch | Same stub method; tested the quote-form path specifically (distinct from general path since fields/logic branch on `formType`) | Tested locally, passed. Not committed, not deployed. |
| `whatsapp_click` | Floating WhatsApp button click | `cta_type: 'floating_button'`, `product_family` (only if a `productContext` prop is passed — see note below) | [`frontend/src/components/WhatsAppButton.jsx:30`](frontend/src/components/WhatsAppButton.jsx:30) | Stubbed `window.open` + one-time `preventDefault` listener on the `target="_blank"` anchor to stop real navigation; clicked the button, confirmed event fired with correct params and the real `wa.me` URL was still generated correctly | Tested locally, passed. Not committed, not deployed. |
| `datasheet_request` | Lead-capture modal (`LeadModal`) successful submit, from any "Request PDF" trigger on the Downloads page | `cta_type: 'downloads_page'`, `product_family` (item category), `product` (item name) | [`frontend/src/sections/Downloads.jsx:127`](frontend/src/sections/Downloads.jsx:127), inside `LeadModal.handleSubmit`, before the WhatsApp `window.open` call | Stubbed `window.fetch` + `window.gtag` + `window.open`; opened the modal via a "Request PDF" button, filled and submitted, confirmed correct event, correct real WhatsApp deep-link generation, and correct (unmodified) Web3Forms payload | Tested locally, passed. Not committed, not deployed. |
| `phone_click` | Click on any `tel:` link — navbar top bar (desktop), navbar mobile menu, footer | `cta_type`: `'navbar_topbar'` \| `'mobile_menu'` \| `'footer'` | [`frontend/src/components/Navbar.jsx:212`](frontend/src/components/Navbar.jsx:212), [`:506`](frontend/src/components/Navbar.jsx:506), [`:509`](frontend/src/components/Navbar.jsx:509); [`frontend/src/components/Footer.jsx:165-168`](frontend/src/components/Footer.jsx:165) (4 numbers) | Navbar top-bar instance and footer instances directly clicked and confirmed in the recorded `window.gtag` calls; mobile-menu instances use the identical `onClick` pattern and were not independently clicked (see note) | Tested locally (navbar + footer instances), passed. Not committed, not deployed. |
| `email_click` | Click on the `mailto:` link — navbar top bar, footer | `cta_type`: `'navbar_topbar'` \| `'footer'` | [`frontend/src/components/Navbar.jsx:222`](frontend/src/components/Navbar.jsx:222); [`frontend/src/components/Footer.jsx:173`](frontend/src/components/Footer.jsx:173) | Both instances directly clicked and confirmed | Tested locally, passed. Not committed, not deployed. |

Note on `whatsapp_click` / `product_family`: `WhatsAppButton` is rendered exactly once, globally, in `app/layout.jsx:403`, with no `productContext` prop passed. So in production today this event will always fire with `product_family` omitted (stripped by the helper, not sent as empty). The prop exists and works if a future product-page-specific WhatsApp button is added — documented here rather than silently assumed.

Note on `phone_click` mobile-menu scope: only the 2 `tel:` links inside the mobile hamburger menu in `Navbar.jsx` were wired, matching the topbar's 2 numbers. The reconciliation phase found tel:/mailto: links scattered across roughly 9 other files (location pages, footer variants, etc. — see `data-conflicts.md`); this implementation intentionally scoped to Navbar + Footer only, since those are the two components rendered on effectively every page. Wiring the remaining scattered instances is a mechanical follow-up, not done here to avoid unrequested scope creep.

## Not implemented — no existing trigger point

| Event | Why not implemented |
|---|---|
| `technical_recommendation_submit` | No "technical recommendation" flow exists anywhere in the current UI (checked `RfqForm.jsx`, `Contact.jsx` for any such concept). Wiring this would require designing new form UI, which is outside the approved scope (measurement only, no new UI). |
| `material_comparison_request` | No material/grade comparison tool exists in the current UI (`grep` for "compare"/"comparison" across the RFQ and contact forms returned nothing). Same reasoning — would require new UI. |
| `rfq_upload` | The RFQ form (`RfqForm.jsx`) and contact quote form have no file-upload input field. Same reasoning. |

These three are logical candidates for the enhanced RFQ field model described separately in `reports/rfq-funnel-recommendation.md` (item 9) — once that UI exists, adding the corresponding `trackEvent()` call is a 2-line change following the same pattern as the events above.

## PII exclusion verification

Explicitly checked against the instruction: "Do NOT send: name, email, phone, company name, RFQ contents, uploaded document contents, other PII to GA4."

- `RfqForm.jsx`: form has `name`, `email`, `phone`, `company`, `message`/requirements fields — none of these are read into the `trackEvent()` call. Only `product_category`, `application`, `destination_country` are passed.
- `Contact.jsx`: same pattern — `formData.name`, `.email`, `.phone`, `.message` exist on the form object but are never referenced in either `trackEvent()` call.
- `Downloads.jsx` `LeadModal`: the modal collects name/email/phone/company for Web3Forms; only `item.category` and `item.name` (a **product** name like "High Alumina Bricks (HA-45 to HA-90)", not a person's name) are passed to `trackEvent()`.
- Confirmed empirically during local testing: intercepted every `window.gtag('event', ...)` call and inspected the full `params` object — no PII field was ever present in any of the 8 real event fires captured across the 7 test runs.

## What was NOT done in this pass

- Not committed to git.
- Not deployed to staging or production.
- No GA4 dashboard/Explore configuration (custom reports, conversion marking in the GA4 UI) — that is an admin-console step outside code, and outside current API access.
- No wiring for `technical_recommendation_submit`, `material_comparison_request`, `rfq_upload` (see table above).
- No wiring for tel:/mailto: instances outside Navbar/Footer (scattered across other files, listed in `data-conflicts.md`).

## Next step (requires approval)

Review this report and the local test methodology above. If approved, the change set (7 files: `lib/analytics.js` new, `RfqForm.jsx`, `Contact.jsx`, `Downloads.jsx`, `Navbar.jsx`, `Footer.jsx`, `WhatsAppButton.jsx`) is ready to commit. No commit has been made yet.
