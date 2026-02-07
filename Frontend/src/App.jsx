import { Navigate, Route, Routes } from "react-router-dom"
import ExamPage from "./pages/Exam/ExamPage"
import QuizzesPage from "./pages/Quizzes/QuizzesPage"

export default function App() {
  return(
    <main>
      <Routes>
        <Route path="/" element={<Navigate to='/Exam'/>}/>
        <Route path="/Exam" element={<ExamPage/>}/>
        <Route path="/Quizzes" element={<QuizzesPage/>}/>
      </Routes>
    </main>
  )
}