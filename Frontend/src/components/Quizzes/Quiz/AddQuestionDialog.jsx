import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export default function AddQuestionDialog({onClose, onOpenShortText}) {
  const [questionType, setQuestionType] = useState("")
  const navigate = useNavigate()

  function handleAddQuestion() {
    if(questionType === "multiple-choice"){
      onClose()
      navigate("/Quizzes/Multiple-Choice")
    } else if(questionType === "short-text"){
      onOpenShortText()
    } else {
      onClose()
      navigate("/Quizzes/True-False")
    }
  }

  return(
    <div>
      <div className="bg-white w-80 px-4 py-6 rounded-md">
        <h1 className="text-xl mb-4">Question Type</h1>
        <div className="flex items-center gap-3 mb-3">
          <input 
            className="size-4" 
            type="radio" 
            name="q-type" 
            value={"multiple-choice"}
            onChange={(e) => setQuestionType(e.target.value)}
          />
          <label className="text-md">Multiple Choice</label>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <input 
            className="size-4" 
            type="radio" 
            name="q-type"
            value={"short-text"}
            onChange={(e) => setQuestionType(e.target.value)}
          />
          <label className="text-md">Short Text</label>
        </div>
        <div className="flex items-center gap-3">
          <input 
            className="size-4" 
            type="radio" 
            name="q-type"
            value={"true-false"}
            onChange={(e) => setQuestionType(e.target.value)}
          />
          <label className="text-md">True or False</label>
        </div>
        <div className="mt-6 mr-2 flex justify-end gap-4 text-md text-green-600">
          <button onClick={onClose}>Back</button>
          <button onClick={handleAddQuestion}>Save</button>
        </div>
      </div>
    </div>
  )
}