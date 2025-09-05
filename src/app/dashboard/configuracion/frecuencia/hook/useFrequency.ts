import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFrequency, getFrequencies } from "../service";
import { CreateFrequency } from "../types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

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

  return {
    create: mutateAsync,
    error,
    errorMessage: getErrorMessage(error) ?? "",
    isError,
    isLoading: isPending,
  };
};
