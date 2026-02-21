import { useState } from "react"
import { useParams } from "react-router-dom"
import { createShortTextQuestion } from "../../../services/quizService"
import toast from "react-hot-toast"

export default function ShortTextDialog({onClose}) {
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const { id } = useParams()

  function handleAddShortText() {
    createShortTextQuestion(id, question, correctAnswer)
      .then(res => {
        toast.success("Added Successfully")
        console.log(res)
        onClose()
      })
      .catch(err => console.log(err))
  }

  return(
    <div>
      <div className="bg-white w-100 px-4 py-6 rounded-md">
        <h1 className="text-xl font-semibold mb-4">Short Text</h1>
        
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 text-sm focus:outline-none peer placeholder-transparent
                       focus:border-green-600" 
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            id="question"
          />
          <label 
            htmlFor="question"
            className="absolute left-0 -top-3 text-sm text-gray-600 transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600"
          >
            Question
          </label>
        </div>

        <div className="relative mb-3">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 text-sm focus:outline-none peer placeholder-transparent
                       focus:border-green-600" 
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Correct Answer"
            id="correctAnswer"
          />
          <label 
            htmlFor="correctAnswer"
            className="absolute left-0 -top-3 text-sm text-gray-600 transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600"
          >
            Correct Answer
          </label>
        </div>

        <div className="mt-8 mr-2 flex justify-end gap-4 text-md text-green-600">
          <button onClick={onClose}>Back</button>
          <button onClick={handleAddShortText}>Save</button>
        </div>
      </div>
    </div>
  )
}