import type { ReactNode } from 'react'
import type { WorkspaceState } from '../../types'
import type { OfficeApp } from '../icons/OfficeAppIcon'

/** Numbered marker used by the interface anatomy (Know the screen page). */
export function PartBadge({ n }: { n?: number }) {
  if (!n) return null
  return <span className="office-part-badge" aria-hidden="true">{n}</span>
}

/** Part numbers for the workspace area, keyed by part name. */
export type WorkspaceParts = Partial<Record<'page' | 'namebox' | 'formula' | 'columns' | 'rows' | 'cell' | 'sheets', number>>

/* ------------------------------------------------------------------ Word page */

function inline(text: string, selection?: string): ReactNode {
  // **bold**, *italic*, and an optional selected substring (Word's grey-blue selection).
  const parts: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g
  let last = 0
  let key = 0
  const push = (chunk: string) => {
    if (!chunk) return
    if (selection && chunk.includes(selection)) {
      const [before, after] = chunk.split(selection)
      parts.push(before, <mark key={`s${key++}`} className="office-selection">{selection}</mark>, after)
    } else {
      parts.push(chunk)
    }
  }
  for (const match of text.matchAll(pattern)) {
    push(text.slice(last, match.index))
    const token = match[0]
    if (token.startsWith('**')) parts.push(<strong key={`b${key++}`}>{token.slice(2, -2)}</strong>)
    else parts.push(<em key={`i${key++}`}>{token.slice(1, -1)}</em>)
    last = (match.index ?? 0) + token.length
  }
  push(text.slice(last))
  return parts
}

/**
 * A simplified Word page. Line markup: `# ` Heading 1, `## ` Heading 2, `- ` bullet,
 * `1. ` numbered item, `|a|b|` table row, `>center ` centred line, empty string = blank line.
 */
export function WordPage({ lines, selection, parts }: { lines: string[]; selection?: string; parts?: WorkspaceParts }) {
  const blocks: ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('|')) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i].split('|').filter((_cell, index, all) => index > 0 && index < all.length - 1))
        i += 1
      }
      blocks.push(
        <table key={`t${i}`} className="office-doc-table">
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (r === 0 ? <th key={c}>{inline(cell.trim(), selection)}</th> : <td key={c}>{inline(cell.trim(), selection)}</td>))}
              </tr>
            ))}
          </tbody>
        </table>,
      )
      continue
    }
    if (line.startsWith('- ') || /^\d+\. /.test(line)) {
      const ordered = /^\d+\. /.test(line)
      const items: string[] = []
      while (i < lines.length && (ordered ? /^\d+\. /.test(lines[i]) : lines[i].startsWith('- '))) {
        items.push(lines[i].replace(/^(- |\d+\. )/, ''))
        i += 1
      }
      const List = ordered ? 'ol' : 'ul'
      blocks.push(
        <List key={`l${i}`} className={ordered ? 'office-doc-ol' : 'office-doc-ul'}>
          {items.map((item, n) => (
            <li key={n}>{inline(item, selection)}</li>
          ))}
        </List>,
      )
      continue
    }
    if (line.startsWith('# ')) blocks.push(<p key={i} className="office-doc-h1">{inline(line.slice(2), selection)}</p>)
    else if (line.startsWith('## ')) blocks.push(<p key={i} className="office-doc-h2">{inline(line.slice(3), selection)}</p>)
    else if (line.startsWith('>center ')) blocks.push(<p key={i} className="office-doc-p text-center">{inline(line.slice(8), selection)}</p>)
    else if (line === '') blocks.push(<p key={i} className="office-doc-p">&nbsp;</p>)
    else blocks.push(<p key={i} className="office-doc-p">{inline(line, selection)}</p>)
    i += 1
  }
  return (
    <div className="office-page-area">
      <div className="office-page" aria-label="Document page">
        <PartBadge n={parts?.page} />
        {blocks}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ Excel sheet */

const COLUMN = (index: number) => String.fromCharCode(65 + index)

function parseRef(ref?: string): { col: number; row: number } | null {
  const match = ref?.match(/^([A-Z])(\d+)$/)
  return match ? { col: match[1].charCodeAt(0) - 65, row: Number(match[2]) - 1 } : null
}

/**
 * A simplified Excel grid with name box, formula bar, headers and sheet tabs.
 * `cells` is row-major; `selected` is a cell ref like "B4"; `formula` overrides the formula bar.
 */
export function ExcelSheet({ cells, selected, formula, parts }: { cells: string[][]; selected?: string; formula?: string; parts?: WorkspaceParts }) {
  const columns = Math.max(6, ...cells.map((row) => row.length))
  const rowCount = Math.max(8, cells.length)
  const sel = parseRef(selected)
  const selectedValue = sel ? cells[sel.row]?.[sel.col] ?? '' : ''
  const barText = formula ?? selectedValue
  return (
    <div className="office-sheet-area">
      <div className="office-formula-row">
        <div className="office-namebox" aria-label="Name Box">
          <PartBadge n={parts?.namebox} />
          {selected ?? 'A1'}
        </div>
        <div className="office-fx" aria-hidden="true">fx</div>
        <div className="office-formula-bar" aria-label="Formula Bar">
          <PartBadge n={parts?.formula} />
          {barText}
        </div>
      </div>
      <div className="office-grid-scroll">
        <table className="office-grid" aria-label="Worksheet">
          <thead>
            <tr>
              <th className="office-corner" />
              {Array.from({ length: columns }, (_, c) => (
                <th key={c} className={sel?.col === c ? 'is-selected' : undefined}>
                  {c === 2 && <PartBadge n={parts?.columns} />}
                  {COLUMN(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowCount }, (_, r) => (
              <tr key={r}>
                <th className={sel?.row === r ? 'is-selected' : undefined}>
                  {r === 3 && <PartBadge n={parts?.rows} />}
                  {r + 1}
                </th>
                {Array.from({ length: columns }, (_, c) => {
                  const value = cells[r]?.[c] ?? ''
                  const numeric = /^-?[\d,.]+%?$/.test(value) || /^[$€£]\s?[\d,.]+$/.test(value)
                  const isSel = sel?.row === r && sel?.col === c
                  return (
                    <td key={c} className={`${numeric ? 'is-number' : ''} ${isSel ? 'is-selected' : ''} ${r === 0 && value ? 'is-header' : ''}`}>
                      {isSel && <PartBadge n={parts?.cell} />}
                      {value}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="office-sheet-tabs" aria-hidden="true">
        <span className="is-active">
          <PartBadge n={parts?.sheets} />
          Sheet1
        </span>
        <span>+</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ dispatcher */

const DEFAULT_STATE: Record<OfficeApp, WorkspaceState> = {
  word: { kind: 'doc', lines: [''] },
  excel: { kind: 'sheet', cells: [] },
}

export default function Workspace({ app, state, parts }: { app: OfficeApp; state?: WorkspaceState; parts?: WorkspaceParts }) {
  const current = state ?? DEFAULT_STATE[app]
  if (current.kind === 'doc') return <WordPage lines={current.lines} selection={current.selection} parts={parts} />
  return <ExcelSheet cells={current.cells} selected={current.selected} formula={current.formula} parts={parts} />
}
