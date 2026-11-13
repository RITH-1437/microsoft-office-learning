import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const REVEAL_SELECTOR = '[data-reveal], section, article, .card, .glass'
const EXCLUDE_SELECTOR = 'aside, .sticky, .no-reveal, [data-no-reveal], [role="dialog"], .cursor-layer'
/**
 * Containers taller than this share of the viewport are never hidden as a whole
 * (their children still reveal). A hidden container that cannot reach the
 * intersection threshold would otherwise stay invisible for ever.
 */
const MAX_HEIGHT_RATIO = 0.7
/** Elements that start inside the first screen are not hidden (the <main> entrance covers them; hiding them delays LCP). */
const FOLD_RATIO = 0.9
/** Reveal transition (0.6 s) + max stagger (0.385 s) + slack. */
const SETTLE_MS = 1400

/**
 * Scroll-triggered reveal for page sections and cards. Adds `.motion-reveal`
 * (opacity 0 + small translate) to candidates inside <main>, then `.is-revealed`
 * once they enter the viewport. Siblings are staggered. Both classes are removed
 * again when the transition ends so the element's own hover/transition styles
 * take over. No-op for reduced motion. `refreshKey` lets the layout re-run the
 * scan once a lazy route has mounted.
 */
export default function MotionEffects({ refreshKey = 0 }: { refreshKey?: number }) {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const main = document.querySelector('main')
    if (!main) return

    const maxHeight = window.innerHeight * MAX_HEIGHT_RATIO
    // Document-relative fold line (the layout scrolls to top on every route change).
    const fold = window.innerHeight * FOLD_RATIO
    const nodes = Array.from(main.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter((element) => {
      if (element.closest(EXCLUDE_SELECTOR)) return false
      if (element.matches('.glass') && element.parentElement?.closest('.card')) return false
      if (element.matches('.card') && element.parentElement?.closest('.card, article')) return false
      if (element.offsetHeight > maxHeight) return false
      if (element.getBoundingClientRect().top + window.scrollY < fold) return false
      return true
    })

    if (!nodes.length) return

    const timers = new Set<number>()
    const finish = (element: HTMLElement) => {
      element.classList.remove('motion-reveal', 'is-revealed')
      element.style.removeProperty('--reveal-delay')
    }

    const reveal = (element: HTMLElement) => {
      element.classList.add('is-revealed')
      let timer = 0
      const onEnd = (event: TransitionEvent) => {
        if (event.target !== element || event.propertyName !== 'opacity') return
        element.removeEventListener('transitionend', onEnd)
        window.clearTimeout(timer)
        timers.delete(timer)
        finish(element)
      }
      element.addEventListener('transitionend', onEnd)
      timer = window.setTimeout(() => {
        element.removeEventListener('transitionend', onEnd)
        timers.delete(timer)
        finish(element)
      }, SETTLE_MS)
      timers.add(timer)
    }

    const siblingCounts = new Map<Element | null, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          observer.unobserve(entry.target)
          reveal(entry.target as HTMLElement)
        }
      },
      // Any visible pixel counts, so tall sections reveal as soon as their top edge appears.
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )

    for (const element of nodes) {
      const parent = element.parentElement
      const order = siblingCounts.get(parent) ?? 0
      siblingCounts.set(parent, order + 1)
      element.style.setProperty('--reveal-delay', `${Math.min(order, 7) * 55}ms`)
      element.classList.add('motion-reveal')
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
      timers.forEach((timer) => window.clearTimeout(timer))
      nodes.forEach(finish)
    }
  }, [pathname, refreshKey])

  return null
}
