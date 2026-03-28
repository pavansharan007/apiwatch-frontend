import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('apiwatch_token')}`,
});

export const login = (data) => axios.post(`${BASE}/auth/login`, data);
export const register = (data) => axios.post(`${BASE}/auth/register`, data);
export const getProjects = () => axios.get(`${BASE}/projects`, { headers: getHeaders() });
export const createProject = (data) => axios.post(`${BASE}/projects`, data, { headers: getHeaders() });
export const deleteProject = (id) => axios.delete(`${BASE}/projects/${id}`, { headers: getHeaders() });
export const getSummary = (params) => axios.get(`${BASE}/analytics/summary`, { params, headers: getHeaders() });
export const getEndpoints = (params) => axios.get(`${BASE}/analytics/endpoints`, { params, headers: getHeaders() });
export const getTimeseries = (params) => axios.get(`${BASE}/analytics/timeseries`, { params, headers: getHeaders() });
