<!-- Context: project-intelligence/bridge | Priority: high | Version: 1.1 | Updated: 2026-04-01 -->

# Business ↔ Tech Bridge

> How business needs translate to technical solutions for this portfolio.

## Quick Reference

- **Purpose**: Show how technical choices serve business goals
- **Update When**: New features, business changes

## Core Mapping

| Business Need | Technical Solution | Why This Mapping | Business Value |
|---------------|-------------------|------------------|----------------|
| Professional online presence | Next.js 16 static site | Fast, SEO-friendly, professional | Stand out to recruiters |
| Showcase real projects | GitHub API integration | Live data, no manual updates | Credibility with proof |
| Easy contact | Mailto links + Contact section | Low friction, no backend | Direct client/recruiter connection |
| Show current skills | Skills section + Projects | Skills match projects | Demonstrate proficiency |
| Cost-effective solution | Static JSON + Vercel | Free hosting, no DB costs | Zero operating cost |

## Feature Mapping Examples

### Feature: GitHub API Integration

**Business Context**:
- User need: Recruiters want to see actual code/output
- Business goal: Prove development skills with real projects
- Priority: Core differentiator from LinkedIn

**Technical Implementation**:
- Solution: Fetch repos via GitHub REST API
- Architecture: Server-side fetch with caching (15 min revalidate)
- Trade-offs: No auth (public repos only) vs. full API access

**Connection**: Live GitHub data proves active development - static portfolio could fake this, but real API shows actual commit history and repo quality.

### Feature: Featured Posts (LinkedIn)

**Business Context**:
- User need: Show professional activity beyond code
- Business goal: Demonstrate industry engagement
- Priority: Secondary to projects, but adds credibility

**Technical Implementation**:
- Solution: Static JSON file (`featuredPosts.json`)
- Architecture: No API needed - manual updates via file
- Trade-offs: Manual updates vs. auto-sync with LinkedIn API

**Connection**: JSON approach is simple and free - LinkedIn has no free public API, so manual curation allows highlighting best content.

### Feature: Contact Section

**Business Context**:
- User need: Easy way to reach out
- Business goal: Convert visitors to contacts/interviews
- Priority: Critical for conversion

**Technical Implementation**:
- Solution: mailto links + Contact section component
- Architecture: No backend - direct email link
- Trade-offs: Simple but no spam protection vs. form service

**Connection**: Direct email is simplest - no form backend needed, but future could add Formspree/EmailJS for spam protection.

### Feature: Scroll Animations

**Business Context**:
- User need: Professional, polished feel
- Business goal: Signal attention to detail
- Priority: Polish over functionality

**Technical Implementation**:
- Solution: Framer Motion with scroll-triggered animations
- Architecture: Client-side only with 'use client' directive
- Trade-offs: Bundle size vs. animation quality

**Connection**: Framer Motion provides smooth animations that signal "I care about UX" - key differentiator from basic portfolios.

## Trade-off Decisions

| Situation | Business Priority | Technical Priority | Decision Made | Rationale |
|-----------|-------------------|-------------------|---------------|-----------|
| Blog section | Content marketing | MDX complexity | Not yet | MVP scope - add later |
| Dark mode | User preference | CSS complexity | Not yet | Single theme for launch |
| Contact form | Spam protection | Backend needed | Email link | Simple works, add form later |
| Test framework | Quality | Time cost | Skipped | Low risk, visual check enough |

## Common Misalignments

| Misalignment | Warning Signs | Resolution Approach |
|--------------|---------------|---------------------|
| Feature creep | "Nice to have" list growing | MVP focus - list features for later |
| Tech choice for tech sake | "This is cool" vs. "This solves X" | Always tie to business need |
| Over-engineering | Building for "future" | Start simple, refactor when needed |

## Stakeholder Communication

**For Recruiters/Hiring Managers**:
- Technical choices show competence (Next.js, TypeScript, Framer Motion)
- GitHub integration proves active development
- Fast load times = professional attention to detail

**For Developers**:
- Business constraints (static, no DB) drive architecture
- Simple stack = easy to understand and modify
- JSON data = easy to update without code changes

## Onboarding Checklist

- [x] Understand core business need (professional online presence)
- [x] See how GitHub API serves "show real work" goal
- [x] Know why JSON for posts (no LinkedIn API)
- [x] Know trade-offs made (no blog, no dark mode yet)
- [x] Understand Framer Motion adds "polish" business value

## 📂 Codebase References

**API Integration**: `utils/api.ts` - GitHub API with caching
**Data Sources**: `public/data/featuredPosts.json` - Static posts
**Animations**: `portfolio/standards/animation-standards.md` - Framer Motion patterns
**Components**: `components/sections/*.tsx` - Section components

## Related Files

- `business-domain.md` - Business needs in detail
- `technical-domain.md` - Technical implementation in detail
- `decisions-log.md` - Decisions made with full context
- `living-notes.md` - Current open questions