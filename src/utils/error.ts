export const ErrorMessage = {
    MISS_TOKEN: 'Missing token',
    INVALID_TOKEN: 'Invalid token',
    EXPIRED_TOKEN: 'Expired token',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not found',
    BAD_REQUEST: 'Bad request',
    UNAUTHORIZED: 'Unauthorized',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    SERVICE_UNAVAILABLE: 'Service unavailable',
    GATEWAY_TIMEOUT: 'Gateway timeout',
    FAILED_TO_FETCH_IMAGE: 'Failed to fetch image',
  } as const;
  
export const BookErrorCode = {
  BOOK_NOT_FOUND: 'BOOK_NOT_FOUND',
  BOOK_CODE_EXISTS: 'BOOK_CODE_EXISTS',
  BOOK_TYPE_EXISTS: 'BOOK_TYPE_EXISTS',
  BOOK_ID_NOT_VALID: 'BOOK_ID_NOT_VALID',
} as const;

export const BookErrorDescription = {
  BOOK_NOT_FOUND: 'Không tìm thấy sách',
  BOOK_CODE_EXISTS: 'Mã sách đã tồn tại',
  BOOK_TYPE_EXISTS: 'Loại sách đã tồn tại',
  BOOK_ID_NOT_VALID: 'Id không hợp lệ',
} as const;

export const TopicErrorCode = {
  TOPIC_NOT_FOUND: 'TOPIC_NOT_FOUND',
  TOPIC_CODE_EXISTS: 'TOPIC_CODE_EXISTS',
  TOPIC_TYPE_EXISTS: 'TOPIC_TYPE_EXISTS',
  TOPIC_ID_NOT_VALID: 'TOPIC_ID_NOT_VALID',
};

export const TopicErrorDescription = {
  TOPIC_NOT_FOUND: 'Không tìm thấy chủ đề',
  TOPIC_CODE_EXISTS: 'Mã chủ đề đã tồn tại',
  TOPIC_TYPE_EXISTS: 'Loại chủ đề đã tồn tại',
  TOPIC_ID_NOT_VALID: 'Id không hợp lệ',
};