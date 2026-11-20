import type { Exercise, LearningPath, Lesson, Question, Quiz, Unit } from '../../types'

/**
 * Khmer content overlays.
 *
 * English data in `src/data/**` stays the single source of truth (ids, answer keys, order,
 * durations, ribbon references). A Khmer file only supplies *translated text* for the same
 * shape; anything it leaves out falls back to English. Arrays are merged by index, so a
 * translation must keep the same order (and quiz options the same order as the answer key).
 */

/** Keys that are identifiers or structure, never text. The merge ignores them at runtime too. */
export type ProtectedKey =
  | 'id'
  | 'pathId'
  | 'unitId'
  | 'lessonId'
  | 'lessonIds'
  | 'quizId'
  | 'knowledgeCheck'
  | 'quickQuiz'
  | 'answer'
  | 'type'
  | 'kind'
  | 'variant'
  | 'tab'
  | 'target'
  | 'app'
  | 'shortcut'
  | 'formula'
  | 'selected'
  | 'starter'
  | 'lab'
  | 'duration'
  | 'difficulty'
  | 'passScore'
  | 'number'
  | 'value'

/**
 * Text-only partial of T: free-text strings become optional translated strings; literal
 * unions (enums like 'word' | 'excel'), numbers and booleans cannot be overridden.
 */
export type Overlay<T> = T extends string
  ? string extends T
    ? string
    : never
  : T extends readonly (infer U)[]
    ? (Overlay<U> | null)[]
    : T extends object
      ? { [K in Exclude<keyof T, ProtectedKey>]?: Overlay<T[K]> }
      : never

export type LessonKm = Overlay<Lesson>
export type QuestionKm = Overlay<Question>
export type QuizKm = Overlay<Omit<Quiz, 'questions'>>
export type ExerciseKm = Overlay<Exercise>
export type UnitKm = Overlay<Unit>
export type PathKm = Overlay<Omit<LearningPath, 'units'>>

export interface ResourcesKm {
  /** English `Shortcut.action` → Khmer action text. */
  shortcutActions: Record<string, string>
  /** English `Shortcut.category` → Khmer category label. */
  shortcutCategories: Record<string, string>
  /** English glossary `term` → Khmer definition (the term itself stays English). */
  glossary: Record<string, string>
  /** English FAQ question → Khmer question and answer. */
  faqs: Record<string, { question: string; answer: string }>
}

export interface KmContent {
  lessons: Record<string, LessonKm>
  questions: Record<string, QuestionKm>
  quizzes: Record<string, QuizKm>
  exercises: Record<string, ExerciseKm>
  units: Record<string, UnitKm>
  paths: Record<string, PathKm>
  resources: ResourcesKm
}
