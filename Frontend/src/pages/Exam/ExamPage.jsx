import Navigation from "../../components/Common/Navigation";
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
    <Navigation>
      <Exam quizFolder={quizFolder}/>
    </Navigation>
  )
}