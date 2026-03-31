<!-- Context: project-intelligence/business | Priority: critical | Version: 1.1 | Updated: 2026-04-01 -->

# Business Domain

> Personal developer portfolio - showcasing skills, projects, and professional presence.

## Quick Reference

- **Purpose**: Showcase developer skills, projects, and connect with potential employers/clients
- **Update When**: New projects, skills, career changes
- **Audience**: Recruiters, hiring managers, potential clients, fellow developers

## Project Identity

```
Project Name: Developer Portfolio
Tagline: Personal portfolio website showcasing development skills and projects
Problem Statement: Need a professional online presence to attract job opportunities and clients
Solution: Static portfolio site with GitHub integration, project showcase, and contact options
```

## Target Users

| User Segment | Who They Are | What They Need | Pain Points |
|--------------|--------------|----------------|-------------|
| Recruiters | Technical recruiters scanning candidates | Quick overview of skills, projects, GitHub activity | Hard to assess developer capabilities quickly |
| Hiring Managers | Tech leads/engineering managers | Verify skills, see real projects, assess code quality | LinkedIn doesn't show actual work |
| Potential Clients | Businesses needing developers | See capabilities, past work, contact info | Portfolio samples scattered |
| Fellow Developers | Other devs browsing | Get inspired, see technologies used, connect | Hard to find contact info |

## Value Proposition

**For Users**:
- Quick skills overview in one place
- Live GitHub repo/activity展示
- Project showcase with descriptions
- Easy contact options

**For Developer (You)**:
- Single source of truth for professional presence
- Automatic GitHub sync (no manual updates)
- Differentiate from LinkedIn profiles
- Demonstrate web development skills

## Success Metrics

| Metric | Definition | Target | Current |
|--------|------------|--------|---------|
| Page Views | Unique visitors | 500/month | - |
| GitHub Clicks | Click-through to GitHub | 100/month | - |
| Contact Inquiries | Contact form/message clicks | 10/month | - |
| Skills Match | Skills listed vs. used in projects | 100% | - |

## Key Stakeholders

| Role | Name | Responsibility | Contact |
|------|------|----------------|---------|
| Owner | [Your Name] | Content, maintenance | Portfolio owner |
| Developer | [Your Name] | Code, deployments | Same |

## Roadmap Context

**Current Focus**: Initial launch with core sections
**Next Milestone**: Add blog/content section, improve animations
**Long-term Vision**: Multi-language support, dark/light theme toggle

## Business Constraints

- No backend - static site only (simplicity, cost)
- No database - JSON for data (easy editing)
- No auth - public site only (no private content)
- Free hosting - Vercel (zero cost for static)

## Onboarding Checklist

- [x] Understand the problem statement (professional online presence)
- [x] Identify target users (recruiters, clients, fellow devs)
- [x] Know the key value proposition (skills + projects + GitHub)
- [x] Understand success metrics (views, clicks, inquiries)
- [x] Know who the stakeholder is (single owner/developer)
- [x] Understand current business constraints (static, no DB, no auth)

## 📂 Codebase References

**Main Page**: `app/page.tsx` - Composes all sections
**Sections**: `components/sections/*.tsx` - Hero, About, Skills, Projects, etc.
**Data Sources**: `public/data/featuredPosts.json` - LinkedIn posts backup

## Related Files

- `technical-domain.md` - Tech stack used (Next.js 16, TypeScript, Tailwind v4)
- `portfolio/domain/project-structure.md` - File organization
- `decisions-log.md` - Why certain features/changes were made