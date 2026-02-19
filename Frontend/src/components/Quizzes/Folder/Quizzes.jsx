import AddFolder from "./AddFolder";
import QuizList from "./QuizList";

export default function Quizzes({ quizFolder, fetchQuizFolder }) {
  return(
    <div className="h-full bg-gray-300 p-5">
      <div>
        <AddFolder fetchQuizFolder={fetchQuizFolder}/>
      </div>
      <div className="mt-8">
        <QuizList quizFolder={quizFolder}/>
      </div>
    </div>
  )
}