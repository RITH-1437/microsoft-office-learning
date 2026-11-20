import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, FlaskConical, Info } from 'lucide-react'
import OfficeAppIcon from '../components/icons/OfficeAppIcon'
import { useT, type MessageKey } from '../i18n'

const wordFeatures: MessageKey[] = ['labs.word.f1', 'labs.word.f2', 'labs.word.f3', 'labs.word.f4']
const excelFeatures: MessageKey[] = ['labs.excel.f1', 'labs.excel.f2', 'labs.excel.f3', 'labs.excel.f4']

export default function LabsPage() {
  const t = useT()
  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <span className="section-label">
          <FlaskConical size={13} />
          {t('labs.label')}
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">{t('labs.title')}</h1>
        <p className="mt-3 text-lg text-muted">
          {t('labs.lead')}
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <Link
          to="/labs/word"
          className="group relative overflow-hidden rounded-3xl border hairline bg-gradient-to-br from-word-50/80 to-white/60 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift dark:from-word-500/10 dark:to-ink-900/40 sm:p-8"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-word-300/40 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <OfficeAppIcon app="word" size={48} />
            <h2 className="mt-5 font-display text-2xl font-bold">{t('labs.word.title')}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t('labs.word.body')}
            </p>
            <ul className="mt-4 space-y-1.5">
              {wordFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={12} className="shrink-0 text-excel-500" />
                  {t(item)}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-word-700 dark:text-word-300">
              {t('labs.word.open')}
              <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        <Link
          to="/labs/excel"
          className="group relative overflow-hidden rounded-3xl border hairline bg-gradient-to-br from-excel-50/80 to-white/60 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift dark:from-excel-500/10 dark:to-ink-900/40 sm:p-8"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-excel-300/40 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <OfficeAppIcon app="excel" size={48} />
            <h2 className="mt-5 font-display text-2xl font-bold">{t('labs.excel.title')}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t('labs.excel.body')}
            </p>
            <ul className="mt-4 space-y-1.5">
              {excelFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={12} className="shrink-0 text-excel-500" />
                  {t(item)}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-excel-700 dark:text-excel-300">
              {t('labs.excel.open')}
              <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>

      <section className="card p-6">
        <div className="flex items-start gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-word-500" />
          <div>
            <h2 className="font-display text-lg font-bold">{t('labs.aboutTitle')}</h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              {t('labs.aboutBody')}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/interface/word" className="btn-secondary">
                {t('labs.screens')}
              </Link>
              <Link to="/practice" className="btn-secondary">
                {t('labs.fullProject')}
              </Link>
              <Link to="/resources" className="btn-ghost">
                {t('labs.shortcuts')}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
