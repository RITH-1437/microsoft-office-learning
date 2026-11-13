import { useEffect, useState } from 'react'
import type { Transition, Variants } from 'framer-motion'

/**
 * Motion design tokens. Keep in sync with --dur-* / --ease-* in src/index.css.
 * Only animate transform + opacity.
 */
export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  cinematic: 0.9,
} as const

export const ease = {
  /** Default: quick start, soft landing. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric, for loops and toggles. */
  inOut: [0.65, 0, 0.35, 1],
  /** Slight overshoot, for celebratory pops. */
  spring: [0.34, 1.56, 0.64, 1],
} as const

export const stagger = { tight: 0.04, base: 0.07, loose: 0.12 } as const

export const transition = {
  base: { duration: duration.base, ease: ease.out } satisfies Transition,
  slow: { duration: duration.slow, ease: ease.out } satisfies Transition,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: transition.slow },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition.base },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: transition.slow },
}

export const staggerContainer = (delayChildren = 0, gap: number = stagger.base): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren: gap } },
})

/** Direction-aware slide for stepping through content (quiz questions, tabs). */
export const slideStep: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
  center: { opacity: 1, x: 0, transition: transition.base },
  exit: (dir: number) => ({ opacity: 0, x: dir * -28, transition: { duration: duration.fast, ease: ease.out } }),
}

function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/**
 * True when "expensive" motion (parallax, 3D tilt, continuous float) is appropriate:
 * motion allowed, a large viewport and a precise pointer or at least a desktop-class screen.
 */
export function useRichMotion() {
  const reduced = usePrefersReducedMotion()
  const wide = useMediaQuery('(min-width: 900px)')
  return !reduced && wide
}

export function useFinePointer() {
  return useMediaQuery('(pointer: fine)')
}
