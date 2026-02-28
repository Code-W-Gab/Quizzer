import { useState } from "react";
import Quizzes from "../../components/Quizzes/Folder/Quizzes";
import { getQuizFolder } from '../../services/quizService'
import { useEffect } from "react";
import Header from "../../components/Common/Header";

export default function QuizzesPage() {
  const [quizFolder, setQuizFolder] = useState([])
  
  function fetchQuizFolder() {
    getQuizFolder()
      .then(res => {
        setQuizFolder(res.data.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchQuizFolder()
  }, [])

  return(
    <div className="bg-gray-300 dark:bg-[#222222] min-h-screen px-14 py-3">
      <Header/>
      <div className="mt-8">
        <Quizzes quizFolder={quizFolder} fetchQuizFolder={fetchQuizFolder}/>
      </div>
    </div>
  )
}