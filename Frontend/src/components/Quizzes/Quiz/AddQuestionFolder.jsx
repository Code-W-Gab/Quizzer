import { Plus } from "lucide-react"

export default function AddQuestionFolder() {
  return(
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Question</h1>
        <button 
          className="bg-green-500 text-white p-2 flex items-center gap-2 rounded-md"
        >
          <Plus/>
          <span>Add Question</span>
        </button>
      </div>
    </div>
  )
}