import QuizFolder from '../../models/quizFolderSchema.mjs';
import Question from '../../models/questionSchema.mjs';
import crypto from 'crypto';

// Generate share code for a quiz folder
export const generateShareCode = async (req, res) => {
  try {
    const quizFolder = await QuizFolder.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!quizFolder) {
      return res.status(404).json({ message: 'Quiz folder not found or access denied' });
    }

    // Generate unique share code
    let shareCode;
    let isUnique = false;
    
    while (!isUnique) {
      shareCode = crypto.randomBytes(4).toString('hex').toUpperCase();
      const existing = await QuizFolder.findOne({ shareCode });
      if (!existing) isUnique = true;
    }

    // Get user info for sharedBy
    const User = (await import('../../models/userSchema.mjs')).default;
    const user = await User.findById(req.user.id);

    quizFolder.shareCode = shareCode;
    quizFolder.isShared = true;
    quizFolder.sharedBy = user.name || user.email;
    await quizFolder.save();

    res.status(200).json({
      message: 'Share code generated successfully',
      shareCode: shareCode,
      data: quizFolder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Import/Clone quiz folder using share code
export const importQuizByShareCode = async (req, res) => {
  try {
    const { shareCode } = req.body;

    if (!shareCode) {
      return res.status(400).json({ message: 'Share code is required' });
    }

    // Find the shared quiz folder
    const originalFolder = await QuizFolder.findOne({ 
      shareCode: shareCode.toUpperCase(),
      isShared: true 
    });

    if (!originalFolder) {
      return res.status(404).json({ message: 'Invalid or inactive share code' });
    }

    // Check if user already imported this folder
    const alreadyImported = await QuizFolder.findOne({
      user: req.user.id,
      name: originalFolder.name,
      sharedBy: originalFolder.sharedBy
    });

    if (alreadyImported) {
      return res.status(400).json({ 
        message: 'You have already imported this quiz folder' 
      });
    }

    // Create a copy for the current user
    const newFolder = new QuizFolder({
      name: originalFolder.name,
      user: req.user.id,
      isShared: false, // The copy is not shared by default
      sharedBy: originalFolder.sharedBy // Track who originally created it
    });

    await newFolder.save();

    // Copy all questions from the original folder
    const originalQuestions = await Question.find({ 
      quizFolder: originalFolder._id 
    });

    const copiedQuestions = originalQuestions.map(q => ({
      quizFolder: newFolder._id,
      questionText: q.questionText,
      questionType: q.questionType,
      options: q.options,
      correctAnswer: q.correctAnswer
    }));

    if (copiedQuestions.length > 0) {
      await Question.insertMany(copiedQuestions);
    }

    res.status(201).json({
      message: 'Quiz folder imported successfully',
      data: newFolder,
      questionsCount: copiedQuestions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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