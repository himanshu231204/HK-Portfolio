# Portfolio Project Structure

## Overview

This document describes the file organization for the Next.js 16 portfolio website.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: lucide-react + custom SVG icons

## Directory Structure

```
portfolio-new/
├── app/
│   ├── globals.css          # Global styles, animations, custom classes
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page composing all sections
│   └── favicon.ico

├── components/
│   ├── sections/            # Page sections (each is a full section)
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── GitHubStats.tsx
│   │   ├── Education.tsx
│   │   ├── FeaturedPosts.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── PostCard.tsx         # Reusable post card component
│   ├── ContactCard.tsx      # Reusable contact card
│   └── SocialIcons.tsx      # Custom SVG icons (GitHub, LinkedIn, Twitter)

├── hooks/
│   └── useScrollAnimation.ts

├── utils/
│   ├── api.ts               # GitHub API utilities
│   └── types.ts             # TypeScript interfaces

├── public/
│   ├── data/
│   │   ├── featuredPosts.json   # LinkedIn featured posts
│   │   └── linkedinPosts.json   # LinkedIn posts backup
│   └── window.svg, vercel.svg, etc.

├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── postcss.config.mjs
```

## Section Component Rules

1. **Location**: All sections in `components/sections/`
2. **File naming**: PascalCase, matching component name
3. **Client directive**: All sections use `'use client'` for Framer Motion
4. **Export**: Default export of functional component

## Data Files

### featuredPosts.json

Located at `public/data/featuredPosts.json`. Structure:

```json
{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "date": "YYYY-MM-DD",
      "url": "string",
      "platform": "linkedin"
    }
  ]
}
```

### linkedinPosts.json

Located at `public/data/linkedinPosts.json`. Backup data source.

## Adding New Content

### Adding a New Section

1. Create `components/sections/NewSection.tsx` with `'use client'`
2. Import and add to `app/page.tsx`
3. Add navigation link in `Navbar.tsx`

### Adding New Skills

Edit `components/sections/Skills.tsx` - add to appropriate category array.

### Modifying Projects

Edit `components/sections/Projects.tsx` - update `featuredProjects` array.

### Updating Featured Posts

Edit `public/data/featuredPosts.json` - add new post to posts array.
