'use client';

import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

interface Contribution {
  repo: string;
  url: string;
  description: string;
  highlights: string[];
}

const contributions: Contribution[] = [
  {
    repo: 'langchain-ai/openwiki',
    url: 'https://github.com/langchain-ai/openwiki',
    description: 'Connector features, error handling, workflow preservation',
    highlights: ['Connector infrastructure', 'Error handling', 'Workflow state'],
  },
  {
    repo: 'OpenAgentHQ/openagent-eval',
    url: 'https://github.com/OpenAgentHQ/openagent-eval',
    description: '13+ merged PRs — review workflows, tests, releases',
    highlights: ['13+ merged PRs', 'Review workflows', 'Test coverage', 'Release automation'],
  },
  {
    repo: 'OpenAgentHQ/modeldock',
    url: 'https://github.com/OpenAgentHQ/modeldock',
    description: 'LM Studio runtime adapter, CI/CD fixes',
    highlights: ['LM Studio adapter', 'CI/CD pipeline', 'Runtime integration'],
  },
  {
    repo: 'himanshu231204/avenx-js',
    url: 'https://github.com/himanshu231204/avenx-js',
    description: 'Compiler documentation',
    highlights: ['Documentation', 'Compiler internals'],
  },
];

export default function Contributions() {
  return (
    <Section
      id="contributions"
      index="02"
      title="Open source"
      description="Work merged into other people's codebases — where the review bar is set by someone else."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
        {contributions.map((item, index) => {
          const [owner, name] = item.repo.split('/');
          return (
            <Reveal key={item.repo} delay={index * 0.05}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--surface)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-sm">
                    <span className="text-ink-faint">{owner}/</span>
                    <span className="transition-colors group-hover:text-[var(--accent)]">
                      {name}
                    </span>
                  </h3>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-ink-faint transition-colors group-hover:text-[var(--accent)]"
                  />
                </div>

                <p className="prose-muted mt-2.5 text-sm">{item.description}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="tag">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
