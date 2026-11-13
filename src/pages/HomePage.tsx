import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FlaskConical,
  Layers,
  MousePointerClick,
  Target,
  Trophy } from 'lucide-react'
import { paths, getPathLessons } from '../data/curriculum'
import { exercises } from '../data/exercises'
import { quizzes } from '../data/questions'
import { useProgress } from '../store/progress'
import PathCard from '../components/PathCard'
import Hero from '../components/Hero'
import DashboardSummary from '../components/DashboardSummary'
import OfficeAppIcon from '../components/icons/OfficeAppIcon'

const features = [
  {
    icon: Layers,
    title: 'Structured, not scattered',
    body: 'Four units per path build on each other. You always know what to learn next and why it matters.',
  },
  {
    icon: MousePointerClick,
    title: 'Click-level tutorials',
    body: 'Exact tabs, commands, and shortcuts — written for Microsoft 365 and Office 2019 or later.',
  },
  {
    icon: FlaskConical,
    title: 'Practice that looks like work',
    body: 'Memos, letters, minutes, trackers, expense reports, and dashboards with downloadable starters.',
  },
  {
    icon: BarChart3,
    title: 'Progress you can see',
    body: 'Lesson completion, quiz best scores, and finished projects are stored in your browser.',
  },
]

export default function HomePage() {
  const completed = useProgress((state) => state.completedLessons)
  const allLessons = paths.flatMap((path) => getPathLessons(path.id))
  const done = allLessons.filter((lesson) => completed[lesson.id]).length

  return (
    <div className="space-y-20 pb-4">
      <Hero />

      <DashboardSummary compact />

      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-label">
              <BookOpen size={13} />
              Learning paths
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Two paths, one practical goal</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Start with either path. Each one moves from the first click to a complete, work-ready project.
            </p>
          </div>
          <Link to="/paths" className="btn-ghost self-start sm:self-auto">
            Compare paths
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {paths.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      </section>

      <section>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="section-label">
              <Target size={13} />
              Why this course
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Built for how beginners actually learn</h2>
            <p className="mt-3 text-muted">
              Short explanations, exact steps, and a practice task after every idea. No jargon walls, no
              ten-hour video marathons.
            </p>
            <div className="mt-6 space-y-3">
              {[
                'Explain → show → guided practice → independent practice',
                'Real office scenarios, not abstract exercises',
                'Quizzes that explain every answer',
                'Simulated labs for safe, no-install practice',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-excel-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="card p-5 lift">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-100 text-ink-700 dark:bg-white/10 dark:text-ink-200">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border hairline bg-gradient-to-br from-word-600 to-word-800 px-6 py-10 text-white shadow-lift sm:px-10">
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <Trophy size={13} />
              Finish with evidence
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
              Leave with documents and workbooks you can show.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-word-100/90">
              Complete the projects and you will have a memo, letter, agenda, minutes, employee form,
              quarterly report, attendance tracker, leave planner, expense report, inventory sheet, sales
              dashboard, and operations report.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-word-700 transition hover:bg-word-50"
              >
                Browse projects
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/quizzes"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ClipboardCheck size={15} />
                Test yourself
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { value: '38', label: 'lessons' },
              { value: '12', label: 'projects' },
              { value: '10', label: 'assessments' },
              { value: '17', label: 'Word lessons' },
              { value: '21', label: 'Excel lessons' },
              { value: '0', label: 'installs needed' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 px-2 py-4">
                <div className="font-display text-2xl font-bold">{stat.value}</div>
                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-word-100/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="section-label">
              <FlaskConical size={13} />
              Practice
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Realistic projects, ready to start</h2>
          </div>
          <Link to="/practice" className="btn-ghost hidden sm:inline-flex">
            All {exercises.length} projects
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exercises.slice(0, 3).map((exercise) => (
            <Link
              key={exercise.id}
              to={`/practice/${exercise.id}`}
              className="card group lift p-5"
            >
              <div className="flex items-center justify-between">
                <span className="chip">{exercise.scenario}</span>
                <span className="text-[11px] text-muted">{exercise.duration} min</span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug">{exercise.title}</h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted">{exercise.subtitle}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-word-600 dark:text-word-300">
                Open project
                <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass rounded-3xl p-6 text-center sm:p-10">
        <span className="section-label justify-center">
          <Trophy size={13} />
          Ready when you are
        </span>
        <h2 className="mx-auto mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight">
          Start with one lesson. You will be surprised how quickly it adds up.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          {done > 0
            ? `You have completed ${done} of ${allLessons.length} lessons. Keep the streak going.`
            : 'No sign-up, no installation, no pressure. Your progress is saved in this browser.'}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/lesson/w1-1" className="btn-primary px-5 py-3">
            <OfficeAppIcon app="word" variant="glyph" size={17} />
            Open the first Word lesson
          </Link>
          <Link to="/lesson/e1-1" className="btn-secondary px-5 py-3">
            <OfficeAppIcon app="excel" variant="glyph" size={17} />
            Open the first Excel lesson
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <ClipboardCheck size={13} /> {quizzes.length} assessments
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} /> Self-paced
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 size={13} /> Beginner friendly
          </span>
        </div>
      </section>
    </div>
  )
}
