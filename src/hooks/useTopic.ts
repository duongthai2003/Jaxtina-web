import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";
import { message } from "antd";
import { get } from "lodash";
import { axiosClientAdmin } from "@/services/baseAdmin";
import { axiosClient } from "@/services/base";
import API from "@/utils/apiRoutes";
import { queryKeys } from "@/utils/query";
import { TopicErrorCode, TopicErrorDescription } from "@/utils/error";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Topic {
  _id: string;
  name: string;
  code: string;
  bookId: string;
  description: string;
  image: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
  imageSrc?: string;
}

export interface TopicResponse {
  data: Topic[];
}
export type TopicListResponse = {
  data: Topic[];
};

export interface TopicPaginationResponse {
  data: Topic[];
  pagination: Pagination | Pagination[];
}

export interface CreateTopicPayload {
  name: string;
  code: string;
  bookId: string;
  description: string;
  image: string;
  order: number;
}

export interface CreateOrUpdateTopicResponse {
  data: Topic;
  statusCode?: number;
}

export interface UpdateTopicPayload {
  name?: string;
  code?: string;
  bookId?: string;
  description?: string;
  image?: string;
  order?: number;
}

const TOPIC_API = API.private.user.topicAll;

const blobToDataUrl = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const getTopicImageWithToken = async (imagePath: string): Promise<string> => {
  const response = await axiosClientAdmin.get(imagePath, {
    responseType: "blob"
  });
  const blob = response.data as Blob;
  return blobToDataUrl(blob);
};

const withTopicImages = async <
  T extends TopicResponse | TopicPaginationResponse
>(
  response: T
): Promise<T> => {
  const dataWithImages = await Promise.all(
    response.data.map(async (topic) => {
      if (!topic.image) return topic;
      try {
        const imageSrc = await getTopicImageWithToken(topic.image);
        return { ...topic, imageSrc } as Topic;
      } catch {
        return topic;
      }
    })
  );
  return { ...response, data: dataWithImages } as T;
};

const withSingleTopicImage = async (
  response: CreateOrUpdateTopicResponse
): Promise<CreateOrUpdateTopicResponse> => {
  if (!response.data?.image) return response;
  try {
    const imageSrc = await getTopicImageWithToken(response.data.image);
    return { ...response, data: { ...response.data, imageSrc } as Topic };
  } catch {
    return response;
  }
};

const fetcherGetAll = async (): Promise<TopicResponse> => {
  const response = await axiosClientAdmin.get<TopicResponse>(TOPIC_API);
  const topicResponse = get(response, "data", { data: [] }) as TopicResponse;
  return withTopicImages(topicResponse);
};

export const useGetAllTopics = (): UseQueryResult<TopicResponse, Error> => {
  return useQuery({
    queryKey: [queryKeys.private.manager.topic, "all"],
    queryFn: () => fetcherGetAll()
  });
};

const fetcherGetPaging = async (
  page: number,
  limit: number,
  search: string,
  bookId?: string,
  sort?: "asc" | "desc"
): Promise<TopicPaginationResponse> => {
  const response = await axiosClientAdmin.get(`${TOPIC_API}/pagination`, {
    params: {
      page,
      limit,
      search,
      bookId: bookId || undefined,
      sort: sort || "asc"
    }
  });
  // console.log("---response---", response);
  const payload = get(response, "data", {});
  // console.log("---payload---", payload);

  const topics = get(payload, "data") ?? get(payload, "topics") ?? [];

  const pagination = get(payload, "pagination", {
    total: get(payload, "total", Array.isArray(topics) ? topics.length : 0),
    page: get(payload, "page", page),
    limit: get(payload, "limit", limit),
    totalPages: get(
      payload,
      "totalPages",
      Math.ceil((get(payload, "total", topics.length) || 0) / limit)
    )
  });

  return {
    data: topics,
    pagination
  };
};

export const useGetTopicsPaging = (
  page = 1,
  limit = 10,
  search = "",
  bookId?: string
): UseQueryResult<TopicPaginationResponse, Error> => {
  return useQuery({
    queryKey: [
      queryKeys.private.manager.topic_pagination,
      page,
      limit,
      search,
      bookId
    ],
    queryFn: () => fetcherGetPaging(page, limit, search, bookId)
  });
};

// getById
const fetcherGetById = async (
  id: string
): Promise<CreateOrUpdateTopicResponse> => {
  const response = await axiosClientAdmin.get<CreateOrUpdateTopicResponse>(
    `${TOPIC_API}/${id}`
  );
  const topicResponse = get(response, "data", {
    data: {} as Topic
  }) as CreateOrUpdateTopicResponse;
  return withSingleTopicImage(topicResponse);
};

export const useGetTopicById = (
  id: string
): UseQueryResult<CreateOrUpdateTopicResponse, Error> => {
  return useQuery({
    queryKey: [queryKeys.private.manager.topic_by_id, id],
    queryFn: async () => {
      const res = await fetcherGetById(id);
      const topic = (res as any)?.data ?? res;
      return { data: topic } as CreateOrUpdateTopicResponse;
    },
    enabled: !!id
  });
};

const fetcherGetByBookId = async (
  bookId: string
): Promise<CreateOrUpdateTopicResponse> => {
  const response = await axiosClientAdmin.get<CreateOrUpdateTopicResponse>(
    `${TOPIC_API}/book/${bookId}`
  );
  const topicResponse = get(response, "data", {
    data: {} as Topic
  }) as CreateOrUpdateTopicResponse;
  return withSingleTopicImage(topicResponse);
};

export const useGetTopicsByBookId = (
  bookId: string
): UseQueryResult<CreateOrUpdateTopicResponse, Error> => {
  return useQuery({
    queryKey: [queryKeys.private.manager.topic_by_book_id, bookId],
    queryFn: async () => {
      const res = await fetcherGetByBookId(bookId);
      const topic = (res as any)?.data ?? res;
      return { data: topic } as CreateOrUpdateTopicResponse;
    },
    enabled: !!bookId
  });
};


interface CreateTopicParams {
  data: CreateTopicPayload;
}

const handleTopicError = (error: any) => {
  const code = error?.response?.data?.errorCode;
      if (code === TopicErrorCode.TOPIC_CODE_EXISTS) {
        message.error(TopicErrorDescription.TOPIC_CODE_EXISTS);
        return;
      }
      else if (code === TopicErrorCode.TOPIC_NOT_FOUND) {
        message.error(TopicErrorDescription.TOPIC_NOT_FOUND);
        return;
      }
      else if (code  === TopicErrorCode.TOPIC_ID_NOT_VALID ) {
        message.error(TopicErrorDescription.TOPIC_ID_NOT_VALID)
      }
      else if( code === TopicErrorCode.TOPIC_TYPE_EXISTS) {
        message.error(TopicErrorDescription.TOPIC_TYPE_EXISTS)
      } else
      message.error(error?.response?.data?.errorDescription || "Có lỗi xảy ra, vui lòng thử lại");
    };

export const useCreateTopic = () => {
  async function requestFn(params: CreateTopicPayload) {
    return axiosClientAdmin.post<
      CreateTopicPayload,
      CreateOrUpdateTopicResponse
    >(TOPIC_API, params);
  }

  const mutation = useMutation<
    CreateOrUpdateTopicResponse,
    Error,
    CreateTopicPayload
  >({
    mutationKey: [queryKeys.private.manager.topic, "create"],
    mutationFn: requestFn,
    onError: handleTopicError
  });

  const { mutateAsync, status } = mutation;

  const createTopic = async ({ data }: CreateTopicParams) => {
    const result = await mutateAsync(data);
    const topicResponse = get(result, "data", {
      data: {} as Topic
    }) as CreateOrUpdateTopicResponse;
    return withSingleTopicImage(topicResponse);
  };

  return { createTopic, status };
};

interface UpdateTopicParams {
  id: string;
  data: Partial<UpdateTopicPayload>;
}

export const useUpdateTopic = () => {
  async function requestFn({ id, data }: UpdateTopicParams) {
    const url = `${TOPIC_API}/${id}`;
    return axiosClientAdmin.put<
      Partial<UpdateTopicPayload>,
      CreateOrUpdateTopicResponse
    >(url, data);
  }

  const mutation = useMutation<
    CreateOrUpdateTopicResponse,
    Error,
    UpdateTopicParams
  >({
    mutationKey: [queryKeys.private.manager.topic, "update"],
    mutationFn: requestFn,
    onError: handleTopicError
  });

  const { mutateAsync, status } = mutation;

  const updateTopic = async ({ id, data }: UpdateTopicParams) => {
    const result = await mutateAsync({ id, data });
    const topicResponse = get(result, "data", {
      data: {} as Topic
    }) as CreateOrUpdateTopicResponse;
    return withSingleTopicImage(topicResponse);
  };

  return { updateTopic, status };
};

interface DeleteTopicParams {
  id: string;
}

export const useDeleteTopic = () => {
  async function requestFn({ id }: DeleteTopicParams) {
    const url = `${TOPIC_API}/${id}`;
    return axiosClientAdmin.delete(url);
  }

  const mutation = useMutation<unknown, Error, DeleteTopicParams>({
    mutationKey: [queryKeys.private.manager.topic, "delete"],
    mutationFn: requestFn
  });

  const { mutateAsync, status } = mutation;

  const deleteTopic = async (id: string) => {
    await mutateAsync({ id });
  };

  return { deleteTopic, status };
};
