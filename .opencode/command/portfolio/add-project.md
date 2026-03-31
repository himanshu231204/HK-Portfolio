# Add Project Command

## Description

Add a new featured project to the portfolio.

## Usage

```
/add-project {project-name}
```

## Arguments

- `project-name`: Name of the project (can include spaces)

## Examples

```
/add-project "AI Chatbot"
/add-project "Data Pipeline"
```

## Parameters (After Name)

After providing the project name, you will be prompted for:
- Description: Brief project description
- GitHub URL: Link to GitHub repository
- Technologies: Comma-separated tech stack
- Live URL: (optional) Production/demo URL

## Examples with Parameters

```
/add-project "AI Chatbot"
Description: A conversational AI chatbot using GPT-4
GitHub: https://github.com/himanshu231204/chatbot
Tech: Python, LangChain, Streamlit
Live: https://chatbot.example.com
```

## Workflow

1. **Context Load** → Load portfolio context files
2. **Project Details** → Get project info interactively
3. **Add Project** → Edit Projects.tsx with new project
4. **Validate** → Run TypeScript check
5. **Report** → Confirm addition

## Context Required

- `portfolio/domain/project-structure.md`
- `portfolio/standards/section-templates.md`

## Validation

- Check project doesn't already exist
- Validate GitHub URL format
- Ensure at least one technology listed
- TypeScript compilation passes
- Verify image URL if provided
