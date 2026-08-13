'use client';

import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

const focusAreas = [
  {
    title: 'Retrieval systems',
    body: 'RAG pipelines end to end — chunking, embeddings, vector search and the evaluation harness that tells you whether any of it actually improved.',
  },
  {
    title: 'Agentic infrastructure',
    body: 'LangGraph workflows and MCP servers: the protocol plumbing that lets models call real tools reliably rather than in a demo.',
  },
  {
    title: 'Developer tooling',
    body: 'CLIs that live in a terminal and get used daily — local-first, offline-capable, and fast enough that nobody reaches for the old command.',
  },
];

export default function About() {
  return (
    <Section
      id="about"
      index="05"
      title="About"
      description="CS engineering student at BEU Patna and AI engineer. I build in the open and treat every project as a system, not a notebook."
      className="border-y border-[var(--border)] bg-[var(--bg-subtle)]"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* Narrative */}
        <Reveal className="space-y-5">
          <p className="text-lg leading-relaxed text-ink">
            I started where most people do — tutorials. What changed things was
            shipping: putting a CLI on PyPI, watching strangers install it, and
            discovering how much of the work is everything around the model.
          </p>
          <p className="prose-muted">
            That is the throughline of everything here. RAGNOVA taught me that a
            retrieval pipeline is only as good as its evaluation, which became{' '}
            <span className="text-ink">openagent-eval</span>. Wanting local,
            private commit messages became{' '}
            <span className="text-ink">run-git</span> and{' '}
            <span className="text-ink">AI Commit</span>. Wanting agents to reach
            live information became{' '}
            <span className="text-ink">mcp-web-search</span>.
          </p>
          <p className="prose-muted">
            I run <span className="text-ink">OpenAgentHQ</span> as the home for
            that work — agentic systems, LLM infrastructure and developer
            tooling, all public, all reviewable. I am currently looking for an
            AI/ML or GenAI internship where the problems are real and the
            feedback loop is short.
          </p>
        </Reveal>

        {/* Focus areas */}
        <div className="space-y-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]">
          {focusAreas.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.06}>
              <div className="bg-[var(--bg)] px-5 py-6">
                <h3 className="text-sm font-medium">{area.title}</h3>
                <p className="prose-muted mt-2 text-sm">{area.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
