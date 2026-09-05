/**
 * Admin route segment layout.
 *
 * Sole purpose: keep /admin and /admin/dashboard out of the search index.
 *
 * Both admin pages are 'use client' components, so they cannot export
 * `metadata` themselves — this server-component layout is the only place the
 * robots directive can be set for the segment.
 *
 * Why it was needed: /admin returned 200 and inherited the site-wide
 * `index, follow` robots tag (verified on production 2026-09-05), i.e. a
 * bare login screen was explicitly inviting indexation. robots.txt already
 * carries `Disallow: /admin`, but a Disallow only stops crawling — it does
 * not stop Google indexing a URL it finds linked elsewhere, and it actively
 * prevents Google from ever *seeing* a noindex tag. Setting noindex here
 * means that if the Disallow is ever relaxed, the directive is already in
 * place and the pages drop out cleanly.
 */
export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({ children }) {
  return children;
}
