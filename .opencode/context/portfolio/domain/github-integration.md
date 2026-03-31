# GitHub API Integration

## Overview

The portfolio uses dynamic GitHub API integration to display repository statistics and featured projects.

## Configuration

- **Username**: `himanshu231204`
- **API Endpoint**: `https://api.github.com/users/{username}/repos`
- **Caching**: Next.js fetch with 1-hour revalidation

## API Utilities

All GitHub API functions are in `utils/api.ts`.

### fetchGitHubRepos

```typescript
async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]>
```

Fetches all repositories for a user, sorted by update date.

**Returns**: Array of GitHubRepo objects sorted by most recently updated.

**Caching**: Uses `next: { revalidate: 3600 }` for 1-hour cache.

### fetchGitHubUser

```typescript
async function fetchGitHubUser(username: string): Promise<GitHubUser | null>
```

Fetches user profile data.

### formatDate

```typescript
function formatDate(dateString: string): string
```

Formats dates as relative time (e.g., "2 days ago", "3 months ago").

## TypeScript Interfaces

```typescript
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  visibility: string;
}

interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
}
```

## Error Handling

All API calls include try/catch blocks:

```typescript
try {
  const data = await fetchGitHubRepos('username');
  setRepos(data);
} catch (error) {
  console.error('Error fetching repos:', error);
  return []; // Return empty on error
}
```

## Usage in Components

### GitHubStats Section

Located at `components/sections/GitHubStats.tsx`:
- Fetches user profile (followers, following, public repos)
- Fetches all repositories
- Displays top repos by stars
- Shows loading skeletons during fetch

### Projects Section

Located at `components/sections/Projects.tsx`:
- Uses hardcoded `featuredProjects` array for curated display
- Links to GitHub repos via `html_url`
- Shows project name, description, language, stars, forks

## Rate Limits

- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5000 requests/hour

The current implementation uses unauthenticated requests. For higher limits, add GitHub token to environment variables.

## Adding New GitHub Features

1. Import the API utility from `@/utils/api`
2. Add loading state with skeleton UI
3. Call API in useEffect or as async server component
4. Handle errors gracefully with user-friendly messages
