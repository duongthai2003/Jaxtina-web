import { Layout, Menu,Skeleton } from "antd";
import styled from "styled-components";
import { themes } from "@/configs/theme";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { device } from "@/utils/deviceBreakpoint";
const Wrapper = styled.div`
  background-color: ${(props) => props.theme.$bg_white};
  padding-top: ${convertPixelToRem(18)};
  height: 100vh;
  border-right: 2px solid ${(props) => props.theme.$border_signup};
`;
const Category = styled.div<{ $collapsed: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.$collapsed ? "column" : "row")};
  align-items: center;
  width: 100%;
  gap: ${convertPixelToRem(18)};
  padding: 0 ${convertPixelToRem(20)};

  p {
    font-size: ${convertPixelToRem(20)};
  }
`;
const MenuList = styled(Menu)`
  border: none !important;
  background-color: ${(props) => props.theme.$bg_white} !important;
  && .ant-menu-submenu-title {
    padding: ${convertPixelToRem(12)} ${convertPixelToRem(8)}
      ${convertPixelToRem(12)} ${convertPixelToRem(8)} !important;
    min-height: ${convertPixelToRem(52)};
    & .ant-menu-submenu-arrow {
      color: ${(props) => props.theme.$tw_black};
    }
  }
  && .ant-menu-item {
    min-height: ${convertPixelToRem(52)};
    padding: ${convertPixelToRem(12)} ${convertPixelToRem(8)}
      ${convertPixelToRem(12)} ${convertPixelToRem(8)} !important;
    &:hover {
      background-color: ${($Props) => $Props.theme.auth.$menu_hover} !important;
    }
    &:active {
      background-color: transparent !important;
    }
    &:focus-visible,
    &:focus-within,
    &:visited {
      outline: none;
    }
  }
  & .ant-menu-item-selected {
    color: transparent !important;
  }

  && .ant-menu-item.ant-menu-item-selected {
    background-color: ${themes.$tw_red_50};
    border: ${convertPixelToRem(2)} solid ${themes.$tw_red_200};
  }
  && .ant-menu-item.ant-menu-item-selected {
    .ant-menu-title-content {
      color: ${themes.$tw_red_500};
    }
  }
  && .ant-menu-title-content {
    font-weight: bold;
    color: ${themes.$tw_gray_400};
    border: ${convertPixelToRem(8)};
    @media (max-width: ${convertPixelToRem(device.tablet)}) {
      font-size: ${convertPixelToRem(13)};
    }
  }
  && li.ant-menu-item.ant-menu-item-selected::before {
    content: "";
    width: ${convertPixelToRem(5)};
    height: ${convertPixelToRem(25)};
    background: ${themes.$tw_red_400};
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-bottom-right-radius: ${convertPixelToRem(15)};
    border-top-right-radius: ${convertPixelToRem(15)};
  }
  && .ant-menu-submenu.ant-menu-submenu-selected .ant-menu-submenu-title {
    border: ${convertPixelToRem(2)} solid ${themes.$tw_red_200};
  }
  && .ant-menu.ant-menu-sub {
    background-color: transparent;
  }
  &.ant-menu-inline-collapsed {
    & .ant-menu-item-icon {
      width: 100%;
    }
  }
`;
const ToggleButton = styled.div`
  display: inline-block;
  cursor: pointer;
`;
const Logo = styled.div`
  cursor: pointer;
`;
const LogoImg = styled.img`
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    max-height: ${convertPixelToRem(50)};
  }
`;
const LogOut = styled.div<{ $collapsed: boolean }>`
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(8)};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$collapsed ? "center" : "start")};
  margin: ${convertPixelToRem(4)};
  font-size: ${convertPixelToRem(14)};
  font-weight: bold;
  color: ${themes.$tw_gray_400};
  gap: ${convertPixelToRem(10)};
  border-radius: ${convertPixelToRem(8)};
  &:hover {
    background-color: ${($Props) => $Props.theme.auth.$menu_hover};
  }
`;

const LogOutWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.$border_signup};
`;

const layoutSider = styled(Layout.Sider)`
  background-color: transparent;
  padding-bottom: 0;
  height: 100%;

  & .ant-layout-sider-children {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
`;
const CustomSkeleton = styled(Skeleton)`
  padding: 0 ${convertPixelToRem(12)};
`;
export const SB = {
  Wrapper,
  ToggleButton,
  Category,
  MenuList,
  Logo,
  LogoImg,
  LogOut,
  LogOutWrapper,
  layoutSider,
  CustomSkeleton
};
