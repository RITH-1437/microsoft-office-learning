import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ClipboardCheck, Clock, ListChecks, Trophy } from 'lucide-react'
import { paths } from '../data/curriculum'
import { quizzes } from '../data/questions'
import { useProgress, quizPercent } from '../store/progress'
import { ProgressBar } from '../components/PathCard'
import OfficeAppIcon from '../components/icons/OfficeAppIcon'
import { pluralKey, useT } from '../i18n'
import { useLocalize } from '../i18n/content'

export default function QuizzesPage() {
  const attempts = useProgress((state) => state.quizAttempts)
  const t = useT()
  const L = useLocalize()

  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <span className="section-label">
          <ClipboardCheck size={13} />
          {t('quizzes.label')}
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">{t('quizzes.title')}</h1>
        <p className="mt-3 text-lg text-muted">
          {t('quizzes.lead')}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: ListChecks, value: '10', label: t('quizzes.stat.assessments') },
          { icon: ClipboardCheck, value: '110', label: t('quizzes.stat.questions') },
          { icon: Trophy, value: '70–75%', label: t('quizzes.stat.pass') },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card flex items-center gap-3 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-word-50 text-word-600 dark:bg-word-500/15 dark:text-word-300">
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

      {paths.map(L.path).map((path) => {
        const pathQuizzes = quizzes.filter((quiz) => quiz.pathId === path.id).map(L.quiz)
        const isWord = path.id === 'word'
        return (
          <section key={path.id}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-3 font-display text-2xl font-bold">
                  <OfficeAppIcon app={path.id} size={32} />
                  {path.title}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {t('quizzes.checkpoints', { n: pathQuizzes.filter((quiz) => quiz.kind === 'checkpoint').length })}
                </p>
              </div>
              <Link to={`/paths/${path.id}`} className="btn-ghost">
                {t('quizzes.review')}
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {pathQuizzes.map((quiz) => {
                const attempt = attempts[quiz.id]
                const percent = quizPercent(attempt)
                const passed = attempt && percent >= quiz.passScore
                const unit = path.units.find((item) => item.id === quiz.unitId)
                const isFinal = quiz.kind === 'final'
                return (
                  <Link
                    key={quiz.id}
                    to={`/quizzes/${quiz.id}`}
                    className={`group card flex flex-col p-5 lift ${
                      isFinal ? 'border-word-300/50 bg-gradient-to-br from-word-50/60 to-white/50 dark:border-word-500/25 dark:from-word-500/10 dark:to-transparent' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                          isFinal
                            ? 'bg-word-600 text-white'
                            : isWord
                              ? 'bg-word-50 text-word-600 dark:bg-word-500/15 dark:text-word-300'
                              : 'bg-excel-50 text-excel-600 dark:bg-excel-500/15 dark:text-excel-300'
                        }`}
                      >
                        {isFinal ? <Trophy size={19} /> : <ClipboardCheck size={19} />}
                      </span>
                      <div className="flex flex-wrap justify-end gap-1.5">
                        {isFinal && (
                          <span className="rounded-full bg-word-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                            {t('common.final')}
                          </span>
                        )}
                        {passed && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-excel-50 px-2 py-0.5 text-[10px] font-bold text-excel-700 dark:bg-excel-500/15 dark:text-excel-200">
                            <CheckCircle2 size={10} /> {t('common.passed')}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug">{quiz.title}</h3>
                    <p className="mt-1 text-sm text-muted">{quiz.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted">
                      <span className="inline-flex items-center gap-1">
                        <ListChecks size={12} /> {t('common.questions', { n: quiz.questions.length })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {t('common.aboutMin', { n: Math.max(5, Math.round(quiz.questions.length * 1.2)) })}
                      </span>
                      <span>{t('common.toPass', { n: quiz.passScore })}</span>
                      {unit && <span className="chip">{unit.title}</span>}
                    </div>
                    {attempt ? (
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-[11px]">
                          <span className="text-muted">
                            {t('common.best', { score: attempt.bestScore, total: attempt.bestTotal })} ·{' '}
                            {t(pluralKey('common.attempts', attempt.attempts), { n: attempt.attempts })}
                          </span>
                          <span className="font-semibold">{percent}%</span>
                        </div>
                        <ProgressBar value={percent} tone={isWord ? 'word' : 'excel'} />
                      </div>
                    ) : (
                      <div className="mt-4 text-[11px] text-muted">{t('quizzes.notAttempted')}</div>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-word-600 dark:text-word-300">
                      {attempt ? t('quizzes.retake') : t('quizzes.start')}
                      <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}

      <section className="card p-6">
        <h2 className="font-display text-lg font-bold">{t('quizzes.aboutTitle')}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
          {t('quizzes.aboutBody')}
        </p>
      </section>
    </div>
  )
}
