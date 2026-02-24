import { useState, useEffect } from "react";

export default function AnswerQuestion({ question, onAnswer, userAnswer, onNext, hasAnswered, isLastQuestion }) {
  const [inputValue, setInputValue] = useState(userAnswer || "");

  // Reset input value when question changes
  useEffect(() => {
    setInputValue(userAnswer || "");
  }, [question, userAnswer]);

  const handleOptionClick = (option) => {
    onAnswer(option);
  };

  const handleTextSubmit = () => {
    if (inputValue.trim()) {
      onAnswer(inputValue.trim());
    }
  };

  const getButtonStyle = (option) => {
    if (!hasAnswered) {
      // Before answering
      return userAnswer === option ? 'bg-blue-400 text-white' : 'bg-gray-400';
    }
  
    // After answering
    const isCorrect = option === question.correctAnswer;
    const isUserAnswer = option === userAnswer;
    
    if (isUserAnswer && isCorrect) {
      return 'bg-green-500 text-white'; // User answered correctly
    } else if (isUserAnswer && !isCorrect) {
      return 'bg-red-500 text-white'; // User answered incorrectly
    } else if (isCorrect) {
      return 'bg-green-500 text-white'; // Show correct answer
    }
    return 'bg-gray-400'; // Other options
  };

  const renderQuestionInput = () => {
    switch (question.questionType) {
      case 'true-false':
        return (
          <div className="flex flex-col gap-4 mt-4">
            <button 
              onClick={() => handleOptionClick('True')}
              disabled={hasAnswered}
              className={`rounded-md py-2 text-lg transition-colors ${
                getButtonStyle('True')
              } ${hasAnswered ? 'cursor-not-allowed' : 'hover:opacity-80'}`}
            >
              True
            </button>
            <button 
              onClick={() => handleOptionClick('False')}
              disabled={hasAnswered}
              className={`rounded-md py-2 text-lg transition-colors ${
                getButtonStyle('False')
              } ${hasAnswered ? 'cursor-not-allowed' : 'hover:opacity-80'}`}
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
                disabled={hasAnswered}
                className={`rounded-md py-2 text-lg transition-colors ${
                  getButtonStyle(option)
                } ${hasAnswered ? 'cursor-not-allowed' : 'hover:opacity-80'}`}
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
              className={`border-b-2 w-full pt-4 pb-1 text-sm focus:outline-none peer placeholder-transparent
                        ${hasAnswered 
                          ? (userAnswer === question.correctAnswer 
                              ? 'border-b-green-500 ' 
                              : 'border-b-red-500')
                          : 'border-b-gray-600 focus:border-green-600'
                        }`}
              type="text"
              placeholder="Your answer"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !hasAnswered && handleTextSubmit()}
              disabled={hasAnswered}
            />
            {!hasAnswered ? (
              <button 
                onClick={handleTextSubmit}
                className="bg-green-500 w-full mt-4 py-2 rounded-sm text-white hover:bg-green-600"
              >
                Check
              </button>
            ) : (
              userAnswer !== question.correctAnswer && (
                <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 rounded">
                  <p className="text-sm text-gray-700">Correct answer:</p>
                  <p className="font-semibold text-green-700">{question.correctAnswer}</p>
                </div>
              )
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-120 bg-gray-200 p-6 rounded-md">
        <p className="text-lg font-semibold text-center mb-4">{question.questionText}</p>
        
        {renderQuestionInput()}

        {hasAnswered && (
          <button 
            onClick={onNext}
            className="bg-green-500 w-full mt-6 py-2 rounded-md text-white font-semibold hover:bg-green-600"
          >
            {isLastQuestion ? 'Show Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}