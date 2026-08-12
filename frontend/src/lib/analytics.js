'use client';

/**
 * Fires a GA4 custom event via the gtag.js loader already installed in
 * app/layout.jsx. No-ops safely if gtag hasn't loaded yet (blocked, or
 * fired before hydration) so it never throws on the calling component.
 *
 * NEVER pass PII here: no name, email, phone, company, message/RFQ
 * contents, or file contents. Only non-identifying context: product
 * family/slug, application, market, and which CTA fired the event.
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );

  window.gtag('event', eventName, {
    page_location: window.location.href,
    page_title: document.title,
    ...clean,
  });
}
