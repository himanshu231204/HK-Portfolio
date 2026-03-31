'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/SocialIcons';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Articles', href: '#articles' },
  { name: 'GitHub', href: '#github' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          HK
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm text-slate-300 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <motion.a
            href="https://github.com/himanshu231204"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/himanshu231204/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            href="https://twitter.com/himanshu231204"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Twitter size={20} />
          </motion.a>
          <motion.a
            href="mailto:himanshu231204@gmail.com"
            whileHover={{ scale: 1.1 }}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Mail size={20} />
          </motion.a>
        </div>

        <button
          className="md:hidden text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass mt-2 mx-4 rounded-xl p-6"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800">
              <ThemeToggle />
              <a
                href="https://github.com/himanshu231204"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/himanshu231204/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com/himanshu231204"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:himanshu231204@gmail.com"
                className="text-slate-400 hover:text-white"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
