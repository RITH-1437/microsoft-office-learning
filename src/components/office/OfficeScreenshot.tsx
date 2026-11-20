import { useEffect, useRef, useState } from 'react'
import { ImageOff, X, ZoomIn } from 'lucide-react'

export interface ScreenshotAnnotation {
  /** Position of the marker, in % of the image width/height. */
  x: number
  y: number
  label: string
  /** Optional box size in %, drawn around the marker. */
  w?: number
  h?: number
}

/**
 * A real reference screenshot (e.g. from public/office-assets/…) with numbered annotations
 * positioned in percentages so they stay aligned at any size. Images load lazily; a missing
 * file shows a clear fallback instead of a broken image.
 */
export default function OfficeScreenshot({
  src,
  alt,
  version = 'Microsoft 365 desktop (Windows)',
  annotations = [],
  caption,
  zoomable = true,
  width,
  height,
}: {
  src: string
  alt: string
  version?: string
  annotations?: ScreenshotAnnotation[]
  caption?: string
  zoomable?: boolean
  /** Intrinsic size, to reserve space before load (no layout shift). */
  width?: number
  height?: number
}) {
  const [failed, setFailed] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (zoomed && !dialog.open) dialog.showModal()
    if (!zoomed && dialog.open) dialog.close()
  }, [zoomed])

  const picture = (
    <div className="office-shot-frame">
      {failed ? (
        <div className="office-shot-missing" role="img" aria-label={alt}>
          <ImageOff size={20} aria-hidden="true" />
          <span>Screenshot not available: {src}</span>
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" decoding="async" width={width} height={height} onError={() => setFailed(true)} />
      )}
      {!failed &&
        annotations.map((a, i) => (
          <span
            key={i}
            className="office-shot-marker"
            style={{ left: `${a.x}%`, top: `${a.y}%`, width: a.w ? `${a.w}%` : undefined, height: a.h ? `${a.h}%` : undefined }}
            aria-hidden="true"
          >
            <span className="office-badge office-badge-static">{i + 1}</span>
          </span>
        ))}
    </div>
  )

  return (
    <figure className="office-figure">
      {picture}
      {annotations.length > 0 && (
        <ol className="office-shot-legend">
          {annotations.map((a, i) => (
            <li key={i}>
              <span className="office-badge office-badge-static" aria-hidden="true">{i + 1}</span> {a.label}
            </li>
          ))}
        </ol>
      )}
      <figcaption className="office-caption">
        {caption && <span className="office-caption-text">{caption}</span>}
        <span className="office-version">Screenshot: {version}. Microsoft product screenshot used with permission from Microsoft.</span>
        {zoomable && !failed && (
          <button type="button" className="btn-ghost office-zoom" onClick={() => setZoomed(true)}>
            <ZoomIn size={14} aria-hidden="true" /> Zoom
          </button>
        )}
      </figcaption>
      {zoomable && (
        <dialog ref={dialogRef} className="office-dialog" onClose={() => setZoomed(false)} aria-label={`${alt} (enlarged)`}>
          <div className="office-dialog-body">
            <div className="flex items-center justify-between gap-3 pb-3">
              <span className="text-sm font-semibold">{alt}</span>
              <button type="button" className="btn-secondary" onClick={() => setZoomed(false)}>
                <X size={14} aria-hidden="true" /> Close
              </button>
            </div>
            {zoomed && picture}
          </div>
        </dialog>
      )}
    </figure>
  )
}
