'use client';

import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  description: string;
}

const certifications: Certification[] = [
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford Online (Coursera)",
    date: "2025",
    credentialId: "ML-2025-001",
    url: "#",
    description: "Comprehensive ML covering supervised learning, unsupervised learning, and best practices."
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI (Coursera)",
    date: "2025",
    credentialId: "DL-2025-002",
    url: "#",
    description: "Neural networks, deep learning, structuring ML projects, and AI applications."
  },
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-SAA-C03",
    url: "#",
    description: "Designing distributed systems on AWS - compute, storage, database, and networking."
  },
  {
    title: "Python for Data Science",
    issuer: "IBM (Coursera)",
    date: "2024",
    credentialId: "PY-DS-2024",
    url: "#",
    description: "Python programming, data analysis, visualization, and machine learning basics."
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-400 text-sm mb-4"
          >
            <Award size={16} />
            <span>Certifications</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Certifications & <span className="gradient-text">Credentials</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Professional certifications that validate my skills and knowledge in AI, cloud, and development.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 group border border-white/5 hover:border-amber-500/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Award className="text-amber-400" size={24} />
                </div>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                {cert.title}
              </h3>
              
              <p className="text-slate-400 text-sm mb-3">
                {cert.issuer}
              </p>

              <p className="text-slate-500 text-sm mb-4">
                {cert.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {cert.date}
                </span>
                {cert.credentialId && (
                  <span className="px-2 py-1 bg-white/5 rounded">
                    ID: {cert.credentialId}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}