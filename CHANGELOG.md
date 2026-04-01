# Changelog

All notable changes to this portfolio will be documented in this file.

## [1.0.2] - 2026-04-01

### Added
- Added external AI system prompt file at `app/api/chat/system-prompt.md` for easier prompt updates
- Added markdown rendering for AI responses using `react-markdown` and `remark-gfm`
- Added WhatsApp contact card with direct chat link and copy-to-clipboard support

### Changed
- Enhanced AI chat UI with richer helper text, better prompt guidance, and per-message timestamps
- Updated AI quick suggestions and welcome message for improved user onboarding
- Split CI/CD workflows into dedicated files and aligned Vercel status check contexts
- Updated workflows to opt JavaScript actions into Node.js 24 runtime compatibility

### Fixed
- Fixed YAML formatting and quoting issues in Vercel status action inputs
- Fixed GitHub commit status permission issue by adding workflow `statuses: write` permission
- Fixed lint failures by scoping CI lint targets and resolving component-level lint errors
- Fixed article parsing component hook-order and unescaped entity issues
- Fixed theme provider effect-related lint warning by switching to lazy theme initialization

## [1.0.1] - 2026-04-01

### Fixed
- Updated AI chat backend to use Hugging Face router chat-completions endpoint format
- Added configurable chat model support via HUGGINGFACE_CHAT_MODEL
- Improved chat history validation with strict role/content filtering
- Removed unused conversation-building logic in API route
- Improved API error messaging for invalid model/key configuration

## [1.0.0] - 2026-04-

### Added
- Initial portfolio setup
- GitHub Actions workflows (CI/CD, Vercel deployment, tests)
- Developer guide documentation
- LinkedIn posts integration
- Skills section
- Projects showcase
- Responsive design
- Framer Motion animations
