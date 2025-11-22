import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatternSchedules, createPatternSchedule } from "../service/patternSchedule.service";
import { CreatePatternSchedule } from "../types/patternSchedule.types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

export const useGetAllPatternSchedules = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["pattern-schedules"],
    queryFn: () => getPatternSchedules(),
    select: (response) => response.data,
  });

  return {
    patternSchedules: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreatePatternSchedule = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreatePatternSchedule) => createPatternSchedule(data),
    mutationKey: ["createPatternSchedule"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pattern-schedules"] });
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
