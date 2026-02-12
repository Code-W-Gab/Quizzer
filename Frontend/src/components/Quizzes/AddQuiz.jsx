import { Plus } from "lucide-react";

export default function AddQuiz() {
  return(
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">Manage Quiz</h1>
      <button className="bg-green-500 text-white p-2 flex items-center gap-2 rounded-md">
        <Plus/>
        <span>Add Quiz</span>
      </button>
    </div>
  )
}