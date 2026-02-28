export default function Delete({ onClose, onDelete, name }) {
  return(
    <div className="bg-white p-6 w-100 rounded-md">
      <h1 className="text-xl mb-4 font-semibold">Delete this {name}?</h1>
      <div>
        <h1>Are you sure you want to delete this {name}?</h1>
        <p>This cannot be undone</p>
      </div>
      <div className="mt-8 flex items-center justify-end gap-5">
        <button onClick={onClose}>Cancel</button>
        <button onClick={onDelete} className="bg-red-500 rounded-sm text-white px-4 py-1">Delete</button>
      </div>
    </div>
  )
}