import axios from "axios";
import { get } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getCookieStorage } from "@/helper/storage";
import { LOCAL_STORAGE_DATA } from "@/utils/constants";
import { queryKeys } from "@/utils/query";
import { ErrorMessage } from "@/utils/error";

interface UseFetchImageOptions {
  src: string;
  isAuth?: boolean;
  enabled?: boolean;
}

export const useFetchImage = ({ src, isAuth = false, enabled = true }: UseFetchImageOptions) => {
  return useQuery({
    queryKey: [queryKeys.common.image, src, isAuth],
    queryFn: async () => {
      if (!isAuth) {
        return src;
      }

      const token = getCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN);
      if (!token) {
        throw new Error(ErrorMessage.MISS_TOKEN);
      }

      const response = await axios.get(src, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = get(response, "data", "");
    //   console.log("result", result);
      if (result) {
        return URL.createObjectURL(result);
      }

      throw new Error(ErrorMessage.FAILED_TO_FETCH_IMAGE);
    },
    enabled: enabled && !!src && isAuth,
  });
};

