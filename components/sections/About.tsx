'use client';

import { motion } from 'framer-motion';
import { Sparkles, Code, GraduationCap } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Sparkles,
      title: "Learning by Building",
      description: "I believe in learning by building — not just consuming tutorials — and sharing everything publicly through open source."
    },
    {
      icon: Code,
      title: "System Design Focus",
      description: "My core interest lies in designing systems, not just models — focusing on retrieval, pipelines, and deployment."
    },
    {
      icon: GraduationCap,
      title: "Computer Science",
      description: "Bihar Engineering University (BEU), Patna"
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Computer Science Engineering student focused on building real-world AI systems in Machine Learning and Generative AI.
          </p>
        </motion.div>

        

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                <item.icon className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold mb-4">Currently Seeking</h3>
          <p className="text-slate-300">
            <span className="text-indigo-400 font-semibold">AI/ML/GenAI Internship Opportunities</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
