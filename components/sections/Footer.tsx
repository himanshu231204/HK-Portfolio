'use client';

import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-bold gradient-text">HK</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 text-sm">AI/ML & GenAI Engineer</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <a
              href="https://github.com/himanshu231204"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/himanshu231204/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/himanshu231204"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="mailto:himanshu231204@gmail.com"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Mail size={20} />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm flex items-center gap-1"
          >
            Made with <Heart size={14} className="text-red-500" /> by Himanshu Kumar
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 pt-8 border-t border-slate-800"
        >
          <p className="text-slate-500 text-sm">
            © {currentYear} Himanshu Kumar. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
