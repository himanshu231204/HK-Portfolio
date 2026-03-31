'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Sparkles, Terminal, Workflow, X } from 'lucide-react';
import { Github } from '@/components/SocialIcons';
import { fetchGitHubRepos, formatDate, type GitHubRepo } from '@/utils/api';

const featuredProjects = [
  {
    title: "AI Commit",
    description: "Generates intelligent Git commit messages using local LLMs (offline, privacy-first CLI Tool)",
    icon: Terminal,
    gradient: "from-green-500 to-emerald-600",
    github: "https://github.com/himanshu231204/ai-commit",
    tags: ["CLI", "LLM", "Privacy"],
    featured: true,
  },
  {
    title: "RAG-based AI Application",
    description: "Document Q&A system with explainable retrieval",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-600",
    github: "#",
    tags: ["RAG", "NLP", "LLM"],
    featured: true,
  },
  {
    title: "AutoML Studio",
    description: "End-to-end ML platform that automates EDA, preprocessing, training, and evaluation",
    icon: Workflow,
    gradient: "from-blue-500 to-cyan-600",
    github: "#",
    tags: ["AutoML", "ML", "Platform"],
    featured: true,
  },
];

// Extract all unique tech tags from projects
const allTechTags = Array.from(
  new Set([
    ...featuredProjects.flatMap(p => p.tags),
  ])
).sort();

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
    } catch (err) {
      setError('Failed to load repositories');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: 'featured' | 'all') => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      loadRepos();
    }
  };

  // Get all tech tags from GitHub repos
  const repoTechTags = useMemo(() => {
    const tags = new Set<string>();
    repos.forEach(repo => {
      if (repo.language) tags.add(repo.language);
      if (repo.topics) repo.topics.forEach(t => tags.add(t));
    });
    return Array.from(tags).sort();
  }, [repos]);

  // Combine all available tech tags
  const availableTechTags = useMemo(() => {
    const tags = new Set([...allTechTags, ...repoTechTags]);
    return Array.from(tags).sort();
  }, [repoTechTags]);

  // Filter repos based on selected technologies (OR logic)
  const filteredRepos = useMemo(() => {
    let result = filter === 'featured' 
      ? repos.filter(repo => repo.stargazers_count > 0 || repo.topics?.includes('featured'))
      : repos;

    if (selectedTechs.length > 0) {
      result = result.filter(repo => {
        const repoTechs: string[] = [];
        if (repo.language) repoTechs.push(repo.language);
        if (repo.topics) repoTechs.push(...repo.topics);
        
        // OR logic: show if ANY selected tech matches
        return selectedTechs.some(tech => 
          repoTechs.map(t => t.toLowerCase()).includes(tech.toLowerCase())
        );
      });
    }

    return result;
  }, [repos, filter, selectedTechs]);

  const toggleTechFilter = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedTechs([]);
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              Featured{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]"
            >
              Projects
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Real-world AI systems and tools I&apos;ve built to solve actual problems.
          </motion.p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]"
              onClick={() => window.open(project.github, '_blank')}
            >
              <div className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <project.icon size={48} className="text-white/80 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Github size={18} className="text-slate-500" />
                  </motion.div>
                </div>
                
                <p className="text-slate-400 text-sm mb-4 group-hover:text-slate-300 transition-colors">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/5 rounded-md text-xs text-slate-400 group-hover:bg-white/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Repositories with Tech Filtering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">GitHub Repositories</h3>
              <p className="text-slate-400">Explore all my open source projects</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Featured/All Toggle */}
              <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => handleFilterChange('featured')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                    filter === 'featured'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                    filter === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
              </div>

              {/* Tech Filter Toggle */}
              <button
                onClick={() => setShowTagFilter(!showTagFilter)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  showTagFilter || selectedTechs.length > 0
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span>Tech</span>
                {selectedTechs.length > 0 && (
                  <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">
                    {selectedTechs.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Tech Filter Tags */}
          {(showTagFilter || selectedTechs.length > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 pb-6 border-b border-white/10"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-slate-500 mr-2">Filter by tech:</span>
                {availableTechTags.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleTechFilter(tech)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      selectedTechs.includes(tech)
                        ? 'bg-cyan-600 text-white'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
                {selectedTechs.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <X size={12} />
                    Clear
                  </button>
                )}
              </div>
              {selectedTechs.length > 0 && (
                <p className="text-xs text-slate-500 mt-2">
                  Showing {filteredRepos.length} repos with: {selectedTechs.join(' OR ')}
                </p>
              )}
            </motion.div>
          )}

          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass rounded-xl p-4 animate-pulse">
                  <div className="h-5 bg-white/10 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-white/10 rounded w-full mb-2" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {filteredRepos.length === 0 && selectedTechs.length > 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-400 mb-4">No repositories match the selected filters</p>
                  <button
                    onClick={clearFilters}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRepos.slice(0, 12).map((repo, index) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 200, damping: 15 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.15)]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm group-hover:text-cyan-400 transition-colors truncate">
                          {repo.name}
                        </h4>
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        </motion.div>
                      </div>
                      
                      <p className="text-slate-400 text-xs mb-3 line-clamp-2 group-hover:text-slate-300 transition-colors">
                        {repo.description || 'No description'}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {repo.language && (
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">
                            {repo.language}
                          </span>
                        )}
                        {repo.topics?.slice(0, 2).map(topic => (
                          <span key={topic} className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                        <motion.span 
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Star size={12} className="text-yellow-500" />
                          {repo.stargazers_count}
                        </motion.span>
                        <motion.span 
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <GitFork size={12} />
                          {repo.forks_count}
                        </motion.span>
                        <span className="ml-auto text-slate-500">{formatDate(repo.updated_at)}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}