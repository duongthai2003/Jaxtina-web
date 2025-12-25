import { Suspense } from "react";
import styled from "styled-components";
import LoadingPage from "@/components/Loading";
import { convertPixelToRem } from "@/utils/func/convertRem";
import SidebarMenu from "../SidebarMenu";
import { adminMenuList } from "@/utils/menuList";

interface Props {
  children?: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  // const createRouteRegex = (path: string) => {
  //   const regexPath = path.replace(/:[^\s/]+/g, "([^\\/]+)");
  //   return new RegExp(`^${regexPath}$`);
  // };

  // const location = useLocation();

  return (
    <Container>
      <ContentWrapper>
        <CreatorMenuWrapper></CreatorMenuWrapper>
        <SidebarMenu menuList={adminMenuList} />
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
  height: 100vh;
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
  padding: ${convertPixelToRem(16)} !important;
  /* background: ${(p) => p.theme.$bg_blue}; */
  background: linear-gradient(
    to bottom,
    ${(props) => props.theme.$bg_white} 0%,
    ${(props) => props.theme.book.$background} 100%
  );
  overflow-y: auto;
`;

export default AdminLayout;
