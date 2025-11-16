import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SetUpPage from './pages/SetUpPage.jsx'
import StudyPage from './pages/StudyPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import SummaryPage from './pages/SummaryPage.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hydrateUser } from './redux/slices/userSlice.js'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch(hydrateUser(parsed));
      }
    } catch (e) {
      console.warn("Failed to hydrate user from localStorage", e);
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/register" element={<RegisterPage></RegisterPage>} />
        <Route path="/session/setup" element={<SetUpPage></SetUpPage>} />
        <Route path="/session/:id" element={<StudyPage></StudyPage>} />
        <Route path="/session/:id/quiz/:quizId" element={<QuizPage></QuizPage>} />
        <Route path="/session/:id/summary" element={<SummaryPage></SummaryPage>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
