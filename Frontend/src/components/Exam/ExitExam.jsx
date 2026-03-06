import { useNavigate } from "react-router-dom"

export default function ExitExam({onClose}) {
  const navigate = useNavigate();
  
  return(
    <div>
      <div className="bg-white w-90 px-4 py-6 rounded-md">
        <p className="text-lg mb-4 font-semibold">Do you want to quit the exam?</p>
        <div className="mt-6 mr-2 flex justify-end gap-4 text-md text-blue-600">
          <button onClick={onClose}>NO</button>
          <button onClick={() => navigate('/Exam')}>QUIT</button>
        </div>
      </div>
    </div>
  )
}