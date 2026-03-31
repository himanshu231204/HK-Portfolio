# Portfolio Content Update Workflow

## Overview

This workflow defines the process for updating portfolio content including skills, projects, and featured posts.

## When to Use

- Adding new skills to Skills section
- Adding new projects to Projects section
- Adding new featured posts (LinkedIn)
- Updating existing content

## Workflow Stages

### Stage 1: Discovery
- Load portfolio context files
- Read existing content structure
- Identify modification needed

### Stage 2: Planning
- Determine exact changes needed
- Choose appropriate subagent
- Plan validation steps

### Stage 3: Execution
- Execute content modification
- Use PortfolioManager subagent
- Follow existing patterns

### Stage 4: Validation
- TypeScript compilation: `npx tsc --noEmit`
- ESLint: `npx eslint [target-file]`
- JSON validation (for posts)
- Verify in browser

### Stage 5: Reporting
- Confirm changes made
- Report any issues
- Suggest follow-up actions

## Content Types

### Skills
- **File**: `components/sections/Skills.tsx`
- **Data**: `skillCategories` array
- **Agent**: PortfolioManager

### Projects
- **File**: `components/sections/Projects.tsx`
- **Data**: `featuredProjects` array
- **Agent**: PortfolioManager

### Featured Posts
- **File**: `public/data/featuredPosts.json`
- **Data**: `posts` array
- **Agent**: PortfolioManager

## Commands

| Task | Command |
|------|---------|
| Add skill | `/add-skill {category} {name}` |
| Add project | `/add-project {name}` |
| Add post | `/add-post linkedin` |

## Validation Checklist

- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] JSON is valid (for posts)
- [ ] Content displays correctly
- [ ] Animations work
- [ ] No console errors

## Common Issues

| Issue | Solution |
|-------|----------|
| Skill already exists | Check existing categories first |
| Invalid icon | Use lucide-react icons only |
| JSON parse error | Validate JSON syntax |
| Type error | Check TypeScript types |

## Context Files

Required:
- `portfolio/domain/project-structure.md`
- `portfolio/domain/content-sources.md`
- `portfolio/standards/section-templates.md`
