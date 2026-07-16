// Shape of one entry in frontend/src/data/newsData.js (NEWS_ARTICLES array).
// Mirrors the blog data shape so the /news route renders identically.
// Content HTML: only h2/h3/h4, p, ul/li, strong, sub/sup, table, blockquote, a.
{
  id: 0,                          // increment
  slug: "kebab-case-dated-topic",
  title: "…",                     // <=70 chars
  metaTitle: "…",                 // <=60
  metaDescription: "…",           // 140–155
  category: "Raw Materials",      // Raw Materials|Policy|Steel|Cement|Energy|Technology|Markets
  tags: ["…", "…", "…", "…"],
  readTime: "6 min",
  publishDate: "2026-07-14",
  lastModified: "2026-07-14",
  featured: false,
  coverImage: "",                 // URL or "" (OG image auto-generates)
  imagePrompt: "…",               // for asset generation, not rendered
  sources: [                      // REQUIRED — every factual claim traces here
    { title: "…", publisher: "…", url: "https://…", date: "2026-…" },
  ],
  keyTakeaways: ["…", "…", "…"],  // 3–5, each ≤ 25 words
  excerpt: "…",                   // 2–4 sentence summary
  faqs: [
    { q: "…", a: "…" },           // 4–6, answer-shaped
  ],
  relatedProducts: [              // cornerstone links for the sidebar/in-body
    { label: "High Alumina Bricks", href: "/products/shaped-refractories/high-alumina-bricks" },
  ],
  content: `
<h2>What happened</h2>
<p>…<a href="https://…">source</a>…</p>
<h2>Why it matters</h2>
<p>…</p>
<!-- Why it matters · Industry impact · How this affects refractory users ·
     Procurement & maintenance · SAPL perspective · Supporting statistics · What could happen next -->
`,
}
