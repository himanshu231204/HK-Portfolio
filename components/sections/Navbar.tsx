'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Github } from '@/components/SocialIcons';
import ThemeToggle from '@/components/ThemeToggle';

// Hrefs are root-relative so the nav also works from /articles and other
// sub-routes, where a bare "#projects" would have nothing to scroll to.
const navLinks = [
  { name: 'Work', id: 'projects' },
  { name: 'Open source', id: 'contributions' },
  { name: 'Stack', id: 'stack' },
  { name: 'Writing', id: 'writing' },
  { name: 'About', id: 'about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight whichever section currently occupies the upper third of the
  // viewport, so the nav reflects where the reader actually is.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null)
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] font-mono text-[0.7rem]">
            HK
          </span>
          <span className="hidden sm:inline">Himanshu Kumar</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.name}
                href={`/#${link.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <a
            href="https://github.com/himanshu231204"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="tap-target hidden rounded-lg p-2 text-ink-faint transition-colors hover:bg-[var(--surface)] hover:text-ink sm:block"
          >
            <Github size={17} />
          </a>
          <ThemeToggle />
          <Link
            href="/#contact"
            className="ml-1 hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] md:inline-flex"
          >
            Contact
          </Link>

          <button
            className="tap-target rounded-lg p-2 text-ink-muted transition-colors hover:bg-[var(--surface)] hover:text-ink md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-4 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={`/#${link.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-[var(--border)] py-3 text-sm text-ink-muted transition-colors last:border-0 hover:text-ink"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-medium text-[var(--accent-contrast)]"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
