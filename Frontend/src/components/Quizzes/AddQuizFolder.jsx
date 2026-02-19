import { useState } from 'react'
import { addQuizFolder } from '../../services/quizService'
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
      <h1 className="text-xl mb-2">Quiz name</h1>
      <input
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        type="text" 
        className="w-full border-b border-green-600" 
      />
      <div className="mt-5 flex items-center justify-end gap-4 text-sm text-green-600">
        <button onClick={onClose}>CANCEL</button>
        <button onClick={handleAddFolder}>SAVE</button>
      </div>
    </div>
  )
}