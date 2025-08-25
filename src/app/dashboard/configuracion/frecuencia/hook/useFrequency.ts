import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFrequency, getFrequencies } from "../service";
import { AxiosError } from "axios";
import { CreateFrequency } from "../types";
import { errorMapper } from "../error/errorMapper";

export const useGetAllFrequencies = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["frequencies"],
    queryFn: () => getFrequencies(),
    select: (response) => response.data,
  });

  return {
    frequencies: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateFrequency = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (frequency: CreateFrequency) => createFrequency(frequency),
    mutationKey: ["createFrequency"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["frequencies"] });
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
    error,
    errorMessage: getErrorMessage(error) ?? "",
    isError,
    isLoading: isPending,
  };
};
