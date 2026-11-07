import type { Question, Quiz } from '../../types'
import { lessonChecks } from './lessonChecks'
import { quizzes } from './quizzes'

export { lessonChecks, quizzes }

export const allQuestions: Question[] = [
  ...lessonChecks,
  ...quizzes.flatMap((quiz) => quiz.questions),
]

export const questionById = new Map<string, Question>(allQuestions.map((question) => [question.id, question]))

export const quizById = new Map<string, Quiz>(quizzes.map((quiz) => [quiz.id, quiz]))

export function getQuestion(id: string): Question | undefined {
  return questionById.get(id)
}

export function getQuiz(id: string | undefined): Quiz | undefined {
  return id ? quizById.get(id) : undefined
}

export function quizzesForPath(pathId: Quiz['pathId']): Quiz[] {
  return quizzes.filter((quiz) => quiz.pathId === pathId)
}

export function quizQuestionCount(): number {
  return quizzes.reduce((total, quiz) => total + quiz.questions.length, 0)
}
