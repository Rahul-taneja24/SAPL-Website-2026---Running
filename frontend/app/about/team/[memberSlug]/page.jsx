import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, MessageCircle, ChevronRight, Award, Linkedin, BookOpen } from 'lucide-react';
import { TEAM_DATA, getTeamMemberBySlug } from '@/data/teamData';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';

export const dynamicParams = false;

export async function generateStaticParams() {
  return TEAM_DATA.map((member) => ({ memberSlug: member.slug }));
}

export async function generateMetadata({ params }) {
  const { memberSlug } = await params;
  const member = getTeamMemberBySlug(memberSlug);
  if (!member) return { title: 'Team Member Not Found' };

  return {
    title: { absolute: `${member.name} — ${member.role} | Shanker Agencies` },
    description: member.shortBio,
    alternates: { canonical: `/about/team/${member.slug}` },
    openGraph: {
      title: `${member.name} — ${member.role}`,
      description: member.shortBio,
      url: `https://www.shankeragencies.com/about/team/${member.slug}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'profile',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: member.name }],
    },
  };
}

export default async function TeamMemberPage({ params }) {
  const { memberSlug } = await params;
  const member = getTeamMemberBySlug(memberSlug);
  if (!member) notFound();

  const authoredPosts = BLOG_POSTS_DATA.filter((p) => p.author?.name === member.name);
  const memberUrl = `https://www.shankeragencies.com/about/team/${member.slug}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${memberUrl}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url: memberUrl,
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://www.shankeragencies.com/#organization',
      name: 'Shanker Agencies Pvt. Ltd.',
      url: 'https://www.shankeragencies.com',
    },
    knowsAbout: member.expertise,
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.shankeragencies.com/about' },
      { '@type': 'ListItem', position: 3, name: member.name, item: memberUrl },
    ],
  };

  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,70,0.97) 0%, rgba(30,58,138,0.92) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/80">{member.name}</span>
          </nav>

          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full bg-[#F97316] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {member.name}
              </h1>
              <p className="text-white/70 text-lg mt-1">{member.role}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/15">
              <Award className="w-3.5 h-3.5" /> {member.yearsExperience} years experience
            </span>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/15 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="prose prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-relaxed mb-10">
            <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-3">About {member.name.split(' ')[0]}</h2>
            <p>{member.bio}</p>
          </div>

          {member.expertise?.length > 0 && (
            <div className="mb-10">
              <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-4">Areas of Expertise</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {member.expertise.map((item) => (
                  <div key={item} className="flex items-start gap-2 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <Award className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {authoredPosts.length > 0 && (
            <div className="mb-10">
              <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F97316]" /> Articles by {member.name.split(' ')[0]}
              </h2>
              <div className="space-y-3">
                {authoredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-[#F97316]/30 hover:shadow-sm p-4 transition-all"
                  >
                    <p className="text-[#1E3A5F] font-semibold text-sm">{post.title}</p>
                    <p className="text-gray-400 text-xs mt-1">{post.readTime} · {post.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl overflow-hidden border border-[#F97316]/20 shadow-sm">
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#1E40AF] p-6 text-white">
              <h3 className="font-oswald text-xl font-bold mb-1">Talk to Our Refractory Engineers</h3>
              <p className="text-white/80 text-sm">45+ years of expertise · Authorized CUMI, Crown Ceramics &amp; Divine Cerawool dealer</p>
            </div>
            <div className="bg-white p-6">
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                  <Phone className="w-4 h-4" /> Contact Us
                </Link>
                <a href="https://wa.me/919899957888" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
