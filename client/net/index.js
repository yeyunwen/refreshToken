import axios from "../node_modules/axios/dist/esm/axios.js";
import { refreshToken, isRefresh } from "./refreshToken.js";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  token && (config.headers.Authorization = `Bearer ${token}`);
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 402 && !isRefresh(error.config)) {
      console.log("token过期");
      const isSuccess = await refreshToken();
      if (isSuccess) {
        const token = localStorage.getItem("access_token");
        error.config.headers.Authorization = `Bearer ${token}`;
        return request(error.config);
      } else {
        console.log("refreshToken过期 前往登录");
      }
    }
  }
);

export default request;
