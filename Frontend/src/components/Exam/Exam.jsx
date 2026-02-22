import ExamList from "./ExamList";
import StartExam from "./StartExam";
import { useState } from "react";

export default function Exam({quizFolder}) {
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);

  const handleCheckboxChange = (folderId) => {
    setSelectedQuizzes(prev => 
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };
  
  return(
    <div className="h-full bg-gray-300 p-5">
      <div>
        <StartExam selectedQuizzes={selectedQuizzes}/>
      </div>
      <div className="mt-8">
        <ExamList quizFolder={quizFolder} selectedQuizzes={selectedQuizzes} handleCheckboxChange={handleCheckboxChange}/>
      </div>
    </div>
  )
}