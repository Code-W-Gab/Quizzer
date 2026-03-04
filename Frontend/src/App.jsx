import { Navigate, Route, Routes } from "react-router-dom"
import ExamPage from "./pages/Exam/ExamPage"
import QuizzesPage from "./pages/Quizzes/QuizzesPage"
import ShowQuizPage from "./pages/Quizzes/ShowQuizPage"
import ExamTimePage from "./pages/Exam/ExamTimePage"
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"

export default function App() {
  return(
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Routes>
          <Route path="/" element={<Navigate to={"/Auth/Login"}/>}/>
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
        {/* Auth Page */}
        <Route>
          <Route path="/Auth/Login" element={<LoginPage/>}/>
          <Route path="/Auth/Registration" element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </main>
  )
}