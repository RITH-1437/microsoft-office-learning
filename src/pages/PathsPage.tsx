import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock, Layers } from 'lucide-react'
import OfficeAppIcon from '../components/icons/OfficeAppIcon'
import { paths, getPathLessons, pathMinutes } from '../data/curriculum'
import { useProgress } from '../store/progress'
import PathCard, { ProgressBar } from '../components/PathCard'
import { formatMinutes } from '../lib/utils'

export default function PathsPage() {
  const completed = useProgress((state) => state.completedLessons)

  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <span className="section-label">
          <Layers size={13} />
          Learning paths
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Choose where to begin</h1>
        <p className="mt-3 text-lg text-muted">
          Both paths assume zero experience. Word builds document confidence; Excel builds spreadsheet
          confidence. You can take them in either order.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {paths.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>

      <section className="card overflow-hidden">
        <div className="border-b hairline px-6 py-5">
          <h2 className="font-display text-xl font-bold">Which path should I start with?</h2>
          <p className="mt-1 text-sm text-muted">Pick the work you are most likely to be asked to do first.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b hairline text-[11px] uppercase tracking-wide text-muted">
                <th className="px-6 py-3 font-semibold">Question</th>
                <th className="px-6 py-3 font-semibold">Microsoft Word</th>
                <th className="px-6 py-3 font-semibold">Microsoft Excel</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Best if you write...', 'Memos, letters, reports, minutes', 'Trackers, reports, budgets, lists'],
                ['You will finish with...', 'A polished document pack and PDF', 'A working workbook and dashboard'],
                ['Core skill', 'Layout, styles, review', 'Formulas, references, analysis'],
                ['Lessons', `${getPathLessons('word').length}`, `${getPathLessons('excel').length}`],
                ['Estimated time', formatMinutes(pathMinutes('word')), formatMinutes(pathMinutes('excel'))],
              ].map((row) => (
                <tr key={row[0]} className="border-b hairline last:border-0">
                  <td className="px-6 py-3.5 font-medium">{row[0]}</td>
                  <td className="px-6 py-3.5 text-muted">{row[1]}</td>
                  <td className="px-6 py-3.5 text-muted">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {paths.map((path) => {
          const lessons = getPathLessons(path.id)
          const done = lessons.filter((lesson) => completed[lesson.id]).length
          const percent = Math.round((done / lessons.length) * 100)
          const isWord = path.id === 'word'
          return (
            <Link
              key={path.id}
              to={`/paths/${path.id}`}
              className="group glass flex items-center gap-4 rounded-2xl p-5 lift"
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${
                  isWord ? 'bg-word-600' : 'bg-excel-600'
                }`}
              >
                <OfficeAppIcon app={path.id} variant="glyph" size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{path.title} overview</span>
                  <span className="text-xs font-semibold">{percent}%</span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={11} /> {done}/{lessons.length} done
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} /> {formatMinutes(pathMinutes(path.id))}
                  </span>
                </div>
                <ProgressBar value={percent} tone={isWord ? 'word' : 'excel'} className="mt-2" />
              </div>
              <ArrowRight size={17} className="shrink-0 text-muted transition group-hover:translate-x-0.5" />
            </Link>
          )
        })}
      </section>
    </div>
  )
}
