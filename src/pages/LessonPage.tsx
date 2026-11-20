import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  GraduationCap,
  Lightbulb,
  ListChecks,
  MousePointer2,
  Play,
  Sparkles,
  Target,
  Workflow } from 'lucide-react'
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
import OfficeAppIcon from '../components/icons/OfficeAppIcon'
import OfficeStepGuide from '../components/office/OfficeStepGuide'
import RichText from '../components/RichText'
import Confetti from '../components/motion/Confetti'
import { fadeUp, stagger, staggerContainer } from '../lib/motion'
import type { PracticeBlock, Tutorial } from '../types'
import ContentLanguageNote from '../components/ContentLanguageNote'
import { useT, type MessageKey } from '../i18n'
import { useLocalize } from '../i18n/content'

const LESSON_SECTIONS: { id: string; label: MessageKey }[] = [
  { id: 'learn', label: 'lesson.sec.learn' },
  { id: 'explain', label: 'lesson.sec.explain' },
  { id: 'why', label: 'lesson.sec.why' },
  { id: 'how', label: 'lesson.sec.how' },
  { id: 'example', label: 'lesson.sec.example' },
  { id: 'try', label: 'lesson.sec.try' },
  { id: 'quiz', label: 'lesson.sec.quiz' },
  { id: 'takeaway', label: 'lesson.sec.takeaway' },
]

function SectionHeading({ number, title, tone, hint }: { number: number; title: string; tone: 'word' | 'excel'; hint?: string }) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-display text-sm font-bold text-white ${
            tone === 'word' ? 'bg-word-600' : 'bg-excel-600'
          }`}
          aria-hidden="true"
        >
          {number}
        </span>
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
    </div>
  )
}

function TutorialWorkflow({ tutorial, tone }: { tutorial: Tutorial; tone: 'word' | 'excel' }) {
  const accent = tone === 'word'
    ? 'border-word-200/70 bg-word-50/50 text-word-700 dark:border-word-500/20 dark:bg-word-500/10 dark:text-word-200'
    : 'border-excel-200/70 bg-excel-50/50 text-excel-700 dark:border-excel-500/20 dark:bg-excel-500/10 dark:text-excel-200'

  const hasUi = tutorial.steps.some((step) => step.ui)
  const t = useT()

  return (
    <div className="card overflow-hidden">
      <div className="flex items-start gap-3 border-b hairline px-4 py-3 sm:px-5">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${accent}`}>
          <Workflow size={16} />
        </span>
        <div>
          <h3 className="text-sm font-bold">{tutorial.title}</h3>
          {tutorial.intro && <p className="mt-0.5 text-xs text-muted"><RichText text={tutorial.intro} /></p>}
        </div>
      </div>

      {hasUi ? (
        <div className="px-4 py-4 sm:px-5">
          <OfficeStepGuide app={tone} steps={tutorial.steps} result={tutorial.result} />
        </div>
      ) : (
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
                <p className="mt-2 text-xs font-semibold leading-snug"><RichText text={step.instruction} /></p>
                {step.detail && <p className="mt-1 text-[11px] leading-relaxed text-muted"><RichText text={step.detail} /></p>}
                {step.shortcut && <span className="kbd mt-2 inline-flex text-[10px]">{step.shortcut}</span>}
              </div>
              {index < tutorial.steps.length - 1 && <ArrowRight size={16} className="shrink-0 text-muted/60" />}
            </m.li>
          ))}
        </m.ol>
      </div>
      )}

      <div className="flex items-center gap-2 border-t hairline bg-ink-50/50 px-4 py-2.5 text-xs dark:bg-white/[0.02] sm:px-5">
        <CheckCircle2 size={14} className="shrink-0 text-excel-500" />
        <span className="font-semibold text-[var(--text-strong)]">{t('lesson.outcome')}</span>
        <span className="text-muted"><RichText text={tutorial.result} /></span>
      </div>
    </div>
  )
}

function PracticeCard({ block, tone }: { block: PracticeBlock; tone: 'guided' | 'independent' }) {
  const t = useT()
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
            {tone === 'guided' ? t('lesson.sec.try') : t('lesson.extra')}
          </div>
          <h4 className="text-sm font-semibold">{block.title}</h4>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted"><RichText text={block.goal} /></p>
      <ol className="mt-3 space-y-2">
        {block.steps.map((step, index) => (
          <li key={step} className="flex gap-2.5 text-sm">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/70 text-[10px] font-bold text-muted dark:bg-white/10">
              {index + 1}
            </span>
            <span className="text-muted"><RichText text={step} /></span>
          </li>
        ))}
      </ol>
      {block.hint && (
        <div className="mt-3 flex gap-2 rounded-lg bg-white/60 p-3 text-xs text-muted dark:bg-white/5">
          <Lightbulb size={14} className="mt-0.5 shrink-0 text-amber-500" />
          <span><RichText text={block.hint} /></span>
        </div>
      )}
      <div className="mt-3 border-t hairline pt-3">
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted">{t('lesson.doneWhen')}</div>
        <ul className="space-y-1">
          {block.expected.map((item) => (
            <li key={item} className="flex gap-2 text-xs text-muted">
              <Check size={12} className="mt-0.5 shrink-0 text-excel-500" />
              <RichText text={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function LessonPage() {
  const { lessonId } = useParams()
  const L = useLocalize()
  const sourceLesson = getLesson(lessonId)
  const lesson = sourceLesson ? L.lesson(sourceLesson) : undefined
  const completed = useProgress((state) => state.completedLessons)
  const markLessonComplete = useProgress((state) => state.markLessonComplete)
  const unmarkLessonComplete = useProgress((state) => state.unmarkLessonComplete)
  const setLastLesson = useProgress((state) => state.setLastLesson)
  // Increments each time the learner marks a lesson complete; drives the one-shot celebration.
  const [celebration, setCelebration] = useState(0)
  const t = useT()

  useEffect(() => {
    if (lesson) setLastLesson(lesson.id)
  }, [lesson, setLastLesson])

  if (!lesson) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-3xl font-bold">{t('lesson.notFound')}</h1>
        <p className="mt-2 text-muted">{t('lesson.notFoundBody')}</p>
        <Link to="/paths" className="btn-primary mt-6">
          <ArrowLeft size={16} />
          {t('common.backToPaths')}
        </Link>
      </div>
    )
  }

  const sourcePath = getPath(lesson.pathId)
  const path = sourcePath ? L.path(sourcePath) : undefined
  const sourceUnit = unitById.get(lesson.unitId)
  const unit = sourceUnit ? L.unit(sourceUnit) : undefined
  const adjacent = getAdjacentLessons(lesson.id)
  const previous = adjacent.previous ? L.lesson(adjacent.previous) : undefined
  const next = adjacent.next ? L.lesson(adjacent.next) : undefined
  const isDone = Boolean(completed[lesson.id])
  const pathPercent = pathProgressPercent(lesson.pathId, completed)
  const isWord = lesson.pathId === 'word'
  const unitLessons = unit ? getUnitLessons(unit).map(L.lesson) : []
  const unitIndex = unitLessons.findIndex((item) => item.id === lesson.id)
  const sourceQuiz = unit ? getQuiz(unit.quizId) : undefined
  const quiz = sourceQuiz ? L.quiz(sourceQuiz) : undefined
  const pathLessons = path?.units.flatMap((item) => getUnitLessons(item)) ?? []
  const lessonNumber = pathLessons.findIndex((item) => item.id === lesson.id) + 1

  return (
    <div className="space-y-8">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label={t('lesson.breadcrumb')}>
        <Link to="/paths" className="hover:text-[var(--text-strong)]">
          {t('nav.paths')}
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
                <OfficeAppIcon app={lesson.pathId} variant="glyph" size={12} />
                {t('lesson.number', { n: lessonNumber, total: pathLessons.length })}
              </span>
              <span className="chip">{t(`difficulty.${lesson.difficulty}`)}</span>
              <span className="chip">
                <Clock size={11} /> {t('common.min', { n: lesson.duration })}
              </span>
              {isDone && (
                <span className="inline-flex items-center gap-1 rounded-full bg-excel-50 px-2.5 py-1 text-[11px] font-semibold text-excel-700 dark:bg-excel-500/15 dark:text-excel-200">
                  <CheckCircle2 size={12} /> {t('common.completed')}
                </span>
              )}
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{lesson.title}</h1>
            <p className="mt-2 text-lg text-muted">{lesson.subtitle}</p>
            <ContentLanguageNote className="mt-4" />
          </header>

          <article className="lesson-body mt-8 space-y-12">
            <section id="learn" className="scroll-mt-24">
              <SectionHeading number={1} title={t('lesson.sec.learn')} tone={isWord ? 'word' : 'excel'} />
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {lesson.objectives.map((objective) => (
                  <li key={objective} className="surface-solid flex gap-2.5 rounded-xl p-3 text-sm">
                    <Target size={15} className={`mt-0.5 shrink-0 ${isWord ? 'text-word-600' : 'text-excel-600'}`} aria-hidden="true" />
                    <span><RichText text={objective} /></span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="explain" className="scroll-mt-24">
              <SectionHeading number={2} title={t('lesson.sec.explain')} tone={isWord ? 'word' : 'excel'} />
              <div className="surface-solid mt-4 rounded-2xl p-5">
                <div className="reading space-y-3 text-[15px] text-[var(--text-strong)]">
                  {lesson.explain.map((paragraph, index) => (
                    <p key={index}>
                      <RichText text={paragraph} />
                    </p>
                  ))}
                </div>
                {lesson.terms && lesson.terms.length > 0 && (
                  <div className="mt-5 border-t hairline pt-4">
                    <div className="eyebrow text-muted">{t('lesson.wordsToKnow')}</div>
                    <dl className="mt-2 grid gap-2 sm:grid-cols-2">
                      {lesson.terms.map((term) => (
                        <div key={term.term} className="rounded-xl border hairline p-3">
                          <dt
                            className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold ${
                              isWord
                                ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                                : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
                            }`}
                          >
                            {term.term}
                          </dt>
                          <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                            <RichText text={term.definition} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </section>

            <section id="why" className="scroll-mt-24">
              <SectionHeading number={3} title={t('lesson.sec.why')} tone={isWord ? 'word' : 'excel'} />
              <div className={`mt-4 flex gap-3 rounded-2xl border p-5 ${isWord ? 'border-word-200/60 bg-word-50/40 dark:border-word-500/20 dark:bg-word-500/5' : 'border-excel-200/60 bg-excel-50/40 dark:border-excel-500/20 dark:bg-excel-500/5'}`}>
                <Lightbulb size={18} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                <p className="text-[15px] leading-relaxed"><RichText text={lesson.why} /></p>
              </div>
            </section>

            <section id="how" className="scroll-mt-24">
              <SectionHeading
                number={4}
                title={t('lesson.sec.how')}
                tone={isWord ? 'word' : 'excel'}
                hint={lesson.tutorials.some((tutorial) => tutorial.steps.some((step) => step.ui)) ? t('lesson.howHintUi') : t('lesson.howHint')}
              />
              <div className="mt-4 space-y-4">
                {lesson.tutorials.map((tutorial) => (
                  <TutorialWorkflow key={tutorial.title} tutorial={tutorial} tone={isWord ? 'word' : 'excel'} />
                ))}
              </div>
            </section>

            <section id="example" className="scroll-mt-24">
              <SectionHeading number={5} title={t('lesson.sec.example')} tone={isWord ? 'word' : 'excel'} />
              <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="surface-solid rounded-2xl p-5">
                  <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${isWord ? 'text-word-700 dark:text-word-300' : 'text-excel-700 dark:text-excel-300'}`}>
                    <GraduationCap size={14} aria-hidden="true" /> {lesson.example.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted"><RichText text={lesson.example.scenario} /></p>
                  <p className="mt-3 border-t hairline pt-3 text-sm font-medium">
                    <span className={isWord ? 'text-word-700 dark:text-word-300' : 'text-excel-700 dark:text-excel-300'}>{t('lesson.takeawayPrefix')}</span>
                    <RichText text={lesson.example.takeaway} />
                  </p>
                </div>
                <div className="surface-solid min-w-0 rounded-2xl p-4 sm:p-5">
                  <VisualBlock visual={lesson.visual} />
                </div>
              </div>
            </section>

            <section id="try" className="scroll-mt-24">
              <SectionHeading number={6} title={t('lesson.sec.try')} tone={isWord ? 'word' : 'excel'} hint={t('lesson.tryHint')} />
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <PracticeCard block={lesson.guided} tone="guided" />
                <PracticeCard block={lesson.independent} tone="independent" />
              </div>
            </section>

            <section id="quiz" className="scroll-mt-24">
              <SectionHeading number={7} title={t('lesson.sec.quiz')} tone={isWord ? 'word' : 'excel'} hint={t('lesson.quizHint')} />
              <div className="mt-4 space-y-4">
                {[lesson.knowledgeCheck, ...(lesson.quickQuiz ?? [])].map((questionId, index, all) => (
                  <div key={questionId} className="surface-solid rounded-2xl p-5">
                    <div className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-muted">
                      {t('lesson.questionOf', { n: index + 1, total: all.length })}
                    </div>
                    <LessonCheck questionId={questionId} />
                  </div>
                ))}
              </div>
            </section>

            <section id="takeaway" className="scroll-mt-24">
              <SectionHeading number={8} title={t('lesson.sec.takeaway')} tone={isWord ? 'word' : 'excel'} />
              <div className={`mt-4 rounded-2xl border p-5 ${isWord ? 'tint-word border-word-200/60 dark:border-word-500/20' : 'tint-excel border-excel-200/60 dark:border-excel-500/20'}`}>
                <ul className="space-y-2">
                  {lesson.summary.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15px] font-medium">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-excel-600" aria-hidden="true" />
                      <span><RichText text={item} /></span>
                    </li>
                  ))}
                </ul>
              </div>
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
                    {isDone ? t('lesson.doneTitle') : t('lesson.notDoneTitle')}
                  </div>
                  <p className="mt-0.5 text-xs text-muted">
                    {isDone ? t('lesson.doneBody') : t('lesson.notDoneBody')}
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
                  {isDone ? t('lesson.markIncomplete') : t('lesson.markComplete')}
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
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">{t('common.previous')}</div>
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
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">{t('common.next')}</div>
                  <div className="truncate text-sm font-semibold">{next.title}</div>
                </div>
                <ArrowRight size={17} className="shrink-0 text-muted transition group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <Link to={`/quizzes/${lesson.pathId}-final`} className="group card flex items-center justify-end gap-3 p-4 text-right lift">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">{t('lesson.pathComplete')}</div>
                  <div className="text-sm font-semibold">{t('lesson.takeFinal')}</div>
                </div>
                <ArrowRight size={17} className="shrink-0 text-muted transition group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <nav className="card hidden p-5 lg:block" aria-label={t('lesson.inThisLesson')}>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t('lesson.inThisLesson')}</div>
            <ol className="mt-3 space-y-1">
              {LESSON_SECTIONS.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} onClick={(event) => {
                    event.preventDefault()
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }} className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs text-muted transition-colors hover:bg-ink-50 hover:text-[var(--text-strong)] dark:hover:bg-white/5">
                    <span className="w-4 text-right font-semibold tabular-nums">{index + 1}</span>
                    {t(section.label)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <OfficeAppIcon app={lesson.pathId} size={24} />
                {t('lesson.pathProgress')}
              </span>
              <span className="font-display text-xl font-bold">{pathPercent}%</span>
            </div>
            <ProgressBar value={pathPercent} tone={isWord ? 'word' : 'excel'} className="mt-2" />
            <div className="mt-4 space-y-2 text-xs text-muted">
              <div className="flex items-center justify-between">
                <span>{t('lesson.unit')}</span>
                <span className="font-medium text-[var(--text-strong)]">{unit?.title ?? '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t('lesson.inThisUnit')}</span>
                <span className="font-medium text-[var(--text-strong)]">
                  {t('lesson.ofN', { n: unitIndex + 1, total: unitLessons.length })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t('lesson.estimated')}</span>
                <span className="font-medium text-[var(--text-strong)]">{t('common.min', { n: lesson.duration })}</span>
              </div>
            </div>
            {quiz && (
              <Link
                to={`/quizzes/${quiz.id}`}
                className="mt-4 flex items-center gap-2 rounded-xl border hairline bg-white/50 px-3 py-2 text-xs font-semibold transition hover:bg-ink-50 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <ListChecks size={14} className="text-word-500" />
                {t('lesson.checkpoint')}
                <ArrowRight size={12} className="ml-auto" />
              </Link>
            )}
          </div>

          <div className="card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t('lesson.inThisUnit')}</div>
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
                <Sparkles size={13} /> {t('lesson.comingNext')}
              </div>
              <p className="mt-2 text-sm text-muted">{lesson.nextTeaser}</p>
            </div>
          )}

          <Link to="/practice" className="card lift flex items-center gap-3 p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-100 text-ink-700 dark:bg-white/10 dark:text-ink-200">
              <Target size={17} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold">{t('lesson.apply')}</div>
              <div className="text-xs text-muted">{t('lesson.applyBody')}</div>
            </div>
            <ArrowRight size={15} className="ml-auto shrink-0 text-muted" />
          </Link>
        </aside>
      </div>
    </div>
  )
}
