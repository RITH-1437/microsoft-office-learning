import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../lib/motion'

const COLORS = ['#3b76f6', '#12b76a', '#f5b942', '#8b5cf6', '#ef6a8a']

/**
 * One-shot celebration burst built from ~36 short-lived DOM nodes animated with the
 * Web Animations API (transform + opacity only). Purely decorative: aria-hidden,
 * skipped for reduced motion, cleaned up automatically. Reserve for real achievements.
 */
export default function Confetti({ fire }: { fire: boolean }) {
  const host = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!fire || reduced) return
    const layer = host.current
    if (!layer || typeof layer.animate !== 'function') return

    const pieces: HTMLElement[] = []
    const animations: Animation[] = []
    const count = 36

    for (let i = 0; i < count; i += 1) {
      const piece = document.createElement('span')
      const size = 6 + Math.random() * 6
      piece.style.cssText = `position:absolute;left:50%;top:40%;width:${size}px;height:${size * 0.6}px;border-radius:2px;background:${
        COLORS[i % COLORS.length]
      };will-change:transform,opacity;`
      layer.appendChild(piece)
      pieces.push(piece)

      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
      const distance = 120 + Math.random() * 180
      const dx = Math.cos(angle) * distance
      const dy = Math.sin(angle) * distance * 0.7 - 60
      const rotate = (Math.random() - 0.5) * 900
      const animation = piece.animate(
        [
          { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1 },
          {
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rotate / 2}deg)`,
            opacity: 1,
            offset: 0.55,
          },
          {
            transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy + 140}px)) rotate(${rotate}deg)`,
            opacity: 0,
          },
        ],
        { duration: 1300 + Math.random() * 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
      )
      animations.push(animation)
    }

    const timer = window.setTimeout(() => pieces.forEach((piece) => piece.remove()), 2000)
    return () => {
      window.clearTimeout(timer)
      animations.forEach((animation) => animation.cancel())
      pieces.forEach((piece) => piece.remove())
    }
  }, [fire, reduced])

  return <div ref={host} className="pointer-events-none fixed inset-0 z-[60] overflow-hidden no-print" aria-hidden="true" />
}
