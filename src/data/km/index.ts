import type { KmContent } from './types'
import { pathsKm, unitsKm } from './curriculum'
import { w1Km } from './lessons/w1'
import { w2Km } from './lessons/w2'
import { w3Km } from './lessons/w3'
import { w4Km } from './lessons/w4'
import { e1Km } from './lessons/e1'
import { e2Km } from './lessons/e2'
import { e3Km } from './lessons/e3'
import { e4Km } from './lessons/e4'
import { quizQuestionsKm, quizzesKm } from './questions/quizzes'
import { lessonChecksKm } from './questions/lessonChecks'
import { exercisesKm } from './exercises'
import { resourcesKm } from './resources'

/**
 * All Khmer content. Loaded lazily (dynamic import in src/i18n/content.ts), so English
 * learners never download it. Validate with `npm run check:i18n`.
 */
export const kmContent: KmContent = {
  lessons: { ...w1Km, ...w2Km, ...w3Km, ...w4Km, ...e1Km, ...e2Km, ...e3Km, ...e4Km },
  questions: { ...lessonChecksKm, ...quizQuestionsKm },
  quizzes: quizzesKm,
  exercises: exercisesKm,
  units: unitsKm,
  paths: pathsKm,
  resources: resourcesKm,
}
