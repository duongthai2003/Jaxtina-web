import { getCookieStorage, removeStorageJwtToken } from "@/helper/storage";
import { LOCAL_STORAGE_DATA } from "@/utils/constants";
import axios from "axios";
const token = getCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN);
const axiosClientAdmin = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  // timeout: 10000,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || ""}`,
  },
});

axiosClientAdmin.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    const accessToken = getCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN);

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosClientAdmin.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (!error.response || !error.response.data) {
      // message.error(MESSAGES.MC0);
      return Promise.reject(error);
    }

    switch (error.response.status) {
      case 401:
        removeStorageJwtToken();
        break;
      case 403:
        if (error.response.data.code === 403) {
          console.error(error);
        }
        break;

      case 404:
        break;

      case 500:
        break;

      default:
        break;
    }

    return Promise.reject(error);
  }
);

export { axiosClientAdmin };
