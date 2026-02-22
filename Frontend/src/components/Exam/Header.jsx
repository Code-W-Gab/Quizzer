export default function Header({ currentQuestion, totalQuestions }) {
  return (
    <div className="bg-green-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Exam</h1>
      <p className="text-lg">
        Question {currentQuestion} of {totalQuestions}
      </p>
    </div>
  );
}