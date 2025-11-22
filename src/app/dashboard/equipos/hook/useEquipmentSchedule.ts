import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEquipmentSchedules, createEquipmentSchedule } from "../service/equipmentSchedule.service";
import { CreateEquipmentSchedule } from "../types/equipmentSchedule.types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

export const useGetAllEquipmentSchedules = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["equipment-schedules"],
    queryFn: () => getEquipmentSchedules(),
    select: (response) => response.data,
  });

  return {
    equipmentSchedules: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateEquipmentSchedule = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateEquipmentSchedule) => createEquipmentSchedule(data),
    mutationKey: ["createEquipmentSchedule"],
    onSuccess: () => {
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
