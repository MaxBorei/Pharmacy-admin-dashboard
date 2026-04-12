import axios from "axios";
import { refreshSession } from "./auth";

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
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }
    const url = error.config?.url;
    const isLoginRequest = url?.includes("/login");
    const isRefreshRequest = url?.includes("/refresh");
    const hasRetried = originalRequest._retry;

    if (status === 401 && !isLoginRequest && !isRefreshRequest && !hasRetried) {
      originalRequest._retry = true;
      try {
        await refreshSession();
        const token = localStorage.getItem("accessToken");
        if (token && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
        if (!token || !originalRequest.headers) {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          return;
        }
      } catch {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return;
      }
    }

    return Promise.reject(error);
  },
);
