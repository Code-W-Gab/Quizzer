import { useEffect, useState } from "react";
import Header from "../../components/Common/Header";
import MobileHeader from "../../components/Common/MobileHeader";
import Quizzes from "../../components/Quizzes/Folder/Quizzes";
import { getQuizFolder } from '../../services/quizService';

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
    <div className="bg-white dark:bg-[#222222] min-h-screen md:px-10 lg:px-12 xl:px-14 md:py-4">
      <div className="hidden md:block">
        <Header/>
      </div>
      <div className="md:hidden">
        <MobileHeader/>
      </div>
      <div className="mt-4">
        <Quizzes quizFolder={quizFolder} fetchQuizFolder={fetchQuizFolder}/>
      </div>
    </div>
  )
}