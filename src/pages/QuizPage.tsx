import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, ListChecks, Trophy } from 'lucide-react'
import { getQuiz } from '../data/questions'
import { getPath } from '../data/curriculum'
import { useProgress, quizPercent } from '../store/progress'
import QuizRunner from '../components/QuizRunner'
import ContentLanguageNote from '../components/ContentLanguageNote'
import { pluralKey, useT } from '../i18n'
import { useLocalize } from '../i18n/content'

export default function QuizPage() {
  const { quizId } = useParams()
  const L = useLocalize()
  const sourceQuiz = getQuiz(quizId)
  const quiz = sourceQuiz ? L.quiz(sourceQuiz) : undefined
  const recordQuizAttempt = useProgress((state) => state.recordQuizAttempt)
  const attempt = useProgress((state) => (quizId ? state.quizAttempts[quizId] : undefined))
  const t = useT()

  if (!quiz) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-3xl font-bold">{t('quiz.notFound')}</h1>
        <p className="mt-2 text-muted">{t('quiz.notFoundBody')}</p>
        <Link to="/quizzes" className="btn-primary mt-6">
          <ArrowLeft size={16} />
          {t('quiz.back')}
        </Link>
      </div>
    )
  }

  const path = getPath(quiz.pathId)
  const best = quizPercent(attempt)
  const isWord = quiz.pathId === 'word'

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label={t('lesson.breadcrumb')}>
        <Link to="/quizzes" className="hover:text-[var(--text-strong)]">
          {t('quizzes.label')}
        </Link>
        <span>/</span>
        <span className="text-[var(--text-strong)]">{quiz.title}</span>
      </nav>

      <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                quiz.kind === 'final'
                  ? 'bg-word-600 text-white'
                  : isWord
                    ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                    : 'bg-excel-50 text-excel-700 dark:bg-excel-500/15 dark:text-excel-200'
              }`}
            >
              {quiz.kind === 'final' ? t('quiz.final') : t('quiz.checkpoint')}
            </span>
            <span className="chip">
              <ListChecks size={11} /> {t('common.questions', { n: quiz.questions.length })}
            </span>
            <span className="chip">
              <Clock size={11} /> {t('common.aboutMin', { n: Math.max(5, Math.round(quiz.questions.length * 1.2)) })}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">{quiz.title}</h1>
          <p className="mt-1.5 text-muted">{quiz.description}</p>
          <p className="mt-1 text-xs text-muted">
            {t('quiz.required', { path: path?.title ?? '', p: quiz.passScore })}
          </p>
        </div>
        {attempt && (
          <div className="flex shrink-0 items-center gap-2 rounded-xl border hairline bg-white/60 px-3 py-2 dark:bg-white/5">
            <Trophy size={16} className="text-amber-500" />
            <div>
              <div className="text-[10px] uppercase tracking-wide text-muted">{t('quiz.bestScore')}</div>
              <div className="text-sm font-bold">
                {best}% <span className="text-xs font-normal text-muted">({t(pluralKey('quiz.tries', attempt.attempts), { n: attempt.attempts })})</span>
              </div>
            </div>
          </div>
        )}
      </header>

      <ContentLanguageNote className="mt-6" />

      <div className="mt-8 rounded-3xl border hairline bg-white/55 p-5 shadow-soft dark:bg-white/[0.03] sm:p-7">
        <QuizRunner
          key={quiz.id}
          quiz={quiz}
          onComplete={(score, total) => recordQuizAttempt(quiz.id, score, total)}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <Link to={`/paths/${quiz.pathId}`} className="btn-ghost">
          <ArrowLeft size={14} />
          {t('quiz.reviewPath')}
        </Link>
        <span>{t('quiz.savedLocal')}</span>
      </div>
    </div>
  )
}
