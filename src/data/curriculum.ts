import type { LearningPath, Lesson, Unit } from '../types'
import { wordLessons } from './lessons/word'
import { excelLessons } from './lessons/excel'

export const wordUnits: Unit[] = [
  {
    id: 'w1',
    pathId: 'word',
    number: 1,
    title: 'Word Foundations',
    description: 'Meet the application, understand the screen, and create your first properly saved document.',
    lessonIds: ['w1-1', 'w1-2', 'w1-3', 'w1-4'],
    quizId: 'wc1',
  },
  {
    id: 'w2',
    pathId: 'word',
    number: 2,
    title: 'Formatting Like a Professional',
    description: 'Control fonts, paragraphs, alignment, spacing, and lists so your documents look deliberate.',
    lessonIds: ['w2-1', 'w2-2', 'w2-3'],
    quizId: 'wc2',
  },
  {
    id: 'w3',
    pathId: 'word',
    number: 3,
    title: 'Pages, Tables and Visuals',
    description: 'Set up pages, build clean tables, add headers and footers, and place images with confidence.',
    lessonIds: ['w3-1', 'w3-2', 'w3-3', 'w3-4'],
    quizId: 'wc3',
  },
  {
    id: 'w4',
    pathId: 'word',
    number: 4,
    title: 'Professional Documents and Efficiency',
    description: 'Use styles, find and replace, mail merge, review tools, and produce print-ready office documents.',
    lessonIds: ['w4-1', 'w4-2', 'w4-3', 'w4-4', 'w4-5', 'w4-6'],
    quizId: 'wc4',
  },
]

export const excelUnits: Unit[] = [
  {
    id: 'e1',
    pathId: 'excel',
    number: 1,
    title: 'Excel Foundations',
    description: 'Learn the grid, the workbook model, and how to enter reliable data from day one.',
    lessonIds: ['e1-1', 'e1-2', 'e1-3', 'e1-4'],
    quizId: 'ec1',
  },
  {
    id: 'e2',
    pathId: 'excel',
    number: 2,
    title: 'Formatting and Presentation',
    description: 'Make spreadsheets readable, format numbers and dates, sort and filter, and use Excel Tables.',
    lessonIds: ['e2-1', 'e2-2', 'e2-3', 'e2-4'],
    quizId: 'ec2',
  },
  {
    id: 'e3',
    pathId: 'excel',
    number: 3,
    title: 'Formulas and Functions',
    description: 'From your first equals sign to IF, COUNTIF, SUMIF, absolute references, and lookups.',
    lessonIds: ['e3-1', 'e3-2', 'e3-3', 'e3-4', 'e3-5', 'e3-6', 'e3-7'],
    quizId: 'ec3',
  },
  {
    id: 'e4',
    pathId: 'excel',
    number: 4,
    title: 'Analysis, Reporting and Administration',
    description: 'Highlight what matters, control data entry, build charts and PivotTables, and print clean reports.',
    lessonIds: ['e4-1', 'e4-2', 'e4-3', 'e4-4', 'e4-5', 'e4-6'],
    quizId: 'ec4',
  },
]

export const paths: LearningPath[] = [
  {
    id: 'word',
    title: 'Microsoft Word',
    tagline: 'From a blank page to a polished administrative document pack.',
    description:
      'Start with your first click, then build memos, business letters, agendas, minutes, forms, and reports that look like they came from a professional office.',
    outcomes: [
      'Navigate Word without hunting for commands',
      'Format documents to a consistent office standard',
      'Build tables, headers, footers, and page numbers',
      'Use styles, mail merge, and review tools',
      'Produce print-ready and PDF documents',
    ],
    units: wordUnits,
  },
  {
    id: 'excel',
    title: 'Microsoft Excel',
    tagline: 'From your first cell to a working administrative workbook.',
    description:
      'Learn how spreadsheets think, then build attendance, leave, expense, inventory, and reporting sheets with formulas that update automatically.',
    outcomes: [
      'Enter, format, and organize reliable office data',
      'Write formulas with confidence, not guesswork',
      'Use SUM, AVERAGE, IF, COUNTIF, SUMIF, and lookups',
      'Sort, filter, validate, and visualize data',
      'Print and export professional reports as PDF',
    ],
    units: excelUnits,
  },
]

export const allLessons: Lesson[] = [...wordLessons, ...excelLessons]

export const lessonById = new Map<string, Lesson>(allLessons.map((lesson) => [lesson.id, lesson]))

export const allUnits: Unit[] = [...wordUnits, ...excelUnits]

export const unitById = new Map<string, Unit>(allUnits.map((unit) => [unit.id, unit]))

export function getLesson(id: string | undefined): Lesson | undefined {
  return id ? lessonById.get(id) : undefined
}

export function getPathLessons(pathId: LearningPath['id']): Lesson[] {
  return allLessons.filter((lesson) => lesson.pathId === pathId)
}

export function getUnitLessons(unit: Unit): Lesson[] {
  return unit.lessonIds.map((id) => lessonById.get(id)).filter((lesson): lesson is Lesson => Boolean(lesson))
}

export function getAdjacentLessons(lessonId: string): { previous?: Lesson; next?: Lesson } {
  const lesson = lessonById.get(lessonId)
  if (!lesson) return {}
  const pathLessons = getPathLessons(lesson.pathId)
  const index = pathLessons.findIndex((item) => item.id === lessonId)
  return {
    previous: index > 0 ? pathLessons[index - 1] : undefined,
    next: index >= 0 && index < pathLessons.length - 1 ? pathLessons[index + 1] : undefined,
  }
}

export function getPath(pathId: string): LearningPath | undefined {
  return paths.find((path) => path.id === pathId)
}

export function pathMinutes(pathId: LearningPath['id']): number {
  return getPathLessons(pathId).reduce((total, lesson) => total + lesson.duration, 0)
}

export function pathProgressPercent(pathId: LearningPath['id'], completed: Record<string, string>): number {
  const lessons = getPathLessons(pathId)
  if (lessons.length === 0) return 0
  const done = lessons.filter((lesson) => completed[lesson.id]).length
  return Math.round((done / lessons.length) * 100)
}
