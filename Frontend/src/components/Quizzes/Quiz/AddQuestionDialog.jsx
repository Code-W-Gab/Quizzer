import { useState } from "react"

export default function AddQuestionDialog({onClose, onOpenShortText, onOpenMultipleChoice, onOpenTrueFalse}) {
  const [questionType, setQuestionType] = useState("")

  function handleAddQuestion() {
    if(questionType === "multiple-choice"){
      onClose()
      onOpenMultipleChoice()
    } else if(questionType === "short-text"){
      onOpenShortText()
    } else {
      onClose()
      onOpenTrueFalse()
    }
  }

  return(
    <div>
      <div className="bg-white dark:bg-gray-600 dark:text-white w-80 px-4 py-6 rounded-md">
        <h1 className="text-lg md:text-xl mb-4 font-semibold">Question Type</h1>
        <div className="flex items-center gap-3 mb-3">
          <input 
            className="size-5 accent-blue-600" 
            type="radio" 
            name="q-type" 
            value={"multiple-choice"}
            onChange={(e) => setQuestionType(e.target.value)}
          />
          <label className="text-sm md:text-md">Multiple Choice</label>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <input 
            className="size-5 accent-blue-600" 
            type="radio" 
            name="q-type"
            value={"short-text"}
            onChange={(e) => setQuestionType(e.target.value)}
          />
          <label className="text-sm md:text-md">Short Text</label>
        </div>
        <div className="flex items-center gap-3">
          <input 
            className="size-5 accent-blue-600" 
            type="radio" 
            name="q-type"
            value={"true-false"}
            onChange={(e) => setQuestionType(e.target.value)}
          />
          <label className="text-sm md:text-md">True or False</label>
        </div>
        <div className="mt-6 mr-2 flex justify-end gap-4 text-sm md:text-md text-blue-600 dark:text-blue-400">
          <button onClick={onClose}>Back</button>
          <button onClick={handleAddQuestion}>Save</button>
        </div>
      </div>
    </div>
  )
}