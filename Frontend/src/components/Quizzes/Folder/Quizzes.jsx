import AddFolder from "./AddFolder";
import QuizList from "./QuizList";

export default function Quizzes({ quizFolder, fetchQuizFolder }) {
  return(
    <div>
      <div>
        <AddFolder fetchQuizFolder={fetchQuizFolder}/>
      </div>
      <div className="mt-8">
        <QuizList quizFolder={quizFolder} fetchQuizFolder={fetchQuizFolder}/>
      </div>
    </div>
  )
}