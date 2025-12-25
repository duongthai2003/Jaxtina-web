export const queryKeys = {
  common: {
    captcha: "captcha",
    image: "image",
    uploadImg: "upload-img",
    uploadFile: "upload-file",
  },
  public: {
    auth: {
      login: "login",
      register: "register",
      forgotPassword: "forgot-password",
    },
  },
  private: {
    user: {
      profile: "user-profile",
      verifyEmail: "verify-email-resend",
      course: "course-list",
    },
    manager: {
      books: {},
      book: "book",
      book_pagination: "book-pagination",
      topic: "topics",
      topic_by_id: "topic-by-id",
      topic_by_book_id: "topic-by-book-id",
      book_by_id: "book-by-id",
      topic_pagination: "topic-pagination",
      book_search: "book_search",
    },
    admin: {
      registration: "",
      openApp: "",
      rankingBook: "",
      bonusPoint: "",
    },
  },
};
