type CombinationItem = {
    id: number;
    title: string;
    lessonCount: number;
    progress: number;
};

export interface Book {
  order: number;
  _id: string;
  path: string;
  name: string;
  url: string;
  description: string;
  code: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  imageSrc?: string;
  background_url: string;
  road_url: string
  backgroundSrc?: string;
  roadSrc?: string
}

export interface CreateBookProps {
    open: boolean;
    onCancel: () => void;
}

export interface DeleteAndUpdateBookProps {
    name: string
    isOpen: boolean
    bookId: string
    onClose: () => void
    onSuccess?: () => void
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface BookResponse {
  data: Book[];
}

export interface BookPaginationResponse {
  data: Book[];
  pagination: Pagination | Pagination[];
}

export interface CreateBookPayload {
  name: string;
  code: string;
  type: string;
  url: string;
  description: string;
  path: string;
  background_url: string;
  road_url?: string
}
export interface CreateBookParams {
  data: CreateBookPayload;
}

export interface CreateOrUpdateBookResponse {
  data: Book;
  statusCode: number;
}

export interface UpdateOrDeleteBookPayload {
    name?: string;
    code?: string;
    url?: string;
    description?: string;
    path?: string;
    order?: string;
    background_url?: string;
    road_url?: string
}
export interface UpdateBookParams {
  id: string;
  data: Partial<UpdateOrDeleteBookPayload>;
}

export interface SuccessRequest {
    success: boolean;
}

export interface DeleteBookParams {
  id: string;
}
export interface DeleteBookResponse {
    data: SuccessRequest;
    statusCode: number;
}

export interface SearchBookParams {
  name?: string;
  code?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface IFilterBook {
  page: number;
  limit: number;
  search: string;
  bookId?: string;
  sort?: Sort;
}
export type Sort = 'asc' | 'desc';

export type Vocab = {
    word: string;
    ipa: string;
    text: string;
    meaningVocab: string;
};

export type SubtitleItem = {
    id: string;
    start: number;
    end: number;
    english: string;
    vietnam: string;
    newWord: Vocab[];
};

// interface FeaturedCourse {
//   id: string;
//   imageUrl: string;
//   code: string;
//   kind: string;
//   level: string;
// }

// interface ProgressItem {
//   id: string;
//   lessonName: string;
//   courseName: string;
//   percentage: number;
// }