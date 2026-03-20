import Blog from '@/sections/Blog';
export async function generateMetadata({ params }) {
  const title = params.articleSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title,
    description: `Read about ${title.toLowerCase()} on the Shanker Agencies blog.`,
    alternates: { canonical: `/blog/${params.articleSlug}` },
  };
}
export default function BlogArticlePage() { return <Blog />; }
