// filepath: c:\Users\Admin\Documents\code\FULL STACK\Project\github\Quizzer\Frontend\src\components\Exam\ExamTime.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestionsByMultipleFolders } from "../../services/questionService";
import { shuffleArray } from "../../utils/shuffleArray";
import Header from "./Header";
import AnswerQuestion from "./AnswerQuestion";
import ExamResults from "./ExamResults";
import toast from "react-hot-toast";

export default function ExamTime() {
  const location = useLocation();
  const navigate = useNavigate();
  const { folderIds } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!folderIds || folderIds.length === 0) {
      toast.error("No quizzes selected!");
      navigate("/Exam");
      return;
    }

    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getQuestionsByMultipleFolders(folderIds);
      const shuffledQuestions = shuffleArray(response.data.data);
      
      // Randomize options for multiple-choice questions
      const questionsWithShuffledOptions = shuffledQuestions.map(q => {
        if (q.questionType === 'multiple-choice') {
          const allOptions = [...q.options, q.correctAnswer];
          return {
            ...q,
            shuffledOptions: shuffleArray(allOptions)
          };
        }
        return q;
      });

      setQuestions(questionsWithShuffledOptions);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load questions");
      console.error(error);
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Show results
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: ((correct / questions.length) * 100).toFixed(2)
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">No questions found in selected folders.</p>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return <ExamResults score={score} questions={questions} userAnswers={userAnswers} />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = userAnswers[currentQuestionIndex] !== undefined;

  return(
    <div>
      <Header 
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
      <AnswerQuestion 
        question={currentQuestion}
        onAnswer={handleAnswer}
        userAnswer={userAnswers[currentQuestionIndex]}
        onNext={handleNext}
        hasAnswered={hasAnswered}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    </div>
  )
}