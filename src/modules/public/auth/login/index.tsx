import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { get } from "lodash";
import { CircleCheck, KeyRound, Mail } from "lucide-react";
import { Col, Form, Row } from "antd";
import Button from "@/components/Login/Button";
import { useLoginMutation } from "../../../../hooks/useLogin";
import { useAuth } from "@/hooks/useAuth";
import { useNotify } from "@/hooks/useNotify";
import { useTheme } from "@/context/themeContext";
import { themesLight, themesDark } from "@/configs/theme";
import { minLengthValidateField, requiredValidate } from "@/utils/validator";
import { MESSAGES } from "@/utils/messages";
import { EmailErrorKeyType } from "@/utils/constants";
import { BaseTag } from "@/utils/baseTagHTML";
import { images } from "@/assets";
import { PATHS } from "@/routers/path";
import { ST } from "./style";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { themeMode } = useTheme();

  const { handleLogin, status } = useLoginMutation();
  const { notifySuccess, notifyError, contextHolder } = useNotify();

  const currentTheme = themeMode === "dark" ? themesDark : themesLight;
  const grayColor = currentTheme.auth.$input_color;
  const iconColor = currentTheme.$tw_green_600;

  const encodedParam = encodeURIComponent(JSON.stringify({ step: 0 }));
  const onFinish = async (values: any) => {
    try {
      await handleLogin(values.email, values.password, "email");
      setAuth(true);
      notifySuccess({
        message: `Đăng nhập Thành công`,
        icon: <CircleCheck color={iconColor} />,
      });
      navigate(PATHS.public.home());
    } catch (err: AxiosError | any) {
      const errorKey = get(err, "response.data.errorCode", "");
      switch (errorKey) {
        case "UNAUTHORIZED_WRONG_PASSWORD":
          form?.setFields([{ name: "password", errors: [MESSAGES.MS07] }]);
          notifyError({ message: MESSAGES.MS07 });
          break;
        case EmailErrorKeyType.USERNAME_NOT_FOUND:
          form?.setFields([{ name: "email", errors: [MESSAGES.MS08] }]);
          notifyError({ message: MESSAGES.MS08 });
          break;
        default:
          form?.setFields([{ name: "email", errors: [MESSAGES.MS10] }]);
          notifyError({ message: MESSAGES.MS10 });
      }
    }
  };

  return (
    <ST.WrapperLogin>
      <ST.LoginBlock>
        <Row justify={"center"} align={"middle"} style={{ height: "100%" }}>
          <Col xs={24} sm={24} md={12} lg={12} style={{ height: "100%" }}>
            <ST.FormWrapper>
              <ST.FormLogin
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                noValidate
              >
                <BaseTag.div>
                  <ST.TextHeading>Đăng nhập</ST.TextHeading>
                  <ST.Title>Đăng nhập để bắt đầu cùng Jaxtina ENGLISH</ST.Title>
                </BaseTag.div>
                <BaseTag.div>
                  <BaseTag.label htmlFor="email">
                    <ST.InputTitle>
                      Email <ST.InputTitleRequire>*</ST.InputTitleRequire>
                    </ST.InputTitle>

                    <ST.FormItem name={"email"} rules={[requiredValidate()]}>
                      <ST.InputTag
                        size="large"
                        prefix={<Mail size={20} color={grayColor} />}
                        type="email"
                        required
                        placeholder="Nhập email của bạn"
                      />
                    </ST.FormItem>
                  </BaseTag.label>
                  <ST.PasswordBlock htmlFor="password">
                    <ST.InputTitle>
                      Mật khẩu <ST.InputTitleRequire>*</ST.InputTitleRequire>
                    </ST.InputTitle>

                    <ST.FormItem
                      name={"password"}
                      rules={[
                        requiredValidate(),
                        minLengthValidateField("Mật khẩu ", 6),
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
                  </ST.PasswordBlock>
                  <ST.FogotPassWordText
                    href={`/forgot-password?params=${encodedParam}`}
                  >
                    Quên mật khẩu
                  </ST.FogotPassWordText>
                </BaseTag.div>
                <Form.Item>
                  <Button
                    onClick={() => {
                      form.submit();
                    }}
                    type="submit"
                    title="Đăng nhập"
                    loading={status === "pending"}
                    disabled={status === "pending"}
                  />
                </Form.Item>
              </ST.FormLogin>

              <ST.SigupText>
                Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
              </ST.SigupText>
            </ST.FormWrapper>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} style={{ height: "100%" }}>
            <ST.PanelLogin>
              <BaseTag.div>
                <ST.Logo src={images.LogoWhite} alt="LogoWhite" />
              </BaseTag.div>
              <ST.PanelContent>
                <ST.PanelContentText>
                  <BaseTag.p>Phát triển toàn diện 4 kỹ năng</BaseTag.p>
                  <BaseTag.p>NGHE NÓI ĐỌC VIẾT</BaseTag.p>
                </ST.PanelContentText>
                <ST.FourSkillsBg>
                  <BaseTag.img src={images.loginPanelcontent} alt="" />
                </ST.FourSkillsBg>
              </ST.PanelContent>
            </ST.PanelLogin>
          </Col>
        </Row>
      </ST.LoginBlock>
      {contextHolder}
    </ST.WrapperLogin>
  );
};

export default Login;
