import { Suspense } from "react";
import styled from "styled-components";
import LoadingPage from "@/components/Loading";
import PopupVerifyEmail from "../PopupVerifyEmail";
import SidebarMenu from "../SidebarMenu";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { device } from "@/utils/deviceBreakpoint";
import { userMenuList } from "@/utils/menuList";

interface Props {
  children?: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <Container>
      <HeaderWrapper></HeaderWrapper>
      <ContentWrapper>
        <CreatorMenuWrapper></CreatorMenuWrapper>
        <SidebarMenu menuList={userMenuList} />
        <PopupVerifyEmail />
        <MainContainer>
          <Suspense fallback={<LoadingPage />}>{children}</Suspense>
        </MainContainer>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${(p) => p.theme.$bg_white};
  //max-width: ${convertPixelToRem(device.desktopLarge)};
  //margin: 0 auto;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  background: ${(p) => p.theme.$bg_white};
  box-shadow: 0 ${convertPixelToRem(2)} ${convertPixelToRem(4)}
    rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  z-index: 10;
`;

const CreatorMenuWrapper = styled.div`
  background: ${(p) => p.theme.$bg_sidebar};
`;

const MainContainer = styled.div`
  flex: 1;
  padding: ${convertPixelToRem(32)} ${convertPixelToRem(40)};
  gap: ${convertPixelToRem(20)};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
  background-color: ${(p) => p.theme.auth.$content_bg};
  max-width: ${convertPixelToRem(device.desktop)};
  margin: 0 auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge cũ */
  &::-webkit-scrollbar {
    /* Chrome, Safari */
    display: none;
  }
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    padding: ${convertPixelToRem(20)};
  }
`;

export default UserLayout;
