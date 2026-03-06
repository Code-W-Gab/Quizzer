import { FolderClosed } from "lucide-react"
import { useState } from "react"
import ExamListDialog from "./ExamListDialog"

export default function ExamList({quizFolder, handleCheckboxChange, selectedQuizzes}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return(
    <div>
      {/* Table to Desktop Size */}
      <div className="hidden md:grid grid-cols-4">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="cursor-auto font-semibold bg-gray-300 dark:bg-gray-600 dark:text-white rounded-md p-4 hover:bg-blue-500 hover:text-white"
          >
          <div className="flex items-center gap-4">
            <FolderClosed />
            <p>Quizzes</p>
          </div>

          
        </button>
      </div>

      {/* Mobile size */}
      <div className="md:hidden">
        <div className="flex items-center gap-6 px-3 border-b border-gray-600 dark:text-white">
          <FolderClosed size={30}/>
          <div>
            <button 
            onClick={() => setIsModalOpen(true)}
            className="text-lg font-semibold"
            >
              Quizzes
            </button>
            
            <p className="text-sm text-gray-700 mb-3 dark:text-gray-300">Tap to choose quizzes</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center">
          <div className="bg-opacity-25">
            <ExamListDialog onClose={() => setIsModalOpen(false)} quizFolder={quizFolder} selectedQuizzes={selectedQuizzes} handleCheckboxChange={handleCheckboxChange}/>
          </div>
        </div>
      )}
    </div>
  )
}