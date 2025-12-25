import { device } from "@/utils/deviceBreakpoint";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { Menu } from "antd";
import styled from "styled-components";

const wrapper = styled.div``;
const navbar = styled.div`
  margin-bottom: ${convertPixelToRem(20)};
  /* display: flex;
  align-items: center; */
`;

const wrapperContent = styled.div`
  border-radius: ${convertPixelToRem(16)};
  border: ${convertPixelToRem(1)} solid ${(props) => props.theme.$border_signup};
  margin-right: ${convertPixelToRem(20)};
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(32)};
  background-color: ${(p) => p.theme.$bg_white};
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    gap: ${convertPixelToRem(25)};
    margin-right: ${convertPixelToRem(15)};
  }
`;
const content = styled.div`
  padding: 0 ${convertPixelToRem(32)};
  padding-bottom: ${convertPixelToRem(20)};
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(16)};
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    padding: 0 ${convertPixelToRem(20)} ${convertPixelToRem(20)};
  }
`;

const CourseHeader = styled.p`
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(32)};
  color: ${(props) => props.theme.auth.$header_text};
  font-size: ${convertPixelToRem(16)};
  font-weight: bold;
  border-bottom: ${convertPixelToRem(1)} solid
    ${(props) => props.theme.$border_signup};
`;

const navbarMenu = styled(Menu)`
  background-color: transparent;
  display: flex;
  width: 100%;
  border: none;
  border-bottom: ${convertPixelToRem(1)} solid
    ${(props) => props.theme.$border_signup};
  &&.ant-menu {
    border-inline-end: none;
  }

  &&.ant-menu .ant-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    margin-bottom: 0;
    &:active {
      background-color: transparent;
    }
    &:hover {
      background-color: ${(props) => props.theme.auth.$menu_hover};
    }
    & .ant-menu-title-content {
      color: ${(props) => props.theme.$tw_black};
      flex: none;
    }
  }
  && .ant-menu-item-selected {
    font-weight: 700;
    background-color: transparent;
    overflow: initial;
    border-bottom: ${convertPixelToRem(2)} solid #1677ff;
  }
`;
export const CD = {
  wrapper,
  wrapperContent,
  CourseHeader,
  content,
  navbar,
  navbarMenu,
};
