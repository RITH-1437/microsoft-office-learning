import { ArrowRight } from 'lucide-react'
import type { WorkspaceState } from '../../types'
import type { OfficeApp } from '../icons/OfficeAppIcon'
import Workspace from './OfficeWorkspace'

/** Before / after view of a document or sheet, e.g. plain text → formatted letter. */
export default function OfficeComparison({
  app,
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
}: {
  app: OfficeApp
  before: WorkspaceState
  after: WorkspaceState
  beforeLabel?: string
  afterLabel?: string
  caption?: string
}) {
  const tone = app === 'word' ? 'office-tone-word' : 'office-tone-excel'
  return (
    <figure className="office-figure">
      <div className={`office-compare ${tone}`}>
        <div className="office-compare-pane">
          <div className="office-compare-label">{beforeLabel}</div>
          <div className="office-window office-window-plain">
            <div className="office-workspace">
              <Workspace app={app} state={before} />
            </div>
          </div>
        </div>
        <div className="office-compare-arrow" aria-hidden="true">
          <ArrowRight size={18} />
        </div>
        <div className="office-compare-pane">
          <div className="office-compare-label is-after">{afterLabel}</div>
          <div className="office-window office-window-plain">
            <div className="office-workspace">
              <Workspace app={app} state={after} />
            </div>
          </div>
        </div>
      </div>
      {caption && <figcaption className="office-caption"><span className="office-caption-text">{caption}</span></figcaption>}
    </figure>
  )
}
