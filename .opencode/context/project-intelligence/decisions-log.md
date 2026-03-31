<!-- Context: project-intelligence/decisions | Priority: high | Version: 1.2 | Updated: 2026-04-01 -->

# Decisions Log

> Major architectural and technical decisions with context.

## Quick Reference

- **Purpose**: Document decisions for future maintainers
- **Status**: Decided | Pending | Deprecated

---

## 1. Next.js 16 with App Router

**Date**: 2025-01 | **Status**: Decided

**Context**: Need modern framework with SEO, fast load times.

**Decision**: Use Next.js 16 App Router (not Pages Router).

**Rationale**: App Router = current recommendation, server components, built-in SEO, zero-config Vercel deploy.

**Alternatives**: React+Vite (no SSR), Gatsby (overkill), Plain React (time waste).

---

## 2. Tailwind CSS v4

**Date**: 2025-01 | **Status**: Decided

**Context**: Utility-first styling that's easy to maintain.

**Decision**: Use Tailwind CSS v4 with CSS-based config.

**Rationale**: Latest version, no tailwind.config.js, smaller bundle.

**Alternatives**: CSS Modules (verbose), Styled Components (runtime), Plain CSS (inconsistent).

---

## 3. Framer Motion for Animations

**Date**: 2025-01 | **Status**: Decided

**Context**: Portfolio needs smooth scroll animations.

**Decision**: Framer Motion with 'use client' on all animated components.

**Rationale**: Declarative API, good performance, popular in React.

**Alternatives**: CSS (limited), GSAP (large), React Spring (less popular).

---

## 4. JSON Files for Data (Not Database)

**Date**: 2025-01 | **Status**: Decided

**Context**: Store posts, projects, skills without DB complexity.

**Decision**: Static JSON in `public/data/`.

**Rationale**: No backend, easy manual edit, no costs, static export possible.

**Alternatives**: Headless CMS (overkill), Firebase (vendor lock), Markdown (parsing overhead).

---

## 5. Custom SVG Icons

**Date**: 2025-01 | **Status**: Decided

**Context**: lucide-react v1.7.0 missing GitHub/LinkedIn/Twitter.

**Decision**: Custom SVG in `components/SocialIcons.tsx`.

**Rationale**: Match portfolio style, single file, easy to style with Tailwind.

**Alternatives**: react-icons (larger), Font Awesome (old), Inline SVG (messy).

---

## 6. No Test Framework

**Date**: 2025-01 | **Status**: Decided

**Context**: Project guidelines say no tests.

**Decision**: Skip testing for this static portfolio.

**Rationale**: Low risk, simple components, visual testing enough, per AGENTS.md.

---

## 7. Project Tech Filtering (OR Logic)

**Date**: 2026-04 | **Status**: Decided

**Context**: Users want to filter GitHub repos by technology.

**Decision**: Clickable tech tags + dropdown, OR logic (any selected tech matches).

**Rationale**: OR is more useful - users want "show me anything with React OR Node" rather than requiring both.

**Alternatives**: AND logic (too restrictive), category filters (more complex).

---

## 8. Markdown Articles (Not MDX)

**Date**: 2026-04 | **Status**: Decided

**Context**: Add blog/content section for articles.

**Decision**: Simple Markdown files in `public/articles/` with frontmatter parsing.

**Rationale**: Simpler than MDX, no extra dependencies, sufficient for articles with code blocks.

**Alternatives**: MDX (overkill), CMS (not needed), JSON (harder to write).

---

## 9. Theme Toggle (localStorage + System)

**Date**: 2026-04 | **Status**: Decided

**Context**: Add dark/light mode support.

**Decision**: Toggle in navbar + system preference detection + localStorage persistence.

**Rationale**: Users expect theme toggle, system preference is fair default, localStorage remembers choice.

**Alternatives**: Cookie (less reliable), no persistence (annoying), only system (no toggle).

---

## 10. EmailJS for Contact Form

**Date**: 2026-04 | **Status**: Decided

**Context**: Replace mailto with proper form.

**Decision**: EmailJS SDK for client-side email without backend.

**Rationale**: Free tier available, no server needed, proper form UX with validation.

**Alternatives**: Formspree (similar), custom API (more work), Netlify Forms (requires Netlify).

---

## Onboarding Checklist

- [x] Know why Next.js 16 (App Router)
- [x] Know why Tailwind v4 (CSS config)
- [x] Know Framer Motion pattern ('use client')
- [x] Know JSON file approach
- [x] Know custom SVG icons decision
- [x] Know project filtering (OR logic)
- [x] Know article Markdown approach
- [x] Know theme toggle (localStorage + system)
- [x] Know EmailJS for contact form

## Related Files

- `technical-domain.md` - Stack affected by these decisions
- `living-notes.md` - Current open questions