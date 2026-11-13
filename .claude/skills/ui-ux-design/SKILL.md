---
name: ui-ux-design
description: Design and refine Office Academy's interface — glassmorphism, tokens, hierarchy, animation, responsive behavior, beginner-friendly flows. Use for UX audits, visual polish, design-system changes in src/index.css.
---

# UI/UX Design

## Purpose
Keep the interface modern, calm and clear for absolute beginners, without sacrificing accessibility or performance.

## When to activate
Visual refinements, new page layouts, animation work, UX audits, inconsistent styling reports.

## Design language
- **Surfaces:** `.glass` (cards), `.glass-strong` (nav/modals); subtle blur, 1 px translucent border, soft shadow. Don't stack more than two glass layers.
- **Colour:** `word-*` blue and `excel-*` green identify the apps; `ink-*` neutrals for text/surfaces; gradients subtle (low-contrast hue shift), never behind small text without a contrast check.
- **Type:** `--font-display` headings, `--font-sans` body; body ≥16 px, line-height ~1.6, lesson lines ≤ ~75 characters.
- **Space/shape:** consistent spacing steps, rounded corners from existing `.card`/`.btn` values.
- **Motion:** 150–400 ms ease-out, transform/opacity only; purposeful (feedback, orientation), never required to understand content.

## Workflow
1. Run the app; capture the current state in light/dark, desktop and 360 px.
2. Walk the learner journey (home → path → lesson → check → quiz → project → progress); list friction by impact.
3. Prefer changing tokens/utilities in `src/index.css` over per-component overrides.
4. Implement scoped changes; one primary action per view; clear empty/success/error states.
5. Verify: contrast (calculate), focus ring visible, reduced-motion, no layout shift, no horizontal scroll.

## Rules
- Preserve behavior and content. No new fonts, images or libraries without approval.
- Decoration must aid comprehension; remove otherwise.
- `backdrop-filter` has a cost: avoid on large scrolling regions and many elements; provide a solid fallback.
- Every animation has a reduced-motion path.

## Quality checklist
- [ ] Consistent tokens · [ ] Both themes · [ ] ≥4.5:1 text, ≥3:1 UI · [ ] Visible focus · [ ] Touch targets ≥44 px · [ ] 360 px OK · [ ] Reduced motion · [ ] Print unaffected

## Deliverables
UX audit (issue → evidence → fix → effort), design-system updates, implemented UI, before/after notes.

## Completion criteria
Checklist verified with observed evidence; build/lint pass; accessibility-specialist or QA hand-off recorded.
