# Market/Location Reconciliation: Saudi Arabia & Oman

Investigation only. No pages created, moved, or deleted.

**Method**: did not take the external audit's claim on trust. Checked three independent
things: (1) what the site currently covers, (2) what real GSC data shows for the pages
that exist, (3) external verification of the actual industrial geography.

---

## Current coverage (repo-verified)

| Country | Pages that exist | Pages that don't exist |
|---|---|---|
| Saudi Arabia | `riyadh`, `jeddah` | Jubail, Dammam, Yanbu |
| Oman | `muscat` | Sohar, Salalah |

This alone is the headline finding: **the site has zero pages for Jubail, Dammam, Yanbu,
or Sohar**, regardless of whether Riyadh/Muscat should be deprioritized. This isn't an
optimization question, it's a coverage gap.

## What real GSC data shows (last 30 days, pulled earlier this session)

| Page | Clicks | Impressions | Avg. position |
|---|---|---|---|
| `/refractory-supplier-in/riyadh` | 8 | 140 | 5.8 |
| `/refractory-supplier-in/muscat` | 10 | 138 | 11.5 |
| `/refractory-supplier-in/jeddah` | not in top 100 rows pulled | — | — |

Riyadh and Muscat aren't dead pages, they get real impressions and clicks. Jeddah is
essentially invisible in the last 30 days of data. There's no GSC signal for
Jubail/Dammam/Yanbu/Sohar because **no page exists to attribute traffic to**, the absence
of data here is a coverage blind spot, not evidence of low demand.

## External verification (not assumed from the audit)

**Saudi Arabia**: Jubail Industrial City is home to most of the kingdom's heavy industry
(petrochemicals, refining, steel, aluminum), estimated at ~7% of Saudi GDP alone, run by
a dedicated authority (Royal Commission for Jubail and Yanbu). Dammam and Jubail together
are described as "the industrial hearts of Saudi Arabia." Yanbu is a second major
refining/petrochemical hub on the Red Sea. Riyadh's role is explicitly logistics and
commercial, not heavy industry, "steel factories are located in Jubail while logistics
hubs are in Riyadh."

**Oman**: Sohar Industrial Port hosts Oman's only primary aluminium smelter (Sohar
Aluminium, 375,000 t/year) and a steel EAF plant (Sohar Steel), plus a metals/petrochemical
cluster. Muscat's industrial activity (Rusayl estate) is smaller and weighted toward
secondary/finishing operations, not primary smelting or steelmaking.

This **independently confirms** the external audit's directional claim on both countries.
Noted separately as a competitive signal, not part of this task: a real refractory
manufacturer ("Industrial Technologies and Energy") appears to already be established in
Oman's Sohar cluster, worth a look in a future competitor pass.

## What's still unknown

- **SAPL's actual commercial relevance** to Jubail/Dammam/Yanbu/Sohar/Salalah, i.e.
  existing enquiries, quotes, or shipments to these specific locations. No CRM/RFQ export
  was available to check. This needs your input, not something derivable from the repo.
- Whether Riyadh/Muscat traffic is itself industrial-procurement intent or general/admin
  searches that happen to route through the capital. GSC's page-level data shows
  clicks/impressions but not query-level intent breakdown at a granular enough level to
  fully separate the two without a deeper query pull.

## Per-city breakdown

| City | A. Search opportunity | B. Industrial/procurement relevance | C. SAPL commercial relevance | D. Dedicated page justified? | E. Country page as primary? | F. City/cluster page? |
|---|---|---|---|---|---|---|
| Riyadh | Confirmed real (140 impr/30d) | Low, admin/commercial capital, not a heavy-industry corridor | Unknown, needs your input | Keep existing page, but reposition as commercial/logistics-intent, not primary industrial target | — | Keep as secondary |
| Jeddah | Unconfirmed, near-zero in last 30d | Moderate, major port, general commercial | Unknown | Keep, low priority | — | Keep as secondary |
| **Jubail** | Unconfirmed, no page exists to measure | **High**, ~7% of Saudi GDP, steel/petrochemical/aluminum heartland | Unknown, needs your input | **Yes, real gap** | Candidate for Saudi's primary industrial-intent page | Yes |
| **Dammam** | Unconfirmed, no page exists to measure | **High**, industrial + port + logistics core | Unknown | **Yes, real gap** | Co-primary with Jubail (adjacent industrial zone) | Yes |
| Yanbu | Unconfirmed, no page exists to measure | High, second refining/petrochemical hub (west coast) | Unknown | Worth doing after Jubail/Dammam | — | Yes, third priority |
| Muscat | Confirmed real (138 impr/30d) | Low-moderate, secondary/finishing steel only | Unknown | Keep existing page, reposition as commercial-intent | — | Keep as secondary |
| **Sohar** | Unconfirmed, no page exists to measure | **High**, Oman's only primary aluminium smelter + steel EAF + port | Unknown, needs your input | **Yes, real gap** | Candidate for Oman's primary industrial-intent page | Yes |
| Salalah | Unconfirmed, no page exists to measure | Moderate, secondary port/freezone | Unknown | Lower priority than Sohar | — | Only if demand confirmed later |

## Recommendation (not yet executed)

1. Don't delete or redirect Riyadh/Muscat/Jeddah, they have real, if modest, GSC traction
   and removing them would lose existing signal.
2. The real gap is additive: **build Jubail, Dammam, and Sohar first** (the three with
   independently confirmed heavy-industry relevance and zero current coverage), Yanbu and
   Salalah after.
3. Whether these become genuinely new `/refractory-supplier-in/[city]/` pages or feed
   into a country-level `/markets/saudi-arabia/` and `/markets/oman/` hub structure
   (Phase 5 of the roadmap) is an architecture decision, not resolved here, flagged for
   that phase.
4. Before writing a single word of content for Jubail/Dammam/Sohar, get real input on
   whether SAPL has actual commercial history there (existing clients, enquiries,
   shipments). Writing "we serve Jubail" without that would repeat the exact kind of
   unsubstantiated-claim problem already flagged in the grade-count and E-E-A-T reviews.
