---
name: educational-content
description: Create, extend and validate beginner-friendly Word and Excel lessons, knowledge checks, quizzes and practical admin projects in Office Academy's typed data files. Use for any change to src/data/lessons, questions, exercises, resources or curriculum.
---

# Educational Content

## Purpose
Produce accurate, step-by-step, beginner-safe learning material that fits the data model and renders correctly.

## When to activate
New/edited lesson, quiz, project, glossary/shortcut entry; curriculum reorganization; content accuracy review; research-document analysis.

## Workflow
1. **Source:** use `docs/research/*.pdf` if present (never modify them); otherwise rely on established Microsoft documentation knowledge and flag unverified facts.
2. **Study the pattern:** read two lessons in the same unit and the `Lesson` type (`src/types.ts`).
3. **Objectives first** (observable verbs: "Save a document as PDF"), then design content to meet each.
4. **Write the lesson:** `why` (relevance to office work) → `explain` (short paragraphs, one concept each) → `terms` (jargon) → `tutorials` (exact path e.g. *Home tab → Font group → Bold*, plus shortcut) → `visual` → `example` (realistic admin scenario) → `guided` and `independent` practice with `expected` outcomes → `knowledgeCheck` id → `summary` → `nextTeaser`.
5. **Assess:** question per lesson in `lessonChecks.ts`; unit/final questions in `quizzes.ts`; each has 1 correct answer, plausible distractors, teaching explanation.
6. **Projects:** realistic task (invoice, rota, attendance, letter), starter file, ordered steps, hints, measurable `criteria`, `deliverable`.
7. **Register:** add ids to `curriculum.ts` units; keep ids kebab-case, unique, stable.
8. **Validate:** `npm run build` (types) + id-integrity check + read the lesson in the running app.

## Rules
- One concept at a time; sentences short; active voice; define every term at first use; no assumed knowledge; no jokes at the learner's expense.
- Use current Microsoft 365 wording; shortcuts are Windows first, Mac in `mac` fields when sure. If unsure, don't state it — list it for verification.
- Never reuse, rename or delete existing ids. Don't copy text from copyrighted sources; write originals.
- Practice must be doable in the built-in labs or in real Office with provided starters.

## Quality checklist
- [ ] Objectives measurable · [ ] Every objective taught and assessed · [ ] Tutorial steps exact and ordered · [ ] Example realistic · [ ] Practice has expected results · [ ] Check resolves · [ ] Reading level plain · [ ] No unverified shortcut · [ ] Types/build pass · [ ] Ids resolve

## Deliverables
Content data changes, list of facts needing external verification, curriculum notes.

## Completion criteria
Build passes, integrity check clean, a reviewer (qa-engineer) can follow each tutorial step without ambiguity.
