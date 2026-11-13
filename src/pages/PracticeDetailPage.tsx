import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  FlaskConical,
  Lightbulb,
  ListChecks,
  Printer,
  Target,
  Trophy } from 'lucide-react'
import OfficeAppIcon from '../components/icons/OfficeAppIcon'
import { exerciseById, exercises } from '../data/exercises'
import { useProgress } from '../store/progress'
import { downloadStarter } from '../lib/utils'

export default function PracticeDetailPage() {
  const { exerciseId } = useParams()
  const exercise = exerciseId ? exerciseById.get(exerciseId) : undefined
  const completed = useProgress((state) => state.completedExercises)
  const completeExercise = useProgress((state) => state.completeExercise)
  const uncompleteExercise = useProgress((state) => state.uncompleteExercise)
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [hintIndex, setHintIndex] = useState(0)

  if (!exercise) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Project not found</h1>
        <p className="mt-2 text-muted">That project does not exist.</p>
        <Link to="/practice" className="btn-primary mt-6">
          <ArrowLeft size={16} />
          Back to projects
        </Link>
      </div>
    )
  }

  const isWord = exercise.pathId === 'word'
  const done = Boolean(completed[exercise.id])
  const checkedCount = exercise.criteria.filter((_, index) => checked[index]).length
  const allChecked = checkedCount === exercise.criteria.length
  const related = exercises.filter((item) => item.id !== exercise.id && item.pathId === exercise.pathId).slice(0, 3)

  return (
    <div className="space-y-8">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/practice" className="hover:text-[var(--text-strong)]">
          Projects
        </Link>
        <span>/</span>
        <span className="text-[var(--text-strong)]">{exercise.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-8">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  isWord
                    ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                    : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
                }`}
              >
                <OfficeAppIcon app={exercise.pathId} variant="glyph" size={12} />
                {exercise.pathId === 'word' ? 'Word project' : 'Excel project'}
              </span>
              <span className="chip">{exercise.difficulty}</span>
              <span className="chip">
                <Clock size={11} /> {exercise.duration} min
              </span>
              {done && (
                <span className="inline-flex items-center gap-1 rounded-full bg-excel-50 px-2.5 py-1 text-[11px] font-semibold text-excel-700 dark:bg-excel-500/15 dark:text-excel-200">
                  <CheckCircle2 size={12} /> Completed
                </span>
              )}
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{exercise.title}</h1>
            <p className="mt-2 text-lg text-muted">{exercise.subtitle}</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{exercise.overview}</p>
          </header>

          <section className="rounded-2xl border hairline bg-white/50 p-5 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Target size={13} /> Project objectives
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {exercise.objectives.map((objective) => (
                <li key={objective} className="flex gap-2 text-sm">
                  <Check size={14} className="mt-0.5 shrink-0 text-excel-500" />
                  <span className="text-muted">{objective}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold">Before you start</h2>
            <ol className="mt-3 space-y-2">
              {exercise.setup.map((step, index) => (
                <li key={step} className="flex gap-2.5 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink-100 text-[10px] font-bold text-muted dark:bg-white/10">
                    {index + 1}
                  </span>
                  <span className="text-muted">{step}</span>
                </li>
              ))}
            </ol>
            {exercise.starter && (
              <button type="button" onClick={() => downloadStarter(exercise.starter!)} className="btn-secondary mt-4">
                <Download size={15} />
                Download {exercise.starter.filename}
              </button>
            )}
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold">Project steps</h2>
            <ol className="mt-4 space-y-3">
              {exercise.steps.map((step, index) => (
                <li key={step} className="card flex gap-3 p-4">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      isWord
                        ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                        : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold">Hints</h2>
            <div className="mt-3 rounded-2xl border border-amber-300/50 bg-amber-50/50 p-5 dark:border-amber-500/25 dark:bg-amber-500/5">
              <div className="flex items-start gap-2.5">
                <Lightbulb size={17} className="mt-0.5 shrink-0 text-amber-500" />
                <div>
                  <p className="text-sm text-muted">{exercise.hints[hintIndex]}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-[11px] text-muted">
                      Hint {hintIndex + 1} of {exercise.hints.length}
                    </span>
                    {hintIndex < exercise.hints.length - 1 && (
                      <button
                        type="button"
                        onClick={() => setHintIndex((value) => value + 1)}
                        className="text-xs font-semibold text-amber-700 dark:text-amber-300"
                      >
                        Next hint
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold">Success criteria</h2>
                <p className="mt-1 text-sm text-muted">Check each item only when you can see it in your file.</p>
              </div>
              <span className="text-xs font-semibold text-muted">
                {checkedCount}/{exercise.criteria.length}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {exercise.criteria.map((criterion, index) => (
                <label
                  key={criterion}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition ${
                    checked[index]
                      ? 'border-excel-300/60 bg-excel-50/50 dark:border-excel-500/30 dark:bg-excel-500/5'
                      : 'border-[rgb(148_163_184_/_0.24)] bg-white/40 hover:bg-ink-50/60 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(checked[index])}
                    onChange={(event) =>
                      setChecked((previous) => ({ ...previous, [index]: event.target.checked }))
                    }
                    className="peer sr-only"
                  />
                  <span
                    className="check-box mt-0.5 shrink-0 text-white peer-focus-visible:ring-2 peer-focus-visible:ring-word-500 peer-focus-visible:ring-offset-2"
                    data-checked={checked[index] ? 'true' : 'false'}
                    aria-hidden="true"
                  >
                    {checked[index] && <Check size={12} strokeWidth={3} className="anim-pop" />}
                  </span>
                  <span className={checked[index] ? 'text-muted line-through' : 'text-muted'}>{criterion}</span>
                </label>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-excel-200/60 bg-excel-50/40 p-4 dark:border-excel-500/20 dark:bg-excel-500/5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-excel-700 dark:text-excel-300">
                <Trophy size={13} /> Deliverable
              </div>
              <p className="mt-1.5 text-sm text-muted">{exercise.deliverable}</p>
              <button
                type="button"
                onClick={() => (done ? uncompleteExercise(exercise.id) : completeExercise(exercise.id))}
                className={done ? 'btn-secondary mt-4' : 'btn-primary mt-4'}
              >
                {done ? <CheckCircle2 size={15} /> : <Trophy size={15} />}
                {done ? 'Mark project incomplete' : allChecked ? 'Mark project complete' : 'Mark complete anyway'}
              </button>
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">Project file</div>
            <div className="mt-3 flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-100 text-ink-700 dark:bg-white/10 dark:text-ink-200">
                {exercise.starter ? <Download size={18} /> : <FileText size={18} />}
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">
                  {exercise.starter?.filename ?? 'Create from blank'}
                </div>
                <div className="text-[11px] text-muted">
                  {exercise.starter ? `${exercise.starter.kind.toUpperCase()} starter` : 'No starter file'}
                </div>
              </div>
            </div>
            {exercise.starter && (
              <button
                type="button"
                onClick={() => downloadStarter(exercise.starter!)}
                className="btn-secondary mt-3 w-full"
              >
                <Download size={14} />
                Download starter
              </button>
            )}
            <div className="mt-3 rounded-lg bg-ink-50/70 p-2.5 text-[11px] leading-relaxed text-muted dark:bg-white/5">
              {exercise.pathId === 'word'
                ? 'Open the starter in Word, complete the steps, then save with the deliverable name.'
                : 'Open the CSV in Excel, complete the steps, then save as .xlsx with the deliverable name.'}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <ListChecks size={13} /> At a glance
            </div>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Difficulty</dt>
                <dd className="font-medium">{exercise.difficulty}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Estimated time</dt>
                <dd className="font-medium">{exercise.duration} min</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Steps</dt>
                <dd className="font-medium">{exercise.steps.length}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Criteria</dt>
                <dd className="font-medium">{exercise.criteria.length}</dd>
              </div>
            </dl>
          </div>

          {exercise.lab && (
            <Link to={`/labs/${exercise.lab}`} className="card lift flex items-center gap-3 p-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-word-50 text-word-600 dark:bg-word-500/15 dark:text-word-300">
                <FlaskConical size={17} />
              </span>
              <div>
                <div className="text-sm font-semibold">Open the {exercise.lab} lab</div>
                <div className="text-[11px] text-muted">Practice without installing Office</div>
              </div>
              <ArrowRight size={14} className="ml-auto text-muted" />
            </Link>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="card lift flex w-full items-center gap-3 p-4 text-left"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-100 text-ink-700 dark:bg-white/10 dark:text-ink-200">
              <Printer size={16} />
            </span>
            <div>
              <div className="text-sm font-semibold">Print this project</div>
              <div className="text-[11px] text-muted">Keep the steps beside you</div>
            </div>
          </button>

          <div className="card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">More {exercise.pathId} projects</div>
            <div className="mt-3 space-y-2">
              {related.map((item) => (
                <Link key={item.id} to={`/practice/${item.id}`} className="group flex items-center gap-2 text-xs">
                  <ArrowRight size={12} className="shrink-0 text-muted transition group-hover:translate-x-0.5" />
                  <span className="text-muted transition group-hover:text-[var(--text-strong)]">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
