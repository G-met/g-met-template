import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEquipments,
  createEquipment,
  updateEquipment,
  getEquipmentByCode,
  createMetrologicalDataEquipment,
  updateMetrologicalDataEquipment,
  createComplementaryDataEquipment,
  updateComplementaryDataEquipment,
} from "../service";
import {
  CreateEquipment,
  UpdateEquipment,
  CreateMetrologicalDataEquipment,
  UpdateMetrologicalDataEquipment,
  CreateComplementaryDataEquipment,
  UpdateComplementaryDataEquipment,
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

export const useCreateMetrologicalDataEquipment = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateMetrologicalDataEquipment) =>
      createMetrologicalDataEquipment(data),
    mutationKey: ["createMetrologicalDataEquipment"],
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

export const useUpdateMetrologicalDataEquipment = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: ({
      equipmentCode,
      data,
    }: {
      equipmentCode: string;
      data: UpdateMetrologicalDataEquipment;
    }) => updateMetrologicalDataEquipment(equipmentCode, data),
    mutationKey: ["updateMetrologicalDataEquipment"],
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      queryClient.invalidateQueries({
        queryKey: ["equipment", variables.equipmentCode],
      });
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

export const useCreateComplementaryDataEquipment = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateComplementaryDataEquipment) =>
      createComplementaryDataEquipment(data),
    mutationKey: ["createComplementaryDataEquipment"],
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

export const useUpdateComplementaryDataEquipment = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: ({
      equipmentCode,
      data,
    }: {
      equipmentCode: string;
      data: UpdateComplementaryDataEquipment;
    }) => updateComplementaryDataEquipment(equipmentCode, data),
    mutationKey: ["updateComplementaryDataEquipment"],
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      queryClient.invalidateQueries({
        queryKey: ["equipment", variables.equipmentCode],
      });
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
