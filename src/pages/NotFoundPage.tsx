import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { useT } from '../i18n'

export default function NotFoundPage() {
  const t = useT()
  return (
    <div className="mx-auto max-w-lg py-24 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-word-50 text-word-600 dark:bg-word-500/15 dark:text-word-300">
        <Compass size={26} />
      </span>
      <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight">{t('notFound.title')}</h1>
      <p className="mt-2 text-muted">
        {t('notFound.body')}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          <ArrowLeft size={15} />
          {t('common.backHome')}
        </Link>
        <Link to="/paths" className="btn-secondary">
          {t('common.browsePaths')}
        </Link>
      </div>
    </div>
  )
}
