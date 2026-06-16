export default function robots() {
  return {
    rules: [
      // Default: allow all
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/_next/'] },

      // ── OpenAI (ChatGPT search, plugins, browse) ──
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },

      // ── Anthropic (Claude) ──
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },

      // ── Perplexity ──
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },

      // ── Google (AI Overviews, Gemini, Search) ──
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GoogleOther', allow: '/' },

      // ── Microsoft (Bing, Copilot) ──
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'BingPreview', allow: '/' },

      // ── Apple ──
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },

      // ── Common AI training crawlers ──
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'DuckAssistBot', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'Diffbot', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'DataForSeoBot', allow: '/' },

      // ── Social/Meta ──
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'FacebookBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },

      // ── Block aggressive SEO/backlink scrapers ──
      // (high request volume, low value, often slow the site)
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
    ],
    sitemap: 'https://www.shankeragencies.com/sitemap.xml',
  };
}
