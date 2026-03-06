import api from "../api/axios.mjs"

export const getQuizFolder = () => api.get("/api/quiz/folders")

export const addQuizFolder = (folderName) => api.post("/api/quiz/folders", {
  name: folderName
})

export const deleteQuizFolder = (id) => api.delete(`api/quiz/folders/${id}`)

export const editQuizFolder = (id, name) => api.put(`api/quiz/folders/${id}`, {name})

export const getAllQuizByFolder = (id) => api.get(`/api/quiz/folders/${id}/questions`)

export const getQuizFolderById = (id) => api.get(`/api/quiz/folders/${id}`)

export const createShortTextQuestion = (id, question, correctAnswer) => api.post("/api/quiz/questions", {
  quizFolder: id,
  questionText: question,
  questionType: "short-text",
  correctAnswer: correctAnswer
})

export const createMultipleChoiceQuestion = (id, question, correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3) => api.post("/api/quiz/questions", {
  quizFolder: id,
  questionText: question,
  questionType: "multiple-choice",
  options: [wrongAnswer1, wrongAnswer2, wrongAnswer3],
  correctAnswer: correctAnswer
})

export const createTrueFalseQuestion = (id, question, correctAnswer) => api.post("/api/quiz/questions", {
  quizFolder: id,
  questionText: question,
  questionType: "true-false",
  correctAnswer: correctAnswer
})


// Generate share code for a quiz folder
export const generateShareCode = async (folderId) => {
  const response = await api.post(`/api/quiz/folder/${folderId}/share`); // ✅ Add /api
  return response.data;
};

// Import quiz folder using share code
export const importQuizByShareCode = async (shareCode) => {
  const response = await api.post('/api/quiz/folder/import', { shareCode }); // ✅ Add /api
  return response.data;
};

// Disable sharing for a quiz folder
export const disableSharing = async (folderId) => {
  const response = await api.delete(`/api/quiz/folder/${folderId}/share`); // ✅ Add /api
  return response.data;
};