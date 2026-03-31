'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft, ArrowRight } from 'lucide-react';

interface ArticleMeta {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
}

export default function ArticleClient({ slug }: { slug: string }) {
  const [article, setArticle] = useState<ArticleMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/articles/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(content => {
        const parsed = parseMarkdown(content);
        setArticle(parsed);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  function parseMarkdown(content: string) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const frontmatter: Record<string, string> = {};
    const lines = match[1].split('\n');

    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      }
    });

    const body = content.slice(match[0].length).trim();
    
    // Simple markdown to HTML conversion
    const html = body
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-sm">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-800 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm">$2</code></pre>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 mb-1">$2</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-400 hover:underline" target="_blank" rel="noopener">$1</a>');

    return {
      title: frontmatter.title || '',
      excerpt: frontmatter.excerpt || '',
      date: frontmatter.date || '',
      tags: frontmatter.tags ? frontmatter.tags.split(',').map(t => t.trim()) : [],
      content: `<p class="mb-4">${html}</p>`,
    };
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-3/4 mb-4" />
            <div className="h-4 bg-white/10 rounded w-1/2 mb-8" />
            <div className="h-4 bg-white/10 rounded w-full mb-2" />
            <div className="h-4 bg-white/10 rounded w-full mb-2" />
            <div className="h-4 bg-white/10 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-slate-400 mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/" className="text-cyan-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article className="min-h-screen pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6"
      >
        {/* Back Link */}
        <Link 
          href="/#articles"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(article.date)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-invert max-w-none text-slate-300"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <Link 
            href="/#articles"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowRight size={16} className="rotate-180" />
            More Articles
          </Link>
        </footer>
      </motion.div>
    </article>
  );
}