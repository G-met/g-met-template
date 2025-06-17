import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers } from "../service";
import { create } from "zustand";
import { AxiosError } from "axios";
import { CreateUser } from "../types";

export const useGetAllUsers = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    select: (response) => response.data,
  });

  return {
    users: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (user: CreateUser) => createUser(user),
    mutationKey: ["createUser"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Mapear el mensaje de error de Axios si existe, usando AxiosError tipado
  const errorMessage =
    error && (error as AxiosError<{ message?: string }>).response?.data?.message
      ? (error as AxiosError<{ message?: string }>).response?.data?.message
      : error?.message;

  return {
    createUser: mutateAsync,
    error,
    errorMessage,
    isError,
    isLoading: isPending,
  };
};
