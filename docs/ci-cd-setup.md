# CI/CD setup

## 1. Run the same checks locally

```bash
npm ci                 # deterministic install from package-lock.json
npm run lint           # Oxlint
npm run typecheck      # tsc -b (project references, no emit)
npm run check:data     # curriculum ids / answer keys / required lesson parts (Node >= 22.18)
npm run build          # tsc -b && vite build → dist/
npm run preview        # serve dist/ and smoke-test deep links (e.g. /#/lesson/w1-1 + refresh)
```

Node 22 is the reference version (`actions/setup-node` uses `node-version: 22`). `check:data` relies on Node's built-in TypeScript type stripping (22.18+); on older Node it exits with an explanatory message.

## 2. GitHub repository settings (one-time)

1. **Branch protection / rulesets for `main`** — require a pull request, require status checks to pass before merging, and select:
   `CI / Lint & type-check`, `CI / Tests & data integrity`, `CI / Production build`, `Security / npm audit`, `Security / Secrets & artefact hygiene`.
   Optionally require branches to be up to date and at least one approving review. *Nothing is auto-merged or auto-approved by the workflows.*
2. **Environments** — create `preview` and `production` (Settings → Environments). On `production`, add **Required reviewers** if you want a human approval gate before every production deploy; the workflow waits for it.
3. **Security features** — enable Dependabot alerts + security updates, **secret scanning** and **push protection** (Settings → Code security). Public repos get these free; the hygiene job in `security.yml` is only a basic safety net, not a replacement.
4. **CodeQL (optional)** — set the repository variable `ENABLE_CODEQL=true` (Settings → Secrets and variables → Actions → Variables). Requires code scanning to be available (free for public repositories).
5. **Dependabot** — `.github/dependabot.yml` is picked up automatically; it opens weekly PRs that run through the full pipeline.

## 3. Deployment to Vercel

Pick **one** of the two options.

### Option A — Vercel GitHub integration (simplest)

Import the repository in the Vercel dashboard. Vercel builds every push, posts preview URLs on PRs and promotes `main` to production. **Do not add the secrets below**; the two deploy workflows detect the missing secrets and skip with a note, so nothing deploys twice.

### Option B — GitHub Actions deploys with the Vercel CLI

Required repository secrets (Settings → Secrets and variables → Actions → *Secrets*):

| Secret | Where it comes from |
| --- | --- |
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens → *Create* (scope it to the team that owns the project; give it an expiry and rotate it) |
| `VERCEL_ORG_ID` | run `npx vercel link` locally once; read `orgId` from the generated `.vercel/project.json` (the folder is git-ignored) |
| `VERCEL_PROJECT_ID` | same file, `projectId` |

Behaviour once set: every non-draft PR from this repository gets a preview deployment (URL in the job summary and on the `preview` environment); every successful **CI** run on `main` triggers `Deploy production (Vercel)`, which re-verifies the commit and deploys with `--prod`.

No other secrets or environment variables are needed — the app has no API keys. Any future `VITE_*` variable is baked into the public bundle and must never hold a secret.

### Alternative static hosts

The build is host-agnostic (`base: './'`, HashRouter). For GitHub Pages or any static host, publish the `dist` artifact from the CI run; see `.claude/skills/deployment/SKILL.md` for the checklist.

## 4. First-run checklist

- [ ] Push the `.github/` folder to `main` (workflow_run-based production deploys only trigger once the workflow file exists on the default branch).
- [ ] Watch the first **CI** and **Security** runs; read the job summaries.
- [ ] Configure branch protection with the check names above.
- [ ] Decide on deployment option A or B; for B add the three secrets and create the environments.
- [ ] Enable secret scanning / push protection / Dependabot alerts.

## 5. Hardening follow-ups

- Pin third-party actions to commit SHAs (Dependabot will keep the comments updated): e.g. `actions/checkout@<sha> # v4`.
- Add a unit-test runner (Vitest + Testing Library) and switch the `tests` job from "reported" to enforced; add a Playwright smoke test against the preview URL.
- Consider a Content-Security-Policy header in `vercel.json` once tested against the Google Fonts stylesheet and the labs.
