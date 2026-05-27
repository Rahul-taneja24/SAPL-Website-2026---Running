import { ImageResponse } from 'next/og';

export const alt = 'Authorized Refractory Brand Distributor | Shanker Agencies';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BRAND_META = {
  cumi: {
    name: 'CUMI Super Refractories',
    tagline: 'Authorized Dealer',
    blurb: 'High alumina bricks, castables, ramming mass, insulating fire bricks & ceramic fiber products.',
  },
  calderys: {
    name: 'Calderys',
    tagline: 'Supply Partner',
    blurb: 'Monolithic refractories, castables, gunning mixes and specialty refractory solutions for steel, cement and glass.',
  },
  'trl-krosaki': {
    name: 'TRL Krosaki',
    tagline: 'Supply Partner',
    blurb: 'MgO-C bricks, magnesia bricks, silicon carbide products and advanced refractories for iron and steel.',
  },
  ifgl: {
    name: 'IFGL Refractories',
    tagline: 'Supply Partner',
    blurb: 'Slide gate plates, ladle shrouds, subentry nozzles, monoblock stoppers and continuous casting flow control.',
  },
  'divine-cerawool': {
    name: 'Divine Cerawool',
    tagline: 'Authorized Dealer',
    blurb: 'Ceramic fiber blankets, modules, boards and calcium silicate insulation for high-temperature applications.',
  },
  'crown-ceramics': {
    name: 'Crown Ceramics',
    tagline: 'Authorized Dealer',
    blurb: 'Acid proof bricks, acid resistant tiles, carbon bricks and acid-resistant cement for chemical plants.',
  },
  mahakoshal: {
    name: 'Mahakoshal Refractories',
    tagline: 'Authorized Dealer',
    blurb: 'Refractory bricks and castables for steel and industrial furnace applications.',
  },
  'saint-gobain': {
    name: 'Saint-Gobain',
    tagline: 'Supply Partner',
    blurb: 'HeatKing induction furnace linings, monolithic castables and high-performance ceramic refractory solutions.',
  },
};

// next/og constraint: flat divs only — no gradients, no external images, no SVG.
export default async function Image({ params }) {
  const { brandSlug } = await params;
  const meta = BRAND_META[brandSlug] || {
    name: 'Refractory Brand',
    tagline: 'Distributor',
    blurb: 'Authorized dealer of leading refractory brands across India, GCC and ASEAN since 1980.',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#0B1628', fontSize: '26px', fontWeight: 900 }}>S</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 800 }}>SHANKER AGENCIES</span>
              <span style={{ color: '#F97316', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', marginTop: '4px' }}>
                INDIA \u00B7 GCC \u00B7 ASEAN \u00B7 SINCE 1980
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1000px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(249,115,22,0.14)',
                border: '1px solid rgba(249,115,22,0.4)',
                borderRadius: '999px',
                padding: '8px 18px',
                alignSelf: 'flex-start',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F97316', display: 'flex' }} />
              <span style={{ color: '#FDBA74', fontSize: '13px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {meta.tagline}
              </span>
            </div>

            <span style={{ color: '#FFFFFF', fontSize: meta.name.length > 22 ? '56px' : '68px', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              {meta.name}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '22px', fontWeight: 500, lineHeight: 1.4, marginTop: '4px' }}>
              {meta.blurb}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '20px' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 600, letterSpacing: '0.03em' }}>
              Pan-India supply \u00B7 Technical support \u00B7 45+ years of refractory expertise
            </span>
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
