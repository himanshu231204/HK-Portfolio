'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { fetchGitHubRepos, fetchGitHubUser, type GitHubRepo, type GitHubUser } from '@/utils/api';

const GITHUB_USERNAME = 'himanshu231204';

/**
 * Muted mid-tone hues, legible against both the light and dark surface tokens.
 * Deliberately not a saturated rainbow — this is a distribution, not a party.
 */
const LANGUAGE_COLORS = ['#7c93ff', '#5ec8c0', '#e0a458', '#c77dbb', '#7fb069', '#8b93a1'];

interface LanguageSlice {
  name: string;
  count: number;
  share: number;
  color: string;
}

function buildLanguageBreakdown(repos: GitHubRepo[]): LanguageSlice[] {
  const counts = new Map<string, number>();
  repos.forEach((repo) => {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  });

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 5);
  const restTotal = sorted.slice(5).reduce((sum, [, count]) => sum + count, 0);
  const entries = restTotal > 0 ? [...top, ['Other', restTotal] as const] : top;

  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  if (total === 0) return [];

  return entries.map(([name, count], i) => ({
    name,
    count,
    share: (count / total) * 100,
    color: LANGUAGE_COLORS[i % LANGUAGE_COLORS.length],
  }));
}

export default function GitHubStats() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchGitHubRepos(GITHUB_USERNAME), fetchGitHubUser(GITHUB_USERNAME)])
      .then(([repoData, userData]) => {
        if (cancelled) return;
        setRepos(repoData);
        setUser(userData);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const languages = useMemo(() => buildLanguageBreakdown(repos), [repos]);

  const totals = useMemo(() => {
    const ownRepos = repos.filter((repo) => repo.visibility !== 'private');
    return {
      repos: user?.public_repos ?? ownRepos.length,
      stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      forks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      followers: user?.followers ?? 0,
    };
  }, [repos, user]);

  // fetchGitHubRepos/User swallow errors and return []/null, so "nothing came
  // back at all" is how an unreachable or rate-limited API surfaces here.
  // Showing four zeroes would read as a real (and unflattering) result.
  const unavailable = !loading && repos.length === 0 && user === null;

  const stats = [
    { label: 'Public repos', value: totals.repos },
    { label: 'Stars earned', value: totals.stars },
    { label: 'Forks', value: totals.forks },
    { label: 'Followers', value: totals.followers },
  ];

  return (
    <Section
      id="github"
      index="04"
      title="Building in public"
      description="Live from the GitHub API — no screenshots, no cached badges."
      action={
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mono-meta link-underline inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
        >
          @{GITHUB_USERNAME} <ArrowUpRight size={13} />
        </a>
      }
    >
      <Reveal>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--bg)] px-5 py-6">
              <dt className="mono-label">{stat.label}</dt>
              <dd className="mt-2.5 text-3xl font-semibold tracking-tight tabular-nums">
                {loading ? (
                  <span className="inline-block h-8 w-14 animate-pulse rounded bg-[var(--surface-hover)] align-middle" />
                ) : unavailable ? (
                  <span className="text-ink-faint">—</span>
                ) : (
                  stat.value.toLocaleString()
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Language distribution ------------------------------------------- */}
      <Reveal delay={0.08}>
        <div className="mt-6 rounded-xl border border-[var(--border)] px-5 py-6 md:px-7">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-sm font-medium">Language distribution</h3>
            <span className="mono-meta">by repository count</span>
          </div>

          {loading ? (
            <div className="mt-5 h-2 animate-pulse rounded-full bg-[var(--surface-hover)]" />
          ) : languages.length === 0 ? (
            <p className="prose-muted mt-4 text-sm">
              GitHub data is unavailable right now — the profile link above still works.
            </p>
          ) : (
            <>
              <div
                className="mt-5 flex h-2 gap-0.5 overflow-hidden rounded-full"
                role="img"
                aria-label={`Language distribution: ${languages
                  .map((l) => `${l.name} ${Math.round(l.share)}%`)
                  .join(', ')}`}
              >
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.share}%`, backgroundColor: lang.color }}
                    title={`${lang.name} — ${lang.count} repos`}
                  />
                ))}
              </div>

              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
                {languages.map((lang) => (
                  <li key={lang.name} className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: lang.color }}
                      aria-hidden
                    />
                    <span className="text-sm">{lang.name}</span>
                    <span className="mono-meta">{Math.round(lang.share)}%</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
