import { NotepadText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navItems = [
    { to: '/Exam', label: "Exam"},
    { to: '/Quizzes', label: "Quizzes"}
  ]

  return(
    <div className="px-8 py-4 flex items-center justify-between">
      <div className="flex gap-2 items-center text-green-500 font-bold">
        <NotepadText />
        <span className='text-xl'>QUIZZER</span>
      </div>
      <div className="flex items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to

          return(
            <Link 
              key={item.to}
              to={item.to}
              className={`flex justify-start px-4 py-2 rounded-md w-full transition-colors
              ${isActive
                ? "text-green-500"
                : "hover:text-green-400"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}