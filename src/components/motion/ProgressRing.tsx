import { useEffect, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../lib/motion'

type Tone = 'word' | 'excel' | 'admin'

const strokes: Record<Tone, string> = {
  word: 'var(--color-word-500)',
  excel: 'var(--color-excel-500)',
  admin: 'var(--color-admin-500)',
}

/**
 * SVG progress ring. The arc animates from empty on mount via a CSS transition on
 * stroke-dashoffset (no layout work). Exposed as a progressbar for assistive tech.
 */
export default function ProgressRing({
  value,
  tone = 'word',
  size = 96,
  stroke = 8,
  label,
  children,
}: {
  value: number
  tone?: Tone
  size?: number
  stroke?: number
  label: string
  children?: ReactNode
}) {
  const reduced = usePrefersReducedMotion()
  const clamped = Math.min(100, Math.max(0, value))
  const [ready, setReady] = useState(false)
  const drawn = reduced || ready ? clamped : 0

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-ink-200/80 dark:stroke-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={strokes[tone]}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - drawn / 100)}
          style={{ transition: 'stroke-dashoffset 1.1s var(--ease-cine)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
