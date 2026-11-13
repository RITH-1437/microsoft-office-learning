import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  ClipboardCheck,
  Clock,
  FlaskConical,
  Play,
  Table2,
  Target,
} from 'lucide-react'
import { getPath, getPathLessons, getUnitLessons, pathMinutes } from '../data/curriculum'
import { exercisesForPath } from '../data/exercises'
import { getQuiz } from '../data/questions'
import { useProgress } from '../store/progress'
import { ProgressBar } from '../components/PathCard'
import { formatMinutes } from '../lib/utils'

export default function PathDetailPage() {
  const { pathId } = useParams()
  const path = getPath(pathId ?? '')
  const completed = useProgress((state) => state.completedLessons)

  if (!path) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Path not found</h1>
        <p className="mt-2 text-muted">That learning path does not exist.</p>
        <Link to="/paths" className="btn-primary mt-6">
          <ArrowLeft size={16} />
          Back to paths
        </Link>
      </div>
    )
  }

  const lessons = getPathLessons(path.id)
  const done = lessons.filter((lesson) => completed[lesson.id]).length
  const percent = Math.round((done / lessons.length) * 100)
  const isWord = path.id === 'word'
  const projects = exercisesForPath(path.id)
  const nextLesson = lessons.find((lesson) => !completed[lesson.id]) ?? lessons[0]

  return (
    <div className="space-y-10">
      <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/paths" className="hover:text-[var(--text-strong)]">
          Paths
        </Link>
        <ChevronRight size={12} />
        <span className="text-[var(--text-strong)]">{path.title}</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border hairline bg-gradient-to-br from-white/80 to-ink-50/60 p-6 shadow-soft dark:from-ink-900/70 dark:to-ink-900/30 sm:p-9">
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl ${
            isWord ? 'bg-word-300/40' : 'bg-excel-300/40'
          }`}
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                isWord
                  ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                  : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
              }`}
            >
              {isWord ? <BookOpen size={13} /> : <Table2 size={13} />}
              {lessons.length} lessons · {path.units.length} units
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight">{path.title}</h1>
            <p className="mt-3 text-muted">{path.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {path.outcomes.map((outcome) => (
                <span key={outcome} className="chip">
                  <CheckCircle2 size={11} />
                  {outcome}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full max-w-sm shrink-0">
            <div className="rounded-2xl border hairline bg-white/60 p-4 dark:bg-white/5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Your progress</span>
                <span className="font-display text-2xl font-bold">{percent}%</span>
              </div>
              <ProgressBar value={percent} tone={isWord ? 'word' : 'excel'} className="mt-2" />
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
                <span>
                  {done} of {lessons.length} lessons
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={11} /> {formatMinutes(pathMinutes(path.id))}
                </span>
              </div>
              <Link
                to={`/lesson/${nextLesson.id}`}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${
                  isWord ? 'bg-word-600 hover:bg-word-700' : 'bg-excel-600 hover:bg-excel-700'
                }`}
              >
                <Play size={15} />
                {done > 0 ? 'Continue path' : 'Start first lesson'}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="section-label">
              <Target size={13} />
              Curriculum
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold">Units and lessons</h2>
          </div>
          <Link to="/quizzes" className="btn-ghost">
            <ClipboardCheck size={14} />
            Assessments
          </Link>
        </div>

        <div className="mt-5 space-y-5">
          {path.units.map((unit) => {
            const unitLessons = getUnitLessons(unit)
            const unitDone = unitLessons.filter((lesson) => completed[lesson.id]).length
            const quiz = getQuiz(unit.quizId)
            return (
              <section key={unit.id} className="card overflow-hidden">
                <div className="flex flex-col gap-3 border-b hairline px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex items-start gap-3">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold ${
                        isWord
                          ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                          : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
                      }`}
                    >
                      {unit.number}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold">{unit.title}</h3>
                      <p className="mt-0.5 text-sm text-muted">{unit.description}</p>
                    </div>
                  </div>
                  <span className="chip shrink-0 self-start sm:self-auto">
                    {unitDone}/{unitLessons.length} complete
                  </span>
                </div>

                <ol className="divide-y divide-[rgb(148_163_184_/_0.16)]">
                  {unitLessons.map((lesson, index) => {
                    const isDone = Boolean(completed[lesson.id])
                    return (
                      <li key={lesson.id}>
                        <Link
                          to={`/lesson/${lesson.id}`}
                          className="group flex items-center gap-3 px-5 py-3.5 transition hover:bg-ink-50/70 dark:hover:bg-white/[0.03] sm:px-6"
                        >
                          {isDone ? (
                            <CheckCircle2 size={18} className="shrink-0 text-excel-500" />
                          ) : (
                            <Circle size={18} className="shrink-0 text-ink-300 dark:text-ink-600" />
                          )}
                          <span className="w-5 shrink-0 text-[11px] font-semibold tabular-nums text-muted">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className={`truncate text-sm font-medium ${isDone ? 'text-muted' : ''}`}>
                              {lesson.title}
                            </div>
                            <div className="truncate text-xs text-muted">{lesson.subtitle}</div>
                          </div>
                          <span className="hidden shrink-0 items-center gap-3 text-[11px] text-muted sm:flex">
                            <span>{lesson.difficulty}</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock size={11} /> {lesson.duration} min
                            </span>
                          </span>
                          <ChevronRight size={16} className="shrink-0 text-muted transition group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    )
                  })}
                </ol>

                {quiz && (
                  <Link
                    to={`/quizzes/${quiz.id}`}
                    className="flex items-center gap-3 border-t hairline bg-ink-50/50 px-5 py-3.5 transition hover:bg-ink-100/60 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] sm:px-6"
                  >
                    <ClipboardCheck size={17} className="shrink-0 text-word-500" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{quiz.title}</div>
                      <div className="text-xs text-muted">
                        {quiz.questions.length} questions · {quiz.passScore}% to pass
                      </div>
                    </div>
                    <ArrowRight size={15} className="shrink-0 text-muted" />
                  </Link>
                )}
              </section>
            )
          })}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="section-label">
              <FlaskConical size={13} />
              Projects
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold">Practice with this path</h2>
          </div>
          <Link to="/practice" className="btn-ghost">
            All projects
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/practice/${project.id}`}
              className="card group lift p-5"
            >
              <div className="flex items-center justify-between">
                <span className="chip">{project.difficulty}</span>
                <span className="text-[11px] text-muted">{project.duration} min</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-snug">{project.title}</h3>
              <p className="mt-1.5 line-clamp-2 text-xs text-muted">{project.subtitle}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-word-600 dark:text-word-300">
                Start project
                <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border hairline bg-white/50 p-5 dark:bg-white/5 sm:flex-row">
        <div className="text-sm text-muted">
          Finished a lesson? Mark it complete at the bottom of the lesson page to update your progress.
        </div>
        <Link to={`/lesson/${nextLesson.id}`} className="btn-primary shrink-0">
          <Play size={15} />
          {done > 0 ? 'Resume path' : 'Begin now'}
        </Link>
      </div>
    </div>
  )
}
