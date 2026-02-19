export default function AddQuestionDialog({onClose}) {
  return(
    <div>
      <div className="bg-white w-80 px-4 py-6 rounded-md">
        <h1 className="text-xl mb-4">Question Type</h1>
        <div className="flex items-center gap-3 mb-3">
          <input className="size-4" type="radio" name="q-type"/>
          <label className="text-md">Multiple Choice</label>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <input className="size-4" type="radio" name="q-type"/>
          <label className="text-md">Short Text</label>
        </div>
        <div className="flex items-center gap-3">
          <input className="size-4" type="radio" name="q-type"/>
          <label className="text-md">True or False</label>
        </div>
        <div className="mt-6 mr-2 flex justify-end gap-4 text-md text-green-600">
          <button onClick={onClose}>Back</button>
        </div>
      </div>
    </div>
  )
}