/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'shankeragencies.com' },
      { protocol: 'https', hostname: 'www.shankeragencies.com' },
    ],
  },
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.shankeragencies.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shankeragencies.com',
  },
  // Security + SEO headers (Lighthouse Best Practices + HSTS for search trust)
  async headers() {
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
    ];
  },
};

module.exports = nextConfig;
