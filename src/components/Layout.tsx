import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  Home,
  Library,
  Menu,
  Moon,
  Sun,
  Table2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { applyTheme, useProgress } from '../store/progress'

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

export default function Layout() {
  const [open, setOpen] = useState(false)
  const theme = useProgress((state) => state.theme)
  const toggleTheme = useProgress((state) => state.toggleTheme)

  useEffect(() => {
    applyTheme(theme)
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => applyTheme('system')
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [theme])

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <div className="page-orb -left-24 top-10 h-72 w-72 bg-word-300/40" aria-hidden="true" />
      <div className="page-orb -right-20 top-1/3 h-80 w-80 bg-excel-300/30" aria-hidden="true" />

      <header className="no-print sticky top-0 z-50 border-b hairline glass-strong">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Office Academy home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-word-600 to-word-500 text-white shadow-soft">
              <GraduationCap size={20} strokeWidth={2.2} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-extrabold tracking-tight">Office Academy</span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted sm:block">
                Word + Excel
              </span>
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                      : 'text-muted hover:bg-ink-100/70 hover:text-[var(--text-strong)] dark:hover:bg-white/5'
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
              className="grid h-9 w-9 place-items-center rounded-lg border hairline bg-white/40 text-muted transition hover:text-[var(--text-strong)] dark:bg-white/5"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <Link to="/paths" className="btn-primary hidden sm:inline-flex">
              <BookOpen size={16} />
              Start learning
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid h-9 w-9 place-items-center rounded-lg border hairline bg-white/40 text-muted lg:hidden dark:bg-white/5"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t hairline px-3 pb-4 pt-2 lg:hidden" aria-label="Mobile navigation">
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium ${
                        isActive
                          ? 'bg-word-50 text-word-700 dark:bg-word-500/15 dark:text-word-200'
                          : 'text-muted hover:bg-ink-100/70 dark:hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon size={16} />
                    {item.label}
                  </NavLink>
                )
              })}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <Outlet />
      </main>

      <footer className="no-print border-t hairline">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted">
            <GraduationCap size={16} />
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
