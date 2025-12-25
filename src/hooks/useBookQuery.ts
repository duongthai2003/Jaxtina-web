import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import API from "@/utils/apiRoutes";
import { queryKeys } from "@/utils/query";
import {
  Book,
  BookResponse,
  CreateBookParams,
  CreateBookPayload,
  CreateOrUpdateBookResponse,
  DeleteBookParams,
  UpdateBookParams,
  UpdateOrDeleteBookPayload,
  BookPaginationResponse,
} from "@/modules/private/user/book/type";
import { axiosClientAdmin } from "@/services/baseAdmin";
import { get } from "lodash";
import { message } from "antd";
import { BookErrorCode, BookErrorDescription } from "@/utils/error";

const BOOK_API = API.private.user.bookAll;

const blobToDataUrl = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const getBookImageWithToken = async (
  imagePath: string
): Promise<string> => {
  const blob = (await axiosClientAdmin.get(imagePath, {
    responseType: "blob",
  })) as Blob;
  return blobToDataUrl(blob);
};

const withBookImages = async <T extends BookResponse | BookPaginationResponse>(
  bookResponse: T
): Promise<T> => {
  const booksWithImages = await Promise.all(
    bookResponse.data.map(async (book: any) => {
      if (!book.url || !book.background_url || !book.road_url) {
        return book;
      }
      try {
        const imageSrc = await getBookImageWithToken(book.url);
        const backgroundSrc = await getBookImageWithToken(book.background_url);
        const roadSrc = await getBookImageWithToken(book.road_url);
        return { ...book, imageSrc, backgroundSrc, roadSrc } as Book;
      } catch {
        return book;
      }
    })
  );
  return { ...bookResponse, data: booksWithImages } as T;
};

const withSingleBookImage = async (
  response: CreateOrUpdateBookResponse
): Promise<CreateOrUpdateBookResponse> => {
  if (!response.data?.url) return response;
  try {
    const imageSrc = await getBookImageWithToken(response.data.url);
    return { ...response, data: { ...response.data, imageSrc } as Book };
  } catch {
    return response;
  }
};

const fetcherGetAll = async (): Promise<BookResponse> => {
  const response = await axiosClientAdmin.get<BookResponse>(BOOK_API);
  const bookResponse = get(response, "data", { data: [] }) as BookResponse;
  return withBookImages(bookResponse);
};
export const useAllBook = (): UseQueryResult<BookResponse, Error> => {
  return useQuery<BookResponse>({
    queryKey: [queryKeys.private.manager.book, "all"],
    queryFn: () => fetcherGetAll(),
  });
};

const fetcherGetPaging = async (
  page: number,
  limit: number,
  search: string,
  bookId?: string,
  sort?: "asc" | "desc"
): Promise<BookPaginationResponse> => {
  const response = await axiosClientAdmin.get(`${BOOK_API}/pagination`, {
    params: {
      page,
      limit,
      search,
      bookId: bookId || undefined,
      sort: sort || "asc",
    },
  });
  const payload = get(response, "data", {});
  const books = get(payload, "data") ?? get(payload, "books") ?? [];
  const pagination = get(payload, "pagination", {
    total: get(payload, "total", Array.isArray(books) ? books.length : 0),
    page: get(payload, "page", page),
    limit: get(payload, "limit", limit),
    totalPages: get(
      payload,
      "totalPages",
      Math.ceil((get(payload, "total", books.length) || 0) / limit)
    ),
  });

  return withBookImages({
    data: books,
    pagination,
  });
};

export const useAllBookPagination = (
  page = 1,
  limit = 10,
  search = "",
  id?: string
): UseQueryResult<BookPaginationResponse, Error> => {
  return useQuery({
    queryKey: [
      queryKeys.private.manager.book_pagination,
      page,
      limit,
      search,
      id,
    ],
    queryFn: () => fetcherGetPaging(page, limit, search, id),
  });
};

const fetcherGetById = async (
  id: string
): Promise<CreateOrUpdateBookResponse> => {
  const response = await axiosClientAdmin.get<CreateOrUpdateBookResponse>(
    `${BOOK_API}/${id}`
  );
  const bookResponse = get(response, "data", {
    data: {} as Book,
  }) as CreateOrUpdateBookResponse;
  return withSingleBookImage(bookResponse);
};

export const useGetBookById = (
  id: string
): UseQueryResult<CreateOrUpdateBookResponse, Error> => {
  return useQuery({
    queryKey: [queryKeys.private.manager.book_by_id, id],
    queryFn: async () => {
      const res = await fetcherGetById(id);
      const book = (res as any)?.data ?? res;
      return { data: book } as CreateOrUpdateBookResponse;
    },
    enabled: !!id,
  });
};

export const handleBookError = (error: any) => {
  const code = error?.response?.data?.errorCode;
  if (code === BookErrorCode.BOOK_CODE_EXISTS) {
    message.error(BookErrorDescription.BOOK_CODE_EXISTS);
    return;
  } else if (code === BookErrorCode.BOOK_NOT_FOUND) {
    message.error(BookErrorDescription.BOOK_NOT_FOUND);
    return;
  } else if (code === BookErrorCode.BOOK_ID_NOT_VALID) {
    message.error(BookErrorDescription.BOOK_ID_NOT_VALID);
  } else if (code === BookErrorCode.BOOK_TYPE_EXISTS) {
    message.error(BookErrorDescription.BOOK_TYPE_EXISTS);
  } else
    message.error(
      error?.response?.data?.errorDescription ||
        "Có lỗi xảy ra, vui lòng thử lại"
    );
};

export const useCreateBook = () => {
  async function requestFn(params: CreateBookPayload) {
    return axiosClientAdmin.post<CreateBookPayload, CreateOrUpdateBookResponse>(
      BOOK_API,
      params
    );
  }

  const mutation = useMutation<
    CreateOrUpdateBookResponse,
    Error,
    CreateBookPayload
  >({
    mutationKey: [queryKeys.private.manager.book, "create"],
    mutationFn: requestFn,
    onError: (error) => handleBookError(error),
  });

  const { mutateAsync, status } = mutation;

  const createBook = async ({ data }: CreateBookParams) => {
    const result = await mutateAsync(data);
    const bookResponse = get(result, "data", {
      data: {} as Book,
    }) as CreateOrUpdateBookResponse;
    return withSingleBookImage(bookResponse);
  };

  return { createBook, status };
};

export const useUpdateBook = () => {
  async function requestFn({ id, data }: UpdateBookParams) {
    const url = `${BOOK_API}/${id}`;
    return axiosClientAdmin.put<
      Partial<UpdateOrDeleteBookPayload>,
      CreateOrUpdateBookResponse
    >(url, data);
  }

  const mutation = useMutation<
    CreateOrUpdateBookResponse,
    Error,
    UpdateBookParams
  >({
    mutationKey: [queryKeys.private.manager.book, "update"],
    mutationFn: requestFn,
    onError: (error) => handleBookError(error),
  });

  const { mutateAsync, status } = mutation;

  const updateBook = async ({ id, data }: UpdateBookParams) => {
    const result = await mutateAsync({ id, data });
    const bookResponse = get(result, "data", {
      data: {} as Book,
    }) as CreateOrUpdateBookResponse;
    return withSingleBookImage(bookResponse);
  };

  return { updateBook, status };
};

export const useDeleteBook = () => {
  async function requestFn({ id }: DeleteBookParams) {
    const url = `${BOOK_API}/${id}`;
    return axiosClientAdmin.delete(url);
  }

  const mutation = useMutation<unknown, Error, DeleteBookParams>({
    mutationKey: [queryKeys.private.manager.book, "delete"],
    mutationFn: requestFn,
  });

  const { mutateAsync, status } = mutation;

  const deleteBook = async (id: string) => {
    await mutateAsync({ id });
  };

  return { deleteBook, status };
};
