# Analytics Status: GA4 & Conversion Tracking

Investigation only, based on static code inspection. No GA4 API connector is available in
this session, so the GA4 property's actual received data (real user counts, whether
events are firing in practice) could not be checked directly. Where that's the case it's
marked UNKNOWN, not assumed either way.

---

## IMPLEMENTED

- **GA4 base pageview tracking.** Live measurement ID `G-TJJH0RD6ZC`, loaded via
  `gtag.js` in `app/layout.jsx:369`, `strategy="afterInteractive"` so it doesn't block
  render. Standard `gtag('config', ...)` pageview call fires on every page load.
- **Google Tag** (same ID, doubles as GA4 + any linked Ads/GTM config per the comment at
  `app/layout.jsx:27`).
- **Microsoft Clarity** (`app/layout.jsx:383`, separate from GA4 but worth noting since
  it's a real session-replay/heatmap signal already live).

## NOT IMPLEMENTED

- **No custom GA4 events anywhere in the codebase.** Searched every `.jsx`/`.js` file
  under `src/` and `app/` for `gtag('event'` or `window.gtag(` calls beyond the base
  config in `layout.jsx`, zero results.
- Specifically confirmed absent:
  - `rfq_submit` — `RfqForm.jsx:25` has a `handleSubmit` function, no analytics call inside it
  - Contact form submit — same, `Contact.jsx:100` `handleSubmit`, no analytics call
  - `whatsapp_click` — `WhatsAppButton.jsx` is a plain `<a href="https://wa.me/...">`,
    no `onClick` handler at all, so no click event, tracked or otherwise
  - `phone_click`, `email_click` — not checked file-by-file for every `tel:`/`mailto:`
    link, but given the pattern above (zero event calls found project-wide), assume the
    same until proven otherwise
  - `technical_recommendation_submit`, `datasheet_request`, `material_comparison_request`,
    `rfq_upload` — none of these flows exist yet at all (datasheets are WhatsApp-message
    links, not form submissions, so there's no submission point to attach an event to)

**Net effect**: GA4 currently tells you traffic volume and behavior (pageviews, sessions,
Clarity heatmaps) but **nothing about conversions**. Every RFQ, WhatsApp click, or contact
form submission is invisible to GA4 today.

## UNKNOWN / ACCESS REQUIRED

- **Whether the GA4 property itself is correctly configured on Google's side**
  (data streams, enhanced measurement toggles, any server-side tagging), can't be checked
  without GA4 API or dashboard access, which isn't available in this session.
- **Whether "Enhanced Measurement" is enabled**, GA4's automatic feature that tracks
  outbound clicks, file downloads, and scroll depth without custom code. If enabled, it
  may already be capturing WhatsApp-link clicks and datasheet-request links as generic
  outbound-click/file-download events, just not as the named, purpose-built events
  (`whatsapp_click`, `datasheet_request`) the handoff spec wants. This genuinely can't be
  confirmed from code alone, it's a dashboard-side setting.
- **Real traffic/event volume.** No number can be reported without direct GA4 access.

## What this means for the roadmap

The honest starting point is: **you have pageview-level GA4 data, not conversion data.**
Wiring the specific events listed in the automation spec (`rfq_submit`,
`whatsapp_click`, etc.) is straightforward, small code changes to three files
(`RfqForm.jsx`, `Contact.jsx`, `WhatsAppButton.jsx`), no architecture change required.
That's a real, cheap, high-value P1 task once you confirm you want it (it wasn't clear
from the original handoff whether GA4 event conventions should follow the spec's naming
exactly or match anything already configured GA4-side, worth a quick check before
implementing so the event names actually land in existing GA4 reports rather than
creating orphaned custom events).
