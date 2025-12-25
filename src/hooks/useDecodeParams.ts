import { useSearchParams } from "react-router-dom";

const useDecodedParams = <T extends Record<string, any>>() => {
  const [searchParams] = useSearchParams();
  const encodeParams = searchParams.get("params") || "";
  let params: T = {} as T;

  if (encodeParams) {
    try {
      params = JSON.parse(decodeURIComponent(encodeParams));
    } catch (error) {
      console.error("Failed to parse params:", error);
    }
  }

  return params;
};

export default useDecodedParams;
