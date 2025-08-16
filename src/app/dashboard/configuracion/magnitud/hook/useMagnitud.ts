import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMagnitud, getMagnitudes } from "../service";
import { AxiosError } from "axios";
import { CreateMagnitud } from "../types";

export const useGetAllMagnitudes = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["magnitudes"],
    queryFn: () => getMagnitudes(),
    select: (response) => response.data,
  });

  return {
    magnitudes: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateMagnitud = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (magnitud: CreateMagnitud) => createMagnitud(magnitud),
    mutationKey: ["createMagnitud"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["magnitudes"] });
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
    errorMessage: getErrorMessage(error),
    isError,
    isLoading: isPending,
  };
};
