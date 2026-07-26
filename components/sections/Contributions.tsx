'use client';

import { motion } from 'framer-motion';
import { ExternalLink, GitPullRequest } from 'lucide-react';
import { Github } from '@/components/SocialIcons';

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
    highlights: ['Built connector infrastructure', 'Improved error handling', 'Preserved workflow state'],
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
    highlights: ['LM Studio adapter', 'CI/CD pipeline fixes', 'Runtime integration'],
  },
  {
    repo: 'himanshu231204/avenx-js',
    url: 'https://github.com/himanshu231204/avenx-js',
    description: 'Compiler documentation',
    highlights: ['Documentation improvements', 'Compiler internals'],
  },
];

export default function Contributions() {
  return (
    <section id="contributions" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Open Source{' '}
            <span className="gradient-text">Contributions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Contributing to projects that shape the future of AI agents and developer tooling.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {contributions.map((item, index) => (
            <motion.div
              key={item.repo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <GitPullRequest className="text-indigo-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-indigo-400 transition-colors">
                      {item.repo}
                    </h3>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Github size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                </motion.a>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-400 group-hover:bg-white/10 transition-colors"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/himanshu231204?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full hover:bg-white/10 transition-colors"
          >
            View All Repositories <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
