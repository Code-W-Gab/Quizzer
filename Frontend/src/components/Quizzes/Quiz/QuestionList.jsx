import AddQuestionFolder from "./AddQuestionFolder";
import { useParams } from "react-router-dom";
import Header from "./Header";

export default function QuestionList({questionFolder}) {
  const { name } = useParams()

  return(
    <div>
      <Header name={name} to={"/Quizzes"}/>
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