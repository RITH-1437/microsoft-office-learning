# CI/CD architecture

Office Academy is a static Vite + React single-page app (no backend, no database, no runtime secrets). The pipeline therefore has three concerns: **prove the code is good**, **prove the build is deployable**, and **deploy it without ever running untrusted code with credentials**.

## Workflows at a glance

| Workflow | File | Triggers | Jobs | Permissions |
| --- | --- | --- | --- | --- |
| **CI** | `ci.yml` | push to `main`, `feat/**`, `fix/**`, `content/**`, `chore/**`; PRs to `main`; manual | `quality` (calls Code quality) → `tests` (unit tests if present + curriculum data integrity) → `build` (production build, output verification, 7-day artifact) | `contents: read` |
| **Code quality** | `code-quality.yml` | `workflow_call` (from CI), manual | Oxlint, `tsc -b`, formatter check (reported as *not configured*) | `contents: read` |
| **Pull request** | `pull-request.yml` | PRs to `main` | change-set hygiene: no `dist/`/`.env` committed, lockfile consistency, no files > 1 MB, summary of required checks, content-change notice | `contents: read` |
| **Security** | `security.yml` | push to `main`, PRs, weekly (Mon 06:17 UTC), manual | `npm audit` (prod deps fail on high/critical; all deps reported), secrets & artefact hygiene scan, dependency review (PRs), CodeQL (opt-in) | `contents: read` (+ `security-events: write` for CodeQL only) |
| **Deploy preview** | `deploy-preview.yml` | PRs to `main` from this repo (non-draft) | Vercel preview via CLI (`vercel pull/build/deploy --prebuilt`); skips with a summary when secrets are absent | `contents: read` + `preview` environment |
| **Deploy production** | `deploy-production.yml` | `workflow_run` of **CI** on `main` (success only), manual | re-verify (lint, types, data) → Vercel production deploy; skips when secrets are absent | `contents: read` + `production` environment (approval can be required) |

Supporting files: `.github/dependabot.yml` (weekly npm + GitHub Actions updates, minor/patch grouped), `vercel.json` (framework, output dir, security + cache headers), `scripts/check-data.mjs` (curriculum integrity), `package.json` scripts `typecheck`, `check:data`.

## Flow

```text
Pull request ──► Pull request (hygiene)
             ├─► CI: quality ─► tests ─► build (artifact)
             ├─► Security: npm audit · hygiene · dependency review
             └─► Deploy preview (only if Vercel secrets exist and PR is from this repo)

Push to main ──► CI ─────────────────────────┐ success
             └─► Security                     ▼
                                   Deploy production (workflow_run; environment "production")
```

Branch protection should require: `CI / Lint & type-check`, `CI / Tests & data integrity`, `CI / Production build`, `Security / npm audit`, `Security / Secrets & artefact hygiene` (see `ci-cd-setup.md`).

## Design decisions

- **No duplication.** Lint/type-check live only in `code-quality.yml` and are *called* by CI. Security has its own triggers (so it also runs weekly) instead of being called by CI. Deployments never re-run lint in CI's place; production only re-verifies the exact commit it deploys.
- **Deterministic installs.** Every job uses `npm ci` with the committed `package-lock.json` and `actions/setup-node` npm caching. Node 22 (the version used locally; `check:data` needs ≥ 22.18 for built-in type stripping).
- **Tests are reported, not faked.** There is no unit-test runner yet; the `tests` job says so in the job summary and recommends Vitest. The executable check we do have — curriculum data integrity — runs on every change because lesson/quiz ids key learner progress.
- **Build verification is explicit.** `index.html` must exist, reference a module script, use *relative* asset paths (HashRouter + `base: './'` keep the site host-agnostic), and produce JS + CSS. Sizes and the chunk-size warning are written to the summary; the artifact lets reviewers download the exact bundle.
- **Least privilege.** Default `permissions: contents: read` everywhere; only CodeQL gets `security-events: write`. No workflow has `pull-requests: write` — reports go to the GitHub Actions job summary instead of PR comments.
- **Fork safety.** Deployment workflows use `pull_request` (never `pull_request_target`) and additionally require `head.repo.full_name == github.repository`, so fork PRs never see secrets. `deploy-production` runs on `workflow_run`, which executes the workflow file from `main`, not from the PR.
- **Graceful when not configured.** Preview and production deploy check for secrets in a first step and skip the rest with a clear summary. If the Vercel GitHub integration is connected, leave the secrets unset and Vercel handles deployments itself.
- **Concurrency.** CI cancels superseded runs per ref; previews cancel per PR; production never cancels an in-flight deploy.
- **Actions pinning.** GitHub-owned actions (`actions/*`, `github/codeql-action`) are pinned to major tags; Dependabot keeps them current. Pinning to commit SHAs is a documented follow-up (`ci-cd-setup.md` → Hardening).
- **Reports.** Each job appends Markdown to `$GITHUB_STEP_SUMMARY`: lint/tsc logs, test status, data-integrity output, build size table, audit counts, changed files, deployment URL.

## What is intentionally absent

- No database/migration jobs (no database). No end-to-end browser suite yet (recommended later: Playwright smoke on the preview URL). No coverage threshold (nothing to measure until a test runner exists).
