import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    const isLoginRequest = url?.includes("/login");

    if (status === 401 && !isLoginRequest) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
