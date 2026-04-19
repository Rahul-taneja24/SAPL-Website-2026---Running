import { ImageResponse } from 'next/og';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';

export const alt = 'Shanker Agencies Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Pre-generate OG images for every blog post at build time.
export async function generateImageMetadata() {
  return BLOG_POSTS_DATA.map((p) => ({
    id: p.slug,
    alt: p.title,
    contentType: 'image/png',
    size: { width: 1200, height: 630 },
  }));
}

// Constraints: next/og ImageResponse supports only a narrow CSS subset — flat
// backgroundColor, flex, borders, border-radius, opacity, absolute positioning.
// No gradients, no external images, no inline SVG. Depth is simulated via layered flat divs.
export default async function Image({ params }) {
  const { articleSlug } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === articleSlug);

  const title = post?.title || 'Refractory Engineering Insights';
  const category = post?.category || 'Technical Guide';
  const readTime = post?.readTime || '8 min';
  const tags = (post?.tags || []).slice(0, 4);

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
        {/* Orange diagonal — upper-right */}
        <div style={{ position: 'absolute', top: '-140px', right: '-140px', width: '460px', height: '460px', backgroundColor: '#F97316', opacity: 0.12, transform: 'rotate(45deg)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: '-90px', right: '-90px', width: '280px', height: '280px', backgroundColor: '#EA580C', opacity: 0.18, transform: 'rotate(45deg)', display: 'flex' }} />

        {/* Blue halo — lower-left */}
        <div style={{ position: 'absolute', bottom: '-200px', left: '-140px', width: '460px', height: '460px', borderRadius: '50%', backgroundColor: '#1E40AF', opacity: 0.25, display: 'flex' }} />

        {/* Left orange rail */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', backgroundColor: '#F97316', display: 'flex' }} />

        {/* Content */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '630px', padding: '60px 80px' }}>
          {/* HEADER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#0B1628', fontSize: '26px', fontWeight: 900 }}>S</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 800, letterSpacing: '0.01em' }}>
                SHANKER AGENCIES
              </span>
              <span style={{ color: '#F97316', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', marginTop: '4px' }}>
                REFRACTORY ENGINEERING BLOG
              </span>
            </div>
          </div>

          {/* MIDDLE — category pill + title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1040px' }}>
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
              <span style={{ color: '#FDBA74', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {category} \u00B7 {readTime} read
              </span>
            </div>

            <span
              style={{
                color: '#FFFFFF',
                fontSize: title.length > 80 ? '44px' : title.length > 55 ? '52px' : '60px',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </span>
          </div>

          {/* FOOTER */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              paddingTop: '18px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '800px' }}>
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <div
                    key={tag}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '6px 14px',
                      borderRadius: '6px',
                      display: 'flex',
                    }}
                  >
                    {tag}
                  </div>
                ))
              ) : (
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', fontWeight: 600 }}>
                  Authorized dealer: CUMI \u00B7 TRL Krosaki \u00B7 IFGL \u00B7 Calderys \u00B7 Mahakoshal
                </span>
              )}
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
