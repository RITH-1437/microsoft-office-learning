import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock, Layers } from 'lucide-react'
import OfficeAppIcon from '../components/icons/OfficeAppIcon'
import { paths, getPathLessons, pathMinutes } from '../data/curriculum'
import { useProgress } from '../store/progress'
import PathCard, { ProgressBar } from '../components/PathCard'
import { formatMinutesFor, useT } from '../i18n'

export default function PathsPage() {
  const completed = useProgress((state) => state.completedLessons)
  const t = useT()

  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <span className="section-label">
          <Layers size={13} />
          {t('paths.label')}
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">{t('paths.title')}</h1>
        <p className="mt-3 text-lg text-muted">
          {t('paths.lead')}
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {paths.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>

      <section className="card overflow-hidden">
        <div className="border-b hairline px-6 py-5">
          <h2 className="font-display text-xl font-bold">{t('paths.whichTitle')}</h2>
          <p className="mt-1 text-sm text-muted">{t('paths.whichLead')}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b hairline text-[11px] uppercase tracking-wide text-muted">
                <th className="px-6 py-3 font-semibold">{t('paths.col.question')}</th>
                <th className="px-6 py-3 font-semibold">Microsoft Word</th>
                <th className="px-6 py-3 font-semibold">Microsoft Excel</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t('paths.row.write'), t('paths.row.write.word'), t('paths.row.write.excel')],
                [t('paths.row.finish'), t('paths.row.finish.word'), t('paths.row.finish.excel')],
                [t('paths.row.skill'), t('paths.row.skill.word'), t('paths.row.skill.excel')],
                [t('paths.row.lessons'), `${getPathLessons('word').length}`, `${getPathLessons('excel').length}`],
                [t('paths.row.time'), formatMinutesFor(t, pathMinutes('word')), formatMinutesFor(t, pathMinutes('excel'))],
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
              <OfficeAppIcon app={path.id} size={44} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{t('paths.overview', { name: path.title })}</span>
                  <span className="text-xs font-semibold">{percent}%</span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={11} /> {t('common.done', { done, total: lessons.length })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} /> {formatMinutesFor(t, pathMinutes(path.id))}
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
