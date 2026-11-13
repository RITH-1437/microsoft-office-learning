import type { CSSProperties } from 'react'
import { EXCEL_LOGO_PATH, OFFICE_LOGO_VIEWBOX, WORD_LOGO_PATH } from './officeLogoPaths'

export type OfficeApp = 'word' | 'excel'
export type OfficeIconVariant = 'tile' | 'glyph'

export interface OfficeAppIconProps {
  app: OfficeApp
  /** Rendered size in px (tile edge or glyph height). */
  size?: number
  /**
   * `tile`: white glyph on the app's brand-colour rounded square (course cards, headings,
   * dashboard). `glyph`: the bare logo in `currentColor` (chips, buttons, inline labels).
   */
  variant?: OfficeIconVariant
  /** Accessible name. Omit when the icon is decorative next to visible text. */
  title?: string
  /** Gentle floating motion (desktop + motion allowed only); for hero compositions. */
  float?: boolean
  className?: string
  style?: CSSProperties
}

export const OFFICE_APP_NAME: Record<OfficeApp, string> = {
  word: 'Microsoft Word',
  excel: 'Microsoft Excel',
}

const PATHS: Record<OfficeApp, string> = { word: WORD_LOGO_PATH, excel: EXCEL_LOGO_PATH }

/** Proportion of the tile the glyph occupies (matches Microsoft's app-tile spacing). */
const GLYPH_RATIO = 0.62

/**
 * Microsoft Word / Excel application icon built from the official MDL2 branded glyphs
 * (see officeLogoPaths.ts for provenance and licence). One component, one SVG path per
 * app — no duplicated markup anywhere else in the codebase.
 */
export default function OfficeAppIcon({
  app,
  size = 24,
  variant = 'tile',
  title,
  float = false,
  className = '',
  style,
}: OfficeAppIconProps) {
  const a11y = title ? ({ role: 'img', 'aria-label': title } as const) : ({ 'aria-hidden': true } as const)

  if (variant === 'glyph') {
    return (
      <svg
        viewBox={OFFICE_LOGO_VIEWBOX}
        width={size}
        height={size}
        fill="currentColor"
        className={`office-glyph shrink-0 ${className}`}
        style={style}
        focusable="false"
        {...a11y}
      >
        <path d={PATHS[app]} />
      </svg>
    )
  }

  const glyph = Math.round(size * GLYPH_RATIO)
  return (
    <span
      className={`app-tile app-tile-${app} ${float ? 'float-slow' : ''} ${className}`}
      style={{ width: size, height: size, ...style }}
      {...a11y}
    >
      <svg viewBox={OFFICE_LOGO_VIEWBOX} width={glyph} height={glyph} fill="currentColor" focusable="false" aria-hidden="true">
        <path d={PATHS[app]} />
      </svg>
    </span>
  )
}

export function WordIcon(props: Omit<OfficeAppIconProps, 'app'>) {
  return <OfficeAppIcon app="word" {...props} />
}

export function ExcelIcon(props: Omit<OfficeAppIconProps, 'app'>) {
  return <OfficeAppIcon app="excel" {...props} />
}
