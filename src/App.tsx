import React from "react";
import { useWindowSize } from "react-use";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme as antdTheme } from "antd";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import locale from "antd/locale/vi_VN";
import RouterApp from "@/routers/RouterApp";
import AuthProvider from "@/context/authContext";
import { ThemeProvider, useTheme } from "@/context/themeContext";
import NotificationProvider from "./context/notificationContext";
import NotificationMobileApp from "./components/Login/NotificationMobileApp";
import { device } from "./utils/deviceBreakpoint";
import { themesLight, themesDark } from "@/configs/theme";
import "@/App.css";
import "@/styles/globals.scss";
const queryClient = new QueryClient();

dayjs.locale("vi");

const AppContent: React.FC = () => {
  const { isDark } = useTheme();
  const currentTheme = isDark ? themesDark : themesLight;
  const algorithm = isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm,
        token: {
          fontFamily: "SF Pro Text",
        },
      }}
    >
      <StyledThemeProvider theme={currentTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationProvider>
              <RouterApp />
            </NotificationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </StyledThemeProvider>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  const { width } = useWindowSize();
  if (width <= device.mobile) {
    return <NotificationMobileApp />;
  }
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
