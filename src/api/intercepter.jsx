import { API_BASE_URL } from "@/constant";
import axios from "axios";

export const appAxios = axios.create({
  baseURL: API_BASE_URL,
});
appAxios.interceptors.request.use(async (config) => {
  const data = localStorage.getItem("token");
  const accessToken = data?.token;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status == 401) {
      try {
        const newAccessTOken = await refresh_Token();
        if (newAccessTOken) {
          error.config.headers.Authorization = `Bearer ${newAccessTOken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log("Error resfreshing token");
      }
    }
    if (error.response && error.response.status != 401) {
      const errorMesage = error.response.data.message || "Something went wrong";
      //   Alert.alert(errorMesage);
    }
    return Promise.resolve(error);
  }
);
