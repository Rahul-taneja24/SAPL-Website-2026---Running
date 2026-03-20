import KnowledgeBase from '@/sections/KnowledgeBase';
export const metadata = {
  title: 'Knowledge Base | Refractory Engineering Resources',
  description: 'Technical guides, installation tips, and engineering resources for refractory professionals. Learn about castables, bricks, mortars and lining systems.',
  alternates: { canonical: '/knowledge' },
};
export default function KnowledgePage() { return <KnowledgeBase />; }
