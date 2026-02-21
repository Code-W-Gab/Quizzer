export default function ExitExam({onClose}) {
  return(
    <div>
      <div className="bg-white w-90 px-4 py-6 rounded-md">
        <p className="text-lg mb-4 font-semibold">Do you want to quit the exam?</p>
        <div className="mt-6 mr-2 flex justify-end gap-4 text-md text-green-600">
          <button onClick={onClose}>NO</button>
          <button>QUIT</button>
        </div>
      </div>
    </div>
  )
}