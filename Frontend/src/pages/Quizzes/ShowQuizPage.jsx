import { useParams } from "react-router-dom";
import { getAllQuizByFolder } from '../../services/quizService'
import { useState, useEffect } from "react";

import QuestionList from "../../components/Quizzes/Quiz/QuestionList";

export default function ShowQuizPage() {
  const { id } = useParams();
  const [questionFolder, setQuestionFolder] = useState([])

  function fetchGetAllQuestionByFolder() {
    getAllQuizByFolder(id)
      .then(res => {
        setQuestionFolder(res.data.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchGetAllQuestionByFolder()
  }, []);

  return(
    <QuestionList questionFolder={questionFolder}/>
  )
}