import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from 'lucide-react'
import type { Quiz } from '../types'

export default function QuizRunner({
  quiz,
  onComplete,
}: {
  quiz: Quiz
  onComplete?: (score: number, total: number) => void
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [current, setCurrent] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const total = quiz.questions.length
  const score = quiz.questions.reduce(
    (sum, question, index) => (answers[index] === question.answer ? sum + 1 : sum),
    0,
  )
  const percent = Math.round((score / total) * 100)
  const passed = percent >= quiz.passScore
  const answeredCount = Object.keys(answers).length

  const submit = () => {
    setSubmitted(true)
    onComplete?.(score, total)
  }

  const retake = () => {
    setAnswers({})
    setCurrent(0)
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div>
        <div
          className={`rounded-3xl border p-6 text-center sm:p-8 ${
            passed
              ? 'border-excel-300/60 bg-gradient-to-br from-excel-50/80 to-white/60 dark:border-excel-500/30 dark:from-excel-500/10 dark:to-transparent'
              : 'border-amber-300/60 bg-gradient-to-br from-amber-50/80 to-white/60 dark:border-amber-500/30 dark:from-amber-500/10 dark:to-transparent'
          }`}
        >
          <span
            className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl text-white ${
              passed ? 'bg-excel-600' : 'bg-amber-500'
            }`}
          >
            <Trophy size={26} />
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold">
            {passed ? 'Assessment passed' : 'Keep practicing'}
          </h2>
          <p className="mt-1 text-sm text-muted">
            You need {quiz.passScore}% to pass. You scored {percent}%.
          </p>
          <div className="mx-auto mt-5 grid max-w-md grid-cols-3 gap-3">
            <div className="rounded-xl border hairline bg-white/60 p-3 dark:bg-white/5">
              <div className="font-display text-2xl font-bold">{score}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted">correct</div>
            </div>
            <div className="rounded-xl border hairline bg-white/60 p-3 dark:bg-white/5">
              <div className="font-display text-2xl font-bold">{total - score}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted">missed</div>
            </div>
            <div className="rounded-xl border hairline bg-white/60 p-3 dark:bg-white/5">
              <div className="font-display text-2xl font-bold">{percent}%</div>
              <div className="text-[10px] uppercase tracking-wide text-muted">score</div>
            </div>
          </div>
          <button type="button" onClick={retake} className="btn-primary mt-5">
            <RotateCcw size={15} />
            Retake assessment
          </button>
        </div>

        <div className="mt-8">
          <h3 className="font-display text-lg font-bold">Review every answer</h3>
          <div className="mt-4 space-y-3">
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[index]
              const isCorrect = userAnswer === question.answer
              return (
                <div key={question.id} className="card p-4 sm:p-5">
                  <div className="flex items-start gap-2.5">
                    {isCorrect ? (
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-excel-500" />
                    ) : (
                      <XCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-snug">
                        {index + 1}. {question.prompt}
                      </p>
                      <div className="mt-2 space-y-1 text-xs">
                        <p className={isCorrect ? 'text-excel-700 dark:text-excel-300' : 'text-red-600 dark:text-red-400'}>
                          Your answer: {userAnswer === undefined ? 'Not answered' : question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-excel-700 dark:text-excel-300">
                            Correct answer: {question.options[question.answer]}
                          </p>
                        )}
                      </div>
                      <p className="mt-2 rounded-lg bg-ink-50/70 p-2.5 text-xs leading-relaxed text-muted dark:bg-white/[0.03]">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const question = quiz.questions[current]
  const selected = answers[current]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          Question {current + 1} of {total}
        </div>
        <div className="text-xs text-muted">
          {answeredCount} answered · {quiz.passScore}% to pass
        </div>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-200/80 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-word-500 transition-[width] duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      <div className="mt-6">
        <p className="font-display text-lg font-bold leading-snug sm:text-xl">{question.prompt}</p>
        <div className="mt-4 grid gap-2.5" role="radiogroup" aria-label="Answer options">
          {question.options.map((option, index) => {
            const isSelected = selected === index
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setAnswers((previous) => ({ ...previous, [current]: index }))}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? 'border-word-400 bg-word-50/70 shadow-sm dark:border-word-500/50 dark:bg-word-500/10'
                    : 'border-[rgb(148_163_184_/_0.25)] bg-white/40 hover:border-word-300 hover:bg-word-50/40 dark:bg-white/[0.03] dark:hover:border-word-500/40'
                }`}
              >
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${
                    isSelected ? 'border-transparent bg-word-600 text-white' : 'border-current text-transparent'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCurrent((value) => Math.max(0, value - 1))}
          disabled={current === 0}
          className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft size={15} />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {quiz.questions.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to question ${index + 1}`}
              className={`h-2 w-2 rounded-full transition ${
                index === current
                  ? 'w-5 bg-word-600'
                  : answers[index] !== undefined
                    ? 'bg-word-300 dark:bg-word-500/60'
                    : 'bg-ink-300 dark:bg-white/20'
              }`}
            />
          ))}
        </div>

        {current < total - 1 ? (
          <button
            type="button"
            onClick={() => setCurrent((value) => Math.min(total - 1, value + 1))}
            className="btn-primary"
          >
            Next
            <ArrowRight size={15} />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={answeredCount < total}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit assessment
            <CheckCircle2 size={15} />
          </button>
        )}
      </div>

      {answeredCount < total && current === total - 1 && (
        <p className="mt-3 text-right text-xs text-muted">Answer all questions to submit.</p>
      )}
    </div>
  )
}
