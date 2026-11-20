import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  FlaskConical,
  ListChecks,
  Search } from 'lucide-react'
import OfficeAppIcon from '../components/icons/OfficeAppIcon'
import { exercises } from '../data/exercises'
import { useProgress } from '../store/progress'
import { useT } from '../i18n'
import { useLocalize } from '../i18n/content'

const filters = [
  { id: 'all', label: 'practice.filter.all' },
  { id: 'word', label: 'practice.filter.word' },
  { id: 'excel', label: 'practice.filter.excel' },
  { id: 'admin', label: 'practice.filter.admin' },
] as const

export default function PracticePage() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const [query, setQuery] = useState('')
  const completed = useProgress((state) => state.completedExercises)
  const t = useT()
  const L = useLocalize()

  const visible = exercises.map(L.exercise).filter((exercise) => {
    const matchesFilter = filter === 'all' || exercise.pathId === filter || exercise.scenario === filter
    const matchesQuery =
      query.trim().length === 0 ||
      `${exercise.title} ${exercise.subtitle} ${exercise.overview}`.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <span className="section-label">
          <FlaskConical size={13} />
          {t('practice.label')}
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">{t('practice.title')}</h1>
        <p className="mt-3 text-lg text-muted">
          {t('practice.lead')}
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { app: 'word' as const, value: '6', label: t('practice.stat.word') },
          { app: 'excel' as const, value: '6', label: t('practice.stat.excel') },
          { app: undefined, value: `${Object.keys(completed).length}`, label: t('practice.stat.done') },
        ].map((stat) => {
          return (
            <div key={stat.label} className="card flex items-center gap-3 p-4">
              {stat.app ? (
                <OfficeAppIcon app={stat.app} size={40} />
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-excel-50 text-excel-600 dark:bg-excel-500/15 dark:text-excel-300">
                  <CheckCircle2 size={18} />
                </span>
              )}
              <div>
                <div className="font-display text-xl font-bold">{stat.value}</div>
                <div className="text-[11px] uppercase tracking-wide text-muted">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                filter === item.id
                  ? 'bg-word-600 text-white'
                  : 'border hairline bg-white/40 text-muted hover:text-[var(--text-strong)] dark:bg-white/5'
              }`}
            >
              {t(item.label)}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('practice.search')}
            className="w-full rounded-xl border hairline bg-white/50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-word-400 dark:bg-white/5 sm:w-64"
            aria-label={t('practice.search')}
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="card p-10 text-center">
          <Search size={28} className="mx-auto text-muted" />
          <h2 className="mt-3 font-display text-xl font-bold">{t('practice.empty')}</h2>
          <p className="mt-1 text-sm text-muted">{t('practice.emptyBody')}</p>
          <button
            type="button"
            onClick={() => {
              setFilter('all')
              setQuery('')
            }}
            className="btn-secondary mt-4"
          >
            {t('practice.clear')}
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((exercise) => {
            const done = Boolean(completed[exercise.id])
            const isWord = exercise.pathId === 'word'
            return (
              <Link
                key={exercise.id}
                to={`/practice/${exercise.id}`}
                className="group card flex flex-col p-5 lift"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      isWord
                        ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                        : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
                    }`}
                  >
                    <OfficeAppIcon app={exercise.pathId} variant="glyph" size={11} />
                    {t(`app.${exercise.pathId}`)}
                  </span>
                  {done ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-excel-600 dark:text-excel-400">
                      <CheckCircle2 size={12} /> {t('common.completed')}
                    </span>
                  ) : (
                    <span className="chip">{t(`difficulty.${exercise.difficulty}`)}</span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-lg font-bold leading-snug">{exercise.title}</h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{exercise.subtitle}</p>
                <div className="mt-4 flex items-center gap-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} /> {t('common.min', { n: exercise.duration })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ListChecks size={11} /> {t('common.criteria', { n: exercise.criteria.length })}
                  </span>
                  {exercise.starter && (
                    <span className="inline-flex items-center gap-1">
                      <Download size={11} /> {t('common.starterFile')}
                    </span>
                  )}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-word-600 dark:text-word-300">
                  {done ? t('common.reviewProject') : t('common.openProject')}
                  <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
