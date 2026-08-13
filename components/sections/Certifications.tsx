'use client';

import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

const certifications: Certification[] = [
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: 'Mar 2026',
    credentialId: 'wxc3tuqafyjg',
    url: 'https://verify.skilljar.com/c/wxc3tuqafyjg',
  },
  {
    title: 'Get Started with Databricks for Generative AI',
    issuer: 'Databricks',
    date: 'Jan 2026',
    credentialId: '9746936',
    url: 'https://simpli-web.app.link/e/eSxBk0UXX1b',
  },
  {
    title: 'Introduction to Generative AI',
    issuer: 'Simplilearn (SkillUp) — powered by Google Cloud',
    date: 'Jan 2026',
    credentialId: '9731066',
    url: 'https://simpli-web.app.link/e/kBMrkZYXX1b',
  },
  {
    title: 'Programming with Python',
    issuer: 'Internshala Trainings',
    date: 'Jun 2025',
    credentialId: 'elooktz9ps2',
  },
];

export default function Certifications() {
  return (
    <Section
      id="certifications"
      index="09"
      title="Certifications"
      description="Verifiable credentials — each one links to its issuer where a public verification page exists."
    >
      {/* A ledger, not four award badges. Credential IDs are the point. */}
      <ul className="overflow-hidden rounded-xl border border-[var(--border)]">
        {certifications.map((cert, index) => {
          const hasLink = Boolean(cert.url);
          const Row = (
            <div className="grid gap-3 px-5 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 md:px-7">
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-sm font-medium ${
                      hasLink ? 'transition-colors group-hover:text-[var(--accent)]' : ''
                    }`}
                  >
                    {cert.title}
                  </h3>
                  {hasLink && (
                    <ArrowUpRight
                      size={13}
                      className="text-ink-faint transition-colors group-hover:text-[var(--accent)]"
                    />
                  )}
                </div>
                <p className="prose-muted mt-1.5 text-sm">{cert.issuer}</p>
              </div>

              <div className="mono-meta flex flex-wrap items-center gap-x-5 gap-y-1 md:justify-end">
                {cert.credentialId && <span>ID {cert.credentialId}</span>}
                <span className="text-ink-muted">{cert.date}</span>
              </div>
            </div>
          );

          return (
            <Reveal
              key={cert.title}
              as="li"
              delay={index * 0.04}
              className="border-b border-[var(--border)] last:border-b-0"
            >
              {hasLink ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-colors hover:bg-[var(--surface)]"
                >
                  {Row}
                </a>
              ) : (
                Row
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
