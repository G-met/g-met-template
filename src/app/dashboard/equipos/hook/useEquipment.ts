import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEquipments,
  createEquipment,
  updateEquipment,
  getEquipmentByCode,
} from "../service";
import {
  CreateEquipment,
  UpdateEquipment,
} from "../types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

export const useGetAllEquipments = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["equipments"],
    queryFn: () => getEquipments(),
    select: (response) => response.data,
  });

  return {
    equipments: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (equipment: CreateEquipment) => createEquipment(equipment),
    mutationKey: ["createEquipment"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
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

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: ({ code, equipment }: { code: string; equipment: UpdateEquipment }) =>
      updateEquipment(code, equipment),
    mutationKey: ["updateEquipment"],
    onSuccess: (_, { code }) => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      queryClient.invalidateQueries({ queryKey: ["equipment", code] });
    },
  });

  return {
    update: mutateAsync,
    error,
    errorMessage: getErrorMessage(error) ?? "",
    isError,
    isLoading: isPending,
  };
};

export const useGetEquipmentByCode = (code: string) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["equipment", code],
    queryFn: () => getEquipmentByCode(code),
    select: (response) => response.data,
    enabled: !!code,
  });

  return {
    equipment: data,
    error,
    errorMessage: getErrorMessage(error) ?? "",
    isError,
    isLoading,
  };
};
