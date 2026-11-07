import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PathsPage from './pages/PathsPage'
import PathDetailPage from './pages/PathDetailPage'
import LessonPage from './pages/LessonPage'
import QuizzesPage from './pages/QuizzesPage'
import QuizPage from './pages/QuizPage'
import PracticePage from './pages/PracticePage'
import PracticeDetailPage from './pages/PracticeDetailPage'
import LabsPage from './pages/LabsPage'
import WordLabPage from './pages/WordLabPage'
import ExcelLabPage from './pages/ExcelLabPage'
import ProgressPage from './pages/ProgressPage'
import ResourcesPage from './pages/ResourcesPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
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
  )
}
