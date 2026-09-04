# SAPL Website — Design & Content Conventions

This is the reference for how pages, blog posts, and news articles on
shankeragencies.com are styled. Follow it when adding new pages or content so
the site stays visually consistent. It also documents two real bugs found and
fixed on 2026-09-04 (broken table/blockquote styling, inconsistent hero
images) so they aren't reintroduced.

## 1. Colors

| Role | Value | Usage |
|---|---|---|
| Navy (primary dark) | `#1E3A5F` → `#1E40AF` | Headings, table headers, buttons, and the header/hero gradient — see §1a |
| Orange (accent/CTA) | `#F97316` | Buttons, links-on-dark, left-border accents, category pills |
| Orange (hover) | `#EA580C` | Button hover state |
| Blue (secondary accent) | `#3B82F6` | Links, icon accents, secondary buttons |
| WhatsApp green | `#25D366` | WhatsApp CTA only |
| Body text | `#374151` (gray-700) | Paragraph text |
| Muted text | `#6B7280` (gray-500) | Captions, meta text |

Fonts: **Oswald** for all headings (`font-oswald`), **Inter** for body text
(`font-inter`, and the Tailwind default). Both loaded via `next/font/google`
in `app/layout.jsx`.

### 1a. `#1E3A5F` → `#1E40AF` is the one navy pair to use

The site's real, persistent header — the top contact-bar strip visible on
every page (`src/components/Navbar.jsx`,
`bg-gradient-to-r from-[#1E3A5F] to-[#1E40AF]`) — is built from exactly these
two hex values, and they're also what headings, nav text, and buttons use
throughout the site (`#1E3A5F` alone, ~390 occurrences). **Use this pair for
any navy gradient or navy fill.**

Two other navies exist on the site and are reserved, narrower-scope
exceptions, not general-purpose alternatives:
- `#0B1628` — a darker navy used only for the footer, OpenGraph share-card
  backgrounds, and a couple of dark info cards (`About.jsx`,
  `CompanyProfile.jsx`). Don't reach for it outside those contexts.
- `#1B1464` — the actual dominant ink color sampled directly from
  `public/images/sapl-logo.png` (verified by pixel-counting the PNG, not
  guessed). This is arguably the "truest" brand navy since it comes from the
  logo file itself, but it isn't used anywhere in the site's CSS today. If
  the brand navy is ever formally rebased on this value, it's a deliberate,
  site-wide decision (390+ occurrences to update) — don't introduce it
  piecemeal in just one component.

The blog and news article hero gradient used to carry its own bespoke navy
(`rgba(15,30,70,...)` → `rgba(30,58,138,...)`, i.e. `#0F1E46` →
`#1E3A8A`) — close to `#1E3A5F`/`#1E40AF` but not identical, which made the
hero read as a visibly different navy from the table headers and headings
right below it on the same page. Fixed 2026-09-04 to use the real pair.

## 2. ⚠️ `@tailwindcss/typography` is NOT installed

`package.json` and `tailwind.config.js` do not include
`@tailwindcss/typography`. This means **any `prose-*:` modifier class
(`prose-th:`, `prose-td:`, `prose-blockquote:`, `prose-table:`,
`prose-headings:`, etc.) compiles to nothing** — Tailwind silently drops
classes it doesn't recognize. Bare `prose` / `prose-lg` also do nothing on
their own without the plugin.

This was a real, live bug: the blog article template applied a full set of
`prose-th:bg-[#1E3A5F] prose-td:border ...` classes intending to style
article tables and blockquotes, and none of it worked — tables rendered with
zero padding/borders (cell text visually ran together) and blockquotes
rendered as plain text.

**The fix (already applied, see `app/globals.css` "PROSE & CONTENT"
section):** real hand-written CSS under the plain `.prose` class —
`.prose table`, `.prose thead th`, `.prose tbody td`, `.prose blockquote`,
`.prose a`, `.prose code`, `.prose strong` — styles any HTML dropped into a
`.prose` container via `dangerouslySetInnerHTML`.

**Rule going forward:** if you need to style raw HTML content, either add a
plain descendant rule to the `.prose` block in `globals.css`, or actually
install `@tailwindcss/typography` and remove the dead `prose-*:` classes.
Do not add more `prose-*:` modifier classes expecting them to work —
verify in a rendered page first.

Any page rendering user/CMS-style HTML content via `.prose` (currently:
`app/blog/[articleSlug]/page.jsx`, `app/news/[slug]/page.jsx`,
`app/refractory-supplier-in/[locationSlug]/page.jsx`,
`app/about/rahul-taneja/page.jsx`) automatically inherits this fix.

## 3. Article-style hero (blog posts & news articles)

Both `/blog/[slug]` and `/news/[slug]` use the same hero pattern: a navy
gradient **over** the post's `coverImage`, not a flat gradient with the image
shown separately below.

```jsx
<section
  className="relative py-16 md:py-24 overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: post.coverImage
      ? `linear-gradient(135deg, rgba(15,30,70,0.94) 0%, rgba(30,58,138,0.88) 100%), url('${post.coverImage}')`
      : 'linear-gradient(135deg, rgba(15,30,70,0.97) 0%, rgba(30,58,138,0.92) 100%)',
  }}
>
```

This matches the hero treatment already used on `/blog` (listing page),
`/knowledge`, and `/solutions` — see `src/sections/Blog.jsx`,
`KnowledgeBase.jsx`, `IndustrySolutions.jsx` for the same
`linear-gradient(...), url('...')` pattern. **Do not** also render the
`coverImage` a second time as a separate boxed `<img>` below the hero — it's
already the hero background, so a second copy is a redundant duplicate.

A faint orange grid overlay (`opacity-[0.04]`, 60px grid) sits on top of the
hero background on every article page — keep it, it's a deliberate texture
layer, not a leftover.

If a post/article has no `coverImage`, the hero falls back to the flat
gradient (no broken image, no missing background).

**Hero height stays roughly consistent across posts** because two variable-
length fields are bounded, not because the hero has a fixed height:
- the excerpt paragraph carries `line-clamp-2` (posts range from one short
  sentence to two long ones — unclamped, some heroes were visibly taller
  than others)
- the tag-pill row shows only the first 4 tags (`post.tags.slice(0, 4)`)
  plus a `+N more` pill if there are more — posts carry 4 to 8 tags, and an
  unclamped row could wrap to two or three lines on tag-heavy posts

Title length is the one remaining source of height variance (1–3 lines) —
that's left alone since clamping an `<h1>` or truncating SEO titles isn't
worth the tradeoff. Keep both bounds when touching this section; removing
either reintroduces the inconsistency.

## 4. Blog/news post content HTML conventions

Post `content` fields are raw HTML strings rendered via
`dangerouslySetInnerHTML` inside the `.prose` container. Conventions used
across posts:

- **Headings:** `<h2>` for main sections, `<h3>`/`<h4>` for sub-sections.
  Prefer **question-phrased H2s** where natural (e.g. "What Are the Four
  Castable Duty Classes?") — this matches how people actually search and
  how AI answer engines pull passages (AEO).
- **Tables:** plain `<table><thead><tr><th>...</th></tr></thead><tbody>...`.
  No extra classes needed — `.prose table` styling and the sub-1024px
  horizontal-scroll rule (`app/globals.css`) apply automatically.
- **Callout boxes:** use `<blockquote>` for a "quick answer", "how to read
  this", or pull-quote style box. It renders with the orange left border +
  cream background automatically (see §2) — don't hand-roll a styled `<div>`
  for this.
- **Inline images:** use the `<figure>` + `<img>` + `<figcaption>` pattern:
  ```html
  <figure style="margin:1.5rem 0">
    <img src="https://images.unsplash.com/photo-XXXXXXXXXX?w=900&q=80"
         alt="Descriptive alt text" style="width:100%;border-radius:12px" loading="lazy" />
    <figcaption style="font-size:0.85rem;color:#6b7280;margin-top:0.5rem;text-align:center">
      Caption text
    </figcaption>
  </figure>
  ```
- **FAQs:** use the post's `faqs: [{question, answer}]` array, not inline
  HTML — the template renders these as an accordion and feeds FAQPage
  schema automatically.

## 5. Sourcing images

- Only `https://images.unsplash.com/...` is allowlisted in CSP `img-src` for
  general stock photography (plus `shankeragencies.com`,
  `cumi-murugappa.com`, `mahakoshalrefractories.com`, `ifglgroup.com` for
  partner-hosted assets — see `next.config.js`). Any other external image
  host will be silently blocked by CSP even if the `<img>` tag looks fine.
- **Always verify an Unsplash URL actually resolves (curl for a 200) before
  committing it.** Guessed/misremembered photo IDs 404 often — this session
  found 3 dead Unsplash cover images and one 403 (hotlinked directly from a
  partner's own WordPress site, which enforces hotlink protection) already
  live on the site before this fix. Don't hotlink a third party's own site
  for a stock photo — use Unsplash instead.
- Prefer reusing an already-verified-working photo ID from elsewhere in
  `blogPostsData.js` over guessing a new one — many guessed IDs turn out to
  be completely unrelated images (this session hit an apartment building and
  a pizza while guessing "industrial" IDs blind). If picking a new one,
  download and actually look at it before committing.

## 6. Component patterns

- Cards: `rounded-2xl` with `shadow-lg` or `border border-gray-100`.
- Primary CTA button: `bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl
  font-semibold`.
- Dark info panel (e.g. "About Shanker Agencies" sidebar): `bg-[#1E3A5F]
  rounded-2xl text-white`.
- Section heading with accent bar: `border-l-4 border-[#F97316] pl-4`.

## 7. Company facts (use verbatim, don't approximate)

- CIN: `U51909DL2012PTC232825`
- GST: `07AARCS1944B1ZC`
- Registered address: 553, Main Grand Trunk Road, East Ram Nagar, Shahdara,
  Delhi 110032
- Real brand partners (exactly 7, confirmed in `src/sections/Brands.jsx`):
  CUMI, Crown Ceramics, Divine Cerawool (authorized dealer), Calderys, TRL
  Krosaki, Saint-Gobain, Mahakoshal (supply partner). IFGL is a genuine
  competitor, not a partner — don't imply otherwise.
- Since 1980, exporting to 50+ countries.

Source of truth for all of the above is the live code
(`app/layout.jsx` Organization schema, `src/sections/Brands.jsx`), not this
document — if they ever disagree, the code wins and this file should be
updated to match.
