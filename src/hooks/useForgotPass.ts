import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosClient } from "@/services/base";
import { queryKeys } from "@/utils/query";
import API from "@/utils/apiRoutes";
import { ResponseData } from "@/utils/type";

interface RequestSendOtp {
  email?: string;
}
interface RequestVerifyOtp extends RequestSendOtp {
  code: number;
}
interface RequestResetPass extends RequestVerifyOtp {
  password: string;
}

const useForgotPassCore = <Params>(
  apiPath: string
): UseMutationResult<ResponseData, Error, Params> => {
  return useMutation<ResponseData, Error, Params>({
    mutationKey: [queryKeys.public.auth.forgotPassword, apiPath],
    mutationFn: async (params) =>
      axiosClient.post<Params, ResponseData>(apiPath, params),
  });
};

export const useForgotPassMutation = () => {
  const { mutateAsync, status } = useForgotPassCore<RequestSendOtp>(
    API.public.forgotPassSendOtp
  );
  const handleSendOtp = async (email: string) => {
    const payload: RequestSendOtp = {
      email,
    };

    return mutateAsync(payload);
  };

  return { handleSendOtp, status };
};
export const useVerifyOtpMutation = () => {
  const { mutateAsync, status } = useForgotPassCore<RequestVerifyOtp>(
    API.public.forgotPassVerifyOtp
  );
  const handleVerifyOtpSendOtp = async ({ email, code }: RequestVerifyOtp) => {
    const payload: RequestVerifyOtp = {
      email,
      code,
    };

    return mutateAsync(payload);
  };

  return { handleVerifyOtpSendOtp, status };
};
export const useSetNewPassMutation = () => {
  const { mutateAsync, status } = useForgotPassCore<RequestResetPass>(
    API.public.forgotPassSetNewPass
  );
  const handleResetPass = async ({
    email,
    code,
    password,
  }: RequestResetPass) => {
    const payload: RequestResetPass = {
      email,
      code,
      password,
    };

    return mutateAsync(payload);
  };

  return { handleResetPass, status };
};
