import styled from "styled-components";
import { Button, Col, Input, Select } from "antd";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { device } from "@/utils/deviceBreakpoint";
import { themes, themesDark } from "@/configs/theme";
import { ST } from "../login/style";

const WrapperRegister = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  padding: ${convertPixelToRem(20)};
  max-width: ${convertPixelToRem(device.desktop)};
  margin: 0 auto;
  position: relative;
  overflow: scroll;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${convertPixelToRem(12)};
  margin-bottom: ${convertPixelToRem(16)};
`;

const Text = styled.div`
  font-size: ${convertPixelToRem(20)};
  color: ${(props) => props.theme.$color_text};
  font-weight: bold;
`;

const AvatarBubble = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: ${convertPixelToRem(8)};
  padding-top: ${convertPixelToRem(1)};
`;

const Avatar = styled.img`
  padding: ${convertPixelToRem(5)};
  width: ${convertPixelToRem(80)};
  height: ${convertPixelToRem(80)};
  border-radius: 50%;
  flex-shrink: 0;
  /* background-color: ${themes.$color_white}; */
  background-color: ${(props) => props.theme.$color_white};
  box-shadow: ${convertPixelToRem(0)} ${convertPixelToRem(2)}
    ${convertPixelToRem(8)} ${(props) => props.theme.$tw_stone_200};
`;

const SpeechBubble1 = styled.div`
  background-color: ${(props) => props.theme.auth.$title};
  border-radius: ${convertPixelToRem(12)};
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(16)};
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => props.theme.$color_white};
  line-height: 1.5;
  max-width: ${convertPixelToRem(310)};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: ${convertPixelToRem(-8)};
    top: ${convertPixelToRem(40)};
    width: 0;
    height: 0;
    border-top: ${convertPixelToRem(8)} solid transparent;
    border-bottom: ${convertPixelToRem(8)} solid transparent;
    border-right: ${convertPixelToRem(8)} solid
      ${(props) => props.theme.auth.$title};
  }
`;

const SpeechBubble2 = styled.div`
  background-color: ${(props) => props.theme.auth.$title};
  border-radius: ${convertPixelToRem(12)};
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(16)};
  /* margin-left:5px; */
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => props.theme.$color_white};
  line-height: 1.5;
  max-width: ${convertPixelToRem(310)};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: ${convertPixelToRem(-8)};
    top: ${convertPixelToRem(30)};
    width: 0;
    height: 0;
    border-top: ${convertPixelToRem(8)} solid transparent;
    border-bottom: ${convertPixelToRem(8)} solid transparent;
    border-right: ${convertPixelToRem(8)} solid
      ${(props) => props.theme.auth.$title};
  }
`;
const LoginText = styled.p`
  display: flex;
  text-align: center;
  justify-content: center;

  width: 100%;
  max-width: ${convertPixelToRem(400)};
  margin: 0 auto;
  & a {
    color: ${(props) => props.theme.$tw_black};
    padding-left: ${convertPixelToRem(5)};
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const GoalCard = styled.div<{ $isselected?: boolean }>`
  /* background-color: ${themes.$bg_white}; */
  border: ${convertPixelToRem(1)} solid
    ${(props) =>
      props.$isselected
        ? props.theme.$border_input
        : props.theme.$border_signup};
  border-radius: ${convertPixelToRem(12)};
  padding: ${convertPixelToRem(16)};
  display: flex;
  width: ${convertPixelToRem(400)};
  height: ${convertPixelToRem(64)};
  align-items: center;
  gap: ${convertPixelToRem(12)};
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) =>
    props.$isselected ? props.theme.$border_target : "transparent"};

  &:hover {
    border-color: ${(props) => props.theme.$border_input};
    background-color: ${(props) =>
      props.$isselected
        ? props.theme.$border_target
        : props.theme.$border_target};
    box-shadow: ${convertPixelToRem(0)} ${convertPixelToRem(2)}
      ${convertPixelToRem(8)} ${(props) => props.theme.$tw_stone_200};
    /* color: ${(props) => props.theme.$color_black} */
  }

  .ant-checkbox-wrapper {
    margin-left: auto;
    margin-right: 0;

    .ant-checkbox {
      .ant-checkbox-inner {
        width: ${convertPixelToRem(20)};
        height: ${convertPixelToRem(20)};
        border-radius: 50%;
        border-color: ${(props) => props.theme.$border_signup};

        &:hover {
          border-color: ${(props) => props.theme.$mistake};
        }
      }

      &.ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: ${(props) => props.theme.$mistake} !important;
          border-color: ${(props) => props.theme.$mistake} !important;

          &::after {
            border-color: ${themes.$color_white} !important;
          }
        }
      }
    }
  }
`;

const GoalText = styled.p<{ $colortext?: string }>`
  flex: 1;
  margin: 0;
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => {
    return props.$colortext || props.theme.$color_text;
  }};
  &:focus,
  &:hover &:active {
    color: ${themesDark.$color_white};
  }
`;

const GoalIcon = styled.div`
  width: ${convertPixelToRem(40)};
  height: ${convertPixelToRem(40)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StudyTimeSection = styled.div`
  margin-top: ${convertPixelToRem(24)};
`;

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(8)};
  margin-top: ${convertPixelToRem(16)};
`;

const TimeInput = styled(Input)`
  width: ${convertPixelToRem(180)};
  height: ${convertPixelToRem(48)};
  border: 1px solid ${(props) => props.theme.$border_signup};
  border-radius: ${convertPixelToRem(12)};
  font-size: ${convertPixelToRem(16)};
  text-align: center;
  background-color: ${(props) => props.theme.$bg_white};

  &:focus,
  &:hover {
    border-color: ${(props) => props.theme.auth.$btn_color_primary};
  }
`;

const TimeSelect = styled(Select)`
  width: ${convertPixelToRem(180)};
  .ant-select-selector {
    height: ${convertPixelToRem(48)} !important;
    border: 1px solid ${(props) => props.theme.$border_signup} !important;
    border-radius: ${convertPixelToRem(12)} !important;
    font-size: ${convertPixelToRem(16)} !important;

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      line-height: ${convertPixelToRem(46)} !important;
      text-align: center;
    }
  }

  &:hover .ant-select-selector {
    border-color: ${(props) => props.theme.auth.$btn_color_primary} !important;
  }

  &.ant-select-focused .ant-select-selector {
    border-color: ${(props) => props.theme.auth.$btn_color_primary} !important;
    box-shadow: none !important;
  }
`;

const ButtonNext = styled(Button)`
  margin-top: ${convertPixelToRem(32)};
  min-height: ${convertPixelToRem(48)};
  border-radius: ${convertPixelToRem(100)};
  background-color: ${(props) => props.theme.auth.$btn_color_primary};
  /* color: ${(props) => props.theme.$color_white}; */
  color: ${themes.$color_white};
  font-size: ${convertPixelToRem(16)};
  width: 100%;
  max-width: ${convertPixelToRem(400)};
  &::before {
    /* color:${(props) => props.theme.$color_white}; */
    color: ${themes.$color_white};
  }
  &:hover {
    background-color: ${(props) => props.theme.auth.$btn_color_primary};
    color: ${themes.$color_white};
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: ${(props) => props.theme.$button_next};
  }
`;

const TextNext = styled.p`
  color: ${themes.$color_white};
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: ${convertPixelToRem(16)};
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => props.theme.auth.$title};

  a {
    color: ${(props) => props.theme.$color_black};
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${convertPixelToRem(16)};
  z-index: 10;
`;

const BackButton = styled.button`
  width: ${convertPixelToRem(40)};
  height: ${convertPixelToRem(40)};
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: ${convertPixelToRem(10)};

  &:hover {
    border: none;
  }

  &:active {
    border: none;
  }

  img {
    width: ${convertPixelToRem(15)};
    height: ${convertPixelToRem(15)};
    object-fit: contain;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;

  gap: ${convertPixelToRem(8)};
`;

const StepDot = styled.div<{ $active: boolean }>`
  width: ${convertPixelToRem(8)};
  height: ${convertPixelToRem(8)};
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active
      ? props.theme.auth.$btn_color_primary
      : props.theme.$tw_stone_400};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$active
        ? props.theme.auth.$btn_color_primary
        : props.theme.$tw_stone_600};
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CapchaInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(20)};
`;
const BlockInput = styled.div`
  display: flex;

  flex-direction: column;
  gap: ${convertPixelToRem(16)};
`;
const FormSigUp = styled(ST.FormLogin)`
  gap: ${convertPixelToRem(24)};
  margin-top: ${convertPixelToRem(24)};
`;
const ColForm = styled(Col)`
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const SU = {
  WrapperRegister,
  Text,
  HeaderSection,
  AvatarBubble,
  Avatar,
  SpeechBubble1,
  SpeechBubble2,
  GoalCard,
  GoalIcon,
  GoalText,
  StudyTimeSection,
  TimeInputWrapper,
  TimeInput,
  TimeSelect,
  ButtonNext,
  LoginLink,
  LoginText,
  HeaderControls,
  BackButton,
  StepIndicator,
  StepDot,
  TextNext,
  ContentWrapper,
  CapchaInput,
  BlockInput,
  FormSigUp,
  ColForm,
};
