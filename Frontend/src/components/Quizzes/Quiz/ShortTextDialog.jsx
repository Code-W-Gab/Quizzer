import { useState } from "react"

export default function ShortTextDialog({onClose}) {
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")

  return(
    <div>
      <div className="bg-white w-100 px-4 py-6 rounded-md">
        <h1 className="text-xl font-semibold mb-4">Short Text</h1>
        <div className="flex flex-col mb-6">
          <label className="text-lg">Question</label>
          <input 
            className="border-b-2" 
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="flex flex-col  mb-3">
          <label className="text-lg">Correct Answer</label>
          <input 
            className="border-b-2" 
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>    
        <div className="mt-8 mr-2 flex justify-end gap-4 text-md text-green-600">
          <button onClick={onClose}>Back</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  )
}