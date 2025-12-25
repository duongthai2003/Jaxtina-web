import { Modal } from "antd";
import styled from "styled-components";
import Button from "../Login/Button";
import { themes } from "@/configs/theme";
import { convertPixelToRem } from "@/utils/func/convertRem";

const PopupWrapper = styled.div`
  display: flex;

  flex-direction: column;
  color: ${(props) => props.theme.$color_black};
  gap: ${convertPixelToRem(24)};
`;
const PopupImag = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: ${convertPixelToRem(10)};
  & img {
    width: ${convertPixelToRem(80)};

    height: 100%;
    object-fit: cover;
  }
  & p {
    font-weight: bold;
    color: ${(props) => props.theme.$tw_black};
    font-size: ${convertPixelToRem(16)};
  }
`;
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(8)};
`;
const TextContentItem = styled.div`
  display: flex;
  gap: ${convertPixelToRem(8)};
  font-size: ${convertPixelToRem(13)};
`;
const AntModal = styled(Modal)`
  width: ${convertPixelToRem(800)} !important;
  & .ant-modal-footer {
    display: none;
  }

  & .ant-modal-content {
    padding-top: ${convertPixelToRem(50)};
    padding-bottom: ${convertPixelToRem(24)};
    background-color: ${(props) => props.theme.$bg_white};
  }
`;
const ConfirmButton = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: ${convertPixelToRem(10)};
  font-size: ${convertPixelToRem(13)};
  & > div {
    width: 100%;
  }
  & > div:first-child {
    & button {
      background-color: ${themes.$tw_red_50};
      color: ${themes.auth.$btn_color_primary};
    }
  }
`;

const ConfirmButtonItem = styled(Button)`
  font-weight: bold;
  width: 100%;
`;
const Dismiss = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${convertPixelToRem(10)};
  user-select: none;
`;
const CheckboxInput = styled.input`
  width: ${convertPixelToRem(15)};
  height: ${convertPixelToRem(15)};
  &:checked {
    background: red !important; /* màu nền khi checked */
    border-color: red !important;
  }
`;
export const POP = {
  PopupWrapper,
  PopupImag,
  TextContent,
  TextContentItem,
  ConfirmButton,
  AntModal,
  ConfirmButtonItem,
  CheckboxInput,
  Dismiss,
};
