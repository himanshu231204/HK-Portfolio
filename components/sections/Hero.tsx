'use client';

import { ArrowRight, Download, Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/SocialIcons';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

/**
 * Proof points, not adjectives. Every number here is already asserted
 * elsewhere in the repo (Context.md / Contributions.tsx) — nothing invented.
 */
const proof = [
  { value: '7,000+', label: 'PyPI downloads', detail: 'run-git' },
  { value: '13+', label: 'Merged PRs', detail: 'openagent-eval' },
  { value: '18+', label: 'Eval metrics', detail: 'RAG + agents' },
  { value: '2022–26', label: 'B.E. CSE', detail: 'BEU Patna' },
];

const socials = [
  { href: 'https://github.com/himanshu231204', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/himanshu231204/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://twitter.com/himanshu231204', label: 'Twitter', Icon: Twitter },
  { href: 'mailto:himanshu231204@gmail.com', label: 'Email', Icon: Mail },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_auto]">
          {/* ---------------------------------------------------------------- */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5">
                <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-[var(--positive)]" />
                <span className="mono-meta text-ink-muted">
                  Open to AI/ML &amp; GenAI internships
                </span>
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="display mt-7 text-5xl font-semibold md:text-7xl">
                Himanshu Kumar
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-lg text-ink-muted md:text-xl">
                AI engineer building{' '}
                <span className="text-ink">agentic systems</span>,{' '}
                <span className="text-ink">LLM infrastructure</span> and{' '}
                <span className="text-ink">developer tools</span>. Founder of{' '}
                <a
                  href="https://github.com/OpenAgentHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[var(--accent)]"
                >
                  OpenAgentHQ
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="prose-muted mt-5 max-w-xl text-[0.95rem]">
                My core interest lies in designing systems, not just models —
                retrieval, pipelines and deployment. I learn by building, and
                ship it in the open.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="#projects" variant="primary" size="lg">
                  View work <ArrowRight size={16} />
                </ButtonLink>
                <ButtonLink href="/resume.pdf" download size="lg">
                  <Download size={16} /> Résumé
                </ButtonLink>
                <ButtonLink href="#contact" variant="ghost" size="lg">
                  Get in touch
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-9 flex items-center gap-1">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="tap-target rounded-lg p-2.5 text-ink-faint transition-colors hover:bg-[var(--surface)] hover:text-ink"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Portrait: a plain framed square. The rotating dashed ring and     */}
          {/* multi-stop gradient blur previously around it read as decoration  */}
          {/* for its own sake.                                                 */}
          <Reveal delay={0.1} className="order-first lg:order-none">
            <div className="relative w-fit">
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/mypic.jpeg"
                  alt="Himanshu Kumar"
                  width={272}
                  height={272}
                  className="h-56 w-56 rounded-xl object-cover md:h-68 md:w-68"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden h-56 w-56 items-center justify-center rounded-xl bg-[var(--bg-subtle)] md:h-68 md:w-68">
                  <span className="text-5xl font-semibold text-ink-faint">HK</span>
                </div>
              </div>

              {/* Wraps rather than colliding when the frame is narrow on mobile. */}
              <div className="mono-meta mt-3 flex flex-wrap justify-between gap-x-4 gap-y-0.5 px-1">
                <span>Patna, Bihar · IN</span>
                <span>@himanshu231204</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Proof strip: the evidence a recruiter scans for, above the fold.    */}
        <Reveal delay={0.3}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] md:mt-20 md:grid-cols-4">
            {proof.map((item) => (
              <div key={item.label} className="bg-[var(--bg)] px-5 py-6">
                <dt className="mono-label">{item.label}</dt>
                <dd className="mt-2.5 text-2xl font-semibold tracking-tight">
                  {item.value}
                </dd>
                <dd className="mono-meta mt-1">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
