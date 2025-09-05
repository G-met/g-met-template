import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProvider, getProviders, updateProvider } from "../service";
import { CreateProvider, UpdateProvider } from "../types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

export const useGetAllProviders = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getProviders(),
    select: (response) => response.data,
  });

  return {
    providers: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateProvider = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (provider: CreateProvider) => createProvider(provider),
    mutationKey: ["createProvider"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });

  return {
    create: mutateAsync,
    error,
    errorMessage: getErrorMessage(error) || "",
    isError,
    isLoading: isPending,
  };
};

export const useUpdateProvider = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, provider }: { id: string; provider: UpdateProvider }) =>
      updateProvider(id, provider),
    mutationKey: ["updateProvider"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });

  return {
    update: mutateAsync,
    error,
    errorMessage: getErrorMessage(error) || "",
    isError,
    isLoading: isPending,
  };
};
