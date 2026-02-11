import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function SideBar() {
  const location = useLocation();

  const navItems = [
    { to: '/Exam', label: "Exam"},
    { to: '/Quizzes', label: "Quizzes"}
  ]

  return(
    <div className="p-3 w-70 h-full bg-amber-300">
      {/* Title */}
      <h1 className="text-xl font-bold">Quizzer</h1>
      {/* Nav Bar */}
      <div className="mt-8 flex flex-col gap-3 ">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to

          return(
            <Link 
              key={item.to}
              to={item.to}
              className={`flex justify-start px-4 py-2 rounded-md w-full transition-colors
              ${isActive
                ? "bg-green-500 text-white"
                : "hover:bg-green-400"
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