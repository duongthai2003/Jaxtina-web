type ResponseData = {
  statusCode: number;
  data: {
    success: boolean;
  };
};

export interface IFilterTopic {
  page: number;
  limit: number;
  search: string;
  bookId?: string;
  sort?: Sort;
}
export type Sort = "asc" | "desc";

export type ExerciseModalProps = {
  isOpen: boolean;
  onClick?: () => void;
  setIsOpen: (value: boolean) => void;
};
