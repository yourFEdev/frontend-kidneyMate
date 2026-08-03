import axios from "axios";
import { useAuthStore } from "../stores/auth";
import router from "../router";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const auth = useAuthStore();
      await auth.logout();
      router.push("/login");
    }
    return Promise.reject(error);
  },
);

export default api;
