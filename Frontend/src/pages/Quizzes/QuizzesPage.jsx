import { useState } from "react";
import Navigation from "../../components/Common/Navigation";
import Quizzes from "../../components/Quizzes/Folder/Quizzes";
import { getQuizFolder } from '../../services/quizService'
import { useEffect } from "react";

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
    <Navigation>
      <Quizzes quizFolder={quizFolder} fetchQuizFolder={fetchQuizFolder}/>
    </Navigation>
  )
}