import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/query";
import { axiosClient } from "@/services/base";
import API from "@/utils/apiRoutes";

type Response = {
  data: any;
};

const fetcher = async () => {
  return await axiosClient.get<Response>(`${API.private.user.detailUser}`);
};

export const useDetailUser = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.private.user.profile, id],
    queryFn: () => fetcher(),
    select: (data: any) => {
      return data;
    },
    enabled: !!id,
  });
};
