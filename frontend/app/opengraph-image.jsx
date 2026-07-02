import { ImageResponse } from 'next/og';

export const alt =
  'Shanker Agencies | India\u2019s Refractory Engineering Partner Since 1980 \u2014 CUMI, TRL Krosaki, Calderys, Mahakoshal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Homepage / default OpenGraph image.
// Per-route overrides (blog, products, brands, locations) live alongside their page.jsx.
// Constraints: next/og ImageResponse supports only a narrow CSS subset — flat backgroundColor,
// flex layout, borders, border-radius, opacity, and absolute positioning. No CSS gradients,
// no external images, no inline SVG. Visual depth is built by layering flat coloured divs.
export default async function Image() {
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
        {/* Diagonal orange accent — upper-right corner */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '420px',
            height: '420px',
            backgroundColor: '#F97316',
            opacity: 0.12,
            transform: 'rotate(45deg)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '260px',
            height: '260px',
            backgroundColor: '#EA580C',
            opacity: 0.18,
            transform: 'rotate(45deg)',
            display: 'flex',
          }}
        />

        {/* Soft blue halo — lower-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-180px',
            left: '-120px',
            width: '440px',
            height: '440px',
            borderRadius: '50%',
            backgroundColor: '#1E40AF',
            opacity: 0.25,
            display: 'flex',
          }}
        />

        {/* Left orange rail */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '8px',
            backgroundColor: '#F97316',
            display: 'flex',
          }}
        />

        {/* Subtle grid overlay — dots on diagonal */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            style={{
              position: 'absolute',
              top: `${30 + i * 32}px`,
              left: `${60 + i * 64}px`,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#F97316',
              opacity: 0.15,
              display: 'flex',
            }}
          />
        ))}

        {/* Content wrapper */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '630px',
            padding: '64px 80px',
          }}
        >
          {/* HEADER — brand lockup */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '14px',
                backgroundColor: '#F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 4px rgba(249,115,22,0.18)',
              }}
            >
              <span style={{ color: '#0B1628', fontSize: '30px', fontWeight: 900, letterSpacing: '-0.02em' }}>
                S
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 800, letterSpacing: '0.01em' }}>
                SHANKER AGENCIES PVT. LTD.
              </span>
              <span style={{ color: '#F97316', fontSize: '13px', fontWeight: 600, letterSpacing: '0.22em', marginTop: '4px' }}>
                REFRACTORY ENGINEERING SOLUTIONS
              </span>
            </div>
          </div>

          {/* MIDDLE — headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
            {/* Eyebrow badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(249,115,22,0.12)',
                border: '1px solid rgba(249,115,22,0.35)',
                borderRadius: '999px',
                padding: '8px 18px',
                alignSelf: 'flex-start',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F97316', display: 'flex' }} />
              <span style={{ color: '#FDBA74', fontSize: '13px', fontWeight: 600, letterSpacing: '0.18em' }}>
                SINCE 1980 · ISO 9001:2015 · 50+ COUNTRIES
              </span>
            </div>

            <span
              style={{
                color: '#FFFFFF',
                fontSize: '60px',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              India’s Leading
            </span>
            <span
              style={{
                color: '#F97316',
                fontSize: '60px',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginTop: '-22px',
              }}
            >
              Refractory Engineering Partner
            </span>

            <span
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: 1.4,
                marginTop: '8px',
              }}
            >
              Authorised dealer of CUMI, Crown Ceramics & Divine Cerawool ·
              Supply partner for Calderys, TRL Krosaki, Mahakoshal & Saint-Gobain
            </span>
          </div>

          {/* FOOTER — partner chips + url */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              paddingTop: '20px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['CUMI', 'Calderys', 'TRL Krosaki', 'Mahakoshal', 'Crown Ceramics'].map((tag) => (
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
