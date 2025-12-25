import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosClient } from "@/services/base";
import { queryKeys } from "@/utils/query";
import API from "@/utils/apiRoutes";
import { ResponseData } from "@/utils/type";

interface RequestGetOtp {
  email?: string;
}
interface RequestVerifyOtp {
  code: number;
}

const useVerifyEmailCore = <Params>(
  apiPath: string,
  method: keyof typeof axiosClient
): UseMutationResult<ResponseData, Error, Params> => {
  return useMutation<ResponseData, Error, Params>({
    mutationKey: [queryKeys.public.auth.forgotPassword, apiPath],
    mutationFn: async (params) =>
      axiosClient
        .request<ResponseData>({
          url: apiPath,
          method: method as any,
          data: params,
        })
        .then((res) => res.data),
  });
};

export const useVerifyEmailGetOTPMutation = () => {
  const { mutateAsync, status } = useVerifyEmailCore<RequestGetOtp>(
    API.private.user.verifyEmailGetOtp,
    "put"
  );
  const handleGetOtp = async (email: string) => {
    const payload: RequestGetOtp = {
      email,
    };

    return mutateAsync(payload);
  };

  return { handleGetOtp, status };
};
export const useVerifyEmailOTPMutation = () => {
  const { mutateAsync, status } = useVerifyEmailCore<RequestVerifyOtp>(
    API.private.user.verifyEmailVerifyOtp,
    "post"
  );
  const handleVerifyOtp = async (code: number) => {
    const payload: RequestVerifyOtp = {
      code,
    };

    return mutateAsync(payload);
  };

  return { handleVerifyOtp, status };
};

const fetcher = async () => {
  const res = await axiosClient.get(API.private.user.verifyEmailResendOtp);
  return res.data;
};

export const useVerifyEmailResendOTP = () => {
  return useQuery({
    queryKey: [queryKeys.private.user.verifyEmail],
    queryFn: fetcher,
    enabled: false,
    retry: false,
  });
};
