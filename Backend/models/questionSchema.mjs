import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  quizFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizFolder',
    required: true
  },
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  questionType: {
    type: String,
    enum: ['true-false', 'short-text', 'multiple-choice'],
    required: true
  },
  // For multiple choice
  options: [{
    type: String,
    trim: true
  }],
  // Correct answer (can be index for multiple choice, 'true'/'false' for true-false, or text for short-text)
  correctAnswer: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Question', questionSchema);