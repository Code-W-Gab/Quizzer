import { Moon, Download, Sun, LogOut } from 'lucide-react'; 
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImportQuizDialog from '../Quizzes/Quiz/ImportQuizDialog'; 
import { importQuizByShareCode } from '../../services/quizService'; 
import { toast } from 'react-hot-toast'; 
import MobileEllipsisHeader from './MobileEllipsisHeader';

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
    <header className='bg-green-500'>
      <div className="px-4 pt-4 flex items-center justify-between">
        <div>
          <h1 className='text-white font-semibold text-lg'>ChesQuiz</h1>
        </div>
        {/* <div className='flex items-center gap-3'>
          <button>
            <Download size={25} 
              onClick={() => setShowImportDialog(true)}
              className='text-white'
            />
          </button>
          <button 
            onClick={toggleDarkMode}
            className='cursor-pointer'
          >
            {isDarkMode ? <Sun size={25} className='text-yellow-400'/> : <Moon size={25}/>}
          </button>
          <button onClick={() => handleLogout()}>
            <LogOut size={25} className='text-white'/>
          </button>
        </div> */}
        <MobileEllipsisHeader
          onImport={() => setShowImportDialog(true)}
          onToggle={() => toggleDarkMode()}
          onLogout={() => handleLogout()}
          isDarkMode={isDarkMode}
        />
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
    </header>
  )
}