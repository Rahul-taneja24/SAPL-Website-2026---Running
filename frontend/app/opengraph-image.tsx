import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Shanker Agencies | Refractory Engineering Partner';
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
          background: 'linear-gradient(135deg, #0F1E46 0%, #1E3A5F 50%, #1E40AF 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(249,115,22,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Orange accent bar — left */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '8px',
            background: 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)',
          }}
        />

        {/* Orange glow — top right */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 72px',
            height: '100%',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Top — Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.shankeragencies.com/og-image-logo.png"
              alt="SAPL"
              width={72}
              height={72}
              style={{ objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  lineHeight: 1.2,
                }}
              >
                SHANKER AGENCIES PVT. LTD.
              </span>
              <span
                style={{
                  color: '#F97316',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}
              >
                Refractory Engineering Solutions
              </span>
            </div>
          </div>

          {/* Middle — Main headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  height: '4px',
                  width: '48px',
                  background: '#F97316',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '16px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Since 1980 · ISO 9001:2015
              </span>
            </div>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '52px',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}
            >
              India's Leading{'\n'}Refractory Engineering Partner
            </span>
          </div>

          {/* Bottom — Tags + website */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['CUMI Authorized', 'Crown Ceramics', 'Divine Cerawool', '50+ Countries'].map(
                (tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '14px',
                      fontWeight: 500,
                      padding: '6px 16px',
                      borderRadius: '999px',
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <span
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '16px',
                fontWeight: 400,
              }}
            >
              shankeragencies.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
