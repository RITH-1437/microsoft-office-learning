import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, ListChecks, Trophy } from 'lucide-react'
import { getQuiz } from '../data/questions'
import { getPath } from '../data/curriculum'
import { useProgress, quizPercent } from '../store/progress'
import QuizRunner from '../components/QuizRunner'

export default function QuizPage() {
  const { quizId } = useParams()
  const quiz = getQuiz(quizId)
  const recordQuizAttempt = useProgress((state) => state.recordQuizAttempt)
  const attempt = useProgress((state) => (quizId ? state.quizAttempts[quizId] : undefined))

  if (!quiz) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Assessment not found</h1>
        <p className="mt-2 text-muted">That assessment does not exist.</p>
        <Link to="/quizzes" className="btn-primary mt-6">
          <ArrowLeft size={16} />
          Back to assessments
        </Link>
      </div>
    )
  }

  const path = getPath(quiz.pathId)
  const best = quizPercent(attempt)
  const isWord = quiz.pathId === 'word'

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/quizzes" className="hover:text-[var(--text-strong)]">
          Assessments
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
              {quiz.kind === 'final' ? 'Final assessment' : 'Unit checkpoint'}
            </span>
            <span className="chip">
              <ListChecks size={11} /> {quiz.questions.length} questions
            </span>
            <span className="chip">
              <Clock size={11} /> about {Math.max(5, Math.round(quiz.questions.length * 1.2))} min
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">{quiz.title}</h1>
          <p className="mt-1.5 text-muted">{quiz.description}</p>
          <p className="mt-1 text-xs text-muted">
            {path?.title} · {quiz.passScore}% required to pass
          </p>
        </div>
        {attempt && (
          <div className="flex shrink-0 items-center gap-2 rounded-xl border hairline bg-white/60 px-3 py-2 dark:bg-white/5">
            <Trophy size={16} className="text-amber-500" />
            <div>
              <div className="text-[10px] uppercase tracking-wide text-muted">Best score</div>
              <div className="text-sm font-bold">
                {best}% <span className="text-xs font-normal text-muted">({attempt.attempts} {attempt.attempts === 1 ? 'try' : 'tries'})</span>
              </div>
            </div>
          </div>
        )}
      </header>

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
          Review the path
        </Link>
        <span>Your best score is saved in this browser.</span>
      </div>
    </div>
  )
}
