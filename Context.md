# CONTEXT.md — Ground Truth About Himanshu & This Site

This is the single source of truth the agent should trust over any
inference. If live data (GitHub/LinkedIn/Twitter) contradicts this
file on identity-level facts, trust this file and flag the conflict
instead of overwriting silently.

## Who this is

- **Name:** Himanshu Kumar (goes by "HK")
- **Handle everywhere:** @himanshu231204 (GitHub, LinkedIn, Twitter/X)
- **Email:** himanshu231204@gmail.com
- **Site:** https://himanshu231204.vercel.app (canonical:
  himanshukumar.me)
- **Location:** Patna, Bihar, India
- **Role/identity:** CS Engineering student (BEU Patna, 2022–2026,
  currently in later semesters) and AI/ML + GenAI engineer. Also
  identifies as founder of **OpenAgentHQ**, focused on agentic
  systems, LLM infrastructure, and developer tooling.
- **Organization:** https://github.com/OpenAgentHQ — check this org's
  repos too, not just the personal `himanshu231204` account. Projects,
  merged PRs, and releases under this org count as his work.
- **Currently seeking:** AI/ML/GenAI internship opportunities.
- **Content creation:** Makes educational tech content for CS
  students, junior devs, and AI beginners across Instagram Reels,
  YouTube Shorts, TikTok. Communicates casually in Hinglish.

## Voice / positioning (don't drift from this)

- Tagline: "Building Tools That Solve Real Problems"
- Framing: "I believe in learning by building — not just consuming
  tutorials — and sharing everything publicly through open source."
- Core interest line: "My core interest lies in designing systems,
  not just models — focusing on retrieval, pipelines, and deployment."
- Tone on the site itself: clean, professional, confident but not
  hypey. Save Hinglish/casual voice for social captions, not the
  portfolio copy itself.

## Core stack (only add new items here once proven via real repos)

AI/ML: Python, LangChain, FAISS, Sentence Transformers, Scikit-learn,
Generative AI, LLM applications.
Backend: FastAPI, Streamlit, C++, Docker.
Tools/DevOps: GitHub Actions, Docker, Git, VS Code.
Also actively used: LangGraph, MCP (Model Context Protocol), Groq
(llama-3.3-70b-versatile), Celery/Redis.

## Known real projects (verify current stats via GitHub before writing numbers)

- **RAGNOVA** — RAG chatbot: FAISS + Sentence Transformers + Groq +
  Streamlit + LangChain. Actively worked on RAG evaluation.
- **run-git** — AI-powered Git CLI on PyPI; generates commit messages
  and code review from the terminal using local LLMs. 7,000+ downloads
  (verify current count from PyPI before updating this number).
- **AI Commit** — offline/privacy-first CLI that generates commit
  messages using local LLMs.
- **OpenAgent Eval (`openagent-eval`)** — evaluation framework for RAG
  / agent pipelines; alpha stage.
- **mcp-web-search** — real-time MCP-compliant web search server
  (FastAPI + Server-Sent Events) for AI-agent integration.
- **LinkedIn AI Comment Copilot** — Chrome extension + FastAPI +
  LangGraph + Gemini/Groq, with DOM-resilience fixes for LinkedIn's
  dynamic feed.
- **OpenWiki** — AI-powered documentation search.
- **contributor-ready** — open source contribution assistant /
  multi-agent "oss-ready" tool that makes repos contributor-friendly.
- **AutoML Studio** — end-to-end ML platform automating EDA,
  preprocessing, training, evaluation.

New projects should only be added once they exist as real, described,
non-trivial public repos — not WIP scratch repos with no README.

## Certifications currently listed (only add new ones with real proof)

- Claude Code in Action — Anthropic (Mar 2026)
- Get Started with Databricks for Generative AI — Databricks (Jan 2026)
- Introduction to Generative AI — Simplilearn (SkillUp), powered by
  Google Cloud (Jan 2026)
- Programming with Python — Internshala Trainings (Jun 2025)

## Site structure (confirmed against actual repo)

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer
Motion. Sections lead with evidence and are numbered in the UI:
Hero → 01 Selected work (featured projects + live GitHub repo browser)
→ 02 Open source (merged contributions) → 03 Stack → 04 Building in
public (live GitHub stats + language distribution, computed from the
API — never hardcode) → 05 About → 06 Writing (articles) → 07 Posts
(LinkedIn) → 08 Background (education + interests) → 09 Certifications
→ 10 Contact → Footer.

If you add or reorder a section, renumber the `index` prop on every
`Section` so the sequence stays consecutive, and update the `navLinks`
list in `Navbar.tsx`.

Contact links shown: Email, GitHub, LinkedIn, Twitter (X), WhatsApp
(+91-8777579795).

**Where the data actually lives:**
- Featured projects → `components/sections/Projects.tsx`
  (`featuredProjects` array)
- Featured posts (LinkedIn) → `public/data/featuredPosts.json`
- GitHub API helpers → `utils/api.ts`
- Shared types → `utils/types.ts`
- Custom social icons → `components/SocialIcons.tsx` (not lucide-react)
- Design tokens (light + dark palettes) → `app/globals.css`
- Shared UI primitives (Section, Reveal, Button, GridFillers) →
  `components/ui/`
- Page metadata (title, og:image, canonical) → `app/layout.tsx`

## Things the agent should never invent

- Job titles, employers, or "experience" entries not in this file
- Testimonials/quotes from other people
- Star counts, download counts, or follower counts without pulling the
  live number from the actual API
- New certifications without an explicit source
- A different tagline, bio, or "vibe" than what's described above