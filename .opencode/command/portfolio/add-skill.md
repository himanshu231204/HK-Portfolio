# Add Skill Command

## Description

Add a new skill to the portfolio Skills section.

## Usage

```
/add-skill {category} {skill-name}
```

## Arguments

- `category`: Category for the skill (ai-ml, backend, tools)
- `skill-name`: Name of the skill to add

## Categories

| Category | Aliases |
|----------|---------|
| AI/ML | ai-ml, ai, ml |
| Backend | backend, be |
| Tools & DevOps | tools, devops, tools-devops |

## Examples

```
/add-skill ai-ml "LangChain"
/add-skill backend "FastAPI"
/add-skill tools "Docker"
```

## Workflow

1. **Context Load** → Load portfolio context files
2. **Skill Validation** → Check if skill already exists
3. **Add Skill** → Edit Skills.tsx with new skill + icon
4. **Validate** → Run TypeScript check
5. **Report** → Confirm addition

## Context Required

- `portfolio/domain/project-structure.md`
- `portfolio/standards/section-templates.md`

## Validation

- Check skill doesn't already exist
- Verify category exists
- Ensure icon is available in lucide-react
- TypeScript compilation passes
