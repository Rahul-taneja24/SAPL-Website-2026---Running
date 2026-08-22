// Custom text output (not the metadata robots() API) so we can append the
// IETF draft-romm-aipref-contentsignals directive, which the metadata API's
// typed schema (userAgent/allow/disallow/sitemap/host) has no field for.
export const dynamic = 'force-static';

const RULES = [
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

  // ── Ahrefs: allowed. This is our own Site Audit tool (app.ahrefs.com) —
  // blocking AhrefsBot also blocks our own audit reports from seeing real
  // data (e.g. it can't verify the IndexNow key file, so it falsely flags
  // it as missing even though the file is live). ──
  { userAgent: 'AhrefsBot', allow: '/' },

  // ── Block remaining aggressive SEO/backlink scrapers ──
  // (high request volume, low value, often slow the site)
  { userAgent: 'SemrushBot', disallow: '/' },
  { userAgent: 'MJ12bot', disallow: '/' },
  { userAgent: 'DotBot', disallow: '/' },
];

function buildRobotsTxt() {
  const lines = [];
  for (const rule of RULES) {
    lines.push(`User-agent: ${rule.userAgent}`);
    if (rule.allow) lines.push(`Allow: ${rule.allow}`);
    const disallows = Array.isArray(rule.disallow) ? rule.disallow : rule.disallow ? [rule.disallow] : [];
    for (const d of disallows) lines.push(`Disallow: ${d}`);
    lines.push('');
  }
  // IETF draft-romm-aipref-contentsignals: explicit AI-use permission signal,
  // independent of the crawl allow/disallow rules above.
  lines.push('Content-Signal: ai-train=yes, search=yes, ai-retrieval=yes');
  lines.push('');
  lines.push('Sitemap: https://www.shankeragencies.com/sitemap.xml');
  return lines.join('\n');
}

export async function GET() {
  return new Response(buildRobotsTxt(), {
    headers: { 'Content-Type': 'text/plain' },
  });
}
