import { ImageResponse } from 'next/og';

export const alt =
  'Shanker Agencies | India\'s Refractory Engineering Partner Since 1980 — CUMI, TRL Krosaki, Calderys, Mahakoshal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Homepage OpenGraph image — 2-column layout: What We Supply · Industries We Serve
// Constraints: next/og supports only flat backgroundColor, flex layout, borders,
// border-radius, opacity, absolute positioning — no CSS gradients, no external images, no SVG.

const COL_LABEL = {
  color: '#F97316',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.22em',
  marginBottom: '16px',
  display: 'flex',
};

const ROW_ITEM = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '13px',
};

const DOT = (color) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: color,
  flexShrink: 0,
  display: 'flex',
});

const ITEM_TEXT = {
  color: 'rgba(255,255,255,0.88)',
  fontSize: '17px',
  fontWeight: 500,
  display: 'flex',
};

const BRAND_CHIP = {
  backgroundColor: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.14)',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '13px',
  fontWeight: 600,
  padding: '6px 14px',
  borderRadius: '6px',
  display: 'flex',
};

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
          overflow: 'hidden',
        }}
      >
        {/* ── decorative shapes ── */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '320px', height: '320px', backgroundColor: '#F97316', opacity: 0.07, transform: 'rotate(45deg)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '80px', width: '220px', height: '220px', backgroundColor: '#1D4ED8', opacity: 0.1, borderRadius: '50%', display: 'flex' }} />
        <div style={{ position: 'absolute', top: '200px', left: '440px', width: '120px', height: '120px', backgroundColor: '#F97316', opacity: 0.04, borderRadius: '50%', display: 'flex' }} />

        {/* ── left orange rail ── */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', backgroundColor: '#F97316', display: 'flex' }} />

        {/* ── HEADER ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '40px 64px 32px 76px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* logo mark + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* Orange square logo mark */}
            <div
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '14px',
                backgroundColor: '#F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ color: '#0B1628', fontSize: '28px', fontWeight: 900, letterSpacing: '-0.02em' }}>S</span>
            </div>

            {/* company name block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 800, letterSpacing: '0.04em', display: 'flex' }}>
                SHANKER AGENCIES PVT. LTD.
              </span>
              <span style={{ color: '#F97316', fontSize: '11px', fontWeight: 700, letterSpacing: '0.24em', display: 'flex' }}>
                REFRACTORY ENGINEERING SOLUTIONS
              </span>
            </div>
          </div>

          {/* since badge — clean, no ISO clutter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.28)',
              borderRadius: '999px',
              padding: '9px 20px',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F97316', display: 'flex' }} />
            <span style={{ color: '#FDBA74', fontSize: '12px', fontWeight: 700, letterSpacing: '0.22em', display: 'flex' }}>
              REFRACTORY ENGINEERING SOLUTIONS
            </span>
          </div>
        </div>

        {/* ── BODY — 2 columns ── */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            padding: '36px 76px 0 76px',
          }}
        >
          {/* COL 1 — WHAT WE SUPPLY */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingRight: '48px' }}>
            <span style={COL_LABEL}>WHAT WE SUPPLY</span>
            {[
              'Shaped Refractories',
              'Monolithic Castables',
              'Flow Control Systems',
              'Thermal Insulation',
              'Acid Proofing',
            ].map((label) => (
              <div key={label} style={ROW_ITEM}>
                <div style={DOT('#F97316')} />
                <span style={ITEM_TEXT}>{label}</span>
              </div>
            ))}
          </div>

          {/* vertical divider */}
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', flexShrink: 0 }} />

          {/* COL 2 — INDUSTRIES */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingLeft: '48px' }}>
            <span style={{ ...COL_LABEL, color: '#34D399' }}>INDUSTRIES WE SERVE</span>
            {[
              'Iron & Steel',
              'Cement & Lime',
              'Aluminum & Foundry',
              'Glass & Ceramic',
              'Power & Petrochem',
            ].map((label) => (
              <div key={label} style={ROW_ITEM}>
                <div style={DOT('#34D399')} />
                <span style={ITEM_TEXT}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOOTER — brand strip ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 76px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.02)',
            marginTop: '28px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {['CUMI', 'Calderys', 'TRL Krosaki', 'Mahakoshal', 'Crown Ceramics', 'Divine Cerawool'].map((b) => (
              <div key={b} style={BRAND_CHIP}>{b}</div>
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.06em', display: 'flex' }}>
            shankeragencies.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
