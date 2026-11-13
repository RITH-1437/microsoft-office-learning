import { lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import MotionProvider from './components/motion/MotionProvider'
import HomePage from './pages/HomePage'

// Route-level code splitting: only the home page ships in the entry chunk.
const PathsPage = lazy(() => import('./pages/PathsPage'))
const PathDetailPage = lazy(() => import('./pages/PathDetailPage'))
const LessonPage = lazy(() => import('./pages/LessonPage'))
const QuizzesPage = lazy(() => import('./pages/QuizzesPage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const PracticeDetailPage = lazy(() => import('./pages/PracticeDetailPage'))
const LabsPage = lazy(() => import('./pages/LabsPage'))
const WordLabPage = lazy(() => import('./pages/WordLabPage'))
const ExcelLabPage = lazy(() => import('./pages/ExcelLabPage'))
const ProgressPage = lazy(() => import('./pages/ProgressPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <MotionProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="paths" element={<PathsPage />} />
            <Route path="paths/:pathId" element={<PathDetailPage />} />
            <Route path="lesson/:lessonId" element={<LessonPage />} />
            <Route path="quizzes" element={<QuizzesPage />} />
            <Route path="quizzes/:quizId" element={<QuizPage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="practice/:exerciseId" element={<PracticeDetailPage />} />
            <Route path="labs" element={<LabsPage />} />
            <Route path="labs/word" element={<WordLabPage />} />
            <Route path="labs/excel" element={<ExcelLabPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </MotionProvider>
  )
}
