import { useMemo, useState } from 'react'
import {
  BookMarked,
  ChevronDown,
  Keyboard,
  Library,
  Search,
  Sparkles,
} from 'lucide-react'
import { faqs, glossary, shortcuts } from '../data/resources'

const tabs = [
  { id: 'shortcuts', label: 'Shortcuts', icon: Keyboard },
  { id: 'glossary', label: 'Glossary', icon: BookMarked },
  { id: 'faq', label: 'FAQ', icon: Sparkles },
] as const

type TabId = (typeof tabs)[number]['id']
type AppFilter = 'All' | 'Word' | 'Excel' | 'Both'

export default function ResourcesPage() {
  const [tab, setTab] = useState<TabId>('shortcuts')
  const [query, setQuery] = useState('')
  const [app, setApp] = useState<AppFilter>('All')
  const [category, setCategory] = useState('All')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const categories = useMemo(() => ['All', ...Array.from(new Set(shortcuts.map((item) => item.category)))], [])
  const term = query.trim().toLowerCase()

  const filteredShortcuts = shortcuts.filter((item) => {
    const matchesApp = app === 'All' || item.app === app || item.app === 'Both'
    const matchesCategory = category === 'All' || item.category === category
    const matchesQuery = !term || `${item.keys} ${item.action} ${item.category}`.toLowerCase().includes(term)
    return matchesApp && matchesCategory && matchesQuery
  })

  const filteredGlossary = glossary.filter((item) => {
    const matchesApp = app === 'All' || item.app === app || item.app === 'Both'
    const matchesQuery = !term || `${item.term} ${item.definition}`.toLowerCase().includes(term)
    return matchesApp && matchesQuery
  })

  const filteredFaqs = faqs.filter((item) => !term || `${item.question} ${item.answer}`.toLowerCase().includes(term))

  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <span className="section-label">
          <Library size={13} /> Reference
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Resources and quick reference</h1>
        <p className="mt-3 text-lg text-muted">
          Shortcuts, plain-language definitions, and answers to the questions beginners ask most.
        </p>
      </header>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex rounded-xl border hairline bg-white/40 p-1 dark:bg-white/5">
          {tabs.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  tab === item.id
                    ? 'bg-word-600 text-white shadow-sm'
                    : 'text-muted hover:text-[var(--text-strong)]'
                }`}
              >
                <Icon size={15} />
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${tab}`}
              className="w-full rounded-xl border hairline bg-white/50 py-2 pl-9 pr-3 text-sm outline-none focus:border-word-400 dark:bg-white/5 sm:w-56"
              aria-label={`Search ${tab}`}
            />
          </div>
          {tab !== 'faq' && (
            <div className="flex gap-1 rounded-xl border hairline bg-white/40 p-1 dark:bg-white/5">
              {(['All', 'Word', 'Excel'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setApp(item)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                    app === item ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900' : 'text-muted'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {tab === 'shortcuts' && (
        <section>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  category === item
                    ? 'bg-word-100 text-word-700 dark:bg-word-500/20 dark:text-word-200'
                    : 'border hairline text-muted hover:text-[var(--text-strong)]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b hairline bg-ink-50/70 text-[11px] uppercase tracking-wide text-muted dark:bg-white/[0.04]">
                    <th className="px-5 py-3 font-semibold">Windows</th>
                    <th className="px-5 py-3 font-semibold">Mac</th>
                    <th className="px-5 py-3 font-semibold">Action</th>
                    <th className="px-5 py-3 font-semibold">Applies to</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShortcuts.map((item) => (
                    <tr key={`${item.keys}-${item.action}`} className="border-b hairline last:border-0">
                      <td className="whitespace-nowrap px-5 py-3">
                        <span className="kbd">{item.keys}</span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-muted">
                        {item.mac ? <span className="kbd">{item.mac}</span> : '—'}
                      </td>
                      <td className="px-5 py-3">{item.action}</td>
                      <td className="px-5 py-3">
                        <span className="chip">{item.app}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredShortcuts.length === 0 && (
              <div className="p-8 text-center text-sm text-muted">No shortcuts match your search.</div>
            )}
          </div>
          <p className="mt-3 text-xs text-muted">
            Shortcuts follow Microsoft 365 on Windows. Menu names can differ slightly in older versions and
            on Mac.
          </p>
        </section>
      )}

      {tab === 'glossary' && (
        <section>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGlossary.map((item) => (
              <div key={item.term} className="card p-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-bold">{item.term}</h2>
                  <span className="chip">{item.app}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.definition}</p>
              </div>
            ))}
          </div>
          {filteredGlossary.length === 0 && (
            <div className="card p-8 text-center text-sm text-muted">No terms match your search.</div>
          )}
        </section>
      )}

      {tab === 'faq' && (
        <section className="space-y-3">
          {filteredFaqs.map((item, index) => {
            const open = openFaq === index
            return (
              <div key={item.question} className="card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : index)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="flex-1 text-sm font-semibold">{item.question}</span>
                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-muted transition ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && (
                  <div className="border-t hairline px-5 py-4 text-sm leading-relaxed text-muted">{item.answer}</div>
                )}
              </div>
            )
          })}
          {filteredFaqs.length === 0 && (
            <div className="card p-8 text-center text-sm text-muted">No questions match your search.</div>
          )}
        </section>
      )}
    </div>
  )
}
