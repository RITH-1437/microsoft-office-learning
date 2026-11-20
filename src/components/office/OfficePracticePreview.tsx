import { CheckCircle2, Target } from 'lucide-react'
import type { WorkspaceState } from '../../types'
import type { OfficeApp } from '../icons/OfficeAppIcon'
import Workspace from './OfficeWorkspace'

/** "Your result should look like this" — the expected outcome of a practice task. */
export default function OfficePracticePreview({
  app,
  state,
  title = 'Expected result',
  checks = [],
  caption,
}: {
  app: OfficeApp
  state: WorkspaceState
  title?: string
  /** What to look for in the learner's own file. */
  checks?: string[]
  caption?: string
}) {
  const tone = app === 'word' ? 'office-tone-word' : 'office-tone-excel'
  return (
    <figure className="office-figure">
      <div className={`office-practice ${tone}`}>
        <div className="office-practice-head">
          <Target size={14} aria-hidden="true" />
          <span>{title}</span>
        </div>
        <div className="office-window office-window-plain">
          <div className="office-workspace">
            <Workspace app={app} state={state} />
          </div>
        </div>
        {checks.length > 0 && (
          <ul className="office-practice-checks">
            {checks.map((check) => (
              <li key={check}>
                <CheckCircle2 size={14} className="shrink-0 text-excel-600" aria-hidden="true" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {caption && <figcaption className="office-caption"><span className="office-caption-text">{caption}</span></figcaption>}
    </figure>
  )
}
