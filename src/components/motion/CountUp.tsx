import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../lib/motion'

/**
 * Animated number. Screen readers get the final value immediately via a
 * visually-hidden span; the animated text is aria-hidden so it is not announced
 * on every frame. Starts when scrolled into view.
 */
export default function CountUp({
  value,
  suffix = '',
  duration = 1100,
  className = '',
}: {
  value: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const shown = reduced ? value : display

  useEffect(() => {
    if (reduced) return
    const node = ref.current
    if (!node) return
    let frame = 0
    let started = false

    const run = () => {
      if (started) return
      started = true
      const from = 0
      const startedAt = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - startedAt) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(Math.round(from + (value - from) * eased))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    if (typeof IntersectionObserver === 'undefined') {
      run()
      return () => cancelAnimationFrame(frame)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration, reduced])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
    </span>
  )
}
