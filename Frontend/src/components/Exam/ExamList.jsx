import { FolderClosed } from "lucide-react"
import { useState } from "react"
import ExamListDialog from "./ExamListDialog"

export default function ExamList({quizFolder, handleCheckboxChange, selectedQuizzes}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return(
    <div>
      <div className="grid grid-cols-4">
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-4 cursor-auto font-semibold bg-white rounded-md p-4 hover:bg-green-500 hover:text-white">
          <FolderClosed />
          <p>Quizzes</p>
        </button>
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