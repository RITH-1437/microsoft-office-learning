# Task Workflow

## Part A — Orchestration procedure (main session)

1. **Understand.** Restate the request, scope, non-goals, acceptance criteria. Ask the user only if ambiguity changes the work (G1).
2. **Pick template** from Part B; register a run on `task-board.md` (`PLANNED`).
3. **Decompose** into tasks small enough for one agent, each with: owner agent, inputs, files it may edit, expected output.
4. **Map dependencies.** Typical order: architect plan → (designer / education / developer) implementation → QA → reviewer → specialist audits. Tasks with no dependency run in parallel.
5. **File ownership (hard rule).** Before dispatch, assign each file to **at most one writing agent**. Two agents never edit the same file at once. If two need the same file, serialize them or have one return a proposed diff for the owner to apply. Read-only agents (architect, QA, reviewer, security, accessibility audits) never edit application files.
6. **Dispatch.** Use the Agent tool with `subagent_type` = the agent name (e.g. `frontend-developer`) and a self-contained prompt: goal, context links (`CLAUDE.md`, relevant skill), owned files, constraints, required report format. Send independent agents in **one message** so they run in parallel. Subagents start cold — include everything they need.
   - If a named agent type isn't available in the session, use `general-purpose` with the agent file's content as instructions; if subagents are unavailable entirely, **run the roles sequentially yourself** and record "sequential" in the report. Never claim parallel execution that didn't happen.
7. **Coordinate.** Read each result critically (an agent's summary describes intent, not necessarily what changed — check the diff). Resolve conflicting recommendations: prefer correctness > accessibility/security > consistency with existing conventions > polish; record the decision and the reason in the report. Escalate to the user when it's a product decision.
8. **Integrate.** Apply/approve changes; ensure the combined diff builds. Re-run `npm run lint` and `npm run build` yourself — don't trust a subagent's "passes".
9. **QA** (`qa-engineer`) on the integrated result; fix loop with the owning developer agent.
10. **Code review** (`code-reviewer`) on the final diff; fix loop.
11. **Verify** gates per `quality-gates.md`; sign each PASS/FAIL/OMITTED.
12. **Report** from `reports/_TEMPLATE.md` → `reports/TASK-<nnn>-r<n>-<slug>.md`; set the final board status.

### Status transitions
`PLANNED` → `IN_PROGRESS` (work started) → `REVIEW` (implementation done, reviewer running) → `QA` (testing/regression) → `COMPLETED` (all required gates PASS). `BLOCKED` = waiting on a user decision/input/external fact (state what). `FAILED` = gates can't be met; keep the report and say why.

### Handoff message format (orchestrator → agent)
```
Task: TASK-00X-rN <title>
Goal: …
Read first: CLAUDE.md, .claude/skills/<skill>/SKILL.md
You may edit ONLY: <files/dirs>   (read anything)
Do not: <constraints>
Return: <report sections>; include commands you ran and their real output
```

---

## Part B — Task templates

Each template: **Agents · Goal · Inputs · Steps · Outputs · Required gates**. Gates refer to `quality-gates.md`.

### TASK-001: Project Audit
- **Agents:** project-architect, code-reviewer, security-engineer, qa-engineer (all read-only; parallel).
- **Goal:** Understand current state and identify technical problems.
- **Steps:** (1) Orchestrator runs `project-analysis` baseline (lint, build, git status). (2) Parallel: architect → architecture/debt audit; reviewer → quality sweep of largest/most-changed files; security → `security-audit`; QA → smoke matrix + data integrity. (3) Orchestrator merges, de-duplicates, ranks.
- **Outputs:** consolidated audit with ranked findings (Critical→Low), recommended follow-up tasks added to the board.
- **Gates:** G1 G3 G5 G6 G7 G8 G10.

### TASK-002: Feature Development
- **Agents:** project-architect, frontend-developer, ui-ux-designer, qa-engineer, code-reviewer (+ education-specialist if content is involved).
- **Goal:** Plan, implement, test and review a requested feature.
- **Steps:** (1) Architect plan: data shape (`types.ts`), files, persistence/migration, risks → orchestrator approves. (2) Designer: UX/visual spec (parallel with step 1 where independent). (3) Frontend implements logic/pages; designer implements styling in **separate** files (`src/index.css` vs components) or sequentially. (4) Orchestrator integrates, runs lint+build. (5) QA tests; fix loop. (6) Reviewer reviews final diff; fix loop. (7) Docs updated (README/CLAUDE.md).
- **Outputs:** working feature, QA report, review report, task report.
- **Gates:** all of G1–G10.

### TASK-003: AI QA Campaign
- **Agents:** qa-engineer, frontend-developer, security-engineer, accessibility-specialist.
- **Goal:** Test systematically, reproduce issues, verify fixes.
- **Steps:** (1) QA builds the test matrix (`quality-assurance` skill). (2) Parallel: QA functional/regression; security input/storage checks; accessibility smoke. (3) Orchestrator triages bugs by severity and assigns fixes to frontend-developer (one file owner at a time). (4) QA re-verifies each fix + neighbors.
- **Outputs:** QA report, bug list with reproduction steps, fix verification table.
- **Gates:** G1 G2* G3 G4 G5 G6 G8 G9 G10.

### TASK-004: Code Review Campaign
- **Agents:** code-reviewer, project-architect, security-engineer (read-only; parallel).
- **Goal:** Review implementation quality, security, maintainability, architecture.
- **Steps:** Define scope (diff range or directories) → parallel reviews → orchestrator merges and removes duplicates/conflicts → ranked fix list.
- **Outputs:** consolidated review report with verdict and fix backlog.
- **Gates:** G1 G3 G6 G7 G8 G10.

### TASK-005: UI/UX Improvement
- **Agents:** ui-ux-designer, frontend-developer, accessibility-specialist, qa-engineer.
- **Goal:** Improve the interface while preserving functionality and accessibility.
- **Steps:** (1) Designer audit + plan (screenshots/notes, both themes). (2) Accessibility baseline in parallel. (3) Implement scoped changes (designer owns CSS/tokens, developer owns component logic; no shared files in parallel). (4) Accessibility verifies contrast/keyboard/motion. (5) QA regression (functionality unchanged, responsive, print). (6) Review.
- **Outputs:** UX audit, implemented changes, accessibility verification, regression results.
- **Gates:** all G1–G10.

### TASK-006: Educational Content Creation
- **Agents:** education-specialist, qa-engineer, project-architect (+ frontend-developer only if `types.ts`/rendering must change).
- **Goal:** Accurate, beginner-friendly lessons, practical assignments and assessments.
- **Steps:** (1) Architect confirms data/curriculum placement and id plan. (2) Education writes content in `src/data/**` (sole owner of those files). (3) Orchestrator runs build + id-integrity check. (4) QA follows every tutorial step literally and takes every quiz; reports ambiguity/wrong answers. (5) Education fixes; list unverified facts for the user.
- **Outputs:** content, fact-verification list, QA report.
- **Gates:** G1 G2 G3 G4 G5 G6 G7 G9 G10 (G8 omitted unless content adds downloads/links).

### TASK-007: Security Audit
- **Agents:** security-engineer, project-architect, code-reviewer.
- **Goal:** Inspect controls and provide prioritized remediation.
- **Steps:** Security runs `security-audit`; architect evaluates structural weaknesses (storage, formula engine boundaries, hosting); reviewer inspects flagged code for exploitability → orchestrator ranks; fixes become TASK-002 runs.
- **Outputs:** security report with N/A controls evidenced, remediation backlog.
- **Gates:** G1 G3 G6 G7 G8 G10.

### TASK-008: Performance Audit
- **Agents:** performance-engineer, frontend-developer, project-architect.
- **Goal:** Find bottlenecks and implement verified improvements.
- **Steps:** (1) Baseline measurements. (2) Architect reviews proposed splitting/lazy strategy. (3) Implement **one** optimization at a time (performance-engineer or frontend-developer, single owner per file); re-measure. (4) QA regression on routing/deep links. (5) Review.
- **Outputs:** before/after table, implemented changes, regression results.
- **Gates:** all G1–G10.

### TASK-009: Pre-Release Verification
- **Agents:** qa-engineer, code-reviewer, security-engineer, performance-engineer, accessibility-specialist, devops-engineer.
- **Goal:** Verify release readiness.
- **Steps:** (1) DevOps: clean install, lint, build, preview smoke, dist contents. (2) Parallel read-only audits: QA full regression, reviewer on diff since last release, security (incl. `npm audit`), performance measurements, accessibility. (3) Orchestrator compiles a go/no-go with open issues. (4) Any fix → TASK-002 mini-run and re-verify affected gates.
- **Outputs:** release readiness report: **GO / NO-GO**, open issues, gate table, deployment checklist.
- **Gates:** G1 G3 G4 G5 G6 G7 G8 G9 G10 (G2 only if fixes made).

---

## Part C — Conflict and risk rules
- Disagreement between agents: decide by the priority order in step 7 and write the rationale in the report.
- A subagent reporting success without command output is treated as **unverified** until the orchestrator re-runs the check.
- Uncommitted work already in the tree (see `git status` at task start) is the user's: don't revert, and keep your changes distinguishable.
- Never push, deploy, delete branches or publish without explicit user instruction.
