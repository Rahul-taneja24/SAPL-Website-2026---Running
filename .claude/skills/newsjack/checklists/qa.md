# Editorial / Compliance QA Gate

Block the draft (do not open the PR) if **any** check fails. Flag residual uncertainty in the PR body.

## Factual integrity
- [ ] Every number, date, name, and quote traces to a cited source URL.
- [ ] Sources are reputable (see `references/beats.md` trusted list); no content-farm or AI-spam sources.
- [ ] No paraphrase that changes the source's meaning; no fabricated causation.
- [ ] Uncertain/unconfirmed points are labeled as such, not stated as fact.

## Originality & value
- [ ] Not a rewrite — adds engineering/procurement/maintenance/thermal/materials analysis.
- [ ] Not a duplicate of an existing `/news` or `/blog` post (check slugs + topic).
- [ ] ≥700 words of real analysis; no thin/filler content.

## Google spam-policy compliance
- [ ] No keyword stuffing; natural language; no doorway/scaled-content feel.
- [ ] Genuine E-E-A-T: named author, engineering specifics, real experience framing.

## Style
- [ ] No clickbait, hype, or exaggeration; headline matches body.
- [ ] No AI-tells ("in today's fast-paced world", "it's important to note", filler transitions).
- [ ] SAPL mention reads as engineering context, not a sales pitch.

## GEO / AEO / technical
- [ ] Answers the GEO question set (why/cause/who/materials/what-to-do/alternatives/next).
- [ ] 4–6 answer-shaped FAQs.
- [ ] ≥2 cornerstone/product links + ≥1 related-news link, natural anchors.
- [ ] Schema present: NewsArticle + FAQPage + BreadcrumbList + Organization/Person author.
- [ ] Canonical + OpenGraph + Twitter card set.

## Output
- [ ] Entry added to `newsData.js`; draft saved to `content/news-drafts/<slug>.md`.
- [ ] Draft PR opened on branch `news/<slug>` with score breakdown, sources, uncertainty flags.
- [ ] **Not merged.**
