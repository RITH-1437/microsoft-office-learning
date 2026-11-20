import { Languages } from 'lucide-react'
import { LOCALES, useLocale, useT } from '../i18n'
import { useProgress } from '../store/progress'

interface LanguageToggleProps {
  className?: string
}

/**
 * Single English ⇄ Khmer button. It shows the language you will switch *to*, written in
 * that language («ខ្មែរ» / «EN»), so a learner can always find their way back.
 */
export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const locale = useLocale()
  const setLocale = useProgress((state) => state.setLocale)
  const t = useT()
  const index = Math.max(
    0,
    LOCALES.findIndex((item) => item.id === locale),
  )
  const other = LOCALES[(index + 1) % LOCALES.length]
  const label = t('lang.switchTo', { lang: other.label })

  return (
    <button
      type="button"
      onClick={() => setLocale(other.id)}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-lg border hairline bg-white/40 px-2.5 text-xs font-bold text-muted transition-colors hover:text-[var(--text-strong)] dark:bg-white/5 ${className}`}
    >
      <Languages size={15} className="shrink-0" aria-hidden="true" />
      <span lang={other.htmlLang}>{other.short}</span>
    </button>
  )
}
