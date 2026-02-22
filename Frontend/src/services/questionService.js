import api from "../api/axios.mjs";

export const getQuestionsByMultipleFolders = (folderIds) => api.post("/api/quiz/questions/multiple-folders", {
  folderIds: folderIds
})