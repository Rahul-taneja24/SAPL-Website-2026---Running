import { ImageResponse } from 'next/og';
import { LOCATIONS_DATA } from '@/data/locationsData';

export const alt = 'Refractory Supplier | Shanker Agencies';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// next/og constraint: flat backgroundColor, flex, borders, border-radius, opacity.
// No gradients / external images / inline SVG.
export default async function Image({ params }) {
  const { locationSlug } = await params;
  const loc = LOCATIONS_DATA.find((l) => l.slug === locationSlug);

  const city = loc?.city || 'India';
  const state = loc?.state || '';
  const country = loc?.country || 'India';
  const industries = (loc?.industries || ['steel', 'cement', 'power']).slice(0, 5);
  const isIntl = !!loc?.isInternational;

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

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '630px', padding: '60px 80px' }}>
          {/* HEADER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#0B1628', fontSize: '26px', fontWeight: 900 }}>S</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 800 }}>SHANKER AGENCIES</span>
              <span style={{ color: '#F97316', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', marginTop: '4px' }}>
                AUTHORIZED REFRACTORY SUPPLIER \u00B7 SINCE 1980
              </span>
            </div>
          </div>

          {/* MIDDLE */}
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
                {isIntl ? 'Export Market' : 'Industrial Corridor'} \u00B7 {country}
              </span>
            </div>

            <span style={{ color: '#FFFFFF', fontSize: '50px', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Refractory Supplier in
            </span>
            <span style={{ color: '#F97316', fontSize: '74px', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', marginTop: '-18px' }}>
              {city}{state && state !== city ? `, ${state}` : ''}
            </span>

            <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '20px', fontWeight: 500, lineHeight: 1.4, marginTop: '6px' }}>
              Same-day dispatch \u00B7 CUMI / Calderys / TRL Krosaki / Mahakoshal \u00B7 45+ years of refractory engineering
            </span>
          </div>

          {/* FOOTER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '18px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {industries.map((ind) => (
                <div
                  key={ind}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: '6px',
                    textTransform: 'capitalize',
                    display: 'flex',
                  }}
                >
                  {ind}
                </div>
              ))}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em' }}>
              shankeragencies.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
