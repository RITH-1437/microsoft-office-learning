#!/usr/bin/env node
// Curriculum data-integrity check (CLAUDE.md §7.2). Validates that every id reference
// between paths → units → lessons → knowledge checks → quizzes → questions → exercises
// resolves, that answer keys are in range, and that required lesson parts are present.
// Runs on Node ≥ 22.18 with built-in type stripping — no build step, no extra packages.
//
//   npm run check:data              (exit code 1 on any problem)
//   npm run check:data -- --stats   (also print per-lesson readability stats)
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

if (!process.env.CHECK_DATA_CHILD) {
  const [major, minor] = process.versions.node.split('.').map(Number)
  if (major < 22 || (major === 22 && minor < 18)) {
    console.error(`check:data needs Node >= 22.18 (built-in TypeScript type stripping); found ${process.versions.node}`)
    process.exit(2)
  }
  const result = spawnSync(
    process.execPath,
    ['--no-warnings', '--import', pathToFileURL(path.join(here, 'register-ts.mjs')).href, fileURLToPath(import.meta.url), ...process.argv.slice(2)],
    { stdio: 'inherit', env: { ...process.env, CHECK_DATA_CHILD: '1' } },
  )
  process.exit(result.status ?? 1)
}

const { paths, allLessons, allUnits } = await import('../src/data/curriculum.ts')
const { lessonChecks, quizzes, allQuestions } = await import('../src/data/questions/index.ts')
const { exercises } = await import('../src/data/exercises.ts')
const { OFFICE_UI, findRibbonTarget } = await import('../src/data/officeUi.ts')

const errors = []
const warnings = []
let stepsTotal = 0
let stepsWithUi = 0
const fail = (message) => errors.push(message)
const warn = (message) => warnings.push(message)

const uniqueIds = (items, label) => {
  const seen = new Set()
  for (const item of items) {
    if (seen.has(item.id)) fail(`${label}: duplicate id "${item.id}"`)
    seen.add(item.id)
  }
  return seen
}

const pathIds = new Set(paths.map((p) => p.id))
const unitIds = uniqueIds(allUnits, 'units')
const lessonIds = uniqueIds(allLessons, 'lessons')
const questionIds = uniqueIds(allQuestions, 'questions')
uniqueIds(quizzes, 'quizzes')
uniqueIds(exercises, 'exercises')

const words = (...parts) => parts.flat(Infinity).filter(Boolean).join(' ').replace(/[*`]/g, '').split(/\s+/).filter(Boolean).length
const showStats = process.argv.includes('--stats')
const stats = []
const answerPositions = [0, 0, 0, 0]

const nonEmpty = (value) => (Array.isArray(value) ? value.length > 0 : typeof value === 'string' && value.trim().length > 0)

// Paths → units
for (const p of paths) {
  if (!p.units.length) fail(`path "${p.id}" has no units`)
  for (const unit of p.units) {
    if (unit.pathId !== p.id) fail(`unit "${unit.id}" belongs to path "${unit.pathId}" but is listed under "${p.id}"`)
  }
}

// Units → lessons, quizzes
for (const unit of allUnits) {
  if (!pathIds.has(unit.pathId)) fail(`unit "${unit.id}": unknown pathId "${unit.pathId}"`)
  if (!unit.lessonIds.length) fail(`unit "${unit.id}" has no lessons`)
  for (const id of unit.lessonIds) {
    if (!lessonIds.has(id)) fail(`unit "${unit.id}": lesson "${id}" does not exist`)
  }
  const quiz = quizzes.find((q) => q.id === unit.quizId)
  if (!quiz) fail(`unit "${unit.id}": quiz "${unit.quizId}" does not exist`)
  else if (quiz.unitId !== unit.id) fail(`unit "${unit.id}": quiz "${quiz.id}" is attached to unit "${quiz.unitId}"`)
}

// Lessons → unit membership, knowledge check, required parts
const lessonToUnit = new Map()
for (const unit of allUnits) for (const id of unit.lessonIds) lessonToUnit.set(id, unit.id)

for (const lesson of allLessons) {
  const where = `lesson "${lesson.id}"`
  if (!pathIds.has(lesson.pathId)) fail(`${where}: unknown pathId "${lesson.pathId}"`)
  if (!unitIds.has(lesson.unitId)) fail(`${where}: unknown unitId "${lesson.unitId}"`)
  if (lessonToUnit.get(lesson.id) !== lesson.unitId) fail(`${where}: unitId "${lesson.unitId}" but listed in unit "${lessonToUnit.get(lesson.id) ?? 'none'}"`)
  if (!questionIds.has(lesson.knowledgeCheck)) fail(`${where}: knowledge check "${lesson.knowledgeCheck}" does not exist`)
  const check = lessonChecks.find((q) => q.id === lesson.knowledgeCheck)
  if (check && check.lessonId && check.lessonId !== lesson.id) fail(`${where}: knowledge check "${check.id}" is tagged for lesson "${check.lessonId}"`)
  for (const extra of lesson.quickQuiz ?? []) {
    if (!questionIds.has(extra)) fail(`${where}: quick-quiz question "${extra}" does not exist`)
  }
  for (const [field, value] of [
    ['title', lesson.title], ['subtitle', lesson.subtitle], ['why', lesson.why], ['objectives', lesson.objectives],
    ['explain', lesson.explain], ['tutorials', lesson.tutorials], ['summary', lesson.summary],
  ]) {
    if (!nonEmpty(value)) fail(`${where}: "${field}" is empty`)
  }
  if (!(lesson.duration > 0)) fail(`${where}: duration must be > 0`)
  if (!lesson.visual || !lesson.visual.kind) fail(`${where}: visual missing`)
  for (const t of lesson.tutorials ?? []) {
    if (!nonEmpty(t.title)) fail(`${where}: tutorial without title`)
    if (!t.steps?.length) fail(`${where}: tutorial "${t.title}" has no steps`)
    if (!nonEmpty(t.result)) fail(`${where}: tutorial "${t.title}" has no result`)
    for (const step of t.steps ?? []) {
      stepsTotal += 1
      if (!nonEmpty(step.instruction)) fail(`${where}: tutorial "${t.title}" has an empty step`)
      if (step.ui) {
        stepsWithUi += 1
        const app = step.ui.app ?? lesson.pathId
        const model = OFFICE_UI[app]
        if (!model) fail(`${where}: tutorial "${t.title}" step uses unknown app "${app}"`)
        else {
          if (step.ui.tab && !model.tabs.some((tab) => tab.id === step.ui.tab)) fail(`${where}: tutorial "${t.title}" step references unknown ${app} tab "${step.ui.tab}"`)
          if (step.ui.target && !findRibbonTarget(app, step.ui.target, step.ui.tab)) fail(`${where}: tutorial "${t.title}" step references unknown ${app} button "${step.ui.target}"${step.ui.tab ? ` on tab "${step.ui.tab}"` : ''}`)
        }
        const ws = step.ui.workspace
        if (ws && ws.kind === 'sheet' && ws.selected && !/^[A-Z]\d+$/.test(ws.selected)) fail(`${where}: tutorial "${t.title}" step has invalid selected cell "${ws.selected}"`)
      }
    }
  }
  for (const [name, block] of [['guided', lesson.guided], ['independent', lesson.independent]]) {
    if (!block) { fail(`${where}: ${name} practice missing`); continue }
    if (!block.steps?.length) fail(`${where}: ${name} practice has no steps`)
    if (!block.expected?.length) fail(`${where}: ${name} practice has no expected outcomes`)
  }
  if (!lesson.example?.scenario || !lesson.example?.takeaway) fail(`${where}: example incomplete`)
  // Readability budget (lesson-writing brief): short explanation, one reason, short takeaway.
  const explainWords = words(lesson.explain)
  const reading = words(
    lesson.objectives, lesson.explain, lesson.why,
    (lesson.terms ?? []).map((t) => [t.term, t.definition]),
    (lesson.tutorials ?? []).map((t) => [t.title, t.intro, t.result, t.steps.map((st) => [st.instruction, st.detail])]),
    lesson.example?.scenario, lesson.example?.takeaway, lesson.summary,
  )
  if (lesson.explain.length > 4) warn(`${where}: explain has ${lesson.explain.length} entries (simple explanation = 2–4 short sentences)`)
  if (explainWords > 90) warn(`${where}: simple explanation is ${explainWords} words (target ≤ 90)`)
  if (words(lesson.why) > 45) warn(`${where}: "why it matters" is ${words(lesson.why)} words (target ≤ 45, one practical reason)`)
  if (lesson.summary.length > 2) warn(`${where}: key takeaway has ${lesson.summary.length} items (target 1–2)`)
  if (reading > 380) warn(`${where}: lesson reading length is ${reading} words (target 100–250; more only when the topic needs it)`)

  // Quick quiz: knowledge check + 1–2 extra questions tagged for this lesson.
  const quick = lesson.quickQuiz ?? []
  if (quick.length < 1) warn(`${where}: no quick-quiz questions (target 2 in addition to the knowledge check)`)
  if (quick.length > 3) warn(`${where}: ${quick.length} quick-quiz questions (target 2)`)
  for (const id of quick) {
    const q = allQuestions.find((candidate) => candidate.id === id)
    if (!q) continue // reported by the reference check
    if (q.lessonId !== lesson.id) fail(`${where}: quick-quiz question "${id}" is tagged for lesson "${q.lessonId ?? 'none'}"`)
    if (id === lesson.knowledgeCheck) fail(`${where}: quick-quiz repeats the knowledge check "${id}"`)
  }
  const tutorialSteps = (lesson.tutorials ?? []).reduce((n, t) => n + t.steps.length, 0)
  const uiSteps = (lesson.tutorials ?? []).reduce((n, t) => n + t.steps.filter((st) => st.ui).length, 0)
  stats.push({ id: lesson.id, reading, explainWords, tutorials: lesson.tutorials.length, steps: tutorialSteps, uiSteps, quiz: 1 + quick.length })
}

// Questions → answer keys
for (const q of allQuestions) {
  const where = `question "${q.id}"`
  if (!Array.isArray(q.options) || q.options.length < 2) fail(`${where}: needs at least 2 options`)
  if (q.type === 'mcq' && q.options.length !== 4) warn(`${where}: multiple-choice question has ${q.options.length} options (standard is 4)`)
  if (q.type === 'tf' && q.options.length !== 2) fail(`${where}: true/false question must have exactly 2 options`)
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) fail(`${where}: answer index ${q.answer} out of range`)
  else if (q.type === 'mcq' && q.options.length === 4) answerPositions[q.answer] += 1
  if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== q.options.length) fail(`${where}: duplicate options`)
  if (!nonEmpty(q.explanation)) fail(`${where}: explanation missing`)
  if (!nonEmpty(q.prompt)) fail(`${where}: prompt missing`)
  if (q.lessonId && !lessonIds.has(q.lessonId)) fail(`${where}: lessonId "${q.lessonId}" does not exist`)
}

// Quizzes
for (const quiz of quizzes) {
  const where = `quiz "${quiz.id}"`
  if (!pathIds.has(quiz.pathId)) fail(`${where}: unknown pathId "${quiz.pathId}"`)
  if (!(quiz.passScore > 0 && quiz.passScore <= 100)) fail(`${where}: passScore ${quiz.passScore} out of range`)
  if (!quiz.questions?.length) fail(`${where}: has no questions`)
  if (quiz.kind === 'checkpoint' && !unitIds.has(quiz.unitId)) fail(`${where}: checkpoint quiz has unknown unitId "${quiz.unitId}"`)
  for (const q of quiz.questions) {
    if (q.lessonId && lessonToUnit.get(q.lessonId) !== quiz.unitId && quiz.kind === 'checkpoint') {
      warn(`${where}: question "${q.id}" is tagged for lesson "${q.lessonId}" outside unit "${quiz.unitId}"`)
    }
  }
}

// Exercises
const lessonCountByPath = Object.fromEntries(paths.map((p) => [p.id, allLessons.filter((l) => l.pathId === p.id).length]))
for (const ex of exercises) {
  const where = `exercise "${ex.id}"`
  if (!pathIds.has(ex.pathId)) fail(`${where}: unknown pathId "${ex.pathId}"`)
  if (!['word', 'excel', 'admin'].includes(ex.scenario)) fail(`${where}: unknown scenario "${ex.scenario}"`)
  if (!ex.steps?.length) fail(`${where}: no steps`)
  if (!ex.criteria?.length) fail(`${where}: no success criteria`)
  if (!nonEmpty(ex.deliverable)) fail(`${where}: deliverable missing`)
  if (ex.starter && !['csv', 'rtf', 'txt'].includes(ex.starter.kind)) fail(`${where}: starter kind "${ex.starter.kind}" invalid`)
  if (ex.lab && !['word', 'excel'].includes(ex.lab)) fail(`${where}: lab "${ex.lab}" invalid`)
}

// Summary
const summary = [
  `paths: ${paths.length}`,
  `units: ${allUnits.length}`,
  `lessons: ${allLessons.length} (${paths.map((p) => `${p.id} ${lessonCountByPath[p.id]}`).join(', ')})`,
  `lesson checks: ${lessonChecks.length}`,
  `quizzes: ${quizzes.length} (${quizzes.reduce((n, q) => n + q.questions.length, 0)} questions)`,
  `questions total: ${allQuestions.length}`,
  `exercises: ${exercises.length}`,
  `tutorial steps: ${stepsTotal} (${stepsWithUi} with interface references)`,
]
console.log('Curriculum data integrity')
if (showStats) {
  console.log('\n  lesson  reading  explain  tutorials  steps  ui-steps  quiz')
  for (const r of stats) console.log(`  ${r.id.padEnd(6)}  ${String(r.reading).padStart(7)}  ${String(r.explainWords).padStart(7)}  ${String(r.tutorials).padStart(9)}  ${String(r.steps).padStart(5)}  ${String(r.uiSteps).padStart(8)}  ${String(r.quiz).padStart(4)}`)
  const avg = (key) => Math.round(stats.reduce((n, r) => n + r[key], 0) / stats.length)
  console.log(`  average reading ${avg('reading')} words · explanation ${avg('explainWords')} words`)
  console.log(`  4-option answer positions A/B/C/D: ${answerPositions.join(' / ')}\n`)
}
for (const line of summary) console.log('  ' + line)
for (const w of warnings) console.log('  warning: ' + w)
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`)
  for (const e of errors) console.error('  ✗ ' + e)
  process.exit(1)
}
console.log(`\nOK — all references resolve${warnings.length ? ` (${warnings.length} warning${warnings.length === 1 ? '' : 's'})` : ''}.`)
