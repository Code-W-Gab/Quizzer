import api from "../api/axios.mjs"

export const getQuizFolder = () => api.get("/api/quiz/folders")

export const addQuizFolder = (folderName) => api.post("/api/quiz/folders", {
  name: folderName
})

export const getAllQuizByFolder = (id) => api.get(`/api/quiz/folders/${id}/questions`)