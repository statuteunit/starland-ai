import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers = config.headers || {};
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if (typeof window !== "undefined" && status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
      return Promise.reject(error);
    } else if (status === 403 || status === 404 || status === 429 || (status && status >= 500)) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;