'use client';

import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

/**
 * Presented as a technical spec sheet rather than icon pills. `primary` marks
 * the tools reached for first — a flat wall of equal-weight badges tells a
 * reader nothing about depth.
 */
const stack = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', primary: true },
      { name: 'C++' },
      { name: 'TypeScript' },
      { name: 'SQL' },
    ],
  },
  {
    group: 'LLM & agents',
    items: [
      { name: 'LangChain', primary: true },
      { name: 'LangGraph', primary: true },
      { name: 'MCP', primary: true },
      { name: 'Groq' },
      { name: 'Gemini' },
      { name: 'Ollama' },
    ],
  },
  {
    group: 'Retrieval & ML',
    items: [
      { name: 'FAISS', primary: true },
      { name: 'ChromaDB' },
      { name: 'Sentence Transformers', primary: true },
      { name: 'Scikit-learn' },
      { name: 'RAG evaluation' },
    ],
  },
  {
    group: 'Backend & serving',
    items: [
      { name: 'FastAPI', primary: true },
      { name: 'Server-Sent Events' },
      { name: 'Celery' },
      { name: 'Redis' },
      { name: 'Streamlit' },
    ],
  },
  {
    group: 'Infrastructure',
    items: [
      { name: 'Docker', primary: true },
      { name: 'GitHub Actions', primary: true },
      { name: 'Git' },
      { name: 'Vercel' },
    ],
  },
];

export default function Skills() {
  return (
    <Section
      id="stack"
      index="03"
      title="Stack"
      description="Tools I have shipped something real with. Highlighted entries are the ones I reach for first."
      action={
        <div className="mono-meta flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Primary
        </div>
      }
    >
      <div className="overflow-hidden rounded-xl border border-[var(--border)]">
        {stack.map((row, i) => (
          <Reveal
            key={row.group}
            delay={i * 0.05}
            className="border-b border-[var(--border)] last:border-b-0"
          >
            <div className="grid gap-4 px-5 py-6 md:grid-cols-[180px_minmax(0,1fr)] md:items-baseline md:gap-8 md:px-7">
              <div className="flex items-baseline gap-3">
                <h3 className="text-sm font-medium">{row.group}</h3>
                <span className="mono-meta">{String(row.items.length).padStart(2, '0')}</span>
              </div>

              <ul className="flex flex-wrap gap-2">
                {row.items.map((item) => (
                  <li key={item.name} className={item.primary ? 'tag tag-accent' : 'tag'}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
