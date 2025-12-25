import styled from "styled-components";
import { Form, Input } from "antd";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { images } from "@/assets";
import { device } from "@/utils/deviceBreakpoint";
import { themes } from "@/configs/theme";

const WrapperLogin = styled.div`
  background-color: ${(props) => props.theme.$bg_white};
  height: 100vh;
  transition: background-color 0.3s ease;
`;
const LoginBlock = styled.div`
  max-width: ${convertPixelToRem(device.desktop)};
  margin: 0 auto;
  height: 100%;
  padding: ${convertPixelToRem(20)};
`;
const FormItem = styled(Form.Item)`
  margin: 0;
  width: 100%;
  outline: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }
  & .ant-form-item-explain-error {
    margin-top: ${convertPixelToRem(4)};
  }
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const FormLogin = styled(Form)`
  width: ${convertPixelToRem(444)};
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(50)};
  @media (max-width: ${device.tablet}px) {
    width: ${convertPixelToRem(300)};
  }

  /* @media ${device.mobile} {
    font-size: 14px;
    padding: 16px;
  } */
`;

const TextHeading = styled.p`
  font-size: ${convertPixelToRem(24)};
  font-weight: bold;
  color: ${(props) => props.theme.$color_black};
  transition: color 0.3s ease;
`;
const Title = styled.p`
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => props.theme.auth.$title};
  transition: color 0.3s ease;
`;
const InputTitle = styled.p`
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => props.theme.$color_black};
  margin-bottom: ${convertPixelToRem(4)};
  transition: color 0.3s ease;
`;
const InputTitleRequire = styled.span`
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => props.theme.auth.$btn_color_primary};
`;
const PasswordBlock = styled.label`
  display: block;
  margin-top: ${convertPixelToRem(24)};
`;

const InputTag = styled(Input)`
  font-size: ${convertPixelToRem(14)};
  /* color: ${(props) => props.theme.$tw_input_black}; */
  /* background-color: ${(props) => props.theme.$bg_white}; */
  width: 100%;
  border: none;
  outline: none;
  padding: ${convertPixelToRem(8)} ${convertPixelToRem(12)};
  border: ${convertPixelToRem(1)} solid
    ${(props) => props.theme.auth.$border_color};
  min-height: ${convertPixelToRem(52)};
  border-radius: ${convertPixelToRem(12)};
  transition: all 0.3s ease;
  &::placeholder {
    color: ${(props) => props.theme.auth.$input_color};
    /* color: black; */
  }
  &:hover,
  &:focus-within {
    border: ${convertPixelToRem(1)} solid
      ${(props) => props.theme.auth.$border_color};
    outline: none;
    box-shadow: none;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  & .ant-input-prefix {
    margin-right: ${convertPixelToRem(8)};
  }
  & .ant-input[type="date"]::-webkit-calendar-picker-indicator {
    display: none !important;
    -webkit-appearance: none !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    position: absolute !important;
    pointer-events: none !important;
  }
  & .ant-input[type="date"]::-moz-calendar-picker-indicator {
    display: none !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
  }

  & .ant-input[type="date"]::-ms-calendar-picker-indicator {
    display: none !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
  }

  & .ant-input[type="date"] {
    /* -webkit-appearance: none; */
    position: relative;
  }
`;
const InputTagPassword = styled(Input.Password)`
  font-size: ${convertPixelToRem(14)};
  /* color: ${(props) => props.theme.$tw_input_black}; */
  /* background-color: ${(props) => props.theme.$bg_white}; */
  width: 100%;
  border: none;
  outline: none;
  padding: ${convertPixelToRem(8)} ${convertPixelToRem(12)};
  border: ${convertPixelToRem(1)} solid
    ${(props) => props.theme.auth.$border_color};
  min-height: ${convertPixelToRem(52)};
  border-radius: ${convertPixelToRem(12)};
  transition: all 0.3s ease;
  &::placeholder {
    color: ${(props) => props.theme.auth.$input_color};
  }
  & .ant-input {
    color: ${(props) => props.theme.$tw_black};
    background-color: ${(props) => props.theme.$bg_white};
  }
  &:hover,
  &:focus-within {
    border: ${convertPixelToRem(1)} solid
      ${(props) => props.theme.auth.$border_color};
    outline: none;
    box-shadow: none;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  & .ant-input-prefix {
    margin-right: ${convertPixelToRem(8)};
  }
`;

const FogotPassWordText = styled.a`
  font-size: ${convertPixelToRem(16)};
  color: ${(props) => props.theme.$color_black};
  text-align: right;
  margin-top: ${convertPixelToRem(14)};
  display: block;
  transition: color 0.3s ease;
  float: inline-end;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    color: ${(props) => props.theme.$color_black};
    opacity: 0.8;
  }
`;

const PanelLogin = styled.div`
  background: url(${images.loginPanelbanner}) no-repeat center;
  background-size: cover;
  padding: ${convertPixelToRem(30)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: ${convertPixelToRem(24)};
  height: 100%;
`;
const PanelContent = styled.div`
  position: relative;
`;
const Logo = styled.img`
  height: ${convertPixelToRem(106)};

  object-fit: cover;
`;
const FourSkillItem = styled.div`
  width: ${convertPixelToRem(109)};
  height: ${convertPixelToRem(109)};
  background-color: ${(props) => props.theme.$tw_white};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  & img {
    object-fit: contain;
  }
`;
const FourSkills = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: ${convertPixelToRem(20)};
`;
const PanelContentItem = styled.div`
  position: absolute;
  bottom: ${convertPixelToRem(30)};
  left: ${convertPixelToRem(30)};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FourSkillsBg = styled.div`
  & img {
    width: 100%;
    object-fit: contain;
  }
`;
const PanelContentItemStart = styled(FourSkillItem)`
  position: absolute;
  top: -${convertPixelToRem(110)};
  right: ${convertPixelToRem(30)};
  width: ${convertPixelToRem(80)};
  height: ${convertPixelToRem(80)};
  background-color: ${(props) => props.theme.$tw_red_600};
`;
const PanelContentText = styled.div`
  font-weight: bold;
  /* color: ${(props) => props.theme.$tw_white}; */
  color: ${themes.$tw_white};
  font-size: ${convertPixelToRem(18)};
  top: ${convertPixelToRem(10)};
  position: absolute;
  & p:first-child {
    opacity: 0.8;
  }
  & p:last-child {
    font-size: ${convertPixelToRem(23)};
  }
  @media (max-width: ${device.tablet}px) {
    font-size: ${convertPixelToRem(13)};
    & p:last-child {
      font-size: ${convertPixelToRem(20)};
    }
  }
`;
const SigupText = styled.p`
  text-align: center;
  color: ${(props) => props.theme.$tw_black || props.theme.$color_text};
  transition: color 0.3s ease;
  & a {
    color: ${(props) => props.theme.$tw_black || props.theme.$color_text};
    transition: color 0.3s ease;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export const ST = {
  LoginBlock,
  WrapperLogin,
  TextHeading,
  Title,
  InputTitle,
  InputTitleRequire,
  PasswordBlock,
  FormLogin,
  InputTag,
  FogotPassWordText,
  PanelLogin,
  PanelContent,
  Logo,
  FourSkillItem,
  FourSkills,
  PanelContentItem,
  PanelContentItemStart,
  FourSkillsBg,
  PanelContentText,
  FormItem,
  InputTagPassword,
  FormWrapper,
  SigupText,
};
