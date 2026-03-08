import { useState } from "react"
import { useParams } from "react-router-dom"
import { createMultipleChoiceQuestion } from "../../../services/quizService"
import toast from "react-hot-toast"

export default function MultipleChoiceDialog({onClose, getAllQuizByFolder}) {
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [wrongAnswer1, setWrongAnswer1] = useState("")
  const [wrongAnswer2, setWrongAnswer2] = useState("")
  const [wrongAnswer3, setWrongAnswer3] = useState("")
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  function handleAddMultipleChoice() {
    setLoading(true)
    createMultipleChoiceQuestion(id, question, correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3)
      .then(res => {
        toast.success("Added Successfully")
        onClose()
        getAllQuizByFolder()
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
  }

  return(
    <div>
      <div className="bg-white dark:bg-gray-600 dark:text-white w-80 md:w-100 px-4 py-6 rounded-md">
        <h1 className="text-lg md:text-xl font-semibold mb-4">Multiple Choice</h1>
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
                    focus:border-blue-600 dark:focus:border-blue-400" 
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            id="question"
          />
          <label 
            htmlFor="question"
            className="absolute left-0 -top-3 text-xs md:text-sm text-gray-600 dark:text-white transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400"
          >
            Question
          </label>
        </div>
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
                    focus:border-blue-600 dark:focus:border-blue-400" 
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Correct Answer"
            id="correctAnswer"
          />
          <label 
            htmlFor="correctAnswer"
            className="absolute left-0 -top-3 text-xs md:text-sm text-gray-600 dark:text-white transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400"
          >
            Correct Answer
          </label>
        </div>
        
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
                    focus:border-blue-600 dark:focus:border-blue-400"  
            type="text"
            value={wrongAnswer1}
            onChange={(e) => setWrongAnswer1(e.target.value)}
            placeholder="Wrong Answer 1"
            id="wrongAnswer1"
          />
          <label 
            htmlFor="wrongAnswer1"
            className="absolute left-0 -top-3 text-xs md:text-sm text-gray-600 dark:text-white transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400"
          >
            Wrong Answer 1
          </label>
        </div>

        
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
                    focus:border-blue-600 dark:focus:border-blue-400"  
            type="text"
            value={wrongAnswer2}
            onChange={(e) => setWrongAnswer2(e.target.value)}
            placeholder="Wrong Answer 2"
            id="wrongAnswer2"
          />
          <label 
            htmlFor="wrongAnswer2"
            className="absolute left-0 -top-3 text-xs md:text-sm text-gray-600 dark:text-white transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400"
          >
            Wrong Answer 2
          </label>
        </div>
        <div className="relative mb-6">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
                    focus:border-blue-600 dark:focus:border-blue-400" 
            type="text"
            value={wrongAnswer3}
            onChange={(e) => setWrongAnswer3(e.target.value)}
            placeholder="Wrong Answer 3"
            id="wrongAnswer3"
          />
          <label 
            htmlFor="wrongAnswer3"
            className="absolute left-0 -top-3 text-xs md:text-sm text-gray-600 dark:text-white transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400"
          >
            Wrong Answer 3
          </label>
        </div>       
        <div className="mt-8 mr-2 flex justify-end gap-4 text-md text-blue-600 dark:text-blue-400">
          <button onClick={onClose}>Back</button>
          <button onClick={handleAddMultipleChoice}>Save</button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-gray-700 font-semibold">Logging in...</p>
          </div>
        </div>
      )}
    </div>
  )
}