# Content Data Sources

## Overview

The portfolio uses static JSON files for content that cannot be fetched via public APIs (e.g., LinkedIn posts).

## Data Files

### featuredPosts.json

**Location**: `public/data/featuredPosts.json`

**Purpose**: Featured LinkedIn posts to display on the portfolio.

**Structure**:

```json
{
  "posts": [
    {
      "id": "unique-post-id",
      "title": "Post title",
      "description": "Post description or excerpt",
      "date": "2024-01-15",
      "url": "https://linkedin.com/feed/post/...",
      "platform": "linkedin"
    }
  ]
}
```

**Usage**: Imported in `components/sections/FeaturedPosts.tsx`

**Updating**: Edit the JSON file directly. Posts are displayed in order they appear in the array.

### linkedinPosts.json

**Location**: `public/data/linkedinPosts.json`

**Purpose**: Backup/full LinkedIn posts data.

**Structure**: Similar to featuredPosts.json with additional fields if needed.

## Adding New Posts

To add a new featured post:

1. Open `public/data/featuredPosts.json`
2. Add new object to the `posts` array:

```json
{
  "id": "post-001",
  "title": "Your Post Title",
  "description": "Brief description of the post",
  "date": "2024-03-01",
  "url": "https://linkedin.com/posts/...",
  "platform": "linkedin"
}
```

3. Save the file
4. The post will appear in the FeaturedPosts section on next build

## Post Display Order

- Posts display in the order they appear in the JSON array
- For chronological order, ensure posts are added in date order
- The FeaturedPosts component renders them as-is

## Content Categories

Posts can be categorized by adding a `category` field:

```json
{
  "id": "post-001",
  "title": "AI/ML Project Launch",
  "description": "Excited to announce...",
  "date": "2024-03-01",
  "url": "https://linkedin.com/posts/...",
  "platform": "linkedin",
  "category": "announcement"
}
```

Update `FeaturedPosts.tsx` to filter/categorize if needed.

## Other Data Sources

Currently, no other external APIs are used:
- GitHub: Real-time API (see github-integration.md)
- All other content: Hardcoded in component files

## Future Integrations

Potential data sources to consider:
- Medium blog RSS feed
- Dev.to articles API
- Personal blog/API
- YouTube channel API
