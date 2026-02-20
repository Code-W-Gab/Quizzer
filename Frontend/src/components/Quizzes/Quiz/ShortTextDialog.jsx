import { useState } from "react"

export default function ShortTextDialog({onClose}) {
  const [correctAnswer, setCorrectAnswer] = useState("")

  return(
    <div>
      <div className="bg-white w-80 px-4 py-6 rounded-md">
        <h1 className="text-xl mb-4">Multiple Choice</h1>
        <div className="flex items-center gap-3 mb-3">
          <input 
            className="border" 
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
          <label className="text-md">Multiple Choice</label>
        </div>  
        <div className="mt-6 mr-2 flex justify-end gap-4 text-md text-green-600">
          <button onClick={onClose}>Back</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  )
}