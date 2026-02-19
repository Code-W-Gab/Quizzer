import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AddQuestionFolder from "./AddQuestionFolder";

export default function QuestionList({questionFolder}) {
  return(
    <div>
      <div className="flex items-center gap-4 bg-green-500 py-3 px-6">
        <Link to={"/Quizzes"}>
          <ArrowLeft />
        </Link>
        <h1 className="text-lg font-semibold">Demo Quiz</h1>
      </div>
      <div className="px-6 py-3">
        <AddQuestionFolder/>
        <div className="grid grid-cols-5 gap-5 mt-6">
          {questionFolder.map((folder) => {
            return(
              <div key={folder._id} className="bg-gray-200 px-4 py-2 rounded-md">
                <p>{folder.questionText}</p>
                <p className="text-green-500">{folder.correctAnswer}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}