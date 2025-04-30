import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const signup = (data) => API.post('/users/signup', data);
export const login = (data) => API.post('/users/login', data);
export const getProjects = (token) => API.get('/projects', { headers: { Authorization: `Bearer ${token}` } });
export const createProject = (data, token) => API.post('/projects', data, { headers: { Authorization: `Bearer ${token}` } });
export const getTasks = (projectId, token) => API.get(`/tasks/${projectId}`, { headers: { Authorization: `Bearer ${token}` } });
export const createTask = (data, token) => API.post('/tasks', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateTask = (id, data, token) => API.put(`/tasks/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTask = (id, token) => API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });