import { useEffect, useState } from 'react'
import { editQuizFolder, getQuizFolderById } from '../../../services/quizService'
import toast from 'react-hot-toast'

export default function EditQuizFolder({folderId, onClose, fetchQuizFolder, setLoading}) {
  const [folderName, setFolderName] = useState("")

  function fetchQuizFolderById() {
    getQuizFolderById(folderId)
      .then(res => {
        setFolderName(res.data.data.name)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchQuizFolderById()
  }, [])

  function handleSave() {
    setLoading(true)
    editQuizFolder(folderId, folderName)
      .then(res => {
        toast.success("Folder successfully updated!")
        onClose()
        fetchQuizFolder()
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        toast.error("Failed to update folder")
        console.log(err)
      })
    }

  
  return(
    <div className="bg-white dark:bg-gray-600 w-80 md:w-90 px-4 py-6 rounded-md z-50">
      <h1 className='text-lg font-semibold dark:text-white'>Quiz Name</h1>
      <div className="relative mb-3">
        <input 
          className="border-b-2 w-full pt-4 pb-1 border-b-gray-600 dark:border-b-white dark:text-white text-sm focus:outline-none peer placeholder-transparent
                  focus:border-blue-600 dark:focus:border-blue-400" 
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </div>
      <div className="mt-5 flex items-center justify-end gap-4 text-sm text-blue-600 dark:text-blue-400">
        <button onClick={onClose}>CANCEL</button>
        <button onClick={handleSave}>SAVE</button>
      </div>
    </div>
  )
}