'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds. Capped so long lists never feel slow. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}

/**
 * The single entrance animation used across the site: an 8px rise and fade.
 *
 * Previously every section rolled its own combination of spring scales,
 * x-slides and rotations, which read as busy and fought the content. One
 * primitive keeps the whole page on the same rhythm.
 *
 * Reduced motion is handled in CSS (`[data-reveal]` in app/globals.css), not by
 * branching here. Branching on the media query at render time desynced the
 * server and client: the server emitted Framer's `opacity: 0` and hydration
 * left it in place, so everything below the fold stayed permanently invisible
 * for exactly the visitors who need it most. The CSS override wins over the
 * inline style unconditionally, so it cannot fail that way.
 */
export default function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal=""
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(delay, 0.4) }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
