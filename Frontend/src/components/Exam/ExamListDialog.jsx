
export default function ExamListDialog({onClose, quizFolder, selectedQuizzes, handleCheckboxChange}) {

  return(
    <div>
      <div className="bg-white w-90 px-4 py-6 rounded-md">
        <h1 className="text-xl mb-4 font-semibold">Quizzes</h1>
        <div>
          {quizFolder.map((folder) => {
            return(
              <div key={folder._id} className="flex items-center gap-3 mb-3">
                <input 
                  className="size-5 accent-green-600 mt-0.5 shrink-0" 
                  type="checkbox"
                  checked={selectedQuizzes.includes(folder._id)}
                  onChange={() => handleCheckboxChange(folder._id)}
                />
                <label className="text-md break-all">{folder.name}</label>
              </div>
            )
          })}
        </div>
        <div className="mt-6 mr-2 flex justify-end gap-4 text-md text-green-600">
          <button onClick={onClose}>Ok</button>
        </div>
      </div>
    </div>
  )
}