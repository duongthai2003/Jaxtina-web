const API = {
  public: {
    login: "/api/v1/web/auth/login",
    register: "/api/v1/web/user/register",
    forgotPassSendOtp: "/api/v1/web/user/send-mail/reset-password",
    forgotPassVerifyOtp: "/api/v1/web/user/verify-code/reset-password",
    forgotPassSetNewPass: "/api/v1/web/user/reset-password",
    getCapcha: "/api/v1/web/user/get-captcha",
  },
  private: {
    user: {
      detailUser: "api/web/profile/me",
      verifyEmailGetOtp: "/api/web/user/me/email",
      verifyEmailVerifyOtp: "/api/web/user/verify-code/email",
      verifyEmailResendOtp: "/api/web/user/send-mail/verify-email2",
      bookPaging: "/api/v1/web/book/pagination",
      bookAll: "/api/v1/web/book",
      topicAll: "/api/v1/web/topic",
      // topicId: "/api/v1/web/topic/book/{:id}",
      topicByBookId: "/api/v1/web/topic/book/{:bookId}",
      topicPaging: "/api/v1/web/topic/pagination",
      createTopic: "/api/v1/web/topic",
      updateTopic: "/api/v1/web/topic/{:id}",
      deleteTopic: "/api/v1/web/topic/{:id}",
      courseList: "/api/v1/web/course/pagination",
    },
    admin: {
      createBooks: "/api/v1/web/book",
      updateBook: "/api/v1/web/book/{:id}",
      deleteBook: "/api/v1/web/book/{:id}",
    },
  },
};
export default API;
