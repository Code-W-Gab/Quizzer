import { useState } from 'react'
import { addQuizFolder } from '../../../services/quizService'
import toast from 'react-hot-toast'


export default function AddQuizFolder({ onClose, fetchQuizFolder }) {
  const [folderName, setFolderName] = useState("")

  function handleAddFolder() {
    addQuizFolder(folderName)
      .then(res => {
        console.log(res)
        onClose()
        toast.success("Quiz Folder Successfully Created")
        fetchQuizFolder()
      })
      .catch(err => console.log(err))
  }

  return(
    <div className="bg-white w-90 px-4 py-6 rounded-md">
      <h1 className='text-lg font-semibold'>Quiz Name</h1>
      <div className="relative mb-3">
        <input 
          className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 text-sm focus:outline-none peer placeholder-transparent
                      focus:border-green-600" 
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <label
          className="absolute left-0 -top-3 text-lg text-gray-600 transition-all
                      peer-placeholder-shown:text-lg peer-placeholder-shown:top-2
                      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-600"
        >
          
        </label>
      </div>
      <div className="mt-5 flex items-center justify-end gap-4 text-sm text-green-600">
        <button onClick={onClose}>CANCEL</button>
        <button onClick={handleAddFolder}>SAVE</button>
      </div>
    </div>
  )
}