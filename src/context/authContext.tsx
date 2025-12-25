import React, { createContext, useEffect, useMemo, useState } from "react";
import { get } from "lodash";
import { jwtDecode } from "jwt-decode";
import { getCookieStorage, removeStorageJwtToken } from "@/helper/storage";
import { useDetailUser } from "@/hooks/useDetailUser";
import { PATHS } from "@/routers/path";
import { LOCAL_STORAGE_DATA } from "@/utils/constants";

export interface AuthContextProps {
  isAuth: boolean;
  setAuth: (value: boolean) => void;
  clearAuth: () => void;
  isLoading: boolean;
  isLoadingRole: boolean;
  roles: string[];
  setRoles: (e: string[]) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();
  const checkAuthStatus = useMemo(() => {
    const access_token = getCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN);
    if (!access_token) return false;

    try {
      const tokenDecoded: any = jwtDecode(access_token);
      return tokenDecoded.exp * 1000 > Date.now();
    } catch (_error) {
      return false;
    }
  }, []);

  const userId = getCookieStorage(LOCAL_STORAGE_DATA.USER_ID) || "";
  const { data: dataDetail, isLoading: isLoadingRole } = useDetailUser(userId);
  // console.log('dataDetail', dataDetail)
  useEffect(() => {
    if (dataDetail && !isLoadingRole && userId) {
      const systemRole = get(dataDetail, "data.user.systemRoles", []);
      if (Array.isArray(systemRole) && systemRole.length > 0) {
        setRoles(systemRole);
      } else {
        setRoles([]);
      }
    } else if (!userId || (!dataDetail && !isLoadingRole)) {
      setRoles([]);
    }
  }, [dataDetail, isLoadingRole, userId]);
  useEffect(() => {
    if (!checkedAuth) {
      setIsLoading(false);
      // neu da dang nhap va het han token thi xoa cookies
      if (!checkAuthStatus && isAuth) {
        // console.log('=======Token het han , remove cookies======')

        removeStorageJwtToken();
        // navigate("/login", { replace: true });
      }

      setIsAuth(checkAuthStatus);
      setCheckedAuth(true);
    }
  }, [checkedAuth, checkAuthStatus, isAuth]);
  const setAuth = (value: boolean) => {
    setIsLoading(false);
    setIsAuth(value);
  };

  const clearAuth = () => {
    if (isAuth === false) return;

    setIsLoading(false);
    setIsAuth(false);
    setRoles([]);
    removeStorageJwtToken();

    window.location.replace(PATHS.public.login());
  };

  const contextValue = useMemo(
    () => ({ isAuth, isLoading, isLoadingRole, setAuth, clearAuth, roles, setRoles }),
    [isAuth, isLoading, isLoadingRole, roles]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
