import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import type { LearningPath } from '../types'
import { getPathLessons, pathMinutes } from '../data/curriculum'
import { useProgress } from '../store/progress'
import { formatMinutes } from '../lib/utils'
import TiltCard from './motion/TiltCard'
import OfficeAppIcon from './icons/OfficeAppIcon'

export function ProgressBar({
  value,
  tone = 'word',
  className = '',
  label,
}: {
  value: number
  tone?: 'word' | 'excel'
  className?: string
  label?: string
}) {
  const color = tone === 'excel' ? 'bg-excel-500' : 'bg-word-500'
  const clamped = Math.min(100, Math.max(0, value))
  // Fill grows from 0 on mount (transform-free width transition on a 6px bar).
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])
  return (
    <div
      role="progressbar"
      aria-label={label ?? 'Progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={`h-1.5 w-full overflow-hidden rounded-full bg-ink-200/80 dark:bg-white/10 ${className}`}
    >
      <div
        className={`progress-fill h-full rounded-full ${color} transition-[width] duration-700 ease-[var(--ease-cine)]`}
        style={{ width: `${ready ? clamped : 0}%` }}
      />
    </div>
  )
}

export default function PathCard({ path }: { path: LearningPath }) {
  const completed = useProgress((state) => state.completedLessons)
  const lessons = getPathLessons(path.id)
  const done = lessons.filter((lesson) => completed[lesson.id]).length
  const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0
  const isWord = path.id === 'word'
  const next = lessons.find((lesson) => !completed[lesson.id]) ?? lessons[0]

  return (
    <TiltCard className="h-full">
    <article
      className={`group glass-panel lift relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-7 ${
        isWord ? 'tint-word' : 'tint-excel'
      }`}
    >
      <span className="tilt-glow" aria-hidden="true" />
      <div
        className={`pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full blur-3xl ${
          isWord ? 'bg-word-300/40' : 'bg-excel-300/40'
        }`}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-4">
        <OfficeAppIcon app={path.id} size={48} />
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
            isWord
              ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
              : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
          }`}
        >
          {lessons.length} lessons
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-bold">{path.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{path.tagline}</p>

      <div className="mt-5 flex items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Clock size={13} />
          {formatMinutes(pathMinutes(path.id))}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen size={13} />
          {path.units.length} units
        </span>
        <span className="ml-auto font-semibold text-[var(--text-strong)]">{percent}%</span>
      </div>
      <ProgressBar value={percent} tone={isWord ? 'word' : 'excel'} className="mt-2" label={`${path.title} progress`} />

      <div className="mt-6 flex items-center gap-3">
        <Link
          to={`/paths/${path.id}`}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
            isWord ? 'bg-word-600 hover:bg-word-700' : 'bg-excel-600 hover:bg-excel-700'
          }`}
        >
          {percent > 0 ? 'Continue path' : 'Explore path'}
          <ArrowRight size={15} />
        </Link>
        {next && (
          <Link
            to={`/lesson/${next.id}`}
            className="text-sm font-medium text-muted transition hover:text-[var(--text-strong)]"
          >
            {percent > 0 ? 'Jump to next lesson' : 'First lesson'}
          </Link>
        )}
      </div>
    </article>
    </TiltCard>
  )
}
