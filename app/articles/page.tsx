import { Metadata } from 'next';
import ArticlesSection from '@/components/sections/Articles';

export const metadata: Metadata = {
  title: 'Articles | Himanshu Kumar',
  description: 'Read my latest articles on AI, Machine Learning, GenAI, and building tools that solve real problems.',
  openGraph: {
    title: 'Articles | Himanshu Kumar',
    description: 'Read my latest articles on AI, development, and building tools that matter.',
    url: 'https://himanshukumar.me/articles',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles | Himanshu Kumar',
    description: 'Read my latest articles on AI and development',
  },
};

export default function ArticlesPage() {
  return <ArticlesSection />;
}