'use client';

import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  link: string;
  index: number;
}

export default function PostCard({ title, description, date, link, index }: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Reveal as="article" delay={index * 0.05} className="h-full">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--surface)]"
      >
        <time className="mono-meta" dateTime={date}>
          {formattedDate}
        </time>

        <div className="mt-3 flex items-start gap-2">
          <h3 className="font-medium leading-snug transition-colors group-hover:text-[var(--accent)]">
            {title}
          </h3>
          <ArrowUpRight
            size={14}
            className="mt-1 shrink-0 text-ink-faint transition-colors group-hover:text-[var(--accent)]"
          />
        </div>

        <p className="prose-muted mt-2.5 line-clamp-4 flex-1 text-sm">{description}</p>
      </a>
    </Reveal>
  );
}
