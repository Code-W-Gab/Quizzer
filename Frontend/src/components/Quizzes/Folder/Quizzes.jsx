import AddFolder from "./AddFolder";
import QuizList from "./QuizList";

export default function Quizzes({ quizFolder, fetchQuizFolder }) {
  return(
    <div className="relative">
      <div>
        <AddFolder fetchQuizFolder={fetchQuizFolder}/>
      </div>
      <div className="mt-4 md:mt-8">
        <QuizList quizFolder={quizFolder} fetchQuizFolder={fetchQuizFolder}/>
      </div>
    </div>
  )
}