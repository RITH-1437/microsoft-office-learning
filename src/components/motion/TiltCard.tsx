import { useEffect, useRef, type ReactNode } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../../lib/motion'

/**
 * Subtle 3D tilt + moving highlight following a mouse pointer. Disabled for touch
 * devices and reduced-motion users (renders a plain wrapper). Updates CSS variables
 * only, so React never re-renders on pointer move.
 */
export default function TiltCard({
  children,
  className = '',
  max = 5,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || event.pointerType !== 'mouse') return
    const node = ref.current
    if (!node) return
    const { clientX, clientY } = event
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect()
      const px = (clientX - rect.left) / rect.width
      const py = (clientY - rect.top) / rect.height
      node.style.setProperty('--tilt-x', `${((0.5 - py) * max).toFixed(2)}deg`)
      node.style.setProperty('--tilt-y', `${((px - 0.5) * max).toFixed(2)}deg`)
      node.style.setProperty('--glow-x', `${(px * 100).toFixed(1)}%`)
      node.style.setProperty('--glow-y', `${(py * 100).toFixed(1)}%`)
    })
  }

  const reset = () => {
    const node = ref.current
    if (!node) return
    cancelAnimationFrame(frame.current)
    node.style.setProperty('--tilt-x', '0deg')
    node.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`${enabled ? 'tilt-card' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
