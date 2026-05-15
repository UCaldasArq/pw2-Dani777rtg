import axios from 'axios';

/**
 * Default `/api` = same origin (Vite proxy in dev, Nginx proxy in Docker).
 * Override at build time: VITE_API_BASE_URL=http://localhost:8082/api
 */
const raw = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL =
  typeof raw === 'string' && raw.trim() !== '' ? raw.trim().replace(/\/$/, '') : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
