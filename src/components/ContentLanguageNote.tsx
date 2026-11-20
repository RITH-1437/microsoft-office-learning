import { Languages } from 'lucide-react'
import { useLocale, useT } from '../i18n'

interface ContentLanguageNoteProps {
  className?: string
}

/**
 * Shown only in Khmer mode on content pages (lessons, quizzes, projects): explains that the
 * lesson text itself is still English, so nobody thinks the translation is broken.
 */
export default function ContentLanguageNote({ className = '' }: ContentLanguageNoteProps) {
  const locale = useLocale()
  const t = useT()
  if (locale === 'en') return null
  return (
    <p
      data-no-reveal
      className={`flex items-start gap-2.5 rounded-xl border border-word-200/70 bg-word-50/60 px-4 py-3 text-sm text-word-900 dark:border-word-500/25 dark:bg-word-500/10 dark:text-word-100 ${className}`}
    >
      <Languages size={16} className="mt-1 shrink-0" aria-hidden="true" />
      <span>{t('content.englishNote')}</span>
    </p>
  )
}
