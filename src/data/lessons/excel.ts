import type { Lesson } from '../../types'
import { excelFoundations } from './excel-foundations'
import { excelFormulas } from './excel-formulas'
import { excelAnalysis } from './excel-analysis'

export const excelLessons: Lesson[] = [...excelFoundations, ...excelFormulas, ...excelAnalysis]
