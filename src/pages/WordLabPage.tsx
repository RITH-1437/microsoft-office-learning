import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  Download,
  Eraser,
  FileText,
  FlaskConical,
  Italic,
  List,
  ListOrdered,
  Palette,
  Printer,
  Redo2,
  RotateCcw,
  Underline,
  Undo2,
} from 'lucide-react'

const initialHtml = `<h1>Business Memo</h1>
<p><strong>To:</strong> All staff<br/><strong>From:</strong> Operations Manager<br/><strong>Date:</strong> 12 March 2026<br/><strong>Subject:</strong> New supply request process</p>
<h2>Purpose</h2>
<p>This memo explains the new process for requesting office supplies and the deadlines that apply.</p>
<h2>Background</h2>
<p>Three orders last month were placed after the cut-off and arrived late. The current email process makes requests hard to track.</p>
<h2>Action required</h2>
<ol><li>Submit requests through the shared form by Tuesday 12:00.</li><li>Team leads approve or reject requests by Wednesday 17:00.</li><li>Confirm delivery dates in the tracker.</li></ol>
<p>Please keep the memo to one page and use the same headings.</p>`

function ToolButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-ink-100 hover:text-[var(--text-strong)] dark:hover:bg-white/10"
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-[rgb(148_163_184_/_0.3)]" aria-hidden="true" />
}

export default function WordLabPage() {
  const editorRef = useRef<HTMLDivElement>(null)
  const [words, setWords] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const [color, setColor] = useState('#1d3774')

  const run = (command: string, value?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    updateCount()
  }

  const updateCount = () => {
    const text = editorRef.current?.innerText ?? ''
    setWords(text.trim() ? text.trim().split(/\s+/).length : 0)
  }

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return
    editor.innerHTML = initialHtml
    updateCount()
  }, [resetKey])

  const reset = () => setResetKey((value) => value + 1)

  const downloadText = () => {
    const text = editorRef.current?.innerText ?? ''
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'word-lab-document.txt'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/labs" className="hover:text-[var(--text-strong)]">
          Labs
        </Link>
        <span>/</span>
        <span className="text-[var(--text-strong)]">Word editing lab</span>
      </nav>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-label">
            <FlaskConical size={13} /> Interactive lab
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Word editing lab</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Practice headings, bold text, alignment, and lists in a simplified editor. This is a simulation,
            not Microsoft Word, and your work is not saved after you leave the page.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={reset} className="btn-secondary">
            <RotateCcw size={14} />
            Reset document
          </button>
          <button type="button" onClick={downloadText} className="btn-secondary">
            <Download size={14} />
            Download text
          </button>
          <button type="button" onClick={() => window.print()} className="btn-primary">
            <Printer size={14} />
            Print
          </button>
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl border hairline bg-white shadow-soft dark:bg-ink-900">
            <div className="flex items-center gap-2 border-b hairline bg-ink-50/70 px-3 py-2 dark:bg-white/[0.04]">
              <span className="grid h-6 w-6 place-items-center rounded bg-word-600 text-white">
                <FileText size={13} />
              </span>
              <span className="text-xs font-semibold">Business-Memo.docx</span>
              <span className="ml-auto text-[10px] text-muted">Simulation · not saved</span>
            </div>

            <div className="flex flex-wrap items-center gap-0.5 border-b hairline bg-white/70 px-2 py-1.5 dark:bg-white/[0.02]">
              <ToolButton label="Undo" onClick={() => run('undo')}>
                <Undo2 size={15} />
              </ToolButton>
              <ToolButton label="Redo" onClick={() => run('redo')}>
                <Redo2 size={15} />
              </ToolButton>
              <Divider />
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => run('formatBlock', '<h1>')}
                className="rounded-lg px-2 py-1.5 text-[11px] font-bold text-muted transition hover:bg-ink-100 hover:text-[var(--text-strong)] dark:hover:bg-white/10"
              >
                H1
              </button>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => run('formatBlock', '<h2>')}
                className="rounded-lg px-2 py-1.5 text-[11px] font-bold text-muted transition hover:bg-ink-100 hover:text-[var(--text-strong)] dark:hover:bg-white/10"
              >
                H2
              </button>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => run('formatBlock', '<p>')}
                className="rounded-lg px-2 py-1.5 text-[11px] font-semibold text-muted transition hover:bg-ink-100 hover:text-[var(--text-strong)] dark:hover:bg-white/10"
              >
                Body
              </button>
              <Divider />
              <ToolButton label="Bold" onClick={() => run('bold')}>
                <Bold size={15} />
              </ToolButton>
              <ToolButton label="Italic" onClick={() => run('italic')}>
                <Italic size={15} />
              </ToolButton>
              <ToolButton label="Underline" onClick={() => run('underline')}>
                <Underline size={15} />
              </ToolButton>
              <label
                className="ml-1 grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-muted transition hover:bg-ink-100 dark:hover:bg-white/10"
                title="Text color"
              >
                <Palette size={15} />
                <input
                  type="color"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value)
                    run('foreColor', event.target.value)
                  }}
                  className="sr-only"
                  aria-label="Text color"
                />
              </label>
              <Divider />
              <ToolButton label="Align left" onClick={() => run('justifyLeft')}>
                <AlignLeft size={15} />
              </ToolButton>
              <ToolButton label="Align center" onClick={() => run('justifyCenter')}>
                <AlignCenter size={15} />
              </ToolButton>
              <ToolButton label="Align right" onClick={() => run('justifyRight')}>
                <AlignRight size={15} />
              </ToolButton>
              <Divider />
              <ToolButton label="Bulleted list" onClick={() => run('insertUnorderedList')}>
                <List size={15} />
              </ToolButton>
              <ToolButton label="Numbered list" onClick={() => run('insertOrderedList')}>
                <ListOrdered size={15} />
              </ToolButton>
              <Divider />
              <ToolButton label="Clear formatting" onClick={() => run('removeFormat')}>
                <Eraser size={15} />
              </ToolButton>
            </div>

            <div className="scrollbar-thin max-h-[620px] overflow-auto bg-ink-100/60 p-4 dark:bg-ink-950/40 sm:p-8">
              <div
                key={resetKey}
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={updateCount}
                onKeyUp={updateCount}
                onMouseUp={updateCount}
                role="textbox"
                aria-multiline="true"
                aria-label="Word document editor"
                className="word-page mx-auto min-h-[560px] max-w-[680px] rounded-sm bg-white px-8 py-10 text-[14px] leading-relaxed text-ink-900 shadow-lift outline-none sm:px-12"
              />
            </div>

            <div className="flex items-center gap-4 border-t hairline bg-ink-50/60 px-3 py-2 text-[11px] text-muted dark:bg-white/[0.03]">
              <span>{words} words</span>
              <span>Page 1 of 1</span>
              <span className="ml-auto hidden sm:inline">Select text, then use the toolbar</span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl border border-word-200/60 bg-word-50/50 p-3 text-xs leading-relaxed text-muted dark:border-word-500/20 dark:bg-word-500/5">
            <FileText size={14} className="mt-0.5 shrink-0 text-word-500" />
            <span>
              The lab uses your browser's editing commands, so some buttons behave differently from Word.
              Use it to practice the idea of selecting text and applying structure, then repeat the task in
              real Word for the full experience.
            </span>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="text-sm font-bold">Mini exercises</h2>
            <ol className="mt-2 space-y-2 text-xs text-muted">
              <li>1. Select the memo title and apply H1.</li>
              <li>2. Make the four header labels bold.</li>
              <li>3. Select the three action items and turn them into a numbered list.</li>
              <li>4. Center the title, then return the body to left alignment.</li>
              <li>5. Use the color button to make "Purpose" stand out.</li>
              <li>6. Clear formatting on one paragraph and rebuild it.</li>
            </ol>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-bold">Word habits to keep</h2>
            <ul className="mt-2 space-y-2 text-xs text-muted">
              <li>Use real headings, not just big bold text.</li>
              <li>Use paragraph spacing instead of repeated Enter presses.</li>
              <li>Keep alignment consistent across the document.</li>
              <li>Use numbered lists only when order matters.</li>
              <li>Save before exporting or printing.</li>
            </ul>
          </div>

          <Link to="/lesson/w2-1" className="card flex items-center gap-3 p-4 transition hover:shadow-lift">
            <ArrowLeft size={15} className="text-muted" />
            <div>
              <div className="text-sm font-semibold">Review formatting</div>
              <div className="text-[11px] text-muted">Lesson w2-1: Fonts and character formatting</div>
            </div>
          </Link>
        </aside>
      </div>
    </div>
  )
}
