export const PATHS = {
  common: {
    comingSoon: () => "/coming-soon",
  },
  public: {
    home: () => "/home",
    login: () => "/login",
    register: () => "/register",
    forgotPassword: () => "/forgot-password",
  },
  private: {
    user: {
      book: () => "/book",
      completeEnglish: () => "/book/:code/:bookId",
      comTopic: () => "/book/complete-english/communication-topic",
      game: (typeGame: string , gameId: string) => `/game/${typeGame}/${gameId}`,
      listenPractice: (id: string) => `/listening/${id}`,
      wordCombination: () => "/book/complete-english/word-combination",
      beAe: () => "",
      ipa: () => "/speak/",
      wordComb: () => "/book/complete-grammar1/word-combination",
      tenses: () => "/book/complete-grammar-2/tenses-of-verbs",
      pronounce: () => "/speak",
      course: () => "/courses",
      courseDetail: () => "/courses/:id",
      lesson: (courseId = ":courseId", lessonId = ":lessonId") =>
        `/courses/${courseId}/lesson/${lessonId}`,
      exercise: (
        courseId = ":courseId",
        lessonId = ":lessonId",
        exerciseId = ":exerciseId"
      ) => `/courses/${courseId}/lesson/${lessonId}/exercise/${exerciseId}`,
      setting: () => "/setting",
      active: () => "/active",
      goalTime: () => "/goal-time",
      group: () => "/group",
      academicAdvisor: () => "/academic-advisor",
      profile: () => "/profile-info",
      changePassword: () => "/change-password",
      privacyPolicy: () => "/Privacy-Policy",

      verifyEmail: () => "/verify-email",
    },
    manager: {},
    admin: {
      dashboard: () => "/dashboard",
      topic:{
        list: () => "/topic",
        create: () => "/topic/create",
        detail: (id = ":id") => `/auth/manager-user/list/${id}`,
      },
      book:{
        bookList: () => "/book-list",
        bookCreate: () => "/book-list/create",
        bookDetail: (id = ':id') => `/auth/manager-user/book-list/${id}`,
      },
    },
  },
};
// public router
export const PUBLIC_ROUTER = [
  PATHS.public.login(),
  PATHS.public.register(),
  PATHS.public.home(),
  PATHS.public.forgotPassword(),
];

// auth router
export const CREATE_ROUTER = [
  PATHS.private.user.book(),
  PATHS.private.admin.topic.list(),
  PATHS.private.admin.topic.create(),
  PATHS.private.admin.topic.detail(),
  PATHS.private.admin.book.bookList(),
  PATHS.private.admin.book.bookCreate(),
  PATHS.private.admin.book.bookDetail(),
  PATHS.private.user.pronounce(),
  PATHS.private.user.course(),
  PATHS.private.user.courseDetail(),
  PATHS.private.user.lesson(),
  PATHS.private.user.setting(),
  PATHS.private.user.verifyEmail(),
  PATHS.private.user.active(),
  PATHS.private.user.goalTime(),
  PATHS.private.user.group(),
  PATHS.private.user.academicAdvisor(),
  PATHS.private.user.profile(),
  PATHS.private.user.changePassword(),
  PATHS.private.user.privacyPolicy(),
];
// router admin auth
export const ROUTER_ADMIN = [
  PATHS.private.admin.dashboard(),
];
