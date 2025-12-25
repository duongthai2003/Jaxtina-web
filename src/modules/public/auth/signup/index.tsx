import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "@/hooks/useSignUp";
import { useCaptcha } from "@/hooks/useCaptcha";
import { AxiosError } from "axios";
import { CircleCheck } from "lucide-react";
import dayjs from "dayjs";
import { Checkbox, Col, Form, Row } from "antd";
import FormSignUp from "./formSignUp";
import ImageSignUp from "./imageSignUp";
import { useNotify } from "@/hooks/useNotify";
import { MESSAGES } from "@/utils/messages";
import {
  CaptchaErrorCode,
  EmailErrorKeyType,
  TARGET_LIST,
} from "@/utils/constants";
import { themes } from "@/configs/theme";
import { SU } from "./style";
import { images, icons } from "@/assets";

import { PATHS } from "@/routers/path";
import handleFormError from "@/utils/handleFormError";
import { BaseTag } from "@/utils/baseTagHTML";

const ErrorMessMapping = {
  [EmailErrorKeyType.EMAIL_CONFLICT]: {
    field: "email",
    message: MESSAGES.MS13,
  },
  [CaptchaErrorCode.WRONG_CAPTCHA]: {
    field: "capcha",
    message: MESSAGES.MS15,
  },
  [CaptchaErrorCode.MAX_CAPTCHA_TIME]: {
    field: "capcha",
    message: MESSAGES.MS16,
  },
  [CaptchaErrorCode.WRONG_TOKEN]: {
    field: "capcha",
    message: MESSAGES.MS17,
  },
};

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [studyHour, setStudyHour] = useState<string>("");
  const [studyMinute, setStudyMinute] = useState<string>("");
  const { handleSignUp } = useSignUpMutation();
  const { notifySuccess, contextHolder } = useNotify();
  const { captchaToken } = useCaptcha();

  const handleBack = () => {
    setStep(1);
  };

  const handleStepChange = (newStep: number) => {
    if (newStep === 1 || (newStep === 2 && studyMinute.length > 0)) {
      setStep(newStep);
    }
  };

  const handleTargetChange = (checkedValues: string[]) => {
    setSelectedTargets(checkedValues);
  };

  const handleNext = () => {
    if (
      selectedTargets.length > 0 &&
      studyHour.length > 0 &&
      studyMinute.length > 0
    ) {
      setStep(2);
    }
  };

  const selectedTargetString = selectedTargets.join(", ");

  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: String(i).padStart(2, "0"),
    label: String(i).padStart(2, "0"),
  }));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    value: String(i).padStart(2, "0"),
    label: String(i).padStart(2, "0"),
  }));

  const getMucTieuHocTap = () => {
    if (selectedTargets.length === 0) return 1;
    const targetIndex = TARGET_LIST.findIndex(
      (item) => item.target === selectedTargets[0]
    );
    return targetIndex >= 0 ? targetIndex + 1 : 1;
  };

  const convertStudyTimeToMinutes = (time: string): number => {
    if (!time || !time.includes(":")) return 0;
    const [hour, minute] = time.split(":").map(Number);
    return (hour || 0) * 60 + (minute || 0);
  };

  const onFinish = async (values: any) => {
    try {
      const dateOfBirth = dayjs(values.date).toISOString();
      const studyTimeStr = `${studyHour}:${studyMinute}`;
      const thoiGianHoc = convertStudyTimeToMinutes(studyTimeStr);

      const signUpParams: any = {
        fullname: values.name,
        dateOfBirth: dateOfBirth,
        email: values.email,
        password: values.password,
        mucTieuHocTap: getMucTieuHocTap(),
        thoiGianHoc: thoiGianHoc,
        registerValue: values.capcha,
        registerToken: captchaToken,
      };

      await handleSignUp(signUpParams);
      notifySuccess({
        message: MESSAGES.MS14,
        icon: <CircleCheck color={themes.$tw_green_600} />,
      });
      navigate(PATHS.public.login());
    } catch (err: AxiosError | any) {
      handleFormError(err, form, ErrorMessMapping);
    }
  };

  return (
    <SU.WrapperRegister>
      <Row
        justify={"center"}
        align={"middle"}
        style={{ height: "100%", width: "100%" }}
      >
        <SU.ColForm xs={24} sm={24} md={12} lg={12}>
          <SU.HeaderControls>
            <SU.StepIndicator>
              <SU.StepDot
                $active={step === 1}
                onClick={() => handleStepChange(1)}
              />
              <SU.StepDot
                $active={step === 2}
                onClick={() => handleStepChange(2)}
              />
            </SU.StepIndicator>
          </SU.HeaderControls>
          {step === 1 ? (
            <SU.ContentWrapper>
              <BaseTag.div>
                <SU.Text>Mục tiêu</SU.Text>
                <SU.HeaderSection>
                  <SU.AvatarBubble>
                    <SU.Avatar src={images.jaxDang6} alt="Jax" />
                    <SU.SpeechBubble1>
                      Mục tiêu học Tiếng Anh của bạn là gì? <br /> Điều này sẽ
                      giúp mình điều chỉnh chương trình học phù hợp với nhu cầu
                      của bạn
                    </SU.SpeechBubble1>
                  </SU.AvatarBubble>
                </SU.HeaderSection>

                <BaseTag.div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginTop: "16px",
                  }}
                >
                  {TARGET_LIST.map((item, index) => {
                    const isChecked = selectedTargets.includes(item.target);
                    return (
                      <SU.GoalCard
                        key={index}
                        $isselected={isChecked}
                        onClick={() => {
                          if (isChecked) {
                            handleTargetChange(
                              selectedTargets.filter((t) => t !== item.target)
                            );
                          } else {
                            handleTargetChange([
                              ...selectedTargets,
                              item.target,
                            ]);
                          }
                        }}
                      >
                        <SU.GoalIcon>
                          <BaseTag.img src={item.image} />
                        </SU.GoalIcon>
                        <SU.GoalText
                          $colortext={isChecked ? themes.$tw_black : ""}
                        >
                          {item.target}
                        </SU.GoalText>
                        <Checkbox
                          value={item.target}
                          checked={isChecked}
                          onChange={(e) => {
                            e.stopPropagation();
                            if (e.target.checked) {
                              handleTargetChange([
                                ...selectedTargets,
                                e.target.value,
                              ]);
                            } else {
                              handleTargetChange(
                                selectedTargets.filter(
                                  (t) => t !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                      </SU.GoalCard>
                    );
                  })}
                </BaseTag.div>

                <SU.StudyTimeSection>
                  <SU.Text>Thời gian học tập</SU.Text>
                  <SU.HeaderSection>
                    <SU.AvatarBubble>
                      <SU.Avatar src={images.jaxDang6} alt="Jax" />
                      <SU.SpeechBubble2>
                        Giờ học nào là tốt nhất cho bạn? <br /> Jax sẽ nhắc bạn
                        học mỗi ngày vào thời gian này
                      </SU.SpeechBubble2>
                    </SU.AvatarBubble>
                  </SU.HeaderSection>
                  <SU.TimeInputWrapper>
                    <SU.TimeSelect
                      placeholder="Giờ"
                      value={studyHour || undefined}
                      onChange={(value: unknown) =>
                        setStudyHour((value as string) || "")
                      }
                      options={hourOptions}
                      size="large"
                    />
                    <BaseTag.span style={{ fontSize: "20px", margin: "0 8px" }}>
                      :
                    </BaseTag.span>
                    <SU.TimeSelect
                      placeholder="Phút"
                      value={studyMinute || undefined}
                      onChange={(value: unknown) =>
                        setStudyMinute((value as string) || "")
                      }
                      options={minuteOptions}
                      size="large"
                    />
                  </SU.TimeInputWrapper>
                </SU.StudyTimeSection>

                <SU.ButtonNext
                  // type="primary"
                  onClick={handleNext}
                  disabled={studyMinute.length === 0}
                  title="Tiếp tục"
                >
                  {" "}
                  Tiếp tục
                </SU.ButtonNext>
              </BaseTag.div>
            </SU.ContentWrapper>
          ) : (
            <SU.ContentWrapper>
              <BaseTag.div>
                {step === 2 && (
                  <SU.BackButton onClick={handleBack}>
                    <BaseTag.img src={icons.BackIcon} alt="Back" />
                  </SU.BackButton>
                )}
                <FormSignUp
                  form={form}
                  onFinish={onFinish}
                  selectedTarget={selectedTargetString}
                  studyTime={`${studyHour}:${studyMinute}`}
                  // status={status}
                />
              </BaseTag.div>
            </SU.ContentWrapper>
          )}
          <SU.LoginText>
            Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
          </SU.LoginText>
        </SU.ColForm>
        <Col xs={24} sm={24} md={12} lg={12} style={{ height: "100%" }}>
          <ImageSignUp />
        </Col>
      </Row>
      {contextHolder}
    </SU.WrapperRegister>
  );
};

export default SignUp;
