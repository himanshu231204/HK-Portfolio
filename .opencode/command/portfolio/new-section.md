# New Section Command

## Description

Create a new portfolio section from template.

## Usage

```
/new-section {section-type}
```

## Arguments

- `section-type`: Type of section (content, grid, stats, hero)

## Section Types

| Type | Use Case | Template |
|------|----------|----------|
| content | Text-heavy sections (About, Education) | Content Section |
| grid | Card-based sections (Skills, Projects) | Grid Section |
| stats | Statistics display (GitHub Stats) | Stats Section |
| hero | Landing sections | Hero Section |

## Examples

```
/new-section content
/new-section grid
/new-section stats
```

## Parameters (After Type)

After providing the section type, you will be prompted for:
- Section Name: Name of the section (e.g., "Testimonials")
- Section ID: URL-friendly ID (e.g., "testimonials")
- Position: Where to add in page (hero, after-hero, end)

## Examples with Parameters

```
/new-section grid
Name: Testimonials
ID: testimonials
Position: before-projects
```

## Workflow

1. **Context Load** → Load portfolio context files
2. **Section Details** → Get section info
3. **Create Section** → Generate new .tsx file from template
4. **Add to Page** → Import in app/page.tsx
5. **Add Nav Link** → Add to Navbar.tsx
6. **Validate** → Run TypeScript and lint
7. **Report** → Confirm creation

## Context Required

- `portfolio/standards/section-templates.md`
- `portfolio/standards/animation-standards.md`
- `portfolio/domain/project-structure.md`

## File Created

New section file: `components/sections/{SectionName}.tsx`

## Validation

- TypeScript compilation passes
- Lint passes
- Section ID is unique
- Nav link matches section ID
