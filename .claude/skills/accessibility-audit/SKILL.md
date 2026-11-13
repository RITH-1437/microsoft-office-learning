---
name: accessibility-audit
description: Audit Office Academy against WCAG 2.2 AA — semantics, keyboard, focus, contrast in both themes, screen-reader support, forms/quiz feedback, reduced motion, zoom/reflow. Use for accessibility audits and to verify UI changes.
---

# Accessibility Audit

## Purpose
Ensure learners with diverse abilities and devices can use every lesson, quiz and lab.

## When to activate
Any UI change, TASK-003/005/009, new interactive component, theme/token change.

## Workflow
1. **Static pass (JSX):** landmarks (`header/nav/main/footer`), one `h1` per page and no skipped levels, `lang` on `<html>`, buttons vs links, `alt`/`aria-hidden` on icons, `label`/`aria-label` on controls, `role="progressbar"` values, `aria-live` for quiz results and lab output.
2. **Keyboard pass (running app):** Tab through every page; operate quiz options, checks, labs, nav menu, theme toggle with keys only; no traps; focus visible; after route change focus/announcement moves to the new content (HashRouter SPA gap is common).
3. **Contrast:** compute ratios from actual token values for text, borders, focus rings, in **light and dark**, including text over glass/gradients. Normal text ≥4.5:1, large text/UI ≥3:1. Show the computed numbers.
4. **Non-colour cues:** correct/incorrect and status never colour-only.
5. **Motion:** `prefers-reduced-motion` honored in CSS and Framer Motion (`useReducedMotion`); no flashing; custom cursor effects optional and non-obstructive.
6. **Reflow/zoom:** 320–360 px width and 200%/400% zoom without horizontal scroll or clipped content; touch targets ≥24 px (aim 44).
7. **Content:** plain language, descriptive link text, tables with headers, visuals have text equivalents.
8. **Tools:** axe/Lighthouse only if actually runnable; real screen-reader testing (NVDA/VoiceOver) is manual — state whether done.

## Rules
- Cite WCAG SC numbers. Separate *confirmed failure* from *needs AT verification*. Don't claim conformance from automated checks alone.
- Fixes preserve visual design intent; propose token tweaks over one-offs.

## Quality checklist
- [ ] Semantics · [ ] Keyboard · [ ] Focus visible · [ ] Contrast both themes (numbers) · [ ] Live regions · [ ] Reduced motion · [ ] Reflow/zoom · [ ] Forms/errors

## Deliverables
Audit (issue, SC, location, severity, fix), prioritized fix list, post-fix verification.

## Completion criteria
All checklist areas have results; fixes verified or listed as open; limits of testing stated.
