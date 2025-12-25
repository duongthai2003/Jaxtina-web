import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { FormInstance } from "antd/es/form";

interface OtpInputProps {
  length?: number;
  autoFocus?: boolean;
  size?: "large" | "middle" | "small";
  placeholder?: string;
  form: FormInstance;
  fieldName: string;
  onComplete?: (value: string) => void;
  maskCharacter?: boolean | string;
}

const OTP_LENGTH_DEFAULT = 5;

const OtpInput: React.FC<OtpInputProps> = ({
  length = OTP_LENGTH_DEFAULT,
  autoFocus = true,
  size = "large",
  placeholder = "*",
  form,
  fieldName,
  onComplete,
  maskCharacter = false
}) => {
  const [otpValue, setOtpValue] = useState("");

  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>('.ant-input.ant-otp-input');
    inputs.forEach((input) => {
      if (!input.value) {
        input.placeholder = placeholder;
      } else {
        input.placeholder = '';
      }
    });
  }, [otpValue, placeholder, length]);

  const hasNonNumber = (value: string): boolean => {
    return /[^0-9]/.test(value);
  };

  const handleChange = (val: string) => {
    const trimmed = val.slice(0, length);
    
    setOtpValue(trimmed);
    form.setFieldsValue({ [fieldName]: trimmed });
    
    const fieldNameArray = Array.isArray(fieldName) ? fieldName : [fieldName];
    
    if (hasNonNumber(trimmed)) {
      form.setFields([
        {
          name: fieldNameArray,
          errors: ["OTP không đúng định dạng. OTP chỉ là số"],
        },
      ]);
      form.validateFields([fieldName]).catch(() => {});
    } else {
      form.setFields([
        {
          name: fieldNameArray,
          errors: [],
        },
      ]);
    }

    if (trimmed.length === length && !hasNonNumber(trimmed)) {
      onComplete?.(trimmed);
      form.submit();
    }
  };

  return (
    <Input.OTP
      length={length}
      autoFocus={autoFocus}
      size={size}
      value={otpValue}
      mask={maskCharacter}
      onChange={handleChange}
      onKeyDown={(e) => {
        const isCtrlOrCmd = e.ctrlKey || e.metaKey;
        const isPaste = isCtrlOrCmd && (e.key.toLowerCase() === "v");
        const isSelectAll = isCtrlOrCmd && (e.key.toLowerCase() === "a");
        
        const allowedKeys = [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Tab",
          "Enter"
        ];
        
        if (allowedKeys.includes(e.key) || isPaste || isSelectAll) {
          return;
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text");
        const trimmed = paste.slice(0, length);
        
        setOtpValue(trimmed);
        form.setFieldsValue({ [fieldName]: trimmed });
        
        const fieldNameArray = Array.isArray(fieldName) ? fieldName : [fieldName];
        
        if (hasNonNumber(trimmed)) {
          form.setFields([
            {
              name: fieldNameArray,
              errors: ["OTP không đúng định dạng. OTP chỉ là số"],
            },
          ]);
          form.validateFields([fieldName]).catch(() => {});
        } else {
          form.setFields([
            {
              name: fieldNameArray,
              errors: [],
            },
          ]);
        }

        if (trimmed.length === length && !hasNonNumber(trimmed)) {
          onComplete?.(trimmed);
          form.submit();
        }
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter" && otpValue.length === length) {
          form.submit();
        }
      }}
      className="otp-input"
    />
  );
};

export default OtpInput;
