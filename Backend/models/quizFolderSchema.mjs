import mongoose from 'mongoose';

const quizFolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // NEW FIELDS FOR SHARING
  shareCode: {
    type: String,
    unique: true,
    sparse: true, // allows null values but enforces uniqueness for non-null
    index: true
  },
  isShared: {
    type: Boolean,
    default: false
  },
  sharedBy: {
    type: String, // Store the creator's name for display
    default: null
  }
}, { timestamps: true });

export default mongoose.model('QuizFolder', quizFolderSchema);