# Add Featured Post Command

## Description

Add a new featured post (LinkedIn) to the portfolio.

## Usage

```
/add-post {platform}
```

## Arguments

- `platform`: Platform source (linkedin)

## Examples

```
/add-post linkedin
```

## Parameters (After Platform)

After providing the platform, you will be prompted for:
- Title: Post title
- Description: Post description/excerpt
- URL: Full URL to the post
- Date: Post date (YYYY-MM-DD format)

## Examples with Parameters

```
/add-post linkedin
Title: Excited to announce my new AI project
Description: Built a production-ready LLM application
URL: https://linkedin.com/posts/...
Date: 2024-03-15
```

## Workflow

1. **Context Load** → Load portfolio context files
2. **Post Details** → Get post info interactively
3. **Add Post** → Edit featuredPosts.json
4. **Validate** → Validate JSON syntax
5. **Report** → Confirm addition

## Context Required

- `portfolio/domain/content-sources.md`

## Data Source

Posts are stored in: `public/data/featuredPosts.json`

## JSON Structure

```json
{
  "posts": [
    {
      "id": "unique-post-id",
      "title": "Post title",
      "description": "Post description",
      "date": "2024-03-15",
      "url": "https://linkedin.com/posts/...",
      "platform": "linkedin"
    }
  ]
}
```

## Validation

- Validate JSON syntax (parse error check)
- Check URL format is valid
- Ensure date is valid YYYY-MM-DD
- Verify post ID is unique
