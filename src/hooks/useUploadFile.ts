import { useMutation } from "@tanstack/react-query";
import { get } from "lodash";
import { queryKeys } from "@/utils/query";
import { axiosClient } from "@/services/base";
import { sanitizeFilename } from "@/utils/func/sanitizeFilename";

const APIs = {
  upload: "api/file/data/single",
};

type UploadResponse = {
  url?: string;
  path?: string;
  name?: string;
  [key: string]: unknown;
};

type UploadParams = {
  file: File | Blob;
  fieldName?: string;
  filename?: string;
  extraFields?: Record<string, string | Blob>;
  isPublic?: boolean;
};

const buildFormData = ({ file, fieldName = "file", filename, extraFields, isPublic = true }: UploadParams) => {
  const formData = new FormData();
  const originalName = filename ?? (file instanceof File ? file.name : undefined);
  const safeName = sanitizeFilename(originalName);

  formData.append(fieldName, file, safeName);
  formData.append("filename", safeName);

  if (extraFields) {
    Object.entries(extraFields).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  formData.append("public", String(isPublic));

  return formData;
};

const getUrlFromResponse = (response: UploadResponse): string => {
  const directUrl = get(response, "url", "");
  if (typeof directUrl === "string" && directUrl.length > 0) {
    return directUrl;
}

  const nestedUrl = get(response, "data.url", "");
  if (typeof nestedUrl === "string" && nestedUrl.length > 0) {
    return nestedUrl;
  }

  return "";
};

export const useUploadFileMutation = () => {
  const mutation = useMutation<UploadResponse, Error, FormData>({
    mutationKey: [queryKeys.common.uploadFile],
    mutationFn: (formData) =>
      axiosClient.post<FormData, UploadResponse>(APIs.upload, formData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
      }),
  });

  const uploadFile = async (params: UploadParams): Promise<string> => {
    const formData = buildFormData(params);
    const response = await mutation.mutateAsync(formData);
    return getUrlFromResponse(response);
  };

  return { ...mutation, uploadFile };
};
