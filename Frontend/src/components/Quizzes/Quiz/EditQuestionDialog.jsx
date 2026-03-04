import { useState } from 'react'
import { editQuestion } from '../../../services/questionService'
import toast from 'react-hot-toast'

export default function EditQuestionDialog({ question, onClose, getAllQuizByFolder }) {
  const [questionText, setQuestionText] = useState(question.questionText)
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer)
  const [wrongAnswer1, setWrongAnswer1] = useState(question.options?.[0] || '')
  const [wrongAnswer2, setWrongAnswer2] = useState(question.options?.[1] || '')
  const [wrongAnswer3, setWrongAnswer3] = useState(question.options?.[2] || '')

  function handleSave() {
    let questionData = {
      questionText,
      questionType: question.questionType,
      correctAnswer
    }

    // Add options for multiple choice
    if (question.questionType === 'multiple-choice') {
      questionData.options = [wrongAnswer1, wrongAnswer2, wrongAnswer3]
    }

    editQuestion(question._id, questionData)
      .then(res => {
        toast.success("Question successfully updated!")
        console.log(res)
        onClose()
        getAllQuizByFolder()
      })
      .catch(err => {
        toast.error("Failed to update question")
        console.log(err)
      })
  }

  // Get dialog title based on question type
  const getTitle = () => {
    switch(question.questionType) {
      case 'short-text':
        return 'Edit Short Text'
      case 'multiple-choice':
        return 'Edit Multiple Choice'
      case 'true-false':
        return 'Edit True or False'
      default:
        return 'Edit Question'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-600 dark:text-white w-80 md:w-100 px-4 py-6 rounded-md z-50">
      <h1 className='text-lg md:text-xl font-semibold mb-6'>{getTitle()}</h1>
      
      {/* Question Text */}
      <div className="relative mb-6">
        <input 
          className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
                  focus:border-green-600 dark:focus:border-green-400" 
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Question"
          id="question"
        />
        <label 
          htmlFor="question"
          className="absolute left-0 -top-3 text-sm text-gray-600 dark:text-white transition-all
                     peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                     peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600 dark:peer-focus:text-green-400"
        >
          Question
        </label>
      </div>

      {/* Short Text Answer */}
      {question.questionType === 'short-text' && (
        <div className="relative mb-3">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
            focus:border-green-600 dark:focus:border-green-400" 
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Correct Answer"
            id="correctAnswer"
          />
          <label 
            htmlFor="correctAnswer"
            className="absolute left-0 -top-3 text-sm text-gray-600 dark:text-white transition-all
                       peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                       peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600 dark:peer-focus:text-green-400"
          >
            Correct Answer
          </label>
        </div>
      )}

      {/* Multiple Choice Options */}
      {question.questionType === 'multiple-choice' && (
        <>
          <div className="relative mb-6">
            <input 
              className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
              focus:border-green-600 dark:focus:border-green-400" 
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Correct Answer"
              id="correctAnswer"
            />
            <label 
              htmlFor="correctAnswer"
              className="absolute left-0 -top-3 text-sm text-gray-600 dark:text-white transition-all
                         peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                         peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600 dark:peer-focus:text-green-400"
            >
              Correct Answer
            </label>
          </div>
          
          <div className="relative mb-6">
            <input 
              className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
              focus:border-green-600 dark:focus:border-green-400" 
              type="text"
              value={wrongAnswer1}
              onChange={(e) => setWrongAnswer1(e.target.value)}
              placeholder="Wrong Answer 1"
              id="wrongAnswer1"
            />
            <label 
              htmlFor="wrongAnswer1"
              className="absolute left-0 -top-3 text-sm text-gray-600 dark:text-white transition-all
                         peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                         peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600 dark:peer-focus:text-green-400"
            >
              Wrong Answer 1
            </label>
          </div>

          <div className="relative mb-6">
            <input 
              className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
              focus:border-green-600 dark:focus:border-green-400" 
              type="text"
              value={wrongAnswer2}
              onChange={(e) => setWrongAnswer2(e.target.value)}
              placeholder="Wrong Answer 2"
              id="wrongAnswer2"
            />
            <label 
              htmlFor="wrongAnswer2"
              className="absolute left-0 -top-3 text-sm text-gray-600 dark:text-white transition-all
                         peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                         peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600 dark:peer-focus:text-green-400"
            >
              Wrong Answer 2
            </label>
          </div>

          <div className="relative mb-6">
            <input 
              className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
              focus:border-green-600 dark:focus:border-green-400" 
              type="text"
              value={wrongAnswer3}
              onChange={(e) => setWrongAnswer3(e.target.value)}
              placeholder="Wrong Answer 3"
              id="wrongAnswer3"
            />
            <label 
              htmlFor="wrongAnswer3"
              className="absolute left-0 -top-3 text-sm text-gray-600 dark:text-white transition-all
                         peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                         peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600 dark:peer-focus:text-green-400"
            >
              Wrong Answer 3
            </label>
          </div>
        </>
      )}

      {/* True/False Options */}
      {question.questionType === 'true-false' && (
        <div className="flex justify-center gap-25 items-center">
          <div className="flex items-center gap-2 mb-3">
            <input 
              className="size-5 accent-green-600" 
              type="radio" 
              name="answer"
              value="True"
              checked={correctAnswer === 'True'}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
            <label className="text-lg">True</label>
          </div> 
          <div className="flex items-center gap-2 mb-3">
            <input 
              className="size-5 accent-green-600" 
              type="radio" 
              name="answer"
              value="False"
              checked={correctAnswer === 'False'}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
            <label className="text-lg">False</label>
          </div> 
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 mr-2 flex justify-end gap-4 text-md text-green-600 dark:text-green-400">
        <button onClick={onClose}>Back</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}