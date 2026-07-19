# Prompt Library — Generate

## SELECT prompt
"""
From these candidate stories (headline, URL, date, snippet), score each 0–100 using
references/scoring.md. Drop anything under 62 and anything on the ignore list. Return a table:
headline | score | factor breakdown | one-line why-it-matters | best cornerstone link. Pick the
single highest-value story to write today; hold or drop the rest with a reason.
"""

## WRITE prompt
"""
Write a /news article for SAPL from templates/article.template.md about <STORY>. Rules:
- Summarize the event in 2–4 sentences with the key cited number; do NOT rewrite the news.
- Add original engineering, procurement, maintenance, thermal, and materials analysis.
- Answer-first in every section. Plain technical English, refractory-engineer voice. No AI-tells,
  no hype, no keyword stuffing.
- Every figure cites a real source URL from the research; if you can't cite it, cut it.
- Answer the GEO question set. Write 4–6 answer-shaped FAQs.
- Link ≥2 cornerstone/product pages (references/clusters.md) + ≥1 related /news item, natural anchors.
- SAPL mention = engineering context only, never a pitch.
Output: (1) filled article template, (2) a newsData.js entry per templates/newsData.entry.template.js.
Then run checklists/qa.md and list any residual uncertainty.
"""

## SOCIAL prompt
"""
From the finished article, produce: a LinkedIn post (120–200 words, one stat, engineer voice, soft
CTA to /news), an X thread (4–6 posts), and a 60–90 word newsletter blurb. No hashtags spam, no hype.
"""

## Anti-AI-tell reminder
Ban: "in today's fast-paced world", "it's important/worth noting", "in conclusion", "delve",
"landscape", "game-changer", "unlock", "leverage" (as filler), em dashes of any kind (use commas, colons or periods instead), rhetorical
question openers. Prefer concrete numbers, part names, temperatures, standards, and shop-floor cause→effect.
