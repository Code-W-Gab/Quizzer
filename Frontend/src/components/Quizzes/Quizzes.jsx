import AddQuiz from "./AddQuiz";
import QuizList from "./QuizList";

export default function Quizzes() {
  return(
    <div className="h-full bg-gray-300 p-5">
      <div>
        <AddQuiz/>
      </div>
      <div className="mt-8">
        <QuizList/>
      </div>
    </div>
  )
}