import express from 'express';
import { 
  createQuizFolder, 
  getAllQuizFolders, 
  getQuizFolder, 
  updateQuizFolder, 
  deleteQuizFolder 
} from '../controllers/quiz/quizFolderController.mjs';
import { 
  createQuestion, 
  getQuestionsByFolder, 
  updateQuestion, 
  deleteQuestion 
} from '../controllers/quiz/questionController.mjs';

const router = express.Router();

// Quiz Folder Routes
router.post('/folders', createQuizFolder);
router.get('/folders', getAllQuizFolders);
router.get('/folders/:id', getQuizFolder);
router.put('/folders/:id', updateQuizFolder);
router.delete('/folders/:id', deleteQuizFolder);

// Question Routes
router.post('/questions', createQuestion);
router.get('/folders/:folderId/questions', getQuestionsByFolder);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

export default router;