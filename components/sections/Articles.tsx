'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Articles() {
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/articles/index.json')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section
      id="writing"
      index="06"
      title="Writing"
      description="Notes on what I learn while building — the details that were not in any tutorial."
      action={
        articles.length > 0 ? (
          <Link
            href="/articles"
            className="mono-meta link-underline inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
          >
            All articles <ArrowRight size={13} />
          </Link>
        ) : undefined
      }
    >
      {loading ? (
        <div className="overflow-hidden rounded-xl border border-[var(--border)]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse border-b border-[var(--border)] px-5 py-7 last:border-b-0 md:px-7"
            >
              <div className="h-4 w-1/2 rounded bg-[var(--surface-hover)]" />
              <div className="mt-3 h-3 w-3/4 rounded bg-[var(--surface-hover)]" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="rounded-xl border border-[var(--border)] px-6 py-12 text-center text-sm text-ink-muted">
          No articles published yet.
        </p>
      ) : (
        <ul className="overflow-hidden rounded-xl border border-[var(--border)]">
          {articles.map((article, index) => (
            <Reveal
              key={article.slug}
              as="li"
              delay={index * 0.05}
              className="border-b border-[var(--border)] last:border-b-0"
            >
              <Link
                href={`/articles/${article.slug}`}
                className="group block px-5 py-7 transition-colors hover:bg-[var(--surface)] md:px-7"
              >
                <div className="grid gap-4 md:grid-cols-[110px_minmax(0,1fr)] md:gap-8">
                  <time className="mono-meta pt-0.5" dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>

                  <div>
                    <div className="flex items-start gap-2">
                      <h3 className="font-medium transition-colors group-hover:text-[var(--accent)]">
                        {article.title}
                      </h3>
                      <ArrowUpRight
                        size={14}
                        className="mt-1 shrink-0 text-ink-faint transition-colors group-hover:text-[var(--accent)]"
                      />
                    </div>

                    <p className="prose-muted mt-2 max-w-2xl text-sm">{article.excerpt}</p>

                    {article.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {article.tags.slice(0, 4).map((tag) => (
                          <li key={tag} className="tag">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
