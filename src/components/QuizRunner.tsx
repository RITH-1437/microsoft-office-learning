import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw, Trophy, XCircle } from 'lucide-react'
import type { Quiz } from '../types'
import { duration, ease, fadeUp, slideStep, stagger, staggerContainer } from '../lib/motion'
import Confetti from './motion/Confetti'
import CountUp from './motion/CountUp'
import ProgressRing from './motion/ProgressRing'

export default function QuizRunner({
  quiz,
  onComplete,
}: {
  quiz: Quiz
  onComplete?: (score: number, total: number) => void
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const total = quiz.questions.length
  const score = quiz.questions.reduce(
    (sum, question, index) => (answers[index] === question.answer ? sum + 1 : sum),
    0,
  )
  const percent = Math.round((score / total) * 100)
  const passed = percent >= quiz.passScore
  const answeredCount = Object.keys(answers).length

  const goTo = (index: number) => {
    const next = Math.min(total - 1, Math.max(0, index))
    if (next === current) return
    setDirection(next > current ? 1 : -1)
    setCurrent(next)
  }

  const submit = () => {
    setSubmitted(true)
    onComplete?.(score, total)
  }

  const retake = () => {
    setAnswers({})
    setCurrent(0)
    setDirection(1)
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div>
        {/* Celebration only for a genuine pass. */}
        <Confetti fire={passed} />
        <m.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: duration.slow, ease: ease.out }}
          className={`rounded-3xl border p-6 text-center sm:p-8 ${
            passed
              ? 'border-excel-300/60 bg-gradient-to-br from-excel-50/80 to-white/60 dark:border-excel-500/30 dark:from-excel-500/10 dark:to-transparent'
              : 'border-amber-300/60 bg-gradient-to-br from-amber-50/80 to-white/60 dark:border-amber-500/30 dark:from-amber-500/10 dark:to-transparent'
          }`}
        >
          <div role="status" aria-live="polite">
            <div className="mx-auto flex justify-center">
              <ProgressRing
                value={percent}
                tone={passed ? 'excel' : 'word'}
                size={132}
                stroke={10}
                label={`Score ${percent} percent`}
              >
                <div>
                  <div className="font-display text-3xl font-extrabold">
                    <CountUp value={percent} suffix="%" />
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">score</div>
                </div>
              </ProgressRing>
            </div>
            <div className="mt-4 inline-flex items-center gap-2">
              <span
                className={`anim-pop grid h-9 w-9 place-items-center rounded-xl text-white ${
                  passed ? 'bg-excel-600' : 'bg-amber-600'
                }`}
                aria-hidden="true"
              >
                <Trophy size={18} />
              </span>
              <h2 className="font-display text-2xl font-bold">{passed ? 'Assessment passed' : 'Keep practicing'}</h2>
            </div>
            <p className="mt-1 text-sm text-muted">
              You need {quiz.passScore}% to pass. You scored {percent}% ({score} of {total} correct).
            </p>
          </div>
          <div className="mx-auto mt-5 grid max-w-md grid-cols-3 gap-3">
            <div className="rounded-xl border hairline bg-white/60 p-3 dark:bg-white/5">
              <div className="font-display text-2xl font-bold">
                <CountUp value={score} />
              </div>
              <div className="text-[10px] uppercase tracking-wide text-muted">correct</div>
            </div>
            <div className="rounded-xl border hairline bg-white/60 p-3 dark:bg-white/5">
              <div className="font-display text-2xl font-bold">
                <CountUp value={total - score} />
              </div>
              <div className="text-[10px] uppercase tracking-wide text-muted">missed</div>
            </div>
            <div className="rounded-xl border hairline bg-white/60 p-3 dark:bg-white/5">
              <div className="font-display text-2xl font-bold">{total}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted">questions</div>
            </div>
          </div>
          <button type="button" onClick={retake} className="btn-primary mt-5">
            <RotateCcw size={15} />
            Retake assessment
          </button>
        </m.div>

        <div className="mt-8">
          <h3 className="font-display text-lg font-bold">Review every answer</h3>
          <m.div
            className="mt-4 space-y-3"
            variants={staggerContainer(0.15, stagger.tight)}
            initial="hidden"
            animate="show"
          >
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[index]
              const isCorrect = userAnswer === question.answer
              return (
                <m.div key={question.id} variants={fadeUp} className="surface-solid rounded-2xl p-4 sm:p-5">
                  <div className="flex items-start gap-2.5">
                    {isCorrect ? (
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-excel-600" aria-hidden="true" />
                    ) : (
                      <XCircle size={18} className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-snug">
                        <span
                          className={`mr-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                            isCorrect
                              ? 'bg-excel-100 text-excel-800 dark:bg-excel-500/20 dark:text-excel-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-200'
                          }`}
                        >
                          {isCorrect ? 'Correct' : userAnswer === undefined ? 'Not answered' : 'Incorrect'}
                        </span>
                        {index + 1}. {question.prompt}
                      </p>
                      <div className="mt-2 space-y-1 text-xs">
                        <p className={isCorrect ? 'text-excel-700 dark:text-excel-300' : 'text-red-700 dark:text-red-300'}>
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
                </m.div>
              )
            })}
          </m.div>
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
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-ink-200/80 dark:bg-white/10"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current + 1}
      >
        <div
          className="progress-fill h-full origin-left rounded-full bg-word-500 transition-[width] duration-500 ease-[var(--ease-cine)]"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      <div className="mt-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <m.div
            key={current}
            custom={direction}
            variants={slideStep}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <p className="font-display text-lg font-bold leading-snug sm:text-xl">{question.prompt}</p>
            <div className="mt-4 grid gap-2.5" role="radiogroup" aria-label="Answer options">
              {question.options.map((option, index) => {
                const isSelected = selected === index
                return (
                  <m.button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setAnswers((previous) => ({ ...previous, [current]: index }))}
                    className={`flex min-h-12 items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                      isSelected
                        ? 'border-word-500 bg-word-50/80 shadow-sm dark:border-word-400/60 dark:bg-word-500/15'
                        : 'border-[rgb(148_163_184_/_0.3)] bg-white/50 hover:border-word-300 hover:bg-word-50/40 dark:bg-white/[0.03] dark:hover:border-word-500/40'
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold transition-colors ${
                        isSelected ? 'border-transparent bg-word-600 text-white' : 'border-current text-muted'
                      }`}
                    >
                      {isSelected ? (
                        <Check size={12} strokeWidth={3} className="anim-pop" aria-hidden="true" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span>{option}</span>
                    {isSelected && <span className="sr-only">(selected)</span>}
                  </m.button>
                )
              })}
            </div>
          </m.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft size={15} />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {quiz.questions.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to question ${index + 1}${answers[index] !== undefined ? ' (answered)' : ''}`}
              aria-current={index === current ? 'step' : undefined}
              className="grid h-6 w-4 place-items-center sm:w-5"
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'w-5 bg-word-600'
                    : answers[index] !== undefined
                      ? 'w-2 bg-word-400 dark:bg-word-500/70'
                      : 'w-2 bg-ink-300 dark:bg-white/25'
                }`}
              />
            </button>
          ))}
        </div>

        {current < total - 1 ? (
          <button type="button" onClick={() => goTo(current + 1)} className="btn-primary">
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
