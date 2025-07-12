import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers } from "../service";
import { AxiosError } from "axios";
import { CreateUser, UserStatus } from "../types";
import { UserResponse } from "../types/index";

const statusMap: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "Activo",
  [UserStatus.PENDING_ACTIVATION]: "Pendiente de Activación",
  [UserStatus.DISABLED]: "Deshabilitado",
  [UserStatus.DELETED]: "Eliminado",
};

const mapperUserStatus = (userResponse: UserResponse) => ({
  ...userResponse,
  status: statusMap[userResponse.status] as UserStatus,
});

export const useGetAllUsers = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    select: (response) => response.data.map(mapperUserStatus),
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

  // Función para extraer el mensaje de error de Axios
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
    createUser: mutateAsync,
    error,
    errorMessage: getErrorMessage(error),
    isError,
    isLoading: isPending,
  };
};
