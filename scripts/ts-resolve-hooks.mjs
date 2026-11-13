// Module resolution hook: lets Node's built-in TypeScript type stripping (Node ≥ 22.18)
// load the app's data modules directly, by resolving extension-less relative imports
// (`./lessons/word` → `./lessons/word.ts`). Registered by register-ts.mjs.
import { access } from 'node:fs/promises'

const CANDIDATES = ['.ts', '.tsx', '/index.ts']
const HAS_EXTENSION = /\.[cm]?[jt]sx?$|\.json$|\.css$/

export async function resolve(specifier, context, nextResolve) {
  const relative = specifier.startsWith('./') || specifier.startsWith('../')
  if (relative && !HAS_EXTENSION.test(specifier) && context.parentURL) {
    for (const extension of CANDIDATES) {
      const candidate = new URL(specifier + extension, context.parentURL)
      try {
        await access(candidate)
        return nextResolve(candidate.href, context)
      } catch {
        // try the next candidate
      }
    }
  }
  return nextResolve(specifier, context)
}
