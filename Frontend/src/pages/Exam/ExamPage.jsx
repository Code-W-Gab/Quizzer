import Header from "../../components/Common/Header";
import MobileHeader from "../../components/Common/MobileHeader";
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
    <div className="bg-white dark:bg-[#222222] min-h-screen md:px-10 lg:px-12 xl:px-14 md:py-4">
      <div className="hidden md:block">
        <Header/>
      </div>
      <div className="md:hidden">
        <MobileHeader/>
      </div>
      <div className="mt-8">
        <Exam quizFolder={quizFolder}/>
      </div>
    </div>
  )
}