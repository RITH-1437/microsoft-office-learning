import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  ChevronDown,
  GraduationCap,
  Lightbulb,
  ListChecks,
  MousePointer2,
  Play,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react'
import {
  getAdjacentLessons,
  getLesson,
  getPath,
  getUnitLessons,
  pathProgressPercent,
  unitById,
} from '../data/curriculum'
import { getQuiz } from '../data/questions'
import { useProgress } from '../store/progress'
import { ProgressBar } from '../components/PathCard'
import VisualBlock from '../components/VisualBlock'
import LessonCheck from '../components/LessonCheck'
import Confetti from '../components/motion/Confetti'
import { fadeUp, stagger, staggerContainer } from '../lib/motion'
import type { PracticeBlock, Tutorial } from '../types'

function TutorialWorkflow({ tutorial, tone }: { tutorial: Tutorial; tone: 'word' | 'excel' }) {
  const accent = tone === 'word'
    ? 'border-word-200/70 bg-word-50/50 text-word-700 dark:border-word-500/20 dark:bg-word-500/10 dark:text-word-200'
    : 'border-excel-200/70 bg-excel-50/50 text-excel-700 dark:border-excel-500/20 dark:bg-excel-500/10 dark:text-excel-200'

  return (
    <div className="card overflow-hidden">
      <div className="flex items-start gap-3 border-b hairline px-4 py-3 sm:px-5">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${accent}`}>
          <Workflow size={16} />
        </span>
        <div>
          <h3 className="text-sm font-bold">{tutorial.title}</h3>
          {tutorial.intro && <p className="mt-0.5 text-xs text-muted">{tutorial.intro}</p>}
        </div>
      </div>

      <div className="overflow-x-auto px-4 py-4 sm:px-5">
        <m.ol
          className="flex min-w-max items-stretch gap-2"
          variants={staggerContainer(0, stagger.base)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 'some' }}
        >
          {tutorial.steps.map((step, index) => (
            <m.li key={index} variants={fadeUp} className="flex items-center gap-2">
              <div className="w-44 rounded-xl border hairline bg-white/60 p-3 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2">
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${accent}`}>
                    {index + 1}
                  </span>
                  <MousePointer2 size={12} className="text-muted" />
                </div>
                <p className="mt-2 text-xs font-semibold leading-snug">{step.instruction}</p>
                {step.detail && <p className="mt-1 text-[11px] leading-relaxed text-muted">{step.detail}</p>}
                {step.shortcut && <span className="kbd mt-2 inline-flex text-[10px]">{step.shortcut}</span>}
              </div>
              {index < tutorial.steps.length - 1 && <ArrowRight size={16} className="shrink-0 text-muted/60" />}
            </m.li>
          ))}
        </m.ol>
      </div>

      <div className="flex items-center gap-2 border-t hairline bg-ink-50/50 px-4 py-2.5 text-xs dark:bg-white/[0.02] sm:px-5">
        <CheckCircle2 size={14} className="shrink-0 text-excel-500" />
        <span className="font-semibold text-[var(--text-strong)]">Outcome</span>
        <span className="text-muted">{tutorial.result}</span>
      </div>
    </div>
  )
}

function PracticeCard({ block, tone }: { block: PracticeBlock; tone: 'guided' | 'independent' }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        tone === 'guided'
          ? 'border-word-200/70 bg-word-50/40 dark:border-word-500/20 dark:bg-word-500/5'
          : 'border-excel-200/70 bg-excel-50/40 dark:border-excel-500/20 dark:bg-excel-500/5'
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`grid h-7 w-7 place-items-center rounded-lg text-white ${
            tone === 'guided' ? 'bg-word-600' : 'bg-excel-600'
          }`}
        >
          {tone === 'guided' ? <Play size={13} /> : <Sparkles size={13} />}
        </span>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            {tone === 'guided' ? 'Guided practice' : 'Independent practice'}
          </div>
          <h4 className="text-sm font-semibold">{block.title}</h4>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{block.goal}</p>
      <ol className="mt-3 space-y-2">
        {block.steps.map((step, index) => (
          <li key={step} className="flex gap-2.5 text-sm">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/70 text-[10px] font-bold text-muted dark:bg-white/10">
              {index + 1}
            </span>
            <span className="text-muted">{step}</span>
          </li>
        ))}
      </ol>
      {block.hint && (
        <div className="mt-3 flex gap-2 rounded-lg bg-white/60 p-3 text-xs text-muted dark:bg-white/5">
          <Lightbulb size={14} className="mt-0.5 shrink-0 text-amber-500" />
          <span>{block.hint}</span>
        </div>
      )}
      <div className="mt-3 border-t hairline pt-3">
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted">You are done when</div>
        <ul className="space-y-1">
          {block.expected.map((item) => (
            <li key={item} className="flex gap-2 text-xs text-muted">
              <Check size={12} className="mt-0.5 shrink-0 text-excel-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function LessonPage() {
  const { lessonId } = useParams()
  const lesson = getLesson(lessonId)
  const completed = useProgress((state) => state.completedLessons)
  const markLessonComplete = useProgress((state) => state.markLessonComplete)
  const unmarkLessonComplete = useProgress((state) => state.unmarkLessonComplete)
  const setLastLesson = useProgress((state) => state.setLastLesson)
  // Increments each time the learner marks a lesson complete; drives the one-shot celebration.
  const [celebration, setCelebration] = useState(0)

  useEffect(() => {
    if (lesson) setLastLesson(lesson.id)
  }, [lesson, setLastLesson])

  if (!lesson) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Lesson not found</h1>
        <p className="mt-2 text-muted">That lesson does not exist or the link is incomplete.</p>
        <Link to="/paths" className="btn-primary mt-6">
          <ArrowLeft size={16} />
          Back to paths
        </Link>
      </div>
    )
  }

  const path = getPath(lesson.pathId)
  const unit = unitById.get(lesson.unitId)
  const { previous, next } = getAdjacentLessons(lesson.id)
  const isDone = Boolean(completed[lesson.id])
  const pathPercent = pathProgressPercent(lesson.pathId, completed)
  const isWord = lesson.pathId === 'word'
  const unitLessons = unit ? getUnitLessons(unit) : []
  const unitIndex = unitLessons.findIndex((item) => item.id === lesson.id)
  const quiz = unit ? getQuiz(unit.quizId) : undefined
  const pathLessons = path?.units.flatMap((item) => getUnitLessons(item)) ?? []
  const lessonNumber = pathLessons.findIndex((item) => item.id === lesson.id) + 1

  return (
    <div className="space-y-8">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/paths" className="hover:text-[var(--text-strong)]">
          Paths
        </Link>
        <ChevronRight size={12} />
        <Link to={`/paths/${lesson.pathId}`} className="hover:text-[var(--text-strong)]">
          {path?.title ?? lesson.pathId}
        </Link>
        <ChevronRight size={12} />
        <span className="text-[var(--text-strong)]">{lesson.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  isWord
                    ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                    : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
                }`}
              >
                {isWord ? <BookOpen size={12} /> : <ListChecks size={12} />}
                Lesson {lessonNumber} of {pathLessons.length}
              </span>
              <span className="chip">{lesson.difficulty}</span>
              <span className="chip">
                <Clock size={11} /> {lesson.duration} min
              </span>
              {isDone && (
                <span className="inline-flex items-center gap-1 rounded-full bg-excel-50 px-2.5 py-1 text-[11px] font-semibold text-excel-700 dark:bg-excel-500/15 dark:text-excel-200">
                  <CheckCircle2 size={12} /> Completed
                </span>
              )}
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{lesson.title}</h1>
            <p className="mt-2 text-lg text-muted">{lesson.subtitle}</p>
          </header>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border hairline bg-white/50 p-4 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                <Target size={13} /> What you will learn
              </div>
              <ul className="mt-2 space-y-1.5">
                {lesson.objectives.map((objective) => (
                  <li key={objective} className="flex gap-2 text-sm">
                    <Check size={14} className="mt-0.5 shrink-0 text-excel-500" />
                    <span className="text-muted">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-word-200/60 bg-word-50/40 p-4 dark:border-word-500/20 dark:bg-word-500/5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-word-700 dark:text-word-300">
                <Lightbulb size={13} /> Why it matters
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{lesson.why}</p>
            </div>
          </div>

          <article className="lesson-body mt-10 space-y-10">
            <section>
              <div className="flex items-center gap-2">
                <Workflow size={20} className={isWord ? 'text-word-600' : 'text-excel-600'} />
                <h2 className="font-display text-2xl font-bold">See it at a glance</h2>
              </div>
              <p className="mt-1 text-sm text-muted">Start with the picture, then follow the workflow below.</p>
              <div className="mt-4 rounded-2xl border hairline bg-white/50 p-4 dark:bg-white/[0.03] sm:p-5">
                <VisualBlock visual={lesson.visual} />
              </div>
              {lesson.terms && lesson.terms.length > 0 && (
                <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                  {lesson.terms.map((term) => (
                    <div key={term.term} className="surface-solid rounded-xl p-3.5">
                      <dt
                        className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold ${
                          isWord
                            ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                            : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
                        }`}
                      >
                        {term.term}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-muted">{term.definition}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <details className="group mt-4 rounded-xl border hairline bg-white/40 dark:bg-white/[0.02]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3 text-xs font-semibold text-muted">
                  Want the short explanation?
                  <ChevronDown size={15} className="transition group-open:rotate-180" />
                </summary>
                <div className="space-y-2 border-t hairline px-3 pb-3 pt-2">
                  {lesson.explain.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-6 text-muted">{paragraph}</p>
                  ))}
                </div>
              </details>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold">Follow the workflow</h2>
              <p className="mt-1 text-sm text-muted">Move left to right. Each card is one action in the app.</p>
              <div className="mt-4 space-y-3">
                {lesson.tutorials.map((tutorial) => (
                  <TutorialWorkflow key={tutorial.title} tutorial={tutorial} tone={isWord ? 'word' : 'excel'} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold">A real office example</h2>
              <div className="mt-3 rounded-2xl border border-word-200/60 bg-gradient-to-br from-word-50/60 to-white/40 p-5 dark:border-word-500/20 dark:from-word-500/10 dark:to-transparent">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-word-700 dark:text-word-300">
                  <GraduationCap size={14} /> {lesson.example.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{lesson.example.scenario}</p>
                <p className="mt-3 border-t border-word-200/50 pt-3 text-sm font-medium dark:border-word-500/20">
                  <span className="text-word-700 dark:text-word-300">Takeaway: </span>
                  {lesson.example.takeaway}
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold">Practice</h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <PracticeCard block={lesson.guided} tone="guided" />
                <PracticeCard block={lesson.independent} tone="independent" />
              </div>
            </section>

            <section>
              <div className="rounded-2xl border hairline bg-white/60 p-5 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2">
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-lg text-white ${
                      isWord ? 'bg-word-600' : 'bg-excel-600'
                    }`}
                  >
                    <ListChecks size={16} />
                  </span>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">Knowledge check</div>
                    <h3 className="text-sm font-bold">One quick question</h3>
                  </div>
                </div>
                <div className="mt-4">
                  <LessonCheck key={lesson.knowledgeCheck} questionId={lesson.knowledgeCheck} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold">What to remember</h2>
              <ul className="mt-3 space-y-2">
                {lesson.summary.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-excel-500" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div
              className={`rounded-2xl border p-5 transition-colors duration-500 sm:p-6 ${
                isDone
                  ? 'border-excel-300/60 bg-gradient-to-br from-excel-50/70 to-white/60 dark:border-excel-500/30 dark:from-excel-500/10 dark:to-transparent'
                  : 'hairline bg-gradient-to-br from-white/70 to-ink-50/60 dark:from-ink-900/60 dark:to-ink-900/30'
              }`}
            >
              <Confetti key={celebration} fire={celebration > 0} />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3" role="status" aria-live="polite">
                  {isDone && (
                    <span
                      key={`done-${celebration}`}
                      className="anim-pop grid h-10 w-10 shrink-0 place-items-center rounded-full bg-excel-600 text-white"
                      aria-hidden="true"
                    >
                      <Check size={20} strokeWidth={3} />
                    </span>
                  )}
                  <div>
                  <div className="text-sm font-semibold">
                    {isDone ? 'Lesson completed — nice work!' : 'Finished this lesson?'}
                  </div>
                  <p className="mt-0.5 text-xs text-muted">
                    {isDone
                      ? 'You can unmark it if you want to review it again later.'
                      : 'Mark it complete to update your path progress. Progress stays in this browser.'}
                  </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (isDone) {
                      unmarkLessonComplete(lesson.id)
                    } else {
                      markLessonComplete(lesson.id)
                      setCelebration((count) => count + 1)
                    }
                  }}
                  className={isDone ? 'btn-secondary shrink-0' : 'btn-primary shrink-0'}
                >
                  {isDone ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  {isDone ? 'Mark incomplete' : 'Mark lesson complete'}
                </button>
              </div>
            </div>
          </article>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {previous ? (
              <Link
                to={`/lesson/${previous.id}`}
                className="group card flex items-center gap-3 p-4 lift"
              >
                <ArrowLeft size={17} className="shrink-0 text-muted transition group-hover:-translate-x-0.5" />
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">Previous</div>
                  <div className="truncate text-sm font-semibold">{previous.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={`/lesson/${next.id}`}
                className="group card flex items-center justify-end gap-3 p-4 text-right lift"
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">Next</div>
                  <div className="truncate text-sm font-semibold">{next.title}</div>
                </div>
                <ArrowRight size={17} className="shrink-0 text-muted transition group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <Link to={`/quizzes/${lesson.pathId}-final`} className="group card flex items-center justify-end gap-3 p-4 text-right lift">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">Path complete</div>
                  <div className="text-sm font-semibold">Take the final assessment</div>
                </div>
                <ArrowRight size={17} className="shrink-0 text-muted transition group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Path progress</span>
              <span className="font-display text-xl font-bold">{pathPercent}%</span>
            </div>
            <ProgressBar value={pathPercent} tone={isWord ? 'word' : 'excel'} className="mt-2" />
            <div className="mt-4 space-y-2 text-xs text-muted">
              <div className="flex items-center justify-between">
                <span>Unit</span>
                <span className="font-medium text-[var(--text-strong)]">{unit?.title ?? '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>In this unit</span>
                <span className="font-medium text-[var(--text-strong)]">
                  {unitIndex + 1} of {unitLessons.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated time</span>
                <span className="font-medium text-[var(--text-strong)]">{lesson.duration} min</span>
              </div>
            </div>
            {quiz && (
              <Link
                to={`/quizzes/${quiz.id}`}
                className="mt-4 flex items-center gap-2 rounded-xl border hairline bg-white/50 px-3 py-2 text-xs font-semibold transition hover:bg-ink-50 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <ListChecks size={14} className="text-word-500" />
                Unit checkpoint
                <ArrowRight size={12} className="ml-auto" />
              </Link>
            )}
          </div>

          <div className="card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">In this unit</div>
            <ol className="mt-3 space-y-1.5">
              {unitLessons.map((item, index) => {
                const done = Boolean(completed[item.id])
                const active = item.id === lesson.id
                return (
                  <li key={item.id}>
                    <Link
                      to={`/lesson/${item.id}`}
                      className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-xs transition ${
                        active
                          ? 'bg-word-50 font-semibold text-word-700 dark:bg-word-500/15 dark:text-word-200'
                          : 'text-muted hover:bg-ink-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-excel-500" />
                      ) : (
                        <Circle size={13} className="mt-0.5 shrink-0 opacity-50" />
                      )}
                      <span className="leading-snug">
                        {index + 1}. {item.title}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>

          {lesson.nextTeaser && (
            <div className="rounded-2xl border border-excel-200/60 bg-excel-50/50 p-4 dark:border-excel-500/20 dark:bg-excel-500/5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-excel-700 dark:text-excel-300">
                <Sparkles size={13} /> Coming next
              </div>
              <p className="mt-2 text-sm text-muted">{lesson.nextTeaser}</p>
            </div>
          )}

          <Link to="/practice" className="card lift flex items-center gap-3 p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-100 text-ink-700 dark:bg-white/10 dark:text-ink-200">
              <Target size={17} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold">Apply this skill</div>
              <div className="text-xs text-muted">Try a realistic project</div>
            </div>
            <ArrowRight size={15} className="ml-auto shrink-0 text-muted" />
          </Link>
        </aside>
      </div>
    </div>
  )
}
