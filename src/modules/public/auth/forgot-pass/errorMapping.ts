import { EmailErrorKeyType, verifyEmailErrorKeyType } from "@/utils/constants";
import { MESSAGES } from "@/utils/messages";

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

export const ErrorMapping = { mailErrorMap };
