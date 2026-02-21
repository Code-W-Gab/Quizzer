import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function StartExam() {
  return(
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Exam</h1>
        <Link 
          to={"/Exam/Start-Exam"}
          className="bg-green-500 text-white py-2 px-6 flex items-center gap-2 rounded-md"
        >
          <Play size={20}/>
          <span>Start</span>
        </Link>
      </div>
    </div>
  )
}