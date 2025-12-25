import { useMutation } from "@tanstack/react-query";
import { removeStorageJwtToken, setTokenCookie } from "@/helper/storage";
import { axiosClient } from "@/services/base";

import { queryKeys } from "@/utils/query";

import { get } from "lodash";
import API from "@/utils/apiRoutes";

type Request = {
  email?: string;
  phone_number?: string;
  password: string;
};

type Response = {
  token?: string;
  isVerified?: boolean;
  verify_token?: string;
  id?: string;
  roles?: string[];
  code?: string;
  error?: string;
};

export const useLoginMutation = () => {
  async function requestFn(params: Request) {
    return axiosClient.post<Request, Response>(API.public.login, params);
  }

  const mutation = useMutation<Response, Error, Request>({
    mutationKey: [queryKeys.public.auth.login],
    mutationFn: requestFn,
  });

  const { mutateAsync, status } = mutation;

  const handleLogin = async (
    identifier: string,
    password: string,
    type: "email" | "phone"
  ) => {
    try {
      removeStorageJwtToken();

      const payload: Request = {
        password,
        ...(type === "email"
          ? { email: identifier }
          : { phone_number: identifier }),
      };

      const data: any = await mutateAsync(payload);
      // check save token
      // setOneCookieStorage(LOCAL_STORAGE_DATA.VERIFY, data.isVerified);
      const accessToken = get(data, "data.accessToken", "");
      if (accessToken !== "") {
        const userId = get(data, "data.user._id", "");
        const isVerifyEmail = get(
          data,
          "data.user.emailVerify.verified",
          false
        );
        setTokenCookie(data.data?.accessToken, {
          _id: userId,
          isVerifyEmail,
        });
      }
      return data;
    } catch (err) {
      throw err;
    }
  };

  return { handleLogin, status };
};
