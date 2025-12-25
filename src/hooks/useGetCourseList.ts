import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/services/base";
import { queryKeys } from "@/utils/query";
import API from "@/utils/apiRoutes";
interface ParamType {
  page: number;
  limit: number;
}
export type courseItem = {
  id: string;
  class_name: string;
  kind_of_course: string;
  level: string;
  status: statusCourseType;
  start_date: string;
  end_date: string;
};
enum statusCourseType {
  inProgress = "In Progress",
  Finished = "Finished",
}
interface Pagination extends ParamType {
  total: number;
  totalPages: number;
}

interface ResponseType {
  data: courseItem[];
  pagination: Pagination;
}
const fetcher = async ({ page, limit }: ParamType): Promise<ResponseType> => {
  return await axiosClient.get(API.private.user.courseList, {
    params: { page, limit },
  });
};

export const useGetCourseList = ({ page, limit }: ParamType) => {
  return useQuery({
    queryKey: [queryKeys.private.user.course, page],
    queryFn: () => fetcher({ page, limit }),
    retry: 1,
  });
};
