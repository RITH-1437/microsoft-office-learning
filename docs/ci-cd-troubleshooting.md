# CI/CD troubleshooting

Start with the **job summary** (Actions → the run → Summary): every job writes its logs and results there.

## Install

| Symptom | Cause | Fix |
| --- | --- | --- |
| `npm ci` fails with "lock file out of sync" | `package.json` changed without updating `package-lock.json` | run `npm install` locally, commit the lockfile (the *Pull request* workflow also flags this) |
| `npm ci` slow / cache miss | lockfile changed | expected; `actions/setup-node` caches by lockfile hash |

## Lint / types

| Symptom | Fix |
| --- | --- |
| Oxlint errors | run `npm run lint` locally; rules live in `.oxlintrc.json` (`react/rules-of-hooks` is an error, unused vars warn) |
| `tsc -b` errors | run `npm run typecheck`; the build job would fail the same way (`npm run build` runs `tsc -b` first) |
| "No formatter configured" | informational — Prettier/Biome are not part of the project |

## Tests & data integrity

| Symptom | Fix |
| --- | --- |
| "No unit test suite configured" | informational until a test runner is added (`npm test` script) |
| `check:data` lists `✗` problems | each line names the lesson/quiz/question id and the broken reference (unknown unit, missing knowledge check, answer index out of range, empty required field). Fix the data in `src/data/**`; never rename existing ids (they key saved learner progress) |
| `check:data needs Node >= 22.18` | upgrade Node locally; CI already uses Node 22 latest |
| `ERR_UNSUPPORTED_ESM_URL_SCHEME` | the resolver hook must be passed as a `file://` URL — fixed in `scripts/check-data.mjs`; make sure you run it via `npm run check:data` |

## Build

| Symptom | Fix |
| --- | --- |
| `dist/index.html missing` / "No JS/CSS assets" | the Vite build failed earlier — read the build step log |
| "index.html uses absolute asset paths" | `vite.config.ts` must keep `base: './'` so the site works on any host path |
| "Some chunks are larger than 500 kB" | a warning, not a failure (lesson data ships in the entry chunk); see `.claude/tasks/reports/TASK-005-r1-cinematic-ui.md` for the follow-up |

## Security

| Symptom | Fix |
| --- | --- |
| `npm audit` fails (prod deps, high/critical) | `npm audit fix` or upgrade the package; if a fix is unavailable, document the risk acceptance in the PR and the task report — do not lower the audit level silently |
| Secrets hygiene fails | a tracked `.env*`, `dist/`, `node_modules/` or a credential pattern was found; remove it from git history if it was a real secret and **rotate the credential** |
| Dependency review fails on a fork PR or private repo | the action needs the dependency graph (free on public repos; GitHub Advanced Security on private). Either enable it or accept that this job is skipped for forks |
| CodeQL "not enabled" | set repository variable `ENABLE_CODEQL=true` only when code scanning is available |

## Deployments

| Symptom | Fix |
| --- | --- |
| "Preview/Production deployment skipped" | expected when the three Vercel secrets are not set (Option A in `ci-cd-setup.md`) |
| Preview job does not run for a PR | the PR is a draft or comes from a fork (secrets are deliberately unavailable to forks) |
| `Deploy production` never triggers | `workflow_run` only fires for workflow files that exist on the default branch — merge the `.github/` folder to `main` first; it also requires CI to have **succeeded** on `main` |
| `Error: Invalid token` / `project not found` | regenerate `VERCEL_TOKEN`; re-run `npx vercel link` and update `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` |
| Duplicate deployments | both the Vercel GitHub integration and the workflows are active — remove the secrets (or disconnect the integration) |

### Roll back a production deployment

1. Vercel dashboard → Project → **Deployments** → open the last good deployment → **Promote to Production** (instant; no rebuild). CLI equivalent: `vercel rollback <deployment-url> --token=…`.
2. Fix forward in git: `git revert <bad commit>` → open a PR → merge; CI then deploys the reverted build.
3. Learner progress lives in each browser's `localStorage`; deployments never touch it, so rollbacks are safe for users.

## Re-running

Actions → the run → **Re-run failed jobs**. For scheduled security scans use **Run workflow** (manual dispatch) on the Security workflow.
