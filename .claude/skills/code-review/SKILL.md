---
name: code-review
description: Review Office Academy code changes for correctness, maintainability, architecture, error handling and performance with prioritized, evidence-backed findings. Use before marking work complete, and for review campaigns. (Distinct from the built-in /code-review command; this is the project's review standard.)
---

# Code Review (project standard)

## Purpose
Catch defects before they reach learners; keep the codebase coherent.

## When to activate
After implementation (TASK-002 gate), in TASK-004/009, or when asked to review a diff/branch/file.

## Workflow
1. Scope: `git status`, `git diff --stat`, `git diff`; include untracked files. Note that unrelated uncommitted work may be the user's.
2. Understand intent (task description/plan) before judging.
3. Read each changed file fully, and callers of changed exports.
4. Run `npm run lint` and `npm run build`.
5. Review in this order: **correctness → data/state integrity → error/empty states → security touchpoints → accessibility markup → performance → maintainability/naming → style**.
6. Write findings; drop anything unsubstantiated or label "possible".

## What to look for here
- Hooks: conditional hooks, missing/extra deps, effects that should be derived values.
- Persisted store: shape change without `version`/`migrate`; id renames.
- Data: dangling ids, duplicate ids, quiz `answer` index out of range, lesson check without question.
- Routes: unvalidated params; missing not-found.
- Unbounded loops/recursion in `formula.ts`.
- Duplication where a component/util exists; dead code; stray `console.*`; `any`.
- Whole-store Zustand subscriptions; animation of layout properties.
- Missing alt/labels/focus handling; colour-only meaning.

## Rules
- Correctness over style preference. Cite `path:line`. Explain *why it matters* with a failure scenario. Suggest a practical fix.
- Never approve with unresolved Critical/High. State what wasn't reviewed.
- Report; don't patch (unless the orchestrator reassigns).

## Quality checklist
- [ ] All changed files read · [ ] Lint/build run · [ ] Findings prioritized · [ ] Each has location+why+fix · [ ] Verdict stated

## Deliverables
Review report: verdict, findings by severity, recommended fixes, positives, scope/commands.

## Completion criteria
Verdict consistent with findings; orchestrator can act on every item without asking for clarification.
