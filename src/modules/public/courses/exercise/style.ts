import { Progress } from "antd";
import { X } from "lucide-react";
import styled from "styled-components";
import Button from "@/components/Login/Button";
import { device } from "@/utils/deviceBreakpoint";
import { convertPixelToRem } from "@/utils/func/convertRem";

const wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-top: ${convertPixelToRem(20)};
  gap: ${convertPixelToRem(32)};
  height: 100vh;
`;
const header = styled.div`
  padding: ${convertPixelToRem(20)} ${convertPixelToRem(64)}
    ${convertPixelToRem(12)};
  border-bottom: ${convertPixelToRem(1)} solid ${(p) => p.theme.$border_signup};
  font-size: ${convertPixelToRem(16)};
  font-weight: bold;
  color: ${(props) => props.theme.auth.$header_text};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const headerClose = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${convertPixelToRem(5)} ${convertPixelToRem(8)};
`;

const headerCloseIcon = styled(X)`
  color: ${(p) => p.theme.$color_black};
`;
const footer = styled.div`
  border-top: ${convertPixelToRem(1)} solid ${(p) => p.theme.$border_signup};
  padding: ${convertPixelToRem(40)} ${convertPixelToRem(64)};
  display: flex;
  justify-content: space-between;
`;
const content = styled.div`
  max-width: ${convertPixelToRem(device.desktop)};
  flex: 1;
  padding: 0 ${convertPixelToRem(64)} ${convertPixelToRem(32)};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${convertPixelToRem(32)};
  width: 100%;
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    padding: 0 ${convertPixelToRem(64)};
  }
`;
const buttonCancel = styled(Button)`
  color: ${(p) => p.theme.$color_black};
  background-color: ${(p) => p.theme.$tw_gray_100};
  max-width: ${convertPixelToRem(160)};
`;
const buttonSubmit = styled(Button)`
  max-width: ${convertPixelToRem(160)};
`;
const progressBlock = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(50)};
  padding: ${convertPixelToRem(8)} 0;
`;
const progressBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(4)};
  font-weight: bold;
  font-size: ${convertPixelToRem(16)};
  flex: 1;
  color: ${(p) => p.theme.$tw_orange_700};
`;
const progressAntd = styled(Progress)`
  &&.ant-progress .ant-progress-inner {
    background-color: ${(p) => p.theme.$tw_amber_50};
  }
  &&.ant-progress .ant-progress-bg::after {
    background-color: ${(p) => p.theme.$tw_amber_500};
  }
`;
const star = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(12)};
  font-weight: bold;
  font-size: ${convertPixelToRem(20)};
  color: ${(p) => p.theme.auth.$score_progress};
`;
const starImage = styled.img`
  width: ${convertPixelToRem(24)};
  height: ${convertPixelToRem(24)};
`;
const questionBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  user-select: none;
`;

export const EX = {
  wrapper,
  header,
  footer,
  content,
  buttonCancel,
  buttonSubmit,
  headerClose,
  headerCloseIcon,
  progressBlock,
  progressBar,
  progressAntd,
  star,
  starImage,
  questionBlock,
};
