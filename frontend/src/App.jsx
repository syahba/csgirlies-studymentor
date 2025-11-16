import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SetUpPage from './pages/SetUpPage.jsx'
import StudyPage from './pages/StudyPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import SummaryPage from './pages/SummaryPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/register" element={<RegisterPage></RegisterPage>} />
        <Route path="/session/setup" element={<SetUpPage></SetUpPage>} />
        <Route path="/session/:id" element={<StudyPage></StudyPage>} />
        <Route path="/session/:id/quiz/:quizId" element={<QuizPage></QuizPage>} />
        <Route path="/session/:id/summary" element={<SummaryPage></SummaryPage>} />
        <Route path="/error" element={<ErrorPage></ErrorPage>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
