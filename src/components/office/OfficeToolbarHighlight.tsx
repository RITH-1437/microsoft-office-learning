import type { OfficeApp } from '../icons/OfficeAppIcon'
import OfficeInterfacePreview from './OfficeInterfacePreview'

/**
 * Ribbon-only call-out of one (or several) toolbar buttons, e.g. "Home → Font → Bold".
 * The path sentence is rendered by OfficeInterfacePreview from officeUi.ts.
 */
export default function OfficeToolbarHighlight({
  app,
  target,
  tab,
  caption,
  className,
}: {
  app: OfficeApp
  target: string | string[]
  tab?: string
  caption?: string
  className?: string
}) {
  return <OfficeInterfacePreview app={app} tab={tab} highlight={target} caption={caption} compact zoomable className={className} />
}
