import api from "../api/axios.mjs"

export const getQuizFolder = () => api.get("/api/quiz/folders")

export const addQuizFolder = (folderName) => api.post("/api/quiz/folders", {
  name: folderName
})

export const getAllQuizByFolder = (id) => api.get(`/api/quiz/folders/${id}/questions`)

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