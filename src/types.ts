export type PathId = 'word' | 'excel'
export type Difficulty = 'Beginner' | 'Intermediate'

export type Visual =
  | {
      kind: 'table'
      title: string
      caption?: string
      headers: string[]
      rows: string[][]
    }
  | {
      kind: 'formula'
      title: string
      caption?: string
      formula: string
      result: string
      note?: string
    }
  | {
      kind: 'mockup'
      variant: 'word' | 'excel'
      title: string
      caption?: string
      lines: string[]
    }
  | {
      kind: 'compare'
      title: string
      caption?: string
      left: { label: string; points: string[] }
      right: { label: string; points: string[] }
    }
  | {
      kind: 'chart'
      title: string
      caption?: string
      data: { label: string; value: number }[]
      unit?: string
    }

/** Which part of the real Office interface a tutorial step points at (rendered by OfficeStepGuide). */
export interface UiReference {
  /** Defaults to the lesson's app. */
  app?: 'word' | 'excel'
  /** Ribbon tab id from src/data/officeUi.ts (e.g. 'home', 'insert'). */
  tab?: string
  /** Ribbon button id from src/data/officeUi.ts (e.g. 'bold'); must belong to `tab` when both are given. */
  target?: string
  /** What the document / sheet area should show for this step. */
  workspace?: WorkspaceState
  /** Short caption under the preview, e.g. "The selected text turns bold." */
  caption?: string
}

export type WorkspaceState =
  | { kind: 'doc'; lines: string[]; selection?: string }
  | { kind: 'sheet'; cells: string[][]; selected?: string; formula?: string }

export interface TutorialStep {
  instruction: string
  detail?: string
  shortcut?: string
  ui?: UiReference
}

export interface Tutorial {
  title: string
  intro?: string
  steps: TutorialStep[]
  result: string
}

export interface PracticeBlock {
  title: string
  goal: string
  steps: string[]
  hint?: string
  expected: string[]
}

export interface ExampleBox {
  title: string
  scenario: string
  takeaway: string
}

export interface Term {
  term: string
  definition: string
}

export interface Lesson {
  id: string
  pathId: PathId
  unitId: string
  title: string
  subtitle: string
  duration: number
  difficulty: Difficulty
  objectives: string[]
  why: string
  explain: string[]
  terms?: Term[]
  tutorials: Tutorial[]
  visual: Visual
  example: ExampleBox
  guided: PracticeBlock
  independent: PracticeBlock
  knowledgeCheck: string
  /** Extra quick-quiz question ids shown after the knowledge check (2–3 questions per lesson). */
  quickQuiz?: string[]
  summary: string[]
  nextTeaser?: string
}

export interface Unit {
  id: string
  pathId: PathId
  number: number
  title: string
  description: string
  lessonIds: string[]
  quizId: string
}

export interface LearningPath {
  id: PathId
  title: string
  tagline: string
  description: string
  outcomes: string[]
  units: Unit[]
}

export type QuestionType = 'mcq' | 'tf'

export interface Question {
  id: string
  type: QuestionType
  prompt: string
  options: string[]
  answer: number
  explanation: string
  lessonId?: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  pathId: PathId
  kind: 'checkpoint' | 'final'
  unitId?: string
  passScore: number
  questions: Question[]
}

export interface StarterFile {
  filename: string
  kind: 'csv' | 'rtf' | 'txt'
  content: string
}

export interface Exercise {
  id: string
  pathId: PathId
  scenario: 'word' | 'excel' | 'admin'
  title: string
  subtitle: string
  difficulty: Difficulty
  duration: number
  overview: string
  objectives: string[]
  setup: string[]
  steps: string[]
  hints: string[]
  criteria: string[]
  deliverable: string
  starter?: StarterFile
  lab?: 'word' | 'excel'
}

export interface QuizAttempt {
  attempts: number
  bestScore: number
  bestTotal: number
  lastScore: number
  lastTotal: number
  lastAt: string
}

export interface Shortcut {
  keys: string
  mac?: string
  action: string
  app: 'Word' | 'Excel' | 'Both'
  category: string
}

export interface GlossaryEntry {
  term: string
  definition: string
  app: 'Word' | 'Excel' | 'Both'
}

export interface FaqItem {
  question: string
  answer: string
}
