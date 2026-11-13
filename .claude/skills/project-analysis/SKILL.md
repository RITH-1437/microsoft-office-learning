---
name: project-analysis
description: Audit the current state of Office Academy — stack, architecture, conventions, content inventory, tests/CI, technical debt. Use at the start of a task, before architectural changes, or when asked "what's the state of the project".
---

# Project Analysis

## Purpose
Produce an evidence-based picture of the repo so decisions rest on facts, not assumptions.

## When to activate
Start of TASK-001, before a large feature, when onboarding, or when `CLAUDE.md` section 1 may be stale.

## Workflow
1. `git status`, `git log --oneline -10` — note uncommitted user work (never revert it).
2. Read `package.json`, `vite.config.ts`, `tsconfig*.json`, `.oxlintrc.json`, `index.html`, `.gitignore`; check for `.github/`, test configs, `.env*`, `docs/`.
3. Map routes (`src/App.tsx`), data model (`src/types.ts`), store (`src/store/progress.ts`), design tokens/utilities (`src/index.css`).
4. Inventory content: count lessons per path/unit, questions, exercises; run a reference-integrity check (lesson → unit → quiz → question; exercise ids; starter files).
5. Run `npm run lint` and `npm run build`; record real output (and warnings such as chunk size).
6. Find debt: files >300 lines, duplication, `any`/`ts-ignore`, `console.*`, un-versioned persisted state, missing tests/CI, missing a11y basics.
7. Check `docs/research/` for the original research PDFs; if absent say so.

## Rules
- Verify every claim with a command or file read; label inferences as inferences.
- Read-only. Don't "fix while you're there".
- Update `CLAUDE.md` section 1 only if facts changed, and say what changed.

## Quality checklist
- [ ] Stack/scripts verified from files · [ ] Backend/DB/auth presence confirmed or absent · [ ] Content counts reproduced · [ ] Lint/build output captured · [ ] Debt items cite paths · [ ] Uncommitted changes noted

## Deliverables
A short audit (≤1 page): stack table, architecture notes, content inventory, health (lint/build), ranked debt list, open questions. Save to `.claude/tasks/reports/` if part of a task.

## Completion criteria
Another agent could start work using only the audit with no re-discovery of basics.
