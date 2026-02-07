export default function SideBar() {
  // const [isActive, setIsActive] = useState("")

  const navItems = [
    { to: '/Exam', label: "Exam"},
    { to: '/Quizzes', label: "Quizzes"}
  ]

  return(
    <div className="p-3 w-70 h-full">
      {/* Title */}
      <h1 className="text-xl font-bold">Quizzer</h1>
      {/* Nav Bar */}
      <div className="mt-8 flex flex-col gap-3">
        {navItems.map((item) => {
          <div key={item.to}>
            <button>{item.label}</button>
          </div>
        })}
      </div>
    </div>
  )
}