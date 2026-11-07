import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg py-24 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-word-50 text-word-600 dark:bg-word-500/15 dark:text-word-300">
        <Compass size={26} />
      </span>
      <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mt-2 text-muted">
        The page you followed does not exist. It may be an old link or a typo.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          <ArrowLeft size={15} />
          Back home
        </Link>
        <Link to="/paths" className="btn-secondary">
          Browse paths
        </Link>
      </div>
    </div>
  )
}
