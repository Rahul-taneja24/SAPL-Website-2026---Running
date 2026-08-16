import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { PRODUCT_CATALOG } from '@/data/productCatalogData';
import {
  slugifyGrade,
  getGradeLabel,
  buildGradeAliases,
  getGradeDesignations,
  getAliasNames,
  getSkCodes,
  buildSkMap,
  getDirectSk,
  getAlsoMeetsSk,
  isSkEligible,
  SK_SERIES,
} from '@/data/gradeAliasData';

// Real 404 for any grade slug not in generateStaticParams.
export const dynamicParams = false;

const SPEC_LABELS = {
  // chemistry
  al2o3: 'Al₂O₃ content',
  sio2: 'SiO₂ content',
  fe2o3: 'Fe₂O₃ content',
  mgo: 'MgO content',
  cao: 'CaO content',
  sic: 'SiC content',
  cr2o3: 'Cr₂O₃ content',
  zro2: 'ZrO₂ content',
  zro2_insert: 'ZrO₂ insert',
  carbon: 'Carbon content',
  cement: 'Cement content',
  // physical
  ap: 'Apparent porosity',
  density: 'Bulk density',
  ccs: 'Cold crushing strength',
  ccs110: 'CCS after 110°C dry',
  ccs1200: 'CCS after 1200°C',
  tensile: 'Tensile strength',
  permeability: 'Permeability',
  absorption: 'Water absorption',
  tc: 'Thermal conductivity',
  tc_500: 'Thermal conductivity at 500°C',
  // thermal and performance
  pce: 'Refractoriness (PCE)',
  temp: 'Max service temperature',
  tempC: 'Max service temperature',
  maxTemp: 'Max service temperature',
  acidRes: 'Acid resistance',
  acidResist: 'Acid resistance',
  alkRes: 'Alkali resistance',
  rebound: 'Rebound loss',
  life: 'Typical service life',
  // descriptive
  size: 'Size',
  form: 'Form',
  finish: 'Finish',
  use: 'Typical use',
  usecase: 'Typical use',
  application: 'Application',
};

/**
 * Candidate headline stats in priority order. The first four present on a
 * given spec row become the stat cards, so bricks, castables and flow-control
 * products each surface the numbers that actually matter for them.
 */
const HEADLINE_KEYS = [
  'al2o3',
  'mgo',
  'sic',
  'zro2',
  'carbon',
  'temp',
  'maxTemp',
  'tempC',
  'ccs',
  'ccs110',
  'density',
  'pce',
  'life',
];

/** "Low Cement Castables (LCC)" -> "Low Cement Castables" */
function cleanName(name) {
  return String(name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
}

function specLabel(key) {
  if (SPEC_LABELS[key]) return SPEC_LABELS[key];
  // camelCase or snake_case fallback, rendered as sentence case
  const words = key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * The "Order {grade}" box. Rendered twice on the page — once beside the spec
 * grid and once beside the CTA/reference sections — because the comparison
 * table between them breaks out to full width and can't share a grid row
 * with a sidebar column. Extracted so both instances stay identical.
 */
function GradeOrderSidebar({ label, productId, catalogEntry, hideOnMobile = false }) {
  return (
    <aside className={hideOnMobile ? 'hidden lg:block lg:pt-2' : 'lg:pt-2'}>
      <div className="lg:sticky lg:top-24 space-y-5">
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <div className="bg-[#1E3A5F] px-5 py-3.5">
            <h2 className="font-oswald text-base font-bold text-white">Order {label}</h2>
          </div>
          <div className="px-5 py-5">
            <p className="text-[13.5px] text-slate-600 leading-relaxed mb-4">
              Need this grade in a standard size, or a shape to your own furnace drawing? Send us the
              drawing, dimensions, application and quantity, and our technical team will review the
              requirement and advise on the appropriate refractory shape, grade and fulfilment route.
            </p>
            {catalogEntry.brands?.length > 0 && (
              <div className="mb-5">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Supplied from</div>
                <div className="flex flex-wrap gap-1.5">
                  {catalogEntry.brands.map((b) => (
                    <span
                      key={b}
                      className="text-[11.5px] px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <Link
              href={`/rfq?product=${productId}&grade=${encodeURIComponent(label)}`}
              className="block text-center text-sm font-semibold px-4 py-3 rounded bg-[#F97316] text-white hover:bg-[#ea6a0f] transition-colors mb-2.5"
            >
              Request a quotation
            </Link>
            <a
              href="tel:+919899957888"
              className="block text-center text-sm font-semibold px-4 py-3 rounded border border-slate-300 text-[#1E3A5F] hover:border-[#1E3A5F] transition-colors"
            >
              +91 98999 57888
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 px-5 py-5">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-3">Why Shanker Agencies</div>
          <ul className="space-y-2.5 text-[13.5px] text-slate-600">
            {[
              'Refractory engineering and technical procurement since 1980',
              'Grade selection reviewed against your application and operating conditions',
              'Manufacturer test certificates available on request',
              'Requirements accepted to drawing and specification',
            ].map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

/**
 * Resolve a URL slug to a grade row. Accepts the canonical slug or any alias
 * (SK code, AL/HA variant, "70-alumina"), so export and domestic naming both land.
 */
function resolveGrade(categorySlug, productId, slug) {
  const catalogEntry = PRODUCT_CATALOG[categorySlug]?.products?.find((p) => p.id === productId);
  if (!catalogEntry?.specs?.length) return null;

  for (let i = 0; i < catalogEntry.specs.length; i += 1) {
    const row = catalogEntry.specs[i];
    const label = getGradeLabel(row);
    if (!label) continue;
    const canonical = slugifyGrade(label);
    if (canonical === slug) {
      return { catalogEntry, row, index: i, canonical, isAlias: false };
    }
    if (buildGradeAliases(row, catalogEntry.specs, productId).includes(slug)) {
      return { catalogEntry, row, index: i, canonical, isAlias: true };
    }
  }
  return null;
}

export async function generateStaticParams() {
  const params = [];
  Object.entries(PRODUCT_CATALOG).forEach(([categorySlug, category]) => {
    category.products?.forEach((product) => {
      if (!product.specs?.length) return;
      const seen = new Set();
      product.specs.forEach((row) => {
        const label = getGradeLabel(row);
        if (!label) return;
        [slugifyGrade(label), ...buildGradeAliases(row, product.specs, product.id)].forEach((slug) => {
          if (!slug || seen.has(slug)) return;
          seen.add(slug);
          params.push({ categorySlug, productId: product.id, grade: slug });
        });
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { categorySlug, productId, grade } = await params;
  const found = resolveGrade(categorySlug, productId, grade);
  if (!found) return {};

  const { catalogEntry, row, canonical } = found;
  const label = getGradeLabel(row);
  const product = cleanName(catalogEntry.name);
  const aliases = getAliasNames(row, productId);
  const aliasStr = aliases.length ? ` (${aliases.join(', ')})` : '';

  const title = `${label} ${product}${aliasStr} | Specifications`;
  const description = [
    `${label} ${product.toLowerCase()}`,
    row.al2o3 ? `${row.al2o3} Al₂O₃` : null,
    row.ccs ? `CCS ${row.ccs}` : null,
    row.temp ? `service to ${row.temp}` : null,
    aliases.length ? `also known as ${aliases.join(', ')}` : null,
    'Technical specification and enquiry, Shanker Agencies Pvt. Ltd.',
  ]
    .filter(Boolean)
    .join('. ');

  const canonicalUrl = `/products/${categorySlug}/${productId}/${canonical}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    keywords: [label, ...aliases, product].join(', '),
    openGraph: {
      title,
      description,
      url: `https://www.shankeragencies.com${canonicalUrl}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function GradeDetailPage({ params }) {
  const { categorySlug, productId, grade } = await params;
  const found = resolveGrade(categorySlug, productId, grade);
  if (!found) notFound();

  const { catalogEntry, row, index, canonical, isAlias } = found;

  // One indexable page per grade: aliases 308 to the canonical slug.
  if (isAlias) {
    redirect(`/products/${categorySlug}/${productId}/${canonical}`);
  }

  const label = getGradeLabel(row);
  // Drop trailing parentheticals: "Low Cement Castables (LCC)" -> "Low Cement Castables".
  // The grade code already carries the acronym, so repeating it reads badly.
  const productName = cleanName(catalogEntry.name);
  const productUrl = `https://www.shankeragencies.com/products/${categorySlug}/${productId}`;
  const gradeUrl = `${productUrl}/${canonical}`;
  const specs = catalogEntry.specs;
  const prev = index > 0 ? specs[index - 1] : null;
  const next = index < specs.length - 1 ? specs[index + 1] : null;
  const skOk = isSkEligible(productId);
  const aliases = getAliasNames(row, productId);
  const designations = getGradeDesignations(row, productId);
  const skMap = skOk ? buildSkMap(specs) : new Map();
  const directSk = skOk ? getDirectSk(row) : null;
  const alsoMeets = skOk ? getAlsoMeetsSk(row) : [];
  // Indian naming variant, only meaningful for the HA / AL alumina families.
  const gradeNum = (label.match(/\d{2,3}/) || [])[0] || null;
  const indianAlias = /^(HA|AL)[\s-]?\d/i.test(label) ? label.replace(/^HA/i, 'AL') : null;
  const image = catalogEntry.images?.[0];
  // Service ceiling for the "is this grade right for your application?"
  // section. These are the only three key names ever used for this value
  // across the catalog (matches HEADLINE_KEYS above).
  const maxTempValue = row.temp || row.tempC || row.maxTemp || null;

  const categoryTitle = categorySlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const specEntries = Object.entries(row).filter(([k]) => k !== 'grade' && k !== 'type');
  // The property that actually defines this grade within its family. Alumina
  // for bricks, but SiC/MgO/ZrO₂/carbon for the families where alumina isn't
  // the differentiator, so a SiC brick is never described by an alumina figure.
  const DEFINING_KEYS = ['al2o3', 'sic', 'mgo', 'zro2', 'carbon', 'cement'];
  const definingKey = DEFINING_KEYS.find((k) => row[k]);
  const defining = definingKey
    ? `${row[definingKey]} ${specLabel(definingKey).replace(/ content$/, '')}`
    : null;
  // First four available headline stats, deduped by display label.
  const seenLabels = new Set();
  const headline = [];
  for (const k of HEADLINE_KEYS) {
    if (!row[k] || headline.length >= 4) continue;
    const lbl = specLabel(k);
    if (seenLabels.has(lbl)) continue;
    seenLabels.add(lbl);
    headline.push([k, row[k]]);
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.shankeragencies.com/products' },
      { '@type': 'ListItem', position: 3, name: categoryTitle, item: `https://www.shankeragencies.com/products/${categorySlug}` },
      { '@type': 'ListItem', position: 4, name: productName, item: productUrl },
      { '@type': 'ListItem', position: 5, name: `${label} ${productName}`, item: gradeUrl },
    ],
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${gradeUrl}#product`,
    name: `${label} ${productName}`,
    alternateName: aliases.map((a) => `${a} ${productName}`),
    description: `${label} grade ${productName.toLowerCase()}${row.al2o3 ? `, ${row.al2o3} Al₂O₃` : ''}${row.temp ? `, rated to ${row.temp}` : ''}. ${aliases.length ? `Also specified as ${aliases.join(', ')}. ` : ''}Supplied by Shanker Agencies Pvt. Ltd.`,
    image: [image || 'https://www.shankeragencies.com/opengraph-image.jpg'],
    url: gradeUrl,
    category: productName,
    isVariantOf: { '@id': `${productUrl}#product` },
    // Only declare brands the catalog actually records for this product. A
    // default would assert a manufacturer relationship we cannot substantiate.
    ...(catalogEntry.brands?.length
      ? { brand: catalogEntry.brands.map((b) => ({ '@type': 'Brand', name: b })) }
      : {}),
    additionalProperty: specEntries.map(([k, v]) => ({
      '@type': 'PropertyValue',
      name: specLabel(k),
      value: String(v),
    })),
    // Quote-on-enquiry: no price is published and stock is not asserted per
    // grade, so this is a contact-for-price offer rather than a priced listing.
    // `price: 0` previously implied the grade was free and `InStock` asserted
    // availability for all 118 grades, neither of which is true.
    offers: {
      '@type': 'Offer',
      seller: { '@id': 'https://www.shankeragencies.com/#organization' },
      priceCurrency: 'INR',
      availability: 'https://schema.org/LimitedAvailability',
      description: 'Quoted on enquiry, varies by grade, brand and order quantity.',
      url: gradeUrl,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 py-3 text-[13px] text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link href="/products" className="hover:text-[#1E3A5F]">Products</Link>
          <span className="text-slate-300">/</span>
          <Link href={`/products/${categorySlug}`} className="hover:text-[#1E3A5F]">{categoryTitle}</Link>
          <span className="text-slate-300">/</span>
          <Link href={`/products/${categorySlug}/${productId}`} className="hover:text-[#1E3A5F]">{productName}</Link>
          <span className="text-slate-300">/</span>
          <span className="text-[#1E3A5F] font-medium">{label}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 py-10 sm:py-12 lg:py-16 grid lg:grid-cols-[1.15fr_1fr] gap-7 sm:gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#F97316] mb-3">
              {categoryTitle} / {productName}
            </p>
            <h1 className="font-oswald text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.08] font-bold text-[#1E3A5F] mb-3 sm:mb-4">
              {label} {productName}
            </h1>
            <p className="text-slate-600 text-[15px] sm:text-base leading-normal sm:leading-relaxed max-w-xl mb-5 sm:mb-6">
              {label} is{' '}
              {defining ? (
                <>
                  the <strong className="text-slate-800">{defining}</strong> grade
                </>
              ) : (
                'a grade'
              )}{' '}
              in Shanker Agencies&rsquo; {productName.toLowerCase()} range
              {row.temp ? (
                <>
                  , rated for continuous service to{' '}
                  <strong className="text-slate-800">{row.temp}</strong>
                </>
              ) : null}
              .{' '}
              {indianAlias && (
                <>
                  {' '}In India it is also written{' '}
                  <strong className="text-slate-800">{indianAlias}</strong>
                  {gradeNum ? (
                    <>
                      {' '}or <strong className="text-slate-800">{gradeNum}% alumina</strong>
                    </>
                  ) : null}
                  .
                </>
              )}
              {directSk && (
                <>
                  {' '}The nearest export designation is{' '}
                  <strong className="text-slate-800">{directSk.sk}</strong>.
                </>
              )}
            </p>

            {aliases.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5 sm:mb-7">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 self-center mr-1">
                  Also known as
                </span>
                {[label, ...aliases].map((n) => (
                  <span
                    key={n}
                    className="text-[12px] font-medium px-2.5 py-1 rounded border border-slate-200 bg-slate-50 text-slate-700"
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/rfq?product=${productId}&grade=${encodeURIComponent(label)}`}
                className="text-sm font-semibold px-6 py-3 rounded bg-[#F97316] text-white hover:bg-[#ea6a0f] transition-colors"
              >
                Request {label} Quote
              </Link>
              <a
                href="tel:+919899957888"
                className="text-sm font-semibold px-6 py-3 rounded border border-slate-300 text-[#1E3A5F] hover:border-[#1E3A5F] transition-colors"
              >
                Call +91 98999 57888
              </a>
            </div>
          </div>

          {image && (
            <div className="relative">
              <img
                src={image}
                alt={`${label} grade ${productName.toLowerCase()} supplied by Shanker Agencies`}
                loading="eager"
                className="w-full h-[300px] lg:h-[360px] object-cover rounded-lg border border-slate-200"
              />
              <div className="absolute bottom-4 left-4 bg-[#1E3A5F] text-white px-4 py-2 rounded shadow-lg">
                <div className="text-[10px] uppercase tracking-wider text-white/60 leading-none mb-1">Grade</div>
                <div className="font-oswald text-lg font-bold leading-none">{label}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Headline specs */}
      {headline.length > 0 && (
        <section className="bg-[#1E3A5F]">
          <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {headline.map(([k, v]) => (
              <div key={k} className="border-l-2 border-[#F97316] pl-4">
                <div className="text-[10px] uppercase tracking-[0.12em] text-white/50 mb-1.5">{specLabel(k)}</div>
                <div className="font-oswald text-2xl lg:text-[26px] font-bold text-white leading-none">{v}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-6xl mx-auto px-5 pt-14 grid lg:grid-cols-[1fr_320px] gap-12">
        <div className="min-w-0">
          {/* Technical specification — the primary content block, immediately
              after the hero and headline stats. specEntries is already flat
              property/value pairs, so a grid reads faster than a two-column
              table for this shape of data and no property label needs to be
              truncated to fit. */}
          <section className="mb-12">
            <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-1">
              {label} technical specification
            </h2>
            <p className="text-sm text-slate-500 mb-5">
              Typical values for {label} {productName.toLowerCase()}. Test methods vary by property and
              product family, so confirm the applicable standard against the manufacturer datasheet before
              specifying.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {specEntries.map(([k, v]) => (
                <div key={k} className="border border-slate-200 rounded px-3.5 py-3 bg-white">
                  <div className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500 leading-snug mb-1.5">
                    {specLabel(k)}
                  </div>
                  <div className="font-oswald text-base sm:text-lg font-bold text-[#1E3A5F] leading-tight">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Applications — directly after the specification, so "where is
              this used" follows "what is it" without reference tables in
              between. Below sm, a 2-column grid keeps chips compact instead
              of flex-wrap collapsing each long label to its own full-width
              row; at sm+ it reverts to content-width flex chips as before. */}
          {catalogEntry.applications?.length > 0 && (
            <section className="mb-12">
              <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-5">
                Where {label} is used
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {catalogEntry.applications.map((app) => (
                  <span
                    key={app}
                    className="flex sm:inline-flex items-start sm:items-center gap-2 text-[13.5px] font-medium px-3.5 py-2 rounded border border-slate-200 bg-white text-slate-700 w-full sm:w-auto"
                  >
                    <span className="mt-[3px] sm:mt-0 w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                    {app}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Suitability — built only from data already on this page: the
              service-temperature spec value and the existing lower-duty /
              economical-choice note (also shown in the hero), surfaced again
              at the point a buyer is actually deciding rather than only in
              the opening paragraph. No new claim is introduced here. */}
          {(maxTempValue || alsoMeets.length > 0) && (
            <section className="mb-12">
              <div className="border-l-[3px] border-[#1E3A5F] bg-slate-50 rounded-r px-5 py-5">
                <h2 className="font-oswald text-lg font-bold text-[#1E3A5F] mb-3">
                  Is {label} right for your application?
                </h2>
                <ul className="space-y-2 text-[14px] text-slate-700 leading-relaxed">
                  {maxTempValue && (
                    <li className="flex items-start gap-2.5">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                      <span>
                        Rated for continuous service up to{' '}
                        <strong className="text-slate-900">{maxTempValue}</strong>.
                      </span>
                    </li>
                  )}
                  {alsoMeets.length > 0 && (
                    <li className="flex items-start gap-2.5">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                      <span>
                        Also meets {alsoMeets.map((s) => s.sk).join(', ')} requirements. Those are lower duties,
                        so a lighter grade may be the more economical choice.
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Hidden below lg: on mobile this grid stacks to a single column, and
            the sidebar would otherwise render mid-page here as well as again
            at the bottom (its usual, unchanged position). Desktop keeps both,
            flanking the full-width comparison table between them. */}
        <GradeOrderSidebar label={label} productId={productId} catalogEntry={catalogEntry} hideOnMobile />
      </div>

      {/* Full grade range — kept as a complete table: mixed units and
          ranges (68-72%, 1750°C, SK 36...) cannot be reduced to a fair
          visual ranking without interpreting the data. Breaks out to the
          full page width on desktop (outside the sidebar-constrained grid
          above and below it) because a 7-column technical table needs more
          room than the 784px main column leaves; the sidebar resumes
          immediately after. Mobile is unaffected — it always scrolled this
          table inside its own container regardless of outer width. A touch
          wider than the page's usual max-w-6xl — just enough for the
          7-column table to clear its scroll threshold at 1280px+ without
          shrinking padding or type. */}
      <div className="max-w-[1220px] mx-auto px-5">
        <section className="mb-12">
          <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-1">
            Full {productName.toLowerCase()} range
          </h2>
            <p className="text-sm text-slate-500 mb-5">
              Compare {label} against every grade SAPL stocks in this family.
            </p>
            <p className="lg:hidden flex items-center gap-1.5 mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              <span aria-hidden="true">&#8596;</span> Swipe to compare grades
            </p>
            <div className="overflow-x-auto overscroll-x-contain rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Grade', ...specEntries.map(([k]) => specLabel(k))].map((h, hi) => (
                      <th
                        key={h}
                        className={`text-left px-4 py-3 font-semibold text-slate-600 text-[11px] uppercase tracking-wider whitespace-nowrap ${
                          hi === 0 ? 'sticky left-0 z-[1] bg-slate-50' : ''
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specs.map((r, ri) => {
                    const rLabel = getGradeLabel(r);
                    const rSlug = slugifyGrade(rLabel);
                    const isCurrent = rSlug === canonical;
                    // Sticky cells need an explicit, non-translucent background —
                    // an inherited or opacity-based one can show scrolled content
                    // bleeding through as the row's other cells pass underneath.
                    const stickyBg = isCurrent ? 'bg-[#EEF2F6]' : ri % 2 ? 'bg-slate-50' : 'bg-white';
                    return (
                      <tr
                        key={rLabel}
                        className={
                          isCurrent
                            ? 'bg-[#1E3A5F]/[0.06] border-l-[3px] border-[#F97316]'
                            : 'bg-white hover:bg-slate-50'
                        }
                      >
                        <td
                          className={`px-4 py-3 border-t border-slate-100 whitespace-nowrap sticky left-0 z-[1] ${stickyBg}`}
                        >
                          {isCurrent ? (
                            <span className="font-bold text-[#1E3A5F]">
                              {rLabel}
                              <span className="ml-2 text-[10px] uppercase tracking-wider text-[#F97316]">
                                this grade
                              </span>
                            </span>
                          ) : (
                            <Link
                              href={`/products/${categorySlug}/${productId}/${rSlug}`}
                              className="font-semibold text-[#1E3A5F] hover:text-[#F97316] hover:underline"
                            >
                              {rLabel}
                            </Link>
                          )}
                        </td>
                        {specEntries.map(([k]) => (
                          <td key={k} className="px-4 py-3 text-slate-600 border-t border-slate-100 whitespace-nowrap">
                            {r[k] || '-'}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {(prev || next) && (
              <div className="flex flex-wrap gap-3 mt-5">
                {prev && (
                  <Link
                    href={`/products/${categorySlug}/${productId}/${slugifyGrade(getGradeLabel(prev))}`}
                    className="text-sm px-4 py-2 rounded border border-slate-300 text-[#1E3A5F] hover:border-[#1E3A5F] transition-colors"
                  >
                    &larr; {getGradeLabel(prev)}
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/products/${categorySlug}/${productId}/${slugifyGrade(getGradeLabel(next))}`}
                    className="text-sm px-4 py-2 rounded border border-slate-300 text-[#1E3A5F] hover:border-[#1E3A5F] transition-colors"
                  >
                    {getGradeLabel(next)} &rarr;
                  </Link>
                )}
              </div>
            )}
        </section>
      </div>

      <div className="max-w-6xl mx-auto px-5 pb-14 grid lg:grid-cols-[1fr_320px] gap-12">
        <div className="min-w-0">
          {/* Primary RFQ CTA — placed immediately after the comparison, the
              point a buyer has enough information to request a quote,
              instead of only at the very bottom of a long technical page.
              Supporting copy reuses the sidebar's existing, already-approved
              wording rather than introducing new claims. */}
          <section className="mb-12">
            <div className="border border-slate-200 bg-slate-50 rounded px-6 py-6 sm:px-7 sm:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <p className="text-[14px] text-slate-700 leading-relaxed max-w-md">
                Send the drawing, dimensions, application and quantity for{' '}
                <strong className="text-[#1E3A5F]">
                  {label} {productName.toLowerCase()}
                </strong>
                . Our technical team reviews the requirement and advises on grade and fulfilment route.
              </p>
              <Link
                href={`/rfq?product=${productId}&grade=${encodeURIComponent(label)}`}
                className="shrink-0 text-center text-sm font-semibold px-7 py-3.5 rounded bg-[#F97316] text-white hover:bg-[#ea6a0f] transition-colors whitespace-nowrap"
              >
                Request {label} Quote
              </Link>
            </div>
          </section>

          {/* Grade designations, the SK cross reference. Only worth rendering
              when there is more than the grade code itself to show, otherwise
              non-alumina families get a one-row table and an SK explainer
              that does not apply to them. Visually subordinate to the
              decision-making sections above — smaller heading, same full
              content, nothing removed. */}
          {designations.length > 1 && (
          <section className="mb-12">
            <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-1">
              Grade designations and equivalents
            </h2>
            <p className="text-sm text-slate-500 mb-5">
              How {label} is referenced across Indian and export naming conventions.
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-5">
              <table className="w-full text-sm">
                <tbody>
                  {designations.map((d, i) => (
                    <tr key={d.system} className={i % 2 ? 'bg-slate-50/50' : 'bg-white'}>
                      <td className="px-5 py-3 text-slate-600 border-t border-slate-100 w-[45%]">
                        {d.system}
                        {d.note && <span className="block text-[11px] text-slate-400">{d.note}</span>}
                      </td>
                      <td className="px-5 py-3 font-semibold text-[#1E3A5F] border-t border-slate-100">{d.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {directSk && (
            <div className="bg-amber-50 border-l-[3px] border-amber-400 rounded-r px-5 py-4">
              <p className="text-[13.5px] text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Reading an SK code correctly.</strong> SK (Seger Kegel) is a
                cone designation, and each step carries an accepted minimum Al₂O₃ content in trade practice.
                The dependable way to match an SK enquiry to a grade is that minimum alumina figure, which is how
                the equivalence above is derived. Note that a brick&rsquo;s measured PCE and its SK trade grade are
                two different numbers and will not always agree. Suppliers also differ at the margins, most often
                around SK 34. When comparing offers, check Al₂O₃ and PCE together rather than the SK code alone.
              </p>
            </div>
            )}
          </section>
          )}

          {/* SK series reference — pure cross-reference material, so this is
              the one section using native <details> disclosure. Content
              stays in the DOM and crawlable whether expanded or not; only
              the default visual state changes, and no JavaScript is used. */}
          {skMap.size > 0 && (
            <details className="group mb-12">
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-3 py-3.5 px-5 border border-slate-200 rounded bg-slate-50 hover:bg-slate-100 transition-colors">
                <span className="font-oswald text-base font-bold text-[#1E3A5F]">
                  SK series to {productName.toLowerCase()} reference
                </span>
                <span className="text-slate-400 text-sm shrink-0 transition-transform group-open:rotate-180">
                  &#9662;
                </span>
              </summary>
              <div className="pt-5">
                <p className="text-sm text-slate-500 mb-5">
                  Standard SK steps with the SAPL grade that meets or exceeds each one. Grades are matched at or
                  above the minimum alumina for the step, so an SK enquiry is never answered with an under-spec
                  material.
                </p>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        {['SK grade', 'Min Al₂O₃', 'Cone equivalent', `SAPL ${productName.toLowerCase()}`].map((h) => (
                          <th
                            key={h}
                            className="text-left px-4 py-3 font-semibold text-slate-600 text-[11px] uppercase tracking-wider whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SK_SERIES.map(({ sk, minAl2O3, coneC }) => {
                        const owner = [...skMap.entries()].find(([, codes]) => codes.includes(sk));
                        const ownerLabel = owner?.[0] || null;
                        const isDirect = directSk?.sk === sk;
                        const isCurrent = isDirect;
                        return (
                          <tr
                            key={sk}
                            className={
                              isCurrent
                                ? 'bg-[#1E3A5F]/[0.06] border-l-2 border-[#F97316]'
                                : 'bg-white hover:bg-slate-50'
                            }
                          >
                            <td className="px-4 py-3 border-t border-slate-100 font-semibold text-[#1E3A5F] whitespace-nowrap">
                              {sk}
                            </td>
                            <td className="px-4 py-3 border-t border-slate-100 text-slate-600 whitespace-nowrap">
                              {minAl2O3}% Al₂O₃
                            </td>
                            <td className="px-4 py-3 border-t border-slate-100 text-slate-600 whitespace-nowrap">
                              {coneC}°C
                            </td>
                            <td className="px-4 py-3 border-t border-slate-100 whitespace-nowrap">
                              {ownerLabel ? (
                                isDirect ? (
                                  <span className="font-bold text-[#1E3A5F]">
                                    {ownerLabel}
                                    <span className="ml-2 text-[10px] uppercase tracking-wider text-[#F97316]">
                                      this grade
                                    </span>
                                  </span>
                                ) : (
                                  <Link
                                    href={`/products/${categorySlug}/${productId}/${slugifyGrade(ownerLabel)}`}
                                    className="font-semibold text-[#1E3A5F] hover:text-[#F97316] hover:underline"
                                  >
                                    {ownerLabel}
                                  </Link>
                                )
                              ) : (
                                <span className="text-slate-400">Enquire</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </details>
          )}

          {/* Installation */}
          {catalogEntry.installation?.length > 0 && (
            <section>
              <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-5">
                Installation notes
              </h2>
              <ol className="space-y-3">
                {catalogEntry.installation.map((step, i) => (
                  <li key={i} className="flex gap-4 text-[14.5px] text-slate-700">
                    <span className="shrink-0 w-6 h-6 rounded bg-[#1E3A5F] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <GradeOrderSidebar label={label} productId={productId} catalogEntry={catalogEntry} />
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 py-6">
          <p className="text-[12px] text-slate-500 leading-relaxed">
            Disclaimer: values are typical and compiled by Shanker Agencies Pvt. Ltd. from standard industry data
            and published manufacturer specifications. They are indicative, not a guarantee.
            Confirm the exact grade datasheet before specifying. For a certified datasheet or quotation, contact
            info@shankeragencies.com or +91 98999 57888.
          </p>
        </div>
      </div>
    </>
  );
}
