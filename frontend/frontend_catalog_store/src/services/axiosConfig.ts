import axios, { type InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token_access = sessionStorage.getItem("token_access");

    if (token_access) {
      config.headers.Authorization = `Bearer ${token_access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.status === 401 &&
      sessionStorage.getItem("token_refresh")
    ) {
      // logica de refrescar el token
      try {
        const token_refresh = sessionStorage.getItem("token_refresh")!;
        const response = await axios.post(
          `${error.config.url}api/token/refresh/`,
          {
            refresh: token_refresh,
          }
        );
        const newTokenAccess = response.data.access;
        if (newTokenAccess) {
          sessionStorage.setItem("token_access", newTokenAccess);
          error.config.headers["Authorization"] = `Bearer ${newTokenAccess}`;
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.log("Error refreshing token: " + refreshError);
      }
    }

    return Promise.reject(error);
  }
);
