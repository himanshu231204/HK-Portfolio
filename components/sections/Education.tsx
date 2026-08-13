'use client';

import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

const education = [
  {
    institution: 'Bihar Engineering University (BEU)',
    degree: 'B.E. Computer Science & Engineering',
    location: 'Patna, Bihar',
    period: '2022 — 2026',
    status: 'In progress',
  },
];

const interests = [
  'Machine learning & evaluation',
  'Generative AI & LLM applications',
  'AI-powered developer tools',
  'Data analysis & backend systems',
];

export default function Education() {
  return (
    <Section
      id="education"
      index="08"
      title="Background"
      description="Where the formal training sits alongside what I keep pulling at on my own time."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
        <Reveal>
          <div className="h-full bg-[var(--bg)] p-6 md:p-7">
            <h3 className="mono-label">Education</h3>

            {education.map((edu) => (
              <div key={edu.institution} className="mt-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h4 className="font-medium">{edu.institution}</h4>
                  <span className="tag tag-accent">{edu.status}</span>
                </div>
                <p className="prose-muted mt-2 text-sm">{edu.degree}</p>
                <div className="mono-meta mt-4 flex flex-wrap gap-x-5 gap-y-1">
                  <span>{edu.period}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="h-full bg-[var(--bg)] p-6 md:p-7">
            <h3 className="mono-label">Where my attention goes</h3>

            <ul className="mt-5 space-y-3">
              {interests.map((interest) => (
                <li key={interest} className="flex items-baseline gap-3 text-sm">
                  <span
                    className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-[var(--accent)]"
                    aria-hidden
                  />
                  <span className="text-ink-muted">{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
