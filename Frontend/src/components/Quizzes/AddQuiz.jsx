import { Plus } from "lucide-react";
import { useState } from "react";
import AddQuizFolder from "./AddQuizFolder";

export default function AddQuiz() {
  const [isQuizFolderOpen, setIsQuizFolderOpen] = useState(false)

  return(
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Quiz</h1>
        <button 
          onClick={() => setIsQuizFolderOpen(true)}
          className="bg-green-500 text-white p-2 flex items-center gap-2 rounded-md"
        >
          <Plus/>
          <span>Add Quiz</span>
        </button>
      </div>


      {isQuizFolderOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center">
          <div className="bg-opacity-25">
            <AddQuizFolder
              onClose={() => setIsQuizFolderOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}