# Contributing to Synthara AI

Thank you for your interest in contributing to **Synthara**! We welcome bug reports, architectural improvements, new integrations, and documentation updates.

## Development Workflow

1. **Fork & Clone**
   ```bash
   git clone https://github.com/marutigore/Synthara.git
   cd Synthara
   npm install
   ```

2. **Configure Environment**
   Copy `env.example` to `.env.local` and configure your Supabase, Gemini/OpenRouter, and SerpAPI keys.

3. **Start Services**
   ```bash
   docker compose up -d crawl4ai
   npm run dev
   ```

4. **Create a Feature Branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

## Code Quality Standards

Before opening a pull request, ensure your changes pass:
- **TypeScript check**: `npm run typecheck`
- **Linting**: `npm run lint`
- **No leaked secrets**: Never commit `.env.local`, API keys, or private credentials.

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
| --- | --- |
| `feat:` | A new user-facing feature or API endpoint |
| `fix:` | A bug fix |
| `docs:` | Documentation-only changes |
| `refactor:` | Code restructuring without behavior changes |
| `perf:` | Performance or token-efficiency optimizations |
| `ci:` | CI/CD workflow or Docker configuration changes |

Example: `feat(privacy): add PII masking and Shannon entropy fidelity scoring`

## Opening a Pull Request

- Reference any related issues in the PR description.
- Keep pull requests focused on a single feature or bug fix.
- Include brief verification notes or API sample outputs where applicable.
