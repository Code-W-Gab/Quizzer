import { useState } from "react";

export default function AnswerQuestion({ question, onAnswer, userAnswer, onNext, hasAnswered, isLastQuestion }) {
  const [inputValue, setInputValue] = useState(userAnswer || "");

  const handleOptionClick = (option) => {
    onAnswer(option);
  };

  const handleTextSubmit = () => {
    if (inputValue.trim()) {
      onAnswer(inputValue.trim());
    }
  };

  const renderQuestionInput = () => {
    switch (question.questionType) {
      case 'true-false':
        return (
          <div className="flex flex-col gap-4 mt-4">
            <button 
              onClick={() => handleOptionClick('True')}
              className={`rounded-md py-2 text-lg ${
                userAnswer === 'True' ? 'bg-green-500 text-white' : 'bg-gray-400'
              }`}
            >
              True
            </button>
            <button 
              onClick={() => handleOptionClick('False')}
              className={`rounded-md py-2 text-lg ${
                userAnswer === 'False' ? 'bg-green-500 text-white' : 'bg-gray-400'
              }`}
            >
              False
            </button>
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="flex flex-col gap-4 mt-4">
            {question.shuffledOptions.map((option, index) => (
              <button 
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`rounded-md py-2 text-lg ${
                  userAnswer === option ? 'bg-green-500 text-white' : 'bg-gray-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'short-text':
        return (
          <div className="mt-4">
            <input 
              className="border-b-2 w-full pt-4 pb-1 text-sm border-b-gray-600 focus:outline-none peer placeholder-transparent
                        focus:border-green-600" 
              type="text"
              placeholder="Your answer"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
            />
            <button 
              onClick={handleTextSubmit}
              className="bg-green-500 w-full mt-4 py-1 rounded-sm text-white"
            >
              Submit Answer
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-100 bg-gray-200 p-6 rounded-md">
        <p className="text-lg font-semibold text-center mb-4">{question.questionText}</p>
        
        {renderQuestionInput()}

        {hasAnswered && (
          <button 
            onClick={onNext}
            className="bg-blue-500 w-full mt-6 py-2 rounded-md text-white font-semibold hover:bg-blue-600"
          >
            {isLastQuestion ? 'Show Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}