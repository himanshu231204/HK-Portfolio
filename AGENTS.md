# AGENTS.md — Portfolio Repo Guidelines + Auto-Update Agent

This file is read by opencode before it touches anything in this repo.
Also read `CONTEXT.md` — it's the source of truth about Himanshu;
never invent facts that aren't in it or in the live data pulled from
GitHub/LinkedIn/Twitter.

---

## Part 1 — Project Overview

Next.js 16 portfolio website, TypeScript, Tailwind CSS v4, Framer
Motion. Showcases a personal developer portfolio with dynamic GitHub
API integration.

## Build / Lint / Test Commands

```bash
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint on all files
npx eslint app/ components/   # Lint specific directory
npx tsc --noEmit     # Type check without building
```

No test framework is configured. Do not add test files.

## Code Style Guidelines

**TypeScript**
- Always use TypeScript for new files (.tsx/.ts)
- Prefer `interface` over `type` for object shapes
- Explicit return types for utility functions
- Never use `any` — use `unknown` if truly unknown

**Components**
- Everything in `components/sections/` needs `'use client'` (Framer Motion)
- Functional components using `function` keyword (not arrow, unless needed)
- Keep components under 200 lines; extract sub-components if larger
- Interactive elements use `motion.` variants

**Import order (ESLint-enforced)**
1. React imports
2. Next.js imports
3. External libraries (`framer-motion`, `lucide-react`)
4. Internal imports (`@/components/`, `@/utils/`)
5. Relative imports

Use the `@/` alias for absolute imports from project root. Custom
icons live in `components/SocialIcons.tsx` (lucide-react v1.7.0 has no
GitHub/LinkedIn icons). No barrel exports (`index.ts` files).

**Naming**
- Components: PascalCase (`Navbar.tsx`, `GitHubStats.tsx`)
- Utilities: camelCase (`api.ts`, `useScrollAnimation.ts`)
- Constants: SCREAMING_SNAKE_CASE
- Non-component files: kebab-case

**Tailwind CSS v4**
- CSS-based config (no `tailwind.config.js`)
- Prefer inline Tailwind classes over custom CSS; `@apply` sparingly
- Custom CSS/animations in `app/globals.css` only
- Color tokens: `slate-50`–`slate-900`, `indigo-400`, etc.
- `glass` class for glassmorphism (defined in globals.css)

**Framer Motion**
- `motion.` prefix for animated elements
- Always `viewport={{ once: true }}` on scroll animations
- `whileHover` / `whileTap` for interactive elements
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

**Error handling**
- Try/catch with user-friendly messages on all API calls
- Loading states use skeletons, not spinners
- Never expose internal errors to users

## File Organization

```
app/
├── globals.css        # Global styles, animations, custom classes
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Main page composing all sections
└── favicon.ico

components/
├── sections/           # Page sections (Hero, About, Skills, Projects, etc.)
├── PostCard.tsx        # Reusable post card component
└── SocialIcons.tsx     # Custom SVG icons (GitHub, LinkedIn, Twitter)

hooks/
└── useScrollAnimation.ts

utils/
├── api.ts               # GitHub API utilities
└── types.ts             # TypeScript interfaces

public/data/
└── featuredPosts.json    # Featured posts data (LinkedIn)
```

Next.js 16, App Router, all animated components are client-side.
ESLint: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`.

## Common Tasks

**Adding a new section**
1. Create `components/sections/NewSection.tsx` with `'use client'`
2. Add to `app/page.tsx`
3. Add nav link in `Navbar.tsx`

**Modifying Featured Projects**
- Edit `components/sections/Projects.tsx` — update `featuredProjects` array

**Updating Featured Posts**
- Edit `public/data/featuredPosts.json` — update posts array

**LinkedIn Feed section (auto-embedded latest posts)**
- Component: `components/sections/LinkedInFeed.tsx`
- Data source: `public/data/featuredPosts.json`, kept fresh by the
  agent via the RSS-bridge workflow in Part 2 of this file
- Placed in `app/page.tsx` after `Projects`, before `Certifications`
  — don't reorder other sections when adding this
- Nav link added in `Navbar.tsx` ("Latest Posts")

## External APIs

**GitHub API**
- Usernames: `himanshu231204` (personal), `OpenAgentHQ` (org)
- Use `@/utils/api.ts` utilities
- API calls cached with Next.js `fetch` (revalidate configured)
- Handle rate limits gracefully

**Featured Posts / LinkedIn Feed**
- `public/data/featuredPosts.json` — updated via the RSS-bridge
  workflow described in Part 2 (no official public API for personal
  LinkedIn posts)

---

## Part 2 — Auto-Update Mission

Once per scheduled run: check Himanshu's public activity (GitHub,
LinkedIn, Twitter/X) and update the repo so the live site reflects his
latest work — new projects, refreshed stats, new posts, updated
skills. Commit to a branch and open a PR; never push straight to
`main` and never auto-merge unless `AUTO_MERGE=true` is set in agent
config.

### Sources to check, in order

**1. GitHub — required, primary source (this is the main signal)**

GitHub activity is the primary thing this agent should look at for
"what's new" — more than description/star-count polish. Two accounts
to check every run:
- Personal: `himanshu231204`
- Org: `OpenAgentHQ` (https://github.com/OpenAgentHQ) — repos, merged
  PRs, and releases under this org count as Himanshu's work too, not
  just his personal account.

Use `@/utils/api.ts` helpers where they already exist; extend them
rather than writing ad hoc fetches.

What to actually pull, per run:
- Recently updated/created repos (both accounts):
  `users/himanshu231204/repos?sort=updated&per_page=20` and
  `orgs/OpenAgentHQ/repos?sort=updated&per_page=20`
- For each candidate repo: `name`, `description`, `topics`,
  `stargazers_count`, `html_url`, `pushed_at`, primary `language`
- **Merged PRs** — this is the real "what did he ship" signal:
  `search/issues?q=author:himanshu231204+is:pr+is:merged+sort:updated`
  (and the same filtered to `org:OpenAgentHQ` repos). A meaningfully
  large/notable merged PR (new feature, not a typo fix) is a good
  candidate to mention in a project's description or a featured post,
  even if the repo itself was already listed.
- Recent commit activity / new releases (tags) on repos already
  featured, to decide if their description/stats need a refresh.

Only surface as a "Featured Project" if public, has a non-empty
description, isn't a trivial fork. Respect rate limits; cache via
Next.js `fetch` revalidate as already configured — don't remove or
shorten existing revalidate windows without reason. GitHub stats
images (streak-stats, github-readme-activity-graph) are dynamic URLs
already on the site — never hardcode or "freeze" them.

**2. LinkedIn — track via RSS bridge (no official public API for personal posts)**
- LinkedIn does not offer a free public API for personal post
  embedding. The practical route: use an RSS-bridge service
  (e.g. RSS.app, or similar) pointed at Himanshu's public profile to
  generate a feed URL for his posts. Store that feed URL in
  `.env` as `LINKEDIN_RSS_URL` (never commit the URL itself if it
  contains a private token — check the service's terms).
- Each run: fetch `LINKEDIN_RSS_URL`, parse entries (title/summary,
  link, published date), map to the `FeaturedPost` shape (see
  `utils/types.ts`), and merge into `public/data/featuredPosts.json`
  — dedupe by post URL, keep newest N (e.g. 6) posts, don't delete
  older ones from git history, just drop from the displayed list.
- If `LINKEDIN_RSS_URL` isn't set, or the feed fetch fails, skip
  silently and log it in `.agent/last-run.md` — never fail the whole
  run over this.
- If a proper authenticated LinkedIn connector/MCP tool is available
  instead, prefer that over the RSS bridge, using only publicly
  visible fields (headline, current role, post text/links). Never
  touch private messages or connections.

**3. Twitter/X — best-effort, same rule as LinkedIn**
- Only use if an authenticated tool/API is actually configured;
  otherwise skip and log it.
- If available, pull recent original posts (not retweets/replies)
  that reference a project, article, or milestone — candidates for
  `featuredPosts.json` or the Articles section.

### What is allowed to change

- `components/sections/Projects.tsx` → the `featuredProjects` array
  (add new project, update description/tags/links/star count).
  A notable merged PR on an already-listed project is valid grounds
  to refresh that project's description (e.g. "added X" once merged),
  not just to add brand-new repos.
- `public/data/featuredPosts.json` → featured posts list
- Skills lists in the relevant section component — add a technology
  only after it appears in ≥2 real repos/READMEs, not on hearsay
- Copy-level stat updates (e.g. PyPI download count) only when
  verified against the live source

### What must NEVER change without explicit human approval

- Name, headline, bio wording/voice, contact info, resume PDF
- Page structure, section order, design system, Tailwind theme
- `layout.tsx` metadata, `og:image`, canonical URL
- `public/resume.pdf`
- Anything in `app/globals.css` (colors, fonts, animations)
- The file organization / import order / naming conventions in Part 1

If a change feels structural rather than data-level, stop and open an
issue titled `[agent] needs human review: <short reason>` instead of
editing directly.

### Update workflow

1. `git checkout -b agent/update-<YYYY-MM-DD>`
2. Gather data (GitHub required, LinkedIn/Twitter best-effort)
3. Diff against current data (`Projects.tsx` array, `featuredPosts.json`)
4. Write changes following Part 1's code style exactly — don't
   reformat unrelated lines, keep diffs reviewable
5. `npm run lint` and `npx tsc --noEmit` before committing; run
   `npm run build` too. If any fail, revert and log why
6. Commit: `chore(agent): sync projects + posts from GitHub (YYYY-MM-DD)`
7. Open a PR (don't merge automatically unless configured)
8. Append to `.agent/last-run.md`: timestamp, sources checked/skipped
   (with reason), files changed, anything flagged for manual review

## Hard rules

- Never fabricate a project, stat, certificate, or quote — skip and
  log ambiguous data instead of guessing
- Never scrape/store LinkedIn or Twitter data beyond what's publicly
  displayed and needed for this site
- Never commit secrets/API keys; `.env` stays out of git
- Never force-push or rewrite git history
- One agent run = one branch = one PR; don't stack runs on one branch
- When unsure whether something counts as a real update, do nothing
  rather than guess