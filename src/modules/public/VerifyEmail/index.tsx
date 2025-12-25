import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form } from "antd";
import { AxiosError } from "axios";
import { CarouselRef } from "antd/es/carousel";
import { ChevronLeft, Mail } from "lucide-react";
import styled from "styled-components";
import { get } from "lodash";
import { FG } from "../auth/forgot-pass/style";
import { ST } from "../auth/login/style";
import Button from "@/components/Login/Button";
import OtpInput from "@/components/OtpInput";
import {
  useVerifyEmailGetOTPMutation,
  useVerifyEmailOTPMutation,
  useVerifyEmailResendOTP,
} from "@/hooks/useVerifyEmail";
import { useNotify } from "@/hooks/useNotify";
import {
  emailValidator,
  minLengthValidate,
  requiredValidate,
} from "@/utils/validator";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { NOTIFY } from "@/utils/messages";
import handleFormError from "@/utils/handleFormError";
import { BaseTag } from "@/utils/baseTagHTML";

import { themes } from "@/configs/theme";
import { PATHS } from "@/routers/path";
import { ErrorMapping } from "./errorMapping";

const VerifyEmail = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formMail] = Form.useForm();
  const [formOtp] = Form.useForm();
  const navigate = useNavigate();
  const { notifySuccess, notifyError, contextHolder } = useNotify();

  const { handleGetOtp } = useVerifyEmailGetOTPMutation();
  const { handleVerifyOtp } = useVerifyEmailOTPMutation();
  const { refetch } = useVerifyEmailResendOTP();

  const onChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };
  const handleSubmitSendEmail = async (values: any) => {
    try {
      await handleGetOtp(values.email);
      carouselRef.current?.next();
    } catch (err: AxiosError | any) {
      handleFormError(err, formMail, ErrorMapping.mailErrorMap);
    }
  };
  const handleSubmitVerifyOtpCode = async (values: any) => {
    try {
      await handleVerifyOtp(values.Otp);
      notifySuccess({ message: NOTIFY.MS7 });

      navigate(PATHS.public.home());
    } catch (err: AxiosError | any) {
      handleFormError(err, formOtp, ErrorMapping.otpErrorMap);
    }
  };

  const handleBack = () => {
    if (currentSlide <= 0) {
      navigate(PATHS.public.home());
    } else {
      carouselRef.current?.prev();
    }
  };

  const handleResendOtp = async () => {
    try {
      await refetch({ throwOnError: true });
      notifySuccess({ message: NOTIFY.MS6 });
    } catch (err: AxiosError | any) {
      const errorKey = get(err, "response.data.errorCode", "");

      notifyError({
        message:
          ErrorMapping.resendErrorMap[
            errorKey as keyof typeof ErrorMapping.resendErrorMap
          ],
      });
    }
  };

  return (
    <VerifyWrapper>
      <FG.ForgotRow>
        <Col>
          <VerifyModal>
            <FG.ForgotArrowLeft onClick={handleBack}>
              <ChevronLeft color={themes.$tw_black} size={20} />
            </FG.ForgotArrowLeft>

            <FG.CarouselWrapper
              ref={carouselRef}
              infinite={false}
              afterChange={onChange}
            >
              <BaseTag.div>
                <FG.ForgortForm
                  form={formMail}
                  onFinish={handleSubmitSendEmail}
                  autoComplete="off"
                  noValidate
                >
                  <BaseTag.div>
                    <ST.TextHeading>Xác nhận mail</ST.TextHeading>
                    <ST.Title>
                      Nhập email của bạn bên dưới, chúng tôi sẽ gửi cho bạn OTP
                      để xác nhận tài khoản, bạn cũng có thể đổi thành email mới
                      tại đây.
                    </ST.Title>
                  </BaseTag.div>

                  <BaseTag.label htmlFor="email">
                    <ST.FormItem
                      name={"email"}
                      rules={[
                        requiredValidate(),
                        {
                          validator: async (_: any, value: any) => {
                            return emailValidator("", value);
                          },
                        },
                      ]}
                    >
                      <ST.InputTag
                        size="large"
                        prefix={<Mail size={20} />}
                        type="email"
                        required
                        placeholder="Nhập email của bạn"
                      />
                    </ST.FormItem>
                  </BaseTag.label>

                  <Form.Item style={{ margin: 0 }}>
                    <Button
                      style={{ width: "100%" }}
                      type="submit"
                      title="Xác nhận"
                      loading={status === "pending"}
                      disabled={status === "pending"}
                    />
                  </Form.Item>
                </FG.ForgortForm>
              </BaseTag.div>

              <BaseTag.div>
                {currentSlide === 1 && (
                  <FG.ForgortForm
                    form={formOtp}
                    noValidate
                    onFinish={handleSubmitVerifyOtpCode}
                  >
                    <BaseTag.div>
                      <ST.TextHeading>Mã xác minh</ST.TextHeading>
                      <ST.Title>
                        Nhập mã xác minh gồm 5 ký tự được gửi đến tài khoản
                        email
                      </ST.Title>
                    </BaseTag.div>

                    <FormItemOTP
                      name={"Otp"}
                      rules={[requiredValidate(), minLengthValidate(4)]}
                    >
                      <OtpInput
                        form={formOtp}
                        fieldName="Otp"
                        length={5}
                        placeholder="*"
                      />
                    </FormItemOTP>

                    <ST.SigupText>
                      Bạn chưa nhận được OTP?
                      <ReOTP onClick={handleResendOtp}>Gửi lại</ReOTP>
                    </ST.SigupText>
                  </FG.ForgortForm>
                )}
              </BaseTag.div>
            </FG.CarouselWrapper>
          </VerifyModal>
        </Col>
      </FG.ForgotRow>
      {contextHolder}
    </VerifyWrapper>
  );
};

export default VerifyEmail;

const VerifyWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;
const VerifyModal = styled(FG.ForgotWrapper)`
  max-width: ${convertPixelToRem(800)};
  min-width: ${convertPixelToRem(800)};
`;

const FormItemOTP = styled(FG.FormItemOTP)`
  & .ant-input,
  & .ant-input-status-error {
    border: none;
    outline: none;
    border-bottom: ${convertPixelToRem(4)} solid #adb5bc;
    border-radius: 0;
    background-color: transparent;
    color: ${(props) => props.theme.$tw_black};
  }
  & .ant-input:focus-within {
    box-shadow: none;
  }
  & .ant-input::placeholder {
    color: ${(props) => props.theme.$tw_black};
    opacity: 1;
  }
  & .ant-input:focus {
    border-color: ${(props) => props.theme.auth.$border_otp};
  }
  & .ant-input-outlined.ant-input-status-error {
    border: none;
    outline: none;
    border-bottom: ${convertPixelToRem(4)} solid
      ${themes.auth.$btn_color_primary};
    background-color: transparent;
    &:hover,
    &:focus {
      background-color: transparent;
      box-shadow: none;
    }
  }
`;
const ReOTP = styled.span`
  color: ${(props) => props.theme.auth.$border_otp};
  cursor: pointer;
  margin-left: ${convertPixelToRem(4)};
  &:hover {
    text-decoration: underline;
  }
`;
