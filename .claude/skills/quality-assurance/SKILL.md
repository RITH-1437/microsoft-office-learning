---
name: quality-assurance
description: Plan and run structured QA on Office Academy — functional, regression, UI, responsive and edge-case testing of lessons, quizzes, scoring, progress, labs and navigation — and report reproducible bugs with severity. Use for QA campaigns and verifying fixes.
---

# Quality Assurance

## Purpose
Establish, with evidence, what works and what doesn't.

## When to activate
After implementation, before release, on bug reports, in TASK-003/009.

## Workflow
1. **Plan:** list cases per area; include negative and edge cases.
2. **Static gates:** `npm run lint`, `npm run build`; record output.
3. **Execute** against `npm run dev` (or `preview`); for logic, write scratch scripts (scratchpad dir, not repo) that import modules via a TS runner if available.
4. **Record** each case: steps, expected, actual, pass/fail.
5. **Bugs:** reproduce twice; minimal steps; severity; suspected file.
6. **Verify fixes** and re-run adjacent cases (regression).

## Core test matrix
- **Quiz:** answer all right/all wrong/mixed; pass threshold boundary; retake updates best vs last; attempts count; unanswered handling; keyboard-only completion.
- **Progress:** mark/unmark lesson; percentages on path & progress pages; last-lesson resume; reload persistence; empty/corrupt `localStorage` (`{}` , invalid JSON, old shape); reset.
- **Navigation:** every route; deep links with refresh; unknown lesson/quiz/exercise ids; back/forward; 404.
- **Labs:** Word (bold/italic/underline, alignment, lists, colour, word count with empty/whitespace/unicode); Excel (each function, ranges, absolute/relative refs, nested IF, VLOOKUP exact/miss, blanks/text, divide by zero, circular refs, huge ranges, error codes).
- **Downloads:** each starter file content/filename/encoding.
- **UI:** light/dark, 360/768/1280 px, print, reduced motion, long text, zoom 200%.
- **Data integrity:** all cross-references resolve; counts match README claims.

## Rules
- Never mark a case passed without running it; never assume. Distinguish *failed* from *not tested*.
- Severity: Critical / High / Medium / Low as defined in `qa-engineer`. Do not inflate or hide.
- Don't edit application code during testing (report instead).

## Quality checklist
- [ ] All planned cases have results · [ ] Bugs reproducible · [ ] Severity justified · [ ] Regression run after fixes · [ ] Untested areas listed

## Deliverables
QA report (matrix, bug list, regression results) in `.claude/tasks/reports/`.

## Completion criteria
Zero open Critical issues or an explicit BLOCKED status; every Critical/High bug has verified reproduction steps.
