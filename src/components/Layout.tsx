import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, m, useScroll, useSpring } from 'framer-motion'
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FlaskConical,
  Home,
  Library,
  Menu,
  Moon,
  Sun,
  Table2,
  X,
} from 'lucide-react'
import { applyTheme, useProgress } from '../store/progress'
import { ease, duration } from '../lib/motion'
import AnimatedCursor from './AnimatedCursor'
import LogoMark from './LogoMark'
import MotionEffects from './MotionEffects'
import RouteSkeleton from './motion/RouteSkeleton'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/paths', label: 'Paths', icon: BookOpen },
  { to: '/quizzes', label: 'Quizzes', icon: ClipboardCheck },
  { to: '/practice', label: 'Practice', icon: FlaskConical },
  { to: '/labs', label: 'Labs', icon: Table2 },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/resources', label: 'Resources', icon: Library },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

/** Thin scroll progress bar. Transform-only; hidden from assistive tech. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return <m.div className="scroll-progress no-print" style={{ scaleX }} aria-hidden="true" />
}

/** Fires once the routed page (including a lazy chunk) is actually in the DOM. */
function RouteReady({ onReady }: { onReady: () => void }) {
  useLayoutEffect(() => {
    onReady()
    // Intentionally once per mount: the parent keys <main> by pathname.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

export default function Layout() {
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const [routeTick, setRouteTick] = useState(0)
  const { pathname } = useLocation()
  // Menu is open only for the route it was opened on, so navigation closes it without an effect.
  const open = menuPath === pathname
  const setOpen = (next: boolean) => setMenuPath(next ? pathname : null)
  const theme = useProgress((state) => state.theme)
  const toggleTheme = useProgress((state) => state.toggleTheme)
  const navRef = useRef<HTMLElement>(null)
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null)

  useEffect(() => {
    applyTheme(theme)
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => applyTheme('system')
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [theme])

  // Slide the nav pill under the active link (transform + width only).
  useLayoutEffect(() => {
    const place = () => {
      const nav = navRef.current
      const active = nav?.querySelector<HTMLElement>('a[aria-current="page"]')
      if (!nav || !active) {
        setIndicator(null)
        return
      }
      setIndicator({ x: active.offsetLeft, w: active.offsetWidth })
    }
    place()
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place).catch(() => undefined)
    return () => window.removeEventListener('resize', place)
  }, [pathname])

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <ScrollProgress />
      <AnimatedCursor />
      <MotionEffects refreshKey={routeTick} />
      <div className="page-orb page-orb-a -left-24 top-10 h-72 w-72 bg-word-300/40" aria-hidden="true" />
      <div className="page-orb page-orb-b -right-20 top-1/3 h-80 w-80 bg-excel-300/30" aria-hidden="true" />

      <a
        href="#main-content"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-word-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header className="no-print sticky top-0 z-50 glass-nav">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Office Academy home">
            <LogoMark className="h-9 w-9" />
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-extrabold tracking-tight">Office Academy</span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted sm:block">
                Word + Excel
              </span>
            </span>
          </Link>

          <nav
            ref={navRef}
            className="relative ml-4 hidden items-center gap-0.5 lg:flex"
            aria-label="Main navigation"
          >
            <span
              className="nav-indicator"
              aria-hidden="true"
              style={{
                width: indicator?.w ?? 0,
                opacity: indicator ? 1 : 0,
                transform: `translateX(${indicator?.x ?? 0}px)`,
              }}
            />
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-word-700 dark:text-word-200' : 'text-muted hover:text-[var(--text-strong)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg border hairline bg-white/40 text-muted transition hover:text-[var(--text-strong)] dark:bg-white/5"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
                  transition={{ duration: duration.fast, ease: ease.out }}
                  className="grid place-items-center"
                >
                  {isDark ? <Sun size={17} /> : <Moon size={17} />}
                </m.span>
              </AnimatePresence>
            </button>
            <Link to="/paths" className="btn-primary hidden sm:inline-flex">
              <BookOpen size={16} />
              Start learning
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-lg border hairline bg-white/40 text-muted lg:hidden dark:bg-white/5"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <m.nav
              id="mobile-navigation"
              key="mobile-nav"
              className="border-t hairline px-3 pb-4 pt-2 lg:hidden"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: duration.fast, ease: ease.out }}
            >
              <div className="grid grid-cols-2 gap-1.5">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <m.div
                      key={item.to}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: duration.base, ease: ease.out, delay: 0.03 * index }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex min-h-11 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium ${
                            isActive
                              ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                              : 'text-muted hover:bg-ink-100/70 dark:hover:bg-white/5'
                          }`
                        }
                      >
                        <Icon size={16} />
                        {item.label}
                      </NavLink>
                    </m.div>
                  )
                })}
              </div>
            </m.nav>
          )}
        </AnimatePresence>
      </header>

      <main
        id="main-content"
        key={pathname}
        tabIndex={-1}
        className="page-enter mx-auto max-w-7xl px-4 pb-20 pt-8 outline-none sm:px-6 sm:pt-10"
      >
        <Suspense fallback={<RouteSkeleton />}>
          <Outlet />
          <RouteReady onReady={() => setRouteTick((tick) => tick + 1)} />
        </Suspense>
      </main>

      <footer className="no-print border-t hairline">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted">
            <LogoMark className="h-5 w-5" />
            <span>Office Academy — a practical Word and Excel course.</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <Link to="/resources" className="hover:text-[var(--text-strong)]">
              Shortcuts
            </Link>
            <Link to="/practice" className="hover:text-[var(--text-strong)]">
              Projects
            </Link>
            <Link to="/progress" className="hover:text-[var(--text-strong)]">
              My progress
            </Link>
            <span>Progress stays in this browser.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
