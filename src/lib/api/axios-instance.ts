import axios from 'axios';

const API_URL_5000 = import.meta.env.VITE_API_URL_5000 || 'http://127.0.0.1:5000';
const API_URL_5001 = import.meta.env.VITE_API_URL_5001 || 'http://127.0.0.1:5001';

export const axiosInstance5000 = axios.create({
  baseURL: API_URL_5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosInstance5001 = axios.create({
  baseURL: API_URL_5001,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Apply interceptors to both instances
const applyInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = '/home';
      }
      return Promise.reject(error);
    }
  );
};

applyInterceptors(axiosInstance5000);
applyInterceptors(axiosInstance5001);