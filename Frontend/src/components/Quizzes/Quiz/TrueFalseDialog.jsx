import { useState } from "react"
import { useParams } from "react-router-dom"
import { createTrueFalseQuestion } from "../../../services/quizService"
import toast from "react-hot-toast"

export default function TrueFalseDialog({onClose}) {
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const { id } = useParams()

  function handleAddTrueFalse() {
    createTrueFalseQuestion(id, question, correctAnswer)
      .then(res => {
        console.log(res)
        toast.success("Added Successfully")
        onClose()
      }).catch(err => console.log(err))
  }

  return(
    <div>
      <div className="bg-white w-100 px-4 py-6 rounded-md">
        <h1 className="text-xl font-semibold mb-4">True or False</h1>
        <div className="flex flex-col mb-5">
          <label className="text-lg">Question</label>
          <input 
            className="border-b-2" 
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-30 items-center">
          <div className="flex items-center gap-2 mb-3">
            <input 
              className="size-5" 
              type="radio" 
              name="answer"
              value="True"
              checked={correctAnswer === "True"}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
            <label className="text-lg">True</label>
          </div> 
          <div className="flex items-center gap-2 mb-3">
            <input 
              className="size-5" 
              type="radio" 
              name="answer"
              value="False"
              checked={correctAnswer === "False"}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
            <label className="text-lg">False</label>
          </div> 
        </div>   
        <div className="mt-8 mr-2 flex justify-end gap-4 text-md text-green-600">
          <button onClick={onClose}>Back</button>
          <button onClick={handleAddTrueFalse}>Save</button>
        </div>
      </div>
    </div>
  )
}