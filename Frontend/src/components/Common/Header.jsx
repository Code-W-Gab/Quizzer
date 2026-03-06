import { Moon, Download } from 'lucide-react'; 
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import quiz from '../../assets/quiz-icon.png';
import User from './User';
import ImportQuizDialog from '../Quizzes/Quiz/ImportQuizDialog'; 
import { importQuizByShareCode } from '../../services/quizService'; 
import { toast } from 'react-hot-toast'; 

export default function Header() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [showImportDialog, setShowImportDialog] = useState(false); // Add this

  // Toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const location = useLocation();
  const navItems = [
    { to: '/Exam', label: "Exam"},
    { to: '/Quizzes', label: "Quizzes"}
  ]

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  // Add import handler
  const handleImport = async (shareCode) => {
    try {
      const result = await importQuizByShareCode(shareCode);
      toast.success(`Quiz imported! ${result.questionsCount} questions added.`);
      // Optionally refresh the page or update state
      if (location.pathname === '/Quizzes') {
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  return(
    <>
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
                    ? "text-blue-600 underline dark:text-blue-400"
                    : "hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
        <div className='flex items-center gap-3'>
          {/* Add Import Quiz Button */}
          <button 
            onClick={() => setShowImportDialog(true)}
            className='bg-gray-200 hover:bg-gray-100 dark:text-white dark:bg-gray-500 dark:hover:bg-gray-400 p-2 rounded-md cursor-pointer'
            title="Import Quiz"
          >
            <Download className="size-6" />
          </button>
          
          <button className='bg-gray-200 hover:bg-gray-100 dark:text-white dark:bg-gray-500 dark:hover:bg-gray-400 p-2 rounded-md cursor-pointer' onClick={toggleDarkMode}>
            <Moon className="size-6" />
          </button>
          <User logout={() => handleLogout()}/>
        </div>
      </div>

      {showImportDialog && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <ImportQuizDialog
              onImport={handleImport}
              onClose={() => setShowImportDialog(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}