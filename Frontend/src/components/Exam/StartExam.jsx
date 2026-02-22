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
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Exam</h1>
        <button
          onClick={handleOk}
          className="bg-green-500 text-white py-2 px-6 flex items-center gap-2 rounded-md"
        >
          <Play size={20}/>
          <span>Start</span>
        </button>
      </div>
    </div>
  )
}