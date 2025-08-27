import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVariable, getVariables } from "../service";
import { AxiosError } from "axios";
import { CreateVariable } from "../types";

export const useGetAllVariables = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["variables"],
    queryFn: () => getVariables(),
    select: (response) => response.data,
  });

  return {
    variables: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateVariable = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (variable: CreateVariable) => createVariable(variable),
    mutationKey: ["createVariable"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variables"] });
    },
  });

  const getErrorMessage = (err: unknown): string | undefined => {
    if (
      err &&
      (err as AxiosError<{ message?: string }>).response?.data?.message
    ) {
      return (err as AxiosError<{ message?: string }>).response?.data?.message;
    }
    return (err as Error)?.message;
  };

  return {
    create: mutateAsync,
    errorMessage: getErrorMessage(error),
    error,
    isError,
    isLoading: isPending,
  };
};
