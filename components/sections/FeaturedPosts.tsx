'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import GridFillers from '@/components/ui/GridFillers';
import PostCard from '@/components/PostCard';

interface FeaturedPost {
  id: number;
  title: string;
  date: string;
  description: string;
  link: string;
}

interface FeaturedPostsData {
  profileUrl: string;
  posts: FeaturedPost[];
}

export default function FeaturedPosts() {
  const [posts, setPosts] = useState<FeaturedPost[]>([]);
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/data/featuredPosts.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch featured posts');
        return response.json() as Promise<FeaturedPostsData>;
      })
      .then((data) => {
        if (cancelled) return;
        setPosts(
          [...data.posts].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
        setProfileUrl(data.profileUrl);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Nothing to show and nothing loading — skip the section entirely rather
  // than rendering an empty header.
  if (!loading && (failed || posts.length === 0)) return null;

  return (
    <Section
      index="07"
      title="Posts"
      description="Shorter takes on AI/ML, open source and developer tooling, shared as I go."
      action={
        profileUrl ? (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-meta link-underline inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
          >
            All posts on LinkedIn <ArrowUpRight size={13} />
          </a>
        ) : undefined
      }
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-[var(--bg)] p-6">
                <div className="h-3 w-20 rounded bg-[var(--surface-hover)]" />
                <div className="mt-4 h-4 w-3/4 rounded bg-[var(--surface-hover)]" />
                <div className="mt-3 h-3 w-full rounded bg-[var(--surface-hover)]" />
                <div className="mt-2 h-3 w-2/3 rounded bg-[var(--surface-hover)]" />
              </div>
            ))
          : posts.map((post, index) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.description}
                date={post.date}
                link={post.link}
                index={index}
              />
            ))}
        {!loading && <GridFillers count={posts.length} />}
      </div>
    </Section>
  );
}
