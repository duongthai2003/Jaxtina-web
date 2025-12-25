import { useMemo } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
  useMatches,
} from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import _, { get } from "lodash";
import {
  PublicHomePages,
  LoginPages,
  PrivateDashboardPages,
  SignUpPages,
  AuthCoursePage,
  AuthPronouncePage,
  AuthSettingPage,
  AuthBookPage,
  AuthProfilePage,
  ForgotPasswordPage,
  AuthVerifyEmailPage,
  AuthActivePage,
  AuthGoalTimePage,
  AuthGroupPage,
  AuthAcademicAdvisorPage,
  AuthChangePasswordPage,
  AuthPrivacyPolicyPage,
  CompleteEnglishPages,
  CourseDetailPage,
  TopicListPage,
  TopicDetailPage,
  TopicCreatePage,
  LessonPage,
  BookListPage,
  BookDetailPage,
  BookCreatePage,
  ExercisePage,
  GamePage
} from "./routerPage";
import { CREATE_ROUTER, PATHS, ROUTER_ADMIN } from "./path";
import LoadingPage from "@/components/Loading";
import Layout from "@/components/Layout";
import UserLayout from "@/components/Layout/UserLayout";
import AdminLayout from "@/components/Layout/AdminLayout";
import NotFound from "@/components/NotFound";
import { useAuth } from "@/hooks/useAuth";
import { useDetailUser } from "@/hooks/useDetailUser";
import { getCookieStorage, hasStorageJwtToken } from "@/helper/storage";
import { LOCAL_STORAGE_DATA } from "@/utils/constants";
import { ROLE_ACCOUNT } from "@/utils/constants";
import ComTopic from "@/modules/private/user/book/list/content/ComTopic";
import WordCombination from "@/modules/private/user/book/list/content/WordCombination";
import ListenPractice from "@/modules/private/user/book/list/content/practiceBook/practiceByListening";
// import GamePage from "@/modules/private/user/book/gameConnectBook/Game";

const createRouteRegex = (path: any) => {
  const regexPath = path.replace(/:[^\s/]+/g, "([^\\/]+)");
  return new RegExp(`^${regexPath}$`);
};
const regexCreatorPath = (pathname: any) => {
  return CREATE_ROUTER.some((route) => createRouteRegex(route).test(pathname));
};
const regexAdminPath = (pathname: any) => {
  return ROUTER_ADMIN.some((route) => createRouteRegex(route).test(pathname));
};

const AuthLayout: React.FC = () => {
  const { isAuth, isLoading, roles } = useAuth();
  // const { isAuth } = useLoaderData() as { isAuth: string | null };
  const location = useLocation();

  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const currentLayout = get(currentMatch, "handle.layout", undefined) as
    | string
    | undefined;

  const isCreatorPath = regexCreatorPath(location.pathname);
  // const isAdminPath = regexAdminPath(location.pathname);

  // check auth render layout
  const renderLayOut = useMemo(() => {
    let layout;

    const ADMIN_ROLES = [ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER];
    const isAdmin =
      Array.isArray(roles) &&
      roles.length > 0 &&
      roles.some((role: string) => ADMIN_ROLES.includes(role?.toLowerCase()));
    if (currentLayout) {
      return (layout = currentLayout);
    }
    // console.log('isAdmin', isAdmin);
    switch (true) {
      case isAdmin:
        layout = (
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        );
        break;
      case isCreatorPath:
        layout = (
          <UserLayout>
            <Outlet />
          </UserLayout>
        );
        break;
      default:
        layout = isAuth ? (
          <>
            <UserLayout>
              <Outlet />
            </UserLayout>
          </>
        ) : (
          <>
            <Layout>
              <Outlet />
            </Layout>
          </>
        );
    }
    return layout;
  }, [isAuth, isCreatorPath, roles, currentLayout]);

  // F5 lay auth -> show loading

  return <div>{isLoading ? <LoadingPage /> : renderLayOut}</div>;
};

// router auth
const RoleProtectedRoute: React.FC<{
  allowedRoles: string[];
  element: React.ReactNode;
}> = ({ allowedRoles, element }) => {
  const userId = getCookieStorage(LOCAL_STORAGE_DATA.USER_ID) ?? "";
  const { data: currentUserRoles, isLoading: isLoadingCurrentRoles } =
    useDetailUser(userId);
  const authStatus = hasStorageJwtToken();

  const currentRoles = useMemo(() => {
    const roles = get(currentUserRoles, "data.user.systemRoles", []);
    return Array.isArray(roles) ? roles : [];
  }, [currentUserRoles]);

  const hasAccess = useMemo(() => {
    if (!Array.isArray(currentRoles) || currentRoles.length === 0) {
      return false;
    }
    return currentRoles.some((role: string) =>
      allowedRoles.some(
        (allowedRole: string) =>
          role?.toLowerCase() === allowedRole?.toLowerCase()
      )
    );
  }, [currentRoles, allowedRoles]);

  if (isLoadingCurrentRoles) {
    return <LoadingPage />;
  }

  if (!authStatus) {
    return <Navigate to={PATHS.public.login()} replace />;
  }

  // console.log('hasAccess', hasAccess);

  // co auth va co quyen
  if (authStatus && hasAccess) {
    return <>{element}</>;
  }

  // co auth ko co quyen -> ve man book
  if (authStatus && !hasAccess) {
    return <Navigate to={PATHS.private.user.book()} replace />;
  }

  return <LoadingPage />;
};
// router ko auth
const RedirectRouter: React.FC<{
  checkAuth: boolean;
  redirectPath: string;
  element: React.ReactNode;
}> = ({ checkAuth, redirectPath, element }) => {
  const isAuth = Boolean(getCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN));
  const location = useLocation();
  const { roles } = useAuth();

  const ADMIN_ROLES = [ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER];
  const isAdmin =
    Array.isArray(roles) &&
    roles.length > 0 &&
    roles.some((role: string) => ADMIN_ROLES.includes(role?.toLowerCase()));

  const isNotAdminRoute = !regexAdminPath(location.pathname);
  const isAdminRoute = !isNotAdminRoute;

  if (isAuth && isAdmin && isNotAdminRoute) {
    return <Navigate to={PATHS.private.admin.dashboard()} replace />;
  }
  // chua login vao admin router -> ve login
  if (!isAuth && isAdminRoute) {
    return <Navigate to={PATHS.public.login()} replace />;
  }

  // login va k phai admin vao router admin -> redirect về book

  if (isAuth && !isAdmin && isAdminRoute) {
    return <Navigate to={PATHS.private.user.book()} replace />;
  }

  return isAuth === checkAuth ? (
    element
  ) : (
    <Navigate to={redirectPath} replace />
  );
};

// createHashRouter
const routers = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      const isAuth = getCookieStorage(LOCAL_STORAGE_DATA.ACCESS_TOKEN);
      return { isAuth };
    },

    //
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <RedirectRouter
            checkAuth={false}
            redirectPath={PATHS.public.login()}
            element={<Navigate to={PATHS.public.login()} replace />}
          />
        ),
      },

      {
        path: PATHS.public.login(),
        element: (
          <RedirectRouter
            checkAuth={false}
            redirectPath={PATHS.public.home()}
            element={<LoginPages />}
          />
        ),
      },
      {
        path: PATHS.public.register(),
        element: (
          <RedirectRouter
            checkAuth={false}
            redirectPath={PATHS.public.home()}
            element={<SignUpPages />}
          />
        ),
      },
      {
        path: PATHS.public.forgotPassword(),
        element: (
          <RedirectRouter
            checkAuth={false}
            redirectPath={PATHS.public.forgotPassword()}
            element={<ForgotPasswordPage />}
          />
        ),
      },
      {
        path: PATHS.public.home(),
        element: (
          <RedirectRouter
            checkAuth={false}
            redirectPath={PATHS.public.home()}
            element={<PublicHomePages />}
          />
        ),
      },
      {
        path: PATHS.private.user.book(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthBookPage />}
          />
        ),
      },
      {
        path: PATHS.private.user.completeEnglish(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.private.user.completeEnglish()}
            element={<CompleteEnglishPages />}
          />
        ),
      },
      {
        path: PATHS.private.user.comTopic(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.private.user.comTopic()}
            element={<ComTopic />}
          />
        ),
      },
      {
        path: PATHS.private.user.wordCombination(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.private.user.wordCombination()}
            element={<WordCombination />}
          />
        ),
      },
      {
        path: PATHS.private.user.wordComb(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.private.user.wordComb()}
            element={<WordCombination />}
          />
        ),
      },
      {
        path: PATHS.private.user.tenses(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.private.user.tenses()}
            element={<WordCombination />}
          />
        ),
      },
      {
        path: PATHS.private.user.course(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthCoursePage />}
          />
        ),
      },
      {
        path: PATHS.private.user.pronounce(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthPronouncePage />}
          />
        ),
      },
      {
        path: PATHS.private.user.setting(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthSettingPage />}
          />
        ),
      },
      {
        path: PATHS.private.user.verifyEmail(),
        handle: {
          layout: (
            <Layout>
              <Outlet />
            </Layout>
          ),
        },
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthVerifyEmailPage />}
          />
        ),
      },
      {
        path: PATHS.private.user.active(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthActivePage />}
          />
        ),
      },
      {
        path: PATHS.private.user.goalTime(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthGoalTimePage />}
          />
        ),
      },
      {
        path: PATHS.private.user.group(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthGroupPage />}
          />
        ),
      },
      {
        path: PATHS.private.user.academicAdvisor(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthAcademicAdvisorPage />}
          />
        ),
      },
      {
        path: PATHS.private.user.profile(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthProfilePage />}
          />
        ),
      },
      {
        path: PATHS.private.user.changePassword(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthChangePasswordPage />}
          />
        ),
      },
      {
        path: PATHS.private.user.privacyPolicy(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<AuthPrivacyPolicyPage />}
          />
        ),
      },
      {
        path: PATHS.private.user.courseDetail(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<CourseDetailPage />}
          />
        ),
      },
      {
        path: PATHS.private.user.lesson(),
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<LessonPage />}
          />
        ),
      },
      {
        path: PATHS.private.user.exercise(),
        handle: {
          layout: (
            <Layout>
              <Outlet />
            </Layout>
          ),
        },
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<ExercisePage />}
          />
        ),
      },
      // router admin manager
      {
        path: PATHS.common.comingSoon(),
        element: (
          <RoleProtectedRoute
            allowedRoles={[ROLE_ACCOUNT.ADMIN]}
            element={
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                  height: "100%",
                }}
              >
                Coming soon
              </div>
            }
          />
        ),
      },
      {
        path: PATHS.public.home(),
        element: (
          <RoleProtectedRoute
            allowedRoles={[ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER]}
            element={<PublicHomePages />}
          />
        ),
      },
      {
        path: PATHS.private.admin.dashboard(),
        /// RoleProtectedRoute cái này để block khi user và ad
        element: (
          <RoleProtectedRoute
            allowedRoles={[ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER]}
            element={<PrivateDashboardPages />}
          />
        ),
      },
      {
        path: PATHS.private.admin.topic.list(),
        element: (
          <RoleProtectedRoute
            allowedRoles={[ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER]}
            element={<TopicListPage />}
          />
        ),
      },
      {
        path: PATHS.private.admin.book.bookList(),
        element: (
          <RoleProtectedRoute
          allowedRoles={[ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER]}
            element={<BookListPage />}
          />
        ),
      },
      {
        path: PATHS.private.admin.topic.detail(),
        element: (
          <RoleProtectedRoute
            allowedRoles={[ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER]}
            element={<TopicDetailPage />}
          />
        ),
      },
      {
        path: PATHS.private.admin.book.bookDetail(),
        element: (
          <RoleProtectedRoute
          allowedRoles={[ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER]}
            element={<BookDetailPage />}
          />
        ),
      },
      {
        path: PATHS.private.admin.topic.create(),
        element: (
          <RoleProtectedRoute
            allowedRoles={[ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER]}
            element={<TopicCreatePage />}
          />
        ),
      },
      {
        path: PATHS.private.admin.book.bookCreate(),
        element: (
          <RoleProtectedRoute
          allowedRoles={[ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER]}
            element={<BookCreatePage />}
          />
        ),
      },
      {
        path: PATHS.private.user.game(":typeGame", ":gameId"),
        handle: {
          layout: (
            <Layout>
              <Outlet />
            </Layout>
          ),
        },
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<GamePage />}
          />
        ),
      },
      {
        path: PATHS.private.user.listenPractice(":id"),
        handle: {
          layout: (
            <Layout>
              <Outlet />
            </Layout>
          ),
        },
        element: (
          <RedirectRouter
            checkAuth={true}
            redirectPath={PATHS.public.login()}
            element={<ListenPractice />}
          />
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const RouterAppNew: React.FC = () => {
  const { isLoading } = useAuth();
  // console.log('isLoading', isLoading)
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Wrapper className="jle-root">
          <RouterProvider router={routers} />
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
export default RouterAppNew;
