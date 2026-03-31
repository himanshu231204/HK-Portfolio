<!-- Context: portfolio/navigation | Priority: high | Version: 1.0 | Updated: 2026-03-31 -->

# Portfolio Context Navigation

**Domain**: Portfolio website management (Next.js 16 + TypeScript + Tailwind CSS v4 + Framer Motion)

---

## Structure

```
.opencode/context/portfolio/
├── domain/                    # Portfolio-specific knowledge
│   ├── project-structure.md  # File organization & data sources
│   ├── github-integration.md # GitHub API patterns
│   └── content-sources.md    # JSON data files
├── standards/                 # Portfolio-specific standards
│   ├── section-templates.md  # Reusable section patterns
│   └── animation-standards.md # Framer Motion patterns
└── navigation.md             # This file
```

---

## Quick Routes

| Task | Path |
|------|------|
| **Add new section** | `portfolio/standards/section-templates.md` |
| **Add skill/project** | `portfolio/domain/project-structure.md` |
| **GitHub API** | `portfolio/domain/github-integration.md` |
| **Update posts** | `portfolio/domain/content-sources.md` |
| **Animation patterns** | `portfolio/standards/animation-standards.md` |

---

## Key Files Reference

### Domain Knowledge
- `project-structure.md` - Complete directory structure
- `github-integration.md` - GitHub API utilities and types
- `content-sources.md` - featuredPosts.json, linkedinPosts.json

### Standards
- `section-templates.md` - Templates for new sections
- `animation-standards.md` - Framer Motion patterns

---

## Integration with Core Context

For general code tasks, also reference:
- `core/standards/code-quality.md` - TypeScript best practices
- `core/workflows/task-delegation-basics.md` - Task management
- `development/principles/clean-code.md` - Clean code principles
- `ui/web/react-patterns.md` - React patterns

---

## Related Agents

- **PortfolioManager** - Content management (skills, projects, posts)
- **GitHubSync** - GitHub API sync
- **SectionBuilder** - New section generation
- **Frontend-Specialist** - General frontend development

---

## Common Tasks

### 1. Update Skills
1. Edit `components/sections/Skills.tsx`
2. Add skill to appropriate category in `skillCategories` array

### 2. Update Projects
1. Edit `components/sections/Projects.tsx`
2. Update `featuredProjects` array

### 3. Add Featured Post
1. Edit `public/data/featuredPosts.json`
2. Add new post object to `posts` array

### 4. Add New Section
1. Create `components/sections/NewSection.tsx` using section-templates.md
2. Add to `app/page.tsx`
3. Add link to `Navbar.tsx`

---

## Dependencies

- **GitHub API**: Uses `utils/api.ts` utilities
- **Data Files**: JSON files in `public/data/`
- **Styling**: Tailwind CSS v4 + custom globals.css
- **Animations**: Framer Motion (client-side only)
