'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Download } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/SocialIcons';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-gradient" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-indigo-400 font-mono text-sm mb-4"
            >
              Hello, I&apos;m
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              Himanshu <span className="gradient-text">Kumar</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 mb-2"
            >
              AI/ML & GenAI Engineer | Open Source Builder
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate-400 mb-8"
            >
              Building Tools That Solve Real Problems
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center gap-2 font-medium transition-colors"
              >
                View Projects <ArrowRight size={18} />
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 glass rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                Contact Me
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 glass rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Download size={18} /> Resume
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6 mt-8 justify-center md:justify-start"
            >
              <a
                href="https://github.com/himanshu231204"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/himanshu231204/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com/himanshu231204"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="mailto:himanshu231204@gmail.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail size={24} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden gradient-border glow-effect">
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-8xl font-bold text-white/20">HK</span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/30"
              style={{ padding: '10px' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
