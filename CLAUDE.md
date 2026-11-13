# CLAUDE.md — Office Academy (Microsoft Word & Excel learning platform)

Operating manual for Claude in this repo. Detailed workflows live in `.claude/skills/`, role definitions in `.claude/agents/`, coordination in `.claude/tasks/`. Keep this file short; do not copy it into those files.

## 1. Project audit (verified, not assumed)

| Item | Fact |
| --- | --- |
| App | `office-academy` — static single-page app, 38 lessons (17 Word, 21 Excel), 10 quizzes (110 questions), 12 practical projects, 2 in-browser labs |
| Frontend | React 19, TypeScript (strict via `tsconfig.app.json`), Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `src/index.css`), react-router-dom 7 (**HashRouter**), Framer Motion, lucide-react |
| State | Zustand + `persist` → `localStorage` (`src/store/progress.ts`) |
| Backend / DB / Auth | **None.** No API, no accounts, no server. Progress is per-browser only |
| Package manager | npm (`package-lock.json`) |
| Scripts | `npm run dev`, `npm run build` (= `tsc -b && vite build`), `npm run lint` (Oxlint), `npm run preview` |
| Tests | **None configured.** No runner, no CI/CD (`.github/` absent) |
| Deployment | Static `dist/`; `base: './'` + HashRouter so any static host / GitHub Pages works |
| Research PDFs | Not present in the repo at setup time. If the user supplies them, put them in `docs/research/` and never modify them |
| Baseline (2026-11-14) | `npm run lint` clean; `npm run build` passes (one chunk >500 kB warning) |

Rules that follow from this: never invent an API, database or auth layer; if one is requested, run TASK-002 with the Project Architect first and update this file.

## 2. Business objective & learner

Teach **absolute beginners** (admin/office staff, career changers, often non-native English readers, often on shared or low-end PCs) to use Word and Excel confidently for real administrative work. Success = a learner can finish a lesson, pass a quiz, and complete a practical project without outside help. Content must be accurate for Microsoft 365 / Office 2019+ on Windows, with Mac shortcuts where known.

## 3. Architecture & folder structure

```text
src/
  App.tsx              Route table (HashRouter; every page except Home is a lazy route under <Layout/>, inside MotionProvider)
  components/          Layout, Hero, DashboardSummary, QuizRunner, LessonCheck, VisualBlock, PathCard, LogoMark, AnimatedCursor, MotionEffects
    motion/            MotionProvider, CountUp, ProgressRing, TiltCard, Confetti, RouteSkeleton (reusable motion primitives)
  data/
    curriculum.ts      Paths, units, lookups, progress helpers (single source of truth for structure)
    lessons/           word-*.ts, excel-*.ts content; word.ts / excel.ts aggregate them
    questions/         lessonChecks.ts, quizzes.ts, index.ts
    exercises.ts       12 projects + starter files
    resources.ts       shortcuts, glossary, FAQ
  lib/                 formula.ts (Excel-lab engine), utils.ts, motion.ts (motion tokens, variants, media hooks), streak.ts
  pages/               one file per route, `XxxPage.tsx`
  store/progress.ts    the only global store
  types.ts             shared data model (Lesson, Quiz, Exercise, Visual …)
```

Content is **typed data, not hard-coded JSX**: new lessons/questions/exercises are added to `src/data/**` conforming to `src/types.ts`; pages render them. Extend `types.ts` before adding new content shapes.

## 4. Conventions

- **Naming:** components/pages `PascalCase.tsx` (pages end in `Page`); data/lib/store `camelCase.ts` or kebab for lesson files (`word-foundations.ts`); ids are kebab-case strings, unique and stable (they key saved progress — renaming an id silently erases users' progress).
- **Components:** function components + hooks, one default export per component file, props typed with an interface. Reuse `.glass`, `.glass-strong`, `.card`, `.btn-primary/-secondary/-ghost`, `.prose-lesson` from `src/index.css` and existing components before writing new ones. Keep files focused; split when a component exceeds ~300 lines or mixes concerns.
- **Types:** no `any`; no `@ts-ignore` without a comment explaining why. Oxlint rules: `react/rules-of-hooks` is an error.
- **Styling:** Tailwind utilities + tokens (`--color-word-*` blue, `--color-excel-*` green, `--color-ink-*` neutrals). Light and dark themes (`.dark` class) must both work. No new colour literals when a token exists.
- **API / DB conventions:** none exist. Data access is import-from-`src/data`. Persisted store changes need a `persist` `version` + `migrate` so old localStorage keeps working.
- **Auth/authz:** not applicable today. Do not add fake login UI.
- **Errors & states:** every data-driven view handles loading (if async), empty, error and success. Unknown route ids (`lesson/:lessonId`, `quizzes/:quizId`, …) must render a friendly not-found state, never crash. Wrap `localStorage`/`JSON` access defensively.
- **Logging:** no `console.log` in committed code. `console.error` only for genuinely unexpected failures. Never log learner data.
- **Dependencies:** avoid adding any. Justify size, maintenance, and why existing tools can't do it. Bundle is already >500 kB: prefer lazy routes over new libraries.

## 5. UI/UX, animation, accessibility

- Direction: modern, clean, professional, beginner-friendly; soft glass surfaces, subtle gradients, smooth short transitions, accessible contrast. No decoration that doesn't aid comprehension.
- Motion system (single source of truth): tokens in `src/lib/motion.ts` (`duration`, `ease`, `stagger`, variants `fadeUp`/`scaleIn`/`slideStep`/`staggerContainer`) mirrored as CSS vars `--dur-*`/`--ease-cine`/`--ease-spring` in `src/index.css`. Framer Motion is loaded once via `MotionProvider` (`LazyMotion` + `domAnimation`, **strict**: use `m.*`, never `motion.*`) with `MotionConfig reducedMotion="user"`. Hooks: `usePrefersReducedMotion`, `useRichMotion` (parallax/float/tilt only on ≥900 px + motion allowed), `useFinePointer`.
- Animation rules: 120–600 ms, transform/opacity only; continuous motion (orbs, floating cards) desktop-only and off under reduced motion; celebrations (`Confetti`) only for real achievements (quiz pass, lesson complete). Scroll reveals come from `MotionEffects` (sections/`.card`/`.glass` inside `<main>`): sections that animate themselves get `data-no-reveal`; never put Tailwind `transition*` utilities on a reveal target (utilities layer overrides the reveal) — use `.lift` for hover depth.
- Glass tiers in `src/index.css`: `.glass-nav` (sticky chrome), `.glass-panel` (floating cards/dashboard), `.surface-solid` (reading content, tables, lists — no blur), identity washes `.tint-word` / `.tint-excel` / `.tint-admin`. Keep lesson prose on solid surfaces.
- Decorative pointer effects (`AnimatedCursor`) only for `pointer: fine`, never block interaction. Loading: lazy routes fall back to `RouteSkeleton` (same layout footprint, `role="status"`).
- Accessibility (WCAG 2.2 AA target): semantic landmarks/headings, full keyboard operation, visible focus, ≥4.5:1 text contrast in **both** themes (glass backgrounds included), labelled controls, quiz feedback not by colour alone, `aria-live` for dynamic results, 44 px touch targets, print styles keep working.
- Responsive from 360 px wide up. No horizontal page scroll.

## 6. Educational content standards

Every lesson (type `Lesson`) must have: objectives, plain-language `why`/`explain`, at least one click-level tutorial with exact menu/tab names and shortcuts, a visual, a worked example, guided + independent practice, a knowledge check that resolves to a real question, a summary. Rules: one concept at a time, define jargon on first use (`terms`), short sentences, active voice, no unexplained assumptions, UI names match current Microsoft 365 wording, shortcuts verified. Each quiz question has one unambiguous correct answer and an explanation that teaches. Full workflow: `educational-content` skill.

## 7. Testing & verification

There is no test runner. Until one is approved (recommended: Vitest + Testing Library; ask first), "tested" means:
1. `npm run lint` and `npm run build` pass (report real output).
2. Data integrity check (ids resolve: lessons↔units↔quizzes↔questions↔exercises) after any `src/data` change.
3. The change was exercised in the running app (`npm run dev`, `run` skill) including both themes and a narrow viewport for UI work.
4. Pure logic (`src/lib/formula.ts`, scoring, progress) gets unit tests once a runner exists; until then verify with a scratch script and report it.

**Never claim a task is complete without stating what you ran and what it printed.** If something couldn't be verified, say so.

## 8. Security

Client-only app, so the main risks are: XSS (no `dangerouslySetInnerHTML` with content; the Word lab must treat typed text as text), unsafe downloads (starter files are generated from static data — keep it that way), `localStorage` tampering (validate shape when reading), dependency vulnerabilities (`npm audit`), and secrets (none needed; never commit `.env*`, keys, tokens). Validate all user input in labs/forms. Third-party scripts/fonts need justification.

## 9. Git & deployment

- Branch from `main` (`feat/…`, `fix/…`, `content/…`, `chore/…`); small focused commits with imperative messages. Never force-push `main`, never skip hooks, never commit `dist/`, `node_modules/`, secrets. Commit/push only when the user asks.
- Release check: lint + build + preview smoke test (HashRouter deep-link refresh works, assets load with relative base). Details: `deployment` skill.

## 10. Mandatory principles

1. Read and understand existing code before changing it. 2. Never overwrite working behaviour without justification. 3. Avoid unnecessary dependencies. 4. Reuse existing components/utilities. 5. Keep code modular. 6. Follow existing conventions. 7. Never expose secrets. 8. Validate input. 9. Handle loading/empty/error/success. 10. Add tests for important logic (or report why not). 11. Test before reporting. 12. No completion claims without verification.

Also: the working tree may contain uncommitted user work — never revert or discard changes you didn't make.

## 11. Multi-agent system

- Agents: `.claude/agents/` (project-architect, frontend-developer, ui-ux-designer, education-specialist, qa-engineer, code-reviewer, security-engineer, performance-engineer, accessibility-specialist, devops-engineer).
- Skills: `.claude/skills/<name>/SKILL.md` (project-analysis, frontend-development, ui-ux-design, educational-content, quality-assurance, code-review, security-audit, performance-optimization, accessibility-audit, deployment).
- Orchestration: `.claude/tasks/` — read `README.md` and `task-workflow.md` before coordinating work; track in `task-board.md`; gates in `quality-gates.md`; reports in `reports/`.
- The main session is the **orchestrator**. It delegates with the Agent tool when available, runs independent tasks in parallel, and **never lets two agents edit the same file at once**. If subagents are unavailable it performs the roles sequentially and says so — it never pretends parallel agents ran.
- Read-only roles (architect, QA, reviewer, security, performance, accessibility audits) report; only the orchestrator-approved implementer roles (frontend-developer, ui-ux-designer, education-specialist, devops-engineer) edit files.
