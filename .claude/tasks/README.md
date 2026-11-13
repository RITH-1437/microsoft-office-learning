# Multi-Agent Task System

How work is coordinated in this repo. The **main Claude session is the orchestrator**.

| File | Purpose |
|---|---|
| `task-workflow.md` | Orchestration procedure, file-ownership rules, and the 9 reusable task templates (TASK-001…009) |
| `quality-gates.md` | The 10 gates and which gates each task type requires |
| `task-board.md` | Live board: every task, its status, owner agents, report link |
| `reports/` | One report per task (`TASK-<nnn>-<slug>.md`), format in `reports/_TEMPLATE.md` |

## Quick start
1. Pick the template in `task-workflow.md` that matches the request (or combine).
2. Add a row to `task-board.md` (status `PLANNED`, new run number e.g. `TASK-002-r1`).
3. Follow the orchestration procedure; update the board at every status change.
4. Write the report from `reports/_TEMPLATE.md`; close the task only when the required gates pass.

## Statuses
`PLANNED` → `IN_PROGRESS` → `REVIEW` → `QA` → `COMPLETED`; any state may go to `BLOCKED` (needs a decision/input) or `FAILED` (gates can't be met; report why).

## Agents and skills
Agents: `.claude/agents/*.md`. Skills: `.claude/skills/*/SKILL.md`. Roles map to skills: architect→project-analysis, frontend→frontend-development, designer→ui-ux-design, education→educational-content, QA→quality-assurance, reviewer→code-review, security→security-audit, performance→performance-optimization, accessibility→accessibility-audit, devops→deployment.

## Honesty rules
- If subagents can't run (tool unavailable or not permitted), the orchestrator performs each role **sequentially** and the report says "executed sequentially by the orchestrator". Never claim parallel agents ran when they didn't.
- Failed tests and open findings are always reported, never omitted.
