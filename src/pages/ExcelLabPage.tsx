import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Eraser,
  FlaskConical,
  Info,
  RotateCcw } from 'lucide-react'
import OfficeAppIcon from '../components/icons/OfficeAppIcon'
import { cellAddress, displayValue, evaluateWorkbook } from '../lib/formula'

const COLS = 10
const ROWS = 16

const sampleCells: Record<string, string> = {
  A1: 'Monthly Budget',
  A3: 'Item',
  B3: 'Units',
  C3: 'Price',
  D3: 'Total',
  A4: 'Paper',
  B4: '4',
  C4: '5.50',
  D4: '=B4*C4',
  A5: 'Pens',
  B5: '2',
  C5: '12.00',
  D5: '=B5*C5',
  A6: 'Folders',
  B6: '3',
  C6: '3.25',
  D6: '=B6*C6',
  A7: 'Subtotal',
  D7: '=SUM(D4:D6)',
  A9: 'Tax rate',
  B9: '0.2',
  A10: 'Tax',
  B10: '=ROUND(D7*B9,2)',
  A11: 'Grand total',
  B11: '=D7+B10',
  A13: 'Items counted',
  B13: '=COUNTA(A4:A6)',
  A14: 'Totals over 10',
  B14: '=COUNTIF(D4:D6,">10")',
  A15: 'Largest total',
  B15: '=MAX(D4:D6)',
  A16: 'Status',
  B16: '=IF(B11>30,"Review","OK")',
}

const examples = [
  { formula: '=SUM(B4:B6)', description: 'Add a range' },
  { formula: '=AVERAGE(C4:C6)', description: 'Average a range' },
  { formula: '=COUNTIF(D4:D6,">10")', description: 'Count matching cells' },
  { formula: '=IF(D7>20,"High","Low")', description: 'Test a condition' },
  { formula: '=ROUND(D7*0.2,2)', description: 'Round a calculation' },
  { formula: '=VLOOKUP("Pens",A4:D6,4,FALSE)', description: 'Look up a value' },
]

function downloadCsv(cells: Record<string, string>) {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`
  const lines: string[] = []
  for (let row = 1; row <= ROWS; row += 1) {
    const values: string[] = []
    for (let col = 1; col <= COLS; col += 1) {
      values.push(escape(cells[cellAddress(col, row)] ?? ''))
    }
    lines.push(values.join(','))
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'excel-lab.csv'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export default function ExcelLabPage() {
  const [cells, setCells] = useState<Record<string, string>>(sampleCells)
  const [selected, setSelected] = useState('A1')
  const [editing, setEditing] = useState<string | null>(null)

  const evaluator = useMemo(() => evaluateWorkbook(cells), [cells])
  const display = useMemo(() => {
    const values: Record<string, string> = {}
    for (let row = 1; row <= ROWS; row += 1) {
      for (let col = 1; col <= COLS; col += 1) {
        const address = cellAddress(col, row)
        values[address] = displayValue(evaluator.getCell(address))
      }
    }
    return values
  }, [evaluator])

  const rawSelected = cells[selected] ?? ''
  const selectedValue = display[selected] ?? ''

  const updateCell = (address: string, value: string) => {
    setCells((previous) => {
      const next = { ...previous }
      if (value === '') delete next[address]
      else next[address] = value
      return next
    })
  }

  const focusCell = (address: string) => {
    requestAnimationFrame(() => document.getElementById(`excel-${address}`)?.focus())
  }

  const selectedIsFormula = rawSelected.trim().startsWith('=')

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/labs" className="hover:text-[var(--text-strong)]">
          Labs
        </Link>
        <span>/</span>
        <span className="text-[var(--text-strong)]">Excel formula lab</span>
      </nav>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-label">
            <FlaskConical size={13} /> Interactive lab
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Excel formula lab</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Edit cells, type formulas, and see results immediately. This is a simplified simulation, not
            Microsoft Excel — but the formula logic is real.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setCells(sampleCells)} className="btn-secondary">
            <RotateCcw size={14} />
            Reset sample
          </button>
          <button type="button" onClick={() => setCells({})} className="btn-secondary">
            <Eraser size={14} />
            Clear
          </button>
          <button type="button" onClick={() => downloadCsv(cells)} className="btn-primary">
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl border hairline bg-white shadow-soft dark:bg-ink-900">
            <div className="flex items-center gap-2 border-b hairline bg-ink-50/70 px-3 py-2 dark:bg-white/[0.04]">
              <OfficeAppIcon app="excel" size={24} />
              <span className="text-xs font-semibold">Budget-lab.xlsx</span>
              <span className="ml-auto text-[10px] text-muted">Simulation · not saved</span>
            </div>

            <div className="flex items-stretch border-b hairline">
              <div className="grid w-12 shrink-0 place-items-center border-r hairline bg-ink-50/60 text-[11px] font-semibold text-muted dark:bg-white/[0.04]">
                {selected}
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-1.5">
                <span className="shrink-0 font-mono text-xs italic text-muted">fx</span>
                <input
                  value={rawSelected}
                  onFocus={() => setEditing(selected)}
                  onChange={(event) => updateCell(selected, event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      event.currentTarget.blur()
                    }
                  }}
                  placeholder="Enter a value or formula, for example =SUM(B4:B6)"
                  className="min-w-0 flex-1 bg-transparent font-mono text-xs outline-none placeholder:font-sans placeholder:text-muted"
                  aria-label={`Formula bar for ${selected}`}
                />
              </div>
            </div>

            <div className="overflow-auto">
              <div className="min-w-[640px]">
                <div className="grid" style={{ gridTemplateColumns: `48px repeat(${COLS}, minmax(64px, 1fr))` }}>
                  <div className="border-b border-r hairline bg-ink-100/70 px-2 py-1.5 dark:bg-white/[0.06]" />
                  {Array.from({ length: COLS }, (_, index) => (
                    <div
                      key={index}
                      className={`border-b border-r hairline bg-ink-100/70 px-2 py-1.5 text-center text-[11px] font-semibold text-muted dark:bg-white/[0.06] ${
                        selected.startsWith(String.fromCharCode(65 + index)) ? 'bg-excel-100/70 text-excel-800 dark:bg-excel-500/20 dark:text-excel-200' : ''
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                  ))}

                  {Array.from({ length: ROWS }, (_, rowIndex) => {
                    const row = rowIndex + 1
                    return (
                      <div key={row} className="contents">
                        <div
                          className={`border-b border-r hairline bg-ink-100/70 px-2 py-1.5 text-center text-[11px] font-semibold text-muted dark:bg-white/[0.06] ${
                            selected.endsWith(String(row)) ? 'bg-excel-100/70 text-excel-800 dark:bg-excel-500/20 dark:text-excel-200' : ''
                          }`}
                        >
                          {row}
                        </div>
                        {Array.from({ length: COLS }, (_, colIndex) => {
                          const address = cellAddress(colIndex + 1, row)
                          const isSelected = selected === address
                          const value = display[address] ?? ''
                          const isError = value.startsWith('#')
                          const isNumber = /^-?\d+(\.\d+)?$/.test(value)
                          return (
                            <input
                              key={address}
                              id={`excel-${address}`}
                              value={editing === address ? cells[address] ?? '' : value}
                              onFocus={() => {
                                setSelected(address)
                                setEditing(address)
                              }}
                              onBlur={() => setEditing(null)}
                              onChange={(event) => updateCell(address, event.target.value)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  event.preventDefault()
                                  event.currentTarget.blur()
                                  if (row < ROWS) focusCell(cellAddress(colIndex + 1, row + 1))
                                }
                              }}
                              aria-label={`Cell ${address}`}
                              className={`min-w-0 border-b border-r hairline px-2 py-1.5 font-mono text-[11px] outline-none transition ${
                                isSelected
                                  ? 'relative z-10 bg-excel-50 ring-2 ring-inset ring-excel-500 dark:bg-excel-500/10 dark:ring-excel-400'
                                  : 'bg-transparent'
                              } ${isNumber ? 'text-right tabular-nums' : ''} ${
                                isError ? 'text-red-600 dark:text-red-400' : 'text-ink-700 dark:text-ink-100'
                              } ${address === 'A1' ? 'font-sans font-bold' : ''}`}
                            />
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t hairline bg-ink-50/60 px-3 py-2 text-[11px] text-muted dark:bg-white/[0.03]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 size={12} className="text-excel-500" />
                {selected} = <span className="font-mono font-semibold text-[var(--text-strong)]">{selectedValue || 'blank'}</span>
              </span>
              {selectedIsFormula && <span className="chip">formula</span>}
              <span className="ml-auto hidden sm:inline">Enter moves down · Click a cell to edit</span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl border border-word-200/60 bg-word-50/50 p-3 text-xs leading-relaxed text-muted dark:border-word-500/20 dark:bg-word-500/5">
            <Info size={14} className="mt-0.5 shrink-0 text-word-500" />
            <span>
              Supported: arithmetic, comparisons, cell references, ranges, SUM, AVERAGE, MIN, MAX, COUNT,
              COUNTA, IF, ROUND, COUNTIF, SUMIF, VLOOKUP, and TODAY. Circular references show #CIRC!.
            </span>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="text-sm font-bold">Try these formulas</h2>
            <p className="mt-1 text-xs text-muted">Click a cell, then copy a formula into the formula bar.</p>
            <div className="mt-3 space-y-2">
              {examples.map((example) => (
                <div key={example.formula} className="rounded-lg border hairline bg-white/50 p-2.5 dark:bg-white/5">
                  <code className="block break-all font-mono text-[11px] text-excel-700 dark:text-excel-300">
                    {example.formula}
                  </code>
                  <div className="mt-0.5 text-[10px] text-muted">{example.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-bold">Mini challenges</h2>
            <ol className="mt-2 space-y-2 text-xs text-muted">
              <li>1. In C7, calculate the average price with =AVERAGE(C4:C6).</li>
              <li>2. In C13, count text items with =COUNTA(A4:A6).</li>
              <li>3. In C14, count totals over 10 with =COUNTIF(D4:D6,"&gt;10").</li>
              <li>4. Change B9 to 0.15 and watch the grand total update.</li>
              <li>5. Create a lookup: =VLOOKUP("Pens",A4:D6,4,FALSE).</li>
            </ol>
          </div>

          <Link to="/lesson/e3-1" className="card lift flex items-center gap-3 p-4">
            <ArrowLeft size={15} className="text-muted" />
            <div>
              <div className="text-sm font-semibold">Review formulas</div>
              <div className="text-[11px] text-muted">Lesson e3-1: Your first formula</div>
            </div>
          </Link>
        </aside>
      </div>
    </div>
  )
}
