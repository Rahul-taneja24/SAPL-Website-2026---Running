# Named Customer / Company Claims Audit

Status date: 2026-08-12
Scope: complete audit of every named customer/company claim on the live site. **No claims changed.** Per your instruction: absence of repository evidence is recorded as "Repository evidence not found — HUMAN VERIFICATION REQUIRED," never as "claim is false."

## Method

Searched the entire repository for: quotations, invoices, RFQs, purchase orders, shipment documents, case studies, emails/messages, customer lists, project references, certificates, presentations, PDFs, and any filename containing a company name.

Findings:
- **Zero PDFs exist anywhere in the repository** (`find . -iname "*.pdf"` returns nothing).
- **Zero invoice, purchase-order, shipment, or quotation records exist** anywhere in the repository.
- **`caseStudiesData.js` cannot corroborate any named company** — confirmed by its own header comment and every `client:` field: all 6 entries use `"Application class: [generic description]"` (e.g. "160-tonne steel ladle, integrated steel plant"), deliberately anonymized, explicitly **not** records of specific SAPL project deliveries (the file says so directly, with instructions to replace with real signed-off case studies when available).
- **The `Leads.jsx` admin page and its backend API contain no seed/real data** — it's a UI shell that calls a dormant, never-deployed backend endpoint (confirmed in the earlier security-audit plan); zero customer records exist in the codebase.
- **247 distinct company names** are named across the site's 55 location pages, via the `majorPlants` field in `locationsData.js`. A bulk cross-reference found 24 of these 247 names also appear elsewhere in the repo (mostly `blogPostsData.js`) — but every one of those secondary mentions is the same category of unverified market/industry-context description, not independent corroborating evidence (spot-checked several, including the Tata Steel mention in `Brands.jsx`, which turned out to be about TRL Krosaki's joint-venture ownership structure, unrelated to any SAPL–Tata Steel customer relationship).

## Finding #1 (most severe, systemic): the auto-generated FAQ turns regional context into a client claim

This is the central finding of this audit. Two different parts of the same page render the same underlying `majorPlants` data completely differently:

**The visible page body** ([`app/refractory-supplier-in/[locationSlug]/page.jsx:525-536`](frontend/app/refractory-supplier-in/[locationSlug]/page.jsx:525)) renders it honestly, as neutral regional context:
> Heading: **"Major Industrial Plants in {city} Region"**

This is defensible — these are real, publicly known industrial plants that genuinely operate in each region, and the page doesn't claim SAPL supplies them.

**The auto-generated FAQ** ([`app/refractory-supplier-in/[locationSlug]/page.jsx:140`](frontend/app/refractory-supplier-in/[locationSlug]/page.jsx:140)) takes the exact same data and reframes it as a direct customer claim:
> *"In {city}, SAPL serves {industries} sectors. **Our major clients in the region include** {first 3 of majorPlants} and other industrial plants requiring high-performance refractory linings and insulation."*

This single template line auto-generates an **"our major clients"** claim for the first 3 `majorPlants` entries of **every one of the 55 location pages**, unconditionally, with no per-location verification. It is rendered inside the page's visible FAQ accordion (same pattern confirmed earlier for the ladle-shrouds product FAQs — these render in the DOM, not just in schema) and also feeds the page's `FAQPage` schema, so it's both human-visible and crawlable/AI-citable.

This is a **template/mechanism issue**, not a per-location content issue — fixing the wording of one location's FAQ doesn't fix the other 54.

## Finding #2: hardcoded, explicit customer/relationship claims in page prose

Separately from the FAQ template, several locations have specific, human-written sentences in `intro`/`whyUs` fields that go further than "major plants in the region" — they assert a direct SAPL relationship, sometimes with specific named companies. Full column treatment as requested:

| Company | URL | Exact claim | Source file | Where it appears | Visible on live page? | Evidence in repository? | Evidence type | Confidence | Status |
|---|---|---|---|---|---|---|---|---|---|
| Jindal Shadeed Iron & Steel | `/refractory-supplier-in/muscat` | "Shanker Agencies exports refractory products to Oman, **serving Jindal Shadeed Iron & Steel**, Sohar Aluminium, Oman Cement, and refinery operations" | `locationsData.js:344` | `content.intro` | Yes | None | — | — | Repository evidence not found — HUMAN VERIFICATION REQUIRED |
| Sohar Aluminium | `/refractory-supplier-in/muscat` | Same sentence as above | `locationsData.js:344` | `content.intro` | Yes | None found beyond generic industry-context mentions in `blogPostsData.js` (not corroborating) | — | — | Repository evidence not found — HUMAN VERIFICATION REQUIRED |
| Qatar Steel | `/refractory-supplier-in/doha` | "SAPL's export experience to Qatar **spans multiple successful shipments to Qatar Steel** and other industrial buyers" | `locationsData.js:326` | `content.whyUs` | Yes | None | — | — | Repository evidence not found — HUMAN VERIFICATION REQUIRED |
| SABIC Yanbu / Saudi Aramco Yanbu | `/refractory-supplier-in/jeddah` | "Yanbu Industrial City houses major SABIC petrochemical complexes and Saudi Aramco refining operations... **Shanker Agencies exports high-quality Indian refractories to this region**" | `locationsData.js:790` | `content.intro` | Yes | None | — | — | Repository evidence not found — HUMAN VERIFICATION REQUIRED (worded as regional export, but directly juxtaposed with the two named operations) |
| Dammam / Jubail (as ports/destinations, not named companies) | `/refractory-supplier-in/riyadh` | "Shanker Agencies **has been exporting** Indian-made refractories to Riyadh, Jeddah, Dammam and Jubail **for years**" | `locationsData.js:302` | `content.intro` | Yes | None | — | — | Repository evidence not found — HUMAN VERIFICATION REQUIRED |
| — (same page) | `/refractory-supplier-in/riyadh` | "We **provide CIF pricing** to Jeddah Islamic Port, King Abdulaziz Port (Dammam), and Jubail Commercial Port" | `locationsData.js:305` | `content.whyUs` | Yes | None | — | — | Repository evidence not found — HUMAN VERIFICATION REQUIRED |
| IOCL Haldia | `/refractory-supplier-in/haldia` | "We are **familiar with the specific refractory grades required by IOCL Haldia's heater designs** and can coordinate emergency supply within 24 hours" | `locationsData.js:1026` | `content.whyUs` | Yes | None | — | — | Repository evidence not found — HUMAN VERIFICATION REQUIRED |
| Odisha metals sector / NALCO-type | `/refractory-supplier-in/bhubaneswar` | "Shanker Agencies **has supplied to the Odisha metals sector for decades**. Our technical team understands the specific grades required for **NALCO-type** smelter applications" | `locationsData.js:1068` | `content.whyUs` | Yes | None | — | — | Repository evidence not found — HUMAN VERIFICATION REQUIRED. Note: "NALCO-type" is hedged phrasing (describes an application class, not a direct NALCO relationship claim) — lower severity than the Jindal Shadeed/Qatar Steel pattern, flagged for consistency |
| Gujarat "major plants" | `/refractory-supplier-in/ahmedabad` | "SAPL has deep roots in Gujarat's industrial ecosystem, **having supplied to major plants across the state for over four decades**" | `locationsData.js:150` | `content.whyUs` | Yes | None (no specific company named, but asserts a 40+ year supply history) | — | — | Repository evidence not found — HUMAN VERIFICATION REQUIRED |
| Jamshedpur ("reliable supply") | `/refractory-supplier-in/jamshedpur` | "Our dedicated logistics network **ensures reliable supply to Jamshedpur**" | `locationsData.js:45` | `content.whyUs` | Yes | None (no specific named company, general regional-supply claim) | — | — | Lower severity — regional capability claim, not a named-company claim; included for completeness |

**Lower-severity pattern, not tabled individually**: several other locations (Tamil Nadu/Chennai, Kolkata/West Bengal, Kanpur, Coimbatore, Indore, Vietnam, Kenya, Thailand, Turkey, Philippines) use generic regional-service language ("Shanker Agencies serves this region/market") without naming a specific company as a customer. These are unverified marketing claims too, but categorically different — no identifiable real company could dispute them the way Jindal Shadeed or Qatar Steel could. Not itemized row-by-row; flagged as a class.

## Finding #3: the full `majorPlants` list (all 55 locations, 247 unique companies)

Per your instruction to check "every other named customer/company appearing in the location pages," the complete list follows. **Column note**: Source file, Where it appears, Evidence type, Confidence, and Status are identical for every row in this table (stated once below, not repeated 247 times, to keep this usable) — only Company, Location/URL, and FAQ-claim-status vary.

**Shared values for every row in this table:**
- **Source file**: `frontend/src/data/locationsData.js` (`majorPlants` array)
- **Where it appears**: (a) visible page body, honestly labeled "Major Industrial Plants in {city} Region" — no relationship claim; **and**, for the first 3 entries only, (b) the auto-generated FAQ's "our major clients" line (Finding #1)
- **Evidence type**: none found in repository (no case study, PDF, RFQ, invoice, or other record names any of these companies)
- **Confidence**: none assignable — no evidence to weigh
- **Status**: for the "Regional context only" column below — **not a customer claim as such**, no verification needed for the page-body listing itself (it's accurate industrial geography); for the "Claimed as 'our client' in FAQ" column — **Repository evidence not found — HUMAN VERIFICATION REQUIRED**, per Finding #1

| Location URL | Claimed as "our client" in FAQ (first 3) | Regional context only (4th+, no client claim) |
|---|---|---|
| /refractory-supplier-in/delhi | NTPC Badarpur, Indraprastha Power Station, Pragati Power Corporation | Delhi Glass Works, Hindalco Industries NCR, Hero MotoCorp Dharuhera, Maruti Suzuki Manesar, Indian Oil Mathura Refinery |
| /refractory-supplier-in/jamshedpur | Tata Steel, Tata Metaliks, Usha Martin | Adhunik Metaliks, Tata Steel BSL (Gamharia) |
| /refractory-supplier-in/rourkela | SAIL Rourkela Steel Plant, Vedanta Jharsuguda, Bhushan Power & Steel | OCL India (Dalmia) |
| /refractory-supplier-in/bhilai | SAIL Bhilai Steel Plant, BALCO Korba, ACC Jamul Cement | Lafarge Holcim, Godawari Power & Ispat |
| /refractory-supplier-in/visakhapatnam | Rashtriya Ispat Nigam (RINL), HPCL Vizag Refinery, Coromandel International | Dalmia Cement, NTPC Simhadri |
| /refractory-supplier-in/mumbai | BPCL Mumbai Refinery, HPCL Mumbai Refinery, Tata Power Trombay | Reliance Industries, JSW Steel (Dolvi) |
| /refractory-supplier-in/ahmedabad | IOCL Gujarat Refinery, Nayara Energy Jamnagar, UltraTech Cement | Gujarat Fluorochemicals, Adani Power Mundra |
| /refractory-supplier-in/chennai | Chennai Petroleum Corporation (CPCL), Dalmia Cement, India Cements | SAIL Salem Steel, Manali Petrochemical |
| /refractory-supplier-in/kolkata | IISCO Burnpur, Durgapur Steel Plant, CESC Power | Haldia Petrochemicals, Damodar Valley Corporation |
| /refractory-supplier-in/hyderabad | HPCL Visakh Refinery, UltraTech Cement, Deccan Cements | Telangana State Power, Nizam Steel |
| /refractory-supplier-in/bellary | JSW Steel Vijayanagar, MSPL Baldota Group, Kalyani Steels | ACC Kudithini, Kirloskar Ferrous |
| /refractory-supplier-in/bokaro | SAIL Bokaro Steel Plant, Bokaro Power Supply Company, Usha Martin Jamshedpur | DVC Chandrapura |
| /refractory-supplier-in/dubai | Emirates Steel Arkan, Dubai Aluminium (DUBAL), National Cement | Gulf Glass Industries |
| /refractory-supplier-in/riyadh | SABIC, Saudi Steel, Yamama Cement | Saudi Aramco (downstream), Riyadh Cement Company |
| /refractory-supplier-in/doha | Qatar Steel, Qatar Petroleum, Qatar National Cement | Qatalum |
| /refractory-supplier-in/muscat | Jindal Shadeed Iron & Steel, Oman Cement, Sohar Aluminium | Oman Oil Refineries |
| /refractory-supplier-in/singapore | ExxonMobil Jurong, Shell Pulau Bukom, Singapore Refining Company | NSL OilChem |
| /refractory-supplier-in/ho-chi-minh-city | Formosa Ha Tinh Steel, Hoa Phat Group, Vicem Cement | Ba Ria Vung Tau Steel |
| /refractory-supplier-in/jakarta | Krakatau Steel, Indocement, Semen Indonesia | Pertamina Refinery, Chandra Asri |
| /refractory-supplier-in/lagos | Dangote Cement, BUA Cement, Dangote Refinery | Ajaokuta Steel, Lafarge Africa |
| /refractory-supplier-in/nairobi | Bamburi Cement, East African Portland Cement, Devki Steel Mills | Mombasa Cement |
| /refractory-supplier-in/johannesburg | ArcelorMittal South Africa, PPC Cement, Sappi Mills | Sasol, South32 Hillside Aluminium |
| /refractory-supplier-in/london | Tata Steel UK (Port Talbot), Celsa Steel UK, Hanson Cement | Pilkington Glass |
| /refractory-supplier-in/frankfurt | ThyssenKrupp Steel, Salzgitter AG, HeidelbergCement | Schott Glass |
| /refractory-supplier-in/faridabad | NHPC, Escorts Group, Larsen & Toubro Faridabad | Bata Faridabad, JCB India |
| /refractory-supplier-in/ghaziabad | Hindalco Modinagar, Modi Rubber, Bharat Electronics Ghaziabad | Hapur Road Industrial Area |
| /refractory-supplier-in/noida | HCL Technologies Noida, Samsung Electronics Noida, LG Electronics Greater Noida | Honda Cars India Greater Noida, Yamaha Motor Surajpur, JBM Auto, Havells India Noida |
| /refractory-supplier-in/gurgaon | Maruti Suzuki Manesar, Honda Motorcycle & Scooter Manesar, Hero MotoCorp Dharuhera | Munjal Showa, Denso India, Rico Auto Gurgaon, Sona Comstar |
| /refractory-supplier-in/raipur | SAIL Bhilai (nearby), Jindal Steel Raipur, Chettinad Cement | ACC Jamul, NTPC Sipat |
| /refractory-supplier-in/nagpur | Ballarpur Industries, NTPC Koradi, Moser Baer | Vidarbha Iron & Steel |
| /refractory-supplier-in/pune | Tata Motors Pune, Bajaj Auto, Bharat Forge | Thermax, Alfa Laval India |
| /refractory-supplier-in/rajkot | Gujarat NRE Coke, Essar Steel (nearby), Rajkot Engineering Cluster | Atul Ltd |
| /refractory-supplier-in/surat | ONGC Hazira, KRIBHCO, NTPC Ukai | Reliance Industries Hazira, Shell India Hazira |
| /refractory-supplier-in/ludhiana | Malwa Ispat, Shyam Steel Ludhiana, Hero Cycles | Apollo Cycles, Punjab Anand Alloys |
| /refractory-supplier-in/durgapur | SAIL Durgapur Steel Plant, Durgapur Projects Limited, Durgapur Cement Works | Durgapur Chemicals |
| /refractory-supplier-in/abu-dhabi | ADNOC, Emirates Steel, EMAL (Emirates Aluminium) | Abu Dhabi National Energy Company (TAQA) |
| /refractory-supplier-in/jeddah | SABIC Yanbu, Saudi Aramco Yanbu, Saudi Ceramic Company | National Industrialization Company (TASNEE) |
| /refractory-supplier-in/kuwait-city | Kuwait Petroleum Corporation (KPC), Kuwait National Petroleum Company, Gulf Steel | Al-Zour Refinery |
| /refractory-supplier-in/kuala-lumpur | Megasteel (now MSC), Lion DRI, Petronas Petrochemicals | YTL Cement, Lafarge Malaysia |
| /refractory-supplier-in/bangkok | Sahaviriya Steel Industries (SSI), G Steel, SCG Chemicals | TPI Polene, Siam Cement Group (SCG) |
| /refractory-supplier-in/cairo | Ezz Steel (Beshay Steel), Egyptian Iron & Steel (Hadisolb), Suez Cement | Lafarge Egypt, Egyptian Petrochemicals |
| /refractory-supplier-in/istanbul | Erdemir Group (ArcelorMittal Turkey), Kardemir Steel, Cimentas | Trakya Cam (Sisecam), TUPRAS Refinery |
| /refractory-supplier-in/vadodara | IOCL Vadodara Refinery, GSFC Fertilizers, Gujarat Narmada Valley Fertilizers | Alembic Pharmaceuticals |
| /refractory-supplier-in/panipat | HPCL Panipat Refinery, IOC Panipat Refinery & Petrochemical Complex, NTPC Panipat | — |
| /refractory-supplier-in/kanpur | Lohia Machines, JK Tyre & Industries, Swadeshi Cotton Mills | Kanpur Electric Supply Co. |
| /refractory-supplier-in/coimbatore | LMW (Lakshmi Machine Works), Elgi Equipments, Pricol | numerous foundries and auto-component manufacturers |
| /refractory-supplier-in/indore | Malwa Steel, Pithampur AUDI, SEZ automotive zone, Dewas industrial area | Khandwa industrial belt |
| /refractory-supplier-in/haldia | IOCL Haldia Refinery, HPCL Haldia Petrochemicals, Mitsubishi Chemical India | CESC Budge Budge Power |
| /refractory-supplier-in/nashik | Bosch India, ABB Ltd., Mahindra & Mahindra | Garware Wall Ropes, Hindustan Aeronautics Limited (HAL) |
| /refractory-supplier-in/bhubaneswar | NALCO (Angul), HINDALCO Hirakud, IMFA (Indian Metals & Ferro Alloys) | MCL (Mahanadi Coalfields) |
| /refractory-supplier-in/manama | ALBA (Aluminium Bahrain), BAPCO (Bahrain Petroleum Company), Gulf Petrochemical Industries | — |
| /refractory-supplier-in/colombo | CPC (Ceylon Petroleum Corporation), Peliyagoda industrial zone, Ekala industrial zone | — |
| /refractory-supplier-in/dhaka | BSRM Steel, AKS Steel, PHP Glass | PRAN Group industrial, BGMEA textile mills |
| /refractory-supplier-in/manila | Pag-asa Steel Works, Global Ferronickel Holdings, Pilipinas Shell Refinery | Republic Cement |
| /refractory-supplier-in/accra | VALCO (Volta Aluminium Company), AngloGold Ashanti, Goldfields Ghana | GHACEM Cement |

## Final classification table

| Category | Count | Items |
|---|---|---|
| **KEEP — VERIFIED** | 0 | Nothing in this audit has independent repository evidence. Nothing qualifies for this category from repository research alone. |
| **VERIFY — HUMAN CONFIRMATION REQUIRED** | 247 companies (majorPlants, all locations) + 9 explicit hardcoded claims (Finding #2) | Every named company across all 55 location pages, plus the explicit prose claims (Jindal Shadeed, Sohar Aluminium, Qatar Steel, SABIC Yanbu/Saudi Aramco Yanbu, Riyadh/Dammam/Jubail export-history, IOCL Haldia, Odisha/NALCO-type, Gujarat 4-decade claim, Jamshedpur reliable-supply claim) |
| **REMOVE/REWRITE — UNSUPPORTED OR INCORRECT** | 0 companies removed on evidence grounds (no evidence of falsity, only absence of evidence, per your instruction not to infer). **However**, the auto-generated FAQ **mechanism** (Finding #1) is a strong candidate for REMOVE/REWRITE independent of any single company's truth status — the sentence structure itself ("our major clients") makes a categorical claim about relationships this repository cannot support for any of the 165 companies it applies to (55 locations × first-3), regardless of whether some individual ones happen to be true. That's a template-level decision for you, not a per-company one. |

## What this audit does NOT do

- No claims changed, removed, or rewritten.
- No inference that any claim is false — every "no evidence found" is recorded as exactly that, not as a negative finding about the claim's truth.
- Does not resolve which (if any) of the 247+9 claims are actually true — only you or SAPL's own records can do that.
