const dayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

/**
 * Learning streak derived from timestamps already stored in progress
 * (lesson/exercise completion dates, quiz attempt dates). No extra state is persisted.
 * A streak is the number of consecutive local days with activity, ending today or
 * yesterday (so it is not lost until a full day has been missed).
 */
export function computeStreak(isoDates: string[], now: Date = new Date()): { current: number; activeToday: boolean } {
  const days = new Set<string>()
  for (const iso of isoDates) {
    const date = new Date(iso)
    if (!Number.isNaN(date.getTime())) days.add(dayKey(date))
  }
  if (days.size === 0) return { current: 0, activeToday: false }

  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const activeToday = days.has(dayKey(cursor))
  if (!activeToday) cursor.setDate(cursor.getDate() - 1)

  let current = 0
  while (days.has(dayKey(cursor))) {
    current += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return { current, activeToday }
}

export function greeting(now: Date = new Date()): string {
  const hour = now.getHours()
  if (hour < 5) return 'Working late'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}
