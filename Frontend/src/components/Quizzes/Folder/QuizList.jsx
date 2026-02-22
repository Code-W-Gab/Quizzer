import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllQuizByFolder } from "../../../services/quizService";

export default function QuizList({quizFolder}) {
  const [questionCounts, setQuestionCounts] = useState({})

  useEffect(() => {
    // Fetch question counts for all folders
    const fetchQuestionCounts = async () => {
      const counts = {}
      
      for (const folder of quizFolder) {
        try {
          const response = await getAllQuizByFolder(folder._id)
          counts[folder._id] = response.data.data.length
        } catch (error) {
          console.log(error)
          counts[folder._id] = 0
        }
      }
      
      setQuestionCounts(counts)
    }

    if (quizFolder.length > 0) {
      fetchQuestionCounts()
    }
  }, [quizFolder])

  return(
    <div className="grid grid-cols-4 gap-5">
      {quizFolder.map((folder) => {
        const questionCount = questionCounts[folder._id] || 0
        
        return(
          <Link to={`/Quizzes/${folder.name}/${folder._id}`} key={folder._id} className="bg-white pl-4 py-4 rounded-md hover:bg-green-400 hover:text-white">
            <h1 className="text-xl font-semibold mb-1 break-all">{folder.name}</h1>
            <p className="text-sm">{questionCount} {questionCount === 1 ? 'question' : 'questions'}</p>
          </Link>
        )
      })}
    </div>
  )
}