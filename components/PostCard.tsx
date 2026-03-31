'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  link: string;
  index: number;
}

export default function PostCard({ title, description, date, link, index }: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Gradient Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
      
      <div className="relative glass rounded-2xl p-6 h-full flex flex-col">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4">
          <span className="text-2xl">✨</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
          <Calendar size={14} />
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* View Post Button */}
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium text-sm transition-colors"
        >
          View Post <ExternalLink size={16} />
        </motion.a>
      </div>
    </motion.article>
  );
}
