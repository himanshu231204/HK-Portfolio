'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  copyText?: string;
  delay?: number;
}

export default function ContactCard({ icon, label, value, href, copyText, delay = 0 }: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
      
      <div className="relative glass rounded-2xl p-6 flex items-center gap-4 hover:bg-white/5 transition-colors">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-slate-500 text-xs mb-1">{label}</p>
          <p className="text-slate-200 font-medium truncate">{value}</p>
        </div>

        {copyText && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-slate-400 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
