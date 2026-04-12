import { ImageResponse } from 'next/og';

export const alt = 'Shanker Agencies | Refractory Engineering Partner Since 1980';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0F1E46',
          padding: '60px 72px',
        }}
      >
        {/* Orange left bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '10px',
            height: '630px',
            backgroundColor: '#F97316',
            display: 'flex',
          }}
        />

        {/* Top — company name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Logo placeholder circle */}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>S</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, letterSpacing: '0.04em' }}>
                SHANKER AGENCIES PVT. LTD.
              </span>
              <span style={{ color: '#F97316', fontSize: '13px', fontWeight: 600, letterSpacing: '0.18em' }}>
                REFRACTORY ENGINEERING SOLUTIONS
              </span>
            </div>
          </div>
        </div>

        {/* Middle — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '4px', backgroundColor: '#F97316', borderRadius: '2px', display: 'flex' }} />
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', fontWeight: 500, letterSpacing: '0.12em' }}>
              SINCE 1980 · ISO 9001:2015 · 50+ COUNTRIES
            </span>
          </div>
          <span style={{ color: '#FFFFFF', fontSize: '54px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            India's Leading
          </span>
          <span style={{ color: '#F97316', fontSize: '54px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.01em', marginTop: '-14px' }}>
            Refractory Engineering Partner
          </span>
        </div>

        {/* Bottom — tags */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['CUMI Authorized', 'Crown Ceramics', 'TRL Krosaki', 'IFGL'].map((tag) => (
              <div
                key={tag}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '7px 18px',
                  borderRadius: '999px',
                  display: 'flex',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px' }}>
            shankeragencies.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
