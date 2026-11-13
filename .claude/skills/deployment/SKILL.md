---
name: deployment
description: Build, verify and prepare Office Academy for static hosting (GitHub Pages or any static host) and set up CI — clean install, lint, production build, preview smoke test, release checklist. Use before release and when touching build/CI configuration.
---

# Deployment

## Purpose
Reliable, reproducible release of the static `dist/` bundle.

## When to activate
Pre-release (TASK-009), build/config changes, CI requests, hosting questions.

## Workflow
1. **Clean verify:** record `node -v`, `npm -v`; `npm ci`; `npm run lint`; `npm run build`. Report exact results and warnings.
2. **Preview smoke test:** `npm run preview`; open home, a lesson, a quiz, a lab; **deep-link and refresh** (`#/lesson/<id>`); check no 404s for assets and the relative `base: './'` works (also try under a sub-path if targeting Pages project sites).
3. **Contents:** `dist/` has `index.html`, hashed assets, favicon, `apple-touch-icon.png`; no source maps/secrets/`.env` leaked; size recorded.
4. **CI (propose; create only when asked):** `.github/workflows/ci.yml` on push/PR: checkout → setup-node (LTS, npm cache) → `npm ci` → lint → build → upload artifact. Deploy job to Pages only on `main`, with `permissions: pages: write, id-token: write`, `contents: read`. Pin action majors.
5. **Env:** none required. `VITE_*` variables are public—never secrets.
6. **Release checklist:** gates in `.claude/tasks/quality-gates.md` complete; version/README counts accurate; `git status` clean of unintended files; user approves any push/deploy.

## Rules
- Never push, publish, deploy or change remote settings without explicit user instruction.
- Never commit `dist/`, `node_modules/`, `.env*`.
- Config changes need before/after build comparison.

## Quality checklist
- [ ] Clean install ok · [ ] Lint ok · [ ] Build ok · [ ] Preview smoke ok · [ ] Deep link ok · [ ] Dist contents sane · [ ] Docs accurate

## Deliverables
Build verification record, CI file/proposal, deployment checklist with pass/fail.

## Completion criteria
Every checklist line has an observed result; anything not executed (e.g. actual deploy) stated as not done.
