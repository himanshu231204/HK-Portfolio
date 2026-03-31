# Portfolio Section Creation Workflow

## Overview

This workflow defines the process for creating new portfolio sections from templates.

## When to Use

- Adding new sections to the portfolio
- Creating custom content sections
- Building new feature sections

## Workflow Stages

### Stage 1: Discovery
- Load portfolio context files
- Read existing section patterns
- Determine section type needed

### Stage 2: Planning
- Choose section template (content, grid, stats, hero)
- Plan section content and data
- Determine navigation requirements

### Stage 3: Template Selection
- **Content Section**: Text-heavy, single column
- **Grid Section**: Cards, responsive grid
- **Stats Section**: Statistics display
- **Hero Section**: Landing/intro section

### Stage 4: Implementation
- Create section component file
- Add Framer Motion animations
- Follow existing patterns

### Stage 5: Integration
- Import in `app/page.tsx`
- Add to proper position
- Add navbar link

### Stage 6: Validation
- TypeScript: `npx tsc --noEmit`
- ESLint: `npx eslint components/sections/*.tsx`
- Verify in browser
- Check all animations

### Stage 7: Reporting
- Confirm section created
- Report file locations
- Suggest next steps

## Section Templates

See `portfolio/standards/section-templates.md`:

### Content Template
```typescript
// For text-heavy sections
<motion.h2 initial={{ opacity: 0, y: 20 }} ...>
<motion.div variants={containerVariants} ...>
```

### Grid Template
```typescript
// For card-based sections
<div className="grid md:grid-cols-3 gap-6">
  {items.map((item, index) => (
    <motion.div key={item.name} ...>
  ))}
</div>
```

### Stats Template
```typescript
// For statistics
<div className="grid grid-cols-2 md:grid-cols-4">
  {stats.map((stat, index) => (
    <motion.div key={stat.label} ...>
  ))}
</div>
```

## Navigation Integration

### Navbar Link Pattern
```typescript
<motion.a
  href="#section-id"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Link Text
</motion.a>
```

## Commands

| Task | Command |
|------|---------|
| Create section | `/new-section {type}` |

## Validation Checklist

- [ ] Section file created
- [ ] TypeScript compiles
- [ ] ESLint passes
- [ ] Section ID matches navbar
- [ ] Animations work correctly
- [ ] Page renders without errors
- [ ] Navigation link works
- [ ] Responsive on mobile

## Context Files

Required:
- `portfolio/standards/section-templates.md`
- `portfolio/standards/animation-standards.md`
- `portfolio/domain/project-structure.md`

## File Structure Created

```
components/sections/{SectionName}.tsx  # New section
app/page.ts                              # Updated with import
components/sections/Navbar.tsx          # Updated with link
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Section not showing | Check import in page.tsx |
| Nav link not working | Verify section ID matches |
| Animations not firing | Check viewport={{ once: true }} |
| Type errors | Check component props |
