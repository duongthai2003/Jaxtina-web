import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import CryptoJS from "crypto-js";
import { get } from "lodash";
import { axiosClient } from "@/services/base";
import { queryKeys } from "@/utils/query";
import API from "@/utils/apiRoutes";

type CaptchaResponse = {
  image: string;
  token: string;
};

type Response = {
  data: CaptchaResponse;
};

const fetcher = async () => {
  return await axiosClient.post<Response>(API.public.getCapcha);
};

export const useCaptcha = () => {
  const [imgCap, setImgCap] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string>("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [queryKeys.common.captcha],
    queryFn: () => fetcher(),
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      const encryptedImage =
        get(data, "data.image", "") || get(data, "image", "");
      const token = get(data, "data.token", "") || get(data, "token", "");
      //   console.log("token", token);

      if (token) {
        setCaptchaToken(token);
      }

      if (encryptedImage) {
        try {
          const bytes = CryptoJS.AES.decrypt(
            encryptedImage,
            "Jaxtina_English_2023"
          );
          const originalText = bytes.toString(CryptoJS.enc.Utf8);
          //   console.log("originalText", originalText);
          setImgCap(originalText);
        } catch (err) {
          console.error("Error decrypting captcha:", err);
          setImgCap("");
        }
      }
    }
  }, [data]);

  const refreshCaptcha = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    imgCap,
    captchaToken,
    isLoading,
    error,
    refreshCaptcha,
  };
};
