import {ArrowLeft} from 'lucide-react'
import ExitExam from './ExitExam';
import { useState } from 'react';

export default function Header({ currentQuestion, totalQuestions }) {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  return (
    <div>
      <div className="bg-green-500 text-white p-4 flex items-center gap-5">
        <ArrowLeft onClick={() => setIsExitModalOpen(true)}/>
        <p className="text-lg">
          Question {currentQuestion} of {totalQuestions}
        </p>
      </div>

      {isExitModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center">
          <div className="bg-opacity-25">
            <ExitExam onClose={() => setIsExitModalOpen(false)}/>
          </div>
        </div>
      )}
    </div>
  );
}