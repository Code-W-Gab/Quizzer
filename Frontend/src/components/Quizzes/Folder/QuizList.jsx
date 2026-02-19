import { Link } from "react-router-dom";

export default function QuizList({quizFolder}) {
  return(
    <div className="grid grid-cols-4 gap-5">
      {quizFolder.map((folder) => {
        return(
          <Link to={`/Quizzes/${folder.name}/${folder._id}`} key={folder._id} className="bg-white pl-4 py-4 rounded-md hover:bg-green-400 hover:text-white">
            <h1 className="text-xl font-semibold mb-1">{folder.name}</h1>
            <p className="text-sm ">50 questions</p>
          </Link>
        )
      })}
    </div>
  )
}