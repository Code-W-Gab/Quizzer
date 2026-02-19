import { Navigate, Route, Routes } from "react-router-dom"
import ExamPage from "./pages/Exam/ExamPage"
import QuizzesPage from "./pages/Quizzes/QuizzesPage"
import ShowQuizPage from "./pages/Quizzes/ShowQuizPage"

export default function App() {
  return(
    <main>
      <Routes>
        <Route path="/" element={<Navigate to='/Exam'/>}/>
        <Route path="/Exam" element={<ExamPage/>}/>
        <Route path="/Quizzes" element={<QuizzesPage/>}/>
        <Route path="/Quizzes/:id" element={<ShowQuizPage/>}/>
      </Routes>
    </main>
  )
}