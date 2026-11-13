# Quality Gates

A task is `COMPLETED` only when every **required** gate passes. An omitted gate must be listed in the report as `OMITTED — reason`. Failed tests and unresolved findings are never hidden.

| # | Gate | Pass criteria | Evidence |
|---|---|---|---|
| G1 | Requirements understood | Goal, scope, non-goals and acceptance criteria written down (and confirmed by the user if ambiguous) | Task plan in report |
| G2 | Implementation completed | All planned changes made; diff limited to assigned files; no stray debug code | `git diff --stat` |
| G3 | Build succeeds | `npm run build` exits 0 (warnings noted); `npm run lint` has no errors | Command output |
| G4 | Tests pass | Existing tests pass; new tests for important logic. Today **no runner exists** → substitute: data-integrity check + scripted/manual cases, and say so | Output / test matrix |
| G5 | QA findings reviewed | QA report exists; every finding is fixed, accepted with reason, or ticketed | QA report |
| G6 | Critical bugs resolved | Zero open Critical; zero open High unless the user accepted the risk explicitly | Bug list |
| G7 | Code review completed | Reviewer verdict not "CHANGES REQUESTED"; Critical/High resolved | Review report |
| G8 | Security impact considered | Change checked against `security-audit` touchpoints (input, storage, downloads, deps, secrets); result noted even if "none" | Note/report |
| G9 | Accessibility checked | Keyboard, focus, contrast (both themes), reduced motion checked for UI changes | A11y notes |
| G10 | Documentation updated | README/CLAUDE.md/content counts/task board reflect the change | Diff |

## Required gates by task type

| Task | G1 | G2 | G3 | G4 | G5 | G6 | G7 | G8 | G9 | G10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 001 Project Audit | ✔ | – | ✔ | – | ✔ | ✔ | ✔ | ✔ | – | ✔ |
| 002 Feature Development | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| 003 AI QA Campaign | ✔ | ✔* | ✔ | ✔ | ✔ | ✔ | – | ✔ | ✔ | ✔ |
| 004 Code Review Campaign | ✔ | – | ✔ | – | – | ✔ | ✔ | ✔ | – | ✔ |
| 005 UI/UX Improvement | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| 006 Educational Content | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | – | ✔ | ✔ |
| 007 Security Audit | ✔ | – | ✔ | – | – | ✔ | ✔ | ✔ | – | ✔ |
| 008 Performance Audit | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| 009 Pre-Release | ✔ | – | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |

✔ required · – may be omitted (state why) · ✔* only if fixes are made during the campaign.

## Rules
- Gate failure → task goes back to `IN_PROGRESS` (or `BLOCKED`/`FAILED`), never `COMPLETED`.
- "It should work" is not evidence. Paste the command and result summary.
- The orchestrator signs off each gate in the report with PASS / FAIL / OMITTED(reason).
