# TASK-006-r1 brief — Simplify and rewrite all lessons (+ interface references)

Shared instructions for every education-specialist agent in this run. Read `CLAUDE.md` and `.claude/skills/educational-content/SKILL.md` first. Learner: **an adult who has never used Word or Excel**, often a non-native English reader. Voice: a friendly teacher. **Short explanations. Simple English. Clear steps. Real practice.**

## Hard rules (do not break)

1. **Keep every id**: lesson `id`, `pathId`, `unitId`, `knowledgeCheck` value, tutorial count may change but lesson objects stay in the same order. Never delete a lesson. Ids key saved learner progress.
2. **Keep the knowledge.** Simplify the explanation, not the facts. Do not drop a command, rule, shortcut or warning a beginner needs; move detail into tutorial steps or `terms` instead of long paragraphs.
3. **Never invent.** Use Microsoft 365 desktop (Windows) names exactly (tab, group, button, dialog). If you are not sure a command/shortcut exists exactly as written, leave it out and list it under "Needs verification" in your report. Mac shortcuts only when sure.
4. **Edit only the files you own** (named in your task message). Do not run `npm run build`, `npm run dev` or `npm run preview`; do not touch `dist/`. You may run `npm run check:data`, `npm run check:data -- --stats` and `npx tsc -p tsconfig.app.json --noEmit`.
5. Data must match `src/types.ts` (`Lesson`, `TutorialStep`, `UiReference`, `WorkspaceState`, `Question`).

## Lesson structure → `Lesson` fields

| Learner sees | Field | Target |
| --- | --- | --- |
| 1. What You'll Learn | `subtitle` (one line) + `objectives` | 2–4 short, observable items ("Make text bold") |
| 2. Simple Explanation | `explain` | **2–4 short sentences in total** (array of 1–3 strings), ≤ 90 words |
|  | `terms` | 0–4 new words, each defined in ≤ 12 plain words |
| 3. Why It Matters | `why` | one practical office reason, 1–2 sentences, ≤ 45 words |
| 4. How to Do It | `tutorials` | 1–2 tutorials, 3–7 numbered steps each; one action per step; `result` says what the learner sees |
| 5. Example | `example` + `visual` | `scenario` 2–3 sentences about a real office task; `takeaway` one sentence; keep/adjust the `visual` |
| 6. Try It Yourself | `guided` | one practical exercise, 3–5 steps, 2–3 `expected` checks |
|  | `independent` | shown as "Extra challenge": 2–4 steps, 1–3 `expected` |
| 7. Quick Quiz | `knowledgeCheck` (existing id, keep) + `quickQuiz` | add `quickQuiz: ['<lessonId>-qq1', '<lessonId>-qq2']` |
| 8. Key Takeaway | `summary` | **1–2 items**, one sentence each |
|  | `nextTeaser` | one short sentence (or omit) |
|  | `duration` | realistic minutes for the shorter lesson |

Budget: the reading part (objectives + explanation + why + terms + tutorials + example + takeaway) should be **≈100–250 words**; up to ~350 only when the topic really needs two tutorials. `npm run check:data -- --stats` prints the counts and warns when a lesson is over budget.

## Writing rules

- Short sentences (aim ≤ 15 words). Familiar words. Active voice. Second person ("you").
- One idea per sentence; one concept per lesson; no theory the learner does not need.
- Define any unfamiliar word the first time (`terms`), e.g. *cell*, *range*, *margin*, *style*.
- Do not repeat the same explanation in several fields.
- Highlight UI names with `**…**`: "On the **Home** tab, click **Bold**." Use backticks for things the learner types or sees literally: formulas, cell references, file names, keys in prose if helpful — e.g. `=SUM(B2:B6)`, `B7`, `Budget.xlsx`. (Rendered by `src/components/RichText.tsx`; no other markup.)
- Keyboard shortcuts in the step's `shortcut` field (e.g. `'Ctrl + B'`), Windows first.
- Excel formulas — every formula lesson must state: **what it does**, **the syntax** (e.g. `=SUM(range)`), **a simple example** and **the expected result** (use the `formula` visual and/or a sheet workspace). Double-check every result by hand.

## Interface references (make the real Office screen recognisable)

`src/data/officeUi.ts` models the Microsoft 365 ribbons (tabs → groups → buttons with stable ids). A tutorial step can point at the real control:

```ts
{
  instruction: 'On the **Home** tab, click **Bold**.',
  shortcut: 'Ctrl + B',
  ui: {
    tab: 'home',            // tab id from officeUi.ts
    target: 'bold',         // button id on that tab (validated by check:data)
    workspace: { kind: 'doc', lines: ['# Team Meeting', 'Please bring your **notes**.'], selection: 'notes' },
    caption: 'The selected word turns bold.',
  },
}
```

- Add `ui` to **every step that clicks a ribbon or File-tab command** (use `tab` + `target`). For steps that only type or select, `ui` with just `workspace` (and optionally `tab`) is fine; steps that happen outside Office (Start menu) get no `ui`.
- `workspace` shows the document/sheet *at that step*; later steps without a workspace keep showing the last one, so only add it when the content changes. Keep it tiny (2–6 doc lines, sheets ≤ 6 rows × 5 columns).
  - Doc line markup: `# ` Heading 1, `## ` Heading 2, `- ` bullet, `1. ` numbered, `|a|b|` table row (first row = header), `>center ` centred line, `''` blank line, inline `**bold**` / `*italic*`; `selection` = exact substring shown as selected; optional `title` = window title (e.g. `'Budget Memo - Word'`).
  - Sheet: `cells` row-major strings (row 1 usually headers), `selected` like `'B7'`, `formula` = text shown in the formula bar (e.g. `'=SUM(B2:B6)'`); show the **calculated value** in the cell itself.
- If the command you need has no button id in `officeUi.ts`, do not invent one — leave `target` out, write the exact path in the instruction, and list it under "Missing ribbon ids" in your report.
- Mention version differences only when they change the instructions (e.g. "In Word 2021 the default font is **Calibri**; in Microsoft 365 it is **Aptos**").

## Quick-quiz questions (in your `src/data/questions/quick/<module>.ts` file)

```ts
{
  id: 'w2-1-qq1',
  type: 'mcq',
  prompt: 'Which tab has the Bold button?',
  options: ['Insert', 'Home', 'Layout', 'View'],
  answer: 1,
  explanation: 'Bold is in the Font group on the Home tab.',
  lessonId: 'w2-1',
}
```

- Two per lesson (`-qq1`, `-qq2`), testing different points than the existing knowledge check (read it in `src/data/questions/lessonChecks.ts`; do **not** edit that file).
- `mcq` = exactly 4 options, one clearly correct, plausible distractors, no "all of the above". `tf` = options `['True', 'False']`.
- **Vary the correct position** — spread answers across A/B/C/D (the existing bank is badly skewed to B).
- Explanation: 1–2 short sentences that teach *why*.
- Prompts short and concrete; scenario style is good ("You want … Which …?").

## Your report (final message)

1. Lessons rewritten (ids) and anything you could not finish.
2. `npm run check:data -- --stats` excerpt for your lessons (reading/explain words, ui-steps, quiz) and remaining warnings.
3. **Knowledge-check issues** you noticed in `lessonChecks.ts` for your lessons (id, problem, proposed corrected prompt/options/answer/explanation) — the orchestrator applies them.
4. Needs verification (facts you were unsure of) and Missing ribbon ids.
5. Essential knowledge you moved or condensed (so reviewers can confirm nothing was lost).
