# Portfolio Section Templates

## Overview

This document provides templates for creating new portfolio sections following established patterns.

## Base Section Template

```typescript
'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  // Add props if needed
}

export default function SectionName({}: SectionProps) {
  return (
    <section id="section-id" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section content */}
        </motion.div>
      </div>
    </section>
  );
}
```

## Content Section Template

For sections with text content (About, Education):

```typescript
'use client';

import { motion } from 'framer-motion';

export default function ContentSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="section-id" className="min-h-screen py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8"
        >
          Section Title
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            {/* Content item 1 */}
          </motion.div>
          <motion.div variants={itemVariants}>
            {/* Content item 2 */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

## Grid Section Template

For sections with cards/items (Skills, Projects):

```typescript
'use client';

import { motion } from 'framer-motion';

const items = [
  { name: 'Item 1', description: 'Description' },
  { name: 'Item 2', description: 'Description' },
];

export default function GridSection() {
  return (
    <section id="section-id" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Section Title
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 glass rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Stats Section Template

For statistics display (GitHub Stats):

```typescript
'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Stat 1', value: 100 },
  { label: 'Stat 2', value: 50 },
];

export default function StatsSection() {
  return (
    <section id="section-id" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-indigo-400">
                {stat.value}+
              </div>
              <div className="text-slate-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Navbar Link Pattern

When adding a new section, always include a navbar link:

```typescript
// In Navbar.tsx
<motion.a
  href="#section-id"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="text-slate-300 hover:text-white transition-colors"
>
  Link Text
</motion.a>
```

## Section ID Mapping

| Section | ID | File |
|---------|-----|------|
| Hero | hero | Hero.tsx |
| About | about | About.tsx |
| Skills | skills | Skills.tsx |
| Projects | projects | Projects.tsx |
| GitHub Stats | github | GitHubStats.tsx |
| Education | education | Education.tsx |
| Featured Posts | posts | FeaturedPosts.tsx |
| Contact | contact | Contact.tsx |
| Footer | footer | Footer.tsx |
