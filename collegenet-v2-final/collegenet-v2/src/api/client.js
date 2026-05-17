// src/api/client.js
import axios from 'axios';

export const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const client = axios.create({
  baseURL: BASE,
  withCredentials: true,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach token if present
client.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('ctf_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — unwrap data or capture error
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem('ctf_token');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

export default client;

// Helper: returns { ok, status, data, headers, raw } — same shape as original
export async function apiFetch(url, opts = {}) {
  try {
    const res = await client({
      url,
      method: opts.method || 'GET',
      data: opts.body ? JSON.parse(opts.body) : undefined,
      ...opts,
    });
    return {
      ok: true,
      status: res.status,
      data: res.data,
      headers: res.headers,
      raw: JSON.stringify(res.data),
    };
  } catch (err) {
    return {
      ok: false,
      status: err.response?.status ?? 0,
      data: err.response?.data ?? null,
      headers: err.response?.headers ?? {},
      raw: String(err),
    };
  }
}
