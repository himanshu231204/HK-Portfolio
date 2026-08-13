'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  copyText?: string;
}

/**
 * A compact directory row. The previous version wrapped each channel in a
 * blurred rainbow glow that fired on hover — six of them at once made the
 * contact section the loudest thing on the page.
 */
export default function ContactCard({ icon, label, value, href, copyText }: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — the value is visible on screen regardless.
    }
  };

  const body = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] text-ink-muted">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="mono-label block">{label}</span>
        <span className="mt-1 block truncate text-sm">{value}</span>
      </span>
    </>
  );

  return (
    <div className="group flex items-center gap-3 border-b border-[var(--border)] py-3.5 last:border-b-0">
      {href ? (
        <a
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="flex min-w-0 flex-1 items-center gap-3 transition-colors hover:text-[var(--accent)]"
        >
          {body}
        </a>
      ) : (
        <span className="flex min-w-0 flex-1 items-center gap-3">{body}</span>
      )}

      {copyText && (
        <button
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className="shrink-0 rounded-md p-2 text-ink-faint transition-colors hover:bg-[var(--surface)] hover:text-ink"
        >
          {copied ? <Check size={14} className="text-[var(--positive)]" /> : <Copy size={14} />}
        </button>
      )}
    </div>
  );
}
