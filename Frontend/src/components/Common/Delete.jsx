export default function Delete({ onClose, onDelete, name }) {
  return(
    <div className="bg-white dark:bg-gray-600 dark:text-white p-6 w-80 md:w-100 rounded-md">
      <h1 className="text-lg md:text-xl mb-4 font-semibold">Delete this {name}?</h1>
      <div className="text-sm md:text-md">
        <h1>Are you sure you want to delete this {name}?</h1>
        <p>This cannot be undone</p>
      </div>
      <div className="text-sm md:text-md mt-8 flex items-center justify-end gap-5">
        <button onClick={onClose}>Cancel</button>
        <button onClick={onDelete} className="bg-red-500 dark:bg-red-600 rounded-sm text-white px-4 py-1">Delete</button>
      </div>
    </div>
  )
}