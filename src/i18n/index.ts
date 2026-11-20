import { useCallback } from 'react'
import { useProgress } from '../store/progress'
import { en, type MessageKey, type Messages } from './en'
import { km } from './km'

export type Locale = 'en' | 'km'
export type { MessageKey }
export type TranslateVars = Record<string, string | number>
export type Translate = (key: MessageKey, vars?: TranslateVars) => string

export const LOCALES: { id: Locale; label: string; short: string; htmlLang: string }[] = [
  { id: 'en', label: 'English', short: 'EN', htmlLang: 'en' },
  { id: 'km', label: 'ខ្មែរ', short: 'ខ្មែរ', htmlLang: 'km' },
]

const dictionaries: Record<Locale, Messages> = { en, km }

export const isLocale = (value: unknown): value is Locale => value === 'en' || value === 'km'

/** Pure lookup with `{name}` interpolation. Falls back to English, then to the key itself. */
export function translate(locale: Locale, key: MessageKey, vars?: TranslateVars): string {
  const template = dictionaries[locale][key] ?? en[key] ?? key
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  )
}

export function useLocale(): Locale {
  return useProgress((state) => state.locale)
}

/** `t(key, vars)` bound to the current UI language; re-renders when the language changes. */
export function useT(): Translate {
  const locale = useLocale()
  return useCallback<Translate>((key, vars) => translate(locale, key, vars), [locale])
}

/** Picks the `.one` / `.other` variant of a key based on `n`. */
export function pluralKey(base: string, n: number): MessageKey {
  return `${base}.${n === 1 ? 'one' : 'other'}` as MessageKey
}

export function formatMinutesFor(t: Translate, minutes: number): string {
  if (minutes < 60) return t('common.min', { n: minutes })
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? t('common.hr', { n: hours }) : t('common.hrMin', { h: hours, m: rest })
}

export function greetingKey(now: Date = new Date()): MessageKey {
  const hour = now.getHours()
  if (hour < 5) return 'greet.late'
  if (hour < 12) return 'greet.morning'
  if (hour < 18) return 'greet.afternoon'
  return 'greet.evening'
}

export function formatDateFor(locale: Locale, iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  try {
    return date.toLocaleDateString(locale === 'km' ? 'km-KH' : undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return date.toISOString().slice(0, 10)
  }
}
