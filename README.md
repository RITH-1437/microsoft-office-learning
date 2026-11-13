# Office Academy — Microsoft Word & Excel

[![CI](https://github.com/RITH-1437/microsoft-office-learning/actions/workflows/ci.yml/badge.svg)](https://github.com/RITH-1437/microsoft-office-learning/actions/workflows/ci.yml) [![Security](https://github.com/RITH-1437/microsoft-office-learning/actions/workflows/security.yml/badge.svg)](https://github.com/RITH-1437/microsoft-office-learning/actions/workflows/security.yml)

An interactive, beginner-friendly course for Microsoft Word and Excel, built for administrative and office skills. It combines structured lessons, click-level tutorials, knowledge checks, unit assessments, practical projects with starter files, and two in-browser practice labs.

**Live app:** run locally with `npm run dev` (see below). The app uses hash routing and a relative build base, so the `dist` folder can be hosted on GitHub Pages or any static host.

## What is included

- **38 lessons** across two paths
  - Microsoft Word: 17 lessons in 4 units
  - Microsoft Excel: 21 lessons in 4 units
- **110 questions**
  - One knowledge check per lesson (38)
  - Eight unit checkpoint quizzes (48 questions)
  - Two final assessments (24 questions)
- **12 practical projects** with downloadable CSV/text starters, step-by-step instructions, hints, success criteria, and completion tracking
- **Two interactive labs**
  - Word editing lab: headings, bold/italic/underline, alignment, lists, color, word count
  - Excel formula lab: a working grid with SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, IF, ROUND, COUNTIF, SUMIF, VLOOKUP, TODAY, ranges, references, and error codes
- **Progress tracking** in `localStorage` via Zustand: completed lessons, quiz best scores, completed projects, and theme preference
- **Premium glassmorphism UI** with light/dark themes, responsive navigation, print styles, and reduced-motion support
- **Cinematic motion system** — word-by-word hero reveal with parallax, scroll-triggered section reveals, a learning dashboard with animated progress rings and a streak, direction-aware quiz transitions with an animated score ring, lesson-completion and quiz-pass celebrations, route-level code splitting with skeleton loading. Everything honours `prefers-reduced-motion`, and expensive effects (parallax, tilt, floating cards, custom cursor) are desktop-only

## Curriculum

### Microsoft Word

1. **Word Foundations** — interface, files, saving, navigation, editing
2. **Formatting Like a Professional** — fonts, paragraphs, alignment, spacing, lists
3. **Pages, Tables and Visuals** — margins, orientation, section breaks, tables, headers/footers, images
4. **Professional Documents and Efficiency** — styles, find and replace, mail merge, Track Changes, PDF export, office documents

### Microsoft Excel

1. **Excel Foundations** — workbook model, cells, ranges, navigation, sheets, data entry
2. **Formatting and Presentation** — number formats, dates, sorting, filtering, Excel Tables
3. **Formulas and Functions** — arithmetic, references, SUM, AVERAGE, COUNT, COUNTA, IF, COUNTIF, SUMIF, absolute references, VLOOKUP
4. **Analysis, Reporting and Administration** — conditional formatting, data validation, charts, PivotTables, print setup, protection

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- React Router (HashRouter)
- Zustand with `persist`
- Lucide icons
- Framer Motion
- Oxlint

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

### Scripts

```bash
npm run dev      # start the development server
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint     # run Oxlint
npm run typecheck # TypeScript project references (tsc -b)
npm run check:data # curriculum data-integrity check (Node >= 22.18)
```

## Project structure

```text
src/
  components/        Layout, hero, dashboard summary, quiz runner, lesson check, visual blocks, path cards
    motion/          MotionProvider, CountUp, ProgressRing, TiltCard, Confetti, RouteSkeleton
  data/
    curriculum.ts    Paths, units, lesson lookups, progress helpers
    lessons/         Word and Excel lesson content
    questions/       Lesson checks, checkpoints, finals
    exercises.ts     12 practical projects with starter files
    resources.ts     Shortcuts, glossary, FAQ
  lib/
    formula.ts       Spreadsheet formula engine for the Excel lab
    utils.ts         Download, date, and duration helpers
    motion.ts        Motion tokens (durations, easings, variants) and media-query hooks
    streak.ts        Learning-streak and greeting helpers
  pages/             Home, paths, lessons, quizzes, practice, labs, progress, resources
  store/progress.ts  Persisted progress and theme state
  index.css          Design tokens, glass tiers, motion tokens, print and reduced-motion styles
  types.ts           Shared data model
```

## Continuous integration

Every push and pull request runs lint, type-check, the data-integrity check, a verified production build and security scans on GitHub Actions. Optional Vercel preview/production deployments activate once secrets are configured. See `docs/ci-cd-architecture.md`, `docs/ci-cd-setup.md` and `docs/ci-cd-troubleshooting.md`.

## Data validation

The lesson, quiz, and project data can be validated with a small script. During development, all references were checked:

- 38 lessons (17 Word, 21 Excel)
- 8 units, 10 assessments, 110 unique question IDs
- Every lesson knowledge check resolves to a question
- Every unit quiz and lesson-to-unit mapping is valid
- 12 projects with steps and success criteria

## Notes and limitations

- The labs are **simulations**, not the real Microsoft Office applications. They do not create or save `.docx` or `.xlsx` files.
- Progress is stored only in the current browser. Clearing site data removes it; there is no account or cloud sync.
- Content follows Microsoft 365 and Office 2019+ menu names and shortcuts on Windows, with Mac alternatives listed where known.
- No certificate is issued in this version.

## License

MIT — see [LICENSE](LICENSE).
