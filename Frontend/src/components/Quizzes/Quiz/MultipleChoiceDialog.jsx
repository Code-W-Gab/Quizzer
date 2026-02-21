import { useState } from "react"
import { useParams } from "react-router-dom"
import { createMultipleChoiceQuestion } from "../../../services/quizService"
import toast from "react-hot-toast"

export default function MultipleChoiceDialog({onClose}) {
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [wrongAnswer1, setWrongAnswer1] = useState("")
  const [wrongAnswer2, setWrongAnswer2] = useState("")
  const [wrongAnswer3, setWrongAnswer3] = useState("")
  const { id } = useParams()

  function handleAddMultipleChoice() {
    createMultipleChoiceQuestion(id, question, correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3)
      .then(res => {
        console.log(res)
        toast.success("Added Successfully")
        onClose()
      }).catch(err => console.log(err))
  }

  return(
    <div>
      <div className="bg-white w-100 px-4 py-6 rounded-md">
        <h1 className="text-xl font-semibold mb-4">Multiple Choice</h1>
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 text-sm border-b-gray-600 focus:outline-none peer placeholder-transparent
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
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 text-sm border-b-gray-600 focus:outline-none peer placeholder-transparent
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
        
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 text-sm border-b-gray-600 focus:outline-none peer placeholder-transparent
                       focus:border-green-600" 
            type="text"
            value={wrongAnswer1}
            onChange={(e) => setWrongAnswer1(e.target.value)}
            placeholder="Wrong Answer 1"
            id="wrongAnswer1"
          />
          <label 
            htmlFor="wrongAnswer1"
            className="absolute left-0 -top-3 text-sm text-gray-600 transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600"
          >
            Wrong Answer 1
          </label>
        </div>

        
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 text-sm border-b-gray-600 focus:outline-none peer placeholder-transparent
                       focus:border-green-600" 
            type="text"
            value={wrongAnswer2}
            onChange={(e) => setWrongAnswer2(e.target.value)}
            placeholder="Wrong Answer 2"
            id="wrongAnswer2"
          />
          <label 
            htmlFor="wrongAnswer2"
            className="absolute left-0 -top-3 text-sm text-gray-600 transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600"
          >
            Wrong Answer 2
          </label>
        </div>
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 text-sm border-b-gray-600 focus:outline-none peer placeholder-transparent
                       focus:border-green-600" 
            type="text"
            value={wrongAnswer3}
            onChange={(e) => setWrongAnswer3(e.target.value)}
            placeholder="Wrong Answer 3"
            id="wrongAnswer3"
          />
          <label 
            htmlFor="wrongAnswer3"
            className="absolute left-0 -top-3 text-sm text-gray-600 transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600"
          >
            Wrong Answer 3
          </label>
        </div>       
        <div className="mt-8 mr-2 flex justify-end gap-4 text-md text-green-600">
          <button onClick={onClose}>Back</button>
          <button onClick={handleAddMultipleChoice}>Save</button>
        </div>
      </div>
    </div>
  )
}