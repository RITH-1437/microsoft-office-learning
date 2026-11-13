import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  FlaskConical,
  ListChecks,
  Search,
} from 'lucide-react'
import { exercises } from '../data/exercises'
import { useProgress } from '../store/progress'

const filters = [
  { id: 'all', label: 'All projects' },
  { id: 'word', label: 'Word' },
  { id: 'excel', label: 'Excel' },
  { id: 'admin', label: 'Admin scenarios' },
] as const

export default function PracticePage() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const [query, setQuery] = useState('')
  const completed = useProgress((state) => state.completedExercises)

  const visible = exercises.filter((exercise) => {
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
          Practice projects
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Build something you can keep</h1>
        <p className="mt-3 text-lg text-muted">
          Twelve realistic projects with starter files, step-by-step instructions, success criteria, and a
          place to record completion.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: FileText, value: '6', label: 'Word projects' },
          { icon: FileSpreadsheet, value: '6', label: 'Excel projects' },
          { icon: CheckCircle2, value: `${Object.keys(completed).length}`, label: 'completed by you' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card flex items-center gap-3 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-excel-50 text-excel-600 dark:bg-excel-500/15 dark:text-excel-300">
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                filter === item.id
                  ? 'bg-word-600 text-white'
                  : 'border hairline bg-white/40 text-muted hover:text-[var(--text-strong)] dark:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects"
            className="w-full rounded-xl border hairline bg-white/50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-word-400 dark:bg-white/5 sm:w-64"
            aria-label="Search projects"
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="card p-10 text-center">
          <Search size={28} className="mx-auto text-muted" />
          <h2 className="mt-3 font-display text-xl font-bold">No projects match</h2>
          <p className="mt-1 text-sm text-muted">Try a different filter or search term.</p>
          <button
            type="button"
            onClick={() => {
              setFilter('all')
              setQuery('')
            }}
            className="btn-secondary mt-4"
          >
            Clear filters
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
                    {isWord ? <FileText size={11} /> : <FileSpreadsheet size={11} />}
                    {exercise.pathId}
                  </span>
                  {done ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-excel-600 dark:text-excel-400">
                      <CheckCircle2 size={12} /> Completed
                    </span>
                  ) : (
                    <span className="chip">{exercise.difficulty}</span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-lg font-bold leading-snug">{exercise.title}</h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{exercise.subtitle}</p>
                <div className="mt-4 flex items-center gap-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} /> {exercise.duration} min
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ListChecks size={11} /> {exercise.criteria.length} criteria
                  </span>
                  {exercise.starter && (
                    <span className="inline-flex items-center gap-1">
                      <Download size={11} /> starter file
                    </span>
                  )}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-word-600 dark:text-word-300">
                  {done ? 'Review project' : 'Open project'}
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
