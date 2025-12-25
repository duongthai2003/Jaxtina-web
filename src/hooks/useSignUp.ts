import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/utils/query";
import { axiosClient } from "@/services/base";
import API from "@/utils/apiRoutes";

type Request = {};

export const useSignUpMutation = () => {
  async function requestFn(params: Request) {
    return axiosClient.post<Request, Response>(API.public.register, params);
  }

  const mutation = useMutation<Response, Error, Request>({
    mutationKey: [queryKeys.public.auth.register],
    mutationFn: requestFn,
  });

  const { mutateAsync, status } = mutation;
  const handleSignUp = async (payload: Request) => {
    try {
      const data: any = await mutateAsync(payload);

      return data;
    } catch (err) {
      throw err;
    }
  };

  return { handleSignUp, status };
};
