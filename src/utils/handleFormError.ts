import type { AxiosError } from "axios";
import { get } from "lodash";

const handleFormError = (
  err: AxiosError,
  form: any,
  errorMap: Record<string, { field: string; message: string }>
) => {
  const errorKey = get(err, "response.data.errorCode", "");
  const error = errorMap[errorKey];
  if (!error) return;

  form?.setFields([
    {
      name: error.field,
      errors: [error.message],
    },
  ]);
};
export default handleFormError;
