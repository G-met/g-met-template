import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMagnitud, getMagnitudes } from "../service";
import { AxiosError } from "axios";
import { CreateMagnitud } from "../types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

export const useGetAllMagnitudes = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["magnitudes"],
    queryFn: () => getMagnitudes(),
    select: (response) => response.data,
    refetchOnWindowFocus: false,
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

  return {
    create: mutateAsync,
    error,
    errorMessage: getErrorMessage(error),
    isError,
    isLoading: isPending,
  };
};
