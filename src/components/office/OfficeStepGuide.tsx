import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, MousePointerClick } from 'lucide-react'
import type { TutorialStep, WorkspaceState } from '../../types'
import type { OfficeApp } from '../icons/OfficeAppIcon'
import { slideStep } from '../../lib/motion'
import OfficeInterfacePreview from './OfficeInterfacePreview'
import RichText from '../RichText'
import { useT } from '../../i18n'

export interface OfficeStepGuideProps {
  app: OfficeApp
  steps: TutorialStep[]
  title?: string
  intro?: string
  /** Shown after the last step. */
  result?: string
}

/**
 * Numbered tutorial walkthrough: the current step's instruction beside a ribbon diagram
 * that highlights the exact button, with the document/sheet state for that step.
 * Previous/Next buttons, clickable step list, ←/→ keys. Steps without a `ui` reference
 * keep the last workspace shown and remove the highlight.
 */
export default function OfficeStepGuide({ app, steps, title, intro, result }: OfficeStepGuideProps) {
  const [index, setIndex] = useState(0)
  const t = useT()
  const [direction, setDirection] = useState(1)
  const liveRef = useRef<HTMLDivElement>(null)
  const total = steps.length
  const step = steps[index]

  const go = (next: number) => {
    const clamped = Math.min(total - 1, Math.max(0, next))
    if (clamped === index) return
    setDirection(clamped > index ? 1 : -1)
    setIndex(clamped)
  }

  // Reset when the tutorial changes (e.g. navigating between lessons) — derived-state pattern.
  const [trackedSteps, setTrackedSteps] = useState(steps)
  if (trackedSteps !== steps) {
    setTrackedSteps(steps)
    setIndex(0)
    setDirection(1)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1) }
  }

  // Workspace: this step's, else the most recent one before it.
  let workspace: WorkspaceState | undefined
  for (let i = index; i >= 0; i -= 1) {
    if (steps[i].ui?.workspace) { workspace = steps[i].ui?.workspace; break }
  }
  const stepApp = step.ui?.app ?? app
  const isLast = index === total - 1

  return (
    <div className="office-guide" onKeyDown={onKeyDown}>
      {(title || intro) && (
        <div className="office-guide-head">
          {title && <h4 className="text-sm font-bold">{title}</h4>}
          {intro && <p className="mt-0.5 text-xs text-muted"><RichText text={intro} /></p>}
        </div>
      )}

      <div className="office-guide-grid">
        <ol className="office-guide-steps" aria-label={t('step.steps')}>
          {steps.map((item, i) => {
            const done = i < index
            const current = i === index
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={current ? 'step' : undefined}
                  className={`office-guide-step ${current ? 'is-current' : ''} ${done ? 'is-done' : ''}`}
                >
                  <span className="office-guide-num" aria-hidden="true">{done ? <Check size={12} strokeWidth={3} /> : i + 1}</span>
                  <span className="office-guide-step-text"><RichText text={item.instruction} /></span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="office-guide-main">
          <div className="office-guide-preview">
            <OfficeInterfacePreview
              app={stepApp}
              tab={step.ui?.tab}
              highlight={step.ui?.target}
              workspace={workspace}
              caption={step.ui?.caption}
              zoomable
            />
          </div>

          <div className="office-guide-panel" ref={liveRef} aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <m.div key={index} custom={direction} variants={slideStep} initial="enter" animate="center" exit="exit">
                <div className="eyebrow text-muted">{t('step.of', { n: index + 1, total })}</div>
                <p className="mt-1 flex items-start gap-2 text-sm font-semibold leading-snug">
                  <MousePointerClick size={16} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
                  <span><RichText text={step.instruction} /></span>
                </p>
                {step.detail && <p className="mt-1.5 text-sm leading-relaxed text-muted"><RichText text={step.detail} /></p>}
                {step.shortcut && (
                  <p className="mt-2 text-xs text-muted">
                    {t('common.shortcutLabel')} <span className="kbd">{step.shortcut}</span>
                  </p>
                )}
                {isLast && result && (
                  <p className="office-guide-result">
                    <Check size={14} className="shrink-0 text-excel-600" aria-hidden="true" />
                    <span><strong>{t('common.resultLabel')}</strong> <RichText text={result} /></span>
                  </p>
                )}
              </m.div>
            </AnimatePresence>
          </div>

          <div className="office-guide-nav">
            <button type="button" className="btn-secondary" onClick={() => go(index - 1)} disabled={index === 0}>
              <ArrowLeft size={14} aria-hidden="true" /> {t('common.previous')}
            </button>
            <span className="text-xs text-muted">{t('step.keys')}</span>
            <button type="button" className="btn-primary" onClick={() => go(index + 1)} disabled={isLast}>
              {t('common.next')} <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
