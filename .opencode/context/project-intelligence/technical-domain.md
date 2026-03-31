<!-- Context: project-intelligence/technical | Priority: critical | Version: 1.2 | Updated: 2026-04-01 -->

# Technical Domain

> Portfolio website tech stack, architecture, and patterns.

## Quick Reference

- **Purpose**: Understand how the portfolio works technically
- **Update When**: New features, refactoring, tech stack changes
- **Audience**: Developers, AI agents

## Primary Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Framework | Next.js | 16.x | App Router, SSR, static export |
| Language | TypeScript | 5.x | Type safety, better DX |
| Styling | Tailwind CSS | v4 | Utility-first, no runtime |
| Animations | Framer Motion | 11.x | Declarative animations, 'use client' |
| Icons | lucide-react + custom SVG | 1.7.0 | Lightweight, GitHub/LinkedIn custom |
| Email | EmailJS | 4.x | Client-side email without backend |

## Architecture Pattern

```
Type: Static/Serverless
Pattern: Next.js App Router with static generation for performance
```

### Why This Architecture?

Portfolio is a static showcase site - no database, no auth, no dynamic backend. Next.js App Router provides SSR for SEO and client-side hydration for animations. Static export possible for CDNs.

## Project Structure

```
portfolio-new/
├── app/                      # Next.js app router
│   ├── articles/[slug]/      # Dynamic article pages
│   ├── layout.tsx            # Root layout with ThemeProvider
│   └── page.tsx              # Main page
├── components/               # Reusable components
│   ├── ThemeProvider.tsx     # Dark/light theme context
│   ├── ThemeToggle.tsx       # Theme toggle button
│   ├── sections/             # Page sections
│   └── *.tsx                 # Various components
├── hooks/                    # Custom hooks
├── utils/                    # Utilities (api.ts, types.ts)
└── public/
    ├── data/                 # JSON data
    └── articles/             # Markdown articles
```

## Key Technical Decisions

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Tailwind CSS v4 | CSS-based config, no tailwind.config.js | Simpler setup |
| Framer Motion | Declarative animations, 'use client' required | Smooth scroll animations |
| JSON for posts | No backend, static data | Easy updates via file edit |
| Custom SVG icons | lucide-react missing GitHub/LinkedIn | Consistent icon style |
| ThemeProvider | Dark/light mode with localStorage | User preference persists |
| EmailJS | Client-side email without backend | No server needed |

## New Features (v1.2)

### 1. Project Filtering by Technology
- Clickable tech tags + dropdown filter
- OR logic: shows repos with ANY selected tech
- Filters both language and topics from GitHub API
- Implementation: `components/sections/Projects.tsx`

### 2. Article Functionality
- Markdown files in `public/articles/`
- Article list section on homepage
- Individual article pages at `/articles/[slug]`
- Frontmatter: title, excerpt, date, tags
- Implementation: `components/sections/Articles.tsx`, `app/articles/`

### 3. Dark/Light Theme Toggle
- Toggle button in navbar
- System preference auto-detect on first visit
- Persists choice in localStorage
- CSS variables for light theme in globals.css
- Implementation: `components/ThemeProvider.tsx`, `components/ThemeToggle.tsx`

### 4. Contact Form with EmailJS
- Name, Email, Subject, Message fields
- Client-side validation
- Loading/success/error states
- Requires EmailJS credentials in Contact.tsx
- Implementation: `components/sections/Contact.tsx`

## Integration Points

| System | Purpose | Protocol | Direction |
|--------|---------|----------|-----------|
| GitHub API | Fetch public repos, stats | REST | Outbound |
| featuredPosts.json | LinkedIn posts backup | JSON/Static | Internal |
| Articles index | Article metadata | JSON/Static | Internal |
| EmailJS | Contact form email | JS SDK | Outbound |

## Development Environment

```
Setup: npm install
Requirements: Node.js 18+
Local Dev: npm run dev (http://localhost:3000)
Build: npm run build
Lint: npm run lint
Type Check: npx tsc --noEmit
Testing: None (per project guidelines)
```

## Deployment

```
Environment: Production (Vercel recommended)
Platform: Vercel (zero-config for Next.js)
CI/CD: GitHub Actions (if configured)
```

## Onboarding Checklist

- [x] Know the primary tech stack (Next.js 16, TypeScript, Tailwind v4, Framer Motion)
- [x] Understand architecture pattern (static/SSR portfolio)
- [x] Know key directories (components/sections/, utils/, public/)
- [x] Understand GitHub API integration and JSON data sources
- [x] Know new features: filtering, articles, theme, EmailJS
- [x] Be able to set up local environment (npm install, npm run dev)
- [x] Know lint/type check commands

## 📂 Codebase References

**Main Page**: `app/page.tsx` - Composes all sections including Articles
**Theme**: `components/ThemeProvider.tsx` - Dark/light theme context
**Contact**: `components/sections/Contact.tsx` - EmailJS form integration
**Articles**: `components/sections/Articles.tsx` - Article list
**Projects**: `components/sections/Projects.tsx` - Tech filtering

## Related Files

- `portfolio/domain/project-structure.md` - Detailed directory structure
- `portfolio/domain/github-integration.md` - GitHub API patterns
- `portfolio/standards/section-templates.md` - Section creation patterns
- `portfolio/standards/animation-standards.md` - Framer Motion patterns