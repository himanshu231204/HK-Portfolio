'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react';

interface ArticleMeta {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function ArticleClient({ slug }: { slug: string }) {
  const [article, setArticle] = useState<ArticleMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');

  const parseMarkdown = useCallback((content: string) => {
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
    const extractedHeadings: Heading[] = [];

    const html = body
      .replace(/^# (.*$)/gm, (_, text) => {
        const id = `heading-${Object.keys(extractedHeadings).length}`;
        extractedHeadings.push({ id, text, level: 1 });
        return `<h1 id="${id}" class="text-4xl font-bold mb-6 mt-12 text-white scroll-mt-24">$1</h1>`;
      })
      .replace(/^## (.*$)/gm, (_, text) => {
        const id = `heading-${Object.keys(extractedHeadings).length}`;
        extractedHeadings.push({ id, text, level: 2 });
        return `<h2 id="${id}" class="text-2xl font-bold mb-4 mt-8 text-white scroll-mt-24">$1</h2>`;
      })
      .replace(/^### (.*$)/gm, (_, text) => {
        const id = `heading-${Object.keys(extractedHeadings).length}`;
        extractedHeadings.push({ id, text, level: 3 });
        return `<h3 id="${id}" class="text-xl font-semibold mb-3 mt-6 text-white scroll-mt-24">$1</h3>`;
      })
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-cyan-400 pl-4 py-2 my-4 italic text-slate-300 bg-white/5 p-4 rounded-r-lg">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-2 py-1 rounded text-sm font-mono text-cyan-300">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-900 border border-slate-800 p-4 rounded-lg overflow-x-auto mb-6 shadow-lg"><code class="text-sm font-mono text-slate-300">$2</code></pre>')
      .replace(/^\| /gm, '<tr><td class="border border-slate-700 px-4 py-2">')
      .replace(/\n\n+/g, '</p><p class="mb-4 leading-relaxed">')
      .replace(/^- (.*$)/gm, '<li class="ml-6 mb-2 flex items-start"><span class="text-cyan-400 mr-3 mt-1">•</span><span>$1</span></li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 mb-2 flex items-start"><span class="text-cyan-400 mr-3 font-semibold">$1.</span><span>$2</span></li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors" target="_blank" rel="noopener">$1</a>');

    return {
      title: frontmatter.title || '',
      excerpt: frontmatter.excerpt || '',
      date: frontmatter.date || '',
      tags: frontmatter.tags ? frontmatter.tags.split(',').map(t => t.trim()) : [],
      content: `<p class="mb-4 leading-relaxed">${html}</p>`,
      headings: extractedHeadings,
    };
  }, []);

  const readingTime = useMemo(() => {
    if (!article) return 0;
    const wordCount = article.content.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  }, [article]);

  useEffect(() => {
    fetch(`/articles/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(content => {
        const parsed = parseMarkdown(content);
        if (parsed) {
          setArticle(parsed);
          setHeadings(parsed.headings || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug, parseMarkdown]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
        }
      });
    }, { rootMargin: '-100px 0px -66%' });

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-3/4 mb-4" />
            <div className="h-4 bg-white/10 rounded w-1/2 mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Article Not Found</h1>
          <p className="text-slate-400 mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-2 transition-colors">
            <ArrowLeft size={16} />
            Back to Home
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative pt-24 pb-12"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Back Link */}
              <Link 
                href="/#articles"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Articles
              </Link>

              {/* Article Header */}
              <motion.header 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 pb-8 border-b border-white/10"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white">
                  {article.title}
                </h1>
                
                <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-6">
                  <span className="flex items-center gap-2 hover:text-white transition-colors">
                    <Calendar size={16} className="text-cyan-400" />
                    {formatDate(article.date)}
                  </span>
                  <span className="flex items-center gap-2 hover:text-white transition-colors">
                    <Clock size={16} className="text-cyan-400" />
                    {readingTime} min read
                  </span>
                  <span className="flex items-center gap-2 hover:text-white transition-colors">
                    <BookOpen size={16} className="text-cyan-400" />
                    {article.content.split(/\s+/).length.toLocaleString()} words
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <motion.span 
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-full text-sm text-cyan-300 hover:bg-cyan-400/20 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.header>

              {/* Article Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-invert max-w-none text-slate-300 prose-headings:text-white prose-a:text-cyan-400"
              >
                <div 
                  className="space-y-4 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </motion.div>

              {/* Footer */}
              <motion.footer 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <div className="flex items-center justify-between">
                  <Link 
                    href="/#articles"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    More Articles
                  </Link>
                  <button
                    onClick={() => {
                      navigator.share({
                        title: article.title,
                        text: article.excerpt,
                        url: window.location.href,
                      }).catch(() => {
                        // Fallback - copy to clipboard
                        navigator.clipboard.writeText(window.location.href);
                      });
                    }}
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </motion.footer>
            </div>

            {/* Table of Contents Sidebar */}
            {headings.length > 0 && (
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block h-fit sticky top-24"
              >
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <BookOpen size={16} className="text-cyan-400" />
                    On this page
                  </h3>
                  <nav className="space-y-2">
                    {headings.map(heading => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`block text-sm transition-all duration-300 rounded px-2 py-1.5 ${
                          activeHeading === heading.id
                            ? 'text-cyan-400 bg-cyan-400/10 font-medium'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        } ${heading.level === 3 ? 'ml-4' : ''}`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.aside>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}