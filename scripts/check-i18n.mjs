#!/usr/bin/env node
// Khmer translation integrity check (docs/i18n-khmer-style.md).
//  - UI dictionaries: same keys and same {placeholders} in en.ts and km.ts
//  - Content overlays (src/data/km/**): every id exists in the English data, arrays keep the
//    English length/order, no structural fields, and every **keyword** / `code` token of the
//    English string appears unchanged in the Khmer string (keywords stay English).
//  - Prints translation coverage.
// Runs on Node >= 22.18 with built-in type stripping (same loader as check:data).
//
//   npm run check:i18n             (exit code 1 on any problem)
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

if (!process.env.CHECK_I18N_CHILD) {
  const [major, minor] = process.versions.node.split('.').map(Number)
  if (major < 22 || (major === 22 && minor < 18)) {
    console.error(`check:i18n needs Node >= 22.18 (built-in TypeScript type stripping); found ${process.versions.node}`)
    process.exit(2)
  }
  const result = spawnSync(
    process.execPath,
    ['--no-warnings', '--import', pathToFileURL(path.join(here, 'register-ts.mjs')).href, fileURLToPath(import.meta.url), ...process.argv.slice(2)],
    { stdio: 'inherit', env: { ...process.env, CHECK_I18N_CHILD: '1' } },
  )
  process.exit(result.status ?? 1)
}

const { en } = await import('../src/i18n/en.ts')
const { km } = await import('../src/i18n/km.ts')
const { kmContent } = await import('../src/data/km/index.ts')
const { paths, allLessons, allUnits } = await import('../src/data/curriculum.ts')
const { quizzes, allQuestions } = await import('../src/data/questions/index.ts')
const { exercises } = await import('../src/data/exercises.ts')
const { shortcuts, glossary, faqs } = await import('../src/data/resources.ts')

const errors = []
const warnings = []
const fail = (message) => errors.push(message)
const warn = (message) => warnings.push(message)

const PROTECTED = new Set([
  'id', 'pathId', 'unitId', 'lessonId', 'lessonIds', 'quizId', 'knowledgeCheck', 'quickQuiz', 'answer',
  'type', 'kind', 'variant', 'tab', 'target', 'app', 'shortcut', 'formula', 'selected', 'starter', 'lab',
  'duration', 'difficulty', 'passScore', 'number', 'value',
])
const KHMER = /[ក-៿]/

// ---------- UI dictionaries ----------
const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',')
for (const key of Object.keys(en)) {
  if (!(key in km)) fail(`km.ts missing key "${key}"`)
  else if (placeholders(en[key]) !== placeholders(km[key])) fail(`km.ts "${key}": placeholders {${placeholders(km[key])}} ≠ English {${placeholders(en[key])}}`)
}
for (const key of Object.keys(km)) if (!(key in en)) fail(`km.ts has unknown key "${key}"`)

// ---------- Content overlays ----------
const tokens = (text) => [...text.matchAll(/\*\*[^*]+\*\*|`[^`]+`/g)].map((m) => m[0])

function countStrings(value) {
  if (typeof value === 'string') return 1
  if (Array.isArray(value)) return value.reduce((n, item) => n + countStrings(item), 0)
  if (value && typeof value === 'object') return Object.entries(value).reduce((n, [k, v]) => n + (PROTECTED.has(k) ? 0 : countStrings(v)), 0)
  return 0
}

/** Walks overlay against base; returns number of translated strings. */
function compare(base, overlay, where) {
  if (overlay === undefined || overlay === null) return 0
  if (typeof base === 'string') {
    if (typeof overlay !== 'string') {
      fail(`${where}: expected text, got ${typeof overlay}`)
      return 0
    }
    if (!overlay.trim()) return 0
    const want = tokens(base)
    const got = tokens(overlay)
    const missing = want.filter((token) => !got.includes(token))
    const extra = got.filter((token) => !want.includes(token))
    if (missing.length) fail(`${where}: keyword(s) missing or changed: ${missing.join(' ')}`)
    if (extra.length) fail(`${where}: keyword(s) not in English: ${extra.join(' ')}`)
    if (!KHMER.test(overlay) && overlay !== base) warn(`${where}: translation contains no Khmer text`)
    return 1
  }
  if (Array.isArray(base)) {
    if (!Array.isArray(overlay)) {
      fail(`${where}: expected a list`)
      return 0
    }
    if (overlay.length !== base.length) fail(`${where}: ${overlay.length} items, English has ${base.length} (order/length must match)`)
    return overlay.reduce((n, item, index) => n + (index < base.length ? compare(base[index], item, `${where}[${index}]`) : 0), 0)
  }
  if (base && typeof base === 'object') {
    if (!overlay || typeof overlay !== 'object' || Array.isArray(overlay)) {
      fail(`${where}: expected an object`)
      return 0
    }
    let n = 0
    for (const key of Object.keys(overlay)) {
      if (PROTECTED.has(key)) fail(`${where}.${key}: structural field must not be translated`)
      else if (!(key in base)) fail(`${where}.${key}: field does not exist in English data`)
      else n += compare(base[key], overlay[key], `${where}.${key}`)
    }
    return n
  }
  fail(`${where}: cannot translate a ${typeof base}`)
  return 0
}

const coverage = []
function checkRecord(label, record, items, project = (item) => item) {
  const byId = new Map(items.map((item) => [item.id, item]))
  let translated = 0
  let total = 0
  let entities = 0
  for (const item of items) total += countStrings(project(item))
  for (const [id, overlay] of Object.entries(record)) {
    const base = byId.get(id)
    if (!base) {
      fail(`${label}: unknown id "${id}"`)
      continue
    }
    entities += 1
    translated += compare(project(base), overlay, `${label}.${id}`)
  }
  coverage.push({ label, entities, of: items.length, translated, total })
}

const omit = (key) => (item) => {
  const copy = { ...item }
  delete copy[key]
  return copy
}

checkRecord('paths', kmContent.paths, paths, omit('units'))
checkRecord('units', kmContent.units, allUnits)
checkRecord('lessons', kmContent.lessons, allLessons)
checkRecord('quizzes', kmContent.quizzes, quizzes, omit('questions'))
checkRecord('questions', kmContent.questions, allQuestions)
checkRecord('exercises', kmContent.exercises, exercises)

// Resources are keyed by English text.
const res = kmContent.resources
const actions = new Set(shortcuts.map((s) => s.action))
const categories = new Set(shortcuts.map((s) => s.category))
const terms = new Map(glossary.map((g) => [g.term, g]))
const questionsByText = new Map(faqs.map((f) => [f.question, f]))
for (const [key, value] of Object.entries(res.shortcutActions)) {
  if (!actions.has(key)) fail(`resources.shortcutActions: unknown English action "${key}"`)
  else compare(key, value, `resources.shortcutActions["${key}"]`)
}
for (const key of Object.keys(res.shortcutCategories)) if (!categories.has(key)) fail(`resources.shortcutCategories: unknown category "${key}"`)
for (const [key, value] of Object.entries(res.glossary)) {
  const entry = terms.get(key)
  if (!entry) fail(`resources.glossary: unknown term "${key}"`)
  else compare(entry.definition, value, `resources.glossary["${key}"]`)
}
for (const [key, value] of Object.entries(res.faqs)) {
  const entry = questionsByText.get(key)
  if (!entry) fail(`resources.faqs: unknown question "${key}"`)
  else {
    compare(entry.question, value.question, `resources.faqs["${key}"].question`)
    compare(entry.answer, value.answer, `resources.faqs["${key}"].answer`)
  }
}
coverage.push({ label: 'shortcuts', entities: Object.keys(res.shortcutActions).length, of: actions.size })
coverage.push({ label: 'glossary', entities: Object.keys(res.glossary).length, of: terms.size })
coverage.push({ label: 'faqs', entities: Object.keys(res.faqs).length, of: questionsByText.size })

// ---------- Report ----------
console.log('Khmer translation integrity')
console.log(`  UI strings: ${Object.keys(km).length}/${Object.keys(en).length}`)
for (const row of coverage) {
  const strings = row.total ? ` · ${row.translated}/${row.total} strings (${Math.round((row.translated / row.total) * 100)}%)` : ''
  console.log(`  ${row.label.padEnd(10)} ${String(row.entities).padStart(3)}/${row.of}${strings}`)
}
for (const w of warnings.slice(0, 40)) console.log('  warning: ' + w)
if (warnings.length > 40) console.log(`  … ${warnings.length - 40} more warnings`)
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`)
  for (const e of errors.slice(0, 200)) console.error('  ✗ ' + e)
  process.exit(1)
}
console.log(`\nOK — translations are consistent with the English data${warnings.length ? ` (${warnings.length} warning${warnings.length === 1 ? '' : 's'})` : ''}.`)
