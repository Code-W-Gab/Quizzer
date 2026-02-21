import ExamList from "./ExamList";
import StartExam from "./StartExam";

export default function Exam({quizFolder}) {
  return(
    <div className="h-full bg-gray-300 p-5">
      <div>
        <StartExam/>
      </div>
      <div className="mt-8">
        <ExamList quizFolder={quizFolder}/>
      </div>
    </div>
  )
}