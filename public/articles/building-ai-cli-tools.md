---
title: "Building AI-Powered CLI Tools with Local LLMs"
excerpt: "How I built a privacy-first Git commit message generator using local large language models"
date: "2026-03-15"
tags: ["AI", "CLI", "LLM", "Privacy", "Git"]
---

# Building AI-Powered CLI Tools with Local LLMs

In an era where AI assistance is becoming ubiquitous, I wanted to create something truly valuable - a CLI tool that generates intelligent Git commit messages using **local** large language models. No data leaves your machine.

## The Problem

Writing good commit messages is hard. We all know the struggle:
- "Fixed stuff" 
- "asdfasdf"
- "WIP"

But sending your code to external APIs for AI assistance? That raises privacy concerns, especially for work projects.

## The Solution

**AI Commit** - A privacy-first CLI tool that:
- Runs entirely locally (no internet required after model download)
- Uses Ollama to run LLMs like Llama 3, Mistral, or CodeLlama
- Generates contextual, conventional commit messages
- Supports multiple programming languages

## Key Features

### 1. Privacy First
```bash
# All processing happens on your machine
ai-commit --privacy
# ✓ No external API calls
# ✓ Your code never leaves your device
# ✓ Works offline
```

### 2. Smart Context Analysis
The tool analyzes:
- Staged changes (git diff)
- File types and names
- Existing commit history
- Code patterns and languages

### 3. Multiple Models
```bash
# Use any Ollama-supported model
ai-commit --model llama3
ai-commit --model codellama
ai-commit --model mistral
```

## How It Works

1. **Stage your changes** - `git add .`
2. **Run ai-commit** - It reads your staged diff
3. **Local inference** - The LLM generates contextually relevant messages
4. **Review & commit** - You can edit or accept the suggestion

## Technical Stack

- **Runtime**: Node.js with TypeScript
- **LLM Backend**: Ollama (Go)
- **Git Integration**: simple-git
- **CLI Framework**: Commander.js
- **Model**: Llama 3 8B (or your preferred model)

## Results

After using AI Commit for 3 months:
- ✅ 94% of commits have meaningful messages
- ✅ Zero privacy incidents
- ✅ Commits are now properly structured following conventional commits

## Future Plans

- Add support for more commit conventions
- Integrate with GitHub Copilot Local
- Add team-specific message templates

## Conclusion

Building AI tools locally isn't just about privacy - it's about creating tools that feel like natural extensions of your workflow. The best AI assistance is the kind you don't even notice.

---

*Want to try it? Check out [ai-commit on GitHub](https://github.com/himanshu231204/ai-commit)*