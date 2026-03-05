import { Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import quiz from '../../assets/quiz-icon.png';
import User from './User';

export default function Header() {
  const navigate = useNavigate();
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

  function handleLogout() {
    // Remove token or user info from localStorage/sessionStorage
    localStorage.removeItem("token"); // adjust key as needed
    // Redirect and replace history
    navigate("/", { replace: true });
  }

  return(
    <div className="flex items-center justify-between bg-gray-300 dark:bg-gray-600 px-4 rounded-lg">
      <div className="flex items-center">
        <div className="pr-4 border-r-2 border-gray-400 dark:border-white">
          <img src={quiz} className="size-14"/>
        </div>
        <div className="flex items-center gap-4 ml-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to

            return(
              <Link 
                key={item.to}
                to={item.to}
                className={`flex justify-start rounded-md w-full transition-colors dark:text-gray-200
                ${isActive
                  ? "text-green-600 underline dark:text-green-400"
                  : "hover:text-green-400"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button className='bg-gray-200 hover:bg-gray-100 dark:text-white dark:bg-gray-500 dark:hover:bg-gray-400 p-2 rounded-md cursor-pointer' onClick={toggleDarkMode}>
          <Moon className="size-6" />
        </button>
        <User logout={() => handleLogout()}/>
      </div>
    </div>
  )
}