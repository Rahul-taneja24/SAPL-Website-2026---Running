# Story Scoring Algorithm (0–100)

Score every candidate. **Publish threshold = 62.** Below → skip and log the reason.

## Factors, weights, and 0–10 rubric (score ×weight/10, summed)

| Factor | Weight | 0–3 (low) | 4–7 (mid) | 8–10 (high) |
|---|---|---|---|---|
| **Search demand** | 20 | niche/no volume | steady term | spiking/breakout query |
| **Industry relevance** | 20 | tangential | adjacent sector | core refractory/furnace buyer topic |
| **Buyer intent** | 18 | awareness only | planning-stage | active procurement/maintenance trigger |
| **AI-citation likelihood** | 15 | opinion piece | some facts | crisp factual Q&A + data table shape |
| **News freshness** | 12 | >7 days | 2–7 days | <48h and rising |
| **Backlink potential** | 8 | commodity take | useful angle | original data others will cite |
| **Competitive difficulty** (inverse) | 7 | crowded SERP, strong incumbents | mixed | thin/fresh SERP, easy entry |

`score = Σ (rubric_i / 10 × weight_i)`  → 0–100.

## Worked example
Story: *"China tightens fused-magnesia export licensing; prices firm."*
- Search demand 7 (magnesia price is a rising query) → 14
- Relevance 10 (MgO-C bricks = steel ladle core) → 20
- Buyer intent 8 (procurement re-plans sourcing) → 14.4
- AI-citation 8 (clear cause→effect→number) → 12
- Freshness 9 → 10.8
- Backlink 6 → 4.8
- Difficulty 7 (few Indian-buyer-framed takes) → 4.9
**Total ≈ 80.9 → PUBLISH.**

## Cadence rules
- Max ~1–2 published/day. If two clear ≥62 stories, publish the higher; hold the second for tomorrow unless both are time-critical.
- **Skip publishing** when: nothing ≥62; the only candidate duplicates existing coverage; the story is pure rumor with no citable source; or it needs facts you cannot verify. A quiet day is fine.
