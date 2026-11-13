import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QuizAttempt } from '../types'

export type Theme = 'light' | 'dark' | 'system'

interface ProgressState {
  completedLessons: Record<string, string>
  quizAttempts: Record<string, QuizAttempt>
  completedExercises: Record<string, string>
  lastLessonId?: string
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  markLessonComplete: (lessonId: string) => void
  unmarkLessonComplete: (lessonId: string) => void
  setLastLesson: (lessonId: string) => void
  recordQuizAttempt: (quizId: string, score: number, total: number) => void
  completeExercise: (exerciseId: string) => void
  uncompleteExercise: (exerciseId: string) => void
  resetProgress: () => void
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = theme === 'dark' || (theme === 'system' && prefersDark)
  document.documentElement.classList.toggle('dark', dark)
}

const now = () => new Date().toISOString()

const asRecord = <T,>(value: unknown): Record<string, T> =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, T>) : {}

/**
 * Rehydration guard: localStorage can be edited by hand or left half-written, so only
 * known keys with the expected shape are restored. Anything else falls back to defaults
 * instead of crashing the first page that reads it.
 */
type PersistedProgress = Pick<ProgressState, 'completedLessons' | 'quizAttempts' | 'completedExercises' | 'lastLessonId' | 'theme'>

function mergePersisted(persisted: unknown, current: ProgressState): ProgressState {
  const saved = asRecord<unknown>(persisted)
  const theme = saved.theme
  return {
    ...current,
    completedLessons: asRecord<string>(saved.completedLessons),
    quizAttempts: asRecord<QuizAttempt>(saved.quizAttempts),
    completedExercises: asRecord<string>(saved.completedExercises),
    lastLessonId: typeof saved.lastLessonId === 'string' ? saved.lastLessonId : undefined,
    theme: theme === 'light' || theme === 'dark' || theme === 'system' ? theme : 'system',
  }
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      quizAttempts: {},
      completedExercises: {},
      theme: 'system',
      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },
      toggleTheme: () => {
        const current = get().theme
        const resolvedDark =
          current === 'dark' ||
          (current === 'system' &&
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        const next: Theme = resolvedDark ? 'light' : 'dark'
        applyTheme(next)
        set({ theme: next })
      },
      markLessonComplete: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons[lessonId]
            ? state.completedLessons
            : { ...state.completedLessons, [lessonId]: now() },
          lastLessonId: lessonId,
        })),
      unmarkLessonComplete: (lessonId) =>
        set((state) => {
          const next = { ...state.completedLessons }
          delete next[lessonId]
          return { completedLessons: next }
        }),
      setLastLesson: (lessonId) => set({ lastLessonId: lessonId }),
      recordQuizAttempt: (quizId, score, total) =>
        set((state) => {
          const previous = state.quizAttempts[quizId]
          const attempt: QuizAttempt = {
            attempts: (previous?.attempts ?? 0) + 1,
            bestScore:
              previous && previous.bestScore / Math.max(previous.bestTotal, 1) > score / Math.max(total, 1)
                ? previous.bestScore
                : score,
            bestTotal:
              previous && previous.bestScore / Math.max(previous.bestTotal, 1) > score / Math.max(total, 1)
                ? previous.bestTotal
                : total,
            lastScore: score,
            lastTotal: total,
            lastAt: now(),
          }
          return { quizAttempts: { ...state.quizAttempts, [quizId]: attempt } }
        }),
      completeExercise: (exerciseId) =>
        set((state) => ({
          completedExercises: state.completedExercises[exerciseId]
            ? state.completedExercises
            : { ...state.completedExercises, [exerciseId]: now() },
        })),
      uncompleteExercise: (exerciseId) =>
        set((state) => {
          const next = { ...state.completedExercises }
          delete next[exerciseId]
          return { completedExercises: next }
        }),
      resetProgress: () =>
        set({ completedLessons: {}, quizAttempts: {}, completedExercises: {}, lastLessonId: undefined }),
    }),
    {
      name: 'office-academy-progress',
      version: 1,
      // Older/unknown versions are accepted as-is; `merge` validates the shape.
      migrate: (persisted) => persisted as PersistedProgress,
      merge: mergePersisted,
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        quizAttempts: state.quizAttempts,
        completedExercises: state.completedExercises,
        lastLessonId: state.lastLessonId,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        applyTheme(state?.theme ?? 'system')
      },
    },
  ),
)

export function quizPercent(attempt: QuizAttempt | undefined): number {
  if (!attempt || attempt.bestTotal === 0) return 0
  return Math.round((attempt.bestScore / attempt.bestTotal) * 100)
}
