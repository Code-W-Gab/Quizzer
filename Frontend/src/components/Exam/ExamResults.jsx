import { useNavigate } from "react-router-dom";

export default function ExamResults({ score, questions, userAnswers }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-300 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Exam Results</h1>
        
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 mb-8 text-center">
          <p className="text-5xl font-bold text-green-600 mb-2">{score.percentage}%</p>
          <p className="text-xl">
            You got <span className="font-bold">{score.correct}</span> out of{" "}
            <span className="font-bold">{score.total}</span> correct
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Review Your Answers</h2>
        
        <div className="space-y-4">
          {questions.map((question, index) => {
            const isCorrect = userAnswers[index] === question.correctAnswer;
            
            return (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                }`}
              >
                <p className="font-semibold mb-2">
                  {index + 1}. {question.questionText}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Your Answer:</span>{" "}
                  <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {userAnswers[index] || 'Not answered'}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-sm">
                    <span className="font-semibold">Correct Answer:</span>{" "}
                    <span className="text-green-600">{question.correctAnswer}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/Exam')}
          className="w-full bg-green-500 text-white py-3 rounded-md mt-8 font-semibold hover:bg-green-600"
        >
          Back to Exam Page
        </button>
      </div>
    </div>
  );
}