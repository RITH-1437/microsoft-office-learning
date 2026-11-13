import LogoMark from '../LogoMark'

/**
 * Suspense fallback while a lazy route chunk loads. Reserves roughly the same space
 * as a real page (no layout shift) and is announced politely to assistive tech.
 */
export default function RouteSkeleton() {
  return (
    <div role="status" aria-live="polite" className="min-h-[70vh] space-y-8" data-no-reveal>
      <span className="sr-only">Loading page…</span>
      <div className="flex items-center gap-3" aria-hidden="true">
        <LogoMark className="logo-pulse h-9 w-9" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-28" />
          <div className="skeleton h-5 w-56" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {[0, 1, 2].map((item) => (
          <div key={item} className="card space-y-3 p-5">
            <div className="skeleton h-9 w-9 rounded-xl" />
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  )
}
