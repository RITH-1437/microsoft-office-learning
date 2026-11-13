import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, summary, [role="button"], [data-cursor="hover"]'

export default function AnimatedCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(false)
  const hoveringRef = useRef(false)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches)

    update()
    finePointer.addEventListener('change', update)
    reducedMotion.addEventListener('change', update)
    return () => {
      finePointer.removeEventListener('change', update)
      reducedMotion.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    root.classList.add('custom-cursor')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const glow = { ...target }
    let frame = 0
    let running = false

    const setVisibleState = (next: boolean) => {
      if (visibleRef.current === next) return
      visibleRef.current = next
      setVisible(next)
    }

    const setHoverState = (next: boolean) => {
      if (hoveringRef.current === next) return
      hoveringRef.current = next
      setHovering(next)
    }

    const moveTo = (element: HTMLElement | null, x: number, y: number) => {
      if (!element) return
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const render = () => {
      glow.x += (target.x - glow.x) * 0.12
      glow.y += (target.y - glow.y) * 0.12
      moveTo(glowRef.current, glow.x, glow.y)
      // Stop the loop once settled; pointer movement wakes it again.
      if (Math.abs(target.x - glow.x) + Math.abs(target.y - glow.y) < 0.3) {
        running = false
        return
      }
      frame = requestAnimationFrame(render)
    }

    const wake = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(render)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      target.x = event.clientX
      target.y = event.clientY
      moveTo(dotRef.current, target.x, target.y)
      setVisibleState(true)
      wake()

      const element = event.target instanceof Element ? event.target : null
      setHoverState(Boolean(element?.closest(INTERACTIVE_SELECTOR)))
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      setPressed(true)

      const ripple = rippleRef.current
      if (!ripple) return
      const { clientX: x, clientY: y } = event
      ripple.animate(
        [
          {
            transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(0.35)`,
            opacity: 0.7,
          },
          {
            transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(2.1)`,
            opacity: 0,
          },
        ],
        { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      )
    }

    const onPointerUp = () => setPressed(false)
    const onLeave = () => {
      setVisibleState(false)
      setHoverState(false)
      setPressed(false)
    }
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') setVisibleState(true)
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.addEventListener('pointerup', onPointerUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    wake()

    return () => {
      root.classList.remove('custom-cursor')
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointerup', onPointerUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      className={`cursor-layer no-print ${visible ? 'is-visible' : ''}`}
      aria-hidden="true"
    >
      <div ref={glowRef} className={`cursor-glow ${hovering ? 'is-hovering' : ''}`} />
      <div ref={rippleRef} className="cursor-ripple" />
      <div
        ref={dotRef}
        className={`cursor-dot ${hovering ? 'is-hovering' : ''} ${pressed ? 'is-pressed' : ''}`}
      />
    </div>
  )
}
