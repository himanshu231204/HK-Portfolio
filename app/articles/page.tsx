import { Metadata } from 'next';
import ArticlesSection from '@/components/sections/Articles';

export const metadata: Metadata = {
  title: 'Articles | My Portfolio',
  description: 'Read my latest articles on AI, development, and building tools that matter.',
};

export default function ArticlesPage() {
  return <ArticlesSection />;
}