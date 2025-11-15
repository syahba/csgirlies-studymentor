import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/register" element={<RegisterPage></RegisterPage>} />
        <Route path="/session/setup" element={<SetUpPage></SetUpPage>} />
        <Route path="/session/:id" element={<StudyPage></StudyPage>} />
        <Route path="/session/:id/quiz/:quizId" element={<QuizPage></QuizPage>} />
        <Route path="/error" element={<ErrorPage></ErrorPage>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
