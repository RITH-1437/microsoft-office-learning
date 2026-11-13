#!/usr/bin/env node
// Curriculum data-integrity check (CLAUDE.md §7.2). Validates that every id reference
// between paths → units → lessons → knowledge checks → quizzes → questions → exercises
// resolves, that answer keys are in range, and that required lesson parts are present.
// Runs on Node ≥ 22.18 with built-in type stripping — no build step, no extra packages.
//
//   npm run check:data        (exit code 1 on any problem)
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
    ['--no-warnings', '--import', pathToFileURL(path.join(here, 'register-ts.mjs')).href, fileURLToPath(import.meta.url)],
    { stdio: 'inherit', env: { ...process.env, CHECK_DATA_CHILD: '1' } },
  )
  process.exit(result.status ?? 1)
}

const { paths, allLessons, allUnits } = await import('../src/data/curriculum.ts')
const { lessonChecks, quizzes, allQuestions } = await import('../src/data/questions/index.ts')
const { exercises } = await import('../src/data/exercises.ts')

const errors = []
const warnings = []
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
      if (!nonEmpty(step.instruction)) fail(`${where}: tutorial "${t.title}" has an empty step`)
    }
  }
  for (const [name, block] of [['guided', lesson.guided], ['independent', lesson.independent]]) {
    if (!block) { fail(`${where}: ${name} practice missing`); continue }
    if (!block.steps?.length) fail(`${where}: ${name} practice has no steps`)
    if (!block.expected?.length) fail(`${where}: ${name} practice has no expected outcomes`)
  }
  if (!lesson.example?.scenario || !lesson.example?.takeaway) fail(`${where}: example incomplete`)
  const words = [lesson.why, ...lesson.explain].join(' ').split(/\s+/).filter(Boolean).length
  if (words > 320) warn(`${where}: explanation is ${words} words (target ≤ 250 for beginners)`)
}

// Questions → answer keys
for (const q of allQuestions) {
  const where = `question "${q.id}"`
  if (!Array.isArray(q.options) || q.options.length < 2) fail(`${where}: needs at least 2 options`)
  if (q.type === 'mcq' && q.options.length !== 4) warn(`${where}: multiple-choice question has ${q.options.length} options (standard is 4)`)
  if (q.type === 'tf' && q.options.length !== 2) fail(`${where}: true/false question must have exactly 2 options`)
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) fail(`${where}: answer index ${q.answer} out of range`)
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
]
console.log('Curriculum data integrity')
for (const line of summary) console.log('  ' + line)
for (const w of warnings) console.log('  warning: ' + w)
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`)
  for (const e of errors) console.error('  ✗ ' + e)
  process.exit(1)
}
console.log(`\nOK — all references resolve${warnings.length ? ` (${warnings.length} warning${warnings.length === 1 ? '' : 's'})` : ''}.`)
