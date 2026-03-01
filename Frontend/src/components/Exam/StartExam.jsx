import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

export default function StartExam({selectedQuizzes}) {
  const navigate = useNavigate();

  const handleOk = () => {
    if (selectedQuizzes.length === 0) {
      toast.error("Please select at least one quiz!");
      return;
    }
    navigate("/Exam/Start-Exam", { state: { folderIds: selectedQuizzes } })
  };

  return(
    <div>
      {/* Table to Desktop Size */}
      <div className="flex justify-between items-center">
        <h1 className="text-md px-3 md:text-lg lg:text-xl font-bold">Manage Exam</h1>
        <button
          onClick={handleOk}
          className="hidden bg-green-500 dark:bg-green-400 text-white py-2 px-6 md:flex items-center gap-2 rounded-md"
        >
          <Play size={20}/>
          <span>Start</span>
        </button>
      </div>

      {/* Mobile size */}
      <div className="md:hidden fixed right-4 bottom-4">
        <button 
          onClick={handleOk}
          className="bg-green-500 text-white p-3 rounded-full"
        >
          <Play/>
        </button>
      </div>
    </div>
  )
}