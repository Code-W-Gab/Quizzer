import api from "../api/axios.mjs";

export const getQuestionsByMultipleFolders = (folderIds) => api.post("/api/quiz/questions/multiple-folders", {
  folderIds: folderIds
})

export const deleteQuestion = (id) => api.delete(`/api/quiz/questions/${id}`)

export const getQuestionById = (id) => api.get(`/api/quiz/questions/${id}`)

export const editQuestion = (id, questionData) => api.put(`/api/quiz/questions/${id}`, questionData)