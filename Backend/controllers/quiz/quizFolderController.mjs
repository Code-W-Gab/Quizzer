import QuizFolder from '../../models/quizFolderSchema.mjs';

// Create a new quiz folder
export const createQuizFolder = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Quiz folder name is required' });
    }

    const quizFolder = new QuizFolder({ name });
    await quizFolder.save();

    res.status(201).json({ 
      message: 'Quiz folder created successfully', 
      data: quizFolder 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all quiz folders
export const getAllQuizFolders = async (req, res) => {
  try {
    const quizFolders = await QuizFolder.find().sort({ createdAt: -1 });
    res.status(200).json({ data: quizFolders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single quiz folder
export const getQuizFolder = async (req, res) => {
  try {
    const quizFolder = await QuizFolder.findById(req.params.id);
    
    if (!quizFolder) {
      return res.status(404).json({ message: 'Quiz folder not found' });
    }

    res.status(200).json({ data: quizFolder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quiz folder
export const updateQuizFolder = async (req, res) => {
  try {
    const { name } = req.body;
    
    const quizFolder = await QuizFolder.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!quizFolder) {
      return res.status(404).json({ message: 'Quiz folder not found' });
    }

    res.status(200).json({ 
      message: 'Quiz folder updated successfully', 
      data: quizFolder 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete quiz folder
export const deleteQuizFolder = async (req, res) => {
  try {
    const quizFolder = await QuizFolder.findByIdAndDelete(req.params.id);

    if (!quizFolder) {
      return res.status(404).json({ message: 'Quiz folder not found' });
    }

    res.status(200).json({ message: 'Quiz folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};