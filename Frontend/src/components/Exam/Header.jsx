// import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import ExitExam from "./ExitExam";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return(
    <div>
      <div className="flex items-center gap-4 bg-green-500 text-white py-3 px-6">
        <button onClick={() => setIsModalOpen(true)}>
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Question: 1/50</h1>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center">
          <div className="bg-opacity-25">
            <ExitExam onClose={() => setIsModalOpen(false)}/>
          </div>
        </div>
      )}
    </div>
  )
}