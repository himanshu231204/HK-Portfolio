<!-- Context: project-intelligence/notes | Priority: medium | Version: 1.1 | Updated: 2026-04-01 -->

# Living Notes

> Active issues, technical debt, open questions, and insights for this portfolio.

## Quick Reference

- **Purpose**: Capture current state, problems, and open questions
- **Update**: Monthly or when status changes

## Technical Debt

| Item | Impact | Priority | Mitigation |
|------|--------|----------|------------|
| No test framework | No regression detection | Low | Visual testing before deploy |
| Hardcoded contact info | Can't update without code change | Medium | Consider form backend |
| GitHub API rate limits | May fail if hit limit | Medium | Caching already implemented |
| No dark/light theme | Users can't customize | Low | Future enhancement |

### Technical Debt Details

**Hardcoded Contact Email**  
*Priority*: Medium  
*Impact*: Need code change to update email  
*Root Cause*: Simple static site design decision  
*Proposed Solution*: Add contact form backend (emailjs, formspree) or env variable  
*Effort*: Small  
*Status*: Acknowledged

**No Dark Mode Toggle**  
*Priority*: Low  
*Impact*: Users prefer dark mode can't switch  
*Root Cause*: Initial MVP scope - single theme  
*Proposed Solution*: Add theme toggle with CSS variables  
*Effort*: Medium  
*Status*: Acknowledged

## Open Questions

| Question | Stakeholders | Status | Next Action |
|----------|--------------|--------|-------------|
| Add blog/content section? | Owner | Open | Evaluate if blog needed |
| Multi-language support? | Owner | Open | Assess need for i18n |
| Add more social platforms? | Owner | Open | Review which platforms |

### Open Question Details

**Blog/Content Section**  
*Context*: LinkedIn posts shown, but no original content  
*Stakeholders*: Portfolio owner  
*Options*: Add blog section, connect to Markdown files, use MDX  
*Timeline*: Not urgent  
*Status*: Open

**Theme Toggle**  
*Context*: Many portfolios now offer dark/light  
*Stakeholders*: Portfolio visitors  
*Options*: Tailwind dark mode, CSS variables, system preference  
*Timeline*: Future enhancement  
*Status*: Open

## Known Issues

| Issue | Severity | Workaround | Status |
|-------|----------|------------|--------|
| GitHub API may fail | Medium | Cached data shown | Known - handled |
| Lucide icons missing | Low | Custom SVG created | Fixed |

### Issue Details

**GitHub API Rate Limiting**  
*Severity*: Medium  
*Impact*: GitHub stats may not load  
*Reproduction*: Many rapid requests  
*Workaround*: Next.js fetch caching (15 min revalidate)  
*Root Cause*: GitHub unauthenticated limit  
*Status*: Known - handled with caching

## Insights & Lessons Learned

### What Works Well
- Framer Motion animations - Smooth, professional feel
- JSON data files - Easy updates without code
- Custom SVG icons - Consistent design
- Static approach - Fast, cheap hosting

### What Could Be Better
- No theme toggle - Single color scheme
- Hardcoded data - Everything in code/JSON
- No contact form - Email only

### Lessons Learned
- Next.js App Router has specific patterns - learn before building
- Tailwind v4 uses CSS-based config - no tailwind.config.js
- All animated components need 'use client' directive
- GitHub API caching is essential for rate limits

## Patterns & Conventions

### Code Patterns Worth Preserving
- Section components in `components/sections/` with 'use client'
- API utilities in `utils/api.ts` with proper typing
- Data in JSON files, not hardcoded
- Custom SocialIcons.tsx for consistent icons

### Gotchas for Maintainers
- All Framer Motion components must use 'use client'
- Tailwind v4 - no tailwind.config.js (config in CSS)
- GitHub API needs caching to avoid rate limits
- Lucide-react v1.7.0 missing GitHub/LinkedIn icons

## Active Projects

| Project | Goal | Owner | Timeline |
|---------|------|-------|----------|
| Initial Portfolio | Launch with core sections | Developer | Done |
| Improve animations | Smooth scroll effects | Developer | Future |
| Add blog | Content section | Developer | Future |

## Archive (Resolved Items)

None yet - this is a new project.

## Onboarding Checklist

- [x] Review known technical debt and understand impact
- [x] Know what open questions exist and who's involved
- [x] Understand GitHub API rate limiting and caching
- [x] Be aware of patterns (use client, JSON data)
- [x] Know Framer Motion requires client-side rendering

## Related Files

- `decisions-log.md` - Past decisions that inform current state
- `business-domain.md` - Business context for current priorities
- `technical-domain.md` - Technical context for current state
- `portfolio/standards/animation-standards.md` - Animation patterns