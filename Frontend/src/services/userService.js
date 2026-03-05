import api from "../api/axios.mjs";

export const login = (email, password) => api.post('/api/user/login', {email, password})

export const register = (name, email, password) => api.post('/api/user/register', {name, email, password})