import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { m, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Sparkles, Table2 } from 'lucide-react'
import { duration, ease, fadeUp, stagger, staggerContainer, useRichMotion } from '../lib/motion'
import CountUp from './motion/CountUp'
import OfficeAppIcon from './icons/OfficeAppIcon'

const line1 = ['Learn', 'Word', 'and', 'Excel.']
const line2 = [
  { word: 'Do', tone: 'text-word-600 dark:text-word-300' },
  { word: 'real', tone: 'text-word-600 dark:text-word-300' },
  { word: 'office', tone: 'text-excel-600 dark:text-excel-300' },
  { word: 'work.', tone: 'text-excel-600 dark:text-excel-300' },
]

const wordReveal = {
  hidden: { opacity: 0, y: '0.55em' },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
}

function Headline() {
  return (
    <m.h1
      className="display-hero mt-5 font-display"
      variants={staggerContainer(0.1, stagger.tight)}
      initial="hidden"
      animate="show"
      aria-label="Learn Word and Excel. Do real office work."
    >
      <span aria-hidden="true">
        {line1.map((word) => (
          <Fragment key={word}>
            <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
              <m.span className="hero-headline-word" variants={wordReveal}>
                {word}
              </m.span>
            </span>{' '}
          </Fragment>
        ))}
        <br />
        {line2.map(({ word, tone }) => (
          <Fragment key={word}>
            <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
              <m.span className={`hero-headline-word ${tone}`} variants={wordReveal}>
                {word}
              </m.span>
            </span>{' '}
          </Fragment>
        ))}
      </span>
    </m.h1>
  )
}

/** Layered Word + Excel composition with scroll parallax (large screens, motion allowed only). */
function Composition() {
  const rich = useRichMotion()
  const { scrollY } = useScroll()
  const farY = useTransform(scrollY, [0, 700], [0, -36])
  const midY = useTransform(scrollY, [0, 700], [0, -84])
  const nearY = useTransform(scrollY, [0, 700], [0, -140])

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <m.div style={rich ? { y: farY } : undefined} className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-word-300/30 via-admin-300/10 to-excel-300/30 blur-2xl" />

      <div className="relative space-y-4">
        <m.div style={rich ? { y: midY } : undefined}>
          <div className="glass-panel float-slow rounded-2xl p-4" style={{ ['--float-delay' as string]: '0s' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <OfficeAppIcon app="word" size={32} />
                <div>
                  <div className="text-xs font-semibold">Quarterly Report.docx</div>
                  <div className="text-[10px] text-muted">Word · 6 pages</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-word-700 dark:text-word-300">Edited</span>
            </div>
            <div className="mt-3 space-y-1.5 rounded-lg bg-white/80 p-3 dark:bg-ink-950/50">
              <div className="h-2 w-3/4 rounded bg-ink-300/80 dark:bg-white/20" />
              <div className="h-1.5 w-full rounded bg-ink-200/80 dark:bg-white/10" />
              <div className="h-1.5 w-11/12 rounded bg-ink-200/80 dark:bg-white/10" />
              <div className="h-1.5 w-4/5 rounded bg-ink-200/80 dark:bg-white/10" />
              <div className="mt-2 flex gap-1.5">
                <span className="rounded bg-word-100 px-1.5 py-0.5 text-[9px] font-semibold text-word-700 dark:bg-word-500/20 dark:text-word-200">
                  Heading 1
                </span>
                <span className="rounded bg-ink-100 px-1.5 py-0.5 text-[9px] font-semibold text-ink-600 dark:bg-white/10 dark:text-ink-300">
                  11 pt · 1.15
                </span>
              </div>
            </div>
          </div>
        </m.div>

        <m.div style={rich ? { y: nearY } : undefined} className="sm:ml-10">
          <div className="glass-panel float-slow rounded-2xl p-4" style={{ ['--float-delay' as string]: '-3.5s' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <OfficeAppIcon app="excel" size={32} />
                <div>
                  <div className="text-xs font-semibold">Expense Report.xlsx</div>
                  <div className="text-[10px] text-muted">Excel · formulas ready</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-excel-700 dark:text-excel-300">Saved</span>
            </div>
            <div className="mt-3 overflow-hidden rounded-lg border border-ink-200/70 bg-white/80 dark:border-white/10 dark:bg-ink-950/40">
              {[
                ['Travel', '42.50', '8.50', '51.00'],
                ['Supplies', '31.20', '6.24', '37.44'],
                ['Software', '89.00', '17.80', '106.80'],
              ].map((row, index) => (
                <div
                  key={row[0]}
                  className={`grid grid-cols-4 ${
                    index === 0 ? 'bg-excel-50 font-semibold text-excel-800 dark:bg-excel-500/15 dark:text-excel-200' : ''
                  }`}
                >
                  {row.map((cell, cellIndex) => (
                    <div
                      key={`${row[0]}-${cellIndex}`}
                      className={`border-b border-r border-ink-200/50 px-2 py-1.5 text-[10px] last:border-r-0 dark:border-white/10 ${
                        cellIndex > 0 ? 'text-right tabular-nums' : ''
                      }`}
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-muted">
              <span className="rounded bg-excel-100 px-1.5 py-0.5 font-mono font-semibold text-excel-700 dark:bg-excel-500/20 dark:text-excel-200">
                =SUM(E2:E4)
              </span>
              <span>195.24</span>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      data-no-reveal
      className="hero-aurora relative overflow-hidden rounded-[2rem] border hairline bg-white/40 p-6 shadow-soft dark:bg-ink-900/40 sm:p-10 lg:p-14"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <m.div variants={staggerContainer(0, stagger.base)} initial="hidden" animate="show">
          <m.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-word-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-word-700 shadow-sm dark:border-word-500/20 dark:bg-word-500/10 dark:text-word-200"
          >
            <Sparkles size={13} aria-hidden="true" />
            A complete beginner-to-confident course
          </m.div>

          <Headline />

          <m.p variants={fadeUp} className="reading mt-6 text-base text-muted sm:text-lg">
            Build the documents and spreadsheets an office actually runs on — step by step, with no prior
            experience needed.
          </m.p>

          <m.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/paths" className="btn-primary px-6 py-3.5 text-[15px]">
              <GraduationCap size={18} />
              Start the course
            </Link>
            <Link to="/labs" className="btn-secondary px-6 py-3.5 text-[15px]">
              <Table2 size={17} />
              Try the labs
            </Link>
          </m.div>

          <m.div variants={fadeUp} className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {[
              { value: 38, label: 'lessons' },
              { value: 12, label: 'projects' },
              { value: 110, label: 'questions' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border hairline bg-white/55 px-3 py-2.5 dark:bg-white/5">
                <div className="font-display text-2xl font-bold">
                  <CountUp value={stat.value} />
                </div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-muted">{stat.label}</div>
              </div>
            ))}
          </m.div>
        </m.div>

        <Composition />
      </div>
    </section>
  )
}
