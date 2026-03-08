import { useState } from 'react'
import { addQuizFolder } from '../../../services/quizService'
import toast from 'react-hot-toast'


export default function AddQuizFolder({ onClose, fetchQuizFolder }) {
  const [folderName, setFolderName] = useState("")
  const [loading, setLoading] = useState(false);

  function handleAddFolder() {
    setLoading(true)
    addQuizFolder(folderName)
      .then(res => {
        onClose()
        toast.success("Quiz Folder Successfully Created")
        fetchQuizFolder()
      })
      .catch(err => {
        setLoading(false) 
        console.log(err)
      })
  }

  return(
    <div>
      <div className="bg-white dark:bg-gray-600 w-80 md:w-90 px-4 py-6 rounded-md z-50">
        <h1 className='text-md md:text-lg font-semibold dark:text-white'>Quiz Name</h1>
        <div className="relative mb-3">
          <input 
            className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
                        focus:border-blue-600 dark:focus:border-blue-400" 
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <div className="mt-5 flex items-center justify-end gap-4 text-xs md:text-sm text-blue-600 dark:text-blue-400">
          <button onClick={onClose}>CANCEL</button>
          <button onClick={handleAddFolder}>SAVE</button>
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