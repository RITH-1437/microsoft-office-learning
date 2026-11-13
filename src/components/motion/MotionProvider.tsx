import type { ReactNode } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'

/**
 * Loads Framer Motion's DOM feature set once (smaller than the full bundle) and
 * makes every `m.*` component honour the OS "reduce motion" setting
 * (transform/layout animations are disabled, opacity still fades).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
