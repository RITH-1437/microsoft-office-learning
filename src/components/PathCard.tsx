import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock, Table2 } from 'lucide-react'
import type { LearningPath } from '../types'
import { getPathLessons, pathMinutes } from '../data/curriculum'
import { useProgress } from '../store/progress'
import { formatMinutes } from '../lib/utils'

export function ProgressBar({
  value,
  tone = 'word',
  className = '',
}: {
  value: number
  tone?: 'word' | 'excel'
  className?: string
}) {
  const color = tone === 'excel' ? 'bg-excel-500' : 'bg-word-500'
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-ink-200/80 dark:bg-white/10 ${className}`}>
      <div
        className={`h-full rounded-full ${color} transition-[width] duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
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
  const Icon = isWord ? BookOpen : Table2
  const next = lessons.find((lesson) => !completed[lesson.id]) ?? lessons[0]

  return (
    <article className="group glass relative flex flex-col overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
      <div
        className={`pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full blur-3xl ${
          isWord ? 'bg-word-300/40' : 'bg-excel-300/40'
        }`}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid h-12 w-12 place-items-center rounded-2xl text-white shadow-soft ${
            isWord ? 'bg-gradient-to-br from-word-600 to-word-400' : 'bg-gradient-to-br from-excel-600 to-excel-400'
          }`}
        >
          <Icon size={24} />
        </span>
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
      <ProgressBar value={percent} tone={isWord ? 'word' : 'excel'} className="mt-2" />

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
  )
}
