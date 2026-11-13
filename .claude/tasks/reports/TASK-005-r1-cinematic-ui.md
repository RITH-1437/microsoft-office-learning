# Report — TASK-005-r1: Cinematic UI/UX & motion design transformation

- **Task ID:** TASK-005-r1
- **Objective:** Rethink the visual and motion experience of Office Academy (hero, dashboard, lessons, quizzes, global interactions) to a premium, cinematic standard while preserving all functionality, content, navigation and progress tracking, and keeping it fast and accessible.
- **Final status:** _see "Final status" at the end_
- **Execution mode:** Orchestrator performed design + implementation itself (single writer, no file-ownership conflicts); four subagents ran in parallel for read-only work: performance-engineer (baseline, then "after" measurement on a dist snapshot), qa-engineer, accessibility-specialist, code-reviewer.
- **Date:** 2026-11-14

## Assigned agents

| Agent | Role in this task | Files owned (edit) |
| --- | --- | --- |
| orchestrator (UI/UX designer + frontend developer roles) | Visual audit, motion spec, design system, implementation | all `src/` changes below |
| performance-engineer | Baseline + after measurements (headless Chrome/CDP script `perf-measure.mjs`) | none (scratchpad only) |
| qa-engineer | Functional/regression/responsive QA against the preview build | none |
| accessibility-specialist | WCAG 2.2 AA audit of new UI | none |
| code-reviewer | Review of the diff | none |

## Phase 1 — Visual audit (findings that drove the design)

- Stack verified: React 19, Vite 8, Tailwind v4 tokens in `src/index.css`, framer-motion 14.10 already installed but **unused** by the app (only CSS keyframes + a DOM `IntersectionObserver` reveal in uncommitted `MotionEffects.tsx`). No GSAP/Lottie needed → no dependency added.
- Uncommitted user work present (glass utilities, custom cursor, lesson "workflow" layout, Word foundations content). Preserved; built on top of it.
- Defects found in the existing tree and fixed as part of this task: (1) `MotionEffects` hid whole `<article>`s at an 8 % intersection threshold — a lesson article taller than ~12× the viewport could never reveal (blank lesson body); (2) lesson term chips were fixed `h-8 w-8` boxes, so multi-word terms ("Order of operations") overflowed onto the definition in both themes; (3) `AnimatedCursor` ran a `requestAnimationFrame` loop forever, even when the pointer was idle.
- Everything shipped in one 775 kB JS chunk (no route splitting).

## Phase 2 — Motion design specification (implemented)

| Area | Motion | Purpose |
| --- | --- | --- |
| Hero | Word-by-word masked headline rise (0.6 s, 40 ms stagger), eyebrow/copy/CTA stagger, floating Word + Excel document cards with 3-layer scroll parallax (desktop, motion allowed only), aurora gradient lighting, count-up stats | First-impression storytelling: "learn → do real work" |
| Dashboard | Staggered entrance, SVG progress rings drawing from 0, count-up percentages, learning-streak pill, 3D tilt + light sweep on track cards (fine pointer only) | Progress feels alive; Word = blue, Excel = green, Admin = violet |
| Scroll storytelling | Sections/cards reveal (fade + 22 px rise, sibling stagger 55 ms) as they enter the viewport; tutorial steps cascade left→right in view | Guides reading order without hijacking scroll |
| Navigation | Sliding active-link pill, top scroll-progress bar, theme icon morph (rotate/scale), mobile menu drop + item stagger, skip link | Orientation + feedback |
| Loading | Route-level code splitting with `RouteSkeleton` (pulsing logo + shimmer cards, `role="status"`) | Perceived speed, no layout shift |
| Lessons | Staggered step reveal, animated `<details>` explanation (progressive `interpolate-size`), completion panel turns green with a popping check + confetti burst, lift on prev/next cards | Satisfying completion, distraction-free reading |
| Quiz | Direction-aware question slide, tap scale + check pop on selection, score ring + count-up, confetti **only on pass**, staggered review list with explicit Correct/Incorrect badges | Immediate, understandable feedback; never colour-only |
| Micro-interactions | `.lift` hover depth, animated checklist checkbox, shake on wrong knowledge-check answer, pop on correct | Purposeful feedback |

Tokens: `src/lib/motion.ts` (`duration` 120/200/350/600/900 ms, `ease.out/inOut/spring`, `stagger`, variants) mirrored by CSS vars `--dur-*`, `--ease-cine`, `--ease-spring`. All animation is transform/opacity (plus `stroke-dashoffset` on the ring and width on the 6 px progress bar).

## Phase 3 — Design system

- Glass tiers: `.glass-nav` (sticky chrome, 16 px blur), `.glass-panel` (floating cards, highlight reflection, layered shadow, 20 px blur), `.surface-solid` (reading content/lists, **no blur**), identity washes `.tint-word/.tint-excel/.tint-admin`; `@supports not (backdrop-filter)` fallback to near-solid. Lesson prose, terms, quiz review and tables use solid surfaces.
- Typography: `.display-hero` (clamp 2.4–3.9 rem, tight tracking), `.display-section`, `.eyebrow`, `.reading` (68 ch, 1.75 lh). New `--color-admin-*` violet scale for administrative skills.
- Utilities: `.lift`, `.tilt-card/.tilt-glow`, `.skeleton`, `.logo-pulse`, `.anim-pop/.anim-shake/.anim-rise`, `.nav-indicator`, `.check-box`, `.scroll-progress`, `.float-slow`, `.hero-aurora`.
- Reduced motion: CSS overrides + `MotionConfig reducedMotion="user"` + hooks; expensive effects (orbs, float, parallax, tilt, cursor) disabled < 900 px or on coarse pointers.

## Files inspected

`package.json`, `vite.config.ts`, `index.html`, `src/index.css`, `src/App.tsx`, `src/main.tsx`, `src/types.ts`, `src/store/progress.ts`, `src/data/curriculum.ts`, all of `src/components/*`, `src/pages/HomePage.tsx`, `LessonPage.tsx`, `ProgressPage.tsx`, `QuizPage.tsx`, `PracticeDetailPage.tsx`, `git diff` of the pre-existing uncommitted work.

## Files changed

New: `src/lib/motion.ts`, `src/lib/streak.ts`, `src/components/Hero.tsx`, `src/components/DashboardSummary.tsx`, `src/components/motion/{MotionProvider,CountUp,ProgressRing,TiltCard,Confetti,RouteSkeleton}.tsx`.
Modified: `src/App.tsx`, `src/components/{Layout,MotionEffects,AnimatedCursor,PathCard,QuizRunner,LessonCheck}.tsx`, `src/pages/{HomePage,LessonPage,ProgressPage,PracticeDetailPage,PracticePage,ExcelLabPage,WordLabPage}.tsx` (the last three: hover utilities → `.lift`), `src/index.css`, `README.md`, `CLAUDE.md`, `.claude/tasks/task-board.md`.
Dependencies added/removed: **none** (framer-motion was already a dependency; now actually used via `LazyMotion` + `domAnimation`).

## Tests executed and results (orchestrator)

| Check | Command / method | Result |
| --- | --- | --- |
| Type check | `npx tsc -b` | clean |
| Lint | `npm run lint` (oxlint) | clean (0 warnings) |
| Build | `npm run build` | passes; main chunk 712.6 kB / 224.6 kB gzip + 18 route chunks (LessonPage 28 kB, ExcelLab 18 kB, …); chunk-size warning remains (lesson/quiz data ≈ 410 kB of TS source lives in the entry chunk because the home dashboard reads all paths) |
| Visual verification | headless Chrome via CDP (`scratchpad/shot.mjs`) — home, lesson (w1-1, e3-2), quiz (wc1), progress, practice (word-1) at 1280×900 and 390×844 (mobile emulation), light + dark, reduced motion, full-page after scripted scroll | all pages render fully; `horizontalOverflow:false` on every capture; 0 console errors on every capture |
| Reveal integrity | eval after full scroll: elements still `.motion-reveal` and elements at computed `opacity:0` in `main` | 0 / 0 on home (desktop + mobile) and lesson e3-2 |
| Device gating | eval under touch emulation | `pointer:fine=false`, cursor layer absent |
| Flows | scripted: answer 6 questions + submit → result ring/badges; mark lesson complete → green completion panel, sidebar tick, path 6 %; practice checklist click → checked | all as expected |
| Performance | performance-engineer baseline (see below) and after-run on a dist snapshot | _pending at time of writing_ |

## Agent findings

### Performance (performance-engineer)

Baseline (pre-change tree, headless Chrome, median of 2 runs): single `index` chunk 774.7 kB raw / 226 kB gzip; FCP 240–484 ms desktop 1×, LCP ≤ 660 ms; ~60 fps on a 3 s scripted scroll with ≤ 0.5 frames > 20 ms on every route even at 4× CPU throttle; 0 console errors. Limitation: headless (no GPU), so blur/backdrop cost is under-reported.

After: _pending — filled in below once the background run completes._

### QA (qa-engineer)

_pending_

### Accessibility (accessibility-specialist)

_pending_

### Code review (code-reviewer)

_pending_

## Quality gates

| Gate | Status | Evidence or reason |
| --- | --- | --- |
| G1 Requirements | PASS | Mission phases 1–10 mapped to the spec above |
| G2 Implementation | PASS | Files changed listed; diff limited to UI/motion + docs; no data/content changes |
| G3 Build | PASS | tsc, oxlint, vite build clean |
| G4 Tests | PASS (substitute) | No runner exists; scripted CDP flows + visual captures recorded above |
| G5 QA reviewed | _pending_ | |
| G6 Critical bugs | _pending_ | |
| G7 Code review | _pending_ | |
| G8 Security | PASS | No new input surfaces, storage shape unchanged, no new deps, no external resources added |
| G9 Accessibility | _pending_ | |
| G10 Documentation | PASS | README + CLAUDE.md §3/§5 updated; this report; task board |

## Outstanding issues

_pending_

## Risks

- `interpolate-size` / `::details-content` animation is progressive (Chrome 129+); other browsers snap open/closed — functionality unaffected.
- Headless measurements under-report compositor cost of `backdrop-filter`; the glass count per view was kept small and blur ≤ 20 px, with solid surfaces for content.
- The entry chunk still carries all lesson/quiz data (~410 kB source). Splitting data per path is an architectural follow-up (TASK-008), not attempted here to avoid touching `curriculum.ts` consumers.

## Not verified / limitations

- No real screen-reader (NVDA/VoiceOver) session; semantics verified statically and via DOM inspection only.
- No real-device (touch hardware, low-end GPU) frame measurements; headless Chrome only.
- Safari/Firefox not exercised.
