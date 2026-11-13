---
name: frontend-development
description: Implement or modify React/TypeScript/Tailwind features in Office Academy following existing patterns — components, pages, routing, Zustand store, labs. Use for any code change under src/ (except pure lesson content).
---

# Frontend Development

## Purpose
Ship correct, minimal, consistent frontend changes that don't break existing learner progress or UX.

## When to activate
New page/component/feature, bug fix in UI or logic, store changes, lab behavior changes.

## Workflow
1. **Understand:** read the target files, their importers (`Grep` the symbol), and the closest similar component. Find the existing pattern before inventing one.
2. **Plan:** list files to touch, state shape changes, new types. Data shapes go in `src/types.ts` first.
3. **Implement:**
   - Function components, typed props, hooks at top level; derived values computed, not stored.
   - Zustand: subscribe with selectors (`useProgress(s => s.x)`), never the whole store.
   - New route → `src/App.tsx` + `XxxPage.tsx`; params validated (`useParams` → lookup → not-found UI).
   - Persisted state change → bump `persist` `version` and add `migrate`; wrap parsing defensively.
   - Reuse `.glass`, `.card`, `.btn-*`, `.prose-lesson`; Tailwind tokens, no hard-coded colours.
   - Handle loading/empty/error/success; text via data, not hard-coded in JSX where data exists.
4. **Verify:** `npm run lint`, `npm run build`, then run in `npm run dev`: golden path, empty/edge path, reload (persistence), light + dark, 360 px.
5. **Report** files changed + real command output.

## Rules
- No new dependency without approval. No `any`; no `dangerouslySetInnerHTML` with content.
- Never rename ids/storage keys without migration. Don't reformat unrelated code.
- Keep reduced-motion, print, and keyboard behavior intact.
- No `console.log` left behind.

## Quality checklist
- [ ] Follows existing pattern · [ ] Types strict · [ ] Hooks rules OK · [ ] States handled · [ ] Unknown ids safe · [ ] Both themes · [ ] Mobile · [ ] Keyboard · [ ] Lint+build pass · [ ] Diff minimal

## Deliverables
Working code, brief change summary, verification record, follow-ups noted.

## Completion criteria
Lint and build pass, feature observed working in the running app, no unrelated diff, nothing claimed that wasn't run.
