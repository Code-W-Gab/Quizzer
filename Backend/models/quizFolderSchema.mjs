import mongoose from 'mongoose';

const quizFolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('QuizFolder', quizFolderSchema);