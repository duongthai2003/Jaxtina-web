import { lazy } from "react";
import HomePage from "@/modules/public/home/index";
import LoginPage from "@/modules/public/auth/login/index";
import SignUpPage from "@/modules/public/auth/signup/index";
import Dashboard from "@/modules/public/dashboard/index";
import BookPage from "@/modules/private/user/book/list/index";
import CoursePage from "@/modules/public/courses/course/index";
import PronouncePage from "@/modules/public/pronounce/index";
import SettingPage from "@/modules/public/setting/index";
import ForgotPass from "@/modules/public/auth/forgot-pass";
import VerifyEmail from "@/modules/public/VerifyEmail";
import ActivePage from "@/modules/public/individual/active";
import GoalTimePage from "@/modules/public/individual/goalTime";
import GroupPage from "@/modules/public/individual/group";
import AcademicAdvisorPage from "@/modules/public/individual/academicAdvisor";
import ProfilePage from "@/modules/public/individual/profile";
import ChangePasswordPage from "@/modules/public/changePassword";
import PrivacyPolicyPage from "@/modules/public/individual/privacyPolicy";
import CourseDetail from "@/modules/public/courses/courseDetail";
import TopicList from "@/modules/private/admin/topic/list/TopicList";
import TopicDetail from "@/modules/private/admin/topic/detail/TopicDetail";
import TopicCreate from "@/modules/private/admin/topic/create/TopicCreate";
import Lesson from "@/modules/public/courses/lesson";
import Exercise from "@/modules/public/courses/exercise";
import BookList from "@/modules/private/admin/book/list/BookList";
import BookDetail from "@/modules/private/admin/book/detail/BookDetail";
import BookCreate from "@/modules/private/admin/book/create/BookCreate";
// import GameConnectWord from "@/modules/private/user/book/list/content/practiceBook/practiceByGame/gameConnectWord/GameConnectWord";
import CompleteEnglish from "@/modules/private/user/book/list/CompleteEnglish";
import Game from "@/modules/private/user/book/list/content/practiceBook/practiceByGame/Game";

export const LoginPages = lazy(() =>
  import("@/modules/public/auth/login/index").catch(() => {
    return { default: LoginPage };
  })
);

export const SignUpPages = lazy(() =>
  import("@/modules/public/auth/signup/index").catch(() => {
    return { default: SignUpPage };
  })
);
export const ForgotPasswordPage = lazy(() =>
  import("@/modules/public/auth/forgot-pass").catch(() => {
    return { default: ForgotPass };
  })
);

export const PublicHomePages = lazy(() =>
  import("@/modules/public/home/index").catch(() => {
    return { default: HomePage };
  })
);
export const PrivateDashboardPages = lazy(() =>
  import("@/modules/public/dashboard/index").catch(() => {
    return { default: Dashboard };
  })
);
export const AuthBookPage = lazy(() =>
  import("@/modules/private/user/book/list/index").catch(() => {
    return { default: BookPage };
  })
);
export const AuthCoursePage = lazy(() =>
  import("@/modules/public/courses/course/index").catch(() => {
    return { default: CoursePage };
  })
);
export const AuthPronouncePage = lazy(() =>
  import("@/modules/public/pronounce/index").catch(() => {
    return { default: PronouncePage };
  })
);
export const AuthSettingPage = lazy(() =>
  import("@/modules/public/setting/index").catch(() => {
    return { default: SettingPage };
  })
);
export const AuthVerifyEmailPage = lazy(() =>
  import("@/modules/public/VerifyEmail").catch(() => {
    return { default: VerifyEmail };
  })
);

export const AuthActivePage = lazy(() =>
  import("@/modules/public/individual/active").catch(() => {
    return { default: ActivePage };
  })
);

export const AuthGoalTimePage = lazy(() =>
  import("@/modules/public/individual/goalTime").catch(() => {
    return { default: GoalTimePage };
  })
);
export const AuthGroupPage = lazy(() =>
  import("@/modules/public/individual/group").catch(() => {
    return { default: GroupPage };
  })
);
export const AuthAcademicAdvisorPage = lazy(() =>
  import("@/modules/public/individual/academicAdvisor").catch(() => {
    return { default: AcademicAdvisorPage };
  })
);
export const AuthProfilePage = lazy(() =>
  import("@/modules/public/individual/profile").catch(() => {
    return { default: ProfilePage };
  })
);
export const AuthChangePasswordPage = lazy(() =>
  import("@/modules/public/changePassword").catch(() => {
    return { default: ChangePasswordPage };
  })
);
export const AuthPrivacyPolicyPage = lazy(() =>
  import("@/modules/public/individual/privacyPolicy").catch(() => {
    return { default: PrivacyPolicyPage };
  })
);

export const CompleteEnglishPages = lazy(() =>
  import("@/modules/private/user/book/list/CompleteEnglish").catch(() => {
    return { default: CompleteEnglish };
  })
);
export const CourseDetailPage = lazy(() =>
  import("@/modules/public/courses/courseDetail").catch(() => {
    return { default: CourseDetail };
  })
);

export const TopicListPage = lazy(() =>
  import("@/modules/private/admin/topic/list/TopicList").catch(() => {
    return { default: TopicList };
  })
);

export const BookListPage = lazy(() =>
  import("@/modules/private/admin/book/list/BookList").catch(() => {
    return { default: BookList };
  })
);

export const TopicDetailPage = lazy(() =>
  import("@/modules/private/admin/topic/detail/TopicDetail").catch(() => {
    return { default: TopicDetail };
  })
);

export const TopicCreatePage = lazy(() =>
  import("@/modules/private/admin/topic/create/TopicCreate").catch(() => {
    return { default: TopicCreate };
  })
);

export const BookDetailPage = lazy(() =>
  import("@/modules/private/admin/book/detail/BookDetail").catch(() => {
    return { default: BookDetail };
  })
);

export const BookCreatePage = lazy(() =>
  import("@/modules/private/admin/book/create/BookCreate").catch(() => {
    return { default: BookCreate };
  })
);

// export const GameConnectWordPage = lazy(()=> 
//   import("@/modules/private/user/book/list/content/practiceBook/practiceByGame/gameConnectWord/GameConnectWord").catch(() =>{
//     return {default: GameConnectWord}
// })
// );

export const GamePage = lazy(()=> 
  import("@/modules/private/user/book/list/content/practiceBook/practiceByGame/Game").catch(() =>{
    return {default: Game}
})
);

export const LessonPage = lazy(() =>
  import("@/modules/public/courses/lesson").catch(() => {
    return { default: Lesson };
  })
);
export const ExercisePage = lazy(() =>
  import("@/modules/public/courses/exercise").catch(() => {
return { default: Exercise };
  })
);
