import { LOCAL_STORAGE_DATA } from "@/utils/constants";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DataStorage {
  key: string;
  value: any;
}
export const getCookieStorage = (key: string) => Cookies.get(key);
export const hasStorageJwtToken = () => {
  return !!getCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN);
};
export const getRole = () => {
  const result = getCookieStorage(LOCAL_STORAGE_DATA.SYSTEM_ROLES);
  if (result) {
    try {
      return JSON.parse(result);
    } catch (e) {
      console.error("Error parsing roles:", e);
      return [];
    }
  }

  return [];
};

export const removeOneCookieStorage = (key: string) => {
  Cookies.remove(key);
};
export const setOneCookieStorage = (
  key: string,
  data: string | number | any,
  expires?: number
): any => {
  if (expires && expires > 0) {
    const options = {
      expires: new Date(expires),
      path: "/",
      secure: window.location.protocol === "https:",
      sameSite: "strict" as const,
    };
    Cookies.set(
      key,
      typeof data === "object" ? JSON.stringify(data) : data,
      options
    );
  } else {
    Cookies.set(key, typeof data === "object" ? JSON.stringify(data) : data);
  }
};

export const setAllCookieStorage = (data: DataStorage[]): any =>
  data.forEach((item) => setOneCookieStorage(item.key, item.value));

export const setTokenCookie = (
  access_token: string,
  userData: {
    _id: string;
    isVerifyEmail: boolean;
  }
): void => {
  const tokenDecoded: any = jwtDecode(access_token);
  const expToken = tokenDecoded.exp ? parseFloat(tokenDecoded.exp) * 1000 : 0;

  setOneCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN, access_token, expToken);
  setOneCookieStorage(LOCAL_STORAGE_DATA.EXPIRED_TOKEN, expToken, expToken);
  setOneCookieStorage(LOCAL_STORAGE_DATA.USER_ID, userData._id, expToken);
  setOneCookieStorage(
    LOCAL_STORAGE_DATA.IS_OPEN_POPUP_VERIFY,
    userData.isVerifyEmail ? false : true
  );
};

export function removeStorageJwtToken() {
  removeOneCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.EXPIRED_TOKEN);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.SYSTEM_ROLES);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.USERNAME);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.VERIFY);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.VERIFY_TOKEN);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.USER_ID);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.OPEN_KEYS);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.COLLAPSE);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.IS_OPEN_POPUP_VERIFY);
  removeOneCookieStorage(LOCAL_STORAGE_DATA.MENU_CURRENT);
}
