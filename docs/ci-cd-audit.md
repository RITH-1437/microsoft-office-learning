# CI/CD audit — Office Academy

Date: 2026-11-14 · Auditor: orchestrator acting in the devops-engineer role (subagents were unavailable: API rate limit) · Repository: `github.com/RITH-1437/microsoft-office-learning`

## 1. Current setup (verified from the repository, not assumed)

| Area | Finding |
| --- | --- |
| Framework / language | React 19 + TypeScript (strict), Vite 8, Tailwind CSS v4, react-router (HashRouter), Zustand, framer-motion. Client-only SPA. |
| Package manager | npm 12 with a committed `package-lock.json` (lockfile v3). |
| Build | `npm run build` = `tsc -b && vite build` → `dist/` (relative `base: './'`). Passes locally; Vite warns about a > 500 kB entry chunk (lesson data). |
| Lint | Oxlint (`.oxlintrc.json`, React + TypeScript plugins). Passes with 0 warnings. |
| Formatting | No Prettier/Biome configuration. |
| Type checking | `tsconfig.json` project references → `tsconfig.app.json` (`noEmit`) + `tsconfig.node.json`. `tsc -b` is the type check. |
| Tests | **No test runner, no test script.** |
| Backend / database / migrations | **None.** No API, no env vars, no `.env*` files. |
| Secrets | None required. `.gitignore` did **not** exclude `.env*` (fixed) nor `.vercel/` (fixed). |
| Existing CI/CD | **None** — no `.github/`, no `vercel.json`, no Node version pin. |
| Node | 22.23.1 locally; nothing pinned. |
| Claude agents/skills | `.claude/agents/devops-engineer.md`, `.claude/skills/deployment/SKILL.md` describe the intended release checks (clean install, lint, build, preview smoke test). |

## 2. Gaps found

1. No automated verification on push/PR — a broken build could reach `main` unnoticed.
2. No dependency or secret scanning; no Dependabot.
3. No deployment automation or documentation; no security headers for the static host.
4. No executable check that curriculum ids resolve (lesson ↔ unit ↔ quiz ↔ question ↔ exercise), although ids key learner progress.
5. No unit tests; no coverage data to base a threshold on.
6. `.env*`/`.vercel/` not git-ignored (hygiene).

## 3. Recommended pipeline (implemented)

See `ci-cd-architecture.md` for the full design. Summary:

- **CI** (`ci.yml`): lint + type-check (reusable `code-quality.yml`) → tests (reported; no runner yet) + `check:data` → verified production build with artifact and size summary.
- **Pull request** (`pull-request.yml`): change-set hygiene and a required-checks summary.
- **Security** (`security.yml`): `npm audit` (prod deps gate on high/critical), tracked-file/credential hygiene, dependency review on PRs, opt-in CodeQL, weekly schedule.
- **Deploy preview / production** (`deploy-preview.yml`, `deploy-production.yml`): Vercel CLI deployments that skip cleanly until secrets exist; production only after CI succeeds on `main`, through a protected environment.
- **Supporting**: `dependabot.yml`, `vercel.json` (security + cache headers), `scripts/check-data.mjs`, npm scripts `typecheck` and `check:data`, `.gitignore` entries.

## 4. Local verification results (what was actually run)

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | pass, 0 warnings |
| Type check | `npm run typecheck` (`tsc -b`) | pass |
| Data integrity | `npm run check:data` | pass — 2 paths, 8 units, 38 lessons (17 Word / 21 Excel), 38 lesson checks, 10 quizzes (72 questions), 110 questions, 12 exercises; 8 warnings (lessons whose explanation exceeds 250 words) |
| Production build | `npm run build` | pass; `dist/index.html` + 20 JS chunks + 1 CSS; chunk-size warning present |
| Workflow syntax | PyYAML `safe_load` on all 6 workflows + `dependabot.yml` | all parse; triggers and jobs as designed |
| Vercel config | `vercel.json` | valid JSON; headers/framework fields per Vercel schema |
| GitHub execution | — | **Not executed**: nothing was pushed (the mission forbids pushing without authorization). The first real run happens when `.github/` reaches GitHub. |
| Deployment | — | **Not executed**: no Vercel credentials exist in the repository or environment. |

## 5. Remaining setup steps (need a human / repository admin)

1. Push the branch and open a PR so CI, Security and Pull request workflows run; read the job summaries.
2. Configure branch protection with the five required check names (`ci-cd-setup.md` §2).
3. Choose deployment option A (Vercel Git integration) or B (secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` + environments `preview`/`production`).
4. Enable secret scanning, push protection, Dependabot alerts; optionally `ENABLE_CODEQL=true`.
5. Add a unit-test runner (Vitest + Testing Library) and cover `src/lib/formula.ts`, quiz scoring and `src/store/progress.ts`; then make the `tests` job enforcing and measure coverage before setting any threshold.
6. Pin actions to commit SHAs once Dependabot is active.

## 6. Deployment readiness

**Ready for static hosting** (build is verified and host-agnostic). **Vercel automation is prepared but inactive** until secrets or the Git integration are configured. No destructive or production action was taken.
