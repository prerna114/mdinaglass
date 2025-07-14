import { API_BASE_URL } from "@/constant";

import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

// Use Zustand's getState() outside React components
const { logout } = useAuthStore.getState(); //
export const appAxios = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Request Interceptor (Safe localStorage access)
appAxios.interceptors.request.use((config) => {
  try {
    const tokenData = localStorage.getItem("token");
    const parsed = tokenData ? JSON.parse(tokenData) : null;
    const accessToken = parsed?.token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (err) {
    console.warn("Token parse error", err);
  }

  return config;
});

// ✅ Response Interceptor (Refresh token logic)
appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      logout();
      try {
        const newAccessToken = await refresh_Token();

        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);

          // Retry original request
        }
      } catch (e) {
        console.error("Error refreshing token", e);
      }
    }

    if (error.response && error.response.status !== 401) {
      const errorMessage =
        error.response.data?.message || "Something went wrong";
      // Optionally show error
      // alert(errorMessage);
    }

    return Promise.reject(error); // 🔄 use `reject` instead of `resolve`
  }
);
