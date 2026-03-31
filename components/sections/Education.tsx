'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const education = [
  {
    institution: "Bihar Engineering University (BEU)",
    location: "Patna, Bihar",
    degree: "Bachelor of Engineering in Computer Science",
    period: "2022 - 2026",
    status: "Currently Pursuing",
  },
];

const interests = [
  "Machine Learning & evaluation",
  "Generative AI & LLM applications",
  "AI-powered developer tools",
  "Data analysis & backend systems",
];

export default function Education() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Education & <span className="gradient-text">Interests</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="text-indigo-400" />
              Education
            </h3>
            
            {education.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 mb-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-semibold">{edu.institution}</h4>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs">
                    {edu.status}
                  </span>
                </div>
                
                <p className="text-slate-300 mb-3">{edu.degree}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {edu.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-indigo-400">⚡</span>
              Interests
            </h3>
            
            <div className="space-y-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-slate-300">{interest}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
