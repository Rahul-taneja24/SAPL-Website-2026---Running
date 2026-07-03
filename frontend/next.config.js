/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'shankeragencies.com' },
      { protocol: 'https', hostname: 'www.shankeragencies.com' },
      { protocol: 'https', hostname: 'www.cumi-murugappa.com' },
      { protocol: 'https', hostname: 'mahakoshalrefractories.com' },
    ],
  },
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.shankeragencies.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shankeragencies.com',
  },
  // Security + SEO headers (Lighthouse Best Practices + HSTS for search trust)
  async headers() {
    // Content-Security-Policy. Whitelist only the third-party origins the
    // app actually loads (Unsplash images, Google Maps iframe, Web3Forms POST,
    // GBP share link). Block-everything-else default — completes the security
    // posture flagged in the GEO audit (M2).
    const cspValue = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://c.clarity.ms",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.shankeragencies.com https://shankeragencies.com https://www.cumi-murugappa.com https://mahakoshalrefractories.com https://ifglgroup.com https://maps.gstatic.com https://maps.googleapis.com https://*.clarity.ms https://www.google-analytics.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.web3forms.com https://www.bing.com https://api.indexnow.org https://*.clarity.ms https://www.google-analytics.com",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "frame-ancestors 'none'",
      "form-action 'self' https://api.web3forms.com",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Content-Security-Policy', value: cspValue },
        ],
      },
      // Raw PDF downloads: keep them out of the index, point crawlers to HTML landing pages
      {
        source: '/:path*.pdf',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
  // Consolidate apex host → www to avoid duplicate content and split PageRank.
  // HTTP→HTTPS is handled first (x-forwarded-proto check) so plain-HTTP requests
  // on both apex and www land on https://www.shankeragencies.com in one hop.
  async redirects() {
    return [
      // HTTP apex → HTTPS www (single hop)
      {
        source: '/:path*',
        has: [
          { type: 'header', key: 'x-forwarded-proto', value: 'http' },
          { type: 'host', value: 'shankeragencies.com' },
        ],
        destination: 'https://www.shankeragencies.com/:path*',
        permanent: true,
      },
      // HTTP www → HTTPS www
      {
        source: '/:path*',
        has: [
          { type: 'header', key: 'x-forwarded-proto', value: 'http' },
          { type: 'host', value: 'www.shankeragencies.com' },
        ],
        destination: 'https://www.shankeragencies.com/:path*',
        permanent: true,
      },
      // HTTPS apex → HTTPS www. statusCode: 301 is explicit — permanent: true
      // alone emits 308 which Vercel can serve as 307 on has-matched redirects.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'shankeragencies.com' }],
        destination: 'https://www.shankeragencies.com/:path*',
        statusCode: 301,
      },
      // /brands/ifgl was removed — redirect to flow-control category
      {
        source: '/brands/ifgl',
        destination: '/products/flow-control',
        permanent: true,
      },
      // /abouts (typo URL crawled by Google) → /about
      {
        source: '/abouts',
        destination: '/about',
        permanent: true,
      },
      // Phantom /link/acid-proofing-material (indexed, never existed) → acid-proofing hub
      {
        source: '/link/acid-proofing-material',
        destination: '/products/acid-proofing',
        permanent: true,
      },
      // /case-studies/* was renamed to /engineering-references/* on 2026-05-08
      // (rebrand from project-record framing to illustrative-reference framing).
      // Permanent redirect preserves any link equity + ensures AI crawlers
      // update their entity graph cleanly.
      {
        source: '/case-studies/:slug*',
        destination: '/engineering-references/:slug*',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/engineering-references',
        permanent: true,
      },
      // Legacy product slugs → current pages. These old URLs were indexed by
      // Google before the catalog was renamed; 301 sends visitors and crawlers
      // straight to the live page (no duplicate content, no 404).
      {
        source: '/products/unshaped-refractories/ultra-low-cement-castable',
        destination: '/products/unshaped-refractories/ultra-low-cement-castables',
        permanent: true,
      },
      {
        source: '/products/unshaped-refractories/refractory-mortar',
        destination: '/products/unshaped-refractories/refractory-mortars',
        permanent: true,
      },
      {
        source: '/products/unshaped-refractories/gunning-mix',
        destination: '/products/unshaped-refractories/gunning-materials',
        permanent: true,
      },
      {
        source: '/products/unshaped-refractories/lcc-castable',
        destination: '/products/unshaped-refractories/low-cement-castables',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
