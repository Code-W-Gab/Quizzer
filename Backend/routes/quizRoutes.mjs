import express from 'express';
import auth from '../middleware/auth.mjs';
import { 
  createQuizFolder, 
  getAllQuizFolders, 
  getQuizFolder, 
  updateQuizFolder, 
  deleteQuizFolder, 
  generateShareCode, 
  importQuizByShareCode
} from '../controllers/quiz/quizFolderController.mjs';
import { 
  createQuestion, 
  getQuestionsByFolder, 
  updateQuestion, 
  deleteQuestion,
  getQuestionsByMultipleFolders 
} from '../controllers/quiz/questionController.mjs';

const router = express.Router();

// Quiz Folder Routes
router.post('/folders', auth, createQuizFolder);
router.get('/folders', auth, getAllQuizFolders);
router.get('/folders/:id', auth, getQuizFolder);
router.put('/folders/:id', auth, updateQuizFolder);
router.delete('/folders/:id', auth, deleteQuizFolder);

// NEW SHARING ROUTES
router.post('/folder/:id/share', auth, generateShareCode);
router.post('/folder/import', auth, importQuizByShareCode);

// Question Routes
router.post('/questions', auth, createQuestion);
router.get('/folders/:folderId/questions', auth, getQuestionsByFolder);
router.post('/questions/multiple-folders', auth, getQuestionsByMultipleFolders);
router.put('/questions/:id', auth, updateQuestion);
router.delete('/questions/:id', auth, deleteQuestion);

export default router;