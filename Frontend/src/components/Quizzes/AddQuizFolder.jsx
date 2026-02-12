export default function AddQuizFolder({ onClose }) {
  return(
    <div className="bg-white w-90 px-4 py-6 rounded-md">
      <h1 className="text-xl mb-2">Quiz name</h1>
      <input type="text" className="w-full border-b border-green-600" />
      <div className="mt-5 flex items-center justify-end gap-4 text-sm text-green-600">
        <button onClick={onClose}>CANCEL</button>
        <button>SAVE</button>
      </div>
    </div>
  )
}