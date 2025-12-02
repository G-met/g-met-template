import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEquipmentExecutions, createEquipmentExecution, uploadFilesToEquipmentExecution } from "../service/equipmentExecution.service";
import { EquipmentExecutionResponse, CreateEquipmentExecution, UploadFilesToEquipmentExecution } from "../types/equipmentExecution.types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

export const useGetAllEquipmentExecutions = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["equipment-executions"],
    queryFn: () => getEquipmentExecutions(),
    select: (response) => response.data,
  });

  return {
    equipmentExecutions: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateEquipmentExecution = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateEquipmentExecution) => createEquipmentExecution(data),
    mutationKey: ["createEquipmentExecution"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipment-executions"] });
      queryClient.invalidateQueries({ queryKey: ["equipment-schedules"] });
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

export const useUploadFilesToEquipmentExecution = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (data: UploadFilesToEquipmentExecution) => uploadFilesToEquipmentExecution(data),
    mutationKey: ["uploadFilesToEquipmentExecution"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipment-executions"] });
    },
  });

  return {
    uploadFiles: mutateAsync,
    error,
    errorMessage: getErrorMessage(error) ?? "",
    isError,
    isLoading: isPending,
  };
};