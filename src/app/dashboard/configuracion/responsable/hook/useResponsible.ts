import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import {
  createResponsible,
  getAllResponsible,
} from "../service/responsible.service";
import { CreateResponsible } from "../types";

export const useGetAllResponsible = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllResponsible"],
    queryFn: getAllResponsible,
  });

  return {
    responsables: data ?? [],
    isLoading,
    error,
  };
};

export const useCreateResponsible = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload: CreateResponsible) => createResponsible(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllResponsible"],
      });
    },
  });

  return {
    create: mutateAsync,
    isLoading: isPending,
    error,
    errorMessage: getErrorMessage(error) ?? "",
  };
};
