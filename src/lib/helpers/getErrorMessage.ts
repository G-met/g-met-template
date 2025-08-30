import { AxiosError } from "axios";

export const getErrorMessage = (err: unknown): string | undefined => {
  if (
    err &&
    (err as AxiosError<{ message?: string }>).response?.data?.message
  ) {
    return (err as AxiosError<{ message?: string }>).response?.data?.message;
  }
  return (err as Error)?.message;
};
