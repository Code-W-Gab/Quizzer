import Question from '../../models/questionSchema.mjs';
import QuizFolder from '../../models/quizFolderSchema.mjs';

// Create a new question (verify folder ownership)
export const createQuestion = async (req, res) => {
  try {
    const { quizFolder, questionText, questionType, options, correctAnswer } = req.body;

    // Verify folder belongs to user
    const folder = await QuizFolder.findOne({ _id: quizFolder, user: req.user.id });
    if (!folder) {
      return res.status(403).json({ message: 'Access denied' });
    }

    let finalCorrectAnswer = correctAnswer;
    if (questionType === 'true-false') {
      if (correctAnswer.toLowerCase() === 'true') {
        finalCorrectAnswer = 'True';
      } else if (correctAnswer.toLowerCase() === 'false') {
        finalCorrectAnswer = 'False';
      }
    }
    
    const question = new Question({
      quizFolder,
      questionText,
      questionType,
      options: questionType === 'multiple-choice' ? options : [],
      correctAnswer: finalCorrectAnswer
    });

    await question.save();

    res.status(201).json({ 
      message: 'Question created successfully', 
      data: question 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all questions for a quiz folder (verify ownership)
export const getQuestionsByFolder = async (req, res) => {
  try {
    // Verify folder belongs to user
    const folder = await QuizFolder.findOne({ 
      _id: req.params.folderId, 
      user: req.user.id 
    });
    
    if (!folder) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const questions = await Question.find({ quizFolder: req.params.folderId });
    res.status(200).json({ data: questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update question (verify ownership)
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('quizFolder');
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Verify folder belongs to user
    if (question.quizFolder.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      message: 'Question updated successfully', 
      data: updatedQuestion 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete question (verify ownership)
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('quizFolder');
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Verify folder belongs to user
    if (question.quizFolder.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Question.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get questions from multiple folders (verify ownership)
export const getQuestionsByMultipleFolders = async (req, res) => {
  try {
    const { folderIds } = req.body;

    if (!folderIds || !Array.isArray(folderIds) || folderIds.length === 0) {
      return res.status(400).json({ message: 'Folder IDs array is required' });
    }

    // Verify all folders belong to user
    const folders = await QuizFolder.find({ 
      _id: { $in: folderIds },
      user: req.user.id 
    });

    if (folders.length !== folderIds.length) {
      return res.status(403).json({ message: 'Access denied to some folders' });
    }

    const questions = await Question.find({ 
      quizFolder: { $in: folderIds } 
    });

    res.status(200).json({ data: questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};