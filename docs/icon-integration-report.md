# Icon integration report — Microsoft Word & Excel

Date: 2026-11-14 · Scope: replace generic file/table icons used as the *Word* or *Excel* identity with the recognisable Microsoft application icons, through one reusable component.

## 1. Source and usage rights

| Item | Detail |
| --- | --- |
| Asset | `WordLogoIcon` and `ExcelLogoIcon` glyphs from Microsoft's Fluent UI **MDL2 branded** icon set |
| Package | `@fluentui/react-icons-mdl2-branded` **1.3.9** (downloaded with `npm pack` for inspection only — **not added as a dependency**) |
| Format | single SVG path each, `viewBox="0 0 2048 2048"`, copied verbatim into `src/components/icons/officeLogoPaths.ts` |
| Licence | package `LICENSE`: *"Usage of the branded icons in this package is subject to the terms listed at https://aka.ms/fluentui-assets-license"* (Microsoft Fabric Assets License). The licence text is served as a PDF that could not be rendered in this environment, so its exact terms were **not** reviewed here. |
| How they are used | Unmodified glyph shapes, only scaled and coloured (white on the app's brand colour, or `currentColor`), solely to identify the Microsoft product a lesson/project teaches. Provenance and licence notice kept in the source file. |

**Action for the owner before public release:** read the Fabric Assets License (link above) and Microsoft's Trademark and Brand Guidelines, and confirm the training-site use is acceptable. If not, delete `officeLogoPaths.ts` and point `OfficeAppIcon` at neutral glyphs — every usage goes through that one component, so the swap is a one-file change.

Rejected alternatives: emoji/generic file icons (explicitly ruled out by the brief); recreating the 2019+ coloured Office logos by hand (would be an approximation of a trademark); scraping logos from websites (unclear rights); adding the Fluent icon packages as dependencies (pulls in `@fluentui/react-icons-mdl2` + styling runtime for two paths).

## 2. Components

| Component | File | Purpose |
| --- | --- | --- |
| `OfficeAppIcon` | `src/components/icons/OfficeAppIcon.tsx` | `app="word" \| "excel"`, `size` (px), `variant="tile"` (white glyph on brand-gradient rounded tile) or `"glyph"` (bare logo in `currentColor`), `title` (accessible name; omitted → `aria-hidden`), `float` (gentle floating for hero use) |
| `WordIcon`, `ExcelIcon` | same file | thin wrappers (`<WordIcon size={32} />`) |
| `OFFICE_APP_NAME`, logo paths | `src/components/icons/officeLogoPaths.ts` | single source of the SVG data — no duplicated SVG anywhere |
| Styles | `src/index.css` → `.app-tile`, `.app-tile-word`, `.app-tile-excel`, `.office-glyph` | brand gradients (`--color-word-500→700`, `--color-excel-500→700`), inset highlight + soft shadow, hover lift/scale (`transform` only, 200 ms), dark-theme shadow; floating motion reuses `.float-slow` (off on < 900 px and under reduced motion) |

Proportions: the glyph keeps its square viewBox and is drawn at 62 % of the tile (Microsoft app-tile spacing); `width = height` always, so nothing can stretch.

## 3. Where the icons now appear

| Location | File | Variant · size | Replaced |
| --- | --- | --- | --- |
| Learning path cards (home) | `components/PathCard.tsx` | tile · 48 px | lucide `BookOpen` / `Table2` in a coloured square |
| Dashboard track cards (home + progress) | `components/DashboardSummary.tsx` | tile · 28 px (admin track keeps its briefcase) | `BookOpen` / `Table2` |
| Hero document cards | `components/Hero.tsx` | tile · 32 px (cards float on desktop) | `FileText` / `Table2` |
| Paths overview cards | `pages/PathsPage.tsx` | tile · 44 px | glyph-in-square |
| Path detail heading (branding) | `pages/PathDetailPage.tsx` | tile · 56 px, floating; glyph · 13 px in the lesson-count chip | `BookOpen` / `Table2` |
| Lesson header chip | `pages/LessonPage.tsx` | glyph · 12 px | `BookOpen` / `ListChecks` |
| Lesson sidebar "Path progress" | `pages/LessonPage.tsx` | tile · 24 px | — (new) |
| Quizzes page module headings | `pages/QuizzesPage.tsx` | tile · 32 px | — (new) |
| Progress page "By path" cards | `pages/ProgressPage.tsx` | tile · 32 px | — (new) |
| Practice page stats | `pages/PracticePage.tsx` | tile · 40 px | `FileText` / `FileSpreadsheet` (this edit briefly broke the page — see §5) |
| Practice cards / detail chips | `pages/PracticePage.tsx`, `PracticeDetailPage.tsx` | glyph · 11–12 px | `FileText` / `FileSpreadsheet` |
| Labs page cards | `pages/LabsPage.tsx` | tile · 48 px | `FileText` / `Table2` |
| Word / Excel lab window bars | `pages/WordLabPage.tsx`, `ExcelLabPage.tsx` | tile · 24 px | `FileText` / `Table2` |
| Home closing CTA buttons | `pages/HomePage.tsx` | glyph · 17 px | `BookOpen` / `Table2` |
| Office interface diagrams (title bar) | `components/office/OfficeInterfacePreview.tsx` | tile · 16 px | — (new) |

Deliberately unchanged (generic meaning, not app identity): "Learning paths" section label, "Start learning" header button, units-count icon, starter-file `FileText`, table visual `Table2`, Word-lab tip icon.

## 4. Verification

| Check | Method | Result |
| --- | --- | --- |
| Type check / lint | `npx tsc -p tsconfig.app.json --noEmit`, `npm run lint` | clean for the icon files |
| Rendering | headless Chrome (CDP) screenshots: home, paths/word, quizzes (dark), practice, lesson | official glyphs render on blue/green tiles; no distortion; consistent sizes |
| Light/dark | screenshots in both themes | white glyph on brand tile reads in both; tile shadow adapted for dark |
| Responsive | 390 px mobile emulation (home, lesson, practice) | no overflow; tiles keep square proportions |
| Broken assets | inline SVG (no network request) | none possible |
| Accessibility | decorative icons are `aria-hidden` next to visible text; pass `title` for a standalone icon | ✔ |
| Motion | hover lift only on pointer hover; floating tile uses `.float-slow` (desktop + motion allowed) | ✔ |

## 5. Issue found and fixed during integration

Replacing `FileText`/`FileSpreadsheet` in `PracticePage.tsx` removed their imports while the stats row still referenced them → runtime `ReferenceError: FileText is not defined` on `/#/practice` (reported by the user; also flagged by `tsc`). Fixed by switching that row to `OfficeAppIcon` tiles; verified the page renders with zero console errors. Lesson learned and applied afterwards: run `tsc` immediately after every automated replacement batch, not at the end.
