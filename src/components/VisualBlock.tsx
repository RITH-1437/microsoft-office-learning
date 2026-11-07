import type { Visual } from '../types'
import { Table2 } from 'lucide-react'

function TableVisual({ visual }: { visual: Extract<Visual, { kind: 'table' }> }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
        <Table2 size={13} />
        {visual.title}
      </div>
      <div className="overflow-x-auto rounded-xl border hairline">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead>
            <tr className="bg-ink-100/70 text-[11px] uppercase tracking-wide text-muted dark:bg-white/[0.06]">
              {visual.headers.map((header) => (
                <th key={header} className="whitespace-nowrap px-3 py-2.5 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visual.rows.map((row, index) => (
              <tr key={index} className="border-t hairline">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${index}-${cellIndex}`}
                    className={`px-3 py-2 ${
                      cellIndex === 0 ? 'font-medium' : 'text-muted'
                    } ${/^[\d$€£,.%-]+$/.test(cell) ? 'text-right tabular-nums' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visual.caption && <p className="mt-2 text-xs text-muted">{visual.caption}</p>}
    </div>
  )
}

function FormulaVisual({ visual }: { visual: Extract<Visual, { kind: 'formula' }> }) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">{visual.title}</div>
      <div className="rounded-xl border hairline bg-ink-950 p-4 text-white dark:bg-black/50">
        <code className="block overflow-x-auto whitespace-pre font-mono text-sm text-excel-300">{visual.formula}</code>
        <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
          <span className="text-[11px] uppercase tracking-wide text-ink-400">Result</span>
          <span className="font-mono text-sm font-semibold text-white">{visual.result}</span>
        </div>
      </div>
      {visual.note && <p className="mt-2 text-xs text-muted">{visual.note}</p>}
      {visual.caption && <p className="mt-1 text-xs text-muted">{visual.caption}</p>}
    </div>
  )
}

function MockupVisual({ visual }: { visual: Extract<Visual, { kind: 'mockup' }> }) {
  const isExcel = visual.variant === 'excel'
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">{visual.title}</div>
      <div className="overflow-hidden rounded-xl border hairline bg-white shadow-soft dark:bg-ink-900">
        <div
          className={`flex items-center gap-1.5 px-3 py-2 ${
            isExcel ? 'bg-excel-600' : 'bg-word-600'
          } text-white`}
        >
          <span className="h-2 w-2 rounded-full bg-white/70" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="ml-2 text-[10px] font-medium">{isExcel ? 'Expense Report — Excel' : 'Business Memo — Word'}</span>
        </div>
        <div className="p-4">
          {isExcel ? (
            <div className="grid grid-cols-4 overflow-hidden rounded border border-ink-200/70 text-[11px] dark:border-white/10">
              {['Item', 'Amount', 'Tax', 'Total'].map((header) => (
                <div
                  key={header}
                  className="bg-ink-100 px-2 py-1.5 font-semibold text-ink-700 dark:bg-white/10 dark:text-ink-200"
                >
                  {header}
                </div>
              ))}
              {visual.lines.slice(0, 8).map((line, index) => (
                <div
                  key={index}
                  className="border-t border-r border-ink-200/50 px-2 py-1.5 text-ink-600 last:border-r-0 dark:border-white/10 dark:text-ink-300"
                >
                  {line}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {visual.lines.map((line, index) => {
                const isHeading = line.startsWith('#')
                const text = isHeading ? line.replace(/^#+\s*/, '') : line
                return isHeading ? (
                  <div key={index} className="pt-1 font-display text-sm font-bold text-ink-900 dark:text-ink-100">
                    {text}
                  </div>
                ) : (
                  <div key={index} className="text-[11px] leading-relaxed text-ink-500 dark:text-ink-400">
                    {text}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {visual.caption && <p className="mt-2 text-xs text-muted">{visual.caption}</p>}
    </div>
  )
}

function CompareVisual({ visual }: { visual: Extract<Visual, { kind: 'compare' }> }) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">{visual.title}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[visual.left, visual.right].map((side, index) => (
          <div
            key={side.label}
            className={`rounded-xl border p-4 ${
              index === 0
                ? 'border-word-200/70 bg-word-50/60 dark:border-word-500/20 dark:bg-word-500/5'
                : 'border-excel-200/70 bg-excel-50/60 dark:border-excel-500/20 dark:bg-excel-500/5'
            }`}
          >
            <div className="text-sm font-semibold">{side.label}</div>
            <ul className="mt-2 space-y-1.5">
              {side.points.map((point) => (
                <li key={point} className="flex gap-2 text-xs leading-relaxed text-muted">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-current" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {visual.caption && <p className="mt-2 text-xs text-muted">{visual.caption}</p>}
    </div>
  )
}

function ChartVisual({ visual }: { visual: Extract<Visual, { kind: 'chart' }> }) {
  const max = Math.max(...visual.data.map((item) => item.value), 1)
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">{visual.title}</div>
      <div className="rounded-xl border hairline bg-white/60 p-4 dark:bg-white/[0.03]">
        <div className="flex h-40 items-end gap-2 sm:gap-3">
          {visual.data.map((item) => (
            <div key={item.label} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[10px] font-semibold tabular-nums text-muted">
                {item.value}
                {visual.unit ?? ''}
              </span>
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-word-600 to-word-400 transition group-hover:from-word-700 group-hover:to-word-500"
                style={{ height: `${Math.max(6, (item.value / max) * 100)}%` }}
              />
              <span className="text-[10px] text-muted">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      {visual.caption && <p className="mt-2 text-xs text-muted">{visual.caption}</p>}
    </div>
  )
}

export default function VisualBlock({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case 'table':
      return <TableVisual visual={visual} />
    case 'formula':
      return <FormulaVisual visual={visual} />
    case 'mockup':
      return <MockupVisual visual={visual} />
    case 'compare':
      return <CompareVisual visual={visual} />
    case 'chart':
      return <ChartVisual visual={visual} />
  }
}
