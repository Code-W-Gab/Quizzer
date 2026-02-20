import { useState } from "react"

export default function MultipleChoiceDialog({onClose}) {
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [wrongAnswer1, setWrongAnswer1] = useState("")
  const [wrongAnswer2, setWrongAnswer2] = useState("")
  const [wrongAnswer3, setWrongAnswer3] = useState("")

  return(
    <div>
      <div className="bg-white w-100 px-4 py-6 rounded-md">
        <h1 className="text-xl font-semibold mb-4">Multiple Choice</h1>
        <div className="flex flex-col mb-6">
          <label className="text-lg">Question</label>
          <input 
            className="border-b-2" 
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="text-lg">Correct Answer</label>
          <input 
            className="border-b-2" 
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="text-lg">Wrong Answer 1</label>
          <input 
            className="border-b-2" 
            type="text"
            value={wrongAnswer1}
            onChange={(e) => setWrongAnswer1(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="text-lg">Wrong Answer 2</label>
          <input 
            className="border-b-2" 
            type="text"
            value={wrongAnswer2}
            onChange={(e) => setWrongAnswer2(e.target.value)}
          />
        </div>  
        <div className="flex flex-col mb-3">
          <label className="text-lg">Wrong Answer 3</label>
          <input 
            className="border-b-2" 
            type="text"
            value={wrongAnswer3}
            onChange={(e) => setWrongAnswer3(e.target.value)}
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