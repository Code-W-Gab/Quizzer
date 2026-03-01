import { Moon, EllipsisVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

export default function MobileHeader() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  // Toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
      console.log("dark")
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
      console.log("white")
    }
  }, [isDarkMode]);

  const location = useLocation();
  const navItems = [
    { to: '/Exam', label: "Exam"},
    { to: '/Quizzes', label: "Quizzes"}
  ]

  return(
    <header className='bg-green-500'>
      <div className="px-4 pt-4 flex items-center justify-between">
        <div>
          <h1 className='text-white font-semibold text-lg'>ChesQuiz</h1>
        </div>
        <div className='flex items-center gap-3'>
          <button 
            onClick={toggleDarkMode}
            className='bg-white hover:bg-gray-300 dark:text-white dark:bg-gray-500 dark:hover:bg-gray-400 p-1 rounded-md cursor-pointer'
          >
            <Moon size={25}/>
          </button>
          <EllipsisVertical className='text-white'/>
        </div>
      </div>

      <div className='mt-4 grid grid-cols-2 text-lg text-white'>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to
          
          return(
            <Link
              key={item.to}
              to={item.to}
              className={`font-semibold text-center
              ${isActive 
                ? "border-b-4 border-white"
                : "hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </header>
  )
}