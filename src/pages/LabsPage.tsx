import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, FlaskConical, Info } from 'lucide-react'
import OfficeAppIcon from '../components/icons/OfficeAppIcon'

export default function LabsPage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <span className="section-label">
          <FlaskConical size={13} />
          Interactive labs
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Practice without installing Office</h1>
        <p className="mt-3 text-lg text-muted">
          Two simplified simulations for the core skills: formatting a document and writing formulas. They
          are learning tools, not replacements for the real applications.
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
            <h2 className="mt-5 font-display text-2xl font-bold">Word editing lab</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Edit a memo, apply headings, bold text, alignment, lists, and colors. Watch the word count
              update as you type.
            </p>
            <ul className="mt-4 space-y-1.5">
              {['Heading and body styles', 'Bold, italic, underline, color', 'Alignment and lists', 'Print or download text'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted">
                    <CheckCircle2 size={12} className="text-excel-500" />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-word-700 dark:text-word-300">
              Open Word lab
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
            <h2 className="mt-5 font-display text-2xl font-bold">Excel formula lab</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              A working 10 × 16 grid with a formula engine. Type values, references, and functions, then see
              the results immediately.
            </p>
            <ul className="mt-4 space-y-1.5">
              {['Arithmetic and cell references', 'SUM, AVERAGE, MIN, MAX', 'IF, COUNTIF, SUMIF, VLOOKUP', 'Error codes and export'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted">
                    <CheckCircle2 size={12} className="text-excel-500" />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-excel-700 dark:text-excel-300">
              Open Excel lab
              <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>

      <section className="card p-6">
        <div className="flex items-start gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-word-500" />
          <div>
            <h2 className="font-display text-lg font-bold">What the labs are — and are not</h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              The labs run entirely in your browser. They are intentionally simplified: they do not save
              Office files, do not reproduce every ribbon command, and do not include real Word or Excel
              file handling. Use them to build confidence, then repeat the task in the real application.
              Nothing you type in a lab is uploaded or stored.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/practice" className="btn-secondary">
                Go to a full project
              </Link>
              <Link to="/resources" className="btn-ghost">
                Browse shortcuts
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
