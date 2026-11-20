import { useEffect, useMemo, useSyncExternalStore } from 'react'
import type { Exercise, FaqItem, GlossaryEntry, LearningPath, Lesson, Question, Quiz, Shortcut, Unit } from '../types'
import type { KmContent } from '../data/km/types'
import { useLocale } from './index'

/** Must match `ProtectedKey` in src/data/km/types.ts (runtime guard for hand-edited files). */
const PROTECTED = new Set([
  'id', 'pathId', 'unitId', 'lessonId', 'lessonIds', 'quizId', 'knowledgeCheck', 'quickQuiz', 'answer',
  'type', 'kind', 'variant', 'tab', 'target', 'app', 'shortcut', 'formula', 'selected', 'starter', 'lab',
  'duration', 'difficulty', 'passScore', 'number', 'value',
])

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

/**
 * Deep-merges translated text onto English data. Only strings replace strings; structure,
 * ids, numbers and array length always come from `base`. A malformed overlay degrades to
 * English instead of breaking the page.
 */
export function applyOverlay<T>(base: T, overlay: unknown): T {
  if (overlay === undefined || overlay === null) return base
  if (typeof base === 'string') {
    return (typeof overlay === 'string' && overlay.trim() !== '' ? overlay : base) as T
  }
  if (Array.isArray(base)) {
    if (!Array.isArray(overlay)) return base
    return base.map((item, index) => applyOverlay(item, overlay[index])) as T
  }
  if (isObject(base)) {
    if (!isObject(overlay)) return base
    const result: Record<string, unknown> = { ...base }
    for (const key of Object.keys(overlay)) {
      if (PROTECTED.has(key) || !(key in base)) continue
      result[key] = applyOverlay(base[key], overlay[key])
    }
    return result as T
  }
  return base
}

// ---------- Lazy loading: the Khmer content chunk is fetched only when Khmer is chosen ----------

let content: KmContent | null = null
let loading: Promise<void> | null = null
let failed = false
const listeners = new Set<() => void>()

function loadKm() {
  if (content || loading) return
  failed = false
  loading = import('../data/km')
    .then((module) => {
      content = module.kmContent
    })
    .catch((error: unknown) => {
      // Content stays English; the UI keeps working. Unexpected, so surface it once.
      console.error('Khmer content failed to load', error)
      failed = true
    })
    .finally(() => {
      loading = null
      listeners.forEach((listener) => listener())
    })
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const snapshot = () => content

/** Khmer overlay when Khmer is active and loaded; `null` otherwise (English). */
export function useKmContent(): { km: KmContent | null; loading: boolean; failed: boolean } {
  const locale = useLocale()
  useEffect(() => {
    if (locale === 'km') loadKm()
  }, [locale])
  const km = useSyncExternalStore(subscribe, snapshot, snapshot)
  return { km: locale === 'km' ? km : null, loading: locale === 'km' && !km && !failed, failed }
}

export interface Localizer {
  active: boolean
  lesson: (lesson: Lesson) => Lesson
  question: (question: Question) => Question
  quiz: (quiz: Quiz) => Quiz
  exercise: (exercise: Exercise) => Exercise
  unit: (unit: Unit) => Unit
  path: (path: LearningPath) => LearningPath
  shortcut: (shortcut: Shortcut) => Shortcut
  shortcutCategory: (category: string) => string
  glossary: (entry: GlossaryEntry) => GlossaryEntry
  faq: (item: FaqItem) => FaqItem
}

const identity = <T,>(value: T) => value

const english: Localizer = {
  active: false,
  lesson: identity,
  question: identity,
  quiz: identity,
  exercise: identity,
  unit: identity,
  path: identity,
  shortcut: identity,
  shortcutCategory: identity,
  glossary: identity,
  faq: identity,
}

/** Memoised per source object so lists keep stable references between renders. */
function cached<T extends object>(fn: (value: T) => T): (value: T) => T {
  const memo = new WeakMap<T, T>()
  return (value) => {
    let hit = memo.get(value)
    if (!hit) {
      hit = fn(value)
      memo.set(value, hit)
    }
    return hit
  }
}

function buildLocalizer(km: KmContent): Localizer {
  const question = cached<Question>((item) => applyOverlay(item, km.questions[item.id]))
  return {
    active: true,
    lesson: cached((item) => applyOverlay(item, km.lessons[item.id])),
    question,
    quiz: cached((item) => ({
      ...applyOverlay(item, km.quizzes[item.id]),
      questions: item.questions.map(question),
    })),
    exercise: cached((item) => applyOverlay(item, km.exercises[item.id])),
    unit: cached((item) => applyOverlay(item, km.units[item.id])),
    path: cached((item) => ({
      ...applyOverlay(item, km.paths[item.id]),
      units: item.units.map((unit) => applyOverlay(unit, km.units[unit.id])),
    })),
    shortcut: cached((item) => ({
      ...item,
      action: km.resources.shortcutActions[item.action] ?? item.action,
      category: km.resources.shortcutCategories[item.category] ?? item.category,
    })),
    shortcutCategory: (category) => km.resources.shortcutCategories[category] ?? category,
    glossary: cached((item) => ({ ...item, definition: km.resources.glossary[item.term] ?? item.definition })),
    faq: cached((item) => {
      const hit = km.resources.faqs[item.question]
      return hit ? { ...item, question: hit.question || item.question, answer: hit.answer || item.answer } : item
    }),
  }
}

const localizers = new WeakMap<KmContent, Localizer>()

/**
 * `const L = useLocalize()` then `L.lesson(lesson)`, `L.quiz(quiz)` …
 * Identity in English (zero cost); Khmer overlay once the chunk has loaded.
 */
export function useLocalize(): Localizer {
  const { km } = useKmContent()
  return useMemo(() => {
    if (!km) return english
    let localizer = localizers.get(km)
    if (!localizer) {
      localizer = buildLocalizer(km)
      localizers.set(km, localizer)
    }
    return localizer
  }, [km])
}
