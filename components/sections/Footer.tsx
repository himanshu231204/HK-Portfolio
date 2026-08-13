'use client';

import { Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/SocialIcons';

const socials = [
  { href: 'https://github.com/himanshu231204', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/himanshu231204/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://twitter.com/himanshu231204', label: 'Twitter', Icon: Twitter },
  { href: 'mailto:himanshu231204@gmail.com', label: 'Email', Icon: Mail },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium">Himanshu Kumar</p>
            <p className="mono-meta mt-1">AI Engineer · Patna, India</p>
          </div>

          <div className="flex items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-lg p-2 text-ink-faint transition-colors hover:bg-[var(--surface)] hover:text-ink"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--border)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="mono-meta">© {currentYear} Himanshu Kumar</p>
          <p className="mono-meta">Next.js · TypeScript · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
