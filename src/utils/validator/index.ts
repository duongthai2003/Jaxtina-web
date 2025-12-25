import { MESSAGES } from "@/utils/messages";
import { Rule, RuleObject } from "antd/es/form";
import { findIndex } from "lodash";
import { MIN_LENGTH_PASSWORD } from "@/utils/constants";
const MAX_SIZE = 10;
const MAX_SIZE_BIG = 100;
const VALID_FILE = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
const VALID_FILE_EXPORT = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const EMAIL_REGEX =
  /^.{1,64}@([A-Za-z0-9]+([+.-]*[A-Za-z0-9])*){1,253}\.(com|org|net|vn)$/;

export const requiredValidate = (): Rule => ({
  required: true,
  message: MESSAGES.MS00,
});

export const minLengthValidate = (minLength: number): Rule => ({
  validator(_, value) {
    if (value && value.length < minLength) {
      return Promise.reject(`Mã kỳ thi phải có ít nhất ${minLength} ký tự`);
    }
    return Promise.resolve();
  },
});
export const minLengthValidateField = (
  field: string,
  minLength: number
): Rule => ({
  validator(_, value) {
    if (value && value.length < minLength) {
      return Promise.reject(`${field} phải có ít nhất ${minLength} ký tự`);
    }
    return Promise.resolve();
  },
});
export const validateConfirmPass = (
  password: string,
  minLength: number
): RuleObject => ({
  validator(_, value) {
    if (value && value.length >= minLength && value && value !== password) {
      return Promise.reject("Mật khẩu xác nhận không chính xác");
    }
    return Promise.resolve();
  },
});
export const minLengthNameValidate = (
  minLength: number,
  label: string
): Rule => ({
  validator(_, value) {
    if (value && value.length < minLength) {
      return Promise.reject(`${label} phải có ít nhất ${minLength} ký tự`);
    }
    return Promise.resolve();
  },
});
// khong duoc chua tat ca la khoang trang
export const noOnlySpacesValidate = (field: string): Rule => ({
  validator(_, value) {
    if (value && value.trim().length === 0) {
      return Promise.reject(`${field} không được chỉ chứa khoảng trắng`);
    }
    return Promise.resolve();
  },
});

// khong dc chua it nhat space
export const noWhitespaceValidate = (): Rule => ({
  validator(_, value) {
    if (value && /\s/.test(value)) {
      return Promise.reject(
        "Trường đã nhập không được chứa ký tự khoảng trống"
      );
    }
    return Promise.resolve();
  },
});

export const requiredSelect = (): Rule => ({
  required: true,
  message: MESSAGES.MC00,
});

export const requiredValidateChoose = (): Rule => ({
  required: true,
  message: MESSAGES.MS04,
});

export const validateValue = (_: unknown, value: string) => {
  if (!value) {
    return Promise.reject(new Error(MESSAGES.MS01));
  }

  return Promise.resolve();
};

export const emailValidator = (_: unknown, value: string) => {
  if (value && !EMAIL_REGEX.test(value)) {
    return Promise.reject(new Error(MESSAGES.MS03));
  }
  return Promise.resolve();
};
export const validateFileSize = (file: any) => {
  const fileSize = file.size / 1024 / 1024; // convert to MB
  return fileSize <= MAX_SIZE;
};
export const validateFileSizeBig = (file: any) => {
  const fileSize = file.size / 1024 / 1024; // convert to MB
  return fileSize <= MAX_SIZE_BIG;
};

export const validateFileType = ({ type }: any) => {
  if (type) {
    const index = findIndex(VALID_FILE, (item) => {
      return item === type;
    });
    return index > -1;
  }
};

export const validatePhoneNumber = (phoneNumber: string | number) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const regex = /^0\d{9}$/;
  return regex.test(cleaned);
};

export const validatePassword = (password: string) => {
  if (password.length < MIN_LENGTH_PASSWORD) {
    return false;
  }
  if (password.includes(" ")) {
    return false;
  }
  return true;
};
export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateMinPass = (_: unknown, value: string) => {
  if (value && value.length < MIN_LENGTH_PASSWORD) {
    return Promise.reject(new Error(`${MESSAGES.MS05} ${6} kí tự`));
  }

  return Promise.resolve();
};

export const validateMobile = () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validator(_: any, value: any) {
    if (!value) {
      return Promise.reject(new Error(MESSAGES.MS00));
    }
    const isNumeric = /^\d+$/.test(value);
    const isTenDigit = value.length === 10;
    if (!isNumeric || !isTenDigit) {
      return Promise.reject(new Error(MESSAGES.MS06));
    }
    return Promise.resolve();
  },
});
export const validateFileExport = (type: string) => {
  if (type) {
    const index = findIndex(VALID_FILE_EXPORT, (item) => {
      return item === type;
    });
    return index > -1;
  }
};

// validate email or phone typing input
export const validateMobileAndEmailInput = () => ({
  validator: async (
    _: any,
    value: string
  ): Promise<{ type: "email" | "phone"; value: string }> => {
    if (!value) {
      return Promise.reject(
        new Error("Vui lòng nhập email hoặc số điện thoại")
      );
    }
    try {
      await validateMobile().validator(null, value);
      return Promise.resolve({ type: "phone", value });
    } catch {
      try {
        await emailValidator(null, value);
        return Promise.resolve({ type: "email", value });
      } catch {
        return Promise.reject(
          new Error("Vui lòng nhập email hoặc số điện thoại hợp lệ")
        );
      }
    }
  },
});
export const specialCharValidateField = (
  field: string,
  minLength: number
): Rule => ({
  validator(_, value) {
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{}|;:'",.<>?/]/;
    if (value && value.length < minLength) {
      return Promise.reject(`${field} phải có ít nhất ${minLength} ký tự`);
    }
    if (value && !specialCharRegex.test(value)) {
      return Promise.reject(`${field} phải chứa ít nhất một ký tự đặc biệt`);
    }

    return Promise.resolve();
  },
});
