import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Minus, Redo2, Search, Square, Undo2, X, ZoomIn } from 'lucide-react'
import type { WorkspaceState } from '../../types'
import OfficeAppIcon, { type OfficeApp } from '../icons/OfficeAppIcon'
import { OFFICE_APP_NAME } from '../icons/officeLogoPaths'
import { OFFICE_UI, describeRibbonPath, findRibbonTarget, type RibbonButton, type RibbonGroup } from '../../data/officeUi'
import { OFFICE_ICONS } from './officeIcons'
import Workspace, { PartBadge, type WorkspaceParts } from './OfficeWorkspace'
import RichText from '../RichText'

export interface OfficeInterfacePreviewProps {
  app: OfficeApp
  /** Ribbon tab to show (id from officeUi.ts). Defaults to 'home', or to the highlighted button's tab. */
  tab?: string
  /** Button id(s) to call out. */
  highlight?: string | string[]
  /** Document / sheet contents under the ribbon. */
  workspace?: WorkspaceState
  /** Ribbon only (no workspace) — for toolbar call-outs. */
  compact?: boolean
  /** Adds a Zoom button that opens the same diagram enlarged in a dialog. */
  zoomable?: boolean
  /** Learners may click the tabs to explore. Default true. */
  interactive?: boolean
  caption?: string
  className?: string
  /** Numbered anatomy markers (title bar, tabs, ribbon, group label, status bar + workspace parts). */
  parts?: ChromeParts & WorkspaceParts
}

export type ChromeParts = Partial<Record<'titlebar' | 'tabs' | 'ribbon' | 'group' | 'statusbar', number>>

/** Groups whose small buttons are icon-only in the real ribbon. */
const DENSE_GROUPS = new Set(['font', 'paragraph', 'alignment', 'number', 'paragraph-layout', 'formula-auditing', 'sort-filter-data', 'fields', 'sheet-options'])
/** Buttons drawn as combo boxes (text + arrow) rather than icons. */
const COMBO_BUTTONS = new Set(['font-name', 'font-size', 'number-format', 'scale-width', 'scale-height', 'scale', 'display-for-review', 'sheet-view', 'data-types'])

function StyleChip({ button }: { button: RibbonButton }) {
  const look: Record<string, string> = {
    'style-normal': 'font-normal',
    'style-no-spacing': 'font-normal',
    'style-heading-1': 'font-display text-[13px] font-bold text-word-700 dark:text-word-300',
    'style-heading-2': 'font-display text-[12px] font-semibold text-word-700 dark:text-word-300',
    'style-heading-3': 'font-display text-[11px] font-semibold text-word-700 dark:text-word-300',
    'style-title': 'font-display text-[14px] font-bold tracking-tight',
  }
  return <span className={`office-style-chip ${look[button.id] ?? ''}`}>{button.label}</span>
}

function RibbonButtonView({ button, group, highlighted, index }: { button: RibbonButton; group: RibbonGroup; highlighted: boolean; index?: number }) {
  const Icon = button.icon ? OFFICE_ICONS[button.icon] : undefined
  const combo = COMBO_BUTTONS.has(button.id)
  const dense = DENSE_GROUPS.has(group.id)
  const isStyle = group.id === 'styles' && button.id.startsWith('style')
  const classes = ['office-btn', button.large ? 'office-btn-large' : 'office-btn-small', highlighted ? 'is-target' : '', combo ? 'office-combo' : '']
  return (
    <span
      className={classes.join(' ')}
      data-button={button.id}
      title={button.shortcut ? `${button.label} (${button.shortcut})` : button.label}
      aria-label={button.label}
      role="img"
    >
      {highlighted && index !== undefined && <span className="office-badge" aria-hidden="true">{index}</span>}
      {isStyle ? (
        <StyleChip button={button} />
      ) : combo ? (
        <>
          <span className="office-combo-text">{button.label}</span>
          <ChevronDown size={10} aria-hidden="true" />
        </>
      ) : (
        <>
          {Icon ? <Icon size={button.large ? 20 : 14} aria-hidden="true" /> : <span className="office-dot" aria-hidden="true" />}
          {(button.large || !dense) && <span className="office-btn-label">{button.label}</span>}
          {button.menu && !button.large && dense && <ChevronDown size={8} className="office-menu-arrow" aria-hidden="true" />}
        </>
      )}
    </span>
  )
}

export default function OfficeInterfacePreview({
  app,
  tab,
  highlight,
  workspace,
  compact = false,
  zoomable = false,
  interactive = true,
  caption,
  className = '',
  parts,
}: OfficeInterfacePreviewProps) {
  const model = OFFICE_UI[app]
  const targets = (Array.isArray(highlight) ? highlight : highlight ? [highlight] : [])
    .map((id) => findRibbonTarget(app, id, tab))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
  const initialTab = targets[0]?.tab.id ?? tab ?? 'home'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [zoomed, setZoomed] = useState(false)
  const ribbonRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const uid = useId()

  // Follow prop changes (e.g. stepping through a tutorial) — derived-state pattern.
  const [trackedTab, setTrackedTab] = useState(initialTab)
  if (trackedTab !== initialTab) {
    setTrackedTab(initialTab)
    setActiveTab(initialTab)
  }

  // Keep the called-out button in view inside the horizontally scrollable ribbon.
  useEffect(() => {
    const ribbon = ribbonRef.current
    if (!ribbon || !targets.length) return
    const el = ribbon.querySelector<HTMLElement>(`[data-button="${targets[0].button.id}"]`)
    if (!el) return
    const left = el.offsetLeft - ribbon.clientWidth / 2 + el.offsetWidth / 2
    ribbon.scrollTo({ left: Math.max(0, left), behavior: 'auto' })
  }, [activeTab, targets])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (zoomed && !dialog.open) dialog.showModal()
    if (!zoomed && dialog.open) dialog.close()
  }, [zoomed])

  const current = model.tabs.find((t) => t.id === activeTab) ?? model.tabs[1]
  const highlightedIds = new Set(targets.map((t) => t.button.id))
  const tone = app === 'word' ? 'office-tone-word' : 'office-tone-excel'

  const diagram = (
    <div className={`office-window ${tone} ${parts ? 'office-has-parts' : ''}`}>
      <div className="office-titlebar">
        <PartBadge n={parts?.titlebar} />
        <OfficeAppIcon app={app} size={16} />
        <span className="office-autosave">AutoSave <span className="office-toggle" aria-hidden="true" /> Off</span>
        <span className="office-qat" aria-hidden="true">
          <OFFICE_ICONS.Save size={12} />
          <Undo2 size={12} />
          <Redo2 size={12} />
        </span>
        <span className="office-doc-title">{workspace?.title ?? model.documentTitle}</span>
        <span className="office-search" aria-hidden="true">
          <Search size={11} /> Search
        </span>
        <span className="office-window-controls" aria-hidden="true">
          <Minus size={11} />
          <Square size={9} />
          <X size={11} />
        </span>
      </div>

      <div className="office-tabs" role={interactive ? 'tablist' : undefined} aria-label={`${model.appName} ribbon tabs`}>
        <PartBadge n={parts?.tabs} />
        {model.tabs.map((t) => {
          const active = t.id === current.id
          const common = `office-tab ${active ? 'is-active' : ''} ${t.id === 'file' ? 'office-tab-file' : ''}`
          return interactive ? (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${uid}-ribbon`}
              className={common}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ) : (
            <span key={t.id} className={common}>{t.label}</span>
          )
        })}
      </div>

      <div id={`${uid}-ribbon`} ref={ribbonRef} className="office-ribbon" role={interactive ? 'tabpanel' : undefined} aria-label={`${current.label} tab`}>
        {current.groups.length === 0 ? (
          <div className="office-group office-group-note">{current.note ?? 'Not drawn in this diagram.'}</div>
        ) : (
          current.groups.map((group, groupIndex) => (
            <div key={group.id} className={`office-group ${DENSE_GROUPS.has(group.id) ? 'is-dense' : ''}`}>
              {groupIndex === 0 && <PartBadge n={parts?.ribbon} />}
              <div className="office-group-buttons">
                {group.buttons.map((button) => (
                  <RibbonButtonView
                    key={button.id}
                    button={button}
                    group={group}
                    highlighted={highlightedIds.has(button.id)}
                    index={targets.length > 1 ? targets.findIndex((t) => t.button.id === button.id) + 1 : undefined}
                  />
                ))}
              </div>
              <div className="office-group-label">
                {groupIndex === 1 && <PartBadge n={parts?.group} />}
                {group.label}
              </div>
            </div>
          ))
        )}
      </div>

      {!compact && (
        <div className="office-workspace">
          <Workspace app={app} state={workspace} parts={parts} />
        </div>
      )}

      <div className="office-statusbar" aria-hidden="true">
        <PartBadge n={parts?.statusbar} />
        {app === 'word' ? (
          <>
            <span>Page 1 of 1</span>
            <span>{(workspace?.kind === 'doc' ? workspace.lines.join(' ') : '').split(/\s+/).filter(Boolean).length} words</span>
            <span>English (United States)</span>
          </>
        ) : (
          <>
            <span>Ready</span>
            <span>Accessibility: Good to go</span>
          </>
        )}
        <span className="ml-auto">100%</span>
      </div>
    </div>
  )

  return (
    <figure className={`office-figure ${className}`}>
      {diagram}
      {targets.length > 0 && (
        <div className="office-callouts">
          {targets.map((t, i) => (
            <p key={t.button.id} className="office-callout">
              {targets.length > 1 && <span className="office-badge office-badge-static" aria-hidden="true">{i + 1}</span>}
              <strong>{describeRibbonPath(t)}</strong>
              {t.button.help && <span className="text-muted"> — {t.button.help}</span>}
            </p>
          ))}
        </div>
      )}
      <figcaption className="office-caption">
        {caption && <span className="office-caption-text"><RichText text={caption} /></span>}
        <span className="office-version">
          Diagram of {OFFICE_APP_NAME[app]} · {model.version}. Button order follows the real ribbon; exact icons and spacing differ slightly by screen size.
        </span>
        {zoomable && (
          <button type="button" className="btn-ghost office-zoom" onClick={() => setZoomed(true)}>
            <ZoomIn size={14} aria-hidden="true" /> Zoom
          </button>
        )}
      </figcaption>
      {zoomable && (
        <dialog ref={dialogRef} className="office-dialog" onClose={() => setZoomed(false)} aria-label={`${OFFICE_APP_NAME[app]} interface, enlarged`}>
          <div className="office-dialog-body">
            <div className="flex items-center justify-between gap-3 pb-3">
              <span className="text-sm font-semibold">{OFFICE_APP_NAME[app]} — {current.label} tab</span>
              <button type="button" className="btn-secondary" onClick={() => setZoomed(false)}>
                <X size={14} aria-hidden="true" /> Close
              </button>
            </div>
            {zoomed && (
              <OfficeInterfacePreview app={app} tab={activeTab} highlight={highlight} workspace={workspace} compact={compact} interactive={interactive} caption={caption} className="office-figure-zoomed" />
            )}
          </div>
        </dialog>
      )}
    </figure>
  )
}
