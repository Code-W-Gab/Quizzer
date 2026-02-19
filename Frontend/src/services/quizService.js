import api from "../api/axios.mjs"

export const getQuizFolder = () => api.get("/api/quiz/folders")

export const addQuizFolder = () => api.post("/api/quiz/folders")