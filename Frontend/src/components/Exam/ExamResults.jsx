import Header from "../Quizzes/Quiz/Header";

export default function ExamResults({ score, questions, userAnswers, onRetake }) {

  // Add partial match function
  const isPartialMatch = (userAns, correctAns) => {
    if (!userAns || !correctAns) return false;
    
    const userLower = userAns.trim().toLowerCase();
    const correctLower = correctAns.trim().toLowerCase();
    
    if (userLower === correctLower) return true;
    
    if (userLower.length >= 1 && correctLower.includes(userLower)) {
      return true;
    }
    
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-300 dark:dark:bg-[#222222]">
      <Header name={"Review"} to={'/Exam'}/>
      <div className="p-6 md:p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-600 rounded-lg shadow-lg p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 dark:text-white">Exam Results</h1>
          
          <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-6 mb-8 text-center">
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{score.percentage}%</p>
            <p className="text-lg md:text-xl">
              You got <span className="font-bold">{score.correct}</span> out of{" "}
              <span className="font-bold">{score.total}</span> correct
            </p>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold mb-4 dark:text-white">Review Your Answers</h2>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              // Check if answer is correct based on question type
              const isCorrect = question.questionType === 'short-text'
                ? isPartialMatch(userAnswers[index], question.correctAnswer)
                : userAnswers[index] === question.correctAnswer;
              
              const isExactMatch = userAnswers[index] === question.correctAnswer;
              
              return (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'bg-blue-50 dark:bg-blue-100 border-blue-500' : 'bg-red-50 dark:bg-red-100 border-red-500'
                  }`}
                >
                  <p className="font-semibold mb-2">
                    {index + 1}. {question.questionText}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Your Answer:</span>{" "}
                    <span className={isCorrect ? 'text-blue-600' : 'text-red-600'}>
                      {userAnswers[index] || 'Not answered'}
                    </span>
                  </p>
                  {isCorrect && !isExactMatch && question.questionType === 'short-text' && (
                    <p className="text-sm">
                      <span className="font-semibold">Complete Answer:</span>{" "}
                      <span className="text-blue-600">{question.correctAnswer}</span>
                    </p>
                  )}
                  {!isCorrect && (
                    <p className="text-sm">
                      <span className="font-semibold">Correct Answer:</span>{" "}
                      <span className="text-blue-500">{question.correctAnswer}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button 
            onClick={onRetake}
            className="w-full bg-blue-500 text-white py-3 rounded-md mt-8 font-semibold hover:bg-blue-600"
          >
            Retake
          </button>
        </div>
      </div>
    </div>
  );
}