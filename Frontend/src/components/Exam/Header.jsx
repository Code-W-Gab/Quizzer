import {ArrowLeft} from 'lucide-react'

export default function Header({ currentQuestion, totalQuestions }) {
  return (
    <div className="bg-green-500 text-white p-4 flex items-center gap-5">
      <ArrowLeft />
      <p className="text-lg">
        Question {currentQuestion} of {totalQuestions}
      </p>
    </div>
  );
}