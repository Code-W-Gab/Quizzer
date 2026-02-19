import AddQuiz from "./AddQuiz";
import QuizList from "./QuizList";

export default function Quizzes({ quizFolder, fetchQuizFolder }) {
  return(
    <div className="h-full bg-gray-300 p-5">
      <div>
        <AddQuiz fetchQuizFolder={fetchQuizFolder}/>
      </div>
      <div className="mt-8">
        <QuizList quizFolder={quizFolder}/>
      </div>
    </div>
  )
}