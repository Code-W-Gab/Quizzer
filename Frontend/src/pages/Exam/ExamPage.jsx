import Header from "../../components/Common/Header";
import Exam from "../../components/Exam/Exam";
import { getQuizFolder } from "../../services/quizService";
import { useState, useEffect } from "react";

export default function ExamPage() {
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
        <Exam quizFolder={quizFolder}/>
      </div>
    </div>
  )
}