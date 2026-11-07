import { useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { getQuestion } from '../data/questions'

export default function LessonCheck({ questionId }: { questionId: string }) {
  const question = getQuestion(questionId)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  if (!question) {
    return (
      <div className="rounded-xl border border-amber-300/60 bg-amber-50/70 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        This knowledge check is not available yet.
      </div>
    )
  }

  const correct = selected === question.answer

  return (
    <div>
      <p className="text-sm font-semibold leading-snug">{question.prompt}</p>
      <div className="mt-3 grid gap-2" role="radiogroup" aria-label="Knowledge check options">
        {question.options.map((option, index) => {
          const isSelected = selected === index
          const showCorrect = submitted && index === question.answer
          const showWrong = submitted && isSelected && !correct
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={submitted}
              onClick={() => setSelected(index)}
              className={`flex items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                showCorrect
                  ? 'border-excel-400 bg-excel-50/80 text-excel-900 dark:border-excel-500/50 dark:bg-excel-500/10 dark:text-excel-100'
                  : showWrong
                    ? 'border-red-400 bg-red-50/80 text-red-900 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-100'
                    : isSelected
                      ? 'border-word-400 bg-word-50/70 dark:border-word-500/50 dark:bg-word-500/10'
                      : 'border-[rgb(148_163_184_/_0.25)] bg-white/40 hover:border-word-300 hover:bg-word-50/40 dark:bg-white/[0.03] dark:hover:border-word-500/40 dark:hover:bg-word-500/5'
              }`}
            >
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${
                  isSelected || showCorrect
                    ? 'border-transparent bg-current text-white'
                    : 'border-current text-transparent'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
              {showCorrect && <CheckCircle2 size={16} className="ml-auto shrink-0" />}
              {showWrong && <XCircle size={16} className="ml-auto shrink-0" />}
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={selected === null}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check answer
          </button>
        ) : (
          <>
            <span className={`text-sm font-semibold ${correct ? 'text-excel-600 dark:text-excel-400' : 'text-red-600 dark:text-red-400'}`}>
              {correct ? 'Correct' : 'Not quite'}
            </span>
            <button
              type="button"
              onClick={() => {
                setSelected(null)
                setSubmitted(false)
              }}
              className="btn-ghost"
            >
              <RotateCcw size={13} />
              Try again
            </button>
          </>
        )}
      </div>

      {submitted && (
        <div className="mt-3 rounded-xl border hairline bg-white/50 p-3.5 text-xs leading-relaxed text-muted dark:bg-white/[0.03]">
          <strong className="text-[var(--text-strong)]">Why: </strong>
          {question.explanation}
        </div>
      )}
    </div>
  )
}
