import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingPage from "@/components/Loading/index";
import { convertPixelToRem } from "@/utils/func/convertRem";
import {
  DEFAULT_HEIGHT_SCREEN,
  HEIGHT_CONFIG_SUBTRACTION,
} from "@/utils/constants";
import { BaseTag } from "@/utils/baseTagHTML";
import "@/styles/globals.scss";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [height, setHeight] = useState(DEFAULT_HEIGHT_SCREEN);
  // const navigate = useNavigate();
  // const roles: unknown[] = getRole();

  // const isAuth = useMemo(() => {
  //   return !!hasStorageJwtToken() && roles.length > 0;
  // }, [navigate, roles]);

  useEffect(() => {
    const screenHeight = window.innerHeight;

    setHeight(screenHeight - HEIGHT_CONFIG_SUBTRACTION);

    const handleResize = () => {
      const newHeight = window.innerHeight;
      setHeight(newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  return (
    <>
      <Wrapper className="wrapper-layout">
        <BaseTag.div className="main-layout">
          <Main>
            {/* {isAuth && <JSideBar open={true} />} */}
            <Children className="children">
              {/* boc children chi tai phan nay */}
              <Suspense fallback={<LoadingPage />}>{children}</Suspense>
            </Children>
          </Main>
        </BaseTag.div>
        {/* <CopyRight>Copyright © 2025 - Jaxtina</CopyRight> */}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
`;

const Main = styled.main`
  display: flex;
  gap: ${convertPixelToRem(30)};
  height: 100%;
  width: 100%;
`;
const Children = styled.div`
  width: 100%;
  position: relative;
`;

// const CopyRight = styled.div`
//   color: #fff;
//   position: fixed;
//   bottom: 20px;
//   text-align: center;
//   width: 100%;
//   will-change: transform;
// `;

export default Layout;
