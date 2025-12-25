import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import { AxiosError } from "axios";
import _, { get } from "lodash";

import { useTheme } from "@/context/themeContext";
import Button from "@/components/Login/Button";
import OtpInput from "@/components/OtpInput";
import {
  useForgotPassMutation,
  useSetNewPassMutation,
  useVerifyOtpMutation,
} from "@/hooks/useForgotPass";

import useDecodedParams from "@/hooks/useDecodeParams";
import { useNotify } from "@/hooks/useNotify";

import { MESSAGES, NOTIFY } from "@/utils/messages";
import { BaseTag } from "@/utils/baseTagHTML";
import {
  emailValidator,
  minLengthValidateField,
  requiredValidate,
  specialCharValidateField,
  validateConfirmPass,
} from "@/utils/validator";

import { FG } from "./style";
import { ST } from "../login/style";
import { themesDark, themesLight } from "@/configs/theme";
import { PATHS } from "@/routers/path";
import { EmailErrorKeyType, verifyEmailErrorKeyType } from "@/utils/constants";
import CountdownCircle from "@/components/Countdown";
import dayjs from "dayjs";

type ParamsType = {
  email: string;
  step: number;
  code: number;
  OtpExpiresAt: Date;
};
const ForgotPass = () => {
  const [formMail] = Form.useForm();
  const [formOtp] = Form.useForm();
  const [newPassForm] = Form.useForm();
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const decodeParams = useDecodedParams<ParamsType>();
  const carouselRef = useRef<CarouselRef>(null);
  const { contextHolder, notifyError } = useNotify();

  const { handleSendOtp, status } = useForgotPassMutation();
  const { handleVerifyOtpSendOtp } = useVerifyOtpMutation();
  const { handleResetPass } = useSetNewPassMutation();

  const [isNextBtn, setIsNextBtn] = useState(true);
  const [countdown, setCountdown] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState(decodeParams.step || 0);

  const currentTheme = themeMode === "dark" ? themesDark : themesLight;
  const grayColor = currentTheme.auth.$input_color;
  const now = dayjs().valueOf();
  const isExpired = now > Number(decodeParams.OtpExpiresAt);
  const isReSendOtp = countdown < 1 || isExpired;

  const handleSubmitSendOtpCode = async (values: any) => {
    try {
      const expiresAt = dayjs().add(60, "second").valueOf();
      await handleSendOtp(values.email);

      carouselRef.current?.next();
      const param = {
        step: currentSlide + 1,
        email: values.email,
        OtpExpiresAt: expiresAt,
      };
      const encodeParam = encodeURIComponent(JSON.stringify(param));
      setIsNextBtn(false);
      navigate(`${location.pathname}?params=${encodeParam}`);
    } catch (err: AxiosError | any) {
      const errorKey = get(err, "response.data.errorCode", "");
      if (errorKey === EmailErrorKeyType.NOT_FOUND)
        formMail?.setFields([{ name: "email", errors: [MESSAGES.MS08] }]);
      if (errorKey === verifyEmailErrorKeyType.BAD_REQUEST_CODE_EXISTS) {
        formMail?.setFields([{ name: "email", errors: [NOTIFY.MS5] }]);
      }
    }
  };

  const handleSubmitVerifyOtpCode = async (values: any) => {
    try {
      await handleVerifyOtpSendOtp({
        email: decodeParams.email,
        code: values.Otp,
      });
      carouselRef.current?.next();
      const param = {
        ...decodeParams,
        step: currentSlide + 1,
        code: values.Otp,
      };
      const encodeParam = encodeURIComponent(JSON.stringify(param));
      navigate(`${location.pathname}?params=${encodeParam}`);
    } catch (err: AxiosError | any) {
      const errorKey = get(err, "response.data.errorCode", "");
      if (errorKey === "BAD_REQUEST_CODE_WRONG")
        formOtp?.setFields([{ name: "Otp", errors: [MESSAGES.MS11] }]);
      else if (errorKey === "BAD_REQUEST_CODE_EXPIRY") {
        formOtp?.setFields([{ name: "Otp", errors: [MESSAGES.MS12] }]);
      }
    }
  };
  const handleSubmitResetPass = async (values: any) => {
    try {
      await handleResetPass({
        email: decodeParams.email,
        code: decodeParams.code,
        password: values.newpassword,
      });
      navigate(PATHS.public.login());
    } catch (err: AxiosError | any) {
      formOtp?.setFields([{ name: "Otp", errors: [MESSAGES.MS11] }]);
    }
  };

  const handleBack = () => {
    if (currentSlide <= 0) {
      navigate(PATHS.public.login());
    } else {
      const getParamObjByStep = _.pick(
        decodeParams,
        _.keys(decodeParams).slice(0, decodeParams.step === 2 ? 2 : 1)
      );
      carouselRef.current?.prev();
      const param = {
        ...getParamObjByStep,
        step: currentSlide - 1,
      };
      const encodeParam = encodeURIComponent(JSON.stringify(param));
      navigate(`${location.pathname}?params=${encodeParam}`);
    }
  };

  const onChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };
  const handleResendOtp = async () => {
    try {
      await handleSendOtp(decodeParams.email);

      const expiresAt = dayjs().add(60, "second").valueOf(); // hết hạn sau 60s
      const param = {
        ...decodeParams,
        OtpExpiresAt: expiresAt,
      };
      const encodeParam = encodeURIComponent(JSON.stringify(param));
      navigate(`${location.pathname}?params=${encodeParam}`);
    } catch (err: AxiosError | any) {
      const errorKey = get(err, "response.data.errorCode", "");
      if (errorKey === EmailErrorKeyType.NOT_FOUND) {
        carouselRef.current?.prev();
        const param = {
          ..._.omit(decodeParams, ["email", "OtpExpiresAt"]),
          step: currentSlide - 1,
        };
        const encodeParam = encodeURIComponent(JSON.stringify(param));
        navigate(`${location.pathname}?params=${encodeParam}`);

        notifyError({ message: MESSAGES.MS08 });
      }
    }
  };
  useEffect(() => {
    if (decodeParams.step === 1 && decodeParams.OtpExpiresAt) {
      const timer = setInterval(() => {
        const now = dayjs().valueOf();
        const timeExpire = Math.max(
          0,
          Math.floor((Number(decodeParams.OtpExpiresAt) - now) / 1000)
        );
        setCountdown(timeExpire);

        if (timeExpire <= 0) {
          clearInterval(timer);
        }
      }, 250);

      return () => clearInterval(timer);
    }
  }, [decodeParams.step, decodeParams.OtpExpiresAt]);

  return (
    <FG.WrapperForgotPass>
      <FG.ForgotRow>
        <Col>
          <FG.ForgotWrapper>
            {isNextBtn && decodeParams.step < 1 && (
              <FG.ForgotArrowLeft onClick={handleBack}>
                <ArrowLeft color={grayColor} size={20} />
              </FG.ForgotArrowLeft>
            )}

            <FG.CarouselWrapper
              ref={carouselRef}
              infinite={false}
              afterChange={onChange}
              initialSlide={decodeParams.step}
              accessibility={false}
            >
              <BaseTag.div>
                <FG.ForgortForm
                  form={formMail}
                  onFinish={handleSubmitSendOtpCode}
                  autoComplete="off"
                  noValidate
                >
                  <BaseTag.div>
                    <ST.TextHeading>Quên mật khẩu</ST.TextHeading>
                    <ST.Title>
                      Nhập email đăng nhập hệ thống để lấy lại mật khẩu
                    </ST.Title>
                  </BaseTag.div>

                  <BaseTag.label htmlFor="email">
                    <ST.InputTitle>
                      Email <ST.InputTitleRequire>*</ST.InputTitleRequire>
                    </ST.InputTitle>

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
                        prefix={<Mail size={20} color={grayColor} />}
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
                    onFinish={handleSubmitVerifyOtpCode}
                    autoComplete="new-password"
                    noValidate
                  >
                    <BaseTag.div>
                      <ST.TextHeading>Xác thực OTP</ST.TextHeading>
                      <ST.Title>
                        Nhập mã OTP được gửi đến email để xác thực
                      </ST.Title>
                    </BaseTag.div>

                    <FG.FormItemOTP name={"Otp"}>
                      <OtpInput
                        form={formOtp}
                        fieldName="Otp"
                        length={5}
                        placeholder="*"
                      />
                    </FG.FormItemOTP>
                    <FG.ExpireOTP $otpExpri={isReSendOtp}>
                      <p>
                        {" "}
                        Mã OTP{" "}
                        {isReSendOtp ? (
                          <span>hết hạn!</span>
                        ) : (
                          <span>sẽ hết hạn sau:</span>
                        )}
                      </p>
                      {countdown < 1 || isExpired ? (
                        <FG.ReOTP onClick={handleResendOtp}>Gửi lại</FG.ReOTP>
                      ) : (
                        <p>
                          <CountdownCircle time={countdown} />
                        </p>
                      )}
                    </FG.ExpireOTP>
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
                )}
              </BaseTag.div>
              <BaseTag.div>
                {currentSlide === 2 && (
                  <FG.ForgortForm
                    form={newPassForm}
                    onFinish={handleSubmitResetPass}
                    autoComplete="off"
                    noValidate
                  >
                    <BaseTag.div>
                      <ST.TextHeading>Nhập mật khẩu mới</ST.TextHeading>
                      <ST.Title>
                        Vui lòng nhập mật khẩu mới khác với mật khẩu trước đó
                        bao gồm 8-16 kí tự và ít nhất chứa một ký tự đặc biệt
                      </ST.Title>
                    </BaseTag.div>

                    <FG.PasswordBlock htmlFor="newpassword">
                      <ST.InputTitle>
                        Mật khẩu mới{" "}
                        <ST.InputTitleRequire>*</ST.InputTitleRequire>
                      </ST.InputTitle>

                      <ST.FormItem
                        name={"newpassword"}
                        rules={[
                          requiredValidate(),
                          // minLengthValidateField("Mật khẩu ", 8),
                          specialCharValidateField("Mật khẩu", 8),
                        ]}
                      >
                        <ST.InputTagPassword
                          size="large"
                          prefix={<KeyRound size={20} color={grayColor} />}
                          type="password"
                          required
                          placeholder="Nhập mật khẩu của bạn"
                        />
                      </ST.FormItem>
                    </FG.PasswordBlock>
                    <FG.PasswordBlock htmlFor="comfirm-password">
                      <ST.InputTitle>
                        Nhập lại mật khẩu mới{" "}
                        <ST.InputTitleRequire>*</ST.InputTitleRequire>
                      </ST.InputTitle>

                      <ST.FormItem
                        name={"comfirm-password"}
                        rules={[
                          requiredValidate(),
                          minLengthValidateField("Mật khẩu ", 6),
                          ({ getFieldValue }) => {
                            const password = getFieldValue("newpassword");
                            return validateConfirmPass(password, 6);
                          },
                        ]}
                      >
                        <ST.InputTagPassword
                          size="large"
                          prefix={<KeyRound size={20} color={grayColor} />}
                          type="password"
                          required
                          placeholder="Nhập mật khẩu của bạn"
                        />
                      </ST.FormItem>
                    </FG.PasswordBlock>

                    <Form.Item style={{ margin: 0 }}>
                      <Button
                        style={{ width: "100%" }}
                        type="submit"
                        title="Đặt lại mật khẩu"
                        loading={status === "pending"}
                        disabled={status === "pending"}
                      />
                    </Form.Item>
                  </FG.ForgortForm>
                )}
              </BaseTag.div>
            </FG.CarouselWrapper>
          </FG.ForgotWrapper>
        </Col>
      </FG.ForgotRow>
      {contextHolder}
    </FG.WrapperForgotPass>
  );
};
export default ForgotPass;
