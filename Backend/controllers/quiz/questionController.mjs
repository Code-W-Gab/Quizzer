import Question from '../../models/questionSchema.mjs';

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { quizFolder, questionText, questionType, options, correctAnswer } = req.body;

    const question = new Question({
      quizFolder,
      questionText,
      questionType,
      options: questionType === 'multiple-choice' ? options : [],
      correctAnswer
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

// Get all questions for a quiz folder
export const getQuestionsByFolder = async (req, res) => {
  try {
    const questions = await Question.find({ quizFolder: req.params.folderId });
    res.status(200).json({ data: questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ 
      message: 'Question updated successfully', 
      data: question 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get questions from multiple folders
export const getQuestionsByMultipleFolders = async (req, res) => {
  try {
    const { folderIds } = req.body;

    if (!folderIds || !Array.isArray(folderIds) || folderIds.length === 0) {
      return res.status(400).json({ message: 'Folder IDs array is required' });
    }

    const questions = await Question.find({ 
      quizFolder: { $in: folderIds } 
    });

    res.status(200).json({ data: questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};