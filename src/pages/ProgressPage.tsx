import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Clock,
  FlaskConical,
  RotateCcw,
  Trophy,
} from 'lucide-react'
import { allLessons, getPathLessons, paths } from '../data/curriculum'
import { exercises } from '../data/exercises'
import { quizzes } from '../data/questions'
import { useProgress, quizPercent } from '../store/progress'
import { ProgressBar } from '../components/PathCard'
import { formatDate } from '../lib/utils'

export default function ProgressPage() {
  const { completedLessons, quizAttempts, completedExercises, resetProgress } = useProgress()
  const [confirming, setConfirming] = useState(false)

  const doneLessons = allLessons.filter((lesson) => completedLessons[lesson.id])
  const overall = Math.round((doneLessons.length / allLessons.length) * 100)
  const passedQuizzes = quizzes.filter((quiz) => {
    const attempt = quizAttempts[quiz.id]
    return attempt && quizPercent(attempt) >= quiz.passScore
  })
  const doneProjects = exercises.filter((exercise) => completedExercises[exercise.id])
  const totalMinutes = doneLessons.reduce((total, lesson) => total + lesson.duration, 0)
  const attemptedQuizzes = quizzes.filter((quiz) => quizAttempts[quiz.id])

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-label">
            <BarChart3 size={13} /> My progress
          </span>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Your learning record</h1>
          <p className="mt-2 text-muted">Stored in this browser only. Clearing site data removes it.</p>
        </div>
        {confirming ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                resetProgress()
                setConfirming(false)
              }}
              className="rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Yes, reset everything
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirming(true)} className="btn-secondary">
            <RotateCcw size={14} />
            Reset progress
          </button>
        )}
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: CheckCircle2, value: `${doneLessons.length}/${allLessons.length}`, label: 'lessons complete' },
          { icon: Trophy, value: `${passedQuizzes.length}/${quizzes.length}`, label: 'assessments passed' },
          { icon: FlaskConical, value: `${doneProjects.length}/${exercises.length}`, label: 'projects complete' },
          { icon: Clock, value: `${Math.round(totalMinutes / 60)}h`, label: 'lesson time logged' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card flex items-center gap-3 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-word-50 text-word-600 dark:bg-word-500/15 dark:text-word-300">
                <Icon size={18} />
              </span>
              <div>
                <div className="font-display text-xl font-bold">{stat.value}</div>
                <div className="text-[11px] uppercase tracking-wide text-muted">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <section className="card p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Overall completion</h2>
            <p className="mt-1 text-sm text-muted">Across both paths.</p>
          </div>
          <span className="font-display text-3xl font-bold">{overall}%</span>
        </div>
        <ProgressBar value={overall} className="mt-3 h-2.5" />
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">By path</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {paths.map((path) => {
            const lessons = getPathLessons(path.id)
            const done = lessons.filter((lesson) => completedLessons[lesson.id]).length
            const percent = Math.round((done / lessons.length) * 100)
            const isWord = path.id === 'word'
            return (
              <div key={path.id} className="card p-5">
                <div className="flex items-center justify-between">
                  <Link to={`/paths/${path.id}`} className="font-display text-lg font-bold hover:text-word-600">
                    {path.title}
                  </Link>
                  <span className="text-sm font-semibold">{percent}%</span>
                </div>
                <ProgressBar value={percent} tone={isWord ? 'word' : 'excel'} className="mt-2" />
                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <span>
                    {done} of {lessons.length} lessons
                  </span>
                  <Link to={`/paths/${path.id}`} className="font-semibold text-word-600 dark:text-word-300">
                    Open path
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {path.units.map((unit) => {
                    const unitDone = unit.lessonIds.filter((id) => completedLessons[id]).length
                    return (
                      <div key={unit.id} className="rounded-lg border hairline bg-white/40 p-2 dark:bg-white/[0.03]">
                        <div className="truncate text-[10px] font-semibold uppercase tracking-wide text-muted">
                          Unit {unit.number}
                        </div>
                        <div className="mt-0.5 text-xs font-medium">
                          {unitDone}/{unit.lessonIds.length} done
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Assessments</h2>
            <Link to="/quizzes" className="btn-ghost">
              All quizzes
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {attemptedQuizzes.length === 0 && (
              <div className="card p-5 text-sm text-muted">
                No attempts yet.{' '}
                <Link to="/quizzes" className="font-semibold text-word-600 dark:text-word-300">
                  Take a checkpoint
                </Link>{' '}
                to see your scores here.
              </div>
            )}
            {attemptedQuizzes.map((quiz) => {
              const attempt = quizAttempts[quiz.id]
              const percent = quizPercent(attempt)
              const passed = percent >= quiz.passScore
              return (
                <Link
                  key={quiz.id}
                  to={`/quizzes/${quiz.id}`}
                  className="card flex items-center gap-3 p-3.5 transition hover:shadow-lift"
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                      passed
                        ? 'bg-excel-50 text-excel-600 dark:bg-excel-500/15 dark:text-excel-300'
                        : 'bg-ink-100 text-muted dark:bg-white/10'
                    }`}
                  >
                    <ClipboardCheck size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{quiz.title}</div>
                    <div className="text-[11px] text-muted">
                      Best {attempt.bestScore}/{attempt.bestTotal} · {attempt.attempts}{' '}
                      {attempt.attempts === 1 ? 'attempt' : 'attempts'} · {formatDate(attempt.lastAt)}
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${passed ? 'text-excel-600 dark:text-excel-400' : 'text-muted'}`}>
                    {percent}%
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Completed projects</h2>
            <Link to="/practice" className="btn-ghost">
              All projects
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {doneProjects.length === 0 && (
              <div className="card p-5 text-sm text-muted">
                No projects completed yet.{' '}
                <Link to="/practice" className="font-semibold text-word-600 dark:text-word-300">
                  Browse projects
                </Link>{' '}
                and mark one complete when you finish it.
              </div>
            )}
            {doneProjects.map((project) => (
              <Link
                key={project.id}
                to={`/practice/${project.id}`}
                className="card flex items-center gap-3 p-3.5 transition hover:shadow-lift"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-excel-50 text-excel-600 dark:bg-excel-500/15 dark:text-excel-300">
                  <CheckCircle2 size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{project.title}</div>
                  <div className="text-[11px] text-muted">
                    {project.pathId} · finished {formatDate(completedExercises[project.id])}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Lesson checklist</h2>
          <span className="text-xs text-muted">{doneLessons.length} of {allLessons.length} complete</span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {allLessons.map((lesson) => {
            const done = Boolean(completedLessons[lesson.id])
            return (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs transition ${
                  done
                    ? 'border-excel-200/60 bg-excel-50/40 dark:border-excel-500/20 dark:bg-excel-500/5'
                    : 'border-[rgb(148_163_184_/_0.2)] bg-white/40 hover:bg-ink-50/60 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]'
                }`}
              >
                {done ? (
                  <CheckCircle2 size={14} className="shrink-0 text-excel-500" />
                ) : (
                  <Circle size={14} className="shrink-0 text-muted opacity-50" />
                )}
                <span className={`truncate ${done ? 'text-muted' : ''}`}>{lesson.title}</span>
                <span className="ml-auto shrink-0 text-[10px] uppercase text-muted">{lesson.id}</span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
