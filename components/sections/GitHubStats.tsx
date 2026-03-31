'use client';

import { motion } from 'framer-motion';
import { GitFork } from 'lucide-react';
import { Github } from '@/components/SocialIcons';

const GITHUB_USERNAME = 'himanshu231204';

export default function GitHubStats() {
  return (
    <section id="github" className="py-16 relative overflow-hidden bg-[#020617]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0B1120] to-[#020617]" />
      
      {/* Radial glow behind center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.15),transparent_60%)]" />
      
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium mb-4"
          >
            <Github size={12} />
            <span>GitHub Stats</span>
          </motion.div>
          
          <h2 className="text-4xl font-bold tracking-tight">
            Building in <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">public</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Consistency over perfection</p>
        </motion.div>

        

        {/* Streak Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] hover:border-cyan-400/30 transition-all duration-300 mb-4"
        >
          <img 
            src={`https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=tokyonight&hide_border=true&background=0D1117&ring=00D9FF&fire=FF6E00&currStreakLabel=00D9FF`}
            alt="GitHub Streak"
            className="w-full rounded-xl max-h-[180px] object-contain"
          />
        </motion.div>

        {/* Activity Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] hover:border-cyan-400/30 transition-all duration-300 mb-6"
        >
          <img 
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=tokyo-night&hide_border=true&bg_color=0D1117&color=00D9FF&line=00D9FF&point=FF6E00`}
            alt="Activity Graph"
            className="w-full rounded-xl max-h-[200px] object-contain"
          />
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-b from-transparent via-white/20 to-transparent mb-8" />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_20px_rgba(0,217,255,0.2)]"
          >
            <Github size={16} />
            View Profile
          </motion.a>
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_20px_rgba(0,217,255,0.2)]"
          >
            <GitFork size={16} />
            View Repos
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
