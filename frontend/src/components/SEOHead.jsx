import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://shankeragencies.com';
const SITE_NAME = 'Shanker Agencies';
const LOGO_URL = 'https://shankeragencies.com/logo.png'; // place your logo.png in /public/
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=1200&h=630&fit=crop';

// ── Sitelinks SearchBox: helps Google show a search box in branded SERPs
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "alternateName": ["SAPL", "SAPL Refractories", "Shanker Agencies Pvt. Ltd."],
    "url": SITE_URL,
    "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/products?q={search_term_string}` },
        "query-input": "required name=search_term_string"
    }
};

// ── Core Organization schema (E-E-A-T signals, entity building)
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}#organization`,
    "name": "Shanker Agencies Private Limited",
    "alternateName": ["SAPL", "SAPL Refractories", "Shanker Agencies"],
    "legalName": "Shanker Agencies Private Limited",
    "url": SITE_URL,
    "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL,
        "width": 512,
        "height": 512,
        "caption": "Shanker Agencies Pvt. Ltd. — Refractory Engineering"
    },
    "image": [LOGO_URL, DEFAULT_OG_IMAGE],
    "description": "Shanker Agencies Private Limited (SAPL) is India's premier refractory engineering partner since 1980. Q: Which brands is Shanker Agencies a partner with?\nA: We are Strategic Supply Partners for CUMI, Calderys, TRL Krosaki, IFGL, \n   Mahakoshal, Divine Cerawool, and Crown Ceramics. Supplying high-quality refractories to steel, cement, aluminum, glass, petrochemical, and power industries worldwide.",
    "foundingDate": "1980",
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": 50 },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "553, Main G.T Road, Shahdara",
        "addressLocality": "Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110032",
        "addressCountry": "IN",
        "name": "Shanker Agencies Pvt. Ltd. — Registered Office"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.6672,
        "longitude": 77.2981
    },
    "hasMap": "https://maps.google.com/?q=Shanker+Agencies+553+GT+Road+Shahdara+Delhi",
    "telephone": "+91-9810205154",
    "faxNumber": "",
    "email": "info@shankeragencies.com",
    "contactPoint": [
        {
            "@type": "ContactPoint",
            "telephone": "+91-9810205154",
            "contactType": "sales",
            "areaServed": ["IN", "AE", "SA", "QA", "KW", "BH", "OM", "GB", "DE", "FR", "SG", "MY", "VN", "ID", "TH"],
            "availableLanguage": ["English", "Hindi"],
            "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        },
        {
            "@type": "ContactPoint",
            "telephone": "+91-9811909394",
            "contactType": "technical support",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
        }
    ],
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00" }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "INR, USD",
    "paymentAccepted": "Bank Transfer, RTGS, NEFT, LC",
    "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "Qatar" },
        { "@type": "Country", "name": "Singapore" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Germany" },
        { "@type": "Country", "name": "Malaysia" }
    ],
    "knowsAbout": [
        "Refractory Engineering",
        "High Alumina Bricks",
        "Fireclay Bricks",
        "Castable Refractories",
        "Ceramic Fiber Insulation",
        "Flow Control Refractories",
        "Steel Plant Refractories",
        "Cement Kiln Linings",
        "Aluminum Furnace Refractories",
        "Acid Proof Materials"
    ],
    "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "ISO 9001:2015 Quality Management System" },
        { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "ISO 14001:2015 Environmental Management System" },
        { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "ISO 45001:2018 Occupational Health and Safety" }
    ],
    "sameAs": [
        "https://www.linkedin.com/company/shanker-agencies",
        "https://twitter.com/shankeragencies",
        "https://www.facebook.com/shankeragencies",
        "https://www.youtube.com/@shankeragencies",
        "https://www.indiamart.com/shankeragencies/",
        "https://www.justdial.com/Delhi/Shanker-Agencies-Pvt-Ltd-Opp-Shahdara-Bus-Depot-Main-GT-Road-Shahdara/011PXX11-XX11-180712130844-M4D5_BZDET",
        "https://g.co/kgs/shankeragencies"
    ],
    "founder": {
        "@type": "Person",
        "name": "Founder, Shanker Agencies"
    },
    "slogan": "Engineering Refractory Solutions Since 1980",
    "award": "ISO 9001:2015 Certified · Trusted Refractory Supplier India"
};

// ── LocalBusiness (proximity targeting, Google Maps)
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    "name": "Shanker Agencies Private Limited",
    "image": [LOGO_URL, DEFAULT_OG_IMAGE],
    "description": "Strategic supply partner of CUMI, Calderys, TRL Krosaki, IFGL refractories in Delhi. Supplying firebricks, castables, ceramic fiber, flow control products to steel, cement, aluminum industries.",
    "url": SITE_URL,
    "telephone": "+91-9810205154",
    "email": "info@shankeragencies.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "553, Main G.T Road, Shahdara",
        "addressLocality": "Shahdara",
        "addressRegion": "Delhi",
        "postalCode": "110032",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.6672,
        "longitude": 77.2981
    },
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00" }
    ],
    "priceRange": "$$",
    "hasMap": "https://maps.google.com/?q=28.6672,77.2981",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
    }
};

// ── Service schema (topical relevance for refractory services)
const serviceSchemas = [
    { name: "Refractory Supply & Distribution", description: "Supply of shaped and unshaped refractory products including high alumina bricks, fireclay bricks, castables, ramming mass for steel, cement, aluminum plants." },
    { name: "Refractory Engineering Consultation", description: "On-site technical consultation for refractory lining design, material selection, installation guidance and troubleshooting for industrial furnaces." },
    { name: "Flow Control Products", description: "Supply of slide gate plates, ladle shrouds, subentry nozzles and flow control refractories for continuous casting in steel plants." },
    { name: "Ceramic Fiber & Insulation Supply", description: "Supply of ceramic fiber blankets, modules, boards and microporous insulation for energy-efficient furnace linings." },
    { name: "Acid Proof & Chemical Resistant Materials", description: "Supply of acid proof bricks, tiles and chemical resistant mortars for chemical plants, fertilizer units and effluent treatment facilities." }
].map(svc => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": svc.name,
    "name": svc.name,
    "description": svc.description,
    "provider": { "@type": "Organization", "@id": `${SITE_URL}#organization` },
    "areaServed": { "@type": "Country", "name": "India" },
    "url": SITE_URL
}));

function SEOHead({
    title,
    description,
    keywords = '',
    canonical,
    image = DEFAULT_OG_IMAGE,
    imageWidth = 1200,
    imageHeight = 630,
    type = 'website',
    publishedAt,
    modifiedAt,
    author = 'Shanker Agencies',
    noindex = false,
    structuredData,
    breadcrumbs,
    product,
    faq,
    // page-level overrides
    includeLocalBusiness = false,
    includeServices = false,
}) {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

    // Breadcrumb schema
    const breadcrumbSchema = breadcrumbs ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": `${SITE_URL}${crumb.path}`
        }))
    } : null;

    // Product schema
    const productSchema = product ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image || DEFAULT_OG_IMAGE,
        "brand": { "@type": "Brand", "name": product.brand || "Shanker Agencies" },
        "manufacturer": { "@type": "Organization", "name": product.manufacturer || "Various" },
        "category": product.category,
        "material": product.material,
        "offers": {
            "@type": "Offer",
            "seller": { "@type": "Organization", "@id": `${SITE_URL}#organization` },
            "availability": "https://schema.org/InStock",
            "priceCurrency": "INR",
            "areaServed": "IN",
            "url": fullCanonical
        },
        "additionalProperty": (product.specs || []).map(spec => ({
            "@type": "PropertyValue",
            "name": spec.name,
            "value": spec.value,
            "unitText": spec.unit
        }))
    } : null;

    // FAQ schema
    const faqSchema = faq ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
        }))
    } : null;

    return (
        <Helmet>
            {/* ── Primary Meta ── */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={author} />
            <link rel="canonical" href={fullCanonical} />

            {/* ── Robots ── */}
            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            )}
            <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="bingbot" content="index, follow" />

            {/* ── Language / Region (hreflang + geo) ── */}
            <meta httpEquiv="content-language" content="en-IN" />
            <meta name="language" content="English" />
            <link rel="alternate" hrefLang="en-IN" href={fullCanonical} />
            <link rel="alternate" hrefLang="en" href={fullCanonical} />
            <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
            <link rel="alternate" hrefLang="hi" href={`${fullCanonical}?lang=hi`} />
            <meta name="geo.region" content="IN-DL" />
            <meta name="geo.placename" content="Delhi, India" />
            <meta name="geo.position" content="28.6672;77.2981" />
            <meta name="ICBM" content="28.6672, 77.2981" />

            {/* ── Open Graph ── */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:image:width" content={imageWidth.toString()} />
            <meta property="og:image:height" content={imageHeight.toString()} />
            <meta property="og:image:alt" content={`${SITE_NAME} — ${title}`} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:locale:alternate" content="en_GB" />

            {/* ── Twitter Card ── */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullCanonical} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={`${SITE_NAME} — ${title}`} />
            <meta name="twitter:creator" content="@shankeragencies" />
            <meta name="twitter:site" content="@shankeragencies" />

            {/* ── Article (blog posts) ── */}
            {type === 'article' && publishedAt && (
                <>
                    <meta property="article:published_time" content={publishedAt} />
                    {modifiedAt && <meta property="article:modified_time" content={modifiedAt} />}
                    <meta property="article:author" content={author} />
                    <meta property="article:publisher" content={SITE_URL} />
                    <meta property="article:section" content="Refractory Engineering" />
                </>
            )}

            {/* ── Mobile / PWA ── */}
            <meta name="format-detection" content="telephone=yes" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
            <meta name="application-name" content={SITE_NAME} />
            <meta name="msapplication-TileColor" content="#1E3A5F" />
            <meta name="theme-color" content="#1E3A5F" />

            {/* ── E-E-A-T signals ── */}
            <meta name="rating" content="general" />
            <meta name="revisit-after" content="7 days" />
            <meta name="copyright" content="Shanker Agencies Private Limited" />
            <meta name="category" content="Industrial Supply, Refractory Engineering" />
            <meta name="classification" content="Business" />
            <meta name="coverage" content="Worldwide" />
            <meta name="distribution" content="Global" />
            <meta name="target" content="all" />

            {/* ── JSON-LD: WebSite (Sitelinks SearchBox) ── */}
            <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>

            {/* ── JSON-LD: Organization + LocalBusiness entity ── */}
            <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>

            {/* ── JSON-LD: LocalBusiness (Contact / Home pages) ── */}
            {includeLocalBusiness && (
                <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
            )}

            {/* ── JSON-LD: Services (Home / Solutions pages) ── */}
            {includeServices && serviceSchemas.map((svc, i) => (
                <script key={i} type="application/ld+json">{JSON.stringify(svc)}</script>
            ))}

            {/* ── JSON-LD: Page-specific custom schema ── */}
            {structuredData && (
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            )}

            {/* ── JSON-LD: Breadcrumbs ── */}
            {breadcrumbSchema && (
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            )}

            {/* ── JSON-LD: Product ── */}
            {productSchema && (
                <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
            )}

            {/* ── JSON-LD: FAQ ── */}
            {faqSchema && (
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            )}
        </Helmet>
    );
}

export default SEOHead;