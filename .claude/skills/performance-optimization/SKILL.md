---
name: performance-optimization
description: Measure and improve Office Academy performance — bundle size and code splitting, re-renders, animation cost, asset loading — with before/after evidence. Use for TASK-008 and when pages feel slow or the build warns about chunk size.
---

# Performance Optimization

## Purpose
Make the app fast on low-end office PCs and slow networks, proven by measurements.

## When to activate
Chunk-size warning, slow lesson/quiz pages, janky animation, new heavy dependency, pre-release.

## Workflow
1. **Baseline:** `npm run build`; list `dist/assets` sizes (`ls -l`, and gzip size via `gzip -c file | wc -c`). Record chunk warning text. Optionally Lighthouse/Performance panel via browser tooling if available.
2. **Diagnose:** what dominates the main chunk (data files in `src/data`, framer-motion, react-router, icons)? Which components re-render on store change (selectors)? Which animations are non-transform?
3. **Candidates (rank by gain/effort):**
   - Lazy-load routes (`React.lazy` + `Suspense` fallback that matches layout); load Word and Excel lesson data per path.
   - Import icons by name only (already tree-shaken) — verify.
   - Zustand selectors instead of whole-store reads.
   - Framer Motion `LazyMotion`/`m` components if bundle contribution is notable.
   - Pause/disable `AnimatedCursor`/`MotionEffects` when tab hidden, `prefers-reduced-motion`, or coarse pointer.
   - Limit `backdrop-filter` area/count.
   - Excel lab: cap ranges/recursion; memoize evaluation.
4. **Implement one at a time**; re-measure; keep only improvements.
5. Run lint, build; ask QA to regress navigation (lazy loading can break deep links/errors).

## Rules
- No optimization without measurement; no claimed gains that weren't observed.
- No behavior change; no new dependency for performance.
- Lazy routes need loading and error fallbacks.

## Quality checklist
- [ ] Baseline recorded · [ ] Method stated · [ ] Each change measured · [ ] No regressions · [ ] Reduced-motion intact

## Deliverables
Audit, ranked recommendations, implemented changes, before/after table (metric, before, after, method).

## Completion criteria
Numbers recorded; build/lint pass; QA regression recorded.
