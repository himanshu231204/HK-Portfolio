'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Server, 
  Wrench, 
  Code2, 
  Database, 
  Terminal, 
  GitBranch,
  FlaskConical,
  Boxes,
  Workflow,
  Container
} from 'lucide-react';

const skillCategories = [
  {
    title: "AI/ML",
    icon: Brain,
    skills: [
      { name: "Python", icon: Code2 },
      { name: "LangChain", icon: Boxes },
      { name: "FAISS", icon: Database },
      { name: "Scikit-learn", icon: Brain },
      { name: "Generative AI", icon: FlaskConical },
      { name: "LLM Applications", icon: Workflow },
    ]
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "FastAPI", icon: Server },
      { name: "Streamlit", icon: Terminal },
      { name: "C++", icon: Code2 },
      { name: "Docker", icon: Container },
    ]
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: [
      { name: "GitHub Actions", icon: GitBranch },
      { name: "Docker", icon: Container },
      { name: "Git", icon: GitBranch },
      { name: "VS Code", icon: Code2 },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A curated collection of technologies I work with to build intelligent systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <category.icon className="text-indigo-400" size={20} />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: catIndex * 0.1 + skillIndex * 0.05 
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-white/5 rounded-lg text-sm flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default"
                  >
                    <skill.icon size={14} className="text-indigo-400" />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
