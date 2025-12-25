import { EmailErrorKeyType, verifyEmailErrorKeyType } from "@/utils/constants";
import { MESSAGES, NOTIFY } from "@/utils/messages";

const mailErrorMap = {
  [EmailErrorKeyType.EMAIL_CONFLICT]: {
    field: "email",
    message: MESSAGES.MS13,
  },
  [verifyEmailErrorKeyType.BAD_REQUEST_EMAIL_VERIFIED]: {
    field: "email",
    message: MESSAGES.MS18,
  },
};
const otpErrorMap = {
  [verifyEmailErrorKeyType.BAD_REQUEST_CODE_EXPIRY]: {
    field: "Otp",
    message: MESSAGES.MS12,
  },
  [verifyEmailErrorKeyType.BAD_REQUEST_CODE_WRONG]: {
    field: "Otp",
    message: MESSAGES.MS11,
  },

  [verifyEmailErrorKeyType.BAD_REQUEST_EMAIL_VERIFIED]: {
    field: "email",
    message: MESSAGES.MS18,
  },
};
const resendErrorMap = {
  [verifyEmailErrorKeyType.BAD_REQUEST_CODE_EXISTS]: NOTIFY.MS5,
  [verifyEmailErrorKeyType.BAD_REQUEST_EMAIL_VERIFIED]: MESSAGES.MS18,
};
export const ErrorMapping = { mailErrorMap, otpErrorMap, resendErrorMap };
