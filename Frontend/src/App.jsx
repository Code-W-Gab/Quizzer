import { Navigate, Route, Routes } from "react-router-dom"
import ExamPage from "./pages/Exam/ExamPage"
import QuizzesPage from "./pages/Quizzes/QuizzesPage"
import ShowQuizPage from "./pages/Quizzes/ShowQuizPage"
import ExamTimePage from "./pages/Exam/ExamTimePage"
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import PrivateRoute from "./components/Common/PrivateRoute"

export default function App() {
  return(
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Routes>
          <Route path="/" element={<Navigate to={"/Auth/Login"}/>}/>
        {/* Exam Page */}
        <Route>
          <Route path="/Exam" element={
            <PrivateRoute>
              <ExamPage/>
            </PrivateRoute>
          }/>
          <Route path="/Exam/Start-Exam" element={
            <PrivateRoute>
              <ExamTimePage/>
            </PrivateRoute>
          }/>
        </Route>
        {/* Quizzes Page */}
        <Route>
          <Route path="/Quizzes" element={
            <PrivateRoute>
              <QuizzesPage/>
            </PrivateRoute>
          }/>
          <Route path="/Quizzes/:name/:id" element={
            <PrivateRoute>
              <ShowQuizPage/>
            </PrivateRoute>
          }/>
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