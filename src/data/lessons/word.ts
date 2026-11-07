import type { Lesson } from '../../types'
import { wordFoundations } from './word-foundations'
import { wordProfessional } from './word-professional'

export const wordLessons: Lesson[] = [...wordFoundations, ...wordProfessional]
