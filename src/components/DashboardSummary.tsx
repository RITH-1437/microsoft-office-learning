import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ArrowRight, BookOpen, Briefcase, Flame, Table2 } from 'lucide-react'
import { allLessons, getPathLessons } from '../data/curriculum'
import { exercises } from '../data/exercises'
import { useProgress } from '../store/progress'
import { computeStreak, greeting } from '../lib/streak'
import { fadeUp, staggerContainer } from '../lib/motion'
import CountUp from './motion/CountUp'
import ProgressRing from './motion/ProgressRing'
import TiltCard from './motion/TiltCard'
import OfficeAppIcon from './icons/OfficeAppIcon'

type Tone = 'word' | 'excel' | 'admin'

const toneStyles: Record<Tone, { icon: string; label: string; wash: string }> = {
  word: {
    icon: 'bg-word-600 text-white',
    label: 'text-word-700 dark:text-word-200',
    wash: 'tint-word',
  },
  excel: {
    icon: 'bg-excel-600 text-white',
    label: 'text-excel-700 dark:text-excel-200',
    wash: 'tint-excel',
  },
  admin: {
    icon: 'bg-admin-600 text-white',
    label: 'text-admin-700 dark:text-admin-200',
    wash: 'tint-admin',
  },
}

/**
 * "Welcome back" dashboard: one ring per learning track (Word = blue, Excel = green,
 * administrative projects = violet) plus the learning streak. Reads progress straight
 * from the store; animates once on mount.
 */
export default function DashboardSummary({ compact = false }: { compact?: boolean }) {
  const completedLessons = useProgress((state) => state.completedLessons)
  const completedExercises = useProgress((state) => state.completedExercises)
  const quizAttempts = useProgress((state) => state.quizAttempts)
  const lastLessonId = useProgress((state) => state.lastLessonId)

  const wordLessons = getPathLessons('word')
  const excelLessons = getPathLessons('excel')
  const adminProjects = exercises.filter((exercise) => exercise.scenario === 'admin')

  const wordDone = wordLessons.filter((lesson) => completedLessons[lesson.id]).length
  const excelDone = excelLessons.filter((lesson) => completedLessons[lesson.id]).length
  const adminDone = adminProjects.filter((exercise) => completedExercises[exercise.id]).length

  const pct = (done: number, total: number) => (total ? Math.round((done / total) * 100) : 0)

  const streak = computeStreak([
    ...Object.values(completedLessons),
    ...Object.values(completedExercises),
    ...Object.values(quizAttempts).map((attempt) => attempt.lastAt),
  ])

  const lastLesson = allLessons.find((lesson) => lesson.id === lastLessonId)
  const nextLesson = allLessons.find((lesson) => !completedLessons[lesson.id])
  const resume = lastLesson ?? nextLesson
  const totalDone = wordDone + excelDone
  const hasProgress = totalDone > 0 || adminDone > 0

  const tracks: {
    tone: Tone
    title: string
    detail: string
    value: number
    to: string
    icon: typeof BookOpen
  }[] = [
    {
      tone: 'word',
      title: 'Microsoft Word',
      detail: `${wordDone} of ${wordLessons.length} lessons`,
      value: pct(wordDone, wordLessons.length),
      to: '/paths/word',
      icon: BookOpen,
    },
    {
      tone: 'excel',
      title: 'Microsoft Excel',
      detail: `${excelDone} of ${excelLessons.length} lessons`,
      value: pct(excelDone, excelLessons.length),
      to: '/paths/excel',
      icon: Table2,
    },
    {
      tone: 'admin',
      title: 'Administrative skills',
      detail: `${adminDone} of ${adminProjects.length} projects`,
      value: pct(adminDone, adminProjects.length),
      to: '/practice',
      icon: Briefcase,
    },
  ]

  return (
    <m.section
      data-no-reveal
      aria-label="Your learning dashboard"
      variants={staggerContainer(0.05)}
      initial="hidden"
      animate="show"
      className="glass-panel rounded-3xl p-5 sm:p-7"
    >
      <m.div variants={fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="eyebrow text-muted">{hasProgress ? 'Welcome back' : 'Your dashboard'}</div>
          <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {greeting()}
            {hasProgress ? ' — keep going.' : ' — ready to start?'}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="inline-flex items-center gap-2 rounded-full border hairline bg-white/60 px-3.5 py-2 text-sm font-semibold dark:bg-white/5"
            aria-label={`Learning streak: ${streak.current} ${streak.current === 1 ? 'day' : 'days'}`}
          >
            <Flame
              size={16}
              className={streak.current > 0 ? 'text-amber-500' : 'text-muted'}
              aria-hidden="true"
            />
            <span aria-hidden="true">
              <CountUp value={streak.current} /> day{streak.current === 1 ? '' : 's'}
            </span>
            <span className="text-xs font-medium text-muted" aria-hidden="true">
              {streak.current === 0 ? 'start today' : streak.activeToday ? 'done today' : 'learn today to keep it'}
            </span>
          </div>
          {resume && (
            <Link to={`/lesson/${resume.id}`} className="btn-primary">
              {hasProgress ? 'Resume lesson' : 'Start lesson 1'}
              <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </m.div>

      <div className={`mt-6 grid gap-4 ${compact ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        {tracks.map((track) => {
          const style = toneStyles[track.tone]
          const Icon = track.icon
          return (
            <m.div key={track.tone} variants={fadeUp}>
              <TiltCard className="h-full">
                <Link
                  to={track.to}
                  className={`surface-solid lift relative flex h-full items-center gap-4 overflow-hidden rounded-2xl p-4 ${style.wash}`}
                >
                  <span className="tilt-glow" aria-hidden="true" />
                  <ProgressRing value={track.value} tone={track.tone} size={84} stroke={8} label={`${track.title} progress`}>
                    <span className="font-display text-lg font-bold">
                      <CountUp value={track.value} suffix="%" />
                    </span>
                  </ProgressRing>
                  <div className="min-w-0">
                    {track.tone === 'admin' ? (
                      <span className={`grid h-7 w-7 place-items-center rounded-lg ${style.icon}`} aria-hidden="true">
                        <Icon size={14} />
                      </span>
                    ) : (
                      <OfficeAppIcon app={track.tone} size={28} />
                    )}
                    <div className={`mt-2 text-sm font-bold ${style.label}`}>{track.title}</div>
                    <div className="text-xs text-muted">{track.detail}</div>
                  </div>
                </Link>
              </TiltCard>
            </m.div>
          )
        })}
      </div>
    </m.section>
  )
}
