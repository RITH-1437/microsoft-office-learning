import type { ReactNode } from 'react'

/**
 * Minimal inline markup for lesson content (plain strings in src/data):
 *   **Bold**   → highlighted button / command name
 *   `=SUM(A1:A3)` → formula, cell reference or keyboard text in a code chip
 * Everything else renders as plain text (no HTML is ever interpreted).
 */
export default function RichText({ text, className }: { text: string; className?: string }) {
  const parts: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let last = 0
  let key = 0
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    const token = match[0]
    if (token.startsWith('**')) {
      parts.push(
        <strong key={key++} className="ui-term">
          {token.slice(2, -2)}
        </strong>,
      )
    } else {
      parts.push(
        <code key={key++} className="code-chip">
          {token.slice(1, -1)}
        </code>,
      )
    }
    last = index + token.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return className ? <span className={className}>{parts}</span> : <>{parts}</>
}
