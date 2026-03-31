import { Metadata } from 'next';
import ArticleClient from './ArticleClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await fetch(`/articles/${slug}.md`);
    if (!response.ok) {
      return { title: 'Article Not Found' };
    }
    
    const content = await response.text();
    const frontmatter = parseFrontmatter(content);
    
    return {
      title: `${frontmatter.title} | Articles`,
      description: frontmatter.excerpt,
    };
  } catch {
    return { title: 'Article Not Found' };
  }
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { title: '', excerpt: '', date: '', tags: [] };
  
  const frontmatter: Record<string, string> = {};
  const lines = match[1].split('\n');
  
  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  
  return {
    title: frontmatter.title || '',
    excerpt: frontmatter.excerpt || '',
    date: frontmatter.date || '',
    tags: frontmatter.tags ? frontmatter.tags.split(',').map(t => t.trim()) : [],
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  
  return <ArticleClient slug={slug} />;
}