/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'shankeragencies.com' },
      { protocol: 'https', hostname: 'www.shankeragencies.com' },
      { protocol: 'https', hostname: 'www.cumi-murugappa.com' },
      { protocol: 'https', hostname: 'mahakoshalrefractories.com' },
      { protocol: 'https', hostname: 'ifglgroup.com' },
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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.shankeragencies.com https://shankeragencies.com https://www.cumi-murugappa.com https://mahakoshalrefractories.com https://ifglgroup.com https://maps.gstatic.com https://maps.googleapis.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.web3forms.com https://www.bing.com https://api.indexnow.org",
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
  // Consolidate apex host → www to avoid duplicate content and split PageRank
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'shankeragencies.com' }],
        destination: 'https://www.shankeragencies.com/:path*',
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
    ];
  },
};

module.exports = nextConfig;
