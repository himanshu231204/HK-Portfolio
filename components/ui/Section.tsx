import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionProps {
  id?: string;
  /** Two-digit index rendered in mono, e.g. "01". Gives the page a spine. */
  index: string;
  title: string;
  /** One-line framing sentence under the title. */
  description?: string;
  /** Optional element pinned to the right of the header on wide screens. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Shared section shell.
 *
 * Every section used to repeat a centred `<h2>` with one word wrapped in a
 * gradient, which made twelve different sections look like the same slide
 * twelve times. Here the header is left-aligned and numbered, with a rule that
 * runs to the edge of the grid — the visual language of a technical document.
 */
export default function Section({
  id,
  index,
  title,
  description,
  action,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <header className="mb-12 md:mb-16">
            <div className="flex items-center gap-4">
              <span className="mono-label">{index}</span>
              <div className="rule-fade flex-1" />
            </div>

            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="heading text-3xl font-semibold md:text-4xl">{title}</h2>
                {description && (
                  <p className="prose-muted mt-3 text-[0.95rem]">{description}</p>
                )}
              </div>
              {action && <div className="shrink-0">{action}</div>}
            </div>
          </header>
        </Reveal>

        {children}
      </div>
    </section>
  );
}
