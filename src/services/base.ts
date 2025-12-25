import { getCookieStorage, removeStorageJwtToken } from "@/helper/storage";
import { LOCAL_STORAGE_DATA } from "@/utils/constants";
import axios from "axios";
const token = getCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN);
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  // timeout: 10000,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || ""}`,
  },
});

axiosClient.interceptors.request.use(
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

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
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

// const postAPI = (url: string, data?: any, config?: any | undefined) => {
//   return axiosClient.post(url, data, config);
// };
// const refreshAccessToken = (accessToken: string, refreshToken: string) =>
//   postAPI('/auth/refresh-access-token', { accessToken, refreshToken });

// axiosClient.interceptors.response.use(
//   (res: any) => {
//     return res;
//   },
//   async (err: any) => {
//     const originalConfig = err.config;
//     if (err.response) {
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;
//         const accessToken = getCookieStorage(ACCESS_TOKEN) ?? '';
//         const refreshToken = getCookieStorage(EXPIRED_TOKEN) ?? '';
//         if (refreshToken) {
//           try {
//             const rs = await refreshAccessToken(accessToken, refreshToken);
//             const { accessToken: newAccessToken, refreshToken: newRefreshToken } = rs.data.data;
//             setOneCookieStorage('accessToken', newAccessToken);
//             setOneCookieStorage('refreshToken', newRefreshToken);
//             originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
//             return axiosClient(originalConfig);
//           } catch (_error) {
//             removeStorageJwtToken();
//             if (accessToken) {
//               removeStorageJwtToken();
//             }
//             return Promise.reject(_error);
//           }
//         } else {
//           if (accessToken) {
//             removeStorageJwtToken();
//           }
//         }
//       }
//       return Promise.reject(err);
//     }
//     return Promise.reject(err);
//   },
// );

export { axiosClient };
