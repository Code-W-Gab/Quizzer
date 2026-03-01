import { Plus } from "lucide-react";
import { useState } from "react";
import AddQuizFolder from "./AddQuizFolder";

export default function AddFolder({fetchQuizFolder}) {
  const [isQuizFolderOpen, setIsQuizFolderOpen] = useState(false)

  return(
    <div>
      {/* Table to Desktop Size */}
      <div className="md:flex md:justify-between md:items-center dark:text-white">
        <h1 className="text-md px-3 md:text-lg lg:text-xl font-bold">Manage Quiz</h1>
        <button 
          onClick={() => setIsQuizFolderOpen(true)}
          className="hidden bg-green-500 dark:bg-green-400 text-white p-2 md:flex md:items-center gap-2 rounded-md"
        >
          <Plus/>
          <span>Add Quiz</span>
        </button>
      </div>

      {/* Mobile size */}
      <div className="md:hidden fixed right-6 bottom-8">
        <button 
          onClick={() => setIsQuizFolderOpen(true)}
          className="bg-green-500 text-white p-3 rounded-full"
        >
          <Plus/>
        </button>
      </div>

      {isQuizFolderOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <AddQuizFolder
              fetchQuizFolder={fetchQuizFolder}
              onClose={() => setIsQuizFolderOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}