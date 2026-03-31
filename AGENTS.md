# Agent Guidelines for This Repository

## Project Overview

This is a **Next.js 16 portfolio website** built with TypeScript, Tailwind CSS v4, and Framer Motion. It showcases a personal developer portfolio with dynamic GitHub API integration.

---

## Build / Lint / Test Commands

### Development
```bash
npm run dev          # Start dev server at http://localhost:3000
```

### Production
```bash
npm run build        # Build for production
npm run start        # Start production server
```

### Linting
```bash
npm run lint         # Run ESLint on all files
```

### No Test Framework
This project does **not** have a test framework configured. Do not add test files.

---

## Code Style Guidelines

### TypeScript

- **Always use TypeScript** for new files (.tsx/.ts)
- Prefer `interface` over `type` for object shapes
- Use explicit return types for utility functions
- Never use `any` - use `unknown` if type is truly unknown

### Component Structure

- All components in `components/sections/` must have `'use client'` directive since they use Framer Motion
- Use functional components with arrow function syntax only when specifically needed
- Keep components under 200 lines; extract sub-components if larger

### Imports

**Order (eslint will enforce):**
1. React imports (`import { useState } from 'react'`)
2. Next.js imports
3. External libraries (`framer-motion`, `lucide-react`)
4. Internal imports (`@/components/`, `@/utils/`)
5. Relative imports

**Example:**
```typescript
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from '@/components/SocialIcons';
import { fetchGitHubRepos, type GitHubRepo } from '@/utils/api';
```

- Use `@/` alias for absolute imports from project root
- Custom icons should be in `components/SocialIcons.tsx` (not lucide-react)

### Naming Conventions

- **Components**: PascalCase (`Navbar.tsx`, `GitHubStats.tsx`)
- **Utilities**: camelCase (`api.ts`, `useScrollAnimation.ts`)
- **Constants**: SCREAMING_SNAKE_CASE for config values
- **Files**: kebab-case for non-component files
- **CSS Classes**: Use Tailwind utility classes; custom classes in globals.css use kebab-case

### Tailwind CSS

- Use Tailwind v4 syntax with `@apply` sparingly
- Prefer inline Tailwind classes over custom CSS
- Custom CSS in `app/globals.css` for themes/animations only
- Color tokens: `slate-50` through `slate-900`, `indigo-400`, etc.
- Use `glass` class for glassmorphism (defined in globals.css)

### Framer Motion

- Use `motion.` prefix for animated elements
- Common patterns:
  ```typescript
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
  ```
- Always set `viewport={{ once: true }}` for scroll animations (performance)
- Use `whileHover` and `whileTap` for interactive elements

### Error Handling

- API calls must have try/catch with user-friendly error messages
- Show loading states with skeletons, not spinners
- Never expose internal errors to users
- Example:
  ```typescript
  try {
    const data = await fetchGitHubRepos('username');
    setRepos(data);
  } catch (error) {
    console.error('Error fetching repos:', error);
    setError('Failed to load repositories');
  }
  ```

### File Organization

```
app/
├── globals.css          # Global styles, animations, custom classes
├── layout.tsx           # Root layout with metadata
├── page.tsx             # Main page composing all sections
└── favicon.ico

components/
├── sections/            # Page sections (Hero, About, Skills, etc.)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── FeaturedPosts.tsx
│   └── ...
├── PostCard.tsx         # Reusable post card component
└── SocialIcons.tsx      # Custom SVG icons (GitHub, LinkedIn)

hooks/
└── useScrollAnimation.ts

utils/
├── api.ts               # API utilities for GitHub
└── types.ts             # TypeScript interfaces

public/
└── data/
    └── featuredPosts.json  # Featured posts data (LinkedIn)
```

### Working with External APIs

- GitHub API: Use `@/utils/api.ts` utilities
- API calls should be cached with Next.js `fetch` (already configured with `revalidate`)
- Handle rate limits gracefully
- Mock data for APIs without public access (e.g., LinkedIn) - use `public/data/featuredPosts.json`

### Metadata & SEO

- Update `app/layout.tsx` metadata for SEO
- Include: title, description, keywords, openGraph, twitter card

### GitHub Integration

- Use GitHub username: `himanshu231204`
- Fetch repos sorted by updated date
- Show loading skeletons while fetching
- Filter repos by stars or topics for "featured"

---

## Common Tasks

### Adding a New Section
1. Create `components/sections/NewSection.tsx`
2. Add to `app/page.tsx`
3. Add nav link in `Navbar.tsx`

### Adding a New Skill
- Edit `components/sections/Skills.tsx` - add to appropriate category

### Modifying Featured Projects
- Edit `components/sections/Projects.tsx` - update `featuredProjects` array

### Updating Featured Posts
- Edit `public/data/featuredPosts.json` - update posts array (sorted by date automatically)

---

## Notes

- Lucide-react version 1.7.0 does not include GitHub/LinkedIn icons - use custom SocialIcons.tsx
- Tailwind v4 uses CSS-based configuration (no tailwind.config.js)
- Next.js 16 with App Router
- All animated components are client-side ('use client')
