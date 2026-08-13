'use client';

import { useState, useMemo } from 'react';
import { ArrowUpRight, GitFork, Star, X } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import GridFillers from '@/components/ui/GridFillers';
import { fetchGitHubRepos, formatDate, type GitHubRepo } from '@/utils/api';
import { type FeaturedProject } from '@/utils/types';
import featuredProjectsData from '@/public/data/featuredProjects.json';

const featuredProjects: FeaturedProject[] = featuredProjectsData.projects;

/** "https://github.com/owner/repo" -> "owner/repo" */
function repoPath(url: string) {
  return url.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
}

const allTechTags = Array.from(new Set(featuredProjects.flatMap((p) => p.tags))).sort();

export default function Projects() {
  const [filter, setFilter] = useState<'featured' | 'all'>('featured');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTagFilter, setShowTagFilter] = useState(false);

  const loadRepos = async () => {
    if (repos.length > 0) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubRepos('himanshu231204');
      setRepos(data);
    } catch {
      setError('Could not reach the GitHub API. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: 'featured' | 'all') => {
    setFilter(newFilter);
    if (newFilter === 'all') loadRepos();
  };

  const repoTechTags = useMemo(() => {
    const tags = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) tags.add(repo.language);
      repo.topics?.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort();
  }, [repos]);

  const availableTechTags = useMemo(
    () => Array.from(new Set([...allTechTags, ...repoTechTags])).sort(),
    [repoTechTags]
  );

  const filteredRepos = useMemo(() => {
    let result =
      filter === 'featured'
        ? repos.filter((repo) => repo.stargazers_count > 0 || repo.topics?.includes('featured'))
        : repos;

    if (selectedTechs.length > 0) {
      const wanted = selectedTechs.map((t) => t.toLowerCase());
      result = result.filter((repo) => {
        const repoTechs = [repo.language, ...(repo.topics ?? [])]
          .filter((t): t is string => Boolean(t))
          .map((t) => t.toLowerCase());
        return wanted.some((tech) => repoTechs.includes(tech));
      });
    }

    return result;
  }, [repos, filter, selectedTechs]);

  const toggleTechFilter = (tech: string) =>
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );

  return (
    <Section
      id="projects"
      index="01"
      title="Selected work"
      description="Systems I built end to end — retrieval pipelines, evaluation tooling and CLIs that people install and use."
      action={
        <a
          href="https://github.com/himanshu231204?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="mono-meta link-underline inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
        >
          All repositories <ArrowUpRight size={13} />
        </a>
      }
    >
      {/* ------------------------------------------------------------------ */}
      {/* Featured — numbered rows, so the eye reads them in order instead of */}
      {/* bouncing across seven identically-weighted gradient tiles.          */}
      <ol className="overflow-hidden rounded-xl border border-[var(--border)]">
        {featuredProjects.map((project, index) => (
          <Reveal
            key={project.title}
            as="li"
            delay={index * 0.04}
            className="border-b border-[var(--border)] last:border-b-0"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group block px-5 py-6 transition-colors hover:bg-[var(--surface)] md:px-7"
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-start md:gap-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="mono-meta">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="font-medium transition-colors group-hover:text-[var(--accent)]">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={14}
                      className="text-ink-faint transition-colors group-hover:text-[var(--accent)]"
                    />
                  </div>
                  <p className="prose-muted mt-2.5 max-w-xl text-sm">{project.description}</p>
                  <p className="mono-meta mt-3">{repoPath(project.github)}</p>
                </div>

                <ul className="flex flex-wrap gap-2 md:justify-end">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </Reveal>
        ))}
      </ol>

      {/* ------------------------------------------------------------------ */}
      {/* Live repository browser                                             */}
      <Reveal>
        <div className="mt-16">
          <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-lg font-medium">Repositories</h3>
              <p className="prose-muted mt-1.5 text-sm">
                Pulled live from the GitHub API.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-[var(--border)] p-0.5">
                {(['featured', 'all'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    aria-pressed={filter === option}
                    className={`rounded-md px-3 py-1.5 text-xs capitalize transition-colors ${
                      filter === option
                        ? 'bg-[var(--surface)] text-ink'
                        : 'text-ink-faint hover:text-ink'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowTagFilter((open) => !open)}
                aria-expanded={showTagFilter}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                  showTagFilter || selectedTechs.length > 0
                    ? 'border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-ink-faint hover:text-ink'
                }`}
              >
                Filter by tech
                {selectedTechs.length > 0 && (
                  <span className="font-mono">{selectedTechs.length}</span>
                )}
              </button>
            </div>
          </div>

          {(showTagFilter || selectedTechs.length > 0) && (
            <div className="border-b border-[var(--border)] py-5">
              <div className="flex flex-wrap items-center gap-1.5">
                {availableTechTags.map((tech) => {
                  const isSelected = selectedTechs.includes(tech);
                  return (
                    <button
                      key={tech}
                      onClick={() => toggleTechFilter(tech)}
                      aria-pressed={isSelected}
                      className={isSelected ? 'tag tag-accent' : 'tag hover:text-ink'}
                    >
                      {tech}
                    </button>
                  );
                })}
                {selectedTechs.length > 0 && (
                  <button
                    onClick={() => setSelectedTechs([])}
                    className="mono-meta inline-flex items-center gap-1 px-2 py-1 hover:text-ink"
                  >
                    <X size={11} /> Clear
                  </button>
                )}
              </div>
              {selectedTechs.length > 0 && (
                <p className="mono-meta mt-3">
                  {filteredRepos.length} matching {selectedTechs.join(' · ')}
                </p>
              )}
            </div>
          )}

          {loading && (
            <div className="grid gap-px bg-[var(--border)] md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-[var(--bg)] p-5">
                  <div className="h-4 w-2/3 rounded bg-[var(--surface-hover)]" />
                  <div className="mt-3 h-3 w-full rounded bg-[var(--surface-hover)]" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-[var(--surface-hover)]" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="py-10 text-center text-sm text-ink-muted">{error}</p>
          )}

          {!loading && !error && filteredRepos.length === 0 && (
            <div className="py-12 text-center">
              {selectedTechs.length > 0 ? (
                <>
                  <p className="text-sm text-ink-muted">No repositories match those filters.</p>
                  <button
                    onClick={() => setSelectedTechs([])}
                    className="mono-meta link-underline mt-3 text-[var(--accent)]"
                  >
                    Clear filters
                  </button>
                </>
              ) : (
                // fetchGitHubRepos swallows failures and returns [], so an empty
                // list here means either a rate limit or no matching repos.
                <p className="text-sm text-ink-muted">
                  Repositories are not loading right now —{' '}
                  <a
                    href="https://github.com/himanshu231204?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[var(--accent)]"
                  >
                    browse them on GitHub
                  </a>
                  .
                </p>
              )}
            </div>
          )}

          {!loading && !error && filteredRepos.length > 0 && (
            <div className="grid gap-px bg-[var(--border)] md:grid-cols-2 lg:grid-cols-3">
              {filteredRepos.slice(0, 12).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-[var(--bg)] p-5 transition-colors hover:bg-[var(--surface)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="truncate font-mono text-sm transition-colors group-hover:text-[var(--accent)]">
                      {repo.name}
                    </h4>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-ink-faint transition-colors group-hover:text-[var(--accent)]"
                    />
                  </div>

                  <p className="prose-muted mt-2 line-clamp-2 flex-1 text-xs">
                    {repo.description || 'No description'}
                  </p>

                  <div className="mono-meta mt-4 flex items-center gap-3">
                    {repo.language && <span className="text-ink-muted">{repo.language}</span>}
                    <span className="inline-flex items-center gap-1">
                      <Star size={11} /> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={11} /> {repo.forks_count}
                    </span>
                    <span className="ml-auto">{formatDate(repo.updated_at)}</span>
                  </div>
                </a>
              ))}
              <GridFillers count={Math.min(filteredRepos.length, 12)} />
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
