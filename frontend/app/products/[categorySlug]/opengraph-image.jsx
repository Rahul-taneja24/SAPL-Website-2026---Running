import { ImageResponse } from 'next/og';

export const alt = 'Shanker Agencies Refractory Products';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_META = {
  'shaped-refractories': {
    title: 'Shaped Refractories',
    blurb: 'High alumina bricks, fireclay, IFB, basic bricks and SiC bricks',
    brands: ['CUMI', 'TRL Krosaki', 'Mahakoshal'],
  },
  'unshaped-refractories': {
    title: 'Unshaped Refractories',
    blurb: 'Low cement castables, ULCC, ramming mass, gunning & plastic refractories',
    brands: ['CUMI', 'Calderys', 'Mahakoshal'],
  },
  'flow-control': {
    title: 'Flow Control Refractories',
    blurb: 'Slide gate plates, ladle shrouds, subentry nozzles, monoblock stoppers',
    brands: ['TRL Krosaki', 'Vesuvius', 'RHI'],
  },
  'insulation': {
    title: 'Insulation Products',
    blurb: 'Ceramic fiber blankets, modules, boards, calcium silicate & microporous',
    brands: ['Divine Cerawool', 'CUMI'],
  },
  'acid-proofing': {
    title: 'Acid Proofing Products',
    blurb: 'Acid proof bricks, tiles, carbon bricks & acid-resistant cements',
    brands: ['Crown Ceramics'],
  },
};

// Constraint reminder: next/og supports a narrow CSS subset only. Use flat divs.
export default async function Image({ params }) {
  const { categorySlug } = await params;
  const meta = CATEGORY_META[categorySlug] || {
    title: categorySlug
      .split('-')
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(' '),
    blurb: 'Industrial refractory products for steel, cement, glass, aluminium, power and petrochemical industries.',
    brands: ['CUMI', 'TRL Krosaki', 'Calderys'],
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0B1628',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: '-140px', right: '-140px', width: '460px', height: '460px', backgroundColor: '#F97316', opacity: 0.12, transform: 'rotate(45deg)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: '-90px', right: '-90px', width: '280px', height: '280px', backgroundColor: '#EA580C', opacity: 0.18, transform: 'rotate(45deg)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: '-200px', left: '-140px', width: '460px', height: '460px', borderRadius: '50%', backgroundColor: '#1E40AF', opacity: 0.25, display: 'flex' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', backgroundColor: '#F97316', display: 'flex' }} />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '630px', padding: '64px 80px' }}>
          {/* HEADER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#0B1628', fontSize: '26px', fontWeight: 900 }}>S</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 800 }}>SHANKER AGENCIES</span>
              <span style={{ color: '#F97316', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', marginTop: '4px' }}>
                REFRACTORY PRODUCT CATALOG
              </span>
            </div>
          </div>

          {/* MIDDLE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '980px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(249,115,22,0.12)',
                border: '1px solid rgba(249,115,22,0.35)',
                borderRadius: '999px',
                padding: '6px 16px',
                alignSelf: 'flex-start',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F97316', display: 'flex' }} />
              <span style={{ color: '#FDBA74', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em' }}>
                PRODUCT CATEGORY
              </span>
            </div>

            <span style={{ color: '#FFFFFF', fontSize: '64px', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              {meta.title}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '22px', fontWeight: 500, lineHeight: 1.4, marginTop: '4px' }}>
              {meta.blurb}
            </span>
          </div>

          {/* FOOTER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {meta.brands.map((tag) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', fontWeight: 600, letterSpacing: '0.05em' }}>
              shankeragencies.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
