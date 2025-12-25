import { DatePicker, Form, FormInstance } from "antd";
import { KeyRound, Mail } from "lucide-react";
import dayjs from "dayjs";
import Button from "@/components/Login/Button";
import { Captcha } from "@/components/Captcha";
import {
  emailValidator,
  minLengthValidateField,
  requiredValidate,
} from "@/utils/validator";
import { BaseTag } from "@/utils/baseTagHTML";
import { themes } from "@/configs/theme";
import { icons } from "@/assets";
import { ST } from "../login/style";
import { SU } from "./style";

interface FormSignUpProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  selectedTarget?: string;
  studyTime?: string;
  status?: "idle" | "pending" | "error" | "success";
}

export default function FormSignUp({
  form,
  selectedTarget: _selectedTarget,
  studyTime: _studyTime,
  status,
  onFinish,
}: FormSignUpProps) {
  return (
    <ST.FormWrapper>
      <SU.FormSigUp
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        noValidate
      >
        <SU.Text>Đăng ký</SU.Text>
        <SU.BlockInput>
          <BaseTag.label htmlFor="name">
            <ST.InputTitle>
              Họ và tên <ST.InputTitleRequire>*</ST.InputTitleRequire>
            </ST.InputTitle>

            <ST.FormItem name={"name"} rules={[requiredValidate()]}>
              <ST.InputTag
                size="large"
                prefix={<img src={icons.NameIcon} />}
                type="name"
                required
                placeholder="Nhập họ và tên của bạn"
              />
            </ST.FormItem>
          </BaseTag.label>
          <BaseTag.label htmlFor="email">
            <ST.InputTitle>
              Email <ST.InputTitleRequire>*</ST.InputTitleRequire>
            </ST.InputTitle>

            <ST.FormItem
              name={"email"}
              rules={[
                requiredValidate(),
                {
                  validator(_, value) {
                    return emailValidator(_, value);
                  },
                },
              ]}
            >
              <ST.InputTag
                size="large"
                prefix={<Mail size={20} color={themes.$tw_gray_400} />}
                type="email"
                required
                placeholder="Nhập email của bạn"
              />
            </ST.FormItem>
          </BaseTag.label>
          <BaseTag.label htmlFor="password">
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
                prefix={<KeyRound size={20} color={themes.$tw_gray_400} />}
                type="password"
                required
                placeholder="Nhập mật khẩu của bạn"
              />
            </ST.FormItem>
          </BaseTag.label>
          <BaseTag.label htmlFor="confirmPassword">
            <ST.InputTitle>
              Nhập lại mật khẩu <ST.InputTitleRequire>*</ST.InputTitleRequire>
            </ST.InputTitle>

            <ST.FormItem
              name={"confirmPassword"}
              rules={[
                requiredValidate(),
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <ST.InputTagPassword
                size="large"
                prefix={<KeyRound size={20} color={themes.$tw_gray_400} />}
                type="password"
                required
                placeholder="Nhập mật khẩu của bạn"
              />
            </ST.FormItem>
          </BaseTag.label>
          <BaseTag.label htmlFor="date">
            <ST.InputTitle>
              Ngày sinh <ST.InputTitleRequire>*</ST.InputTitleRequire>
            </ST.InputTitle>

            <ST.FormItem
              name={"date"}
              rules={[
                requiredValidate(),
                {
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    const selectedDate = dayjs(value);
                    const today = dayjs().startOf("day");
                    if (
                      selectedDate.isAfter(today) ||
                      selectedDate.isSame(today)
                    ) {
                      return Promise.reject(
                        new Error("Ngày sinh phải nhỏ hơn ngày hiện tại!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker
                placeholder="Chọn ngày sinh của bạn"
                style={{
                  width: "100%",
                  height: "3.2rem",
                  borderRadius: "0.8rem",
                }}
                format="DD/MM/YYYY"
              />
            </ST.FormItem>
          </BaseTag.label>

          <ST.FormItem name={"capcha"} rules={[requiredValidate()]}>
            <SU.CapchaInput>
              <ST.InputTag
                size="large"
                type="text"
                id="capcho"
                required
                placeholder="Nhập mã xác thực"
              />
              <Captcha />
            </SU.CapchaInput>
          </ST.FormItem>
        </SU.BlockInput>
        <Form.Item>
          <Button
            onClick={() => {
              form.submit();
            }}
            type="button"
            title="Đăng ký"
            loading={status === "pending"}
            disabled={status === "pending"}
          />
        </Form.Item>
      </SU.FormSigUp>
    </ST.FormWrapper>
  );
}
