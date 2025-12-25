import { Carousel, Row } from "antd";
import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { themes } from "@/configs/theme";
import { ST } from "../login/style";
const WrapperForgotPass = styled.div`
  height: 100vh;
  width: 100%;
`;

const ForgotRow = styled(Row)`
  justify-content: center;
  height: 100%;
  align-items: center;
`;
const ForgotWrapper = styled.div`
  max-width: ${convertPixelToRem(500)};
  min-width: ${convertPixelToRem(500)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${convertPixelToRem(40)};
  border-radius: ${convertPixelToRem(24)};
  gap: ${convertPixelToRem(28)};
  box-shadow: ${convertPixelToRem(0)} ${convertPixelToRem(25)}
    ${convertPixelToRem(50)} -${convertPixelToRem(12)} rgba(0, 0, 0, 0.25);
`;
const ForgortForm = styled(ST.FormLogin)`
  width: 100%;
  gap: ${convertPixelToRem(28)};
  display: flex !important;
`;
const ForgotArrowLeft = styled.div`
  width: ${convertPixelToRem(40)};
  height: ${convertPixelToRem(40)};
  border-radius: 100%;
  background-color: ${themes.$tw_gray_100};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CarouselWrapper = styled(Carousel)`
  user-select: none;
  & .slick-dots.slick-dots-bottom {
    display: none !important;
  }
`;
const PasswordBlock = styled(ST.PasswordBlock)`
  margin-top: 0;
`;
const FormItemOTP = styled(ST.FormItem)`
  margin: ${convertPixelToRem(14)} 0;
  & .ant-form-item-control-input-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .ant-otp.ant-otp-lg {
    width: 70%;
    gap: ${convertPixelToRem(15)};
    & .ant-input {
      font-size: ${convertPixelToRem(30)};
      font-weight: 600;
    }
  }
  & .ant-input.ant-otp-input {
    height: ${convertPixelToRem(60)};
  }
  & .ant-form-item-explain-error {
    margin-top: ${convertPixelToRem(12)};
    text-align: center;
  }
`;
const ButtonControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ExpireOTP = styled.div<{ $otpExpri: boolean }>`
  text-align: center;
  display: flex;
  flex-direction: ${(props) => (props.$otpExpri ? "row" : "column")};
  justify-content: center;
  align-items: center;
  gap: ${convertPixelToRem(8)};
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => props.theme.auth.$title};
  transition: color 0.3s ease;
`;
const ExpireOtpNum = styled.span`
  color: ${(props) => props.theme.auth.$border_otp};
`;
const ReOTP = styled.span`
  color: ${(props) => props.theme.auth.$border_otp};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export const FG = {
  WrapperForgotPass,
  ForgortForm,
  ForgotRow,
  ForgotArrowLeft,
  ForgotWrapper,
  CarouselWrapper,
  PasswordBlock,
  FormItemOTP,
  ButtonControl,
  ExpireOTP,
  ExpireOtpNum,
  ReOTP,
};
