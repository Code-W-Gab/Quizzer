import { Navigate, Route, Routes } from "react-router-dom"
import ExamPage from "./pages/Exam/ExamPage"
import QuizzesPage from "./pages/Quizzes/QuizzesPage"
import ShowQuizPage from "./pages/Quizzes/ShowQuizPage"
import ExamTimePage from "./pages/Exam/ExamTimePage"

export default function App() {
  return(
    <main>
      <Routes>
        <Route path="/" element={<Navigate to='/Exam'/>}/>
        {/* Exam Page */}
        <Route>
          <Route path="/Exam" element={<ExamPage/>}/>
          <Route path="/Exam/Start-Exam" element={<ExamTimePage/>}/>
        </Route>
        {/* Quizzes Page */}
        <Route>
          <Route path="/Quizzes" element={<QuizzesPage/>}/>
          <Route path="/Quizzes/:name/:id" element={<ShowQuizPage/>}/>
        </Route>
      </Routes>
    </main>
  )
}