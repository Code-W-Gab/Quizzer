import QuizFolder from '../../models/quizFolderSchema.mjs';
import Question from '../../models/questionSchema.mjs';

// Create a new quiz folder
export const createQuizFolder = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Quiz folder name is required' });
    }

    const quizFolder = new QuizFolder({ 
      name,
      user: req.user.id // Add user from auth middleware
    });
    await quizFolder.save();

    res.status(201).json({ 
      message: 'Quiz folder created successfully', 
      data: quizFolder 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all quiz folders for logged-in user only
export const getAllQuizFolders = async (req, res) => {
  try {
    const quizFolders = await QuizFolder.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ data: quizFolders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single quiz folder (check ownership)
export const getQuizFolder = async (req, res) => {
  try {
    const quizFolder = await QuizFolder.findOne({ 
      _id: req.params.id,
      user: req.user.id 
    });
    
    if (!quizFolder) {
      return res.status(404).json({ message: 'Quiz folder not found or access denied' });
    }

    res.status(200).json({ data: quizFolder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quiz folder (check ownership)
export const updateQuizFolder = async (req, res) => {
  try {
    const { name } = req.body;
    
    const quizFolder = await QuizFolder.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name },
      { new: true, runValidators: true }
    );

    if (!quizFolder) {
      return res.status(404).json({ message: 'Quiz folder not found or access denied' });
    }

    res.status(200).json({ 
      message: 'Quiz folder updated successfully', 
      data: quizFolder 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete quiz folder (check ownership)
export const deleteQuizFolder = async (req, res) => {
  try {
    const quizFolder = await QuizFolder.findOneAndDelete({ 
      _id: req.params.id,
      user: req.user.id 
    });

    if (!quizFolder) {
      return res.status(404).json({ message: 'Quiz folder not found or access denied' });
    }

    // Delete all questions associated with this folder
    const deletedQuestions = await Question.deleteMany({ quizFolder: req.params.id });

    res.status(200).json({ 
      message: 'Quiz folder and associated questions deleted successfully',
      deletedQuestionsCount: deletedQuestions.deletedCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};