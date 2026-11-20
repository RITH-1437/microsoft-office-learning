import type { Question } from '../../../types'
import { excelAnalysisQuick } from './excel-analysis'
import { excelFormulasQuick } from './excel-formulas'
import { excelFoundationsQuick } from './excel-foundations'
import { wordFoundationsQuick } from './word-foundations'
import { wordProfessionalQuick } from './word-professional'

/** Lesson quick-quiz questions (referenced by `Lesson.quickQuiz`). One file per lesson module. */
export const quickQuizQuestions: Question[] = [
  ...wordFoundationsQuick,
  ...wordProfessionalQuick,
  ...excelFoundationsQuick,
  ...excelFormulasQuick,
  ...excelAnalysisQuick,
]
